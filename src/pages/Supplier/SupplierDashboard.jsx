import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import {
  FiHome, FiLogOut, FiEye, FiSearch, FiBox,
  FiChevronDown, FiChevronRight, FiX, FiPackage, FiPlus,
} from 'react-icons/fi'
import { FaLeaf, FaTruck } from 'react-icons/fa'

const PRIMARY = '#75b06f'
const PRIMARY_DARK = '#5a9450'

// ── Helpers ──
const fmt = (n) => n ? Number(n).toLocaleString('vi-VN') + 'đ' : '—'

const thStyle = {
  textAlign: 'left', padding: '10px 14px', fontWeight: 700,
  color: '#64748b', fontSize: 12, textTransform: 'uppercase',
  letterSpacing: '0.04em', background: '#f8fafc', borderBottom: '1px solid #e2e8f0',
}
const tdStyle = { padding: '12px 14px', color: '#374151', verticalAlign: 'middle', borderBottom: '1px solid #f1f5f9' }

// ── Mock batch data for this supplier ──
const MOCK_BATCHES = [
  {
    id: 'BATCH-2026-002', supplier: 'Nguyễn Văn A', phone: '0901234567',
    totalQty: 90, totalValue: 8940000,
    createdDate: '20/01/2026', deliveryDate: null, status: 'Đang Giao',
    items: [
      { product: 'Xà Lách Tươi', qty: 30, remaining: 30, price: 28000, expiry: '25/01/2026' },
      { product: 'Cà Chua Bi', qty: 40, remaining: 40, price: 45000, expiry: '26/01/2026' },
      { product: 'Bơ Booth', qty: 20, remaining: 20, price: 89000, expiry: '28/01/2026' },
    ],
  },
  {
    id: 'BATCH-2026-001', supplier: 'Nguyễn Văn B', phone: '0912345678',
    totalQty: 80, totalValue: 2750000,
    createdDate: '10/01/2026', deliveryDate: '10/01/2026', status: 'Hoàn Thành',
    items: [
      { product: 'Cá Hồi Nauy Phi Lê', qty: 20, remaining: 15, price: 291000, expiry: '15/01/2026' },
      { product: 'Táo Fuji Nhật Bản', qty: 60, remaining: 55, price: 95000, expiry: '20/01/2026' },
    ],
  },
]

// ── Product catalog ──
const SUPPLIER_CATALOG = [
  { id: 'P001', name: 'Bơ Booth', price: 89000, unit: 'Trái', origin: 'Đà Lạt, Việt Nam' },
  { id: 'P002', name: 'Dâu Tây Đà Lạt', price: 120000, unit: '500gram', origin: 'Đà Lạt, Việt Nam' },
  { id: 'P003', name: 'Cải Kale', price: 42000, unit: '300gram', origin: 'Đà Lạt, Việt Nam' },
  { id: 'P004', name: 'Xà Lách Tươi', price: 28000, unit: '500gram', origin: 'Đà Lạt, Việt Nam' },
  { id: 'P005', name: 'Cà Chua Bi', price: 45000, unit: '500gram', origin: 'Đà Lạt, Việt Nam' },
  { id: 'P006', name: 'Rau Cải Xanh', price: 22000, unit: '300gram', origin: 'Đà Lạt, Việt Nam' },
  { id: 'P007', name: 'Ớt Chuông Đỏ', price: 55000, unit: '500gram', origin: 'Đà Lạt, Việt Nam' },
]

