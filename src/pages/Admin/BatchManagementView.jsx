import { useState, useEffect } from 'react'
import { FiSearch, FiPlus, FiEye, FiCheckSquare, FiX, FiChevronDown, FiChevronRight } from 'react-icons/fi'
import { FiHash } from 'react-icons/fi'
import { fetchBatches, createBatch } from '@/api/adminApi'
import { mapBatchDtoToFrontend } from '@/utils/mapper'

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

// ── Add Batch Modal ──
function AddBatchModal({ onClose, onConfirm, batchCount }) {
  const autoId = 'BATCH-2026-' + String(batchCount + 1).padStart(3, '0')
  const [supplier, setSupplier] = useState('Admin Fresh Market')
  const [selected, setSelected] = useState([]) 

  const handleAdd = () => {
    if (!supplier || selected.length === 0) return
    onConfirm({
      batchCode: autoId, 
      supplyBy: supplier,
      batchDetails: selected.map((s) => ({ productId: s.id, quantity: s.qty, expiredDate: s.expiry || null })),
    })
    onClose()
  }

  const inputS = { width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13.5, outline: 'none', boxSizing: 'border-box', color: '#374151', background: '#fff' }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, width: 420, padding: 28, boxShadow: '0 24px 60px rgba(0,0,0,0.22)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 20 }}>Thêm Lô Hàng (Đơn giản)</h2>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Nhà Cung Cấp</label>
            <input value={supplier} onChange={(e) => setSupplier(e.target.value)} style={inputS} />
          </div>
          <p style={{ fontSize: 13, color: '#64748b' }}>Tính năng thêm chi tiết sản phẩm đang được hoàn thiện kết nối với Catalog.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#fff', fontWeight: 700 }}>Hủy</button>
            <button onClick={handleAdd} style={{ flex: 2, padding: '12px', borderRadius: 10, border: 'none', background: PRIMARY, color: '#fff', fontWeight: 700 }}>Xác Nhận</button>
          </div>
      </div>
    </div>
  )
}

function ViewBatchModal({ batch, onClose }) {
  const totalQty = batch.items?.reduce((s, i) => s + i.qty, 0) || 0
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, width: 500, padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800 }}>Chi Tiết {batch.id}</h2>
            <button onClick={onClose}><FiX /></button>
        </div>
        <div style={{ marginBottom: 20 }}>
            <p><strong>Nhà cung cấp:</strong> {batch.supplier}</p>
            <p><strong>Trạng thái:</strong> {batch.status}</p>
            <p><strong>Ngày tạo:</strong> {batch.createdDate}</p>
        </div>
        <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ background: '#f8fafc' }}><th style={thStyle}>Sản phẩm</th><th style={thStyle}>SL</th></tr></thead>
                <tbody>
                    {batch.items?.map((it, i) => (
                        <tr key={i}><td style={tdStyle}>{it.product}</td><td style={tdStyle}>{it.qty}</td></tr>
                    ))}
                </tbody>
            </table>
        </div>
        <button onClick={onClose} style={{ width: '100%', marginTop: 20, padding: 12, background: '#f1f5f9', borderRadius: 10, fontWeight: 700 }}>Đóng</button>
      </div>
    </div>
  )
}

export default function BatchManagementView() {
  const [batches, setBatches] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [expandedIds, setExpandedIds] = useState(new Set())
  const [showAddModal, setShowAddModal] = useState(false)
  const [viewBatch, setViewBatch] = useState(null)

  const loadBatches = async () => {
    setIsLoading(true);
    try {
      const response = await fetchBatches();
      if (response && response.success && response.data) {
        setBatches(response.data.map(mapBatchDtoToFrontend));
      }
    } catch (err) {
      console.error("Failed to load batches", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBatches();
  }, [])

  const filtered = batches.filter(
    (b) => b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.supplier.toLowerCase().includes(search.toLowerCase())
  )

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleAddConfirm = async (batchData) => {
    try {
        const response = await createBatch(batchData);
        if (response && response.success) {
            alert("Thêm lô hàng thành công!");
            loadBatches();
        }
    } catch (err) {
        alert("Lỗi khi thêm lô hàng: " + err.message);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: 0 }}>Quản Lý Lô Hàng</h1>
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>Dữ liệu thực tế từ Inventory Service</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
        >
          <FiPlus /> Thêm Lô Hàng
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: 20 }}>
        <FiSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm mã lô, nhà cung cấp..."
          style={{ width: '100%', padding: '11px 14px 11px 42px', border: '1.5px solid #e2e8f0', borderRadius: 10 }}
        />
      </div>

      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        {isLoading ? (
            <div style={{ padding: 40, textAlign: 'center' }}>Đang tải dữ liệu...</div>
        ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
            <thead>
                <tr>
                {['Mã Lô', 'Nhà Cung Cấp', 'Tổng SL', 'Thành Tiền', 'Ngày Tạo', 'Trạng Thái', 'Thao Tác'].map((h) => (
                    <th key={h} style={thStyle}>{h}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {filtered.map((b, i) => (
                <tr key={b.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ ...tdStyle, fontWeight: 700 }}>{b.id}</td>
                    <td style={tdStyle}>{b.supplier}</td>
                    <td style={tdStyle}>{b.totalQty}</td>
                    <td style={{ ...tdStyle, color: PRIMARY, fontWeight: 700 }}>{fmt(b.totalValue)}</td>
                    <td style={tdStyle}>{b.createdDate}</td>
                    <td style={tdStyle}>
                        <span style={{ padding: '3px 10px', borderRadius: 20, background: '#f0fdf4', color: PRIMARY_DARK, border: '1px solid #bbf7d0', fontSize: 12, fontWeight: 700 }}>{b.status}</span>
                    </td>
                    <td style={tdStyle}>
                        <button onClick={() => setViewBatch(b)} style={iconBtn(PRIMARY)}><FiEye /></button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
      </div>

      {showAddModal && <AddBatchModal onClose={() => setShowAddModal(false)} onConfirm={handleAddConfirm} batchCount={batches.length} />}
      {viewBatch && <ViewBatchModal batch={viewBatch} onClose={() => setViewBatch(null)} />}
    </div>
  )
}
