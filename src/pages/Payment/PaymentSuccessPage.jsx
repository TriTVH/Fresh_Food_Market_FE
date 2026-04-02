import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import FloatingChatButton from '@/components/common/FloatingChatButton/FloatingChatButton'
import { confirmVnpayPayment } from '@/api/paymentApi'

/** Tránh gọi confirm 2 lần (React Strict Mode dev mount kép dùng chung một Promise). */
const vnpConfirmPromises = new Map()

function getVnpConfirmPromise(params) {
  const key = `${params.vnp_TxnRef}|${params.vnp_ResponseCode}|${params.vnp_Amount}`
  if (!vnpConfirmPromises.has(key)) {
    const p = confirmVnpayPayment(params)
    vnpConfirmPromises.set(key, p)
    p.catch(() => {
      vnpConfirmPromises.delete(key)
    })
  }
  return vnpConfirmPromises.get(key)
}

/**
 * VNPay return URL nên trỏ về /payment/success — query gồm vnp_TxnRef, vnp_ResponseCode, vnp_Amount, ...
 * Trang đọc các tham số và gọi GET /payment/vnpay/confirm để backend xác nhận giao dịch.
 */
export default function PaymentSuccessPage() {
  const [params] = useSearchParams()
  const [confirmMessage, setConfirmMessage] = useState('')
  const [confirmError, setConfirmError] = useState('')

  const vnpTxnRef = params.get('vnp_TxnRef')
  const vnpResponseCode = params.get('vnp_ResponseCode')
  const vnpAmount = params.get('vnp_Amount')
  const hasVnpParams = Boolean(vnpTxnRef && vnpResponseCode != null && vnpAmount != null)

  const [phase, setPhase] = useState(() => (hasVnpParams ? 'loading' : 'done'))

  useEffect(() => {
    if (!hasVnpParams) {
      setPhase('done')
      return
    }

    let cancelled = false
    setPhase('loading')
    setConfirmError('')

    getVnpConfirmPromise({
      vnp_TxnRef: vnpTxnRef,
      vnp_ResponseCode: vnpResponseCode,
      vnp_Amount: vnpAmount,
    })
      .then((data) => {
        if (cancelled) return
        if (data?.success === false) {
          setConfirmError(data?.message || 'Hệ thống không xác nhận được giao dịch.')
          setPhase('error')
          return
        }
        const okMsg = data?.message || 'Giao dịch đã được xác nhận.'
        setConfirmMessage(okMsg)
        setPhase('done')
      })
      .catch((err) => {
        if (cancelled) return
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          'Không xác nhận được giao dịch. Vui lòng kiểm tra đơn hàng hoặc liên hệ hỗ trợ.'
        setConfirmError(msg)
        setPhase('error')
      })

    return () => {
      cancelled = true
    }
  }, [hasVnpParams, vnpTxnRef, vnpResponseCode, vnpAmount])

  const showGenericSuccess = !hasVnpParams && phase === 'done'
  const isPaymentSuccess =
    !hasVnpParams || vnpResponseCode === '00'

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-16 max-w-lg text-center">
        {phase === 'loading' && (
          <>
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-2 border-[#75b06f] border-t-transparent mb-6" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">Đang xác nhận thanh toán</h1>
            <p className="text-gray-600 text-sm">Vui lòng chờ trong giây lát...</p>
          </>
        )}

        {phase !== 'loading' && (
          <>
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                phase === 'error' || (hasVnpParams && !isPaymentSuccess)
                  ? 'bg-amber-100 text-amber-600'
                  : 'bg-green-100 text-green-600'
              }`}
            >
              <FiCheckCircle className="w-10 h-10" />
            </div>

            {phase === 'error' ? (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Không xác nhận được giao dịch</h1>
                <p className="text-gray-600 mb-4">
                  {confirmError}
                </p>
              </>
            ) : hasVnpParams && vnpResponseCode !== '00' ? (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán chưa hoàn tất</h1>
                <p className="text-gray-600 mb-4">
                  Mã phản hồi VNPay: <span className="font-mono font-semibold">{vnpResponseCode}</span>
                  . Giao dịch có thể bị từ chối hoặc đang chờ xử lý.
                </p>
                {confirmMessage && <p className="text-sm text-gray-500 mb-4">{confirmMessage}</p>}
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thành công</h1>
                <p className="text-gray-600 mb-6">
                  {showGenericSuccess
                    ? 'Cảm ơn bạn đã mua hàng tại Fresh Food Market.'
                    : confirmMessage || 'Giao dịch đã được xác nhận. Cảm ơn bạn đã mua hàng tại Fresh Food Market.'}
                </p>
              </>
            )}

            {(vnpTxnRef || params.get('orderId') || params.get('order_id')) && (
              <p className="text-sm text-gray-500 mb-6">
                Mã giao dịch / tham chiếu:{' '}
                <span className="font-mono font-semibold text-gray-800">
                  {vnpTxnRef || params.get('orderId') || params.get('order_id')}
                </span>
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/orders"
                className="inline-flex justify-center items-center px-6 py-3 rounded-xl bg-[#75b06f] text-white font-semibold hover:bg-[#5a9450]"
              >
                Xem đơn hàng
              </Link>
              <Link
                to="/"
                className="inline-flex justify-center items-center px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-white"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </>
        )}
      </div>
      <Footer />
      <FloatingChatButton />
    </div>
  )
}
