import { useState, useEffect } from 'react'
import { FiSearch, FiX, FiChevronDown, FiCheck } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { getOrders, updateOrder, cancelOrder } from '@/api/orderApi'

const PRIMARY = '#75b06f'
const PRIMARY_DARK = '#5a9450'

const STATUS_CFG = {
  'Chờ xác nhận': { bg: '#fffbeb', color: '#d97706', border: '#fde68a', icon: '⏱' },
  'Đang đóng gói': { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe', icon: '📦' },
  'Đang giao':     { bg: '#f5f3ff', color: '#7c3aed', border: '#ddd6fe', icon: '🚚' },
  'Hoàn thành':   { bg: '#f0fdf4', color: PRIMARY_DARK, border: '#bbf7d0', icon: '✅' },
  'Đã hủy':       { bg: '#fef2f2', color: '#dc2626', border: '#fecaca', icon: '🚫' },
}

const mapApiOrderToAdmin = (dto) => {
  const items = Array.isArray(dto.items) ? dto.items : []
  return {
    orderId: dto.orderId,
    id: dto.orderNumber || `ORD-${dto.orderId}`,
    customer: dto.shippingName || 'Khách hàng',
    phone: dto.shippingPhone || '',
    email: '', // backend chưa trả
    address: dto.shippingAddress || '',
    date: dto.createdDate ? new Date(dto.createdDate).toLocaleDateString('vi-VN') : '',
    time: dto.createdDate
      ? new Date(dto.createdDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      : '',
    subtotal: dto.subtotal ?? items.reduce((s, it) => s + (it.subtotal || it.subTotal || 0), 0),
    discountAmount: dto.discountAmount ?? 0,
    shippingFee: dto.shippingFee ?? 0,
    total:
      dto.totalAmount ??
      (dto.subtotal ??
        items.reduce((s, it) => s + (it.subtotal || it.subTotal || 0), 0)) -
        (dto.discountAmount ?? 0) +
        (dto.shippingFee ?? 0),
    paymentMethod: dto.paymentMethod || 'COD',
    status: (() => {
      const raw = (dto.status || '').toString().toUpperCase()
      if (raw === 'PENDING') return 'Chờ xác nhận'
      if (raw === 'PACKAGING') return 'Đang đóng gói'
      if (raw === 'DELIVERING') return 'Đang giao'
      // Backward compatibility (nếu backend dùng SHIPPPING thay vì DELIVERING)
      if (raw === 'SHIPPING') return 'Đang giao'
      if (raw === 'COMPLETED') return 'Hoàn thành'
      if (raw === 'CANCELLED' || raw === 'CANCELED') return 'Đã hủy'
      return 'Chờ xác nhận'
    })(),
    note: '',
    items: items.map((it) => ({
      productId: it.productId,
      name: it.productName,
      qty: it.quantity,
      price: it.price,
      discountPerItem: it.discountPerItem || 0,
      /** Nếu BE trả sẵn giảm voucher / SP — ưu tiên hơn phân bổ FE */
      voucherDiscountPerItem:
        it.voucherDiscountPerItem != null ? Number(it.voucherDiscountPerItem) : null,
    })),
  }
}

function fmt(n) { return Number(n).toLocaleString('vi-VN') + 'đ' }

/**
 * Phân bổ tổng giảm voucher đơn hàng xuống mỗi đơn vị sản phẩm (theo tỷ lệ giá trị dòng = price * qty).
 * Dòng cuối nhận phần dư để tổng khớp order.discountAmount (làm tròn VND).
 */
function allocateVoucherDiscountPerUnit(items, orderDiscountAmount) {
  const totalDiscount = Math.round(Number(orderDiscountAmount) || 0)
  if (totalDiscount <= 0 || !items?.length) return items.map(() => 0)

  const lineBases = items.map((it) => {
    const p = Number(it.price) || 0
    const q = Number(it.qty ?? it.quantity) || 0
    return Math.round(p * q)
  })
  const sumBase = lineBases.reduce((a, b) => a + b, 0)
  if (sumBase <= 0) return items.map(() => 0)

  let allocated = 0
  const lineVouchers = lineBases.map((base, i) => {
    if (i === lineBases.length - 1) return Math.max(0, totalDiscount - allocated)
    const v = Math.round((totalDiscount * base) / sumBase)
    allocated += v
    return v
  })

  return items.map((it, i) => {
    const q = Number(it.qty ?? it.quantity) || 0
    if (q <= 0) return 0
    return lineVouchers[i] / q
  })
}

// ── Status Badge ──
function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] || { bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0', icon: '•' }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 12px', borderRadius: 20, fontSize: 12.5, fontWeight: 700,
      background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
    }}>
      {cfg.icon} {status}
    </span>
  )
}

