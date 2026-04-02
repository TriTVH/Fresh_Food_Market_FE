import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { getOrders } from '@/api/orderApi'
import { fetchProducts, fetchSubCategories } from '@/api/productApi'
import { mapProductDtoToFrontend } from '@/utils/mapper'
import {
  FiGrid, FiPackage, FiBox, FiShoppingCart,
  FiHome, FiLogOut, FiEye, FiSearch,
  FiCheckSquare, FiTrendingUp, FiCalendar,
  FiEdit2, FiTrash2, FiPercent, FiPlus, FiX, FiLoader, FiGift,
} from 'react-icons/fi'
import { FaLeaf, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import BatchManagementView from './BatchManagementView'
import OrderManagementView from './OrderManagementView'
import VoucherManagementView from './VoucherManagementView'
import { toast } from 'react-toastify'
import { fetchAllProducts, uploadImageToCloudinary, createProduct, updateProduct, fetchProductDetail, getApiErrorMessage } from '@/api/apiService'

const PRIMARY = '#75b06f'
const PRIMARY_DARK = '#5a9450'

// ── Styles ──
const thStyle = {
  textAlign: 'left', padding: '10px 12px', fontWeight: 700,
  color: '#64748b', fontSize: 12, textTransform: 'uppercase',
  letterSpacing: '0.04em', background: '#f8fafc', borderBottom: '1px solid #e2e8f0',
}
const tdStyle = { padding: '12px 12px', color: '#374151', verticalAlign: 'middle', borderBottom: '1px solid #f1f5f9' }
const iconBtn = (color) => ({
  width: 28, height: 28, borderRadius: 6, border: `1.5px solid ${color}20`,
  background: `${color}10`, color, display: 'flex', alignItems: 'center',
  justifyContent: 'center', cursor: 'pointer',
})

// Helper to build STATS from real data
function buildStats(orders, products) {
  const totalRevenue = orders.reduce((sum, o) => {
    const raw = o.totalAmount || o.TotalAmount || 0
    return sum + (typeof raw === 'number' ? raw : 0)
  }, 0)
  const uniqueUsers = new Set(orders.map(o => o.userId || o.UserId).filter(Boolean)).size
  return [
    { label: 'Tổng Doanh Thu', value: totalRevenue.toLocaleString('vi-VN') + 'đ', change: '', bg: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, icon: '💰' },
    { label: 'Đơn Hàng', value: String(orders.length), change: '', bg: 'linear-gradient(135deg,#3b82f6,#2563eb)', icon: '📦' },
    { label: 'Khách Hàng', value: String(uniqueUsers || '—'), change: '', bg: 'linear-gradient(135deg,#a855f7,#9333ea)', icon: '👥' },
    { label: 'Sản Phẩm', value: String(products.length), change: '', bg: 'linear-gradient(135deg,#f97316,#ea580c)', icon: '🛒' },
  ]
}

// Helper: map BE OrderRecord → UI order shape
function mapOrder(o) {
  const items = (o.items || o.Items || []).map(it => ({
    name: it.productName || it.ProductName || it.productId || 'Sản phẩm',
    qty: it.quantity || it.Quantity || 1,
    price: it.price || it.Price || 0,
  }))
  const totalAmount = items.reduce((s, it) => s + it.qty * it.price, 0)
  const createdAt = o.createdAtUtc || o.CreatedAtUtc || ''
  const dateObj = createdAt ? new Date(createdAt) : null
  const date = dateObj ? `${dateObj.getDate().toString().padStart(2,'0')}/${(dateObj.getMonth()+1).toString().padStart(2,'0')}/${dateObj.getFullYear()}` : '—'
  const time = dateObj ? `${dateObj.getHours().toString().padStart(2,'0')}:${dateObj.getMinutes().toString().padStart(2,'0')}` : '—'
  const status = o.orderStatus || o.OrderStatus || o.status || ''
  return {
    id: o.orderId || o.OrderId || o.id || '?',
    customer: o.userId || o.UserId || 'Khách hàng',
    total: totalAmount.toLocaleString('vi-VN') + 'đ',
    totalAmount,
    date, time, status,
    items,
    shipping: 0, discount: 0, payment: 'COD',
  }
}

const RECURRING_ORDERS = [
  {
    id: 'DH-REC-001', customer: 'Nguyễn Văn An', total: '680.000đ',
    date: '22/01/2026', status: 'Chờ Giao',
    phone: '0901234567', email: 'nguyenvanan@email.com',
    address: '123 Đường Lý Thường Kiệt, Phường 14, Quận 10, TP. Hồ Chí Minh',
    shipping: 25000, discount: 54000, payment: 'Chuyển khoản',
    items: [
      { name: 'Cà Chua Bi', qty: 2, price: 89000 },
      { name: 'Thịt Bò Úc', qty: 1, price: 240000 },
      { name: 'Cá Hồi Na Uy', qty: 1, price: 291000 },
    ],
  },
  {
    id: 'DH-REC-002', customer: 'Trần Thị Bình', total: '485.000đ',
    date: '23/01/2026', status: 'Chờ Giao',
    phone: '0912345678', email: 'tranthivinh@email.com',
    address: '56 Nguyễn Trãi, Phường 2, Quận 5, TP. Hồ Chí Minh',
    shipping: 20000, discount: 0, payment: 'Tiền mặt',
    items: [
      { name: 'Táo Fuji Nhật', qty: 3, price: 95000 },
      { name: 'Nho Mỹ Đỏ', qty: 1, price: 180000 },
    ],
  },
  {
    id: 'DH-REC-003', customer: 'Lê Văn Cường', total: '920.000đ',
    date: '24/01/2026', status: 'Chờ Giao',
    phone: '0923456789', email: 'levancuờng@email.com',
    address: '78 Điện Biên Phủ, Phường 15, Quận Bình Thạnh',
    shipping: 30000, discount: 0, payment: 'Ví MoMo',
    items: [
      { name: 'Tôm Hùm Canada', qty: 1, price: 600000 },
      { name: 'Rêu Cải Xanh', qty: 5, price: 25000 },
      { name: 'Nho Mỹ', qty: 1, price: 195000 },
    ],
  },
  {
    id: 'DH-REC-004', customer: 'Phạm Thị Duyên', total: '340.000đ',
    date: '25/01/2026', status: 'Chờ Giao',
    phone: '0934567890', email: 'phamthiduyen@email.com',
    address: '10 Trường Sa, Phường 4, Quận 3',
    shipping: 15000, discount: 0, payment: 'Thẻ ngân hàng',
    items: [
      { name: 'Bơ Mexico', qty: 2, price: 120000 },
      { name: 'Rêu Cải', qty: 3, price: 25000 },
    ],
  },
  {
    id: 'DH-REC-005', customer: 'Hoàng Văn Em', total: '750.000đ',
    date: '26/01/2026', status: 'Chờ Giao',
    phone: '0945678901', email: 'hoangvanem@email.com',
    address: '45 Tân Hương, Phường Tân Quý, Quận Tân Phú',
    shipping: 20000, discount: 0, payment: 'Chuyển khoản',
    items: [
      { name: 'Cá Hồi Nauy Phi Lê', qty: 1, price: 450000 },
      { name: 'Tôm Sú Sống', qty: 1, price: 280000 },
    ],
  },
]
const PENDING_ORDERS = [
  {
    id: 'ORD-2026-001', customer: 'Nguyễn Văn A', total: '456.000đ', date: '14/01/2026', time: '09:30',
    status: 'Chờ xác nhận',
    phone: '0901234567', email: 'nguyenvana@email.com',
    address: '123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    shipping: 30000, discount: 43000, payment: 'COD',
    items: [
      { name: 'Cà Chua Bi', qty: 2, price: 89000 },
      { name: 'Cá Hồi Na Uy', qty: 1, price: 291000 },
    ],
  },
  {
    id: 'ORD-2026-002', customer: 'Trần Thị B', total: '328.000đ', date: '14/01/2026', time: '10:15',
    status: 'Chờ xác nhận',
    phone: '0912345678', email: 'tranthib@email.com',
    address: '56 Phan Bội Châu, Quận Hải Châu, Đà Nẵng',
    shipping: 20000, discount: 0, payment: 'Chuyển khoản',
    items: [
      { name: 'Nho Mỹ Đỏ', qty: 1, price: 180000 },
      { name: 'Táo Fuji Nhật', qty: 1, price: 95000 },
      { name: 'Rêu Cải Xanh', qty: 2, price: 25000 },
    ],
  },
  {
    id: 'ORD-2026-003', customer: 'Lê Văn C', total: '612.000đ', date: '14/01/2026', time: '11:00',
    status: 'Chờ xác nhận',
    phone: '0923456789', email: 'levanc@email.com',
    address: '78 Lê Thánh Tông, Quận Hoàn Kiếm, Hà Nội',
    shipping: 35000, discount: 0, payment: 'Ví MoMo',
    items: [
      { name: 'Tôm Sú Sống', qty: 1, price: 280000 },
      { name: 'Thịt Bò Úc', qty: 1, price: 297000 },
    ],
  },
  {
    id: 'ORD-2026-004', customer: 'Phạm Thị D', total: '289.000đ', date: '14/01/2026', time: '11:45',
    status: 'Chờ xác nhận',
    phone: '0934567890', email: 'phamthid@email.com',
    address: '10 Trần Phú, Quận Hải Châu, Đà Nẵng',
    shipping: 20000, discount: 0, payment: 'Thẻ ngân hàng',
    items: [
      { name: 'Bơ Mexico', qty: 2, price: 120000 },
      { name: 'Rêu Cải Xanh', qty: 2, price: 25000 },
    ],
  },
  {
    id: 'ORD-2026-005', customer: 'Hoàng Văn E', total: '534.000đ', date: '14/01/2026', time: '12:30',
    status: 'Chờ xác nhận',
    phone: '0945678901', email: 'hoangvane@email.com',
    address: '45 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
    shipping: 25000, discount: 0, payment: 'COD',
    items: [
      { name: 'Cá Hồi Nauy Phi Lê', qty: 1, price: 450000 },
      { name: 'Nho Mỹ Đỏ', qty: 0.47, price: 180000 },
    ],
  },
]
const PACKING_ORDERS = [
  {
    id: 'ORD-2026-010', customer: 'Phan Thị J', total: '345.000đ', date: '14/01/2026', time: '14:00',
    status: 'Đang đóng gói',
    phone: '0956789012', email: 'panthij@email.com',
    address: '22 Trường Sa, Quận Bình Thạnh, TP. Hồ Chí Minh',
    shipping: 20000, discount: 0, payment: 'Chuyển khoản',
    items: [
      { name: 'Táo Fuji', qty: 2, price: 95000 },
      { name: 'Cà Chua Bi', qty: 2, price: 77500 },
    ],
  },
  {
    id: 'ORD-2026-011', customer: 'Võ Văn K', total: '891.000đ', date: '14/01/2026', time: '13:15',
    status: 'Đang đóng gói',
    phone: '0967890123', email: 'vovanq@email.com',
    address: '88 Tân Hương, Quận Tân Phú',
    shipping: 30000, discount: 0, payment: 'COD',
    items: [
      { name: 'Tôm Hùm Canada', qty: 1, price: 800000 },
      { name: 'Rêu Cải', qty: 3, price: 30000 },
    ],
  },
  {
    id: 'ORD-2026-012', customer: 'Đinh Thị L', total: '423.000đ', date: '14/01/2026', time: '12:45',
    status: 'Đang đóng gói',
    phone: '0978901234', email: 'dinhtlil@email.com',
    address: '15 Lý Tự Trọng, Quận 1, TP. Hồ Chí Minh',
    shipping: 25000, discount: 0, payment: 'Ví MoMo',
    items: [
      { name: 'Nho Mỹ', qty: 1, price: 180000 },
      { name: 'Thịt Bò Úc Thăn', qty: 0.62, price: 380000 },
    ],
  },
]
const DELIVERING_ORDERS = [
  {
    id: 'ORD-2026-006', customer: 'Võ Thị F', total: '892.000đ', date: '13/01/2026', time: '08:30',
    status: 'Đang giao',
    phone: '0989012345', email: 'vothif@email.com',
    address: '77 Hai Bà Trưng, Quận 1, TP. Hồ Chí Minh',
    shipping: 25000, discount: 0, payment: 'Chuyển khoản',
    items: [
      { name: 'Cá Hồi Nauy Phi Lê', qty: 1, price: 450000 },
      { name: 'Tôm Sú Sống', qty: 1, price: 280000 },
      { name: 'Rêu Cải Xanh', qty: 2, price: 83500 },
    ],
  },
  {
    id: 'ORD-2026-007', customer: 'Đặng Văn G', total: '445.000đ', date: '12/01/2026', time: '10:00',
    status: 'Đang giao',
    phone: '0990123456', email: 'dangvang@email.com',
    address: '33 Điện Biên Phủ, Quận 3, TP. Hồ Chí Minh',
    shipping: 20000, discount: 0, payment: 'COD',
    items: [
      { name: 'Bơ Mexico', qty: 3, price: 120000 },
      { name: 'Táo Fuji', qty: 1, price: 95000 },
    ],
  },
  {
    id: 'ORD-2026-008', customer: 'Bùi Thị H', total: '678.000đ', date: '12/01/2026', time: '14:20',
    status: 'Đang giao',
    phone: '0901234560', email: 'buithih@email.com',
    address: '19 Lê Duẩn, Quận 1, TP. Hồ Chí Minh',
    shipping: 30000, discount: 0, payment: 'Thẻ ngân hàng',
    items: [
      { name: 'Thịt Bò Úc Thăn Nội', qty: 1, price: 380000 },
      { name: 'Nho Mỹ Đỏ', qty: 1, price: 180000 },
      { name: 'Rau Cải Xanh', qty: 4, price: 25000 },
    ],
  },
  {
    id: 'ORD-2026-009', customer: 'Ngô Văn I', total: '234.000đ', date: '11/01/2026', time: '09:45',
    status: 'Đang giao',
    phone: '0912345670', email: 'ngovani@email.com',
    address: '5 Phan Đình Phùng, Quận Phú Nhuận',
    shipping: 20000, discount: 0, payment: 'COD',
    items: [
      { name: 'Cà Chua Bi Hồng', qty: 3, price: 42000 },
      { name: 'Táo Fuji', qty: 1, price: 95000 },
    ],
  },
]
const TOP_PRODUCTS = [
  { rank: 1, name: 'Cà Chua Bi', rating: 4.8, reviews: 723, sold: '64.476.000đ' },
  { rank: 2, name: 'Cá Hồi Na Uy', rating: 4.9, reviews: 419, sold: '142.335.000đ' },
  { rank: 3, name: 'Bơ Mexico', rating: 4.7, reviews: 678, sold: '60.342.000đ' },
  { rank: 4, name: 'Táo Fuji', rating: 4.8, reviews: 556, sold: '38.920.000đ' },
  { rank: 5, name: 'Thịt Bò Úc', rating: 4.9, reviews: 443, sold: '106.800.000đ' },
  { rank: 6, name: 'Tôm Sú', rating: 4.7, reviews: 389, sold: '93.360.000đ' },
  { rank: 7, name: 'Nho Mỹ', rating: 4.8, reviews: 512, sold: '61.440.000đ' },
  { rank: 8, name: 'Sầu Riêng', rating: 4.5, reviews: 234, sold: '46.800.000đ' },
  { rank: 9, name: 'Xoài Cát', rating: 4.8, reviews: 378, sold: '26.460.000đ' },
  { rank: 10, name: 'Ớt Chuông', rating: 4.7, reviews: 445, sold: '22.250.000đ' },
]
<<<<<<< HEAD
// INIT_PRODUCTS is now just a fallback empty array; real data comes from API
const INIT_PRODUCTS = []
=======
// Map 1 sản phẩm API -> row dùng cho bảng quản lý sản phẩm
const mapApiProductToAdminRow = (p) => {
  if (!p) return null
  const productId = p.productId ?? p.ProductId
  if (productId == null) return null
  return {
    // Tạm format mã SP từ productId: P001, P002,...
    id: 'P' + String(productId).padStart(3, '0'),
    productId,
    name: p.productName ?? p.ProductName ?? '',
    categoryCode: p.subCategoryName ?? p.SubCategoryName ?? '',
    origin: p.manufacturingLocation ?? p.ManufacturingLocation ?? '',
    price: p.priceSell ?? p.PriceSell ?? 0,
    qty: p.quantity ?? p.Quantity ?? 0,
    weight: p.weight ?? p.Weight ?? 0,
    unit: (p.unit ?? p.Unit) || 'kg',
    _raw: p,
  }
}
>>>>>>> tri
const NAV_ITEMS = [
  { label: 'Dashboard', icon: FiGrid, desc: 'Tổng quan hệ thống' },
  { label: 'Quản Lý Sản Phẩm', icon: FiPackage, desc: 'Danh mục sản phẩm' },
  { label: 'Quản Lý Lô Hàng', icon: FiBox, desc: 'Nhập kho & hạn sử dụng' },
  { label: 'Quản Lý Đơn Hàng', icon: FiShoppingCart, desc: 'Đơn hàng & vận chuyển' },
  { label: 'Quản Lý Voucher', icon: FiGift, desc: 'Mã giảm giá' },
]

// ── Helpers ──
function fmtPrice(n) { return n.toLocaleString('vi-VN') + 'đ' }

function StarRating({ rating }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1 }}>
      {[1, 2, 3, 4, 5].map((i) => {
        if (rating >= i) return <FaStar key={i} style={{ color: '#f59e0b', fontSize: 11 }} />
        if (rating >= i - 0.5) return <FaStarHalfAlt key={i} style={{ color: '#f59e0b', fontSize: 11 }} />
        return <FaRegStar key={i} style={{ color: '#f59e0b', fontSize: 11 }} />
      })}
    </span>
  )
}

