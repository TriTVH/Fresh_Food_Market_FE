import { useState } from 'react'
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

// Mock orders data
const mockOrders = [
  {
    order_id: 'ORD001',
    order_date: '2026-01-14T10:30:00',
    status: 'success',
    total_amount: 198000,
    items: [
      {
        id: '1',
        name: 'Cải Kale Hữu Cơ',
        image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&q=80',
        price: 45000,
        quantity: 2,
      },
      {
        id: '2',
        name: 'Cà Chua Bi',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80',
        price: 35000,
        quantity: 2,
      },
    ],
    shipping_address: {
      street: '47 Trần Hưng Đạo',
      ward: 'Bà Rịa',
      city: 'Thành Phố Hồ Chí Minh',
      province: 'Hồ Chí Minh',
    },
    payment_method: 'COD',
    shipping_fee: 30000,
  },
  {
    order_id: 'ORD002',
    order_date: '2026-01-13T15:45:00',
    status: 'shipping',
    total_amount: 285000,
    items: [
      {
        id: '3',
        name: 'Nấm Portobello',
        image: 'https://images.unsplash.com/photo-1621264448270-9ef00e88a935?w=400&q=80',
        price: 65000,
        quantity: 3,
      },
    ],
    shipping_address: {
      street: '47 Phạm Ngọc Thạch',
      ward: 'Bà Rịa',
      city: 'Thành Phố Hồ Chí Minh',
      province: 'Hồ Chí Minh',
    },
    payment_method: 'ONLINE',
    shipping_fee: 30000,
  },
  {
    order_id: 'ORD003',
    order_date: '2026-01-12T09:20:00',
    status: 'packing',
    total_amount: 520000,
    items: [
      {
        id: '4',
        name: 'Táo Gala',
        image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80',
        price: 85000,
        quantity: 2,
      },
      {
        id: '5',
        name: 'Nho Xanh Không Hạt',
        image: 'https://images.unsplash.com/photo-1599819177626-c0f1d5f6f17c?w=400&q=80',
        price: 120000,
        quantity: 2,
      },
    ],
    shipping_address: {
      street: '47 Trần Hưng Đạo',
      ward: 'Bà Rịa',
      city: 'Thành Phố Hồ Chí Minh',
      province: 'Hồ Chí Minh',
    },
    payment_method: 'COD',
    discount: 50000,
    shipping_fee: 30000,
  },
  {
    order_id: 'ORD004',
    order_date: '2026-01-11T14:10:00',
    status: 'failed',
    total_amount: 195000,
    items: [
      {
        id: '6',
        name: 'Cà Rốt',
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
        price: 25000,
        quantity: 3,
      },
    ],
    shipping_address: {
      street: '47 Phạm Ngọc Thạch',
      ward: 'Bà Rịa',
      city: 'Thành Phố Hồ Chí Minh',
      province: 'Hồ Chí Minh',
    },
    payment_method: 'ONLINE',
    shipping_fee: 30000,
    cancel_reason: 'Muốn thay đổi địa chỉ giao hàng',
  },
  {
    order_id: 'ORD005',
    order_date: '2026-01-14T16:20:00',
    status: 'pending',
    total_amount: 320000,
    items: [
      {
        id: '7',
        name: 'Bơ Hass',
        image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&q=80',
        price: 95000,
        quantity: 2,
      },
    ],
    shipping_address: {
      street: '47 Trần Hưng Đạo',
      ward: 'Bà Rịa',
      city: 'Thành Phố Hồ Chí Minh',
      province: 'Hồ Chí Minh',
    },
    payment_method: 'ONLINE',
    shipping_fee: 30000,
  },
]

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
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredOrders =
    selectedStatus === 'all'
      ? mockOrders
      : mockOrders.filter((order) => order.status === selectedStatus)

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
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount)
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
              Tất Cả ({mockOrders.length})
            </button>
            {Object.entries(statusConfig).map(([status, config]) => {
              const count = mockOrders.filter((o) => o.status === status).length
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
        {filteredOrders.length === 0 ? (
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
              const config = statusConfig[order.status]
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
                      {order.items.map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                            <p className="text-[#75b06f] font-semibold">
                              {formatCurrency(item.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Info */}
                    <div className="mt-6 pt-6 border-t border-gray-200 grid sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <FiMapPin className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Địa chỉ giao hàng</p>
                          <p className="text-sm text-gray-600">
                            {order.shipping_address.street}, {order.shipping_address.ward},{' '}
                            {order.shipping_address.city}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FiCreditCard className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Thanh toán</p>
                          <p className="text-sm text-gray-600">{order.payment_method}</p>
                        </div>
                      </div>
                    </div>

                    {/* Cancel Reason */}
                    {order.cancel_reason && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm font-semibold text-red-800">Lý do hủy:</p>
                        <p className="text-sm text-red-600">{order.cancel_reason}</p>
                      </div>
                    )}

                    {/* Total */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-800">Tổng cộng:</span>
                        <span className="text-2xl font-bold text-[#75b06f]">
                          {formatCurrency(order.total_amount)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex gap-3">
                      <button className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                        Xem Chi Tiết
                      </button>
                      {order.status === 'success' && (
                        <button className="flex-1 bg-[#75b06f] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#5a9450] transition-colors">
                          Mua Lại
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default OrdersPage
