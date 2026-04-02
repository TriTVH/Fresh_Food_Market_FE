import { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { FiXCircle } from 'react-icons/fi'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import FloatingChatButton from '@/components/common/FloatingChatButton/FloatingChatButton'

function formatVnpAmount(raw) {
  if (raw == null || raw === '') return null
  const n = Number(raw)
  if (Number.isNaN(n)) return String(raw)
  // VNPay thường truyền số tiền * 100 (không phần thập phân)
  const vnd = n >= 1000 && n % 100 === 0 ? n / 100 : n
  return new Intl.NumberFormat('vi-VN').format(vnd) + 'đ'
}

/**
 * Trang thất bại: query từ cổng (reason, message) hoặc tham số VNPay (vnp_TxnRef, vnp_ResponseCode, ...).
 * Cấu hình VNPay có thể trỏ return URL lỗi về /payment/failure.
 */
export default function PaymentFailurePage() {
  const [params] = useSearchParams()
  const reason = params.get('reason') || params.get('message')

  const vnpInfo = useMemo(() => {
    const ref = params.get('vnp_TxnRef')
    const code = params.get('vnp_ResponseCode')
    const amt = params.get('vnp_Amount')
    if (!ref && !code && !amt) return null
    return {
      txnRef: ref,
      responseCode: code,
      amountLabel: formatVnpAmount(amt),
    }
  }, [params])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-16 max-w-lg text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6">
          <FiXCircle className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán không thành công</h1>
        <p className="text-gray-600 mb-4">
          Giao dịch chưa hoàn tất hoặc đã bị hủy. Bạn có thể thử lại hoặc chọn phương thức khác.
        </p>
        {reason && (
          <p className="text-sm text-red-700 bg-red-50 rounded-lg px-4 py-2 mb-6 inline-block max-w-full">
            {decodeURIComponent(reason)}
          </p>
        )}
        {vnpInfo && (
          <div className="text-left text-sm bg-gray-100 rounded-xl px-4 py-3 mb-6 space-y-1">
            <p className="font-semibold text-gray-800 mb-2">Thông tin giao dịch (VNPay)</p>
            {vnpInfo.txnRef && (
              <p>
                <span className="text-gray-500">Mã tham chiếu: </span>
                <span className="font-mono font-medium text-gray-900">{vnpInfo.txnRef}</span>
              </p>
            )}
            {vnpInfo.responseCode != null && (
              <p>
                <span className="text-gray-500">Mã phản hồi: </span>
                <span className="font-mono font-medium text-gray-900">{vnpInfo.responseCode}</span>
              </p>
            )}
            {vnpInfo.amountLabel && (
              <p>
                <span className="text-gray-500">Số tiền (theo cổng): </span>
                <span className="font-medium text-gray-900">{vnpInfo.amountLabel}</span>
              </p>
            )}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/checkout"
            className="inline-flex justify-center items-center px-6 py-3 rounded-xl bg-[#75b06f] text-white font-semibold hover:bg-[#5a9450]"
          >
            Thử lại thanh toán
          </Link>
          <Link
            to="/cart"
            className="inline-flex justify-center items-center px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-white"
          >
            Về giỏ hàng
          </Link>
        </div>
      </div>
      <Footer />
      <FloatingChatButton />
    </div>
  )
}
