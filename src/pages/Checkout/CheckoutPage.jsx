import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import FloatingChatButton from '@/components/common/FloatingChatButton/FloatingChatButton'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import {
  fetchProvinces,
  fetchDistricts,
  fetchWards,
  fetchAvailableServices,
  calculateShippingFee,
} from '@/api/ghnApi'
import { placeOrder } from '@/api/orderApi'
import { toast } from 'react-toastify'

function CheckoutPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser: user } = useAuth()
  const { cartItems, clearCart } = useCart()

  const routeState = location.state || {}
  const selectedVouchersFromCart = routeState.selectedVouchers || []

  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')
  const [detailAddress, setDetailAddress] = useState('')

  const [loadingLocation, setLoadingLocation] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [shippingFee, setShippingFee] = useState(30000)
  const [shippingService, setShippingService] = useState(null)

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        setLoadingLocation(true)
        const res = await fetchProvinces()
        setProvinces(res.data || [])
      } catch (err) {
        console.error('Failed to load provinces', err)
      } finally {
        setLoadingLocation(false)
      }
    }
    loadProvinces()
  }, [])

  useEffect(() => {
    if (!selectedProvince) {
      setDistricts([])
      setSelectedDistrict('')
      return
    }
    const loadDistricts = async () => {
      try {
        setLoadingLocation(true)
        const res = await fetchDistricts(selectedProvince)
        setDistricts(res.data || [])
      } catch (err) {
        console.error('Failed to load districts', err)
      } finally {
        setLoadingLocation(false)
      }
    }
    loadDistricts()
  }, [selectedProvince])

  useEffect(() => {
    if (!selectedDistrict) {
      setWards([])
      setSelectedWard('')
      setShippingService(null)
      setShippingFee(0)
      return
    }
    const loadWards = async () => {
      try {
        setLoadingLocation(true)
        const res = await fetchWards(selectedDistrict)
        setWards(res.data || [])
      } catch (err) {
        console.error('Failed to load wards', err)
      } finally {
        setLoadingLocation(false)
      }
    }
    loadWards()
  }, [selectedDistrict])

  useEffect(() => {
    const calcFee = async () => {
      if (!selectedDistrict || !selectedWard || cartItems.length === 0) {
        setShippingService(null)
        setShippingFee(0)
        return
      }

      try {
        const totalWeight = cartItems.reduce(
          (sum, item) => sum + (item.weight || 500) * item.quantity,
          0
        )

        const servicesRes = await fetchAvailableServices(selectedDistrict)
        const services = servicesRes.data || []
        const hangNhe =
          services.find((s) => s.short_name?.toLowerCase().includes('nhẹ')) || services[0]

        if (!hangNhe) {
          setShippingService(null)
          setShippingFee(0)
          return
        }

        setShippingService(hangNhe)

        const feeRes = await calculateShippingFee({
          serviceId: hangNhe.service_id,
          toDistrictId: selectedDistrict,
          toWardCode: selectedWard,
          weight: totalWeight,
        })

        const fee = feeRes.data?.total || feeRes.data?.service_fee || 0
        setShippingFee(fee)
      } catch (err) {
        console.error('Failed to calculate shipping fee', err)
        setShippingService(null)
        setShippingFee(0)
      }
    }

    calcFee()
  }, [selectedDistrict, selectedWard, cartItems])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const applicableVouchers = (selectedVouchersFromCart || []).filter(
    (v) => subtotal >= v.minOrder
  )

  const voucherDiscountDetails = applicableVouchers.map((v) => {
    const raw = Math.round((subtotal * v.discount) / 100)
    const capped = v.maxDiscount && v.maxDiscount > 0 ? Math.min(raw, v.maxDiscount) : raw
    return { ...v, discountAmount: capped }
  })

  const voucherDiscountRaw = voucherDiscountDetails.reduce(
    (sum, v) => sum + v.discountAmount,
    0
  )

  const voucherDiscount = Math.min(voucherDiscountRaw, subtotal)
  const total = Math.max(0, subtotal + shippingFee - voucherDiscount)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    if (!selectedProvince || !selectedDistrict || !selectedWard) {
      alert('Vui lòng chọn đầy đủ Tỉnh/Thành, Quận/Huyện và Phường/Xã.')
      return
    }

    try {
      setSubmitting(true)
      const provinceName = provinces.find((p) => String(p.ProvinceID) === String(selectedProvince))?.ProvinceName
      const districtName = districts.find((d) => String(d.DistrictID) === String(selectedDistrict))?.DistrictName
      const wardName = wards.find((w) => String(w.WardCode) === String(selectedWard))?.WardName

      const parts = []
      if (detailAddress.trim()) parts.push(detailAddress.trim())
      if (wardName) parts.push(wardName)
      if (districtName) parts.push(districtName)
      if (provinceName) parts.push(provinceName)

      const shippingAddress = parts.join(', ')

      const shippingName =
        user.fullName || user.name || user.username || user.phone || 'Khách hàng'
      const shippingPhone = user.phone || ''

      const paymentMethodApi = paymentMethod === 'BANKING' ? 'ONLINE' : 'COD'

      const orderData = {
        voucherIds: applicableVouchers.map((v) => v.id),
        shippingName,
        shippingPhone,
        shippingAddress,
        shippingFee,
        paymentMethod: paymentMethodApi,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          discount: 0,
        })),
      }

      const response = await placeOrder(orderData)

      const ok =
        response?.statusCode === 201 ||
        response?.status === 201 ||
        response?.success === true

      if (!ok) {
        toast.error(response?.message || 'Đặt hàng thất bại.')
        return
      }

      const rawData = response?.data
      const paymentUrl =
        typeof rawData === 'string'
          ? rawData
          : rawData && typeof rawData?.paymentUrl === 'string'
            ? rawData.paymentUrl
            : null

      if (paymentMethodApi === 'ONLINE' && paymentUrl) {
        toast.success(response.message || 'Đang chuyển đến cổng thanh toán...')
        clearCart()
        window.location.href = paymentUrl
        return
      }

      toast.success(response.message || 'Đặt hàng thành công.')
      clearCart()
      navigate('/orders')
    } catch (err) {
      toast.error('Có lỗi xảy ra khi đặt hàng: ' + (err?.message || ''))
    } finally {
      setSubmitting(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-10 text-center">
          <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-[#75b06f] text-white px-6 py-2 rounded-lg font-semibold"
          >
            Quay lại mua sắm
          </button>
        </div>
        <Footer />
        <FloatingChatButton />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#75b06f] transition-colors text-sm sm:text-base"
          >
            <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold">Tiếp Tục Mua Sắm</span>
          </button>
        </div>
        <div className="space-y-4">
          <form
            id="checkout-form"
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 space-y-6"
          >
            <h2 className="text-lg font-semibold mb-2">Địa Chỉ Giao Hàng</h2>

            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Tỉnh / Thành phố</label>
                <select
                  value={selectedProvince}
                  onChange={(e) => {
                    const value = e.target.value
                    setSelectedProvince(value)
                    // reset các cấp dưới khi đổi tỉnh
                    setSelectedDistrict('')
                    setSelectedWard('')
                    setDistricts([])
                    setWards([])
                    setShippingService(null)
                    setShippingFee(0)
                  }}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Chọn tỉnh / thành</option>
                  {provinces.map((p) => (
                    <option key={p.ProvinceID} value={p.ProvinceID}>
                      {p.ProvinceName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Quận / Huyện</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  disabled={!selectedProvince}
                >
                  <option value="">Chọn quận / huyện</option>
                  {districts.map((d) => (
                    <option key={d.DistrictID} value={d.DistrictID}>
                      {d.DistrictName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phường / Xã</label>
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  disabled={!selectedDistrict}
                >
                  <option value="">Chọn phường / xã</option>
                  {wards.map((w) => (
                    <option key={w.WardCode} value={w.WardCode}>
                      {w.WardName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Địa chỉ chi tiết</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Số nhà, tên đường..."
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
              />
            </div>

            {loadingLocation && <p className="text-xs text-gray-500">Đang tải dữ liệu địa chỉ...</p>}

          </form>

          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold mb-3">Tóm Tắt Đơn Hàng</h2>
            <div className="max-h-72 overflow-y-auto mb-4 text-xs sm:text-sm border rounded-xl shadow-inner">
              <table className="w-full border-collapse table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left font-semibold px-4 py-2.5 border-b w-1/2">Sản phẩm</th>
                    <th className="text-right font-semibold px-3 py-2.5 border-b w-1/6">Đơn giá</th>
                    <th className="text-center font-semibold px-3 py-2.5 border-b w-1/6">
                      Giảm giá/sp
                    </th>
                    <th className="text-right font-semibold px-4 py-2.5 border-b w-1/6">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => {
                    const linePrice = item.price * item.quantity
                    const lineDiscount = 0 // hiện chưa có giảm giá theo sản phẩm
                    return (
                      <tr key={item.id} className="odd:bg-white even:bg-gray-50/60">
                        <td className="px-4 py-3 border-b align-middle">
                          <div className="font-medium text-gray-900 break-words whitespace-normal">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-gray-500 mt-0.5">Số lượng: {item.quantity}</div>
                        </td>
                        <td className="px-3 py-3 border-b text-right align-middle whitespace-nowrap text-gray-700">
                          {formatPrice(item.price)}
                        </td>
                        <td className="px-3 py-3 border-b text-center align-middle whitespace-nowrap">
                          {lineDiscount > 0 ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-50 text-[11px] font-semibold text-green-700">
                              - {formatPrice(lineDiscount)}
                            </span>
                          ) : (
                            <span className="text-[11px] text-gray-400">Không</span>
                          )}
                        </td>
                        <td className="px-4 py-3 border-b text-right align-middle whitespace-nowrap font-semibold text-gray-900">
                          {formatPrice(linePrice)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="border-t pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Tạm tính</span>
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

              <div className="flex justify-between">
                <span>
                  Phí vận chuyển
                </span>
                <span>{formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-2">
                <span>Tổng cộng</span>
                <span className="text-[#75b06f]">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
          <h3 className="text-md font-semibold mb-3">Phương thức thanh toán</h3>
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Thanh toán khi nhận hàng (COD)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="BANKING"
                checked={paymentMethod === 'BANKING'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Chuyển khoản ngân hàng</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            form="checkout-form"
            disabled={submitting}
            className="min-w-[220px] bg-[#75b06f] text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-[#5a9450] disabled:opacity-60"
          >
            {submitting ? 'Đang đặt hàng...' : 'Xác nhận đặt hàng'}
          </button>
        </div>
      </div>
      <Footer />
      <FloatingChatButton />
    </div>
  )
}

export default CheckoutPage

