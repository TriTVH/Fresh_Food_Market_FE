<<<<<<< HEAD
import { useState, useEffect } from 'react'
import { FiSearch, FiPlus, FiEye, FiCheckSquare, FiX, FiChevronDown, FiChevronRight } from 'react-icons/fi'
import { FiHash } from 'react-icons/fi'
import { fetchBatches, createBatch } from '@/api/adminApi'
import { mapBatchDtoToFrontend } from '@/utils/mapper'
=======
import { useState, useEffect, useRef } from 'react'
import { FiSearch, FiPlus, FiEye, FiX, FiChevronDown, FiCheck } from 'react-icons/fi'
import BatchDetailModal from '@/components/batch/BatchDetailModal'
import CompleteBatchModal from '@/components/batch/CompleteBatchModal'
import {
  fetchSuppliers,
  fetchAllProducts,
  mapProductForBatchPicker,
  createBatch,
  getApiErrorMessage,
  fetchBatches,
} from '@/api/apiService'
import { toast } from 'react-toastify'
>>>>>>> tri

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

<<<<<<< HEAD
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
=======
/** Tên hiển thị trong modal lô hàng: bỏ hậu tố "(500 gram)", "(1.5 kilogram)"… */
export function batchProductDisplayName(name) {
  if (!name || typeof name !== 'string') return name || ''
  return name
    .replace(/\s*\([^)]*(?:gram|kilogram|kilôgam|ký|kg)\b[^)]*\)\s*$/i, '')
    .trim()
}

/** Trạng thái API + nhãn lọc */
const BATCH_STATUS_FILTERS = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'PENDING', label: 'Chờ xử lý (PENDING)' },
  { value: 'PACKAGING', label: 'Đóng gói (PACKAGING)' },
  { value: 'DELIVERING', label: 'Đang giao (DELIVERING)' },
  { value: 'COMPLETED', label: 'Hoàn thành (COMPLETED)' },
  { value: 'CANCELED', label: 'Đã hủy (CANCELED)' },
]

const BATCH_STATUS_LABEL_VI = {
  PENDING: 'Chờ xử lý',
  PACKAGING: 'Đóng gói',
  DELIVERING: 'Đang giao',
  COMPLETED: 'Hoàn thành',
  CANCELED: 'Đã hủy',
}

function normalizeBatchStatus(raw) {
  const s = (raw ?? '').toString().trim().toUpperCase()
  return s || 'PENDING'
}

export function labelBatchStatus(code) {
  return BATCH_STATUS_LABEL_VI[code] || code
}

/**
 * Ngày từ API -> yyyy-MM-dd cho <input type="date"> (theo local, tránh lệch ngày do UTC khi dùng toISOString).
 */
