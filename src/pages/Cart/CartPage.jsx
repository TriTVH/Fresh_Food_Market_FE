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
import { placeOrder } from '@/api/orderApi'
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
  const [selectedVoucher, setSelectedVoucher] = useState(null)
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
  const shippingFee = subtotal > 0 ? 30000 : 0

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

  const handleCheckout = async () => {
    if (!user) {
      setIsLoginModalOpen(true)
      return
    }
    
    try {
        const orderData = {
           userId: user.phone || user.username,
           paymentMethod: "COD",
           paymentStatus: "PENDING",
           items: cartItems.map(item => ({
               productId: item.id,
               productName: item.name,
               quantity: item.quantity,
               price: item.price,
               subTotal: item.price * item.quantity
           }))
        }
        
        const response = await placeOrder(orderData);
        if (response) {
            setIsSuccessModalOpen(true);
            clearCart();
        }
    } catch (err) {
        alert('Có lỗi xảy ra khi đặt hàng: ' + err.message);
    }
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
                  {selectedVoucher ? (
                    <div className="bg-green-50 border-2 border-[#75b06f] rounded-lg p-3 flex justify-between">
                      <div>
                        <p className="font-bold text-[#75b06f]">{selectedVoucher.code}</p>
                        <p className="text-xs text-gray-500">Giảm {selectedVoucher.discount}% (Tối đa {formatPrice(selectedVoucher.maxDiscount)})</p>
                      </div>
                      <button onClick={() => setSelectedVoucher(null)} className="text-red-500 text-xs">Xóa</button>
                    </div>
                  ) : (
                    <button onClick={() => setShowVoucherModal(true)} className="w-full border-2 border-dashed rounded-lg p-3 text-sm text-gray-500">+ Chọn mã giảm giá</button>
                  )}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm"><span>Tạm tính:</span><span>{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between text-sm"><span>Phí vận chuyển:</span><span>{formatPrice(shippingFee)}</span></div>
                  {voucherDiscount > 0 && <div className="flex justify-between text-sm text-green-600"><span>Giảm giá:</span><span>-{formatPrice(voucherDiscount)}</span></div>}
                  <div className="flex justify-between text-lg font-bold border-t pt-2"><span>Tổng cộng:</span><span className="text-[#75b06f]">{formatPrice(total)}</span></div>
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
                {isLoadingVouchers ? <p className="text-center">Đang tải...</p> : vouchers.map(v => (
                  <div key={v.id} onClick={() => subtotal >= v.minOrder && handleSelectVoucher(v)} className={`border-2 rounded-xl p-4 cursor-pointer ${selectedVoucher?.id === v.id ? 'border-[#75b06f] bg-green-50' : subtotal >= v.minOrder ? 'border-gray-200' : 'opacity-50'}`}>
                    <div className="flex justify-between">
                      <p className="font-bold text-lg">{v.code}</p>
                      {selectedVoucher?.id === v.id && <FiCheckCircle className="text-[#75b06f]" />}
                    </div>
                    <p className="text-sm text-gray-500">{v.title}</p>
                    <p className="text-xs text-[#75b06f] font-bold mt-1">Giảm {v.discount}% (Đơn từ {formatPrice(v.minOrder)})</p>
                  </div>
                ))}
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
