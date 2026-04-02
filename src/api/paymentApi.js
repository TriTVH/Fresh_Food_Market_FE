import axiosClient from './axiosClient'

/**
 * Xác nhận giao dịch VNPay sau khi cổng redirect về (query từ return URL).
 * GET /payment/vnpay/confirm?vnp_TxnRef=&vnp_ResponseCode=&vnp_Amount=
 */
export const confirmVnpayPayment = async ({ vnp_TxnRef, vnp_ResponseCode, vnp_Amount }) => {
  // axiosClient interceptor trả về sẵn body `response.data`
  return axiosClient.get('/payment/vnpay/confirm', {
    params: {
      vnp_TxnRef,
      vnp_ResponseCode,
      vnp_Amount,
    },
  })
}