// ── Order Detail Modal ──
const ALL_STATUSES = ['Chờ xác nhận', 'Đang đóng gói', 'Đang giao', 'Hoàn thành', 'Đã hủy']

const SUCCESS_STATUS = 'Hoàn thành'
/** Chỉ khi đang giao mới cho admin đánh dấu hoàn thành */
const DELIVERING_STATUS = 'Đang giao'
const PACKAGING_STATUS = 'Đang đóng gói'

/** Admin: cho hủy mọi trạng thái trừ hoàn thành / đã hủy (CANCELLED) */
const canAdminCancelOrder = (o) =>
  o.status !== 'Hoàn thành' && o.status !== 'Đã hủy'

function OrderDetailModal({ order, onClose, onUpdateStatus }) {
  const totalCalc = order.items.reduce((s, i) => s + i.qty * i.price, 0)
  const canMarkSuccess = order.status === DELIVERING_STATUS

  const markSuccess = () => {
    onUpdateStatus(order.id, SUCCESS_STATUS)
    toast.success('Đã cập nhật trạng thái đơn hàng thành Hoàn thành.')
  }

  const customerFields = [
    { icon: '\ud83d\udc64', label: 'Họ và tên', value: order.customer },
    { icon: '\ud83d\udcde', label: 'Số điện thoại', value: order.phone },
    { icon: '\ud83d\udccd', label: 'Địa chỉ giao hàng', value: order.address },
    { icon: '\ud83d\udcc5', label: 'Ngày đặt hàng', value: `${order.time} ${order.date}` },
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, width: 620, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,0.18)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '24px 28px 0' }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', margin: 0 }}>Chi Tiết Đơn Hàng</h2>
            <p style={{ color: PRIMARY, fontSize: 13, fontWeight: 600, margin: '2px 0 0' }}>{order.id}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 22, marginTop: 2 }}><FiX /></button>
        </div>

        <div style={{ padding: '20px 28px 28px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Customer info card */}
          <div>
            <p style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>Thông Tin Khách Hàng</p>
            <div style={{ background: '#f8fafc', borderRadius: 12, overflow: 'hidden' }}>
              {customerFields.map((f, i) => (
                <div key={f.label} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  padding: '14px 18px',
                  borderBottom: i < customerFields.length - 1 ? '1px solid #e9eef3' : 'none',
                }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, color: PRIMARY, fontWeight: 600, marginBottom: 2 }}>{f.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{f.value}</div>
                  </div>
                </div>
              ))}
              {order.note && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 18px', borderTop: '1px solid #e9eef3', background: '#fffbeb' }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>📝</span>
                  <div>
                    <div style={{ fontSize: 12, color: '#d97706', fontWeight: 600, marginBottom: 2 }}>Ghi chú</div>
                    <div style={{ fontSize: 14, color: '#92400e', fontWeight: 500 }}>{order.note}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products */}
          <div>
            <p style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>Sản Phẩm ({order.items.length})</p>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ textAlign: 'left', padding: '10px 16px', fontWeight: 700, color: '#64748b', fontSize: 12.5, borderBottom: '1px solid #e2e8f0' }}>Sản phẩm</th>
                    <th style={{ textAlign: 'center', padding: '10px 16px', fontWeight: 700, color: '#64748b', fontSize: 12.5, borderBottom: '1px solid #e2e8f0', width: 60 }}>SL</th>
                    <th style={{ textAlign: 'right', padding: '10px 16px', fontWeight: 700, color: '#64748b', fontSize: 12.5, borderBottom: '1px solid #e2e8f0' }}>Đơn giá</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((it, i) => (
                    <tr key={i} style={{ borderBottom: i < order.items.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <td style={{ padding: '12px 16px', color: PRIMARY, fontWeight: 500 }}>{it.name}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#374151' }}>{it.qty}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: '#374151', fontWeight: 600 }}>{fmt(it.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Total outside table */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 4px 0' }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Tổng cộng:</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: PRIMARY }}>{fmt(totalCalc)}</span>
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, flexWrap: 'wrap' }}>
            {canMarkSuccess && (
              <button
                type="button"
                onClick={markSuccess}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '11px 22px',
                  borderRadius: 10,
                  border: 'none',
                  background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(117,176,111,0.4)',
                }}
              >
                <FiCheck size={18} />
                Hoàn thành đơn hàng
              </button>
            )}
      
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Confirm Order Modal (simple version) ──
function ConfirmOrderModal({ order, onClose, onConfirm }) {
  const isCOD = (order.paymentMethod || '').toUpperCase() === 'COD'

  const [shippingName, setShippingName] = useState(order.customer || '')
  const [shippingPhone, setShippingPhone] = useState(order.phone || '')
  const [shippingAddress, setShippingAddress] = useState(order.address || '')
  const [shippingFee, setShippingFee] = useState(order.shippingFee || 0)

  const voucherPerUnitFromOrder = allocateVoucherDiscountPerUnit(
    order.items,
    order.discountAmount ?? 0
  )

  const [rows, setRows] = useState(
    order.items.map((it, idx) => ({
      productId: it.productId,
      name: it.name,
      orderedQty: it.qty,
      providedQty: it.qty,
      price: it.price,
      discountPerItem: it.discountPerItem || 0,
      voucherDiscountPerItem:
        it.voucherDiscountPerItem != null && it.voucherDiscountPerItem !== ''
          ? Number(it.voucherDiscountPerItem)
          : voucherPerUnitFromOrder[idx] || 0,
    }))
  )

  /** Giá sau giảm chương trình (discount program) */
  const unitPriceAfterProgram = (row) =>
    Math.max(0, (row.price || 0) - (row.discountPerItem || 0))

  /** Giá sau giảm cả chương trình + voucher (theo dòng đơn) */
  const unitNetPrice = (row) =>
    Math.max(0, unitPriceAfterProgram(row) - (row.voucherDiscountPerItem || 0))

  const totalRefundAmount = rows.reduce((sum, r) => {
    if (isCOD) return sum
    const missing = r.orderedQty - r.providedQty
    if (missing <= 0) return sum
    return sum + unitNetPrice(r) * missing
  }, 0)

  const discountFromVoucher = order.discountAmount || 0
  const finalTotal = order.total || 0

  const paymentLabel =
    (order.paymentMethod || '').toUpperCase() === 'ONLINE'
      ? 'Thanh toán Online'
      : 'Thanh toán khi nhận hàng (COD)'

  const handleRowChange = (index, field, value) => {
    setRows((prev) =>
      prev.map((r, i) => {
        if (i !== index) return r
        let v = Number(value) || 0
        if (field === 'providedQty') {
          if (v < 0) v = 0
          if (v > r.orderedQty) v = r.orderedQty
          return { ...r, providedQty: v }
        }
        return r
      })
    )
  }

  const handleSubmit = () => {
    for (const r of rows) {
      if (r.providedQty < 0 || r.providedQty > r.orderedQty) {
        toast.error(`Số lượng giao thực tế không hợp lệ cho sản phẩm ${r.name}`)
        return
      }
    }

    const totalProvided = rows.reduce((sum, r) => sum + (Number(r.providedQty) || 0), 0)
    if (totalProvided <= 0) {
      toast.error('Tổng số lượng giao phải lớn hơn 0.')
      return
    }

    const orderTotal = order.total || 0
    if (!isCOD && totalRefundAmount > orderTotal) {
      toast.error('Tổng tiền hoàn không được lớn hơn tổng thanh toán của đơn hàng.')
      return
    }

    const payload = {
      orderId: order.orderId,
      shippingName,
      shippingPhone,
      shippingAddress,
      shippingFee: Number(shippingFee) || 0,
      action: 0, // OrderAction.Confirm
      orderDetails: rows.map((r) => {
        const missing = r.orderedQty - r.providedQty
        const refundAmount = isCOD ? 0 : unitNetPrice(r) * missing
        return {
          productId: r.productId,
          quantity: r.providedQty,
          refundAmount,
        }
      }),
    }

    onConfirm(payload)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          width: 820,
          maxHeight: '90vh',
          boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
          padding: '22px 24px 18px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Xác Nhận Đơn Hàng</h2>
            <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }}>{order.id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: 22,
              color: '#94a3b8',
            }}
          >
            <FiX />
          </button>
        </div>

        {/* Shipping info */}
        <div style={{ fontSize: 13, marginBottom: 16 }}>
          <p style={{ color: '#6b7280', marginBottom: 6 }}>Thông tin giao hàng</p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
              gap: 10,
              marginBottom: 8,
            }}
          >
            <div>
              <label style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>
                Tên người nhận
              </label>
              <input
                value={shippingName}
                onChange={(e) => setShippingName(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: 4,
                  padding: '7px 10px',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  fontSize: 13,
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>
                Số điện thoại
              </label>
              <input
                value={shippingPhone}
                onChange={(e) => setShippingPhone(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: 4,
                  padding: '7px 10px',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  fontSize: 13,
                }}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>
                Địa chỉ giao hàng
              </label>
              <input
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: 4,
                  padding: '7px 10px',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  fontSize: 13,
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>
                Phí vận chuyển
              </label>
              <input
                type="number"
                value={shippingFee}
                onChange={(e) => setShippingFee(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: 4,
                  padding: '7px 10px',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  fontSize: 13,
                }}
              />
            </div>
          </div>
        </div>

        {/* Items table */}
        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 6 }}>Cập nhật số lượng</p>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '8px 10px', textAlign: 'left' }}>Sản phẩm</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center', width: 70 }}>SL đặt</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center', width: 90 }}>SL giao</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right', width: 90 }}>Giá bán</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right', width: 130, lineHeight: 1.25 }}>
                    <span style={{ display: 'inline-block', textAlign: 'right' }}>
                      Giá sau giảm
                      <br />
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#64748b' }}>
                        (Program + Voucher)
                      </span>
                    </span>
                  </th>
                  {!isCOD && (
                    <th style={{ padding: '8px 10px', textAlign: 'right', width: 120 }}>
                      Tiền hoàn dự kiến
                    </th>
                  )}
                  <th style={{ padding: '8px 10px', textAlign: 'right', width: 110 }}>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => {
                  const missing = r.orderedQty - r.providedQty
                  const lineRefundEstimate = unitNetPrice(r) * missing
                  const lineTotal = unitNetPrice(r) * r.providedQty
                  return (
                    <tr key={r.productId}>
                      <td style={{ padding: '8px 10px' }}>
                        <div style={{ fontWeight: 600, color: '#111827' }}>{r.name}</div>
                        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>
                          Thiếu: {missing} / {r.orderedQty}
                        </div>
                      </td>
                      <td style={{ padding: '8px 10px', textAlign: 'center' }}>{r.orderedQty}</td>
                      <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                        <input
                          type="number"
                          value={r.providedQty}
                          onChange={(e) => handleRowChange(idx, 'providedQty', e.target.value)}
                          style={{
                            width: 70,
                            padding: '4px 6px',
                            borderRadius: 6,
                            border: '1px solid #e5e7eb',
                            textAlign: 'center',
                          }}
                        />
                      </td>
                      <td
                        style={{
                          padding: '8px 10px',
                          textAlign: 'right',
                          fontWeight: 500,
                          color: '#374151',
                        }}
                      >
                        {fmt(r.price || 0)}
                      </td>
                      <td
                        style={{
                          padding: '8px 10px',
                          textAlign: 'right',
                          fontWeight: 500,
                          color: '#16a34a',
                        }}
                      >
                        {fmt(unitNetPrice(r))}
                      </td>
                      {!isCOD && (
                        <td
                          style={{
                            padding: '8px 10px',
                            textAlign: 'right',
                            fontWeight: 600,
                            color: missing > 0 ? '#b45309' : '#94a3b8',
                          }}
                        >
                          {missing > 0 ? fmt(lineRefundEstimate) : '—'}
                        </td>
                      )}
                      <td
                        style={{
                          padding: '8px 10px',
                          textAlign: 'right',
                          fontWeight: 600,
                          color: '#111827',
                        }}
                      >
                        {fmt(lineTotal)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {!isCOD && (
            <div style={{ fontSize: 12, color: '#b45309', marginTop: 6 }}>
              Tổng tiền hoàn dự kiến:{' '}
              <strong>{fmt(totalRefundAmount)}</strong>
            </div>
          )}
          <div
            style={{
              marginTop: 8,
              paddingTop: 8,
              borderTop: '1px dashed #e5e7eb',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              fontSize: 12.5,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Phương thức thanh toán</span>
              <span style={{ fontWeight: 600, color: '#111827' }}>{paymentLabel}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Giảm giá từ voucher</span>
              <span style={{ fontWeight: 600, color: '#b91c1c' }}>
                -{fmt(discountFromVoucher)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <span style={{ color: '#111827', fontWeight: 700 }}>Tổng thanh toán</span>
              <span style={{ fontWeight: 800, color: PRIMARY }}>{fmt(finalTotal)}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 18px',
              borderRadius: 10,
              border: '1.5px solid #e2e8f0',
              background: '#f9fafb',
              color: '#374151',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            style={{
              padding: '8px 22px',
              borderRadius: 10,
              border: 'none',
              background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`,
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main View ──
export default function OrderManagementView() {
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Tất cả')
  const [showFilter, setShowFilter] = useState(false)
  const [detailOrder, setDetailOrder] = useState(null)
  const [confirmOrder, setConfirmOrder] = useState(null)
  const [cancelAdminOrder, setCancelAdminOrder] = useState(null)
  const [adminCancelReason, setAdminCancelReason] = useState('')
  const [adminCancelSubmitting, setAdminCancelSubmitting] = useState(false)

  const reloadAdminOrders = async () => {
    const reload = await getOrders()
    const raw = Array.isArray(reload.data) ? reload.data : reload.data?.data || []
    const mapped = raw.map(mapApiOrderToAdmin)
    setOrders(mapped)
    return mapped
  }

  const handleAdminCancelConfirm = async () => {
    if (!cancelAdminOrder) return
    const reason = adminCancelReason.trim()
    if (!reason) {
      toast.error('Vui lòng nhập lý do hủy đơn.')
      return
    }
    const oid = cancelAdminOrder.orderId
    try {
      setAdminCancelSubmitting(true)
      const res = await cancelOrder({
        orderId: oid,
        cancelReason: reason,
      })
      if (res?.success) {
        toast.success(res.message || 'Đã hủy đơn hàng.')
        setCancelAdminOrder(null)
        setAdminCancelReason('')
        const mapped = await reloadAdminOrders()
        setDetailOrder((prev) => {
          if (!prev || prev.orderId !== oid) return prev
          return mapped.find((x) => x.orderId === oid) || prev
        })
      } else {
        toast.error(res?.message || 'Hủy đơn thất bại.')
      }
    } catch (err) {
      toast.error(err?.message || 'Hủy đơn thất bại.')
    } finally {
      setAdminCancelSubmitting(false)
    }
  }

  const handleTransitionAction = async (order, action, successMessage) => {
    try {
      const payload = {
        orderId: order.orderId,
        shippingName: order.customer,
        shippingPhone: order.phone,
        shippingAddress: order.address,
        shippingFee: Number(order.shippingFee) || 0,
        action,
        orderDetails: [],
      }

      const res = await updateOrder(payload)
      if (res?.success) {
        toast.success(res.message || successMessage || 'Cập nhật trạng thái thành công.')
        const reload = await getOrders()
        const raw = Array.isArray(reload.data) ? reload.data : reload.data?.data || []
        const mapped = raw.map(mapApiOrderToAdmin)
        setOrders(mapped)
        setDetailOrder((prev) => {
          if (!prev) return prev
          if (prev.orderId !== order.orderId) return prev
          return mapped.find((x) => x.orderId === order.orderId) || prev
        })
      } else {
        toast.error(res?.message || 'Cập nhật trạng thái thất bại.')
      }
    } catch (err) {
      toast.error(err?.message || 'Cập nhật trạng thái thất bại.')
    }
  }

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await getOrders()
        const raw = Array.isArray(res.data) ? res.data : res.data?.data || []
        setOrders(raw.map(mapApiOrderToAdmin))
      } catch (err) {
        console.error('Failed to load admin orders', err)
        toast.error('Không tải được danh sách đơn hàng.')
      }
    }
    loadOrders()
  }, [])

  const handleUpdateStatus = (id, newStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)))
    setDetailOrder((prev) => (prev && prev.id === id ? { ...prev, status: newStatus } : prev))
  }

  const allStatuses = ['Tất cả', ...Object.keys(STATUS_CFG)]

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search)
    const matchFilter = filter === 'Tất cả' || o.status === filter
    return matchSearch && matchFilter
  })

  const counts = {
    total: orders.length,
    'Chờ xác nhận': orders.filter((o) => o.status === 'Chờ xác nhận').length,
    'Đang đóng gói': orders.filter((o) => o.status === 'Đang đóng gói').length,
    'Đang giao': orders.filter((o) => o.status === 'Đang giao').length,
    'Hoàn thành': orders.filter((o) => o.status === 'Hoàn thành').length,
    'Đã hủy': orders.filter((o) => o.status === 'Đã hủy').length,
  }

  const statCards = [
    { label: 'Tổng đơn', value: counts.total, color: '#0f172a', icon: '🛒' },
    { label: 'Chờ xác nhận', value: counts['Chờ xác nhận'], color: '#d97706', icon: '⏱' },
    { label: 'Đang đóng gói', value: counts['Đang đóng gói'], color: '#2563eb', icon: '📦' },
    { label: 'Đang giao', value: counts['Đang giao'], color: '#7c3aed', icon: '🚚' },
    { label: 'Hoàn thành', value: counts['Hoàn thành'], color: PRIMARY_DARK, icon: '✅' },
    { label: 'Đã hủy', value: counts['Đã hủy'], color: '#dc2626', icon: '🚫' },
  ]

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: 0 }}>Quản Lý Đơn Hàng</h1>
        <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>Theo dõi và quản lý tất cả đơn hàng</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 24 }}>
        {statCards.map((s) => (
          <div
            key={s.label}
            onClick={() => setFilter(s.label === 'Tổng đơn' ? 'Tất cả' : s.label)}
            style={{
              background: '#fff', borderRadius: 12, padding: '14px 16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)', cursor: 'pointer',
              border: `2px solid ${(filter === s.label || (filter === 'Tất cả' && s.label === 'Tổng đơn')) ? s.color + '60' : 'transparent'}`,
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)')}
          >
            <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, lineHeight: 1.1 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <FiSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 16 }} />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo mã đơn, tên khách hàng, số điện thoại..."
            style={{ width: '100%', padding: '11px 14px 11px 42px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#fff', color: '#374151' }}
            onFocus={(e) => (e.target.style.borderColor = PRIMARY)}
            onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowFilter((v) => !v)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#fff', color: '#374151', fontWeight: 600, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            🔽 {filter} <FiChevronDown style={{ fontSize: 14 }} />
          </button>
          {showFilter && (
            <div style={{ position: 'absolute', top: '110%', right: 0, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 50, minWidth: 180, overflow: 'hidden' }}>
              {allStatuses.map((s) => (
                <button
                  key={s} onClick={() => { setFilter(s); setShowFilter(false) }}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', background: filter === s ? '#f0fdf4' : '#fff', color: filter === s ? PRIMARY_DARK : '#374151', fontWeight: filter === s ? 700 : 400, fontSize: 13.5, cursor: 'pointer' }}
                  onMouseEnter={(e) => { if (filter !== s) e.currentTarget.style.background = '#f8fafc' }}
                  onMouseLeave={(e) => { if (filter !== s) e.currentTarget.style.background = '#fff' }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
          <thead>
            <tr>
              {['Mã đơn hàng', 'Khách hàng', 'Ngày đặt', 'Tổng tiền', 'Trạng thái', 'Thao tác'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '11px 16px', fontWeight: 700, color: '#64748b', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 48, color: '#94a3b8', fontSize: 14 }}>Không tìm thấy đơn hàng nào.</td></tr>
            ) : filtered.map((o, i) => (
              <tr
                key={o.id}
                style={{ background: i % 2 === 0 ? '#fff' : '#fafafa', transition: 'background 0.12s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f0fdf4')}
                onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#fafafa')}
              >
                <td style={{ padding: '14px 16px', fontWeight: 700, color: '#1e293b', borderBottom: '1px solid #f1f5f9' }}>{o.id}</td>
                <td style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ fontWeight: 600, color: '#1e293b', fontSize: 14 }}>{o.customer}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12.5 }}>{o.phone}</div>
                </td>
                <td style={{ padding: '14px 16px', color: '#374151', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: 13 }}>{o.time} {o.date}</div>
                </td>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #f1f5f9' }}>{fmt(o.total)}</td>
                <td style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9' }}>
                  <StatusBadge status={o.status} />
                </td>
                <td style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                    {o.status === 'Chờ xác nhận' && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setConfirmOrder(o)
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '7px 14px',
                          borderRadius: 8,
                          border: '1.5px solid #f97316',
                          background: '#fffbeb',
                          color: '#c2410c',
                          fontWeight: 700,
                          fontSize: 12.5,
                          cursor: 'pointer',
                        }}
                      >
                        ✅ Xác nhận
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setDetailOrder(o)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 8, border: 'none', background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', boxShadow: '0 1px 4px rgba(117,176,111,0.35)' }}
                    >
                      👁 Chi tiết
                    </button>
                    {o.status === PACKAGING_STATUS && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleTransitionAction(o, 1, 'Đã cập nhật trạng thái vận chuyển thành Đang giao.')
                        }}
                        title="Chuyển từ đóng gói sang đang giao"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          padding: '7px 12px',
                          borderRadius: 8,
                          border: `1.5px solid ${PRIMARY}55`,
                          background: '#eef2ff',
                          color: '#3730a3',
                          fontWeight: 700,
                          fontSize: 12.5,
                          cursor: 'pointer',
                        }}
                      >
                        🚚 Vận chuyển
                      </button>
                    )}
                    {o.status === DELIVERING_STATUS && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleTransitionAction(o, 2, 'Đã cập nhật trạng thái đơn hàng thành Hoàn thành.')
                        }}
                        title="Đánh dấu đơn giao thành công"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          padding: '7px 12px',
                          borderRadius: 8,
                          border: `1.5px solid ${PRIMARY}55`,
                          background: '#f0fdf4',
                          color: PRIMARY_DARK,
                          fontWeight: 700,
                          fontSize: 12.5,
                          cursor: 'pointer',
                        }}
                      >
                        <FiCheck size={15} />
                        Hoàn thành
                      </button>
                    )}
                    {canAdminCancelOrder(o) && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setCancelAdminOrder(o)
                          setAdminCancelReason('')
                        }}
                        title="Hủy đơn hàng"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          padding: '7px 12px',
                          borderRadius: 8,
                          border: '1.5px solid #fecaca',
                          background: '#fef2f2',
                          color: '#b91c1c',
                          fontWeight: 700,
                          fontSize: 12.5,
                          cursor: 'pointer',
                        }}
                      >
                        Hủy đơn
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9', color: '#64748b', fontSize: 13 }}>
          Hiển thị <strong>{filtered.length}</strong> / <strong>{orders.length}</strong> đơn hàng
          {filter !== 'Tất cả' && <span style={{ marginLeft: 10, background: '#f0fdf4', color: PRIMARY_DARK, padding: '2px 10px', borderRadius: 20, fontWeight: 600, fontSize: 12 }}>Lọc: {filter}</span>}
        </div>
      </div>

      {cancelAdminOrder && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={() => !adminCancelSubmitting && setCancelAdminOrder(null)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 14,
              maxWidth: 440,
              width: '100%',
              padding: 22,
              boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 800, color: '#0f172a' }}>
              Hủy đơn hàng
            </h3>
            <p style={{ margin: '0 0 14px', fontSize: 13, color: '#64748b' }}>
              Mã đơn: <strong>{cancelAdminOrder.id}</strong>
            </p>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>
              Lý do hủy
            </label>
            <textarea
              value={adminCancelReason}
              onChange={(e) => setAdminCancelReason(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                padding: '8px 10px',
                fontSize: 13,
                marginBottom: 16,
              }}
              placeholder="Nhập lý do..."
            />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                type="button"
                disabled={adminCancelSubmitting}
                onClick={() => setCancelAdminOrder(null)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: adminCancelSubmitting ? 'not-allowed' : 'pointer',
                }}
              >
                Đóng
              </button>
              <button
                type="button"
                disabled={adminCancelSubmitting}
                onClick={handleAdminCancelConfirm}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#dc2626',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: adminCancelSubmitting ? 'not-allowed' : 'pointer',
                  opacity: adminCancelSubmitting ? 0.7 : 1,
                }}
              >
                {adminCancelSubmitting ? 'Đang xử lý...' : 'Xác nhận hủy'}
              </button>
            </div>
          </div>
        </div>
      )}

      {detailOrder && (
        <OrderDetailModal
          order={detailOrder}
          onClose={() => setDetailOrder(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {confirmOrder && (
        <ConfirmOrderModal
          order={confirmOrder}
          onClose={() => setConfirmOrder(null)}
          onConfirm={async (payload) => {
            try {
              const res = await updateOrder(payload)
              if (res?.success) {
                toast.success(res.message || 'Cập nhật đơn hàng thành công.')
                // reload orders
                const reload = await getOrders()
                const raw = Array.isArray(reload.data) ? reload.data : reload.data?.data || []
                setOrders(raw.map(mapApiOrderToAdmin))
                setConfirmOrder(null)
              } else {
                toast.error(res?.message || 'Cập nhật đơn hàng thất bại.')
              }
            } catch (err) {
              toast.error(err?.message || 'Cập nhật đơn hàng thất bại.')
            }
          }}
        />
      )}
    </div>
  )
}
