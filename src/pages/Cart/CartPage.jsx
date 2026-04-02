import { useState, useEffect } from 'react'
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
import { fetchVouchers } from '@/api/voucherApi'
import { mapVoucherToFrontend } from '@/utils/mapper'
import LoginAlertModal from '@/components/common/LoginAlertModal/LoginAlertModal'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import FloatingChatButton from '@/components/common/FloatingChatButton/FloatingChatButton'

function CartPage() {
  const navigate = useNavigate()
  const { currentUser: user } = useAuth()
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
  const [selectedVouchers, setSelectedVouchers] = useState([])
  const [showVoucherModal, setShowVoucherModal] = useState(false)
  const [vouchers, setVouchers] = useState([])
  const [isLoadingVouchers, setIsLoadingVouchers] = useState(false)
  const [voucherLoadError, setVoucherLoadError] = useState(null)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  useEffect(() => {
    if (!showVoucherModal) return

    const loadVouchers = async () => {
      setIsLoadingVouchers(true)
      setVoucherLoadError(null)
      try {
        const response = await fetchVouchers()
        if (response?.success && Array.isArray(response.data)) {
          setVouchers(response.data.map(mapVoucherToFrontend))
        } else {
          setVouchers([])
        }
      } catch (err) {
        console.error('Failed to load vouchers', err)
        setVoucherLoadError('Không tải được danh sách mã giảm giá.')
        setVouchers([])
      } finally {
        setIsLoadingVouchers(false)
      }
    }

    loadVouchers()
  }, [showVoucherModal])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const applicableVouchers = selectedVouchers.filter((v) => subtotal >= v.minOrder)

  const voucherDiscountDetails = applicableVouchers.map((v) => {
    const raw = Math.round((subtotal * v.discount) / 100)
    const capped = v.maxDiscount && v.maxDiscount > 0 ? Math.min(raw, v.maxDiscount) : raw
    return { ...v, discountAmount: capped }
  })

  const voucherDiscountRaw = voucherDiscountDetails.reduce((sum, v) => sum + v.discountAmount, 0)

  const voucherDiscount = Math.min(voucherDiscountRaw, subtotal)
  const total = Math.max(0, subtotal - voucherDiscount)

  const handleQuantityChange = (id, currentQuantity, change) => {
    const newQuantity = currentQuantity + change
    if (newQuantity > 0 && newQuantity <= 99) {
      updateQuantity(id, newQuantity)
    }
  }

  const handleCheckout = () => {
    if (!user) {
      setIsLoginModalOpen(true)
      return
    }
    if (voucherDiscountRaw > subtotal) {
      alert('Tổng giảm giá từ mã không được lớn hơn tạm tính. Vui lòng bỏ bớt mã giảm giá.')
      return
    }
    navigate('/checkout', {
      state: {
        selectedVouchers,
      },
    })
  }

  const toggleVoucherSelection = (voucher) => {
    if (subtotal < voucher.minOrder) {
      alert(`Đơn hàng tối thiểu ${formatPrice(voucher.minOrder)} để sử dụng voucher này!`)
      return
    }
    setSelectedVouchers((prev) => {
      const exists = prev.some((v) => v.id === voucher.id)
      if (exists) {
        // bỏ chọn
        return prev.filter((v) => v.id !== voucher.id)
      }

      // thử cộng thêm voucher mới, nếu tổng giảm > subtotal thì không cho chọn
      const tempVouchers = [...prev, voucher]
      const tempApplicable = tempVouchers.filter((v) => subtotal >= v.minOrder)
      const tempTotalDiscount = tempApplicable.reduce((sum, v) => {
        const raw = Math.round((subtotal * v.discount) / 100)
        const capped = v.maxDiscount && v.maxDiscount > 0 ? Math.min(raw, v.maxDiscount) : raw
        return sum + capped
      }, 0)

      if (tempTotalDiscount > subtotal) {
        alert('Tổng giảm giá từ mã không được lớn hơn tạm tính.')
        return prev
      }

      return tempVouchers
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-5 sm:mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#75b06f] transition-colors mb-3 sm:mb-4"
          >
            <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold text-sm sm:text-base">Tiếp Tục Mua Sắm</span>
          </button>
          
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-8 sm:p-12 text-center">
            <div className="inline-flex items-center justify-center bg-gray-100 rounded-full p-4 sm:p-6 mb-4 sm:mb-6">
              <FiShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Giỏ Hàng Trống</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm tươi ngon của chúng tôi!
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
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-6">
                  <div className="flex gap-2 sm:gap-4">
                    <div className="flex-shrink-0 relative">
                      <img src={item.image} alt={item.name} className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-1 line-clamp-2">{item.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">{item.weight} {item.unit}</p>
                      <p className="text-base sm:text-lg font-bold text-[#75b06f] mt-1">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 p-1"><FiTrash2 /></button>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleQuantityChange(item.id, item.quantity, -1)} className="w-7 h-7 border rounded">-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, item.quantity, 1)} className="w-7 h-7 border rounded">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 sticky top-24 space-y-4">
                <h2 className="text-lg font-bold">Tổng Đơn Hàng</h2>
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FiTag className="text-[#75b06f]" />
                    <span className="font-semibold">Mã Giảm Giá</span>
                  </div>
                  {selectedVouchers.length > 0 ? (
                    <div className="space-y-2">
                      <div className="space-y-1">
                        {selectedVouchers.map((v) => (
                          <div
                            key={v.id}
                            className="bg-green-50 border-2 border-[#75b06f] rounded-lg p-3 flex justify-between items-center"
                          >
                            <div>
                              <p className="font-bold text-[#75b06f] text-sm">{v.code}</p>
                              <p className="text-xs text-gray-600">
                                Giảm {v.discount}% (Đơn từ {formatPrice(v.minOrder)}
                                {v.maxDiscount ? `, tối đa ${formatPrice(v.maxDiscount)}` : ''})
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                setSelectedVouchers((prev) => prev.filter((x) => x.id !== v.id))
                              }
                              className="text-red-500 text-xs"
                            >
                              Xóa
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <button
                          onClick={() => setSelectedVouchers([])}
                          className="text-xs text-gray-500 underline"
                        >
                          Xóa tất cả
                        </button>
                        <button
                          onClick={() => setShowVoucherModal(true)}
                          className="text-xs text-[#75b06f] font-semibold"
                        >
                          + Thêm mã khác
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowVoucherModal(true)}
                      className="w-full border-2 border-dashed rounded-lg p-3 text-sm text-gray-500"
                    >
                      + Chọn mã giảm giá
                    </button>
                  )}
                </div>
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {voucherDiscountDetails.length > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-green-700 font-medium">
                        <span>Giảm giá từ mã:</span>
                        <span>-{formatPrice(voucherDiscount)}</span>
                      </div>
                      <div className="bg-green-50 border border-green-100 rounded-lg p-2 space-y-1 text-xs">
                        {voucherDiscountDetails.map((v) => (
                          <div key={v.id} className="flex justify-between">
                            <span className="font-semibold">{v.code}</span>
                            <span>-{formatPrice(v.discountAmount)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Tổng cộng:</span>
                    <span className="text-[#75b06f]">{formatPrice(total)}</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg flex gap-3">
                  <FiPackage className="text-blue-600 mt-1" />
                  <p className="text-xs text-blue-700">Nhân viên sẽ gọi xác nhận đơn hàng của bạn trong vòng 24 giờ.</p>
                </div>
                <button onClick={handleCheckout} className="w-full bg-[#75b06f] text-white font-bold py-4 rounded-xl shadow-lg">Đặt Hàng</button>
              </div>
            </div>
          </div>
        )}

        {/* Voucher Modal */}
        {showVoucherModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Chọn Mã Giảm Giá</h2>
                <button onClick={() => setShowVoucherModal(false)} className="text-2xl">×</button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {isLoadingVouchers ? (
                  <p className="text-center">Đang tải...</p>
                ) : vouchers.length === 0 ? (
                  <p className="text-center text-sm text-gray-500">Không có mã giảm giá khả dụng.</p>
                ) : (
                  vouchers.map((v) => {
                    const disabled = subtotal < v.minOrder
                    const isSelected = selectedVouchers.some((sv) => sv.id === v.id)
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => !disabled && toggleVoucherSelection(v)}
                        className={`w-full text-left border-2 rounded-xl p-4 cursor-pointer transition ${
                          disabled
                            ? 'opacity-50 cursor-not-allowed'
                            : isSelected
                            ? 'border-[#75b06f] bg-green-50'
                            : 'border-gray-200 hover:border-[#75b06f]/70'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-lg">{v.code}</p>
                          {isSelected && <FiCheckCircle className="text-[#75b06f]" />}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{v.title}</p>
                        <p className="text-xs text-[#75b06f] font-semibold mt-1">
                          Giảm {v.discount}% (Đơn từ {formatPrice(v.minOrder)}
                          {v.maxDiscount ? `, tối đa ${formatPrice(v.maxDiscount)}` : ''})
                        </p>
                        {disabled && (
                          <p className="text-[11px] text-red-500 mt-1">
                            Đơn hàng tối thiểu {formatPrice(v.minOrder)} để áp dụng mã này.
                          </p>
                        )}
                      </button>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {isSuccessModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Đặt Hàng Thành Công!</h2>
              <p className="text-gray-600 mb-8">Cảm ơn bạn đã tin tưởng Fresh Market. Đơn hàng của bạn đang được xử lý.</p>
              <div className="space-y-3">
                <button onClick={() => navigate('/orders')} className="w-full bg-[#75b06f] text-white font-bold py-3.5 rounded-xl">Xem Lịch Sử Đơn Hàng</button>
                <button onClick={() => navigate('/')} className="w-full bg-gray-50 text-gray-600 font-bold py-3.5 rounded-xl">Quay Lại Trang Chủ</button>
              </div>
            </div>
          </div>
        )}

        {/* Login Alert Modal */}
        <LoginAlertModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={() => navigate('/login')} />
      </div>
      <Footer />
      <FloatingChatButton />
    </div>
  )
}

export default CartPage
