import { useState } from 'react'
import { FiSearch, FiX, FiChevronDown } from 'react-icons/fi'

const PRIMARY = '#75b06f'
const PRIMARY_DARK = '#5a9450'

const STATUS_CFG = {
  'Chờ xác nhận': { bg: '#fffbeb', color: '#d97706', border: '#fde68a', icon: '⏱' },
  'Đang đóng gói': { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe', icon: '📦' },
  'Đang giao':     { bg: '#f5f3ff', color: '#7c3aed', border: '#ddd6fe', icon: '🚚' },
  'Hoàn thành':   { bg: '#f0fdf4', color: PRIMARY_DARK, border: '#bbf7d0', icon: '✅' },
  'Đã hủy':       { bg: '#fef2f2', color: '#dc2626', border: '#fecaca', icon: '🚫' },
}

const INIT_ORDERS = [
  {
    id: 'ORD001', customer: 'Nguyễn Văn A', phone: '0901234567',
    email: 'nguyenvana@email.com', address: '123 ĐưỜng ABC, Quận 1, TP.HCM',
    date: '15/01/2026', time: '10:30', total: 450000,
    status: 'Chờ xác nhận', note: 'Giao trước 12 giờ',
    items: [
      { name: 'Cà chua bi', qty: 2, price: 95000 },
      { name: 'Rau muống', qty: 3, price: 86667 },
    ],
  },
  {
    id: 'ORD002', customer: 'Trần Thị B', phone: '0912345678',
    email: 'tranthib@email.com', address: '55 Nguyễn Huệ, Quận 1, TP.HCM',
    date: '14/01/2026', time: '14:20', total: 680000,
    status: 'Đang đóng gói', note: '',
    items: [
      { name: 'Thịt Bò Úc Thăn Nội', qty: 1, price: 380000 },
      { name: 'Nho Mỹ Đỏ', qty: 1, price: 180000 },
      { name: 'Rau Cải Xanh Đà Lạt', qty: 4, price: 25000 },
    ],
  },
  {
    id: 'ORD003', customer: 'Lê Văn C', phone: '0923456789',
    email: 'levanc@email.com', address: '88 Trần Hưng Đạo, Quận 5, TP.HCM',
    date: '13/01/2026', time: '09:15', total: 320000,
    status: 'Đang giao', note: 'Gọi điện trước khi giao',
    items: [
      { name: 'Tôm Sú Sống', qty: 1, price: 280000 },
      { name: 'Rau Cải Xanh', qty: 1, price: 25000 },
      { name: 'Cà Chua Bi Hồng', qty: 1, price: 15000 },
    ],
  },
  {
    id: 'ORD004', customer: 'Phạm Thị D', phone: '0934567890',
    email: 'phamthid@email.com', address: '23 Võ Văn Tần, Quận 3, TP.HCM',
    date: '12/01/2026', time: '16:45', total: 560000,
    status: 'Hoàn thành', note: '',
    items: [
      { name: 'Bơ Mexico', qty: 3, price: 120000 },
      { name: 'Táo Fuji Nhật Bản', qty: 2, price: 95000 },
      { name: 'Nho Mỹ Đỏ', qty: 1, price: 55000 },
    ],
  },
  {
    id: 'ORD005', customer: 'Hoàng Văn E', phone: '0945678901',
    email: 'hoangvane@email.com', address: '7 Phạm Ngọc Thạch, Quận 3, TP.HCM',
    date: '15/01/2026', time: '11:20', total: 890000,
    status: 'Chờ xác nhận', note: 'Để ở bảo vệ nếu không có ở nhà',
    items: [
      { name: 'Cá Hồi Nauy Phi Lê', qty: 1, price: 450000 },
      { name: 'Tôm Sú Sống', qty: 1, price: 280000 },
      { name: 'Rau Cải Xanh Đà Lạt', qty: 2, price: 25000 },
      { name: 'Bơ Mexico', qty: 1, price: 110000 },
    ],
  },
]

function fmt(n) { return Number(n).toLocaleString('vi-VN') + 'đ' }

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

function OrderDetailModal({ order, onClose, onUpdateStatus }) {
  const totalCalc = order.items.reduce((s, i) => s + i.qty * i.price, 0)

  const customerFields = [
    { icon: '\ud83d\udc64', label: 'Họ và tên', value: order.customer },
    { icon: '\ud83d\udcde', label: 'Số điện thoại', value: order.phone },
    { icon: '\u2709\ufe0f', label: 'Email', value: order.email || `${order.customer.toLowerCase().replace(/\s+/g, '')}@email.com` },
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
          {/* Status pill bar */}
          <div>
            <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600, margin: '0 0 10px' }}>Trạng thái đơn hàng</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {ALL_STATUSES.map((s) => {
                const cfg = STATUS_CFG[s] || {}
                const isActive = order.status === s
                return (
                  <button
                    key={s}
                    onClick={() => onUpdateStatus(order.id, s)}
                    style={{
                      padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: isActive ? 700 : 500,
                      border: isActive ? `2px solid ${cfg.color}` : '1.5px solid #e2e8f0',
                      background: isActive ? cfg.bg : '#fff',
                      color: isActive ? cfg.color : '#64748b',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = '#f8fafc' }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = '#fff' }}
                  >
                    {s}
                  </button>
                )
              })}
            </div>
          </div>

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
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={onClose} style={{ padding: '11px 32px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#f8fafc', color: '#374151', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Đóng</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main View ──
export default function OrderManagementView() {
  const [orders, setOrders] = useState(INIT_ORDERS)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Tất cả')
  const [showFilter, setShowFilter] = useState(false)
  const [detailOrder, setDetailOrder] = useState(null)

  const handleUpdateStatus = (id, newStatus) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: newStatus } : o))
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
                  <button
                    onClick={() => setDetailOrder(o)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 8, border: 'none', background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', boxShadow: '0 1px 4px rgba(117,176,111,0.35)' }}
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
          {filter !== 'Tất cả' && <span style={{ marginLeft: 10, background: '#f0fdf4', color: PRIMARY_DARK, padding: '2px 10px', borderRadius: 20, fontWeight: 600, fontSize: 12 }}>Lọc: {filter}</span>}
        </div>
      </div>

      {detailOrder && (
        <OrderDetailModal
          order={detailOrder}
          onClose={() => setDetailOrder(null)}
          onUpdateStatus={(id, status) => {
            handleUpdateStatus(id, status)
            setDetailOrder(null)
          }}
        />
      )}
    </div>
  )
}