// ── Dashboard Order Detail Modal ──
function DashboardOrderModal({ order, onClose }) {
  const subtotal = order.items ? order.items.reduce((s, i) => s + i.qty * i.price, 0) : 0
  const shipping = order.shipping || 0
  const discount = order.discount || 0
  const total = subtotal + shipping - discount
  const fmt = (n) => Number(n).toLocaleString('vi-VN') + 'đ'
  const isRecurring = order.id.startsWith('DH-REC')
  const isPending = order.status === 'Chờ xác nhận'
  const isDelivering = order.status === 'Đang giao'
  const title = isRecurring ? 'Chi Tiết Đơn Hàng Giao Định Kỳ' : 'Chi Tiết Đơn Hàng'

  // Status badge color
  const statusCfg = isRecurring
    ? { bg: '#fffbeb', color: '#d97706', border: '#fde68a', icon: '⏱' }
    : isPending
    ? { bg: '#fffbeb', color: '#d97706', border: '#fde68a', icon: '⏱' }
    : order.status === 'Đang đóng gói'
    ? { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe', icon: '📦' }
    : isDelivering
    ? { bg: '#f5f3ff', color: '#7c3aed', border: '#ddd6fe', icon: '🚚' }
    : { bg: '#f0fdf4', color: PRIMARY_DARK, border: '#bbf7d0', icon: '✅' }

  const customerFields = [
    { icon: '\ud83d\udc64', label: 'Họ tên', value: order.customer },
    { icon: '\ud83d\udcde', label: 'Số điện thoại', value: order.phone || '—' },
    { icon: '\u2709\ufe0f', label: 'Email', value: order.email || '—' },
    { icon: '\ud83d\udccd', label: 'Địa chỉ giao hàng', value: order.address || '—' },
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, width: 620, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,0.18)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '24px 28px 16px' }}>
          <div>
            <h2 style={{ fontSize: 19, fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h2>
            <p style={{ color: PRIMARY, fontSize: 13, fontWeight: 600, margin: '3px 0 0' }}>Mã đơn: {order.id}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 22, marginTop: 2 }}><FiX /></button>
        </div>

        <div style={{ padding: '0 28px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Status + timestamp row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700, background: statusCfg.bg, color: statusCfg.color, border: `1.5px solid ${statusCfg.border}` }}>
              {statusCfg.icon} {order.status || 'Chờ Giao'}
            </span>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11.5, color: '#64748b' }}>{isRecurring ? 'Ngày giao hàng' : 'Đặt hàng lúc'}</div>
              <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 14 }}>
                {isRecurring ? `📅 ${order.date}` : `${order.time} - ${order.date}`}
              </div>
            </div>
          </div>

          {/* Customer info */}
          <div>
            <p style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 10px' }}>Thông Tin Khách Hàng</p>
            <div style={{ background: '#f8fafc', borderRadius: 12, overflow: 'hidden' }}>
              {customerFields.map((f, i) => (
                <div key={f.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '13px 18px', borderBottom: i < customerFields.length - 1 ? '1px solid #e9eef3' : 'none' }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, color: PRIMARY, fontWeight: 600, marginBottom: 2 }}>{f.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{f.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          {order.items && order.items.length > 0 && (
            <div>
              <p style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 10px' }}>Sản Phẩm Đã Đặt</p>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      {['Sản phẩm', 'Số lượng', 'Đơn giá', 'Thành tiền'].map((h, hi) => (
                        <th key={h} style={{ textAlign: hi === 0 ? 'left' : hi === 3 ? 'right' : 'center', padding: '10px 14px', fontWeight: 700, color: '#64748b', fontSize: 12.5, borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((it, i) => (
                      <tr key={i} style={{ borderBottom: i < order.items.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                        <td style={{ padding: '12px 14px', color: PRIMARY, fontWeight: 500 }}>{it.name}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'center', color: '#374151' }}>{it.qty}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'center', color: '#374151' }}>{fmt(it.price)}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', color: '#374151', fontWeight: 600 }}>{fmt(it.qty * it.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pricing summary */}
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#374151' }}>
                  <span>Tạm tính</span><span>{fmt(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#2563eb' }}>
                  <span>Phí vận chuyển</span><span>{fmt(shipping)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#dc2626' }}>
                    <span>Giảm giá</span><span>-{fmt(discount)}</span>
                  </div>
                )}
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 10, marginTop: 2, display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, color: '#0f172a' }}>
                  <span>Tổng cộng</span>
                  <span style={{ color: PRIMARY, fontSize: 18 }}>{fmt(total)}</span>
                </div>
              </div>

              {/* Payment method */}
              {order.payment && (
                <div style={{ marginTop: 16, background: '#f0f4ff', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 22 }}>💵</span>
                  <div>
                    <div style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>Phương thức thanh toán</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{order.payment}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#f8fafc', color: '#374151', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Đóng</button>
            {isPending && (
              <button style={{ flex: 1.5, padding: '12px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#ef4444,#dc2626)', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                ⊗ Hủy Đơn Hàng
              </button>
            )}
            {isPending ? (
              <button style={{ flex: 2, padding: '12px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 2px 8px rgba(117,176,111,0.35)' }}>
                ✓ Xác Nhận Đơn Hàng
              </button>
            ) : (
              <button style={{ flex: 2, padding: '12px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 2px 8px rgba(117,176,111,0.35)' }}>
                📦 Bàn Giao Vận Chuyển
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderTable({ orders, hasTime = false }) {
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const filtered = orders.filter(
    (o) => o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ position: 'relative' }}>
          <FiSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 15 }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm theo mã đơn, khách hàng..."
            style={{ width: '100%', padding: '9px 12px 9px 36px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#374151' }} />
        </div>
        <div style={{ maxHeight: 200, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                <th style={thStyle}>Mã Đơn</th>
                <th style={thStyle}>Khách Hàng</th>
                <th style={thStyle}>Tổng Tiền</th>
                {hasTime
                  ? <><th style={thStyle}>Ngày</th><th style={thStyle}>Giờ</th></>
                  : <th style={thStyle}>Ngày Giao</th>}
                {!hasTime && <th style={thStyle}>Trạng Thái</th>}
                <th style={{ ...thStyle, textAlign: 'center' }}>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id}
                  style={{ borderBottom: '1px solid #f1f5f9' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ ...tdStyle, color: PRIMARY, fontWeight: 600 }}>{o.id}</td>
                  <td style={tdStyle}>{o.customer}</td>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{o.total}</td>
                  {hasTime
                    ? <><td style={tdStyle}>{o.date}</td><td style={{ ...tdStyle, color: PRIMARY }}>{o.time}</td></>
                    : <td style={tdStyle}>{o.date}</td>}
                  {!hasTime && (
                    <td style={tdStyle}>
                      {o.status && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          background: '#fffbeb', color: '#d97706',
                          border: '1.5px solid #fde68a', borderRadius: 20,
                          padding: '3px 12px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap',
                        }}>
                          ⏱ {o.status}
                        </span>
                      )}
                    </td>
                  )}
                  <td style={{ ...tdStyle }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <FiEye
                        onClick={() => setSelectedOrder(o)}
                        style={{ color: '#94a3b8', cursor: 'pointer', fontSize: 16 }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = PRIMARY)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedOrder && <DashboardOrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </>
  )
}

function OrderSection({ title, subtitle, icon, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: 0 }}>{title}</h2>
          <p style={{ fontSize: 12.5, color: '#64748b', margin: 0 }}>{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

// Parse description "Key1: Value1 | Key2: Value2" thành mảng { key, value }
function parseDescriptionToDescs(description) {
  if (!description || typeof description !== 'string') return [{ key: 'Hướng dẫn sử dụng', value: '' }]
  const trimmed = description.trim()
  if (!trimmed) return [{ key: 'Hướng dẫn sử dụng', value: '' }]
  const parts = trimmed.split(/\s*\|\s*/)
  return parts.map((part) => {
    const colonIdx = part.indexOf(':')
    if (colonIdx >= 0) {
      return { key: part.slice(0, colonIdx).trim(), value: part.slice(colonIdx + 1).trim() }
    }
    return { key: 'Mô tả', value: part.trim() }
  }).filter((d) => d.key || d.value)
}

// ── Product Management ──
function ProductModal({ product, onSave, onClose }) {
  const isNew = !product?.id
  const raw = product?._raw
  const initialForm = product
    ? {
        id: product.id,
        productId: product.productId,
        name: raw?.productName ?? raw?.ProductName ?? product.name,
        subCategoryId: raw?.subCategoryId ?? raw?.SubCategoryId ?? 1,
        origin: raw?.manufacturingLocation ?? raw?.ManufacturingLocation ?? product.origin,
        price: raw?.priceSell ?? raw?.PriceSell ?? product.price,
        qty: raw?.quantity ?? raw?.Quantity ?? product.qty,
        weight: raw?.weight ?? raw?.Weight ?? product.weight,
        unit: raw?.unit ?? raw?.Unit ?? product.unit ?? 'gram',
        isOrganic: raw?.isOrganic ?? raw?.IsOrganic ?? false,
        certification: raw?.certification ?? raw?.Certification ?? '',
      }
    : { id: '', name: '', subCategoryId: 1, origin: '', price: '', qty: '', weight: '', unit: 'gram', isOrganic: false, certification: '' }
  const initialDescs = product
    ? (product.descs ?? parseDescriptionToDescs(raw?.description ?? raw?.Description))
    : [{ key: 'Hướng dẫn sử dụng', value: '' }]
  const imagesJson = raw?.imagesJson ?? raw?.ImagesJson
  const initialImages =
    product?.images ?? (Array.isArray(imagesJson) ? imagesJson.map((img) => img?.url ?? img?.Url).filter(Boolean) : [])
  const initialPrimaryIdx =
    Array.isArray(imagesJson) ? imagesJson.findIndex((img) => img?.primary ?? img?.Primary) : 0

  const [form, setForm] = useState(initialForm)
  const [descs, setDescs] = useState(initialDescs.length ? initialDescs : [{ key: 'Hướng dẫn sử dụng', value: '' }])
  const [images, setImages] = useState(initialImages)
  const [imageFiles, setImageFiles] = useState([])
  const [primaryIdx, setPrimaryIdx] = useState(initialPrimaryIdx >= 0 ? initialPrimaryIdx : 0)
  const fileInputRef = useRef()
  const [zoomImageUrl, setZoomImageUrl] = useState(null)
  const [saving, setSaving] = useState(false)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const handleSave = async () => {
    if (!form.name || !form.subCategoryId || !form.price || !form.unit) return
    setSaving(true)
    try {
      await onSave({ ...form, descs, images, imageFiles, primaryIdx })
      onClose()
    } catch (_) {
      // Giữ modal mở; parent đã alert lỗi
    } finally {
      setSaving(false)
    }
  }

  const addDesc = () => setDescs((d) => [...d, { key: '', value: '' }])
  const removeDesc = (i) => setDescs((d) => d.filter((_, idx) => idx !== i))
  const setDesc = (i, field, val) => setDescs((d) => d.map((item, idx) => idx === i ? { ...item, [field]: val } : item))

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (images.length >= 6) return
    const remaining = 6 - images.length
    const selected = files.slice(0, remaining)
    selected.forEach((file) => {
      const previewUrl = URL.createObjectURL(file)
      setImages((prev) => [...prev, previewUrl])
      setImageFiles((prev) => [...prev, file])
    })
  }

  const removeImage = (i) => {
    const src = images[i]
    const wasBlob = typeof src === 'string' && src.startsWith('blob:')
    if (wasBlob) {
      try {
        URL.revokeObjectURL(src)
      } catch {
        // ignore
      }
      const blobIndexBefore = images.slice(0, i).filter((u) => typeof u === 'string' && u.startsWith('blob:')).length
      setImageFiles((prev) => prev.filter((_, idx) => idx !== blobIndexBefore))
    }
    setImages((prev) => prev.filter((_, idx) => idx !== i))
    if (primaryIdx === i) setPrimaryIdx(0)
    else if (primaryIdx > i) setPrimaryIdx((p) => p - 1)
  }

  const inputStyle = { width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#374151', background: '#fff' }
  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }
  const focusGreen = (e) => (e.target.style.borderColor = PRIMARY)
  const blurGray = (e) => (e.target.style.borderColor = '#e2e8f0')

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`@keyframes adminProductSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <div style={{ background: '#fff', borderRadius: 16, width: 760, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.22)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 28px 16px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: 0 }}>
            {isNew ? '+ Thêm Sản Phẩm Mới' : 'Sửa Sản Phẩm'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 20, lineHeight: 1 }}><FiX /></button>
        </div>

        <div
          style={{
            padding: '0 28px 24px',
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1.8fr)',
            columnGap: 24,
            rowGap: 14,
            alignItems: 'flex-start',
          }}
        >
          {/* Mã Sản Phẩm */}
          {!isNew && (
            <div style={{ gridColumn: '2 / 3' }}>
              <label style={labelStyle}>Mã Sản Phẩm <span style={{ color: '#ef4444' }}>*</span></label>
              <input value={form.id} readOnly style={{ ...inputStyle, background: '#f8fafc', color: '#94a3b8' }} />
            </div>
          )}

          {/* Nhóm sản phẩm (Subcategory) */}
          <div style={{ gridColumn: '2 / 3' }}>
            <label style={labelStyle}>Nhóm Sản Phẩm (Subcategory) <span style={{ color: '#ef4444' }}>*</span></label>
            <select
              value={form.subCategoryId}
              onChange={(e) => set('subCategoryId', Number(e.target.value))}
              style={{ ...inputStyle, cursor: 'pointer' }}
              onFocus={focusGreen}
              onBlur={blurGray}
            >
              <option value={1}>1 - Rau ăn lá</option>
              <option value={2}>2 - Củ, Quả</option>
              <option value={3}>3 - Nấm, Đậu Hũ</option>
              <option value={4}>4 - Trái Việt Nam</option>
              <option value={5}>5 - Trái Nhập Khẩu</option>
              <option value={6}>6 - Hải Sản</option>
              <option value={7}>7 - Thịt Heo</option>
              <option value={8}>8 - Thịt Bò</option>
              <option value={9}>9 - Thịt Gà, Vịt & Chim</option>
              <option value={10}>10 - Trái Cây Sấy</option>
              <option value={11}>11 - Khô Chế Biến Sẵn</option>
            </select>
          </div>

          {/* Tên Sản Phẩm — không cho sửa khi đang edit */}
          <div style={{ gridColumn: '2 / 3' }}>
            <label style={labelStyle}>Tên Sản Phẩm <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              value={form.name}
              onChange={(e) => !isNew ? undefined : set('name', e.target.value)}
              readOnly={!isNew}
              placeholder="VD: Cá Hồi Nauy Phi Lê"
              style={isNew ? inputStyle : { ...inputStyle, background: '#f8fafc', color: '#64748b', cursor: 'not-allowed' }}
              onFocus={isNew ? focusGreen : undefined}
              onBlur={isNew ? blurGray : undefined}
            />
          </div>

          {/* Nơi Sản Xuất */}
          <div style={{ gridColumn: '2 / 3' }}>
            <label style={labelStyle}>Nơi Sản Xuất <span style={{ color: '#ef4444' }}>*</span></label>
            <input value={form.origin} onChange={(e) => set('origin', e.target.value)}
              placeholder="VD: Na Uy" style={inputStyle} onFocus={focusGreen} onBlur={blurGray} />
          </div>

          {/* Giá Bán */}
          <div style={{ gridColumn: '2 / 3' }}>
            <label style={labelStyle}>Giá Bán (VNĐ) <span style={{ color: '#ef4444' }}>*</span></label>
            <input type="number" value={form.price} onChange={(e) => set('price', e.target.value)}
              placeholder="450000" style={inputStyle} onFocus={focusGreen} onBlur={blurGray} />
          </div>

          {/* Số Lượng / Khối Lượng / Đơn Vị — 3 columns */}
          <div style={{ gridColumn: '2 / 3', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Số Lượng <span style={{ color: '#ef4444' }}>*</span></label>
              <input type="number" value={form.qty} onChange={(e) => set('qty', e.target.value)}
                placeholder="50" style={inputStyle} onFocus={focusGreen} onBlur={blurGray} />
            </div>
            <div>
              <label style={labelStyle}>Khối Lượng <span style={{ color: '#ef4444' }}>*</span></label>
              <input
                type="number"
                value={form.weight}
                onChange={(e) => (isNew ? set('weight', e.target.value) : undefined)}
                readOnly={!isNew}
                placeholder="0.5"
                style={isNew ? inputStyle : { ...inputStyle, background: '#f8fafc', color: '#64748b', cursor: 'not-allowed' }}
                onFocus={isNew ? focusGreen : undefined}
                onBlur={isNew ? blurGray : undefined}
              />
            </div>
            <div>
              <label style={labelStyle}>Đơn Vị <span style={{ color: '#ef4444' }}>*</span></label>
              <select
                value={form.unit}
                onChange={(e) => (isNew ? set('unit', e.target.value) : undefined)}
                disabled={!isNew}
                style={{
                  ...inputStyle,
                  cursor: isNew ? 'pointer' : 'not-allowed',
                  background: !isNew ? '#f8fafc' : inputStyle.background,
                  color: !isNew ? '#64748b' : inputStyle.color,
                }}
                onFocus={isNew ? focusGreen : undefined}
                onBlur={isNew ? blurGray : undefined}
              >
                {['gram', 'kilogram', 'ton'].map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Hữu cơ / Chứng nhận */}
          <div style={{ gridColumn: '2 / 3', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#374151' }}>
              <input type="checkbox" checked={!!form.isOrganic} onChange={(e) => set('isOrganic', e.target.checked)} style={{ width: 18, height: 18, accentColor: PRIMARY }} />
              Sản phẩm hữu cơ (Organic)
            </label>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={labelStyle}>Chứng nhận (Certification)</label>
              <input value={form.certification ?? ''} onChange={(e) => set('certification', e.target.value)}
                placeholder="VD: VietGAP, GlobalGAP" style={inputStyle} onFocus={focusGreen} onBlur={blurGray} />
            </div>
          </div>

          {/* Mô Tả Sản Phẩm */}
          <div style={{ gridColumn: '2 / 3' }}>
            <label style={labelStyle}>Mô Tả Sản Phẩm</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {descs.map((d, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input value={d.key} onChange={(e) => setDesc(i, 'key', e.target.value)}
                    placeholder="Thuộc tính" style={{ ...inputStyle, flex: 1 }} onFocus={focusGreen} onBlur={blurGray} />
                  <input value={d.value} onChange={(e) => setDesc(i, 'value', e.target.value)}
                    placeholder="Giá trị mô tả" style={{ ...inputStyle, flex: 1 }} onFocus={focusGreen} onBlur={blurGray} />
                  <button onClick={() => removeDesc(i)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 18, padding: '4px', flexShrink: 0 }}>
                    <FiTrash2 />
                  </button>
                </div>
              ))}
              <button onClick={addDesc}
                style={{ alignSelf: 'flex-start', padding: '8px 18px', borderRadius: 8, border: 'none', background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, color: '#fff', fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}>
                + Thêm Mô Tả
              </button>
            </div>
          </div>

          {/* Hình Ảnh Sản Phẩm */}
          <div
            style={{
              gridColumn: '1 / 2',
              gridRow: '1 / span 10',
              paddingRight: 16,
              borderRight: '1px solid #e5e7eb',
              marginRight: 12,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={labelStyle}>Hình Ảnh Sản Phẩm</label>
              <span style={{ fontSize: 12, color: images.length >= 6 ? '#ef4444' : '#64748b' }}>
                ({images.length}/6 hình ảnh)
              </span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
              {images.map((src, i) => (
                <div key={i} style={{ position: 'relative', width: 90 }}>
                  <div style={{ width: 90, height: 90, borderRadius: 8, overflow: 'hidden', border: i === primaryIdx ? `2.5px solid ${PRIMARY}` : '2px solid #e2e8f0', cursor: 'pointer' }}>
                    <img
                      src={src}
                      alt={`Product ${i + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onClick={() => setZoomImageUrl(src)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setPrimaryIdx(i) }}
                    title={i === primaryIdx ? 'Ảnh chính' : 'Đặt làm ảnh chính'}
                    style={{
                      position: 'absolute',
                      top: 4,
                      left: 4,
                      width: 22,
                      height: 22,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      border: 'none',
                      cursor: 'pointer',
                      background: i === primaryIdx ? '#fef08a' : 'rgba(255,255,255,0.9)',
                      color: i === primaryIdx ? '#ca8a04' : '#94a3b8',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                    }}
                  >
                    {i === primaryIdx ? <FaStar size={12} /> : <FaRegStar size={12} />}
                  </button>
                  <button
                    onClick={() => removeImage(i)}
                    style={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      background: 'rgba(0,0,0,0.55)',
                      border: 'none',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
                      cursor: 'pointer',
                      color: '#fff',
                      fontSize: 11,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
              {images.length < 6 && (
                <div onClick={() => fileInputRef.current?.click()}
                  style={{ width: 90, height: 90, borderRadius: 8, border: '2px dashed #cbd5e1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8', fontSize: 12, gap: 4 }}>
                  <FiPlus style={{ fontSize: 22 }} />
                  <span>Thêm ảnh</span>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: 'none' }} />
            </div>
            {images.length >= 6 && (
              <p style={{ fontSize: 12, color: '#ef4444', margin: 0 }}>Đã đạt giới hạn 6 hình ảnh</p>
            )}
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 4 }}>
            <button disabled={saving} onClick={onClose} style={{ padding: '10px 24px', borderRadius: 8, border: '1.5px solid #e2e8f0', background: '#fff', color: '#374151', fontWeight: 600, fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>Hủy</button>
            <button disabled={saving} onClick={handleSave} style={{ padding: '10px 28px', borderRadius: 8, border: 'none', background: saving ? '#94a3b8' : `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, color: '#fff', fontWeight: 700, fontSize: 14, cursor: saving ? 'wait' : 'pointer', boxShadow: saving ? 'none' : '0 2px 8px rgba(117,176,111,0.35)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {saving && <FiLoader size={18} style={{ animation: 'adminProductSpin 0.9s linear infinite', flexShrink: 0 }} />}
              {saving ? (isNew ? 'Đang thêm...' : 'Đang cập nhật...') : (isNew ? 'Thêm Sản Phẩm' : 'Cập Nhật')}
            </button>
          </div>
        </div>
        {/* Zoom ảnh lớn khi click trong create modal */}
        {zoomImageUrl && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15,23,42,0.75)',
              zIndex: 1100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setZoomImageUrl(null)}
          >
            <img
              src={zoomImageUrl}
              alt="Product zoom"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                borderRadius: 16,
                boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
                objectFit: 'contain',
                background: '#fff',
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}


// ── Discount Program Modal ──
const INIT_DISCOUNTS = {
  P001: [{ id: 'DC001', status: 'Đang Hoạt Động', discount: 15, start: '15/01/2026', end: '31/01/2026', maxQty: 100, updated: '10/1/2026' }],
}

function DiscountProgramModal({ product, onClose }) {
  const [discounts, setDiscounts] = useState(INIT_DISCOUNTS[product.id] || [])
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const blankForm = { id: '', status: 'Đang Hoạt Động', discount: '', start: '', end: '', maxQty: '', updated: '' }
  const [form, setForm] = useState(blankForm)
  const fset = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const inputS = { width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box', color: '#374151' }

  const openCreate = () => { setForm({ ...blankForm, id: 'DC' + String(discounts.length + 1).padStart(3, '0') }); setEditItem(null); setShowForm(true) }
  const openEdit = (d) => { setForm({ ...d }); setEditItem(d.id); setShowForm(true) }
  const saveForm = () => {
    if (!form.discount || !form.start || !form.end) return
    setDiscounts((prev) =>
      editItem ? prev.map((d) => d.id === editItem ? { ...form } : d) : [...prev, { ...form }]
    )
    setShowForm(false)
  }
  const remove = (id) => setDiscounts((prev) => prev.filter((d) => d.id !== id))

  const statusColor = (s) => s === 'Đang Hoạt Động' ? { bg: '#eff6ff', color: '#2563eb' } : { bg: '#f1f5f9', color: '#64748b' }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, width: 520, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#f97316,#ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiPercent style={{ color: '#fff', fontSize: 18 }} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#0f172a' }}>Discount Programs</h2>
              <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{product.id} • {product.name}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 20 }}><FiX /></button>
        </div>

        <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Create button */}
          {!showForm && (
            <button onClick={openCreate}
              style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#f97316,#ea580c)', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <FiPlus style={{ fontSize: 16 }} /> Tạo Discount Program Mới
            </button>
          )}

          {/* Inline form */}
          {showForm && (
            <div style={{ border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{editItem ? 'Chỉnh Sửa' : 'Tạo Mới'} Discount Program</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Mã chương trình</label>
                  <input value={form.id} readOnly style={{ ...inputS, background: '#f8fafc', color: '#94a3b8' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 }}>% Giảm giá *</label>
                  <input type="number" value={form.discount} onChange={(e) => fset('discount', e.target.value)} placeholder="15" style={inputS}
                    onFocus={(e) => (e.target.style.borderColor = '#f97316')} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Ngày Bắt Đầu *</label>
                  <input type="date" value={form.start.split('/').reverse().join('-')} onChange={(e) => { const d = e.target.value.split('-'); fset('start', `${d[2]}/${d[1]}/${d[0]}`) }} style={inputS}
                    onFocus={(e) => (e.target.style.borderColor = '#f97316')} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Ngày Kết Thúc *</label>
                  <input type="date" value={form.end.split('/').reverse().join('-')} onChange={(e) => { const d = e.target.value.split('-'); fset('end', `${d[2]}/${d[1]}/${d[0]}`) }} style={inputS}
                    onFocus={(e) => (e.target.style.borderColor = '#f97316')} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Số SP Tối Đa</label>
                  <input type="number" value={form.maxQty} onChange={(e) => fset('maxQty', e.target.value)} placeholder="100" style={inputS}
                    onFocus={(e) => (e.target.style.borderColor = '#f97316')} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Trạng Thái</label>
                  <select value={form.status} onChange={(e) => fset('status', e.target.value)}
                    style={{ ...inputS, cursor: 'pointer' }}
                    onFocus={(e) => (e.target.style.borderColor = '#f97316')} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}>
                    <option>Đang Hoạt Động</option>
                    <option>Tạm Dừng</option>
                    <option>Đã Kết Thúc</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button onClick={() => setShowForm(false)} style={{ padding: '9px 20px', borderRadius: 8, border: '1.5px solid #e2e8f0', background: '#fff', color: '#374151', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Hủy</button>
                <button onClick={saveForm} style={{ padding: '9px 20px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#f97316,#ea580c)', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                  {editItem ? 'Cập Nhật' : 'Tạo Mới'}
                </button>
              </div>
            </div>
          )}

          {/* Discount list */}
          {discounts.length === 0
            ? <div style={{ textAlign: 'center', padding: '32px 0', color: '#94a3b8', fontSize: 14 }}>Chưa có chương trình khuyến mãi nào.</div>
            : discounts.map((d) => {
              const sc = statusColor(d.status)
              return (
                <div key={d.id} style={{ border: '1.5px solid #f1f5f9', borderRadius: 12, padding: '16px 18px', background: '#fafafa' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#f97316,#ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiPercent style={{ color: '#fff', fontSize: 16 }} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontWeight: 800, fontSize: 14, color: '#0f172a' }}>{d.id}</span>
                          <span style={{ fontSize: 11.5, fontWeight: 700, padding: '2px 10px', borderRadius: 20, background: sc.bg, color: sc.color }}>{d.status}</span>
                        </div>
                        <div style={{ fontSize: 12, color: '#64748b' }}>{product.name}</div>
                      </div>
                    </div>
                    <div style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)', color: '#fff', borderRadius: 20, padding: '5px 14px', fontWeight: 800, fontSize: 13 }}>% {d.discount}%</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 20px', fontSize: 12.5 }}>
                    {[
                      { label: 'Ngày Bắt Đầu', value: d.start },
                      { label: 'Ngày Kết Thúc', value: d.end },
                      { label: 'Số Sản Phẩm Tối Đa', value: d.maxQty ? `${d.maxQty} lần` : '—' },
                      { label: 'Cập Nhật Lần Cuối', value: d.updated || '—' },
                    ].map((r) => (
                      <div key={r.label}>
                        <div style={{ color: '#94a3b8', fontWeight: 600 }}>{r.label}</div>
                        <div style={{ color: '#0f172a', fontWeight: 700, marginTop: 2 }}>{r.value}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    <button onClick={() => openEdit(d)} style={{ padding: '7px 18px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FiEdit2 style={{ fontSize: 13 }} /> Sửa
                    </button>
                    <button onClick={() => remove(d.id)} style={{ padding: '7px 18px', borderRadius: 8, border: 'none', background: '#ef4444', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FiTrash2 style={{ fontSize: 13 }} /> Xóa
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

<<<<<<< HEAD
function ProductManagementView() {
  const [products, setProducts] = useState(INIT_PRODUCTS)
  const [isLoading, setIsLoading] = useState(true)
=======
export function ProductManagementView() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
>>>>>>> tri
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchProducts(false)
      .then(res => {
        const list = res?.data || res?.Data || []
        const mapped = list.map(p => ({
          id: p.productId || p.ProductId || '',
          name: p.productName || p.ProductName || '',
          categoryCode: p.subCategoryId || p.SubCategoryId || p.categoryName || '',
          origin: p.origin || p.Origin || '',
          price: p.priceSell || p.PriceSell || 0,
          qty: p.quantity || p.Quantity || 0,
          weight: p.weight || p.Weight || 0,
          unit: p.unit || p.Unit || 'kg',
        }))
        if (mapped.length > 0) setProducts(mapped)
      })
      .catch(err => console.error('Failed to load products for admin:', err))
      .finally(() => setIsLoading(false))
  }, [])

  const [modal, setModal] = useState(null)
  const [loadingEditProductId, setLoadingEditProductId] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [discountProduct, setDiscountProduct] = useState(null)
  const [viewProduct, setViewProduct] = useState(null)
  const [viewProductLoading, setViewProductLoading] = useState(false)
  const [viewProductError, setViewProductError] = useState(null)
  const [zoomImageUrl, setZoomImageUrl] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        console.log('[Admin] ProductManagementView mount → loading products...')
        setLoading(true)
        setError(null)
        const apiProducts = await fetchAllProducts()
        console.log('[Admin] fetchAllProducts result:', Array.isArray(apiProducts) ? apiProducts.length : apiProducts)
        setProducts(apiProducts.map(mapApiProductToAdminRow))
      } catch (err) {
        console.error('Failed to load products', err)
        setError(getApiErrorMessage(err) || 'Không tải được danh sách sản phẩm.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = products.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = async (form) => {
    if (modal.mode === 'add') {
      try {
        // Upload ảnh lên Cloudinary
        const uploadedUrls = []
        for (let i = 0; i < (form.imageFiles || []).length; i += 1) {
          const url = await uploadImageToCloudinary(form.imageFiles[i])
          uploadedUrls.push(url)
        }
        const imagesJson = uploadedUrls.map((url, index) => ({
          url,
          primary: index === form.primaryIdx,
        }))

        // Gọi API tạo sản phẩm (backend dùng productQty, không phải quantity)
        const qty = Number(form.qty)
        await createProduct({
          subCategoryId: form.subCategoryId,
          productName: form.name,
          description: (form.descs && form.descs.length)
            ? form.descs.map((d) => `${d.key}: ${d.value}`).join(' | ')
            : '',
          productQty: qty,
          manufacturingLocation: form.origin,
          priceSell: Number(form.price),
          weight: Number(form.weight),
          unit: form.unit,
          isOrganic: !!form.isOrganic,
          certification: form.certification?.trim() || null,
          imagesJson,
        })

        // Reload list from API
        const apiProducts = await fetchAllProducts()
        setProducts(apiProducts.map(mapApiProductToAdminRow))
      } catch (err) {
        console.error('Failed to create product', err)
        const apiMsg = getApiErrorMessage(err)
        const is401 = err?.response?.status === 401
        const fallback401 = 'Phiên đăng nhập hết hạn hoặc chưa đăng nhập. Vui lòng đăng xuất và đăng nhập lại (tài khoản Admin) rồi thử tạo sản phẩm.'
        const fallbackGeneric = 'Tạo sản phẩm thất bại. Vui lòng thử lại.'
        toast.error(apiMsg || (is401 ? fallback401 : fallbackGeneric))
        throw err
      }
    } else {
      // Cập nhật sản phẩm (PUT /product): ảnh mới (blob preview) upload Cloudinary, giữ nguyên URL https đã có.
      try {
        const qty = Number(form.qty)
        const files = form.imageFiles || []
        let fileQueue = 0
        const imageUrls = []
        for (const src of form.images || []) {
          if (typeof src !== 'string' || !src.trim()) continue
          if (src.startsWith('blob:')) {
            const file = files[fileQueue]
            if (!file) {
              toast.error('Thiếu file ảnh. Vui lòng chọn lại ảnh.')
              throw new Error('Missing image file for blob preview')
            }
            // eslint-disable-next-line no-await-in-loop
            const uploaded = await uploadImageToCloudinary(file)
            imageUrls.push(uploaded)
            fileQueue += 1
          } else {
            imageUrls.push(src)
          }
        }
        const imagesJson = imageUrls.map((url, index) => ({
          url,
          primary: index === form.primaryIdx,
        }))
        await updateProduct({
          productId: form.productId,
          subCategoryId: form.subCategoryId,
          productName: form.name,
          description: (form.descs && form.descs.length)
            ? form.descs.map((d) => `${d.key}: ${d.value}`).join(' | ')
            : '',
          productQty: qty,
          manufacturingLocation: form.origin,
          priceSell: Number(form.price),
          weight: Number(form.weight),
          unit: form.unit,
          isOrganic: !!form.isOrganic,
          certification: form.certification?.trim() || null,
          imagesJson,
        })

        // Reload list from API sau khi cập nhật thành công
        const apiProducts = await fetchAllProducts()
        setProducts(apiProducts.map(mapApiProductToAdminRow))
        setModal(null)
      } catch (err) {
        console.error('Failed to update product', err)
        const apiMsg = getApiErrorMessage(err)
        toast.error(apiMsg || 'Cập nhật sản phẩm thất bại. Vui lòng thử lại.')
        throw err
      }
    }
  }

  const handleOpenEditProduct = async (p) => {
    if (p?.productId == null) return
    try {
      setLoadingEditProductId(p.productId)
      const detail = await fetchProductDetail(p.productId)
      const row = mapApiProductToAdminRow(detail)
      if (!row) {
        toast.error('Dữ liệu sản phẩm không hợp lệ.')
        return
      }
      setModal({ mode: 'edit', product: row })
    } catch (err) {
      console.error('Failed to load product for edit', err)
      toast.error(getApiErrorMessage(err) || 'Không tải được chi tiết sản phẩm. Vui lòng thử lại.')
    } finally {
      setLoadingEditProductId(null)
    }
  }

  const handleViewDetail = async (p) => {
    try {
      setViewProductLoading(true)
      setViewProductError(null)
      const detail = await fetchProductDetail(p.productId)
      setViewProduct(detail)
    } catch (err) {
      console.error('Failed to load product detail', err)
      setViewProductError(getApiErrorMessage(err) || 'Không tải được thông tin sản phẩm.')
    } finally {
      setViewProductLoading(false)
    }
  }

  return (
    <div>
      <style>{`@keyframes adminProductSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: 0 }}>Quản Lý Danh Mục Sản Phẩm</h1>
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>Quản lý toàn bộ sản phẩm trong hệ thống</p>
        </div>
        <button onClick={() => setModal({ mode: 'add', product: null })}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 2px 8px rgba(117,176,111,0.4)' }}>
          <FiPlus style={{ fontSize: 16 }} /> Thêm Sản Phẩm
        </button>
      </div>
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <FiSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 16 }} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm kiếm theo tên, mã sản phẩm..."
          style={{ width: '100%', padding: '11px 14px 11px 42px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#fff', color: '#374151' }}
          onFocus={(e) => (e.target.style.borderColor = PRIMARY)} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
      </div>
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        {error && !loading && (
          <div style={{ padding: 24, textAlign: 'center', color: '#ef4444', fontSize: 14 }}>
            {error}
          </div>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
          <thead>
            <tr>{['Mã SP', 'Tên Sản Phẩm', 'Mã Phân Loại', 'Nơi Sản Xuất', 'Giá Bán', 'Số Lượng', 'Khối Lượng', 'Đơn Vị', 'Thao Tác'].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: 48, verticalAlign: 'middle' }}>
                  <style>{`@keyframes adminProductSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                  <div style={{ display: 'inline-flex', animation: 'adminProductSpin 0.9s linear infinite', color: PRIMARY }}>
                    <FiLoader size={36} strokeWidth={2.5} />
                  </div>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={9} style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Không tìm thấy sản phẩm nào.</td></tr>
            ) : (
              filtered.map((p, i) => (
                <tr key={p.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f0fdf4')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#fafafa')}>
                  <td style={{ ...tdStyle, fontWeight: 600, color: '#475569' }}>{p.id}</td>
                  <td style={{ ...tdStyle, fontWeight: 600, color: '#1e293b' }}>{p.name}</td>
                  <td style={{ ...tdStyle, color: PRIMARY, fontWeight: 500 }}>{p.categoryCode}</td>
                  <td style={{ ...tdStyle, color: '#64748b' }}>{p.origin}</td>
                  <td style={{ ...tdStyle, color: PRIMARY, fontWeight: 700 }}>{fmtPrice(p.price)}</td>
                  <td style={tdStyle}>{p.qty}</td>
                  <td style={tdStyle}>{p.weight}</td>
                  <td style={tdStyle}>{p.unit}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: 8 }}>
                      <button
                        title="Xem chi tiết"
                        onClick={() => handleViewDetail(p)}
                        style={iconBtn('#0ea5e9')}
                      >
                        <FiEye style={{ fontSize: 13 }} />
                      </button>
                      <button title="Khuyến mãi" onClick={() => setDiscountProduct(p)} style={iconBtn('#f97316')}><FiPercent style={{ fontSize: 13 }} /></button>
                      <button
                        title="Chỉnh sửa"
                        type="button"
                        disabled={loadingEditProductId === p.productId}
                        onClick={() => handleOpenEditProduct(p)}
                        style={{ ...iconBtn(PRIMARY), opacity: loadingEditProductId === p.productId ? 0.65 : 1, cursor: loadingEditProductId === p.productId ? 'wait' : 'pointer' }}
                      >
                        {loadingEditProductId === p.productId ? (
                          <FiLoader style={{ fontSize: 13, animation: 'adminProductSpin 0.9s linear infinite' }} />
                        ) : (
                          <FiEdit2 style={{ fontSize: 13 }} />
                        )}
                      </button>
                      <button title="Xóa" onClick={() => setDeleteConfirm(p.id)} style={iconBtn('#ef4444')}><FiTrash2 style={{ fontSize: 13 }} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9', color: '#64748b', fontSize: 13 }}>
          Hiển thị <strong>{filtered.length}</strong> / <strong>{products.length}</strong> sản phẩm
        </div>
      </div>
      {modal && (
        <ProductModal
          key={modal.mode === 'edit' && modal.product?.productId != null ? `edit-${modal.product.productId}` : 'add'}
          product={modal.product}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
      {discountProduct && <DiscountProgramModal product={discountProduct} onClose={() => setDiscountProduct(null)} />}
      {viewProduct && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.40)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={() => setViewProduct(null)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 20,
              width: 640,
              maxWidth: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 24px 80px rgba(15,23,42,0.35)',
              padding: '24px 28px 24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 18,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                }}
              >
                Chi Tiết Sản Phẩm
              </h2>
              <button
                onClick={() => setViewProduct(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8',
                  fontSize: 20,
                }}
              >
                <FiX />
              </button>
            </div>
            {viewProductLoading && (
              <p style={{ textAlign: 'center', color: '#64748b' }}>Đang tải...</p>
            )}
            {viewProductError && (
              <p style={{ textAlign: 'center', color: '#ef4444' }}>{viewProductError}</p>
            )}
            {!viewProductLoading && !viewProductError && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 18 }}>
                  {viewProduct.imagesJson?.[0]?.url && (
                    <img
                      src={viewProduct.imagesJson[0].url}
                      alt={viewProduct.productName}
                      style={{
                        width: 170,
                        height: 170,
                        objectFit: 'cover',
                        borderRadius: 14,
                        border: '1px solid #e2e8f0',
                        background: '#f8fafc',
                      }}
                      onClick={() => setZoomImageUrl(viewProduct.imagesJson[0].url)}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 18,
                        fontWeight: 800,
                        color: '#0f172a',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {viewProduct.productName}
                    </h3>
                    <div
                      style={{
                        margin: '8px 0 10px',
                        fontSize: 13.5,
                        lineHeight: 1.6,
                        color: '#64748b',
                      }}
                    >
                      <strong style={{ color: '#0f172a', display: 'block', marginBottom: 4 }}>
                        Mô tả sản phẩm:
                      </strong>
                      {parseDescriptionToDescs(viewProduct.description).map((d, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: 6 }}>
                          <span style={{ color: '#9ca3af' }}>-</span>
                          <span>
                            {d.key && (
                              <strong style={{ color: '#0f172a' }}>
                                {d.key}:{' '}
                              </strong>
                            )}
                            {d.value || (!d.key ? '' : undefined)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p style={{ margin: '4px 0', fontSize: 13.5, color: PRIMARY }}>
                      <strong style={{ fontWeight: 700 }}>Giá bán:</strong>{' '}
                      <strong>{fmtPrice(viewProduct.priceSell ?? 0)}</strong>
                    </p>
                    <p style={{ margin: '4px 0', fontSize: 13.5, color: '#374151' }}>
                      <strong style={{ fontWeight: 700 }}>Số lượng:</strong>{' '}
                      <span>{viewProduct.quantity ?? 0}</span>
                    </p>
                    <p style={{ margin: '4px 0', fontSize: 13.5, color: '#64748b' }}>
                      <strong style={{ fontWeight: 700 }}>Danh mục:</strong>{' '}
                      <span>
                        {viewProduct.categoryName} / {viewProduct.subCategoryName}
                      </span>
                    </p>
                    <p style={{ margin: '4px 0', fontSize: 13.5, color: '#64748b' }}>
                      <strong style={{ fontWeight: 700 }}>Nơi sản xuất:</strong>{' '}
                      <span>{viewProduct.manufacturingLocation}</span>
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                  <button
                    onClick={() => setViewProduct(null)}
                    style={{
                      padding: '9px 22px',
                      borderRadius: 999,
                      border: '1.5px solid #e2e8f0',
                      background: '#f8fafc',
                      color: '#374151',
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: 'pointer',
                    }}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Zoom ảnh lớn khi click */}
      {zoomImageUrl && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.75)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setZoomImageUrl(null)}
        >
          <img
            src={zoomImageUrl}
            alt="Product zoom"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: 16,
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
              objectFit: 'contain',
              background: '#fff',
            }}
          />
        </div>
      )}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: 42, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>Xác Nhận Xóa</h3>
            <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 24px' }}>
              Bạn có chắc muốn xóa <strong>{products.find((p) => p.id === deleteConfirm)?.name}</strong>? Hành động này không thể hoàn tác.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '9px 20px', borderRadius: 8, border: '1.5px solid #e2e8f0', background: '#fff', color: '#374151', fontWeight: 600, cursor: 'pointer' }}>Hủy</button>
              <button onClick={() => { setProducts((prev) => prev.filter((p) => p.id !== deleteConfirm)); setDeleteConfirm(null) }}
                style={{ padding: '9px 20px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#ef4444,#dc2626)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Xóa Ngay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Dashboard View ──
function DashboardView({ currentUser }) {
  const [selectedFilter, setSelectedFilter] = useState('Tất cả')
  const [selectedMonth, setSelectedMonth] = useState(null)
  const [showMonthPicker, setShowMonthPicker] = useState(false)
  const rankColors = ['#f59e0b', '#6b7280', '#b45309', PRIMARY, '#3b82f6']

  // Real API state
  const [allOrders, setAllOrders] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)

  useEffect(() => {
    getOrders()
      .then(data => {
        const list = Array.isArray(data) ? data : (data?.data || data?.Data || [])
        setAllOrders(list.map(mapOrder))
      })
      .catch(err => console.error('Failed to load orders:', err))
      .finally(() => setIsLoadingOrders(false))
  }, [])

  useEffect(() => {
    fetchProducts(false)
      .then(res => {
        const list = res?.data || res?.Data || []
        setAllProducts(list.map(mapProductDtoToFrontend))
      })
      .catch(err => console.error('Failed to load products:', err))
      .finally(() => setIsLoadingProducts(false))
  }, [])

  const stats = buildStats(allOrders, allProducts)

  // Top products by soldCount
  const topProducts = [...allProducts]
    .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
    .slice(0, 10)
    .map((p, i) => ({ rank: i + 1, name: p.name, rating: p.rating || 5, reviews: p.reviewCount || 0, sold: ((p.soldCount || 0) * p.price).toLocaleString('vi-VN') + 'đ' }))

  // Filter orders by status
  const pendingOrders = allOrders.filter(o => o.status?.toUpperCase() === 'PENDING')
  const packingOrders = allOrders.filter(o => o.status?.toUpperCase() === 'PACKAGING')
  const deliveringOrders = allOrders.filter(o => ['SHIPPING', 'DELIVERING', 'OUT_FOR_DELIVERY'].includes(o.status?.toUpperCase()))

  // Filter orders by month (date format: 'dd/mm/yyyy')
  const filterByMonth = (orders) => {
    if (!selectedMonth) return orders
    return orders.filter((o) => {
      const parts = o.date?.split('/')
      return parts && parseInt(parts[1], 10) === selectedMonth
    })
  }

  const filteredRecurring = filterByMonth(RECURRING_ORDERS)
  const filteredPending = filterByMonth(pendingOrders)
  const filteredPacking = filterByMonth(packingOrders)
  const filteredDelivering = filterByMonth(deliveringOrders)

  const handleSelectAll = () => {
    setSelectedFilter('Tất cả')
    setSelectedMonth(null)
    setShowMonthPicker(false)
  }

  const handleSelectMonth = (m) => {
    setSelectedMonth(m)
    setSelectedFilter(`Tháng ${m}`)
    setShowMonthPicker(false)
  }

  return (
    <div onClick={() => showMonthPicker && setShowMonthPicker(false)}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: 0 }}>Dashboard Quản Trị</h1>
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>
            Xin chào, <span style={{ color: PRIMARY, fontWeight: 600 }}>{currentUser?.name || 'Admin'}!</span> Chúc bạn một ngày làm việc hiệu quả.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={handleSelectAll} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', background: !selectedMonth ? '#0f172a' : '#fff', color: !selectedMonth ? '#fff' : '#374151', fontWeight: 600, fontSize: 13.5, cursor: 'pointer' }}>
            <FiCheckSquare style={{ fontSize: 15 }} /> Tất cả
          </button>
          {/* Month picker */}
          <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowMonthPicker((v) => !v)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: `1.5px solid ${selectedMonth ? PRIMARY : '#e2e8f0'}`, background: selectedMonth ? '#f0fdf4' : '#fff', color: selectedMonth ? PRIMARY_DARK : '#374151', fontWeight: 600, fontSize: 13.5, cursor: 'pointer' }}>
              <FiCalendar style={{ fontSize: 15 }} />
              {selectedMonth ? `Tháng ${selectedMonth}` : 'Chọn tháng'} ▾
            </button>
            {showMonthPicker && (
              <div style={{ position: 'absolute', top: '110%', right: 0, background: '#fff', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.14)', border: '1px solid #e2e8f0', zIndex: 500, padding: 12, width: 200 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Chọn Tháng</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <button key={m} onClick={() => handleSelectMonth(m)}
                      style={{ padding: '7px 4px', borderRadius: 8, border: 'none', background: selectedMonth === m ? `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})` : '#f8fafc', color: selectedMonth === m ? '#fff' : '#374151', fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s' }}>
                      T{m}
                    </button>
                  ))}
                </div>
                {selectedMonth && (
                  <button onClick={handleSelectAll} style={{ width: '100%', marginTop: 8, padding: '7px', borderRadius: 8, border: 'none', background: '#f1f5f9', color: '#64748b', fontWeight: 600, fontSize: 12.5, cursor: 'pointer' }}>
                    ✕ Xóa bộ lọc
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{s.icon}</div>
              {isLoadingOrders || isLoadingProducts
                ? <span style={{ color: '#94a3b8', fontSize: 12 }}>Đang tải...</span>
                : <span style={{ color: PRIMARY, fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 3 }}><FiTrendingUp style={{ fontSize: 13 }} /> Live</span>
              }
            </div>
            <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>{s.label}</p>
            <p style={{ fontWeight: 800, fontSize: 20, color: '#0f172a', margin: 0 }}>
              {(isLoadingOrders || isLoadingProducts) ? '...' : s.value}
            </p>
          </div>
        ))}
      </div>
      {/* Month filter info banner */}
      {selectedMonth && (
        <div style={{ background: '#f0fdf4', border: `1px solid ${PRIMARY}40`, borderRadius: 10, padding: '10px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: PRIMARY_DARK, fontWeight: 600 }}>
          <FiCalendar style={{ fontSize: 15 }} />
          Đang hiển thị đơn hàng trong <strong style={{ marginLeft: 4 }}>Tháng {selectedMonth}</strong>
          <button onClick={handleSelectAll} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>✕ Xóa</button>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <OrderSection title="Đơn Hàng Giao Định Kỳ" subtitle={`${filteredRecurring.length} đơn hàng đang chờ giao`} icon="🔄">
            <OrderTable orders={filteredRecurring} />
          </OrderSection>
          <OrderSection title="Đơn Hàng Cần Xác Nhận" subtitle={`${filteredPending.length} đơn hàng đang chờ xử lý`} icon="✅">
            <OrderTable orders={filteredPending} hasTime />
          </OrderSection>
          <OrderSection title="Đơn Hàng Đang Đóng Gói" subtitle={`${filteredPacking.length} đơn hàng đang được đóng gói`} icon="📦">
            <OrderTable orders={filteredPacking} hasTime />
          </OrderSection>
          <OrderSection title="Đơn Hàng Đang Giao" subtitle={`${filteredDelivering.length} đơn hàng đang trên đường giao`} icon="🚚">
            <OrderTable orders={filteredDelivering} hasTime />
          </OrderSection>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', position: 'sticky', top: 0 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>Sản Phẩm Bán Chạy</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {(topProducts.length > 0 ? topProducts : TOP_PRODUCTS).map((p) => (
              <div key={p.rank} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: p.rank <= 3 ? `linear-gradient(135deg,${rankColors[p.rank - 1]},${rankColors[p.rank - 1]}cc)` : '#f1f5f9', color: p.rank <= 3 ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                  {p.rank}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: '#1e293b' }}>{p.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
                    <StarRating rating={p.rating} />
                    <span style={{ fontSize: 11, color: '#64748b' }}>({p.reviews} đã bán)</span>
                  </div>
                  <div style={{ fontSize: 12, color: PRIMARY, fontWeight: 700, marginTop: 2 }}>{p.sold}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


// ── Sidebar ──
function Sidebar({ activeNav, setActiveNav, currentUser, onLogout }) {
  const navigate = useNavigate()

  const navToPath = (label) => {
    switch (label) {
      case 'Dashboard':
        return '/admin'
      case 'Quản Lý Lô Hàng':
        return '/admin/batch'
      case 'Quản Lý Đơn Hàng':
        return '/admin/orders'
      case 'Quản Lý Sản Phẩm':
        return '/admin/products'
      case 'Quản Lý Voucher':
        return '/admin/voucher'
      default:
        return '/admin'
    }
  }

  return (
    <aside style={{ width: 240, minWidth: 240, background: '#ffffff', color: '#1e293b', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', padding: '0 0 20px 0', overflowY: 'auto' }}>
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaLeaf style={{ color: '#fff', fontSize: 16 }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.3px', color: '#0f172a' }}>FreshMarket</span>
        </div>
      </div>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, color: '#fff', flexShrink: 0 }}>A</div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontWeight: 600, fontSize: 13.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#1e293b' }}>{currentUser?.name || 'Admin Fresh Market'}</div>
          <div style={{ color: '#64748b', fontSize: 11.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser?.email || 'admin@freshmarket.vn'}</div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p style={{ color: '#94a3b8', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6, paddingLeft: 8 }}>QUẢN TRỊ HỆ THỐNG</p>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = activeNav === item.label
          return (
            <button
              key={item.label}
              onClick={() => {
                setActiveNav(item.label)
                navigate(navToPath(item.label))
              }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, background: isActive ? `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})` : 'transparent', color: isActive ? '#fff' : '#475569', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'all 0.15s' }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = '#f1f5f9' }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}>
              <Icon style={{ fontSize: 16, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: isActive ? 600 : 500, fontSize: 13.5, color: isActive ? '#fff' : '#1e293b' }}>{item.label}</div>
                <div style={{ fontSize: 11, color: isActive ? 'rgba(255,255,255,0.75)' : '#94a3b8' }}>{item.desc}</div>
              </div>
            </button>
          )
        })}
        <div style={{ borderTop: '1px solid #e2e8f0', marginTop: 12, paddingTop: 12 }} />
        <p style={{ color: '#94a3b8', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6, paddingLeft: 8 }}>ĐIỀU HƯỚNG</p>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, color: '#475569', textDecoration: 'none', fontSize: 13.5, fontWeight: 500 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#f1f5f9')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
          <FiHome style={{ fontSize: 16 }} /> Về Trang Chủ
        </Link>
      </nav>
      <div style={{ padding: '0 12px' }}>
        <button onClick={onLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 16px', borderRadius: 8, background: 'linear-gradient(135deg,#ef4444,#dc2626)', color: '#fff', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>
          <FiLogOut /> Đăng Xuất
        </button>
      </div>
    </aside>
  )
}

// ── Main Component ──
export default function AdminDashboard({ initialActiveNav }) {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState(initialActiveNav || 'Dashboard')

  useEffect(() => {
    if (initialActiveNav) setActiveNav(initialActiveNav)
  }, [initialActiveNav])

  const handleLogout = () => { logout(); navigate('/login') }

  const renderContent = () => {
    switch (activeNav) {
      case 'Quản Lý Sản Phẩm': return <ProductManagementView />
      case 'Quản Lý Lô Hàng': return <BatchManagementView />
      case 'Quản Lý Đơn Hàng': return <OrderManagementView />
      case 'Quản Lý Voucher': return <VoucherManagementView />
      default: return <DashboardView currentUser={currentUser} />
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Inter', 'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} currentUser={currentUser} onLogout={handleLogout} />
      <main style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
        {renderContent()}
      </main>
    </div>
  )
}
