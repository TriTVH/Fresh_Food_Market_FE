import { useState, useEffect, useRef } from 'react'
import { FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import {
  fetchBatchById,
  getApiErrorMessage,
  updateBatch,
  BATCH_ACTION,
  uploadImageToCloudinary,
  buildBatchDetailItemPayload,
} from '@/api/apiService'
import { buildConfirmFormRowsFromBatchApi } from '@/pages/Admin/BatchManagementView'

const PRIMARY = '#75b06f'
const PRIMARY_SOFT = '#ecfdf5'
const PRIMARY_BORDER = '#bbf7d0'
const SLATE_HEADER = '#475569'

const thBase = {
  textAlign: 'left',
  padding: '14px 18px',
  fontWeight: 700,
  color: SLATE_HEADER,
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
  borderBottom: '2px solid #e2e8f0',
}

/** Hiển thị HSD dạng MM/DD/YYYY (từ chuỗi YYYY-MM-DD hoặc ISO). */
function formatHsdDisplay(iso) {
  if (!iso || !String(iso).trim()) return '—'
  const s = String(iso).trim().slice(0, 10)
  const parts = s.split('-')
  if (parts.length === 3) {
    const y = parts[0]
    const m = parts[1]
    const day = parts[2]
    if (y.length === 4 && /^\d+$/.test(m) && /^\d+$/.test(day)) {
      const mm = String(Number(m)).padStart(2, '0')
      const dd = String(Number(day)).padStart(2, '0')
      return `${mm}/${dd}/${y}`
    }
  }
  const d = new Date(`${s}T12:00:00`)
  if (Number.isNaN(d.getTime())) return s
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const y = d.getFullYear()
  return `${mm}/${dd}/${y}`
}

/**
 * Admin: hoàn thành lô (DELIVERING) — chỉnh SL thực nhận; HSD từ lô (PUT /batch Complete)
 */
export default function CompleteBatchModal({ batchId, batchCode, onClose, onSuccess }) {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [rows, setRows] = useState([])

  const MAX_IMAGES = 6
  const [imageItems, setImageItems] = useState([]) // [{ file, previewUrl }]
  const [imageError, setImageError] = useState(null)
  const imageItemsRef = useRef(imageItems)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setLoadError(null)
      try {
        const raw = await fetchBatchById(batchId)
        if (cancelled) return
        const formRows = buildConfirmFormRowsFromBatchApi(raw)
        if (formRows.length === 0) {
          setLoadError('Không có dòng chi tiết sản phẩm trong lô.')
          setRows([])
        } else {
          setRows(formRows)
        }
      } catch (e) {
        if (!cancelled) {
          setLoadError(getApiErrorMessage(e) || e?.message || 'Không tải được chi tiết lô.')
          setRows([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [batchId])

  useEffect(() => {
    imageItemsRef.current = imageItems
  }, [imageItems])

  useEffect(() => {
    // Cleanup object URLs on unmount
    return () => {
      imageItemsRef.current.forEach((it) => {
        if (!it?.previewUrl) return
        try {
          URL.revokeObjectURL(it.previewUrl)
        } catch {
          // ignore
        }
      })
    }
  }, [])

  const addImagesFromFiles = (files) => {
    setImageError(null)
    const incoming = Array.from(files || [])
    const imagesOnly = incoming.filter((f) => (f?.type || '').startsWith('image/'))
    if (imagesOnly.length === 0) return

    setImageItems((prev) => {
      const remaining = MAX_IMAGES - prev.length
      if (remaining <= 0) {
        setImageError(`Tối đa ${MAX_IMAGES} ảnh. Bạn chưa thể chọn thêm.`)
        return prev
      }
      const toAdd = imagesOnly.slice(0, remaining)
      const mapped = toAdd.map((file) => ({ file, previewUrl: URL.createObjectURL(file) }))
      if (imagesOnly.length > remaining) setImageError(`Tối đa ${MAX_IMAGES} ảnh.`)
      return [...prev, ...mapped]
    })
  }

  const removeImageAt = (idx) => {
    setImageItems((prev) => {
      const next = prev.filter((_, i) => i !== idx)
      const removed = prev[idx]
      if (removed?.previewUrl) {
        try {
          URL.revokeObjectURL(removed.previewUrl)
        } catch {
          // ignore
        }
      }
      return next
    })
  }

  const setRow = (index, patch) => {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, ...patch } : r)))
  }

  const handleSubmit = async () => {
    if (rows.length === 0) return
    for (const r of rows) {
      const q = Number(r.quantity)
      if (Number.isNaN(q) || q < 0) {
        toast.error('Số lượng thực nhận phải ≥ 0.')
        return
      }
      if (q > r.requiredQty) {
        toast.error(`Số lượng không được vượt SL theo lô (${r.productName}).`)
        return
      }
    }
    const items = rows.map((r) =>
      buildBatchDetailItemPayload({
        id: r.id,
        quantity: Math.floor(Number(r.quantity)) || 0,
        expiredDate: r.expiredDate && String(r.expiredDate).trim() ? r.expiredDate : null,
      })
    )
    setSubmitting(true)
    try {
      const uploadedUrls = []
      for (const it of imageItems) {
        const url = await uploadImageToCloudinary(it.file)
        uploadedUrls.push(url)
      }
      // Backend batch imageConfirmReceived có thể là string URL hoặc object.
      // Gửi object để hạn chế lỗi deserialization nếu backend kỳ vọng cấu trúc tương tự.
      const imagesJson = uploadedUrls.map((url, index) => ({
        url,
        primary: index === 0,
      }))
      await updateBatch({
        id: batchId,
        items,
        action: BATCH_ACTION.Complete,
        imagesJson,
        cancelReason: null,
      })
      // Chỉ cần chờ refresh danh sách (GET /batch) xong rồi báo thành công.
      await Promise.resolve(onSuccess?.())
      await new Promise((r) => setTimeout(r, 400))
      await Promise.resolve(onSuccess?.())
      toast.success('Đã hoàn thành lô hàng.')
      onClose()
    } catch (e) {
      toast.error(getApiErrorMessage(e) || e?.message || 'Không hoàn thành được lô hàng.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="complete-batch-modal-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="complete-batch-title"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 1150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        overflowY: 'auto',
      }}
      onMouseDown={(e) => e.target === e.currentTarget && !submitting && onClose()}
    >
      <style>{`
        .complete-batch-modal-root .cb-qty-input {
          width: 100%;
          max-width: 100px;
          margin: 0 auto;
          display: block;
          padding: 10px 12px;
          border-radius: 10px;
          border: 2px solid #e2e8f0;
          font-size: 15px;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          color: #0f172a;
          text-align: center;
          background: #fff;
          box-sizing: border-box;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .complete-batch-modal-root .cb-qty-input:hover:not(:disabled) {
          border-color: #cbd5e1;
        }
        .complete-batch-modal-root .cb-qty-input:focus {
          outline: none;
          border-color: ${PRIMARY};
          box-shadow: 0 0 0 3px rgba(117, 176, 111, 0.25);
        }
        .complete-batch-modal-root .cb-table tbody tr:nth-child(even) {
          background: #fafbfc;
        }
        .complete-batch-modal-root .cb-table tbody tr:hover {
          background: ${PRIMARY_SOFT};
        }
        .complete-batch-modal-root .cb-close:hover:not(:disabled) {
          background: #f1f5f9;
          color: #64748b;
        }
        .complete-batch-modal-root .cb-btn-secondary:hover:not(:disabled) {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }
        .complete-batch-modal-root .cb-btn-primary:hover:not(:disabled) {
          filter: brightness(1.05);
        }
        @keyframes cb-batch-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          width: 'min(920px, 100%)',
          maxHeight: 'min(92vh, 900px)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.04)',
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '22px 24px 20px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 16,
            flexShrink: 0,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderLeft: `4px solid ${PRIMARY}`,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <h2 id="complete-batch-title" style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
                Hoàn thành nhận hàng
              </h2>
              {batchCode != null && batchCode !== '' && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 12px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                    background: PRIMARY_SOFT,
                    color: '#166534',
                    border: `1px solid ${PRIMARY_BORDER}`,
                  }}
                >
                  {batchCode}
                </span>
              )}
            </div>
            <p style={{ margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.55, maxWidth: 720 }}>
              Nhập <strong style={{ color: '#334155' }}>số lượng thực nhận</strong> tại kho (≤ SL theo lô). Hạn sử dụng theo thông tin đã khai báo khi xác nhận lô.
            </p>
          </div>
          <button
            type="button"
            className="cb-close"
            onClick={() => !submitting && onClose()}
            disabled={submitting}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: submitting ? 'not-allowed' : 'pointer',
              color: '#94a3b8',
              fontSize: 22,
              flexShrink: 0,
              padding: 8,
              borderRadius: 10,
              lineHeight: 1,
              transition: 'background 0.15s, color 0.15s',
            }}
            aria-label="Đóng"
          >
            <FiX />
          </button>
        </div>

        <div style={{ padding: '20px 24px', overflow: 'auto', flex: 1, minHeight: 0 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  margin: '0 auto 16px',
                  borderRadius: '50%',
                  border: `3px solid #e2e8f0`,
                  borderTopColor: PRIMARY,
                  animation: 'cb-batch-spin 0.7s linear infinite',
                }}
              />
              <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>Đang tải chi tiết lô…</p>
            </div>
          ) : loadError ? (
            <div
              style={{
                textAlign: 'center',
                padding: '28px 20px',
                borderRadius: 14,
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#b91c1c',
                fontSize: 14,
              }}
            >
              {loadError}
            </div>
          ) : (
            <div
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(15, 23, 42, 0.06)',
              }}
            >
              <table className="cb-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={{ ...thBase, width: '36%' }}>Sản phẩm</th>
                    <th style={{ ...thBase, textAlign: 'center', width: '16%' }}>SL theo lô</th>
                    <th style={{ ...thBase, textAlign: 'center', width: '22%' }}>SL thực nhận</th>
                    <th style={{ ...thBase, textAlign: 'right', width: '26%' }}>HSD</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.12s ease' }}>
                      <td style={{ padding: '16px 18px', fontWeight: 600, color: '#0f172a', verticalAlign: 'middle', fontSize: 14 }}>
                        {r.productName}
                      </td>
                      <td style={{ padding: '16px 18px', textAlign: 'center', verticalAlign: 'middle' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: 36,
                            padding: '6px 12px',
                            borderRadius: 10,
                            background: '#f1f5f9',
                            color: '#475569',
                            fontWeight: 700,
                            fontSize: 14,
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          {r.requiredQty}
                        </span>
                      </td>
                      <td style={{ padding: '16px 18px', verticalAlign: 'middle', textAlign: 'center' }}>
                        <input
                          type="number"
                          className="cb-qty-input"
                          min={0}
                          max={r.requiredQty}
                          disabled={submitting}
                          value={r.quantity}
                          onChange={(e) => {
                            const v = e.target.value
                            if (v === '') {
                              setRow(i, { quantity: '' })
                              return
                            }
                            const n = Number(v)
                            if (!Number.isNaN(n)) setRow(i, { quantity: Math.min(Math.max(0, Math.floor(n)), r.requiredQty) })
                          }}
                          onBlur={(e) => {
                            const n = Number(e.target.value)
                            if (e.target.value === '' || Number.isNaN(n)) setRow(i, { quantity: 0 })
                          }}
                        />
                      </td>
                      <td style={{ padding: '16px 18px', verticalAlign: 'middle', textAlign: 'right' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            padding: '8px 14px',
                            borderRadius: 10,
                            background: PRIMARY_SOFT,
                            color: '#166534',
                            fontWeight: 600,
                            fontSize: 13,
                            border: `1px solid ${PRIMARY_BORDER}`,
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          {formatHsdDisplay(r.expiredDate)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div style={{ marginTop: 18 }}>
            <p style={{ fontWeight: 800, fontSize: 13.5, color: '#0f172a', margin: '0 0 10px' }}>
              Upload ảnh minh chứng (tối đa {MAX_IMAGES} ảnh)
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <label
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: '2px solid #e2e8f0',
                  background: '#fff',
                  color: '#475569',
                  fontWeight: 800,
                  fontSize: 13.5,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  userSelect: 'none',
                }}
              >
                Chọn ảnh
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={submitting}
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files) addImagesFromFiles(e.target.files)
                    // Reset để có thể chọn lại cùng file
                    e.target.value = ''
                  }}
                />
              </label>
              <div style={{ color: '#64748b', fontSize: 13, fontWeight: 700 }}>
                Đã chọn: <span style={{ color: '#0f172a' }}>{imageItems.length}</span> / {MAX_IMAGES}
              </div>
            </div>
            {imageError && (
              <div style={{ marginTop: 8, padding: '10px 12px', borderRadius: 12, border: '1px solid #fecaca', background: '#fef2f2', color: '#b91c1c', fontWeight: 800, fontSize: 13 }}>
                {imageError}
              </div>
            )}
            {imageItems.length > 0 && (
              <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {imageItems.map((it, idx) => (
                  <div key={it.previewUrl} style={{ position: 'relative' }}>
                    <img
                      src={it.previewUrl}
                      alt=""
                      style={{
                        width: 92,
                        height: 92,
                        objectFit: 'cover',
                        borderRadius: 12,
                        border: '1px solid #e2e8f0',
                        background: '#fff',
                      }}
                    />
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => removeImageAt(idx)}
                      style={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        width: 28,
                        height: 28,
                        borderRadius: 999,
                        border: 'none',
                        background: '#ef4444',
                        color: '#fff',
                        fontWeight: 900,
                        cursor: submitting ? 'not-allowed' : 'pointer',
                      }}
                      aria-label="Xóa ảnh"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {imageItems.length === 0 && (
              <div style={{ marginTop: 10, border: '1px dashed #fde68a', background: '#fffbeb', borderRadius: 12, padding: 14, color: '#a16207', fontSize: 13, fontWeight: 700 }}>
                Không có ảnh nào được chọn. Bạn có thể chọn thêm để minh chứng.
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 12,
            flexShrink: 0,
            flexWrap: 'wrap',
            background: 'linear-gradient(180deg, #fafbfc 0%, #fff 100%)',
          }}
        >
          <button
            type="button"
            className="cb-btn-secondary"
            disabled={submitting}
            onClick={onClose}
            style={{
              padding: '11px 20px',
              borderRadius: 12,
              border: '2px solid #e2e8f0',
              background: '#fff',
              color: '#475569',
              fontWeight: 700,
              fontSize: 14,
              cursor: submitting ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s, border-color 0.15s',
            }}
          >
            Hủy
          </button>
          <button
            type="button"
            className="cb-btn-primary"
            disabled={submitting || loading || rows.length === 0 || !!loadError}
            onClick={handleSubmit}
            style={{
              padding: '11px 22px',
              borderRadius: 12,
              border: 'none',
              background: submitting ? '#94a3b8' : `linear-gradient(180deg, ${PRIMARY} 0%, #5a9450 100%)`,
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              cursor: submitting || rows.length === 0 ? 'not-allowed' : 'pointer',
              boxShadow: submitting ? 'none' : '0 4px 14px rgba(117, 176, 111, 0.35)',
              transition: 'filter 0.15s',
            }}
          >
            {submitting ? 'Đang gửi…' : 'Xác nhận hoàn thành lô'}
          </button>
        </div>
      </div>
    </div>
  )
}
