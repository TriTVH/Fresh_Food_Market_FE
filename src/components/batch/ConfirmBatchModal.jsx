import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import {
  fetchBatchById,
  getApiErrorMessage,
  updateBatch,
  BATCH_ACTION,
  buildBatchDetailItemPayload,
} from '@/api/apiService'
import { buildConfirmFormRowsFromBatchApi } from '@/pages/Admin/BatchManagementView'

const PRIMARY = '#75b06f'

const th = {
  textAlign: 'left',
  padding: '10px 12px',
  fontWeight: 700,
  color: '#64748b',
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
  background: '#f8fafc',
  borderBottom: '1px solid #e2e8f0',
}

const inputStyle = {
  width: '100%',
  maxWidth: 120,
  padding: '8px 10px',
  borderRadius: 8,
  border: '1.5px solid #e2e8f0',
  fontSize: 13,
  color: '#0f172a',
  boxSizing: 'border-box',
}

/**
 * Modal xác nhận lô (PENDING): chỉnh SL cung cấp, HSD → PUT /batch Confirm
 * items[]: { id, quantity, expiredDate } (theo Swagger)
 */
export default function ConfirmBatchModal({ batchId, batchCode, onClose, onSuccess }) {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [rows, setRows] = useState([])

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

  const setRow = (index, patch) => {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, ...patch } : r)))
  }

  const handleSubmit = async () => {
    if (rows.length === 0) return
    for (const r of rows) {
      const q = Number(r.quantity)
      if (Number.isNaN(q) || q < 0) {
        toast.error('Số lượng cung cấp phải ≥ 0.')
        return
      }
      if (q > r.requiredQty) {
        toast.error(`Số lượng không được vượt SL yêu cầu (${r.productName}).`)
        return
      }
      const qtyInt = Math.floor(Number(r.quantity)) || 0
      if (qtyInt > 0) {
        const exp = r.expiredDate != null && String(r.expiredDate).trim()
        if (!exp) {
          toast.error(`Vui lòng nhập HSD cho: ${r.productName}.`)
          return
        }
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
      await updateBatch({
        id: batchId,
        items,
        action: BATCH_ACTION.Confirm,
        imagesJson: [],
        cancelReason: null,
      })

      // Chỉ cần chờ refresh danh sách (GET /batch) xong rồi báo thành công.
      // Không so khớp trạng thái trên list vì API list có thể trễ hơn chi tiết / PUT.
      await Promise.resolve(onSuccess?.())
      await new Promise((r) => setTimeout(r, 400))
      await Promise.resolve(onSuccess?.())
      toast.success('Đã xác nhận lô (chuyển sang đóng gói).')
      onClose()
    } catch (e) {
      toast.error(getApiErrorMessage(e) || e?.message || 'Không xác nhận được lô.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-batch-title"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        overflowY: 'auto',
      }}
      onMouseDown={(e) => e.target === e.currentTarget && !submitting && onClose()}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          width: 'min(880px, 100%)',
          maxHeight: 'min(92vh, 900px)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '18px 20px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 12,
            flexShrink: 0,
          }}
        >
          <div>
            <h2 id="confirm-batch-title" style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Xác nhận lô hàng
            </h2>
            {batchCode != null && batchCode !== '' && (
              <p style={{ margin: '6px 0 0', fontSize: 13, color: '#64748b' }}>Mã lô: {batchCode}</p>
            )}
            <p style={{ margin: '8px 0 0', fontSize: 12.5, color: '#94a3b8', lineHeight: 1.45, maxWidth: 640 }}>
              Nhập số lượng thực tế giao (≤ SL yêu cầu). Nếu SL cung cấp &gt; 0 thì <strong style={{ color: '#64748b' }}>bắt buộc nhập HSD</strong>. Để SL = 0 nếu không giao dòng đó.
            </p>
          </div>
          <button
            type="button"
            onClick={() => !submitting && onClose()}
            style={{ background: 'none', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', color: '#94a3b8', fontSize: 22, flexShrink: 0, padding: 4 }}
            aria-label="Đóng"
          >
            <FiX />
          </button>
        </div>

        <div style={{ padding: '16px 20px', overflow: 'auto', flex: 1, minHeight: 0 }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#94a3b8', padding: 32 }}>Đang tải chi tiết lô…</p>
          ) : loadError ? (
            <p style={{ textAlign: 'center', color: '#b91c1c', padding: 24 }}>{loadError}</p>
          ) : (
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr>
                    <th style={th}>Sản phẩm</th>
                    <th style={{ ...th, textAlign: 'right' }}>SL yêu cầu</th>
                    <th style={{ ...th }}>SL cung cấp</th>
                    <th style={{ ...th }}>HSD</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: '#374151', verticalAlign: 'middle' }}>
                        {r.productName}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', color: '#64748b', verticalAlign: 'middle' }}>
                        {r.requiredQty}
                      </td>
                      <td style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                        <input
                          type="number"
                          min={0}
                          max={r.requiredQty}
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
                          style={inputStyle}
                        />
                      </td>
                      <td style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                        <input
                          type="date"
                          value={r.expiredDate || ''}
                          onChange={(e) => setRow(i, { expiredDate: e.target.value })}
                          required={Number(r.quantity) > 0}
                          aria-required={Number(r.quantity) > 0}
                          style={{ ...inputStyle, maxWidth: 160 }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div
          style={{
            padding: '14px 20px',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 10,
            flexShrink: 0,
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            style={{
              padding: '10px 18px',
              borderRadius: 10,
              border: '1.5px solid #e2e8f0',
              background: '#f8fafc',
              color: '#374151',
              fontWeight: 700,
              fontSize: 14,
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
          >
            Hủy
          </button>
          <button
            type="button"
            disabled={submitting || loading || rows.length === 0 || !!loadError}
            onClick={handleSubmit}
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              border: 'none',
              background: submitting ? '#94a3b8' : PRIMARY,
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              cursor: submitting || rows.length === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            {submitting ? 'Đang gửi…' : 'Xác nhận lô'}
          </button>
        </div>
      </div>
    </div>
  )
}
