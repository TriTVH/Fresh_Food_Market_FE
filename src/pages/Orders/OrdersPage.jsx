import { useState, useEffect } from 'react'
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiMapPin,
  FiCreditCard,
  FiChevronRight,
  FiShoppingBag,
} from 'react-icons/fi'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import { useAuth } from '@/context/AuthContext'
<<<<<<< HEAD
import { fetchUserOrders } from '@/api/orderApi'
import { mapOrderDtoToFrontend } from '@/utils/mapper'
=======
import { fetchUserOrders, cancelOrder } from '@/api/orderApi'
import { mapOrderDtoToFrontend } from '@/utils/mapper'
import { toast } from 'react-toastify'
>>>>>>> tri

const statusConfig = {
  pending: {
    label: 'Chờ Xử Lý',
    icon: FiClock,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
  },
  packing: {
    label: 'Đang Đóng Gói',
    icon: FiPackage,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  shipping: {
    label: 'Đang Giao Hàng',
    icon: FiTruck,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  success: {
    label: 'Hoàn Thành',
    icon: FiCheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  failed: {
    label: 'Đã Hủy',
    icon: FiXCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
}

function OrdersPage() {
  const { currentUser: user } = useAuth()
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState('all')
<<<<<<< HEAD
  const [selectedOrder, setSelectedOrder] = useState(null)
=======
  const [detailOrder, setDetailOrder] = useState(null)
  const [cancelTarget, setCancelTarget] = useState(null)
  const [cancelReason, setCancelReason] = useState('')
  const [cancelSubmitting, setCancelSubmitting] = useState(false)
>>>>>>> tri

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) return;
<<<<<<< HEAD
      const userId = user.phone || user.username;
      try {
        const response = await fetchUserOrders(userId);
        if (response) {
            const rawData = Array.isArray(response) ? response : (response.data || []);
            setOrders(rawData.map(mapOrderDtoToFrontend));
=======
      try {
        const response = await fetchUserOrders();
        if (response) {
          const rawData = Array.isArray(response.data) ? response.data : response.data || [];
          setOrders(rawData.map(mapOrderDtoToFrontend));
>>>>>>> tri
        }
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadOrders();
  }, [user])

  const filteredOrders =
    selectedStatus === 'all'
      ? orders
      : orders.filter((order) => order.status === selectedStatus)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatCurrency = (amount) => {
<<<<<<< HEAD
    const num = Number(amount)
    if (isNaN(num) || num === 0) return '—'
    return new Intl.NumberFormat('vi-VN').format(num) + 'đ';
  }

  const getAddressText = (addr) => {
    const parts = [addr?.street, addr?.ward, addr?.city].filter(Boolean)
    return parts.length > 0 ? parts.join(', ') : 'Chưa có thông tin địa chỉ'
=======
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  }

  const canCustomerCancel = (order) => order.status === 'pending'

  const handleConfirmCancel = async () => {
    if (!cancelTarget) return
    const reason = cancelReason.trim()
    if (!reason) {
      toast.error('Vui lòng nhập lý do hủy đơn.')
      return
    }
    try {
      setCancelSubmitting(true)
      const res = await cancelOrder({
        orderId: cancelTarget.order_id,
        cancelReason: reason,
      })
      if (res?.success) {
        toast.success(res.message || 'Đã hủy đơn hàng.')
        setCancelTarget(null)
        setCancelReason('')
        const response = await fetchUserOrders()
        const rawData = Array.isArray(response.data) ? response.data : response.data || []
        setOrders(rawData.map(mapOrderDtoToFrontend))
      } else {
        toast.error(res?.message || 'Không hủy được đơn hàng.')
      }
    } catch (err) {
      toast.error(err?.message || 'Không hủy được đơn hàng.')
    } finally {
      setCancelSubmitting(false)
    }
>>>>>>> tri
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Header />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Đơn Hàng Của Tôi</h1>
          <p className="text-gray-600">Quản lý và theo dõi đơn hàng của bạn</p>
        </div>

        {/* Status Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedStatus === 'all'
                  ? 'bg-[#75b06f] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Tất Cả ({orders.length})
            </button>
            {Object.entries(statusConfig).map(([status, config]) => {
              const count = orders.filter((o) => o.status === status).length
              const Icon = config.icon
              return (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                    selectedStatus === status
                      ? `${config.bg} ${config.color} border-2 ${config.border}`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {config.label} ({count})
                </button>
              )
            })}
          </div>
        </div>

        {/* Orders List */}
        {isLoading ? (
           <div className="py-20 text-center text-gray-500 text-xl font-semibold">Đang tải đơn hàng...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="inline-flex items-center justify-center bg-gray-100 rounded-full p-6 mb-4">
              <FiShoppingBag className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Chưa Có Đơn Hàng</h2>
            <p className="text-gray-600 mb-6">Bạn chưa có đơn hàng nào trong danh mục này</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const config = statusConfig[order.status] || statusConfig.pending; // fallback
              const StatusIcon = config.icon

              return (
                <div key={order.order_id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {/* Order Header */}
                  <div className="p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`${config.bg} ${config.color} p-3 rounded-lg`}>
                          <StatusIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">Đơn hàng #{order.order_id}</h3>
                          <p className="text-sm text-gray-600">{formatDate(order.order_date)}</p>
                        </div>
                      </div>
                      <div className={`px-4 py-2 rounded-lg ${config.bg} ${config.color} font-semibold`}>
                        {config.label}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div className="border rounded-xl overflow-hidden text-sm">
                        <div className="hidden sm:grid sm:grid-cols-[2fr_minmax(90px,auto)_minmax(110px,auto)_minmax(110px,auto)] bg-gray-50 font-semibold px-4 py-2.5 border-b">
                          <span>Sản phẩm</span>
                          <span className="text-center">Đơn giá</span>
                          <span className="text-center">Giảm giá/sp</span>
                          <span className="text-right">Thành tiền</span>
                        </div>
                        {order.items.map((item, index) => {
                          const linePrice = item.price * item.quantity;
                          const lineDiscount = 0; // hiện chưa có giảm giá theo sản phẩm
                          return (
                            <div
                              key={index}
                              className="px-3 py-2.5 border-b last:border-b-0 text-sm"
                            >
                              {/* Desktop layout */}
                              <div className="hidden sm:grid sm:grid-cols-[2fr_minmax(90px,auto)_minmax(110px,auto)_minmax(110px,auto)] items-center gap-2">
                                <div>
                                  <div className="font-semibold text-gray-800">{item.name}</div>
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    Số lượng: {item.quantity}
                                  </div>
                                </div>
                                <div className="text-center text-gray-700 whitespace-nowrap">
                                  {formatCurrency(item.price)}
                                </div>
                                <div className="text-center text-gray-500 whitespace-nowrap text-xs">
                                  {lineDiscount > 0 ? `- ${formatCurrency(lineDiscount)}` : 'Không'}
                                </div>
                                <div className="text-right font-semibold text-gray-900 whitespace-nowrap">
                                  {formatCurrency(linePrice)}
                                </div>
                              </div>

                              {/* Mobile layout */}
                              <div className="sm:hidden space-y-1">
                                <div className="font-semibold text-gray-800">{item.name}</div>
                                <div className="text-xs text-gray-500">
                                  Số lượng: {item.quantity}
                                </div>
                                <div className="flex justify-between text-xs mt-1">
                                  <span className="text-gray-500">Đơn giá</span>
                                  <span className="text-gray-800">
                                    {formatCurrency(item.price)}
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-500">Giảm giá/sp</span>
                                  <span className="text-gray-800">
                                    {lineDiscount > 0
                                      ? `- ${formatCurrency(lineDiscount)}`
                                      : 'Không'}
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-700 font-semibold">Thành tiền</span>
                                  <span className="text-gray-900 font-semibold">
                                    {formatCurrency(linePrice)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Order Info */}
                    <div className="mt-6 pt-6 border-t border-gray-200 grid sm:grid-cols-3 gap-4">
                      <div className="flex items-start gap-3">
                        <FiMapPin className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Địa chỉ giao hàng</p>
                          <p className="text-sm text-gray-600">
                            {order.shipping_address.full || '—'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FiCreditCard className="w-5 h-5 text-gray-400 mt-1" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-semibold text-gray-800">Thanh toán</p>
                          <p className="text-sm text-gray-600">
                            <span className="text-gray-500">Hình thức: </span>
                            <span className="font-medium text-gray-800">
                              {order.payment_method || '—'}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FiCreditCard className="w-5 h-5 text-gray-400 mt-1" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-semibold text-gray-800">Tình trạng thanh toán</p>
                          <p className="text-sm text-gray-600 font-medium">
                            {order.transaction_status
                              ? order.transaction_status.toUpperCase()
                              : 'PENDING'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Tạm tính</span>
                        <span>{formatCurrency(order.subtotal ?? order.total_amount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Giảm giá voucher</span>
                        <span>
                          {order.discount_amount && order.discount_amount > 0
                            ? `- ${formatCurrency(order.discount_amount)}`
                            : '0đ'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phí vận chuyển</span>
                        <span>{formatCurrency(order.shipping_fee ?? 0)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                        <span className="text-lg font-bold text-gray-800">Tổng cộng:</span>
                        <span className="text-2xl font-bold text-[#75b06f]">
                          {formatCurrency(order.total_amount)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
<<<<<<< HEAD
                    <div className="mt-4 flex gap-3">
                      <button
                        className="flex-1 bg-[#75b06f] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#5a9450] transition-colors"
                        onClick={() => setSelectedOrder(order)}
                      >
                        Xem Chi Tiết
                      </button>
=======
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        className="flex-1 min-w-[140px] bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
                        onClick={() => setDetailOrder(order)}
                      >
                        Xem Chi Tiết
                      </button>
                      {canCustomerCancel(order) && (
                        <button
                          type="button"
                          className="flex-1 min-w-[140px] border border-red-300 text-red-600 font-semibold py-3 px-6 rounded-lg hover:bg-red-50 transition-colors"
                          onClick={() => {
                            setCancelTarget(order)
                            setCancelReason('')
                          }}
                        >
                          Hủy đơn
                        </button>
                      )}
>>>>>>> tri
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

<<<<<<< HEAD
      {/* ── Order Detail Modal ── */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Chi Tiết Đơn Hàng</h2>
                <p className="text-sm text-[#75b06f] font-semibold">#{selectedOrder.order_id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
                ✕
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5">
              {/* Status + Date */}
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${
                  (statusConfig[selectedOrder.status] || statusConfig.pending).bg
                } ${
                  (statusConfig[selectedOrder.status] || statusConfig.pending).color
                }`}>
                  {(statusConfig[selectedOrder.status] || statusConfig.pending).label}
                </span>
                <span className="text-sm text-gray-500">{formatDate(selectedOrder.order_date)}</span>
              </div>

              {/* Items */}
              <div>
                <p className="font-bold text-gray-800 mb-3">Sản Phẩm Đã Đặt</p>
                <div className="border rounded-xl overflow-hidden">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex gap-3 p-3 items-center" style={{ borderBottom: i < selectedOrder.items.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg bg-gray-100" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-[#75b06f] text-sm whitespace-nowrap">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Địa chỉ giao hàng</p>
                    <p className="text-sm text-gray-500">{getAddressText(selectedOrder.shipping_address)}</p>
                  </div>
                </div>
              </div>

              {/* Payment + Total */}
              <div className="border rounded-xl overflow-hidden">
                {selectedOrder.payment_method && (
                  <div className="flex justify-between items-center px-4 py-3 border-b">
                    <span className="text-sm text-gray-600">Phương thức thanh toán</span>
                    <span className="text-sm font-semibold text-gray-800">{selectedOrder.payment_method}</span>
                  </div>
                )}
                {selectedOrder.shipping_fee > 0 && (
                  <div className="flex justify-between items-center px-4 py-3 border-b">
                    <span className="text-sm text-gray-600">Phí vận chuyển</span>
                    <span className="text-sm font-semibold text-gray-800">{formatCurrency(selectedOrder.shipping_fee)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center px-4 py-3 bg-[#f0fdf4]">
                  <span className="font-bold text-gray-800">Tổng cộng</span>
                  <span className="text-lg font-bold text-[#75b06f]">{formatCurrency(selectedOrder.total_amount)}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Đóng
              </button>
=======
      {/* Modal chi tiết đơn hàng */}
      {cancelTarget && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center px-4"
          onClick={() => !cancelSubmitting && setCancelTarget(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Hủy đơn hàng</h3>
            <p className="text-sm text-gray-600 mb-4">
              Đơn #{cancelTarget.order_id} — chỉ hủy được khi đơn đang <strong>Chờ xử lý</strong>.
            </p>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lý do hủy</label>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4"
              placeholder="Nhập lý do..."
            />
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                disabled={cancelSubmitting}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
                onClick={() => setCancelTarget(null)}
              >
                Đóng
              </button>
              <button
                type="button"
                disabled={cancelSubmitting}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
                onClick={handleConfirmCancel}
              >
                {cancelSubmitting ? 'Đang xử lý...' : 'Xác nhận hủy'}
              </button>
            </div>
          </div>
        </div>
      )}

      {detailOrder && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
          onClick={() => setDetailOrder(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Chi Tiết Đơn Hàng #{detailOrder.order_id}
                </h2>
                <p className="text-xs text-gray-500">
                  Ngày tạo: {formatDate(detailOrder.order_date)}
                </p>
              </div>
              <button
                onClick={() => setDetailOrder(null)}
                className="text-2xl leading-none text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="px-6 py-4 space-y-4 text-sm">
              {/* Thông tin người nhận */}
              <div className="space-y-2">
                <p className="font-semibold text-gray-800">Thông tin người nhận</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  {/* Địa chỉ bên trái */}
                  <div className="space-y-1">
                    <p className="text-gray-500">Địa chỉ giao hàng</p>
                    <p className="text-gray-800">
                      {detailOrder.shipping_address.full || '—'}
                    </p>
                  </div>
                  {/* Tên + SĐT bên phải */}
                  <div className="space-y-1">
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">Tên người nhận</span>
                      <span className="font-medium text-gray-800">
                        {detailOrder.shipping_name || '—'}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">Số điện thoại</span>
                      <span className="font-medium text-gray-800">
                        {detailOrder.shipping_phone || '—'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sản phẩm */}
              <div className="space-y-2">
                <div className="border rounded-xl overflow-hidden text-sm">
                  <div className="hidden sm:grid sm:grid-cols-[2fr_minmax(90px,auto)_minmax(110px,auto)_minmax(110px,auto)] bg-gray-50 font-semibold px-4 py-2.5 border-b">
                    <span>Sản phẩm</span>
                    <span className="text-center">Đơn giá</span>
                    <span className="text-center">Giảm giá/sp</span>
                    <span className="text-right">Thành tiền</span>
                  </div>
                  {detailOrder.items.map((item, index) => {
                    const linePrice = item.price * item.quantity
                    const lineDiscount = item.discountPerItem || 0
                    return (
                      <div
                        key={index}
                        className="px-3 py-2.5 border-b last:border-b-0 text-sm"
                      >
                        {/* Desktop */}
                        <div className="hidden sm:grid sm:grid-cols-[2fr_minmax(90px,auto)_minmax(110px,auto)_minmax(110px,auto)] items-center gap-2">
                          <div>
                            <div className="font-semibold text-gray-800">{item.name}</div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              Số lượng: {item.quantity}
                            </div>
                          </div>
                          <div className="text-center text-gray-700 whitespace-nowrap">
                            {formatCurrency(item.price)}
                          </div>
                          <div className="text-center text-gray-500 whitespace-nowrap text-xs">
                            {lineDiscount > 0
                              ? `- ${formatCurrency(lineDiscount)}`
                              : 'Không'}
                          </div>
                          <div className="text-right font-semibold text-gray-900 whitespace-nowrap">
                            {formatCurrency(linePrice - lineDiscount * item.quantity)}
                          </div>
                        </div>

                        {/* Mobile */}
                        <div className="sm:hidden space-y-1">
                          <div className="font-semibold text-gray-800">{item.name}</div>
                          <div className="text-xs text-gray-500">
                            Số lượng: {item.quantity}
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span className="text-gray-500">Đơn giá</span>
                            <span className="text-gray-800">
                              {formatCurrency(item.price)}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Giảm giá/sp</span>
                            <span className="text-gray-800">
                              {lineDiscount > 0
                                ? `- ${formatCurrency(lineDiscount)}`
                                : 'Không'}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-700 font-semibold">Thành tiền</span>
                            <span className="text-gray-900 font-semibold">
                              {formatCurrency(linePrice - lineDiscount * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Tổng tiền chi tiết */}
              <div className="border-t pt-3">
                <p className="font-semibold text-gray-800 mb-2">Tổng tiền đơn hàng</p>
                <div className="bg-gray-50 rounded-xl px-4 py-3 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="text-gray-800">
                      {formatCurrency(detailOrder.subtotal ?? detailOrder.total_amount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giảm giá voucher</span>
                    <span className="text-green-700">
                      {detailOrder.discount_amount && detailOrder.discount_amount > 0
                        ? `- ${formatCurrency(detailOrder.discount_amount)}`
                        : '0đ'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="text-gray-800">
                      {formatCurrency(detailOrder.shipping_fee ?? 0)}
                    </span>
                  </div>
                  <div className="h-px bg-gray-200 my-1.5" />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Tổng cộng</span>
                    <span className="font-bold text-lg text-[#75b06f]">
                      {formatCurrency(detailOrder.total_amount)}
                    </span>
                  </div>
                </div>
              </div>

>>>>>>> tri
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default OrdersPage
