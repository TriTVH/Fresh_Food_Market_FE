import { useState } from 'react'
import { FiSearch, FiPlus, FiEye, FiCheckSquare, FiX, FiChevronDown, FiChevronRight } from 'react-icons/fi'
import { FiHash } from 'react-icons/fi'

const PRIMARY = '#75b06f'
const PRIMARY_DARK = '#5a9450'

const thStyle = {
  textAlign: 'left', padding: '10px 12px', fontWeight: 700,
  color: '#64748b', fontSize: 12, textTransform: 'uppercase',
  letterSpacing: '0.04em', background: '#f8fafc', borderBottom: '1px solid #e2e8f0',
}
const tdStyle = {
  padding: '13px 12px', color: '#374151', verticalAlign: 'middle', borderBottom: '1px solid #f1f5f9',
}
const iconBtn = (color) => ({
  width: 28, height: 28, borderRadius: 6, border: `1.5px solid ${color}20`,
  background: `${color}10`, color, display: 'flex', alignItems: 'center',
  justifyContent: 'center', cursor: 'pointer',
})

function fmt(n) { return Number(n).toLocaleString('vi-VN') + 'đ' }

const INIT_BATCHES = [
  {
    id: 'BATCH-2026-002', supplier: 'Nguyễn Văn A', phone: '0912345678',
    totalQty: 90, totalValue: 8940000,
    createdDate: '12/1/2026', deliveryDate: '12/1/2026', status: 'Đang Giao',
    items: [
      { product: 'Bơ Booth', qty: 60, remaining: 60, price: 89000, expiry: '25/1/2026' },
      { product: 'Đậu Tây Đà Lạt', qty: 30, remaining: 30, price: 120000, expiry: '25/1/2026' },
    ],
  },
  {
    id: 'BATCH-2026-001', supplier: 'Nguyễn Văn B', phone: '0987654321',
    totalQty: 80, totalValue: 2750000,
    createdDate: '10/1/2026', deliveryDate: '10/1/2026', status: 'Hoàn Thành',
    items: [
      { product: 'Táo Fuji Nhật Bản', qty: 80, remaining: 80, price: 95000, expiry: '20/2/2026' },
    ],
  },
]

// Product catalog for batch picking
const CATALOG = [
  { id: 'P001', name: 'Xà Lách Tươi', price: 28000, unit: '500gram', origin: 'Đà Lạt, Việt Nam' },
  { id: 'P002', name: 'Cà Chua Bi', price: 45000, unit: '500gram', origin: 'Đà Lạt, Việt Nam' },
  { id: 'P003', name: 'Bơ Booth', price: 89000, unit: 'Trái', origin: 'Úc' },
  { id: 'P004', name: 'Cá Hồi Nauy Phi Lê', price: 291000, unit: '100gram', origin: 'Na Uy' },
  { id: 'P005', name: 'Thịt Bò Úc Thăn Nội', price: 350000, unit: '500gram', origin: 'Úc' },
  { id: 'P006', name: 'Táo Fuji Nhật Bản', price: 95000, unit: '500gram', origin: 'Nhật Bản' },
  { id: 'P007', name: 'Tôm Sú Sống', price: 185000, unit: '500gram', origin: 'Việt Nam' },
  { id: 'P008', name: 'Rau Cải Xanh Đà Lạt', price: 22000, unit: '300gram', origin: 'Đà Lạt, Việt Nam' },
]

