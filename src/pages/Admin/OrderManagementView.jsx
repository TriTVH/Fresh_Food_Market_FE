import { useState, useEffect } from 'react'
import { FiSearch, FiX, FiCheck } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { getOrders } from '@/api/orderApi'
import { mapOrderDtoToFrontend } from '@/utils/mapper'

const PRIMARY = '#75b06f'
const PRIMARY_DARK = '#5a9450'

const STATUS_CFG = {
  pending:   { label: 'Chờ Xử Lý',    bg: '#fffbeb', color: '#d97706', border: '#fde68a', icon: '⏱' },
  packing:   { label: 'Đóng Gói',      bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe', icon: '📦' },
  shipping:  { label: 'Đang Giao',     bg: '#f5f3ff', color: '#7c3aed', border: '#ddd6fe', icon: '🚚' },
  success:   { label: 'Hoàn Thành',    bg: '#f0fdf4', color: PRIMARY_DARK, border: '#bbf7d0', icon: '✅' },
  failed:    { label: 'Đã Hủy',        bg: '#fef2f2', color: '#dc2626', border: '#fecaca', icon: '🚫' },
}

function fmt(n) { return new Intl.NumberFormat('vi-VN').format(n) + 'đ' }

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] || { bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0', icon: '•', label: status }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 12px', borderRadius: 20, fontSize: 12.5, fontWeight: 700,
      background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
    }}>
      {cfg.icon} {cfg.label}
    </span>
  )
}

// ── Order Detail Modal ──
function OrderDetailModal({ order, onClose, onUpdateStatus }) {
  const totalCalc = order.items
    ? order.items.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0)
    : order.total_amount || 0

  const addr = order.shipping_address || {}
  const customerFields = [
    { icon: '👤', label: 'Người đặt', value: order.order_id || '—' },
    { icon: '📍', label: 'Địa chỉ', value: [addr.street, addr.ward, addr.city].filter(Boolean).join(', ') || '—' },
    { icon: '📅', label: 'Ngày đặt', value: order.order_date ? new Date(order.order_date).toLocaleString('vi-VN') : '—' },
    { icon: '💳', label: 'Thanh toán', value: order.payment_method || '—' },
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, width: 620, maxHeight: '90vh', overflowY: 'auto', padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>Chi Tiết #{order.order_id}</h2>
          <button onClick={onClose}><FiX /></button>
        </div>

        {/* Status buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {Object.entries(STATUS_CFG).map(([s, cfg]) => (
            <button
              key={s}
              onClick={() => onUpdateStatus(order.order_id, s)}
              style={{
                padding: '6px 12px',
                background: order.status === s ? cfg.bg : '#fff',
                border: `1px solid ${order.status === s ? cfg.border : '#ddd'}`,
                color: order.status === s ? cfg.color : '#374151',
                borderRadius: 8, fontSize: 12, fontWeight: order.status === s ? 700 : 400, cursor: 'pointer'
              }}
            >
              {cfg.icon} {cfg.label}
            </button>
          ))}
        </div>

        {/* Customer info */}
        <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, marginBottom: 20 }}>
          {customerFields.map(f => (
            <div key={f.label} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: '#64748b' }}>{f.icon} {f.label}</div>
              <div style={{ fontWeight: 600 }}>{f.value}</div>
            </div>
          ))}
        </div>

        {/* Items */}
        {order.items && order.items.length > 0 && (
          <div style={{ border: '1px solid #eee', borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: 10, textAlign: 'left' }}>Sản phẩm</th>
                  <th style={{ padding: 10, textAlign: 'center' }}>SL</th>
                  <th style={{ padding: 10, textAlign: 'right' }}>Đơn giá</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((it, i) => (
                  <tr key={i}>
                    <td style={{ padding: 10 }}>{it.name}</td>
                    <td style={{ padding: 10, textAlign: 'center' }}>{it.quantity}</td>
                    <td style={{ padding: 10, textAlign: 'right' }}>{fmt(it.price || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Total */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px 20px' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Tổng cộng:</span>
          <span style={{ fontSize: 18, fontWeight: 800, color: PRIMARY }}>{fmt(totalCalc)}</span>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            style={{ padding: '11px 32px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#f8fafc', color: '#374151', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}

export default function OrderManagementView() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [detailOrder, setDetailOrder] = useState(null)

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      try {
        const response = await getOrders()
        const rawList = Array.isArray(response) ? response : (response?.data || [])
        setOrders(rawList.map(mapOrderDtoToFrontend))
      } catch (err) {
        console.error('Failed to load orders:', err)
        toast.error('Không tải được danh sách đơn hàng.')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const handleUpdateStatus = (id, newStatus) => {
    setOrders((prev) => prev.map((o) => (o.order_id === id ? { ...o, status: newStatus } : o)))
    setDetailOrder((prev) => (prev && prev.order_id === id ? { ...prev, status: newStatus } : prev))
  }

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      String(o.order_id).toLowerCase().includes(q) ||
      (o.payment_method || '').toLowerCase().includes(q)
    const matchFilter = filter === 'all' || o.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: 0 }}>Quản Lý Đơn Hàng</h1>
        <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>Dữ liệu thực tế từ Order Service</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 220px' }}>
          <FiSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo mã đơn, thanh toán..."
            style={{ width: '100%', padding: '11px 14px 11px 42px', border: '1.5px solid #e2e8f0', borderRadius: 10, boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[['all', 'Tất cả'], ...Object.entries(STATUS_CFG).map(([k, v]) => [k, v.label])].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                padding: '8px 14px', borderRadius: 8, border: '1.5px solid',
                borderColor: filter === key ? PRIMARY : '#e2e8f0',
                background: filter === key ? '#f0fdf4' : '#fff',
                color: filter === key ? PRIMARY_DARK : '#374151',
                fontWeight: filter === key ? 700 : 400, fontSize: 13, cursor: 'pointer'
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
          <thead>
            <tr>
              {['Mã đơn hàng', 'Ngày đặt', 'Tổng tiền', 'Trạng thái', 'Thao tác'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '11px 16px', fontWeight: 700, color: '#64748b', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 48, color: '#94a3b8', fontSize: 14 }}>Đang tải đơn hàng...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 48, color: '#94a3b8', fontSize: 14 }}>Không tìm thấy đơn hàng nào.</td></tr>
            ) : filtered.map((o, i) => (
              <tr
                key={o.order_id}
                style={{ background: i % 2 === 0 ? '#fff' : '#fafafa', transition: 'background 0.12s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f0fdf4')}
                onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#fafafa')}
              >
                <td style={{ padding: '14px 16px', fontWeight: 700, color: PRIMARY, borderBottom: '1px solid #f1f5f9' }}>{o.order_id}</td>
                <td style={{ padding: '14px 16px', color: '#374151', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                  {o.order_date ? new Date(o.order_date).toLocaleDateString('vi-VN') : '—'}
                </td>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #f1f5f9' }}>{fmt(o.total_amount || 0)}</td>
                <td style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9' }}>
                  <StatusBadge status={o.status} />
                </td>
                <td style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9' }}>
                  <button
                    type="button"
                    onClick={() => setDetailOrder(o)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 8, border: 'none', background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
                  >
                    👁 Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9', color: '#64748b', fontSize: 13 }}>
          Hiển thị <strong>{filtered.length}</strong> / <strong>{orders.length}</strong> đơn hàng
        </div>
      </div>

      {detailOrder && (
        <OrderDetailModal
          order={detailOrder}
          onClose={() => setDetailOrder(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  )
}
