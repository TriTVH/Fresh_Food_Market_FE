import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '@components/layout/Header/Header'
import Footer from '@components/layout/Footer/Footer'
import FloatingChatButton from '@components/common/FloatingChatButton/FloatingChatButton'
import { fetchProductDetail } from '@/api/apiService'
import { toast } from 'react-toastify'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cartItems, addToCart } = useCart()
  const { currentUser } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchProductDetail(id)
        setProduct(data)
        setQuantity(1)
      } catch (err) {
        console.error('Failed to load product detail page', err)
        setError('Không tải được thông tin sản phẩm.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const parseDescription = (description) => {
    if (!description || typeof description !== 'string') return []
    const parts = description.split(/\s*\|\s*/)
    return parts.map((part) => {
      const idx = part.indexOf(':')
      if (idx >= 0) {
        return {
          key: part.slice(0, idx).trim(),
          value: part.slice(idx + 1).trim(),
        }
      }
      return { key: '', value: part.trim() }
    }).filter((d) => d.key || d.value)
  }

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const handleIncrease = () => {
    const maxQty = product?.quantity ?? 1
    setQuantity((prev) => Math.min(maxQty, prev + 1))
  }

  const validateStock = () => {
    const available = product?.quantity ?? 0
    const inCart = cartItems.find((item) => item.id === product.productId)?.quantity ?? 0
    const totalRequested = inCart + quantity
    if (available <= 0) {
      toast.error('Sản phẩm hiện đã hết hàng.')
      return false
    }
    if (totalRequested > available) {
      const remain = Math.max(0, available - inCart)
      toast.error(
        remain > 0
          ? `Bạn chỉ có thể thêm tối đa ${remain} sản phẩm nữa (tổng trong giỏ không vượt quá ${available}).`
          : 'Số lượng trong giỏ đã đạt tối đa tồn kho.'
      )
      return false
    }
    return true
  }

  const handleAddToCart = () => {
    if (!product) return
    if (!currentUser) {
      toast.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ.')
      navigate('/login')
      return
    }
    if (!validateStock()) return
    const baseItem = {
      id: product.productId,
      name: product.productName,
      price: product.priceSell ?? 0,
      originalPrice: null,
      image: product.imagesJson?.[0]?.url || '',
      weight: product.weight,
      unit: product.unit,
      origin: product.manufacturingLocation,
      discount: 0,
    }
    addToCart(baseItem, quantity)
    toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ.`)
  }

  const handleBuyNow = () => {
    if (!product) return
    if (!currentUser) {
      toast.error('Vui lòng đăng nhập để mua hàng.')
      navigate('/login')
      return
    }
    if (!validateStock()) return
    const baseItem = {
      id: product.productId,
      name: product.productName,
      price: product.priceSell ?? 0,
      originalPrice: null,
      image: product.imagesJson?.[0]?.url || '',
      weight: product.weight,
      unit: product.unit,
      origin: product.manufacturingLocation,
      discount: 0,
    }
    addToCart(baseItem, quantity)
    navigate('/cart')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 sm:py-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-primary-600 hover:text-primary-700"
        >
          ← Quay lại
        </button>

        {loading && (
          <div className="text-center text-gray-600 py-10">Đang tải thông tin sản phẩm...</div>
        )}

        {error && !loading && (
          <div className="text-center text-red-500 py-10">{error}</div>
        )}

        {!loading && !error && product && (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)] gap-8">
            {/* Left: Image gallery + description */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
              {/* Image gallery */}
              <div className="flex gap-4">
                {/* Thumbnails */}
                <div className="flex flex-col gap-2">
                  {product.imagesJson?.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-16 h-16 sm:w-18 sm:h-18 border rounded-md overflow-hidden bg-gray-50 ${
                        idx === activeImageIdx ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={product.productName}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Main image + arrows */}
                <div className="flex-1 flex items-center justify-center relative">
                  {product.imagesJson?.[activeImageIdx]?.url && (
                    <img
                      src={product.imagesJson[activeImageIdx].url}
                      alt={product.productName}
                      className="w-full max-w-md rounded-2xl object-cover border border-gray-100 shadow-sm"
                    />
                  )}
                  {product.imagesJson && product.imagesJson.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImageIdx(
                            (prev) =>
                              (prev - 1 + product.imagesJson.length) %
                              product.imagesJson.length,
                          )
                        }
                        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center text-gray-600"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImageIdx(
                            (prev) => (prev + 1) % product.imagesJson.length,
                          )
                        }
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center text-gray-600"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Mô tả sản phẩm dưới hình */}
              <div className="pt-4 border-t border-gray-100 space-y-4">
                <h2 className="font-semibold text-gray-900 mb-2">Mô tả sản phẩm:</h2>
                <div className="space-y-1 text-sm text-gray-700">
                  {parseDescription(product.description).map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-gray-400">-</span>
                      <span>
                        {item.key && <span className="font-semibold text-gray-900">{item.key}: </span>}
                        {item.value}
                      </span>
                    </div>
                  ))}
                  {(!product.description || !parseDescription(product.description).length) && (
                    <p className="text-gray-500 italic">Chưa có mô tả chi tiết.</p>
                  )}
                </div>

                {/* Đã bán & đánh giá ở dưới mô tả, hiển thị sao */}
                <div className="pt-5 border-t border-gray-100 space-y-2">
                  <div className="mt-3">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      Đánh giá sản phẩm
                    </h3>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex text-amber-400 text-xl leading-none">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>
                            {i < Math.round(product.ratingAverage ?? 0) ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                      <span className="text-amber-500 font-semibold text-sm">
                        {product.ratingAverage ?? 0}/5
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Đã bán: {product.soldCount ?? 0} • Dựa trên {product.ratingCount ?? 0} đánh giá
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Sticky purchase/summary panel */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-7 space-y-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                  {product.productName}
                </h1>

                {/* Brand / status row */}
                <div className="text-xs sm:text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
                  <span>
                    <span className="font-semibold">Tình trạng:</span>{' '}
                    <span className={product.isAvailable ? 'text-emerald-600' : 'text-red-500'}>
                      {product.isAvailable ? 'Còn hàng' : 'Tạm hết hàng'}
                    </span>
                  </span>
                  <span>
                    <span className="font-semibold">Mã sản phẩm:</span>{' '}
                    <span>{product.productId}</span>
                  </span>
                </div>

                {/* Price row */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary-600">
                    {(product.priceSell ?? 0).toLocaleString('vi-VN')}đ
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.originalPrice.toLocaleString('vi-VN')}đ
                    </span>
                  )}
                </div>

                {/* Quick info */}
                <div className="space-y-1 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">Số lượng còn lại:</span>{' '}
                    <span>{product.quantity ?? 0}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Danh mục:</span>{' '}
                    <span>{product.categoryName} / {product.subCategoryName}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Nơi sản xuất:</span>{' '}
                    <span>{product.manufacturingLocation}</span>
                  </p>
                </div>

                {/* Action buttons */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center border rounded-full overflow-hidden">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      className="w-10 h-10 flex items-center justify-center text-xl text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <div className="flex-1 text-center text-sm font-semibold text-gray-800">
                      {quantity}
                    </div>
                    <button
                      type="button"
                      onClick={handleIncrease}
                      className="w-10 h-10 flex items-center justify-center text-xl text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={product && quantity >= (product.quantity ?? 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full rounded-full border border-primary-600 text-primary-600 font-semibold py-2.5 hover:bg-primary-50 transition"
                  >
                    Thêm vào giỏ
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="w-full rounded-full bg-primary-600 text-white font-semibold py-2.5 hover:bg-primary-700 transition"
                  >
                    Mua ngay
                  </button>
                </div>

                {/* Benefits row */}
                <div className="pt-3 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600">
                  <div>✓ Giao hàng nội thành nhanh</div>
                  <div>✓ Giao hàng toàn quốc với thực phẩm khô</div>
                  <div>✓ Kiểm tra hàng trước khi nhận</div>
                  <div>✓ Đổi trả trong 48 giờ nếu sản phẩm không đạt chất lượng cam kết</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <FloatingChatButton />
    </div>
  )
}

export default ProductDetailPage

