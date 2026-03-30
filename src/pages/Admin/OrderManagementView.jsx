import { useState, useEffect } from 'react'
import { FiSearch, FiX, FiChevronDown, FiEye } from 'react-icons/fi'
import { getOrders } from '@/api/orderApi'
import { updateOrderStatus } from '@/api/adminApi'
import { mapOrderDtoToFrontend } from '@/utils/mapper'

const PRIMARY = '#75b06f'
const PRIMARY_DARK = '#5a9450'

const STATUS_CFG = {
  pending:    { label: 'Chờ Xử Lý', bg: '#fffbeb', color: '#d97706', border: '#fde68a', icon: '⏱' },
  packaging:  { label: 'Đang Đóng Gói', bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe', icon: '📦' },
  shipping:   { label: 'Đang Giao', bg: '#f5f3ff', color: '#7c3aed', border: '#ddd6fe', icon: '🚚' },
  success:    { label: 'Hoàn Thành', bg: '#f0fdf4', color: PRIMARY_DARK, border: '#bbf7d0', icon: '✅' },
  failed:     { label: 'Đã Hủy', bg: '#fef2f2', color: '#dc2626', border: '#fecaca', icon: '🚫' },
}

function fmt(n) { return new Intl.NumberFormat('vi-VN').format(n) + 'đ' }

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] || { bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0', icon: '•', label: status }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 12px', borderRadius: 20, fontSize: 12.5, fontWeight: 700,
      background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
    }}>
      {cfg.icon} {cfg.label}
    </span>
  )
}

function OrderDetailModal({ order, onClose, onUpdateStatus }) {
  const customerFields = [
    { icon: '👤', label: 'Số điện thoại', value: order.order_id.split('_')[0] }, // fallback as backend uses userId
    { icon: '📍', label: 'Địa chỉ', value: `${order.shipping_address.street}, ${order.shipping_address.ward}` },
    { icon: '📅', label: 'Ngày đặt', value: new Date(order.order_date).toLocaleString('vi-VN') },
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, width: 600, padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800 }}>Chi Tiết #{order.order_id}</h2>
            <button onClick={onClose}><FiX /></button>
        </div>
        
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {['pending', 'packaging', 'success', 'failed'].map(s => (
            <button 
              key={s} 
              onClick={() => onUpdateStatus(order.order_id, s)}
              style={{ padding: '6px 12px', background: order.status === s ? '#f0fdf4' : '#fff', border: '1px solid #ddd', borderRadius: 8, fontSize: 12 }}
            >
              Chuyển sang {STATUS_CFG[s]?.label || s}
            </button>
          ))}
        </div>

        <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, marginBottom: 20 }}>
            {customerFields.map(f => (
                <div key={f.label} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{f.label}</div>
                    <div style={{ fontWeight: 600 }}>{f.value}</div>
                </div>
            ))}
        </div>

        <div style={{ border: '1px solid #eee', borderRadius: 10, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ background: '#f8fafc' }}><th style={{ padding: 10, textAlign: 'left' }}>Sản phẩm</th><th style={{ padding: 10 }}>SL</th><th style={{ padding: 10, textAlign: 'right' }}>Giá</th></tr></thead>
                <tbody>
                    {order.items.map((it, i) => (
                        <tr key={i}><td style={{ padding: 10 }}>{it.name}</td><td style={{ padding: 10, textAlign: 'center' }}>{it.quantity}</td><td style={{ padding: 10, textAlign: 'right' }}>{fmt(it.price)}</td></tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div style={{ textAlign: 'right', marginTop: 15, fontSize: 18, fontWeight: 800, color: PRIMARY }}>Tổng: {fmt(order.total_amount)}</div>
        <button onClick={onClose} style={{ width: '100%', marginTop: 20, padding: 12, background: '#f1f5f9', borderRadius: 10, fontWeight: 700 }}>Đóng</button>
      </div>
    </div>
  )
}

export default function OrderManagementView() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [detailOrder, setDetailOrder] = useState(null)

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const response = await getOrders();
      if (response) {
        const rawData = Array.isArray(response) ? response : (response.data || []);
        setOrders(rawData.map(mapOrderDtoToFrontend));
      }
    } catch (err) {
      console.error("Failed to load global orders", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [])

  const handleUpdateStatus = async (id, status) => {
    try {
        const upperStatus = status.toUpperCase();
        const response = await updateOrderStatus(id, upperStatus);
        if (response) {
            alert("Cập nhật trạng thái thành công!");
            loadOrders();
            setDetailOrder(null);
        } else {
            alert("Tính năng cập nhật trạng thái này đang được Backend bổ sung.");
        }
    } catch (err) {
        alert("Lỗi: " + err.message);
    }
  }

  const filtered = orders.filter(o => 
    o.order_id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: 0 }}>Quản Lý Đơn Hàng</h1>
        <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>Dữ liệu thực tế từ Order Service (Redis)</p>
      </div>

      <div style={{ position: 'relative', marginBottom: 20 }}>
        <FiSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo mã đơn..."
          style={{ width: '100%', padding: '11px 14px 11px 42px', border: '1.5px solid #e2e8f0', borderRadius: 10 }}
        />
      </div>

      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        {isLoading ? (
            <div style={{ padding: 40, textAlign: 'center' }}>Đang tải danh sách đơn hàng...</div>
        ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
            <thead>
                <tr>
                {['Mã đơn', 'Ngày đặt', 'Tổng tiền', 'Trạng thái', 'Thao tác'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '11px 16px', background: '#f8fafc', fontWeight: 700, fontSize: 12 }}>{h}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {filtered.map((o, i) => (
                <tr key={o.order_id} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700 }}>{o.order_id}</td>
                    <td style={{ padding: '14px 16px' }}>{new Date(o.order_date).toLocaleString('vi-VN')}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: PRIMARY }}>{fmt(o.total_amount)}</td>
                    <td style={{ padding: '14px 16px' }}><StatusBadge status={o.status} /></td>
                    <td style={{ padding: '14px 16px' }}>
                        <button onClick={() => setDetailOrder(o)} style={{ padding: '6px 12px', background: PRIMARY, color: '#fff', borderRadius: 8, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                            <FiEye /> Chi tiết
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
      </div>

      {detailOrder && (
        <OrderDetailModal
          order={detailOrder}
          onClose={() => setDetailOrder(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  )
}
