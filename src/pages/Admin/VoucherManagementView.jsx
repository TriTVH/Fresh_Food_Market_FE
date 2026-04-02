import { useState, useEffect, useCallback } from 'react'
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiX, FiLoader } from 'react-icons/fi'
import { toast } from 'react-toastify'
import {
  fetchVouchers,
  fetchVoucherById,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} from '@/api/voucherApi'
import { getApiErrorMessage } from '@/api/apiService'

const PRIMARY = '#75b06f'
const PRIMARY_DARK = '#5a9450'

const thStyle = {
  textAlign: 'left',
  padding: '10px 12px',
  fontWeight: 700,
  color: '#64748b',
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  background: '#f8fafc',
  borderBottom: '1px solid #e2e8f0',
}
const tdStyle = {
  padding: '12px 12px',
  color: '#374151',
  verticalAlign: 'middle',
  borderBottom: '1px solid #f1f5f9',
}
const iconBtn = (color) => ({
  width: 28,
  height: 28,
  borderRadius: 6,
  border: `1.5px solid ${color}20`,
  background: `${color}10`,
  color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
})

const TYPE_FIXED = 'FIXED'
const TYPE_NO_FIXED = 'NO_FIXED'

function unwrapVoucherList(res) {
  if (!res) return []
  if (Array.isArray(res)) return res
  const d = res.data ?? res.Data
  if (Array.isArray(d)) return d
  return []
}

function mapVoucherFromApi(v) {
  return {
    voucherId: v.voucherId ?? v.VoucherId,
    accountId: v.accountId ?? v.AccountId ?? 0,
    voucherCode: v.voucherCode ?? v.VoucherCode ?? '',
    voucherName: v.voucherName ?? v.VoucherName ?? '',
    description: v.description ?? v.Description ?? '',
    discountPercentage: Number(v.discountPercentage ?? v.DiscountPercentage ?? 0),
    discountMax: Number(v.discountMax ?? v.DiscountMax ?? 0),
    typeDiscountTime: String(v.typeDiscountTime ?? v.TypeDiscountTime ?? TYPE_NO_FIXED).toUpperCase(),
    maxUsage: Number(v.maxUsage ?? v.MaxUsage ?? 0),
    currentUsage: Number(v.currentUsage ?? v.CurrentUsage ?? 0),
    validFrom: Number(v.validFrom ?? v.ValidFrom ?? 0),
    fromDate: v.fromDate ?? v.FromDate ?? null,
    toDate: v.toDate ?? v.ToDate ?? null,
    status: v.status ?? v.Status ?? 'ACTIVE',
  }
}