// ── Add Batch Modal ──
function AddBatchModal({ onClose, onConfirm, batchCount, supplierName }) {
  const autoId = 'BATCH-2026-' + String(batchCount + 1).padStart(3, '0')
  const [supplier, setSupplier] = useState(supplierName || '')
  const [productSearch, setProductSearch] = useState('')
  const [selected, setSelected] = useState([])

  const filteredCatalog = SUPPLIER_CATALOG.filter(
    (p) => p.name.toLowerCase().includes(productSearch.toLowerCase())
  )

  const addProduct = (p) => {
    if (selected.find((s) => s.id === p.id)) return
    setSelected((prev) => [...prev, { ...p, qty: 1 }])
  }
  const removeProduct = (id) => setSelected((prev) => prev.filter((s) => s.id !== id))
  const setQty = (id, val) => setSelected((prev) => prev.map((s) => s.id === id ? { ...s, qty: Math.max(1, Number(val)) } : s))

  const totalQty = selected.reduce((sum, s) => sum + s.qty, 0)
  const totalValue = selected.reduce((sum, s) => sum + s.qty * s.price, 0)

  const handleAdd = () => {
    if (!supplier || selected.length === 0) return
    onConfirm({
      id: autoId, supplier,
      phone: '0909123456',
      totalQty, totalValue,
      createdDate: new Date().toLocaleDateString('vi-VN'),
      deliveryDate: null,
      status: 'Đang Giao',
      items: selected.map((s) => ({ product: s.name, qty: s.qty, remaining: s.qty, price: s.price, expiry: '—' })),
    })
    onClose()
  }

  const inputS = { width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13.5, outline: 'none', boxSizing: 'border-box', color: '#374151', background: '#fff' }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, width: 820, maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 60px rgba(0,0,0,0.22)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 28px 14px', borderBottom: '1px solid #f1f5f9' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>Thêm Lô Hàng Mới</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 20 }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {/* LEFT */}
          <div style={{ padding: '20px 24px', overflowY: 'auto', borderRight: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Thông tin lô */}
            <div>
              <p style={{ fontWeight: 700, fontSize: 13.5, color: '#0f172a', margin: '0 0 10px' }}>Thông Tin Lô Hàng</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Mã Lô Hàng <span style={{ color: '#ef4444' }}>*</span></label>
                  <input value={autoId} readOnly style={{ ...inputS, background: '#f8fafc', color: '#94a3b8' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Nhà Cung Cấp <span style={{ color: '#ef4444' }}>*</span></label>
                  <input value={supplier} onChange={(e) => setSupplier(e.target.value)} style={inputS}
                    onFocus={(e) => (e.target.style.borderColor = PRIMARY)} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                </div>
              </div>
            </div>

            {/* Chọn sản phẩm */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ fontWeight: 700, fontSize: 13.5, color: '#0f172a', margin: 0 }}>Chọn Sản Phẩm</p>
              <div style={{ position: 'relative' }}>
                <FiSearch style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 14 }} />
                <input value={productSearch} onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  style={{ ...inputS, paddingLeft: 32 }}
                  onFocus={(e) => (e.target.style.borderColor = PRIMARY)} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
              </div>
              <div style={{ border: '1.5px solid #e2e8f0', borderRadius: 10, overflow: 'hidden', maxHeight: 300, overflowY: 'auto' }}>
                {filteredCatalog.map((p, i) => {
                  const isAdded = !!selected.find((s) => s.id === p.id)
                  return (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', borderBottom: i < filteredCatalog.length - 1 ? '1px solid #f1f5f9' : 'none', background: isAdded ? '#f0fdf4' : '#fff' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: PRIMARY, fontSize: 13.5 }}>{p.name}</div>
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

          {/* RIGHT */}
          <div style={{ padding: '20px 16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>🛒</span>
              <p style={{ fontWeight: 700, fontSize: 13, color: '#0f172a', margin: 0 }}>Sản Phẩm Đã Chọn ({selected.length})</p>
            </div>
            {selected.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#94a3b8', textAlign: 'center', paddingTop: 40 }}>
                <div style={{ fontSize: 38, opacity: 0.4 }}>📦</div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>Chưa có sản phẩm</div>
                <div style={{ fontSize: 12 }}>Chọn từ danh sách bên trái</div>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selected.map((s) => (
                  <div key={s.id} style={{ border: '1.5px solid #e2e8f0', borderRadius: 10, padding: '10px 12px', background: '#fafafa' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                      <div style={{ fontWeight: 700, fontSize: 12.5, color: '#0f172a', flex: 1, paddingRight: 6 }}>{s.name}</div>
                      <button onClick={() => removeProduct(s.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 13, padding: 0 }}>✕</button>
                    </div>
                    <div style={{ fontSize: 11, color: '#64748b', marginBottom: 6 }}>{fmt(s.price)} / {s.unit}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <label style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>SL:</label>
                      <input type="number" min={1} value={s.qty} onChange={(e) => setQty(s.id, e.target.value)}
                        style={{ width: 50, padding: '3px 6px', border: '1.5px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', textAlign: 'center' }}
                        onFocus={(e) => (e.target.style.borderColor = PRIMARY)} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                      <span style={{ fontSize: 11.5, color: PRIMARY, fontWeight: 700, marginLeft: 'auto' }}>{fmt(s.qty * s.price)}</span>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: '#374151' }}>Tổng ({totalQty})</span>
                  <span style={{ fontSize: 13.5, fontWeight: 800, color: PRIMARY }}>{fmt(totalValue)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #f1f5f9', padding: '13px 24px', display: 'flex', gap: 12 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '11px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#fff', color: '#374151', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Hủy</button>
          <button onClick={handleAdd} disabled={selected.length === 0 || !supplier}
            style={{ flex: 2.5, padding: '11px', borderRadius: 10, border: 'none', background: selected.length === 0 ? '#e2e8f0' : `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, color: selected.length === 0 ? '#94a3b8' : '#fff', fontWeight: 700, fontSize: 14, cursor: selected.length === 0 ? 'default' : 'pointer' }}>
            Thêm Lô Hàng
          </button>
        </div>
      </div>
    </div>
  )
}


function StatusBadge({ status }) {
  const map = {
    'Đang Giao': { bg: '#fff7ed', color: '#ea580c' },
    'Hoàn Thành': { bg: '#f0fdf4', color: PRIMARY_DARK },
    'Chờ Xác Nhận': { bg: '#eff6ff', color: '#2563eb' },
    'Đã Hủy': { bg: '#fef2f2', color: '#dc2626' },
  }
  const s = map[status] || { bg: '#f1f5f9', color: '#64748b' }
  return (
    <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: s.bg, color: s.color }}>
      {status}
    </span>
  )
}

// ── View Batch Detail Modal ──
function ViewBatchModal({ batch, onClose }) {
  const totalQty = batch.items.reduce((s, i) => s + i.qty, 0)
  const totalRemaining = batch.items.reduce((s, i) => s + i.remaining, 0)
  const totalValue = batch.items.reduce((s, i) => s + i.qty * i.price, 0)

  const infoRows = [
    ['Mã Lô:', batch.id, 'Nhà Cung Cấp:', batch.supplier],
    ['Số Điện Thoại:', batch.phone, 'Tổng Số Lượng:', totalQty],
    ['Tổng Giá Trị:', <span style={{ color: '#ea580c', fontWeight: 700 }}>{fmt(totalValue)}</span>, 'Ngày Tạo:', batch.createdDate],
    ['Ngày Giao Hàng:', batch.deliveryDate || '—', 'Trạng Thái:', <StatusBadge status={batch.status} />],
  ]

  const labelS = { fontSize: 12, color: '#94a3b8', fontWeight: 600, marginBottom: 2 }
  const valueS = { fontSize: 14, fontWeight: 700, color: '#0f172a' }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, width: 560, maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 60px rgba(0,0,0,0.2)' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 16px', borderBottom: '1px solid #f1f5f9' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>Chi Tiết Lô Hàng</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 20, lineHeight: 1 }}>✕</button>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Thông Tin Lô Hàng */}
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 14px' }}>Thông Tin Lô Hàng</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 28px' }}>
              {infoRows.map((row, i) => (
                <React.Fragment key={i}>
                  <div>
                    <div style={labelS}>{row[0]}</div>
                    <div style={valueS}>{row[1]}</div>
                  </div>
                  <div>
                    <div style={labelS}>{row[2]}</div>
                    <div style={valueS}>{row[3]}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Chi Tiết Sản Phẩm */}
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>Chi Tiết Sản Phẩm</h3>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['Sản Phẩm', 'Số Lượng', 'Còn Lại', 'Hạn Sử Dụng', 'Thành Tiền'].map((h) => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: h === 'Sản Phẩm' ? 'left' : 'center', fontWeight: 700, color: '#64748b', fontSize: 12.5, borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {batch.items.map((item, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '11px 14px', fontWeight: 600, color: '#0f172a' }}>{item.product}</td>
                      <td style={{ padding: '11px 14px', textAlign: 'center', color: '#374151' }}>{item.qty}</td>
                      <td style={{ padding: '11px 14px', textAlign: 'center', fontWeight: 700, color: PRIMARY }}>{item.remaining}</td>
                      <td style={{ padding: '11px 14px', textAlign: 'center', color: '#374151' }}>{item.expiry}</td>
                      <td style={{ padding: '11px 14px', textAlign: 'center', fontWeight: 700, color: '#ea580c' }}>{fmt(item.qty * item.price)}</td>
                    </tr>
                  ))}
                  {/* Tổng Cộng */}
                  <tr style={{ background: '#f8fafc', borderTop: '1.5px solid #e2e8f0' }}>
                    <td style={{ padding: '11px 14px', fontWeight: 800, color: '#0f172a' }}>Tổng Cộng:</td>
                    <td style={{ padding: '11px 14px', textAlign: 'center', fontWeight: 800, color: '#0f172a' }}>{totalQty}</td>
                    <td style={{ padding: '11px 14px', textAlign: 'center', fontWeight: 800, color: PRIMARY }}>{totalRemaining}</td>
                    <td></td>
                    <td style={{ padding: '11px 14px', textAlign: 'center', fontWeight: 800, color: '#ea580c' }}>{fmt(totalValue)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Ảnh Minh Chứng placeholder */}
          <div style={{ border: '2px dashed #fbbf24', borderRadius: 12, padding: '28px 20px', background: '#fffbeb', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 36, color: '#f59e0b' }}>🖼️</div>
            <div style={{ fontWeight: 800, fontSize: 14, color: '#92400e' }}>Chưa Có Ảnh Minh Chứng</div>
            <div style={{ fontSize: 12.5, color: '#b45309', textAlign: 'center' }}>Ảnh minh chứng sẽ được tải lên khi hoàn thành kiểm tra lô hàng</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #f1f5f9', padding: '14px 24px' }}>
          <button onClick={onClose} style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#f8fafc', color: '#374151', fontWeight: 700, fontSize: 14.5, cursor: 'pointer' }}>Đóng</button>
        </div>
      </div>
    </div>
  )
}

// ── Batch Management View (Supplier) ──
function SupplierBatchView({ currentUser }) {
  const [batches, setBatches] = useState(MOCK_BATCHES)
  const [search, setSearch] = useState('')
  const [viewBatch, setViewBatch] = useState(null)
  const [expanded, setExpanded] = useState({})
  const [showAddModal, setShowAddModal] = useState(false)

  const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }))

  const filtered = batches.filter(
    (b) => b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.supplier.toLowerCase().includes(search.toLowerCase())
  )

  const totals = { all: batches.length, delivering: batches.filter((b) => b.status === 'Đang Giao').length, done: batches.filter((b) => b.status === 'Hoàn Thành').length }

  const handleAdd = (batch) => {
    setBatches((prev) => [batch, ...prev])
  }

  return (
    <div style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>Quản Lý Lô Hàng</h1>
          <p style={{ color: '#64748b', fontSize: 13, margin: '3px 0 0' }}>Quản lý thông tin lô hàng nhập kho</p>
        </div>
        <button onClick={() => setShowAddModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 2px 8px rgba(117,176,111,0.35)' }}>
          <FiPlus style={{ fontSize: 16 }} /> Thêm Lô Hàng
        </button>
      </div>

      {/* Search bar - above stats */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <FiSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 15 }} />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm theo mã lô, sản phẩm, nhà cung cấp..."
          style={{ width: '100%', padding: '11px 14px 11px 40px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 13.5, outline: 'none', boxSizing: 'border-box', color: '#374151', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
          onFocus={(e) => { e.target.style.borderColor = PRIMARY; e.target.style.boxShadow = `0 0 0 3px ${PRIMARY}22` }}
          onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)' }} />
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Tổng Lô Hàng', value: totals.all, icon: <FiPackage />, color: '#3b82f6', bg: '#eff6ff' },
          { label: 'Đang Giao', value: totals.delivering, icon: <FaTruck />, color: '#ea580c', bg: '#fff7ed' },
          { label: 'Hoàn Thành', value: totals.done, icon: '✅', color: PRIMARY_DARK, bg: '#f0fdf4' },
        ].map((s) => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 12.5, color: '#64748b', margin: '0 0 4px', fontWeight: 600 }}>{s.label}</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0 }}>{s.value}</p>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: 32 }}></th>
              <th style={thStyle}>Mã Lô</th>
              <th style={thStyle}>Nhà Cung Cấp</th>
              <th style={thStyle}>Tổng SL</th>
              <th style={thStyle}>Tổng Giá Trị</th>
              <th style={thStyle}>Ngày Giao Hàng</th>
              <th style={thStyle}>Trạng Thái</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <>
                <tr key={b.id}
                  style={{ borderBottom: expanded[b.id] ? 'none' : '1px solid #f1f5f9' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ ...tdStyle, cursor: 'pointer', color: '#64748b' }} onClick={() => toggle(b.id)}>
                    {expanded[b.id] ? <FiChevronDown /> : <FiChevronRight />}
                  </td>
                  <td style={tdStyle}><span style={{ fontWeight: 700, color: PRIMARY }}>{b.id}</span></td>
                  <td style={tdStyle}>{b.supplier}</td>
                  <td style={tdStyle}>{b.totalQty}</td>
                  <td style={{ ...tdStyle, fontWeight: 700, color: PRIMARY }}>{fmt(b.totalValue)}</td>
                  <td style={tdStyle}>{b.deliveryDate || '-'}</td>
                  <td style={tdStyle}><StatusBadge status={b.status} /></td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <button onClick={() => setViewBatch(b)} title="Xem Chi Tiết"
                      style={{ width: 30, height: 30, borderRadius: 7, border: '1.5px solid #3b82f620', background: '#eff6ff', color: '#3b82f6', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FiEye style={{ fontSize: 14 }} />
                    </button>
                  </td>
                </tr>
                {expanded[b.id] && (
                  <tr key={b.id + '-detail'}>
                    <td colSpan={8} style={{ padding: '0 16px 16px 48px', background: '#f8fafc' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
                        <thead>
                          <tr>{['Sản Phẩm', 'SL Nhập', 'Còn Lại', 'HSD', 'Đơn Giá', 'Thành Tiền'].map((h) => <th key={h} style={{ ...thStyle, fontSize: 11.5, padding: '8px 12px' }}>{h}</th>)}</tr>
                        </thead>
                        <tbody>
                          {b.items.map((item, i) => (
                            <tr key={i} style={{ background: '#fff' }}>
                              <td style={{ ...tdStyle, fontSize: 12.5, padding: '8px 12px', fontWeight: 600 }}>{item.product}</td>
                              <td style={{ ...tdStyle, fontSize: 12.5, padding: '8px 12px' }}>{item.qty}</td>
                              <td style={{ ...tdStyle, fontSize: 12.5, padding: '8px 12px' }}>{item.remaining}</td>
                              <td style={{ ...tdStyle, fontSize: 12.5, padding: '8px 12px' }}>{item.expiry}</td>
                              <td style={{ ...tdStyle, fontSize: 12.5, padding: '8px 12px' }}>{fmt(item.price)}</td>
                              <td style={{ ...tdStyle, fontSize: 12.5, padding: '8px 12px', fontWeight: 700, color: PRIMARY }}>{fmt(item.qty * item.price)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {viewBatch && <ViewBatchModal batch={viewBatch} onClose={() => setViewBatch(null)} />}
      {showAddModal && <AddBatchModal onClose={() => setShowAddModal(false)} onConfirm={handleAdd} batchCount={batches.length} supplierName={currentUser?.name} />}
    </div>
  )
}

// ── Sidebar ──
function SupplierSidebar({ currentUser, onLogout }) {
  return (
    <aside style={{ width: 230, minWidth: 230, background: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', padding: '0 0 20px 0' }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaLeaf style={{ color: '#fff', fontSize: 16 }} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, color: '#0f172a', letterSpacing: '0.02em' }}>FreshMarket</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>Supplier Portal</div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>
            {(currentUser?.name || 'N')[0]}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{currentUser?.name || 'Supplier'}</div>
            <div style={{ fontSize: 11, color: '#64748b' }}>{currentUser?.email}</div>
          </div>
        </div>
      </div>

      {/* Section */}
      <div style={{ padding: '14px 12px 4px', fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Quản Lý Nhà Cung Cấp</div>

      {/* Nav item - active */}
      <div style={{ margin: '2px 8px', borderRadius: 10, background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
        <FiBox style={{ color: '#fff', fontSize: 16 }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Quản Lý Lô Hàng</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>Nhập kho & hạn sử dụng</div>
        </div>
      </div>

      {/* Section */}
      <div style={{ padding: '14px 12px 4px', fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Điều Hướng</div>

      {/* Home link */}
      <div style={{ margin: '2px 8px', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', color: '#374151' }}
        onClick={() => window.location.href = '/'}>
        <FiHome style={{ fontSize: 16 }} />
        <span style={{ fontSize: 13, fontWeight: 600 }}>Về Trang Chủ</span>
      </div>

      {/* Logout */}
      <div style={{ marginTop: 'auto', padding: '0 8px' }}>
        <button onClick={onLogout}
          style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#ef4444,#dc2626)', color: '#fff', fontWeight: 700, fontSize: 13.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          <FiLogOut style={{ fontSize: 16 }} /> Đăng Xuất
        </button>
      </div>
    </aside>
  )
}

// ── Main Layout ──
export default function SupplierDashboard() {
  const { currentUser, logout, isSupplier } = useAuth()
  const navigate = useNavigate()

  // Redirect if not supplier
  if (!isSupplier) {
    navigate('/login')
    return null
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f1f5f9', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <SupplierSidebar currentUser={currentUser} onLogout={handleLogout} />
      <SupplierBatchView currentUser={currentUser} />
    </div>
  )
}
