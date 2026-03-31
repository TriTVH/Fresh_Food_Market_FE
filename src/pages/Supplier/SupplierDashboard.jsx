import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'react-toastify'
import {
  FiHome, FiLogOut, FiEye, FiSearch, FiBox,
  FiPackage, FiTruck, FiCheckCircle,
} from 'react-icons/fi'
import { FaLeaf, FaTruck } from 'react-icons/fa'
import BatchDetailModal from '@/components/batch/BatchDetailModal'
import ConfirmBatchModal from '@/components/batch/ConfirmBatchModal'
import { fetchBatches, getApiErrorMessage, updateBatch, BATCH_ACTION } from '@/api/apiService'
import { mapApiBatchToUi, labelBatchStatus, batchStatusBadgeStyle } from '@/pages/Admin/BatchManagementView'

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

function SupplierStatusBadge({ status }) {
  const st = batchStatusBadgeStyle(status)
  return (
    <span style={{
      fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
      background: st.bg, color: st.color, border: `1px solid ${st.border}`,
    }}>
      {labelBatchStatus(status)}
    </span>
  )
}

// ── Batch Management View (Supplier) ──
function SupplierBatchView() {
  const { isSupplier } = useAuth()
  const [batches, setBatches] = useState([])
  const [listLoading, setListLoading] = useState(true)
  const [listError, setListError] = useState(null)
  const [search, setSearch] = useState('')
  const [viewBatchId, setViewBatchId] = useState(null)
  const [deliveryBusyId, setDeliveryBusyId] = useState(null)
  const [confirmModalBatchId, setConfirmModalBatchId] = useState(null)

  const loadBatches = async () => {
    setListLoading(true)
    setListError(null)
    try {
      const rows = await fetchBatches()
      setBatches((rows || []).map(mapApiBatchToUi))
    } catch (e) {
      setListError(getApiErrorMessage(e) || e?.message || 'Không tải được danh sách lô hàng')
      setBatches([])
    } finally {
      setListLoading(false)
    }
  }

  useEffect(() => {
    loadBatches()
  }, [])

  const handleStartDelivery = async (b, e) => {
    e?.stopPropagation?.()
    if (b.batchId == null) return
    setDeliveryBusyId(b.batchId)
    try {
      await updateBatch({
        id: b.batchId,
        items: [],
        action: BATCH_ACTION.Delivery,
        imagesJson: [],
        cancelReason: null,
      })
      // Optimistic update: cập nhật ngay để UI phản ánh trạng thái tức thì,
      // tránh tình trạng backend + GET /batch phản hồi chậm làm nút action hiển thị sai.
      setBatches((prev) =>
        (prev || []).map((x) =>
          x?.batchId === b.batchId || x?.id === b.id ? { ...x, status: 'DELIVERING' } : x
        )
      )
      await loadBatches()
      await new Promise((r) => setTimeout(r, 400))
      await loadBatches()
      toast.success('Đã cập nhật trạng thái giao hàng.')
    } catch (err) {
      toast.error(getApiErrorMessage(err) || 'Không cập nhật được trạng thái giao hàng.')
    } finally {
      setDeliveryBusyId(null)
    }
  }

  const q = search.trim().toLowerCase()
  const filtered = batches.filter(
    (b) =>
      !q ||
      String(b.id).toLowerCase().includes(q) ||
      (b.supplier || '').toLowerCase().includes(q) ||
      (b.phone || '').toLowerCase().includes(q)
  )

  const totals = {
    all: batches.length,
    delivering: batches.filter((b) => b.status === 'DELIVERING').length,
    done: batches.filter((b) => b.status === 'COMPLETED').length,
  }

  return (
    <div style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>Quản Lý Lô Hàng</h1>
        <p style={{ color: '#64748b', fontSize: 13, margin: '3px 0 0' }}>Quản lý thông tin lô hàng nhập kho</p>
        <p style={{ color: '#94a3b8', fontSize: 12, margin: '8px 0 0', maxWidth: 680, lineHeight: 1.45 }}>
          <strong style={{ color: '#64748b' }}>Chờ xử lý:</strong> bấm <strong>Xác nhận lô</strong> — mở form nhập số lượng thực tế và HSD → Đóng gói.{' '}
          <strong style={{ color: '#64748b' }}>Đóng gói:</strong> bấm <strong>Bắt đầu giao hàng</strong> → Đang giao.
        </p>
      </div>

      {listError && (
        <div style={{ marginBottom: 16, padding: '12px 16px', borderRadius: 10, background: '#fef2f2', color: '#b91c1c', fontSize: 14 }}>
          {listError}
        </div>
      )}

      {/* Search bar - above stats */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <FiSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 15 }} />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          disabled={listLoading}
          placeholder="Tìm theo mã lô, nhà cung cấp, SĐT..."
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
              <th style={thStyle}>Mã Lô</th>
              <th style={thStyle}>Nhà Cung Cấp</th>
              <th style={thStyle}>Tổng Giá Trị</th>
              <th style={thStyle}>Ngày Giao Hàng</th>
              <th style={thStyle}>Trạng Thái</th>
              <th style={{ ...thStyle, textAlign: 'center', minWidth: 280 }}>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {listLoading ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Đang tải danh sách lô hàng...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Không có lô hàng nào.</td></tr>
            ) : filtered.map((b) => (
              <tr
                  key={b.id}
                  style={{ borderBottom: '1px solid #f1f5f9' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  <td style={tdStyle}><span style={{ fontWeight: 700, color: PRIMARY }}>{b.id}</span></td>
                  <td style={tdStyle}>{b.supplier}</td>
                  <td style={{ ...tdStyle, fontWeight: 700, color: PRIMARY }}>{fmt(Number(b.totalValue) || 0)}</td>
                  <td style={tdStyle}>{b.deliveryDate && b.deliveryDate !== '—' ? b.deliveryDate : '—'}</td>
                  <td style={tdStyle}><SupplierStatusBadge status={b.status} /></td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <button type="button" onClick={() => b.batchId != null && setViewBatchId(b.batchId)} title="Xem Chi Tiết"
                        style={{ width: 30, height: 30, borderRadius: 7, border: '1.5px solid #3b82f620', background: '#eff6ff', color: '#3b82f6', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiEye style={{ fontSize: 14 }} />
                      </button>
                      {isSupplier && b.status === 'PENDING' && b.batchId != null && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e?.stopPropagation?.()
                            setConfirmModalBatchId(b.batchId)
                          }}
                          disabled={deliveryBusyId === b.batchId}
                          title="Nhập số lượng thực tế → xác nhận lô (PACKAGING)"
                          style={{
                            padding: '7px 12px',
                            borderRadius: 8,
                            border: `1.5px solid ${PRIMARY}55`,
                            background: '#f0fdf4',
                            color: PRIMARY_DARK,
                            fontWeight: 700,
                            fontSize: 12,
                            cursor: deliveryBusyId === b.batchId ? 'not-allowed' : 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <FiCheckCircle style={{ fontSize: 15, flexShrink: 0 }} />
                          Xác nhận lô
                        </button>
                      )}
                      {isSupplier && b.status === 'PACKAGING' && b.batchId != null && (
                        <button
                          type="button"
                          onClick={(e) => handleStartDelivery(b, e)}
                          disabled={deliveryBusyId === b.batchId}
                          title="Chuyển lô sang trạng thái Đang giao (DELIVERING)"
                          style={{
                            padding: '7px 12px',
                            borderRadius: 8,
                            border: '1.5px solid #ea580c40',
                            background: deliveryBusyId === b.batchId ? '#fed7aa' : '#fff7ed',
                            color: '#c2410c',
                            fontWeight: 700,
                            fontSize: 12,
                            cursor: deliveryBusyId === b.batchId ? 'wait' : 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <FiTruck style={{ fontSize: 15, flexShrink: 0 }} />
                          {deliveryBusyId === b.batchId ? 'Đang cập nhật…' : 'Bắt đầu giao hàng'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewBatchId != null && (
        <BatchDetailModal
          batchId={viewBatchId}
          onClose={() => setViewBatchId(null)}
          onBatchUpdated={loadBatches}
        />
      )}
      {confirmModalBatchId != null && (
        <ConfirmBatchModal
          batchId={confirmModalBatchId}
          batchCode={batches.find((x) => x.batchId === confirmModalBatchId)?.id ?? ''}
          onClose={() => setConfirmModalBatchId(null)}
          onSuccess={loadBatches}
        />
      )}
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
      <SupplierBatchView />
    </div>
  )
}