export function batchDetailDateToInputValue(raw) {
  if (raw == null || raw === '') return ''
  const s = String(raw).trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s
  const dt = new Date(s)
  if (Number.isNaN(dt.getTime())) return ''
  const y = dt.getFullYear()
  const m = String(dt.getMonth() + 1).padStart(2, '0')
  const day = String(dt.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * Tạo `items[]` cho PUT /batch với action Confirm từ response GET /batch/{id}.
 */
export function buildConfirmItemsFromBatchApi(raw) {
  const details = raw?.batchDetails ?? raw?.BatchDetails ?? []
  if (!Array.isArray(details)) return []
  return details
    .map((d) => {
      const id = d?.batchDetailId ?? d?.BatchDetailId
      if (id == null) return null
      const qty = Number(d?.quantity ?? d?.Quantity ?? 0) || 0
      const exp =
        d?.expiredDate ?? d?.ExpiredDate ?? d?.expiryDate ?? d?.ExpiryDate ?? d?.expiry ?? d?.Expiry
      const expiredDate = exp ? batchDetailDateToInputValue(exp) : null
      return { id, quantity: qty, expiredDate: expiredDate || null }
    })
    .filter(Boolean)
}

/** Dòng form xác nhận lô: SL yêu cầu + SL/HSD chỉnh sửa (PUT /batch items: id, quantity, expiredDate) */
export function buildConfirmFormRowsFromBatchApi(raw) {
  const details = raw?.batchDetails ?? raw?.BatchDetails ?? []
  if (!Array.isArray(details)) return []
  return details
    .map((d) => {
      const id = d?.batchDetailId ?? d?.BatchDetailId
      if (id == null) return null
      const requiredQty = Number(d?.quantity ?? d?.Quantity ?? 0) || 0
      const exp =
        d?.expiredDate ?? d?.ExpiredDate ?? d?.expiryDate ?? d?.ExpiryDate ?? d?.expiry ?? d?.Expiry
      const expiredDate = exp ? batchDetailDateToInputValue(exp) : ''
      const rawName = d?.productName ?? d?.ProductName ?? ''
      const productName =
        typeof rawName === 'string' && rawName.trim()
          ? batchProductDisplayName(rawName) || rawName
          : '—'
      return {
        id,
        productName,
        requiredQty,
        quantity: requiredQty,
        expiredDate,
      }
    })
    .filter(Boolean)
}

function formatBatchDate(iso) {
  if (iso == null || iso === '') return '—'
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString('vi-VN')
}

export function batchStatusBadgeStyle(code) {
  switch (code) {
    case 'COMPLETED':
      return { bg: '#f0fdf4', color: PRIMARY_DARK, border: `${PRIMARY}40` }
    case 'CANCELED':
      return { bg: '#fef2f2', color: '#b91c1c', border: '#fecaca' }
    case 'DELIVERING':
      return { bg: '#f5f3ff', color: '#6d28d9', border: '#ddd6fe' }
    case 'PACKAGING':
      return { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' }
    case 'PENDING':
    default:
      return { bg: '#fff7ed', color: '#ea580c', border: '#fed7aa' }
  }
}

function mapBatchDetailToItem(d) {
  const qty = Number(d?.quantity ?? d?.qty ?? d?.Quantity ?? 0) || 0
  const price = Number(d?.price ?? d?.unitPrice ?? d?.priceSell ?? d?.Price ?? 0) || 0
  const remaining = d?.remainingQuantity ?? d?.remaining ?? d?.RemainingQuantity ?? qty
  const rawName = d?.productName ?? d?.ProductName ?? d?.product?.productName ?? d?.name ?? ''
  const name =
    typeof rawName === 'string' && rawName.trim()
      ? batchProductDisplayName(rawName) || rawName
      : '—'
  let expiry = '—'
  const exp = d?.expiryDate ?? d?.expiry ?? d?.ExpiryDate ?? d?.expiredDate ?? d?.ExpiredDate
  if (exp) expiry = formatBatchDate(exp)
  return {
    product: typeof name === 'string' ? batchProductDisplayName(name) || name : '—',
    qty,
    remaining: Number(remaining) || qty,
    price,
    expiry,
  }
}

function normalizeBatchNotes(raw) {
  if (raw == null) return null

  let obj = raw
  if (typeof raw === 'string') {
    const s = raw.trim()
    if (!s) return null
    try {
      obj = JSON.parse(s)
    } catch {
      return {
        insufficientSupplyNote: [],
        unprovidedProducts: [],
        completedSupplyStats: [],
        cancelInfo: null,
        _unparsedNotesText: s,
      }
    }
  }

  if (typeof obj !== 'object' || obj === null) return null

  const insufficient = obj.insufficientSupplyNote ?? obj.InsufficientSupplyNote
  const unprovided =
    obj.unprovidedProducts ??
    obj.UnprovidedProducts ??
    obj.undeliverableSupplies ??
    obj.UndeliverableSupplies
  const completed = obj.completedSupplyStats ?? obj.CompletedSupplyStats
  const cancel = obj.cancelInfo ?? obj.CancelInfo
  return {
    insufficientSupplyNote: Array.isArray(insufficient) ? insufficient : [],
    unprovidedProducts: Array.isArray(unprovided) ? unprovided : [],
    completedSupplyStats: Array.isArray(completed) ? completed : [],
    cancelInfo: cancel && typeof cancel === 'object' ? cancel : null,
  }
}

export function mapApiBatchToUi(raw) {
  const batchId = raw?.batchId ?? raw?.BatchId
  const code = (raw?.batchCode ?? raw?.batch_code ?? '').toString().trim()
  const id = code || (batchId != null ? `BATCH-${batchId}` : `batch-${batchId ?? 'local'}`)
  const status = normalizeBatchStatus(raw?.status ?? raw?.Status)
  let details = raw?.batchDetails ?? raw?.BatchDetails
  if (details == null) details = []
  if (!Array.isArray(details)) details = [details]
  const items = details.filter(Boolean).map(mapBatchDetailToItem)
  const totalPrice = raw?.totalPrice ?? raw?.TotalPrice
  const totalValue = totalPrice != null && totalPrice !== '' ? Number(totalPrice) : items.reduce((s, it) => s + it.qty * it.price, 0)
  const imgs = raw?.imageConfirmReceived ?? raw?.ImageConfirmReceived
  const imageConfirmReceived = Array.isArray(imgs) ? imgs : []

  return {
    id,
    batchId,
    supplier: raw?.supplierName ?? raw?.SupplierName ?? '—',
    phone: raw?.supplierPhone ?? raw?.SupplierPhone ?? '',
    supplierAddress: raw?.supplierAddress ?? raw?.SupplierAddress ?? '',
    supplyBy: raw?.supplyBy ?? raw?.SupplyBy ?? null,
    totalQty: Number(raw?.totalItems ?? raw?.TotalItems ?? items.reduce((s, it) => s + it.qty, 0)) || 0,
    totalValue,
    createdDate: formatBatchDate(raw?.createdDate ?? raw?.CreatedDate),
    updatedDate: formatBatchDate(raw?.updatedDate ?? raw?.UpdatedDate),
    deliveryDate: formatBatchDate(raw?.deliveredDate ?? raw?.DeliveredDate),
    status,
    items,
    notes: normalizeBatchNotes(raw?.notes ?? raw?.Notes),
    imageConfirmReceived,
    _raw: raw,
  }
}

function normalizeSupplier(raw) {
  const supplierId = raw?.supplierId ?? raw?.supplier_id
  if (supplierId == null) return null
  return {
    supplierId,
    name: raw?.name ?? '',
    phone: raw?.phone ?? '',
    address: raw?.address ?? '',
  }
}

// ── Add Batch Modal ──
function AddBatchModal({ onClose, onConfirm, batchCount }) {
  const autoId = 'BATCH-2026-' + String(batchCount + 1).padStart(3, '0')
  const [supplierList, setSupplierList] = useState([])
  const [suppliersLoading, setSuppliersLoading] = useState(true)
  const [suppliersError, setSuppliersError] = useState(null)
  const [supplierOpen, setSupplierOpen] = useState(false)
  const [supplierInput, setSupplierInput] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const supplierComboRef = useRef(null)

  const [productSearch, setProductSearch] = useState('')
  const [catalogProducts, setCatalogProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [selected, setSelected] = useState([]) // [{...catalog item, qty, expiry}]

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setProductsLoading(true)
      setProductsError(null)
      try {
        const rows = await fetchAllProducts()
        if (cancelled) return
        const list = (rows || []).map(mapProductForBatchPicker).filter(Boolean)
        setCatalogProducts(list)
      } catch (e) {
        if (!cancelled) setProductsError(e?.message || 'Không tải được danh sách sản phẩm')
      } finally {
        if (!cancelled) setProductsLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setSuppliersLoading(true)
      setSuppliersError(null)
      try {
        const rows = await fetchSuppliers()
        if (cancelled) return
        const list = (rows || []).map(normalizeSupplier).filter(Boolean)
        setSupplierList(list)
      } catch (e) {
        if (!cancelled) setSuppliersError(e?.message || 'Không tải được danh sách nhà cung cấp')
      } finally {
        if (!cancelled) setSuppliersLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const onDoc = (e) => {
      if (supplierComboRef.current && !supplierComboRef.current.contains(e.target)) {
        setSupplierOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const supplierQuery = supplierInput.trim().toLowerCase()
  const filteredSuppliers = supplierList.filter((s) =>
    !supplierQuery || s.name.toLowerCase().includes(supplierQuery)
  )

  const pickSupplier = (s) => {
    setSelectedSupplier(s)
    setSupplierInput(s.name)
    setSupplierOpen(false)
  }

  const onSupplierInputChange = (e) => {
    const v = e.target.value
    setSupplierInput(v)
    setSupplierOpen(true)
    if (selectedSupplier && v.trim() !== selectedSupplier.name) setSelectedSupplier(null)
  }

  const q = productSearch.trim().toLowerCase()
  const filteredCatalog = catalogProducts.filter(
    (p) =>
      !q ||
      p.name.toLowerCase().includes(q) ||
      String(p.id).toLowerCase().includes(q)
  )

  const addProduct = (p) => {
    const exist = selected.find((s) => s.id === p.id)
    if (exist) {
      // Bấm “Thêm” liên tục sẽ cộng thêm 1 đơn vị (không bị khóa nút).
      setSelected((prev) => prev.map((s) => (s.id === p.id ? { ...s, qty: s.qty + 1 } : s)))
      return
    }
    setSelected((prev) => [...prev, { ...p, qty: 1, expiry: '' }])
  }
  const removeProduct = (id) => setSelected((prev) => prev.filter((s) => s.id !== id))
  const setQty = (id, val) => setSelected((prev) => prev.map((s) => s.id === id ? { ...s, qty: Math.max(1, Number(val)) } : s))

  const totalQty = selected.reduce((sum, s) => sum + s.qty, 0)
  const totalValue = selected.reduce((sum, s) => sum + s.qty * s.price, 0)

  const handleAdd = async () => {
    if (!selectedSupplier || selected.length === 0 || submitting) return
    setSubmitting(true)
    try {
      const apiBody = {
        supplierId: Number(selectedSupplier.supplierId),
        items: selected.map((s) => ({
          productId: Number(s.id),
          quantity: Math.max(1, Math.floor(Number(s.qty)) || 1),
        })),
      }
      const res = await createBatch(apiBody)
      // API có thể bọc: { data: { batchId, batchCode } } hoặc trả thẳng object tạo lô.
      const created = res?.data?.data ?? res?.data ?? res
      const batchId = created?.batchId ?? created?.BatchId ?? null
      const batchCode = (created?.batchCode ?? created?.batch_code ?? created?.code ?? '').toString().trim()
      const displayId =
        batchCode ||
        (batchId != null ? String(batchId) : autoId)

      const payload = {
        id: displayId,
        batchId,
        supplier: selectedSupplier.name,
        phone: selectedSupplier.phone || undefined,
        supplierId: selectedSupplier.supplierId,
        totalQty,
        totalValue,
        items: selected.map((s) => ({
          product: batchProductDisplayName(s.name) || s.name,
          qty: s.qty,
          remaining: s.qty,
          price: s.price,
          expiry: s.expiry || '—',
        })),
      }
      // Chờ parent refresh danh sách (GET /batch) xong rồi mới đóng modal + toast.
      if (onConfirm) await onConfirm(payload)
>>>>>>> tri
    onClose()
      toast.success(res?.message || 'Đã tạo lô hàng.')
    } catch (err) {
      const msg = getApiErrorMessage(err) || err?.message || 'Tạo lô hàng thất bại.'
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const inputS = { width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13.5, outline: 'none', boxSizing: 'border-box', color: '#374151', background: '#fff' }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
<<<<<<< HEAD
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
=======
      <div style={{ background: '#fff', borderRadius: 16, width: 820, maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 60px rgba(0,0,0,0.22)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px 14px', borderBottom: '1px solid #f1f5f9' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>Thêm Lô Hàng Mới</h2>
          <button type="button" onClick={onClose} disabled={submitting} style={{ background: 'none', border: 'none', cursor: submitting ? 'default' : 'pointer', color: '#94a3b8', fontSize: 20, opacity: submitting ? 0.5 : 1 }}><FiX /></button>
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
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Số điện thoại nhà cung cấp</label>
                  <input
                    value={selectedSupplier ? (selectedSupplier.phone || '') : ''}
                    readOnly
                    placeholder={selectedSupplier ? '—' : 'Chọn nhà cung cấp'}
                    aria-readonly="true"
                    style={{
                      ...inputS,
                      background: '#f8fafc',
                      color: selectedSupplier?.phone ? '#64748b' : '#94a3b8',
                      cursor: 'default',
                    }}
                  />
                </div>
                <div ref={supplierComboRef} style={{ position: 'relative' }}>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Nhà Cung Cấp <span style={{ color: '#ef4444' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <input
                      value={supplierInput}
                      onChange={onSupplierInputChange}
                      onFocus={(e) => {
                        e.target.style.borderColor = PRIMARY
                        setSupplierOpen(true)
                      }}
                      onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                      placeholder={suppliersLoading ? 'Đang tải...' : 'Gõ để tìm nhà cung cấp...'}
                      disabled={suppliersLoading}
                      autoComplete="off"
                      role="combobox"
                      aria-expanded={supplierOpen}
                      style={{ ...inputS, paddingRight: 36 }}
                    />
                    <FiChevronDown
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => !suppliersLoading && setSupplierOpen((o) => !o)}
                      style={{
                        position: 'absolute', right: 10, top: '50%', transform: `translateY(-50%) rotate(${supplierOpen ? 180 : 0}deg)`,
                        color: '#94a3b8', fontSize: 18, cursor: suppliersLoading ? 'default' : 'pointer', transition: 'transform 0.15s',
                      }}
                    />
                  </div>
                  {suppliersError && (
                    <p style={{ margin: '6px 0 0', fontSize: 11.5, color: '#ef4444' }}>{suppliersError}</p>
                  )}
                  {supplierOpen && !suppliersLoading && (
                    <div
                      style={{
                        position: 'absolute', left: 0, right: 0, top: '100%', marginTop: 4, maxHeight: 200, overflowY: 'auto',
                        background: '#fff', border: `1.5px solid ${PRIMARY}40`, borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 20,
                      }}
                    >
                      {filteredSuppliers.length === 0 ? (
                        <div style={{ padding: '12px 14px', fontSize: 13, color: '#94a3b8' }}>Không có nhà cung cấp phù hợp</div>
                      ) : (
                        filteredSuppliers.map((s) => (
                          <button
                            key={s.supplierId}
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => pickSupplier(s)}
                            style={{
                              display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', border: 'none', borderBottom: '1px solid #f1f5f9',
                              background: selectedSupplier?.supplierId === s.supplierId ? '#f0fdf4' : '#fff', cursor: 'pointer', fontSize: 13.5, color: '#0f172a',
                            }}
                          >
                            <span style={{ fontWeight: 600 }}>{s.name}</span>
                            {s.phone ? <span style={{ display: 'block', fontSize: 11.5, color: '#64748b', marginTop: 2 }}>{s.phone}</span> : null}
                          </button>
                        ))
                      )}
                    </div>
                  )}
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
                  placeholder={productsLoading ? 'Đang tải sản phẩm...' : 'Tìm kiếm sản phẩm...'}
                  disabled={productsLoading}
                  style={{ ...inputS, paddingLeft: 34 }}
                  onFocus={(e) => (e.target.style.borderColor = PRIMARY)} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
              </div>
              {productsError && (
                <p style={{ margin: 0, fontSize: 12, color: '#ef4444' }}>{productsError}</p>
              )}
              {/* Product list */}
              <div style={{ border: '1.5px solid #e2e8f0', borderRadius: 10, overflow: 'hidden', maxHeight: 280, overflowY: 'auto' }}>
                {productsLoading ? (
                  <div style={{ padding: 24, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>Đang tải danh sách sản phẩm...</div>
                ) : filteredCatalog.length === 0 ? (
                  <div style={{ padding: 24, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>Không có sản phẩm phù hợp.</div>
                ) : (
                  filteredCatalog.map((p, i) => {
                  return (
                      <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', borderBottom: i < filteredCatalog.length - 1 ? '1px solid #f1f5f9' : 'none', background: selected.find((s) => s.id === p.id) ? '#f0fdf4' : '#fff' }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 700, color: PRIMARY, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {batchProductDisplayName(p.name)}
                          </div>
                        <div style={{ fontSize: 11.5, color: PRIMARY, fontStyle: 'italic' }}>Nguồn: {p.origin}</div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: '#16a34a' }}>
                            Còn lại: {p.remaining != null ? p.remaining : '—'}
                          </div>
                      </div>
                        <button
                          type="button"
                          onClick={() => addProduct(p)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 8,
                            border: 'none',
                            background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`,
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: 12.5,
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          + Thêm
                      </button>
                    </div>
                  )
                  })
                )}
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
                      <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a', flex: 1, paddingRight: 6 }}>{batchProductDisplayName(s.name)}</div>
                      <button onClick={() => removeProduct(s.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 14, padding: 0, flexShrink: 0 }}>✕</button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <label style={{ fontSize: 11.5, fontWeight: 600, color: '#374151' }}>SL:</label>
                      <input type="number" min={1} value={s.qty} onChange={(e) => setQty(s.id, e.target.value)}
                        style={{ width: 52, padding: '4px 6px', border: '1.5px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', textAlign: 'center' }}
                        onFocus={(e) => (e.target.style.borderColor = PRIMARY)} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>Tổng ({totalQty} sp)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #f1f5f9', padding: '14px 28px', display: 'flex', gap: 12 }}>
          <button type="button" onClick={onClose} disabled={submitting} style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#fff', color: '#374151', fontWeight: 700, fontSize: 14, cursor: submitting ? 'default' : 'pointer', opacity: submitting ? 0.65 : 1 }}>Hủy</button>
          <button
            type="button"
            onClick={handleAdd}
            disabled={selected.length === 0 || !selectedSupplier || suppliersLoading || productsLoading || submitting}
            style={{
              flex: 2.5, padding: '12px', borderRadius: 10, border: 'none',
              background: selected.length === 0 || !selectedSupplier || suppliersLoading || productsLoading || submitting ? '#e2e8f0' : `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`,
              color: selected.length === 0 || !selectedSupplier || suppliersLoading || productsLoading || submitting ? '#94a3b8' : '#fff',
              fontWeight: 700, fontSize: 14,
              cursor: selected.length === 0 || !selectedSupplier || suppliersLoading || productsLoading || submitting ? 'default' : 'pointer',
              boxShadow: selected.length > 0 && selectedSupplier && !submitting ? '0 2px 8px rgba(117,176,111,0.35)' : 'none',
            }}
          >
            {submitting ? 'Đang tạo...' : 'Thêm Lô Hàng'}
          </button>
        </div>
>>>>>>> tri
      </div>
    </div>
  )
}

<<<<<<< HEAD
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
=======
export default function BatchManagementView() {
  const [batches, setBatches] = useState([])
  const [listLoading, setListLoading] = useState(true)
  const [listError, setListError] = useState(null)
>>>>>>> tri
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [viewBatchId, setViewBatchId] = useState(null)
  const [completeModalBatchId, setCompleteModalBatchId] = useState(null)

<<<<<<< HEAD
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

=======
  const refreshBatchRows = async () => {
    const rows = await fetchBatches()
    const mapped = (rows || []).map(mapApiBatchToUi)
    setBatches(mapped)
    return mapped
  }

  const loadBatches = async () => {
    setListLoading(true)
    setListError(null)
    try {
      await refreshBatchRows()
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

  const q = search.trim().toLowerCase()
  const filtered = batches.filter((b) => {
    const matchText =
      !q ||
      String(b.id).toLowerCase().includes(q) ||
      (b.supplier || '').toLowerCase().includes(q) ||
      (b.phone || '').toLowerCase().includes(q)
    const matchStatus = !statusFilter || b.status === statusFilter
    return matchText && matchStatus
  })

  const total = batches.length
  const delivering = batches.filter((b) => b.status === 'DELIVERING').length
  const done = batches.filter((b) => b.status === 'COMPLETED').length

  const handleAdd = async (payload) => {
    const wantCode = payload?.id != null ? String(payload.id).trim() : null
    const wantBatchId = payload?.batchId != null ? String(payload.batchId) : null
    const matchesNewBatch = (b) => {
      if (wantBatchId && b.batchId != null && String(b.batchId) === wantBatchId) return true
      if (wantCode && String(b.id) === wantCode) return true
      return false
    }
    setListLoading(true)
    setListError(null)
    try {
      const delays = [0, 500, 1000, 1800, 2800]
      for (let i = 0; i < delays.length; i += 1) {
        try {
          const mapped = await refreshBatchRows()
          if (!wantCode && !wantBatchId) break
          if (mapped.some(matchesNewBatch)) break
        } catch (e) {
          setListError(getApiErrorMessage(e) || e?.message || 'Không tải được danh sách lô hàng')
          setBatches([])
        }
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, delays[i]))
      }
    } finally {
      setListLoading(false)
    }
  }

  const statCards = [
    { label: 'Tổng Lô Hàng', value: total, icon: '📦', bg: 'linear-gradient(135deg,#3b82f6,#2563eb)' },
    { label: 'Đang Giao', value: delivering, icon: '🚚', bg: 'linear-gradient(135deg,#f97316,#ea580c)' },
    { label: 'Hoàn Thành', value: done, icon: '✅', bg: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})` },
  ]

>>>>>>> tri
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

<<<<<<< HEAD
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <FiSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm mã lô, nhà cung cấp..."
          style={{ width: '100%', padding: '11px 14px 11px 42px', border: '1.5px solid #e2e8f0', borderRadius: 10 }}
=======
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

      {listError && (
        <div style={{ marginBottom: 16, padding: '12px 16px', borderRadius: 10, background: '#fef2f2', color: '#b91c1c', fontSize: 14 }}>
          {listError}
        </div>
      )}

      {/* Search + status filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'stretch' }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 200 }}>
        <FiSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 16 }} />
        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo mã lô, nhà cung cấp, SĐT..."
            disabled={listLoading}
          style={{ width: '100%', padding: '11px 14px 11px 42px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#fff', color: '#374151' }}
          onFocus={(e) => (e.target.style.borderColor = PRIMARY)}
          onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
>>>>>>> tri
        />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          disabled={listLoading}
          style={{
            flex: '0 1 260px',
            minWidth: 200,
            padding: '11px 14px',
            border: '1.5px solid #e2e8f0',
            borderRadius: 10,
            fontSize: 14,
            background: '#fff',
            color: '#374151',
            cursor: listLoading ? 'default' : 'pointer',
          }}
        >
          {BATCH_STATUS_FILTERS.map((opt) => (
            <option key={opt.value || 'all'} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
<<<<<<< HEAD
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
=======
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
          <thead>
            <tr>
              {['Mã Lô', 'Nhà Cung Cấp', 'Ngày Giao Hàng', 'Trạng Thái', 'Thao Tác'].map((h) => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listLoading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Đang tải danh sách lô hàng...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Không tìm thấy lô hàng nào.</td></tr>
            ) : filtered.map((b, i) => {
              const st = batchStatusBadgeStyle(b.status)
              const statusLabel = labelBatchStatus(b.status)
              return (
                  <tr
                    key={b.id}
                  style={{ background: i % 2 === 0 ? '#fff' : '#fafafa', transition: 'background 0.15s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#fafafa' }}
                >
                    <td style={{ ...tdStyle, fontWeight: 700, color: '#1e293b' }}>{b.id}</td>
                    <td style={tdStyle}>{b.supplier}</td>
                    <td style={{ ...tdStyle, color: b.deliveryDate && b.deliveryDate !== '—' ? '#374151' : '#94a3b8' }}>{b.deliveryDate || '—'}</td>
                    <td style={tdStyle} onClick={(e) => e.stopPropagation()}>
                      <span style={{
                        display: 'inline-block', padding: '3px 12px', borderRadius: 20, fontSize: 12.5, fontWeight: 700,
                        background: st.bg, color: st.color, border: `1px solid ${st.border}`,
                      }}>
                        {statusLabel}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <button type="button" title="Xem chi tiết" onClick={() => b.batchId != null && setViewBatchId(b.batchId)} style={iconBtn(PRIMARY)}>
                          <FiEye style={{ fontSize: 13 }} />
                        </button>
                        {b.status === 'DELIVERING' && b.batchId != null && (
                          <button
                            type="button"
                            title="Hoàn thành nhận hàng (COMPLETED)"
                            onClick={(e) => {
                              e.stopPropagation()
                              setCompleteModalBatchId(b.batchId)
                            }}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 5,
                              padding: '6px 12px',
                              borderRadius: 8,
                              border: `1.5px solid ${PRIMARY}55`,
                              background: '#f0fdf4',
                              color: PRIMARY_DARK,
                              fontWeight: 700,
                              fontSize: 12,
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <FiCheck size={14} />
                            Hoàn thành lô
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
              )
            })}
          </tbody>
        </table>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9', color: '#64748b', fontSize: 13 }}>
          Hiển thị <strong>{filtered.length}</strong> / <strong>{batches.length}</strong> lô hàng
          <span style={{ marginLeft: 16, color: '#94a3b8', fontSize: 12 }}>• Bấm biểu tượng mắt để xem chi tiết lô</span>
        </div>
      </div>

      {showAddModal && <AddBatchModal onClose={() => setShowAddModal(false)} onConfirm={handleAdd} batchCount={batches.length} />}
      {viewBatchId != null && (
        <BatchDetailModal batchId={viewBatchId} onClose={() => setViewBatchId(null)} onBatchUpdated={loadBatches} />
      )}
      {completeModalBatchId != null && (
        <CompleteBatchModal
          batchId={completeModalBatchId}
          batchCode={batches.find((x) => x.batchId === completeModalBatchId)?.id}
          onClose={() => setCompleteModalBatchId(null)}
          onSuccess={loadBatches}
        />
      )}
>>>>>>> tri
    </div>
  )
}