function isoToDatetimeLocal(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${day}T${h}:${min}`
}

function datetimeLocalToIso(local) {
  if (!local) return null
  const d = new Date(local)
  if (Number.isNaN(d.getTime())) return null
  return d.toISOString()
}

function apiOk(res) {
  if (res == null || typeof res !== 'object') return true
  const s = res.success ?? res.Success
  if (s === undefined) return true
  return !!s
}

const emptyForm = () => ({
  voucherCode: '',
  voucherName: '',
  description: '',
  discountMax: 0,
  discountPercentage: 0,
  typeDiscountTime: TYPE_NO_FIXED,
  maxUsage: 0,
  validFrom: 0,
  fromLocal: '',
  toLocal: '',
  status: 'ACTIVE',
})

function VoucherFormModal({ mode, initialRow, onClose, onSaved }) {
  const isEdit = mode === 'edit'
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [loadingDetail, setLoadingDetail] = useState(isEdit)
  const [editMeta, setEditMeta] = useState({ voucherId: null, accountId: 0, currentUsage: 0 })

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  useEffect(() => {
    if (!isEdit || !initialRow?.voucherId) {
      setForm(emptyForm())
      setEditMeta({ voucherId: null, accountId: 0, currentUsage: 0 })
      setLoadingDetail(false)
      return
    }
    let cancelled = false
    ;(async () => {
      setLoadingDetail(true)
      try {
        const res = await fetchVoucherById(initialRow.voucherId)
        const raw = res?.data ?? res?.Data ?? res
        const row = mapVoucherFromApi(raw && typeof raw === 'object' ? raw : initialRow)
        if (cancelled) return
        setEditMeta({
          voucherId: row.voucherId,
          accountId: row.accountId ?? 0,
          currentUsage: row.currentUsage ?? 0,
        })
        setForm({
          voucherCode: row.voucherCode,
          voucherName: row.voucherName,
          description: row.description ?? '',
          discountMax: row.discountMax,
          discountPercentage: row.discountPercentage,
          typeDiscountTime:
            row.typeDiscountTime === TYPE_FIXED ? TYPE_FIXED : TYPE_NO_FIXED,
          maxUsage: row.maxUsage,
          validFrom: row.validFrom,
          fromLocal: isoToDatetimeLocal(row.fromDate),
          toLocal: isoToDatetimeLocal(row.toDate),
          status: row.status || 'ACTIVE',
        })
      } catch (e) {
        if (!cancelled) {
          const row = mapVoucherFromApi(initialRow)
          setEditMeta({
            voucherId: row.voucherId,
            accountId: row.accountId ?? 0,
            currentUsage: row.currentUsage ?? 0,
          })
          setForm({
            voucherCode: row.voucherCode,
            voucherName: row.voucherName,
            description: row.description ?? '',
            discountMax: row.discountMax,
            discountPercentage: row.discountPercentage,
            typeDiscountTime:
              row.typeDiscountTime === TYPE_FIXED ? TYPE_FIXED : TYPE_NO_FIXED,
            maxUsage: row.maxUsage,
            validFrom: row.validFrom,
            fromLocal: isoToDatetimeLocal(row.fromDate),
            toLocal: isoToDatetimeLocal(row.toDate),
            status: row.status || 'ACTIVE',
          })
          toast.info('Không tải được chi tiết mới nhất; đang dùng dữ liệu từ bảng.')
        }
      } finally {
        if (!cancelled) setLoadingDetail(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [isEdit, initialRow])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const typeDiscountTime = form.typeDiscountTime
    if (typeDiscountTime === TYPE_FIXED) {
      if (!form.fromLocal || !form.toLocal) {
        toast.error('Khi chọn cố định thời gian (FIXED), vui lòng nhập từ ngày và đến ngày.')
        return
      }
      const fromIso = datetimeLocalToIso(form.fromLocal)
      const toIso = datetimeLocalToIso(form.toLocal)
      if (!fromIso || !toIso) {
        toast.error('Ngày giờ không hợp lệ.')
        return
      }
      if (new Date(toIso) < new Date(fromIso)) {
        toast.error('Đến ngày phải sau hoặc bằng từ ngày.')
        return
      }
    }

    const pct = form.discountPercentage === '' ? 0 : Number(form.discountPercentage)
    if (Number.isNaN(pct) || pct < 0 || pct > 100) {
      toast.error('Phần trăm giảm phải từ 0 đến 100.')
      return
    }

    const base = {
      voucherCode: form.voucherCode.trim(),
      voucherName: form.voucherName.trim(),
      description: (form.description || '').trim(),
      discountMax: Number(form.discountMax) || 0,
      discountPercentage: pct,
      typeDiscountTime,
      maxUsage: Number(form.maxUsage) || 0,
      validFrom: Number(form.validFrom) || 0,
    }

    setSaving(true)
    try {
      if (isEdit) {
        const body = {
          ...base,
          voucherId: editMeta.voucherId,
          accountId: editMeta.accountId,
          currentUsage: editMeta.currentUsage,
          status: (form.status || 'ACTIVE').trim(),
        }
        if (typeDiscountTime === TYPE_FIXED) {
          body.fromDate = datetimeLocalToIso(form.fromLocal)
          body.toDate = datetimeLocalToIso(form.toLocal)
        }
        const res = await updateVoucher(body)
        if (!apiOk(res)) {
          throw new Error(res?.message || res?.Message || 'Cập nhật thất bại')
        }
        toast.success(res?.message || res?.Message || 'Đã cập nhật voucher.')
      } else {
        const payload = { ...base }
        if (typeDiscountTime === TYPE_FIXED) {
          payload.fromDate = datetimeLocalToIso(form.fromLocal)
          payload.toDate = datetimeLocalToIso(form.toLocal)
        }
        const res = await createVoucher(payload)
        if (!apiOk(res)) {
          throw new Error(res?.message || res?.Message || 'Tạo voucher thất bại')
        }
        toast.success(res?.message || res?.Message || 'Đã tạo voucher.')
      }
      onSaved()
      onClose()
    } catch (err) {
      toast.error(getApiErrorMessage(err) || err.message || 'Thao tác thất bại.')
    } finally {
      setSaving(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1.5px solid #e2e8f0',
    borderRadius: 8,
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
    color: '#374151',
    background: '#fff',
  }
  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }

  return (
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
      <style>{`@keyframes voucherSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          width: 560,
          maxWidth: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.22)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px 12px',
            borderBottom: '1px solid #f1f5f9',
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0f172a' }}>
            {isEdit ? 'Sửa voucher' : 'Thêm voucher'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 22 }}
          >
            <FiX />
          </button>
        </div>

        {loadingDetail ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#64748b' }}>
            <FiLoader style={{ animation: 'voucherSpin 0.9s linear infinite', fontSize: 28 }} />
            <p style={{ marginTop: 12 }}>Đang tải...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={labelStyle}>Mã voucher *</label>
              <input
                value={form.voucherCode}
                onChange={(e) => set('voucherCode', e.target.value)}
                placeholder="VD: SAVE10"
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Tên hiển thị *</label>
              <input
                value={form.voucherName}
                onChange={(e) => set('voucherName', e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Mô tả</label>
              <textarea
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 72 }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>% giảm (0–100)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={0.01}
                  value={form.discountPercentage}
                  onChange={(e) => set('discountPercentage', e.target.value)}
                  onBlur={() => {
                    const n = Number(form.discountPercentage)
                    if (!Number.isNaN(n)) {
                      if (n > 100) set('discountPercentage', 100)
                      if (n < 0) set('discountPercentage', 0)
                    }
                  }}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Giảm tối đa (VNĐ)</label>
                <input
                  type="number"
                  min={0}
                  value={form.discountMax}
                  onChange={(e) => set('discountMax', e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Lượt dùng tối đa</label>
                <input
                  type="number"
                  min={0}
                  value={form.maxUsage}
                  onChange={(e) => set('maxUsage', e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Đơn tối thiểu (theo API validFrom)</label>
                <input
                  type="number"
                  min={0}
                  value={form.validFrom}
                  onChange={(e) => set('validFrom', e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Loại thời gian giảm *</label>
              <select
                value={form.typeDiscountTime}
                onChange={(e) => set('typeDiscountTime', e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value={TYPE_NO_FIXED}>Không cố định (NO_FIXED)</option>
                <option value={TYPE_FIXED}>Cố định khoảng thời gian (FIXED)</option>
              </select>
              {form.typeDiscountTime === TYPE_FIXED && (
                <p style={{ margin: '8px 0 0', fontSize: 12, color: '#b45309' }}>
                  Bắt buộc nhập từ ngày và đến ngày.
                </p>
              )}
            </div>
            {form.typeDiscountTime === TYPE_FIXED && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Từ ngày giờ *</label>
                  <input
                    type="datetime-local"
                    value={form.fromLocal}
                    onChange={(e) => set('fromLocal', e.target.value)}
                    required={form.typeDiscountTime === TYPE_FIXED}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Đến ngày giờ *</label>
                  <input
                    type="datetime-local"
                    value={form.toLocal}
                    onChange={(e) => set('toLocal', e.target.value)}
                    required={form.typeDiscountTime === TYPE_FIXED}
                    style={inputStyle}
                  />
                </div>
              </div>
            )}
            {isEdit && (
              <div>
                <label style={labelStyle}>Trạng thái</label>
                <input
                  value={form.status}
                  onChange={(e) => set('status', e.target.value)}
                  placeholder="ACTIVE"
                  style={inputStyle}
                />
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: '1.5px solid #e2e8f0',
                  background: '#fff',
                  fontWeight: 600,
                  cursor: saving ? 'not-allowed' : 'pointer',
                }}
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={saving}
                style={{
                  padding: '10px 22px',
                  borderRadius: 8,
                  border: 'none',
                  background: saving ? '#94a3b8' : `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`,
                  color: '#fff',
                  fontWeight: 700,
                  cursor: saving ? 'wait' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                {saving && <FiLoader style={{ animation: 'voucherSpin 0.9s linear infinite' }} />}
                {isEdit ? 'Cập nhật' : 'Tạo mới'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default function VoucherManagementView() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetchVouchers()
      const list = unwrapVoucherList(res).map(mapVoucherFromApi)
      setRows(list)
    } catch (err) {
      console.error(err)
      toast.error(getApiErrorMessage(err) || 'Không tải được danh sách voucher.')
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered = rows.filter(
    (r) =>
      r.voucherCode.toLowerCase().includes(search.toLowerCase()) ||
      r.voucherName.toLowerCase().includes(search.toLowerCase())
  )

  const fmtShort = (iso) => {
    if (!iso) return '—'
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return String(iso)
    return d.toLocaleString('vi-VN')
  }

  const handleDelete = async () => {
    if (deleteId == null) return
    setDeleting(true)
    try {
      const res = await deleteVoucher(deleteId)
      if (!apiOk(res)) {
        throw new Error(res?.message || res?.Message || 'Xóa thất bại')
      }
      toast.success(res?.message || res?.Message || 'Đã xóa voucher.')
      setDeleteId(null)
      await load()
    } catch (err) {
      toast.error(getApiErrorMessage(err) || err.message || 'Xóa thất bại.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: 0 }}>Quản lý voucher</h1>
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>Tạo, sửa và xóa mã giảm giá (POST/PUT/DELETE API)</p>
        </div>
        <button
          type="button"
          onClick={() => setModal({ mode: 'create' })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 18px',
            borderRadius: 10,
            border: 'none',
            background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`,
            color: '#fff',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(117,176,111,0.4)',
          }}
        >
          <FiPlus /> Thêm voucher
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: 20 }}>
        <FiSearch
          style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af',
            fontSize: 16,
          }}
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo mã hoặc tên..."
          style={{
            width: '100%',
            padding: '11px 14px 11px 42px',
            border: '1.5px solid #e2e8f0',
            borderRadius: 10,
            fontSize: 14,
            outline: 'none',
            boxSizing: 'border-box',
            background: '#fff',
            color: '#374151',
          }}
        />
      </div>

      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
          <thead>
            <tr>
              {['Mã', 'Tên', 'Loại thời gian', '% / Tối đa', 'Lượt dùng', 'Hiệu lực', 'Trạng thái', ''].map((h) => (
                <th key={h || 'a'} style={thStyle}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: 48, color: '#64748b' }}>
                  Đang tải...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>
                  Không có voucher nào.
                </td>
              </tr>
            ) : (
              filtered.map((r, i) => (
                <tr
                  key={r.voucherId ?? i}
                  style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}
                >
                  <td style={{ ...tdStyle, fontWeight: 700, color: PRIMARY }}>{r.voucherCode}</td>
                  <td style={tdStyle}>{r.voucherName}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: '4px 8px',
                        borderRadius: 6,
                        background: r.typeDiscountTime === TYPE_FIXED ? '#fef3c7' : '#f1f5f9',
                        color: r.typeDiscountTime === TYPE_FIXED ? '#b45309' : '#64748b',
                      }}
                    >
                      {r.typeDiscountTime}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    {r.discountPercentage}% / {Number(r.discountMax).toLocaleString('vi-VN')}đ
                  </td>
                  <td style={tdStyle}>
                    {r.currentUsage} / {r.maxUsage || '∞'}
                  </td>
                  <td style={{ ...tdStyle, fontSize: 12, color: '#64748b', maxWidth: 200 }}>
                    {r.typeDiscountTime === TYPE_FIXED ? (
                      <>
                        {fmtShort(r.fromDate)}
                        <br />
                        → {fmtShort(r.toDate)}
                      </>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td style={tdStyle}>{r.status}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: 8 }}>
                      <button
                        type="button"
                        title="Sửa"
                        onClick={() => setModal({ mode: 'edit', row: r })}
                        style={iconBtn(PRIMARY)}
                      >
                        <FiEdit2 style={{ fontSize: 13 }} />
                      </button>
                      <button
                        type="button"
                        title="Xóa"
                        onClick={() => setDeleteId(r.voucherId)}
                        style={iconBtn('#ef4444')}
                      >
                        <FiTrash2 style={{ fontSize: 13 }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9', color: '#64748b', fontSize: 13 }}>
          Hiển thị <strong>{filtered.length}</strong> / <strong>{rows.length}</strong> voucher
        </div>
      </div>

      {modal && (
        <VoucherFormModal
          mode={modal.mode === 'edit' ? 'edit' : 'create'}
          initialRow={modal.row}
          onClose={() => setModal(null)}
          onSaved={load}
        />
      )}

      {deleteId != null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              padding: 28,
              width: 400,
              maxWidth: '90%',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}
          >
            <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700, color: '#0f172a' }}>Xóa voucher?</h3>
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Hành động không thể hoàn tác.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteId(null)}
                style={{
                  padding: '9px 20px',
                  borderRadius: 8,
                  border: '1.5px solid #e2e8f0',
                  background: '#fff',
                  fontWeight: 600,
                  cursor: deleting ? 'not-allowed' : 'pointer',
                }}
              >
                Hủy
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                style={{
                  padding: '9px 20px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'linear-gradient(135deg,#ef4444,#dc2626)',
                  color: '#fff',
                  fontWeight: 700,
                  cursor: deleting ? 'wait' : 'pointer',
                }}
              >
                {deleting ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
