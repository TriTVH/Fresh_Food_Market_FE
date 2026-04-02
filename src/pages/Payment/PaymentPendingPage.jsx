import { useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import FloatingChatButton from '@/components/common/FloatingChatButton/FloatingChatButton'

function formatPrice(n) {
  return new Intl.NumberFormat('vi-VN').format(Number(n) || 0) + 'đ'
}

/**
 * Sau khi chọn chuyển khoản ở checkout: không gọi API tạo đơn.
 * Trang này hiển thị thông tin nháp + hướng dẫn; khi tích hợp cổng thanh toán,
 * redirect từ cổng sẽ dẫn tới /payment/success hoặc /payment/failure.
 */
export default function PaymentPendingPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const data = useMemo(() => {
    const fromState = location.state
    if (fromState?.orderDraft) return fromState
    return null
  }, [location.state])

  useEffect(() => {
    if (!data?.orderDraft) {
      navigate('/checkout', { replace: true })
    }
  }, [data, navigate])

  if (!data?.orderDraft) {
    return null
  }

  const { orderDraft, display, lineItems = [] } = data
  const total = display?.total ?? 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <button
          type="button"
          onClick={() => navigate('/checkout')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#75b06f] mb-6 text-sm font-medium"
        >
          <FiArrowLeft /> Quay lại thanh toán
        </button>

        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Chờ thanh toán chuyển khoản</h1>
            <p className="text-sm text-gray-600 mt-2">
              Đơn hàng <strong>chưa được tạo</strong> trên hệ thống cho đến khi thanh toán được xác nhận.
              Sau khi tích hợp cổng thanh toán, bạn sẽ được chuyển về trang kết quả tương ứng.
            </p>
          </div>

          <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 text-sm text-amber-900">
            <p className="font-semibold mb-1">Số tiền cần chuyển</p>
            <p className="text-2xl font-bold text-[#75b06f]">{formatPrice(total)}</p>
          </div>

          {orderDraft.shippingAddress && (
            <div className="text-sm">
              <span className="text-gray-500">Địa chỉ giao hàng: </span>
              <span className="text-gray-900">{orderDraft.shippingAddress}</span>
            </div>
          )}

          {lineItems.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2">Sản phẩm</p>
              <ul className="text-sm text-gray-700 space-y-1 border rounded-lg divide-y">
                {lineItems.map((it) => (
                  <li key={it.id} className="px-3 py-2 flex justify-between gap-2">
                    <span className="truncate">{it.name}</span>
                    <span className="shrink-0 text-gray-600">
                      ×{it.quantity} · {formatPrice(it.price * it.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
            <p className="font-medium text-gray-800 mb-1">Hướng dẫn chuyển khoản</p>
            <p>
              Thông tin tài khoản và mã tham chiếu sẽ được cấu hình khi kết nối cổng thanh toán / ngân
              hàng. Vui lòng hoàn tất chuyển khoản đúng số tiền phía trên.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium"
            >
              Về trang chủ
            </button>
            <button
              type="button"
              onClick={() => navigate('/orders')}
              className="px-4 py-2 rounded-lg bg-[#75b06f] text-white text-sm font-semibold hover:bg-[#5a9450]"
            >
              Đơn hàng của tôi
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingChatButton />
    </div>
  )
}
