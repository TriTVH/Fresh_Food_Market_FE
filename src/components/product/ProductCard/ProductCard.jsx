import { FiShoppingCart, FiStar } from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import LoginAlertModal from '@components/common/LoginAlertModal/LoginAlertModal'
import { useNavigate } from 'react-router-dom'

function ProductCard({ product }) {
  const { currentUser } = useAuth()
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [showLoginAlert, setShowLoginAlert] = useState(false)

  const handleAddToCart = () => {
    if (!currentUser) {
      setShowLoginAlert(true)
      return
    }

    addToCart(product)
    // Show success toast (can implement later)
    console.log('Added to cart:', product.name)
  }

  return (
    <>
      <div className="group relative bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full z-10">
            <span className="font-semibold text-xs sm:text-sm">-{product.discount}%</span>
          </div>
        )}

        {/* Organic Badge */}
        {product.isOrganic && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-green-500 text-white px-2 py-0.5 sm:px-2 sm:py-1 rounded-full z-10 flex items-center gap-1">
            <span className="text-xs sm:text-sm">✓</span>
            <span className="font-semibold text-xs hidden sm:inline">Organic</span>
          </div>
        )}

        {/* Image Container */}
        <div className="relative h-36 sm:h-56 overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-3 sm:p-5 space-y-2 sm:space-y-3">
          {/* Product Name */}
          <h3 className="font-semibold text-gray-800 line-clamp-2 text-sm sm:text-base min-h-[2.5rem] sm:min-h-[3rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                    i < (product.rating || 0)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            {product.reviewCount > 0 && (
              <span className="text-xs sm:text-sm text-[#63b45b]">({product.reviewCount})</span>
            )}
          </div>

          {/* Sold Count */}
          {product.soldCount > 0 && (
            <p className="text-xs sm:text-sm text-gray-500">Đã bán {product.soldCount}</p>
          )}

          {/* Price Section */}
          <div className="flex items-baseline gap-1 sm:gap-2">
            <span className="text-base sm:text-2xl font-bold text-[#63b45b]">
              {product.price.toLocaleString('vi-VN')}đ
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            className="w-full bg-[#75b06f] hover:bg-[#63a05d] text-white py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 font-semibold text-sm sm:text-base group-hover:shadow-lg"
            onClick={handleAddToCart}
          >
            <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Thêm vào giỏ</span>
          </button>
        </div>
      </div>

      {/* Login Alert Modal */}
      <LoginAlertModal
        isOpen={showLoginAlert}
        onClose={() => setShowLoginAlert(false)}
        onLogin={() => {
          setShowLoginAlert(false)
          navigate('/login')
        }}
      />
    </>
  )
}

export default ProductCard
