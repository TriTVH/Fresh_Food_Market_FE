import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { fetchBatchById, getApiErrorMessage } from '@/api/apiService'
import {
  mapApiBatchToUi,
  labelBatchStatus,
  batchStatusBadgeStyle,
  batchProductDisplayName,
} from '@/pages/Admin/BatchManagementView'

const PRIMARY = '#75b06f'

const thStyle = {
  textAlign: 'left',
  padding: '8px 10px',
  fontWeight: 700,
  color: '#64748b',
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
  background: '#f8fafc',
  borderBottom: '1px solid #e2e8f0',
}

function NoteTable({ title, rows, columns }) {
  if (!rows?.length) return null
  return (
    <div style={{ marginTop: 16 }}>
      <p style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', margin: '0 0 10px' }}>{title}</p>
      <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} style={thStyle}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                {columns.map((c) => (
                  <td key={c.key} style={{ padding: '8px 10px', color: '#374151' }}>
                    {c.render ? c.render(row) : row[c.key] ?? '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
 * Modal chi tiết lô: GET /batch/{id}
 */
export default function BatchDetailModal({ batchId, onClose, onBatchUpdated }) {
  const [batch, setBatch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const reloadBatch = async () => {
    const raw = await fetchBatchById(batchId)
    setBatch(mapApiBatchToUi(raw))
  }

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const raw = await fetchBatchById(batchId)
        if (cancelled) return
        setBatch(mapApiBatchToUi(raw))
      } catch (e) {
        if (!cancelled) {
          setError(getApiErrorMessage(e) || e?.message || 'Không tải được chi tiết lô hàng')
          setBatch(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [batchId])

  const shell = (children) => (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          width: 'min(720px, 100%)',
          maxHeight: '92vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
        }}
      >
        {children}
      </div>
    </div>
  )

  if (loading) {
    return shell(
      <>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>Chi Tiết Lô Hàng</h2>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 22 }}>
            <FiX />
          </button>
        </div>
        <div style={{ padding: 48, textAlign: 'center', color: '#94a3b8' }}>Đang tải chi tiết...</div>
      </>
    )
  }

  if (error || !batch) {
    return shell(
      <>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>Chi Tiết Lô Hàng</h2>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 22 }}>
            <FiX />
          </button>
        </div>
        <div style={{ padding: 32, color: '#b91c1c', fontSize: 14 }}>{error || 'Không có dữ liệu.'}</div>
        <div style={{ borderTop: '1px solid #f1f5f9', padding: 16 }}>
          <button type="button" onClick={onClose} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#f8fafc', fontWeight: 700, cursor: 'pointer' }}>
            Đóng
          </button>
        </div>
      </>
    )
  }

  const items = batch.items || []
  const totalQty = items.reduce((s, i) => s + i.qty, 0)
  const statusCode = batch.status
  const statusLabel = labelBatchStatus(statusCode)
  const badge = batchStatusBadgeStyle(statusCode)
  const notes = batch.notes
  const showNotesSection =
    notes &&
    (notes._unparsedNotesText ||
      notes.cancelInfo ||
      (notes.insufficientSupplyNote || []).length > 0 ||
      (notes.unprovidedProducts || []).length > 0 ||
      (notes.completedSupplyStats || []).length > 0)
  const images = batch.imageConfirmReceived || []

  const missingCols = [
    { key: 'productName', label: 'Sản phẩm', render: (r) => batchProductDisplayName(r.productName || r.ProductName || '') || '—' },
    { key: 'productId', label: 'Mã SP', render: (r) => r.productId ?? r.ProductId ?? '—' },
    { key: 'required', label: 'Yêu cầu', render: (r) => r.required ?? r.Required ?? '—' },
    { key: 'provided', label: 'Cung cấp', render: (r) => r.provided ?? r.Provided ?? '—' },
    { key: 'missing', label: 'Thiếu', render: (r) => r.missing ?? r.Missing ?? '—' },
  ]

  const completedCols = [
    { key: 'productName', label: 'Sản phẩm', render: (r) => batchProductDisplayName(r.productName || r.ProductName || '') || '—' },
    { key: 'required', label: 'Số lượng dự kiến', render: (r) => r.required ?? r.Required ?? '—' },
    { key: 'provided', label: 'Nhận được', render: (r) => r.provided ?? r.Provided ?? '—' },
    { key: 'missing', label: 'Thiếu', render: (r) => r.missing ?? r.Missing ?? '—' },
    { key: 'extra', label: 'Dư', render: (r) => r.extra ?? r.Extra ?? '—' },
    { key: 'status', label: 'Trạng thái', render: (r) => r.status ?? r.Status ?? '—' },
  ]

  return (
    <>
      {shell(
        <>
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', margin: 0 }}>Chi Tiết Lô Hàng</h2>
        <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 22, lineHeight: 1 }}>
          <FiX />
        </button>
      </div>

      <div style={{ overflowY: 'auto', flex: 1, padding: '0 24px 24px' }}>
        <div style={{ background: '#f8fafc', borderRadius: 12, padding: '18px 20px', marginTop: 16 }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', margin: '0 0 14px' }}>Thông Tin Lô Hàng</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px', fontSize: 13.5 }}>
            {[
              ['Mã lô', batch.id],
              ['Mã hệ thống (batchId)', batch.batchId ?? '—'],
              ['Nhà cung cấp', batch.supplier],
              ['Số điện thoại', batch.phone || '—'],
              ['Địa chỉ NCC', batch.supplierAddress || '—'],
              ['Tạo bởi (supplyBy)', batch.supplyBy ?? '—'],
              ['Tổng số mặt hàng', batch.totalQty],
              ['Ngày tạo', batch.createdDate || '—'],
              ['Ngày cập nhật', batch.updatedDate || '—'],
              ['Ngày giao hàng', batch.deliveryDate || '—'],
            ].map(([lab, val], i) => (
              <div key={i}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{lab}</div>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{val}</div>
              </div>
            ))}
            <div>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Trạng thái</div>
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 12px',
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 700,
                  background: badge.bg,
                  color: badge.color,
                  border: `1px solid ${badge.border}`,
                }}
              >
                {statusLabel}
              </span>
            </div>
          </div>
        </div>

        {showNotesSection && (
          <div style={{ marginTop: 20 }}>
            <p style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', margin: '0 0 12px' }}>Ghi chú kiểm tra / đối soát</p>
            {notes._unparsedNotesText && (
              <div
                style={{
                  marginBottom: 16,
                  padding: 14,
                  borderRadius: 10,
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  fontSize: 13,
                  color: '#334155',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {notes._unparsedNotesText}
              </div>
            )}
            <NoteTable
              title="Sản phẩm cung cấp thiếu"
              rows={notes.insufficientSupplyNote}
              columns={missingCols}
            />
            <NoteTable
              title="Không thể cung cấp"
              rows={notes.unprovidedProducts}
              columns={missingCols}
            />
            <NoteTable
              title="Sau khi kiểm tra nhận hàng"
              rows={notes.completedSupplyStats}
              columns={completedCols}
            />
            {notes.cancelInfo && (
              <div
                style={{
                  marginTop: 16,
                  padding: 14,
                  borderRadius: 10,
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                }}
              >
                <div style={{ fontWeight: 700, color: '#b91c1c', marginBottom: 8 }}>Hủy lô (cancelInfo)</div>
                <div style={{ fontSize: 13, color: '#374151' }}>
                  <strong>Thời điểm:</strong>{' '}
                  {notes.cancelInfo.cancelledAt
                    ? new Date(notes.cancelInfo.cancelledAt).toLocaleString('vi-VN')
                    : '—'}
                </div>
                <div style={{ fontSize: 13, color: '#374151', marginTop: 6 }}>
                  <strong>Lý do:</strong> {notes.cancelInfo.reason ?? notes.cancelInfo.Reason ?? '—'}
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 22 }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', margin: '0 0 12px' }}>Tổng kết lô hàng</p>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Sản phẩm', 'Số lượng', 'Hạn sử dụng'].map((h) => (
                    <th
                      key={h}
                      style={{
                        ...thStyle,
                        background: 'transparent',
                        fontSize: 12,
                        textAlign: h === 'Sản phẩm' ? 'left' : 'center',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((it, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 12px', color: '#1e293b' }}>{it.product}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>{it.qty}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>{it.expiry || '—'}</td>
                  </tr>
                ))}
                <tr style={{ background: '#f8fafc' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 800 }}>Tổng cộng</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 800 }}>{totalQty}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }} />
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', margin: '0 0 12px' }}>Ảnh xác nhận nhận hàng</p>
          {images.length === 0 ? (
            <div style={{ border: '2px dashed #fde68a', background: '#fefce8', borderRadius: 12, padding: 24, textAlign: 'center', color: '#a16207', fontSize: 13 }}>
              Chưa có ảnh minh chứng
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {images.map((img, idx) => {
                const u =
                  typeof img === 'string'
                    ? img
                    : img?.url ?? img?.Url ?? img?.imageUrl ?? img?.secureUrl
                if (!u) return null
                return (
                  <a key={idx} href={u} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                    <img
                      src={u}
                      alt=""
                      style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 10, border: '1px solid #e2e8f0' }}
                    />
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #f1f5f9', padding: 16, flexShrink: 0 }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            width: '100%',
            padding: 12,
            borderRadius: 10,
            border: '1.5px solid #e2e8f0',
            background: '#f8fafc',
            color: '#374151',
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          Đóng
        </button>
      </div>
        </>
      )}
    </>
  )
}
