import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiArrowLeft,
  FiTag,
  FiCheckCircle,
  FiMapPin,
  FiPackage,
} from 'react-icons/fi'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

function CartPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
  const [selectedVoucher, setSelectedVoucher] = useState(null)
  const [showVoucherModal, setShowVoucherModal] = useState(false)

  // Mock vouchers
  const MOCK_VOUCHERS = [
    {
      id: 'V001',
      code: 'FRESH10',
      title: 'Giảm 10% cho đơn hàng đầu tiên',
      discount: 10,
      maxDiscount: 50000,
      minOrder: 100000,
    },
    {
      id: 'V002',
      code: 'FRESH20',
      title: 'Giảm 20% cho đơn từ 500K',
      discount: 20,
      maxDiscount: 150000,
      minOrder: 500000,
    },
    {
      id: 'V003',
      code: 'FRESH15',
      title: 'Giảm 15% cho đơn từ 300K',
      discount: 15,
      maxDiscount: 100000,
      minOrder: 300000,
    },
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = subtotal > 0 ? 30000 : 0

  // Calculate voucher discount
  let voucherDiscount = 0
  if (selectedVoucher && subtotal >= selectedVoucher.minOrder) {
    voucherDiscount = Math.min(
      Math.round((subtotal * selectedVoucher.discount) / 100),
      selectedVoucher.maxDiscount
    )
  }

  const total = subtotal + shippingFee - voucherDiscount

  const handleQuantityChange = (id, currentQuantity, change) => {
    const newQuantity = currentQuantity + change
    if (newQuantity > 0 && newQuantity <= 99) {
      updateQuantity(id, newQuantity)
    }
  }

  const handleCheckout = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để thanh toán!')
      navigate('/login')
      return
    }
    // TODO: Navigate to checkout page
    alert('Đặt hàng thành công!')
    clearCart()
  }

  const handleSelectVoucher = (voucher) => {
    if (subtotal < voucher.minOrder) {
      alert(`Đơn hàng tối thiểu ${formatPrice(voucher.minOrder)} để sử dụng voucher này!`)
      return
    }
    setSelectedVoucher(voucher)
    setShowVoucherModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="mb-5 sm:mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#75b06f] transition-colors mb-3 sm:mb-4"
          >
            <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold text-sm sm:text-base">Tiếp Tục Mua Sắm</span>
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Giỏ Hàng Của Bạn
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            {cartItems.length > 0
              ? `Bạn có ${cartItems.length} sản phẩm trong giỏ hàng`
              : 'Giỏ hàng của bạn đang trống'}
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-8 sm:p-12 text-center">
            <div className="inline-flex items-center justify-center bg-gray-100 rounded-full p-4 sm:p-6 mb-4 sm:mb-6">
              <FiShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Giỏ Hàng Trống</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm tươi ngon của
              chúng tôi!
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-[#75b06f] text-white font-semibold py-2.5 px-6 sm:py-3 sm:px-8 rounded-lg hover:bg-[#5a9450] transition-colors text-sm sm:text-base"
            >
              Khám Phá Sản Phẩm
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-2 sm:gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg"
                      />
                      {/* Discount Badge */}
                      {item.discount > 0 && (
                        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-md">
                          <span className="font-bold text-xs sm:text-sm">-{item.discount}%</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 mb-1 text-sm sm:text-base line-clamp-2">
                        {item.name}
                      </h3>
                      {item.weight && item.unit && (
                        <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">
                          {item.weight} {item.unit}
                        </p>
                      )}
                      {item.origin && (
                        <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                          Xuất xứ: {item.origin}
                        </p>
                      )}

                      {/* Price Display */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-base sm:text-lg font-bold text-[#75b06f]">
                          {formatPrice(item.price)}
                        </p>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <p className="text-xs sm:text-sm text-gray-400 line-through">
                            {formatPrice(item.originalPrice)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1 sm:p-2"
                        title="Xóa sản phẩm"
                      >
                        <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>

                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                          className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-[#75b06f] hover:text-[#75b06f] transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="w-8 sm:w-12 text-center font-semibold text-gray-800 text-sm sm:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                          className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-[#75b06f] hover:text-[#75b06f] transition-colors"
                          disabled={item.quantity >= 99}
                        >
                          <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>

                      <p className="font-bold text-gray-800 mt-1 sm:mt-2 text-sm sm:text-base">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 lg:sticky lg:top-24 space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Tổng Đơn Hàng</h2>

                {/* Voucher Section */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FiTag className="w-5 h-5 text-[#75b06f]" />
                      <span className="font-semibold text-gray-800">Mã Giảm Giá</span>
                    </div>
                  </div>

                  {selectedVoucher ? (
                    <div className="bg-gradient-to-r from-[#75b06f]/10 to-green-100 border-2 border-[#75b06f] rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <FiCheckCircle className="w-4 h-4 text-[#75b06f]" />
                            <span className="font-bold text-[#75b06f] text-sm">
                              {selectedVoucher.code}
                            </span>
                          </div>
                          <p className="text-xs text-gray-700 mb-0.5">{selectedVoucher.title}</p>
                          <p className="text-xs text-gray-500">
                            Giảm {selectedVoucher.discount}% (tối đa{' '}
                            {formatPrice(selectedVoucher.maxDiscount)})
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedVoucher(null)}
                          className="text-red-500 hover:text-red-700 text-xs font-semibold ml-2"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowVoucherModal(true)}
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-[#75b06f] hover:text-[#75b06f] transition-colors text-sm font-semibold"
                    >
                      + Chọn hoặc nhập mã giảm giá
                    </button>
                  )}

                  {!selectedVoucher && (
                    <button
                      onClick={() => setShowVoucherModal(true)}
                      className="text-[#75b06f] text-sm font-semibold hover:underline mt-2"
                    >
                      Xem {MOCK_VOUCHERS.length} mã giảm giá khả dụng
                    </button>
                  )}
                </div>

                {/* Price Summary */}
                <div className="space-y-4 border-t pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính:</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển:</span>
                    <span className="font-semibold">{formatPrice(shippingFee)}</span>
                  </div>
                  {voucherDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá:</span>
                      <span className="font-semibold">-{formatPrice(voucherDiscount)}</span>
                    </div>
                  )}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Tổng cộng:</span>
                      <span className="text-[#75b06f]">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Important Note */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <FiPackage className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-bold text-blue-900 text-sm sm:text-base mb-1">
                        Lưu ý quan trọng
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
                        Nhân viên sẽ gọi xác nhận đơn hàng của bạn trong thời gian sớm nhất trong
                        vòng 24 giờ.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-[#75b06f] to-[#5fb558] text-white font-bold py-4 px-6 rounded-xl hover:from-[#5a9450] hover:to-[#4da845] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Đặt Hàng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Voucher Modal */}
        {showVoucherModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
                    Chọn Mã Giảm Giá
                  </h2>
                  <button
                    onClick={() => setShowVoucherModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                  Chọn mã giảm giá phù hợp với đơn hàng của bạn
                </p>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {MOCK_VOUCHERS.map((voucher) => {
                    const isEligible = subtotal >= voucher.minOrder
                    const isSelected = selectedVoucher?.id === voucher.id

                    return (
                      <div
                        key={voucher.id}
                        className={`border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#75b06f] bg-[#75b06f]/5'
                            : isEligible
                              ? 'border-gray-200 hover:border-[#75b06f] hover:shadow-md'
                              : 'border-gray-200 opacity-50 cursor-not-allowed'
                        }`}
                        onClick={() => isEligible && handleSelectVoucher(voucher)}
                      >
                        <div className="flex items-start gap-2 sm:gap-4">
                          {/* Icon */}
                          <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#75b06f] to-green-600 rounded-lg flex items-center justify-center">
                            <FiTag className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1 sm:mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-0.5 sm:mb-1">
                                  {voucher.code}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 line-clamp-2">
                                  {voucher.title}
                                </p>
                              </div>
                              {isSelected && (
                                <FiCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#75b06f] flex-shrink-0 ml-2" />
                              )}
                            </div>

                            <div className="space-y-0.5 sm:space-y-1 text-xs text-gray-500">
                              <p>
                                <span className="font-semibold text-[#75b06f]">
                                  Giảm {voucher.discount}%
                                </span>
                              </p>
                              <p>Giảm tối đa: {formatPrice(voucher.maxDiscount)}</p>
                              <p>
                                Đơn tối thiểu: {formatPrice(voucher.minOrder)}
                                {isEligible && (
                                  <span className="text-green-600 font-semibold ml-1">✓ Đã đạt</span>
                                )}
                              </p>
                            </div>

                            {!isEligible && (
                              <div className="mt-2 text-xs text-red-500 font-semibold">
                                Cần thêm {formatPrice(voucher.minOrder - subtotal)} để áp dụng
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 border-t bg-gray-50">
                <button
                  onClick={() => setShowVoucherModal(false)}
                  className="w-full bg-gray-200 text-gray-700 font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