// ── Add Batch Modal ──
function AddBatchModal({ onClose, onConfirm, batchCount }) {
  const autoId = 'BATCH-2026-' + String(batchCount + 1).padStart(3, '0')
  const [supplier, setSupplier] = useState('Admin Fresh Market')
  const [productSearch, setProductSearch] = useState('')
  const [selected, setSelected] = useState([]) // [{...catalog item, qty, expiry}]

  const filteredCatalog = CATALOG.filter(
    (p) => p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(productSearch.toLowerCase())
  )

  const addProduct = (p) => {
    if (selected.find((s) => s.id === p.id)) return
    setSelected((prev) => [...prev, { ...p, qty: 1, expiry: '' }])
  }
  const removeProduct = (id) => setSelected((prev) => prev.filter((s) => s.id !== id))
  const setQty = (id, val) => setSelected((prev) => prev.map((s) => s.id === id ? { ...s, qty: Math.max(1, Number(val)) } : s))

  const totalQty = selected.reduce((sum, s) => sum + s.qty, 0)
  const totalValue = selected.reduce((sum, s) => sum + s.qty * s.price, 0)

  const handleAdd = () => {
    if (!supplier || selected.length === 0) return
    onConfirm({
      id: autoId, supplier,
      totalQty, totalValue,
      items: selected.map((s) => ({ product: s.name, qty: s.qty, remaining: s.qty, price: s.price, expiry: s.expiry || '—' })),
    })
    onClose()
  }

  const inputS = { width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13.5, outline: 'none', boxSizing: 'border-box', color: '#374151', background: '#fff' }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, width: 820, maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 60px rgba(0,0,0,0.22)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px 14px', borderBottom: '1px solid #f1f5f9' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>Thêm Lô Hàng Mới</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 20 }}><FiX /></button>
        </div>

        {/* Body: left + right panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {/* LEFT panel */}
          <div style={{ padding: '20px 24px', overflowY: 'auto', borderRight: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Thông tin lô */}
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', margin: '0 0 12px' }}>Thông Tin Lô Hàng</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Mã Lô Hàng <span style={{ color: '#ef4444' }}>*</span></label>
                  <input value={autoId} readOnly style={{ ...inputS, background: '#f8fafc', color: '#94a3b8' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Nhà Cung Cấp <span style={{ color: '#ef4444' }}>*</span></label>
                  <input value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder="VD: Nguyễn Văn A" style={inputS}
                    onFocus={(e) => (e.target.style.borderColor = PRIMARY)} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                </div>
              </div>
            </div>

            {/* Chọn sản phẩm */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', margin: 0 }}>Chọn Sản Phẩm</p>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <FiSearch style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 15 }} />
                <input value={productSearch} onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  style={{ ...inputS, paddingLeft: 34 }}
                  onFocus={(e) => (e.target.style.borderColor = PRIMARY)} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
              </div>
              {/* Product list */}
              <div style={{ border: '1.5px solid #e2e8f0', borderRadius: 10, overflow: 'hidden', maxHeight: 280, overflowY: 'auto' }}>
                {filteredCatalog.map((p, i) => {
                  const isAdded = !!selected.find((s) => s.id === p.id)
                  return (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', borderBottom: i < filteredCatalog.length - 1 ? '1px solid #f1f5f9' : 'none', background: isAdded ? '#f0fdf4' : '#fff' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: PRIMARY, fontSize: 14 }}>{p.name}</div>
                        <div style={{ fontSize: 12, color: '#64748b' }}>{fmt(p.price)} / {p.unit}</div>
                        <div style={{ fontSize: 11.5, color: PRIMARY, fontStyle: 'italic' }}>Nguồn: {p.origin}</div>
                      </div>
                      <button onClick={() => addProduct(p)} disabled={isAdded}
                        style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: isAdded ? '#e2e8f0' : `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, color: isAdded ? '#94a3b8' : '#fff', fontWeight: 700, fontSize: 12.5, cursor: isAdded ? 'default' : 'pointer', whiteSpace: 'nowrap' }}>
                        {isAdded ? '✓ Đã Thêm' : '+ Thêm'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* RIGHT panel */}
          <div style={{ padding: '20px 18px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 15 }}>🛒</span>
              <p style={{ fontWeight: 700, fontSize: 13.5, color: '#0f172a', margin: 0 }}>
                Sản Phẩm Đã Chọn ({selected.length})
              </p>
            </div>

            {selected.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#94a3b8', textAlign: 'center', paddingTop: 40 }}>
                <div style={{ fontSize: 40 }}>📦</div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>Chưa có sản phẩm</div>
                <div style={{ fontSize: 12 }}>Chọn từ danh sách bên trái</div>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selected.map((s) => (
                  <div key={s.id} style={{ border: '1.5px solid #e2e8f0', borderRadius: 10, padding: '10px 12px', background: '#fafafa' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a', flex: 1, paddingRight: 6 }}>{s.name}</div>
                      <button onClick={() => removeProduct(s.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 14, padding: 0, flexShrink: 0 }}>✕</button>
                    </div>
                    <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 6 }}>{fmt(s.price)} / {s.unit}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <label style={{ fontSize: 11.5, fontWeight: 600, color: '#374151' }}>SL:</label>
                      <input type="number" min={1} value={s.qty} onChange={(e) => setQty(s.id, e.target.value)}
                        style={{ width: 52, padding: '4px 6px', border: '1.5px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', textAlign: 'center' }}
                        onFocus={(e) => (e.target.style.borderColor = PRIMARY)} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                      <span style={{ fontSize: 12, color: PRIMARY, fontWeight: 700, marginLeft: 'auto' }}>{fmt(s.qty * s.price)}</span>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>Tổng ({totalQty} sp)</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: PRIMARY }}>{fmt(totalValue)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #f1f5f9', padding: '14px 28px', display: 'flex', gap: 12 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#fff', color: '#374151', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Hủy</button>
          <button onClick={handleAdd} disabled={selected.length === 0 || !supplier}
            style={{ flex: 2.5, padding: '12px', borderRadius: 10, border: 'none', background: selected.length === 0 || !supplier ? '#e2e8f0' : `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, color: selected.length === 0 || !supplier ? '#94a3b8' : '#fff', fontWeight: 700, fontSize: 14, cursor: selected.length === 0 || !supplier ? 'default' : 'pointer', boxShadow: selected.length > 0 ? '0 2px 8px rgba(117,176,111,0.35)' : 'none' }}>
            Thêm Lô Hàng
          </button>
        </div>
      </div>
    </div>
  )
}


// ── View Detail Modal ──
function ViewBatchModal({ batch, onClose }) {
  const totalQty = batch.items.reduce((s, i) => s + i.qty, 0)
  const totalRemaining = batch.items.reduce((s, i) => s + (i.remaining ?? i.qty), 0)
  const totalValue = batch.items.reduce((s, i) => s + i.qty * i.price, 0)

  const infoFields = [
    [['Mã Lô:', batch.id], ['Nhà Cung Cấp:', batch.supplier]],
    [['Số Điện Thoại:', batch.phone || '—'], ['Tổng Số Lượng:', batch.totalQty]],
    [['Tổng Giá Trị:', null, fmt(batch.totalValue)], ['Ngày Tạo:', batch.createdDate || '—']],
    [['Ngày Giao Hàng:', batch.deliveryDate || '—'], ['Trạng Thái:', null, null, batch.status]],
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, width: 620, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,0.2)' }}>
        {/* Modal header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 28px 16px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', margin: 0 }}>Chi Tiết Lô Hàng</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 22, lineHeight: 1 }}><FiX /></button>
        </div>

        <div style={{ padding: '0 28px 28px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Info card */}
          <div style={{ background: '#f8fafc', borderRadius: 12, padding: '20px 24px' }}>
            <p style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', margin: '0 0 16px' }}>Thông Tin Lô Hàng</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 32px' }}>
              {infoFields.map((row, ri) =>
                row.map(([label, plain, green, statusVal], ci) => (
                  <div key={`${ri}-${ci}`}>
                    <div style={{ fontSize: 12.5, color: '#64748b', marginBottom: 3 }}>{label}</div>
                    {statusVal ? (
                      <span style={{
                        display: 'inline-block', padding: '2px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700,
                        background: statusVal === 'Hoàn Thành' ? '#f0fdf4' : '#fff7ed',
                        color: statusVal === 'Hoàn Thành' ? PRIMARY_DARK : '#f97316',
                        border: `1px solid ${statusVal === 'Hoàn Thành' ? PRIMARY + '40' : '#fed7aa'}`,
                      }}>{statusVal}</span>
                    ) : (
                      <div style={{ fontSize: 15, fontWeight: 700, color: green ? PRIMARY : '#0f172a' }}>
                        {green || plain}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Product table */}
          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', margin: '0 0 12px' }}>Chi Tiết Sản Phẩm</p>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['Sản Phẩm', 'Số Lượng', 'Còn Lại', 'Hạn Sử Dụng', 'Thành Tiền'].map((h) => (
                      <th key={h} style={{ ...thStyle, background: 'transparent', fontSize: 13 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {batch.items.map((it, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '11px 12px', color: '#1e293b' }}>{it.product}</td>
                      <td style={{ padding: '11px 12px', color: '#374151', textAlign: 'center' }}>{it.qty}</td>
                      <td style={{ padding: '11px 12px', color: PRIMARY, fontWeight: 700, textAlign: 'center' }}>{it.remaining ?? it.qty}</td>
                      <td style={{ padding: '11px 12px', color: '#374151' }}>{it.expiry || '—'}</td>
                      <td style={{ padding: '11px 12px', color: PRIMARY, fontWeight: 700, textAlign: 'right' }}>{fmt(it.qty * it.price)}</td>
                    </tr>
                  ))}
                  {/* Total row */}
                  <tr style={{ background: '#f8fafc', borderTop: '2px solid #e2e8f0' }}>
                    <td style={{ padding: '11px 12px', fontWeight: 700, color: '#0f172a' }}>Tổng Cộng:</td>
                    <td style={{ padding: '11px 12px', fontWeight: 700, color: '#0f172a', textAlign: 'center' }}>{totalQty}</td>
                    <td style={{ padding: '11px 12px', fontWeight: 700, color: PRIMARY, textAlign: 'center' }}>{totalRemaining}</td>
                    <td />
                    <td style={{ padding: '11px 12px', fontWeight: 800, color: PRIMARY, textAlign: 'right' }}>{fmt(totalValue)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Evidence placeholder */}
          <div style={{ border: '2px dashed #fde68a', background: '#fefce8', borderRadius: 12, padding: '28px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🖼️</div>
            <p style={{ fontWeight: 700, fontSize: 15, color: '#92400e', margin: '0 0 4px' }}>Chưa Có Ảnh Minh Chứng</p>
            <p style={{ fontSize: 13, color: '#a16207', margin: 0 }}>Ảnh minh chứng sẽ được tải lên khi hoàn thành kiểm tra lô hàng</p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #f1f5f9', padding: '16px 28px' }}>
          <button onClick={onClose} style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#f8fafc', color: '#374151', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Đóng</button>
        </div>
      </div>
    </div>
  )
}

// ── Expanded sub-table ──
function ExpandedProducts({ items }) {
  return (
    <tr>
      <td colSpan={7} style={{ padding: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
        <div style={{ padding: '0 16px 16px 48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 0 8px', color: '#475569', fontWeight: 700, fontSize: 13 }}>
            <FiHash style={{ fontSize: 14 }} /> Danh Sách Sản Phẩm Trong Lô
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <thead>
              <tr>
                {['Sản Phẩm', 'Số Lượng', 'Hạn Sử Dụng', 'Thành Tiền'].map((h) => (
                  <th key={h} style={{ ...thStyle, background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '9px 14px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i} style={{ borderBottom: i < items.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <td style={{ padding: '10px 14px', color: '#1e293b', fontWeight: 500 }}>{it.product}</td>
                  <td style={{ padding: '10px 14px', color: '#374151' }}>{it.qty}</td>
                  <td style={{ padding: '10px 14px', color: '#f97316' }}>{it.expiry || '—'}</td>
                  <td style={{ padding: '10px 14px', color: PRIMARY, fontWeight: 700 }}>{fmt(it.qty * it.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  )
}

export default function BatchManagementView() {
  const [batches, setBatches] = useState(INIT_BATCHES)
  const [search, setSearch] = useState('')
  const [expandedIds, setExpandedIds] = useState(new Set())
  const [showAddModal, setShowAddModal] = useState(false)
  const [viewBatch, setViewBatch] = useState(null)

  const filtered = batches.filter(
    (b) => b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.supplier.toLowerCase().includes(search.toLowerCase())
  )

  const total = batches.length
  const delivering = batches.filter((b) => b.status === 'Đang Giao').length
  const done = batches.filter((b) => b.status === 'Hoàn Thành').length

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleAdd = (batch) => {
    setBatches((prev) => [{
      ...batch,
      createdDate: new Date().toLocaleDateString('vi-VN'),
      status: 'Đang Giao',
    }, ...prev])
  }

  const handleConfirm = (id) => {
    setBatches((prev) => prev.map((b) =>
      b.id === id ? { ...b, status: 'Hoàn Thành', deliveryDate: new Date().toLocaleDateString('vi-VN') } : b
    ))
  }

  const statCards = [
    { label: 'Tổng Lô Hàng', value: total, icon: '📦', bg: 'linear-gradient(135deg,#3b82f6,#2563eb)' },
    { label: 'Đang Giao', value: delivering, icon: '🚚', bg: 'linear-gradient(135deg,#f97316,#ea580c)' },
    { label: 'Hoàn Thành', value: done, icon: '✅', bg: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})` },
  ]

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: 0 }}>Quản Lý Lô Hàng</h1>
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>Quản lý thông tin lô hàng nhập kho</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 2px 8px rgba(117,176,111,0.4)' }}
        >
          <FiPlus style={{ fontSize: 16 }} /> Thêm Lô Hàng
        </button>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {statCards.map((s) => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{s.icon}</div>
            <div>
              <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>{s.label}</p>
              <p style={{ fontWeight: 800, fontSize: 28, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <FiSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 16 }} />
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm theo mã lô, sản phẩm, nhân viên..."
          style={{ width: '100%', padding: '11px 14px 11px 42px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#fff', color: '#374151' }}
          onFocus={(e) => (e.target.style.borderColor = PRIMARY)}
          onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
        />
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
          <thead>
            <tr>
              {['Mã Lô', 'Nhà Cung Cấp', 'Tổng SL', 'Tổng Giá Trị', 'Ngày Giao Hàng', 'Trạng Thái', 'Thao Tác'].map((h) => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Không tìm thấy lô hàng nào.</td></tr>
            ) : filtered.map((b, i) => {
              const isExpanded = expandedIds.has(b.id)
              return (
                <>
                  <tr
                    key={b.id}
                    style={{ background: isExpanded ? '#f0fdf4' : (i % 2 === 0 ? '#fff' : '#fafafa'), cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => { if (!isExpanded) e.currentTarget.style.background = '#f0fdf4' }}
                    onMouseLeave={(e) => { if (!isExpanded) e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#fafafa' }}
                    onClick={() => toggleExpand(b.id)}
                  >
                    <td style={{ ...tdStyle, fontWeight: 700, color: '#1e293b' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: PRIMARY, fontSize: 13, transition: 'transform 0.2s', display: 'inline-block', transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                          {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
                        </span>
                        {b.id}
                      </div>
                    </td>
                    <td style={tdStyle}>{b.supplier}</td>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>{b.totalQty}</td>
                    <td style={{ ...tdStyle, color: PRIMARY, fontWeight: 700 }}>{fmt(b.totalValue)}</td>
                    <td style={{ ...tdStyle, color: b.deliveryDate ? '#374151' : '#94a3b8' }}>{b.deliveryDate || '—'}</td>
                    <td style={tdStyle} onClick={(e) => e.stopPropagation()}>
                      <span style={{
                        display: 'inline-block', padding: '3px 12px', borderRadius: 20, fontSize: 12.5, fontWeight: 700,
                        background: b.status === 'Hoàn Thành' ? '#f0fdf4' : '#fff7ed',
                        color: b.status === 'Hoàn Thành' ? PRIMARY_DARK : '#f97316',
                        border: `1px solid ${b.status === 'Hoàn Thành' ? PRIMARY + '40' : '#fed7aa'}`,
                      }}>
                        {b.status}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'inline-flex', gap: 8 }}>
                        <button title="Xem chi tiết" onClick={() => setViewBatch(b)} style={iconBtn(PRIMARY)}>
                          <FiEye style={{ fontSize: 13 }} />
                        </button>
                        {b.status === 'Đang Giao' && (
                          <button title="Xác nhận hoàn thành" onClick={() => handleConfirm(b.id)} style={iconBtn(PRIMARY)}>
                            <FiCheckSquare style={{ fontSize: 13 }} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  {isExpanded && b.items.length > 0 && <ExpandedProducts items={b.items} />}
                </>
              )
            })}
          </tbody>
        </table>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9', color: '#64748b', fontSize: 13 }}>
          Hiển thị <strong>{filtered.length}</strong> / <strong>{batches.length}</strong> lô hàng
          <span style={{ marginLeft: 16, color: '#94a3b8', fontSize: 12 }}>• Click vào hàng để xem sản phẩm trong lô</span>
        </div>
      </div>

      {showAddModal && <AddBatchModal onClose={() => setShowAddModal(false)} onConfirm={handleAdd} batchCount={batches.length} />}
      {viewBatch && <ViewBatchModal batch={viewBatch} onClose={() => setViewBatch(null)} />}
    </div>
  )
}
