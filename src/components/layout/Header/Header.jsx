import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiShoppingCart,
  FiBell,
  FiUser,
  FiMenu,
  FiChevronDown,
  FiPackage,
  FiLogOut,
  FiGrid,
} from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import LoginAlertModal from '@components/common/LoginAlertModal/LoginAlertModal'

const categories = [
  { name: 'Trái Cây', id: 'fruits' },
  { name: 'Rau, Củ & Nấm', id: 'vegetables' },
  { name: 'Thịt, Cá & Hải Sản', id: 'seafood' },
  { name: 'Thực Phẩm Khô', id: 'dryFood' },
  { name: 'Tin Tức', id: 'news' },
]

function Header() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const { cartItems } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [showLoginAlert, setShowLoginAlert] = useState(false)

  const cartItemCount = cartItems?.length || 0

  const handleNavigateHome = () => {
    navigate('/')
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryClick = (categoryId) => {
    if (categoryId === 'news') {
      navigate('/news')
    } else if (categoryId === 'fruits') {
      navigate('/fruits')
    } else if (categoryId === 'vegetables') {
      navigate('/vegetables')
    } else if (categoryId === 'seafood') {
      navigate('/seafood-meat')
    } else if (categoryId === 'dryFood') {
      navigate('/dry-food')
    } else {
      // For other categories, navigate to products page with category filter
      navigate(`/products?category=${categoryId}`)
    }
    setMobileMenuOpen(false)
  }

  const handleCartClick = () => {
    if (!currentUser) {
      setShowLoginAlert(true)
      return
    }
    navigate('/cart')
  }

  const handleNotificationClick = () => {
    if (!currentUser) {
      setShowLoginAlert(true)
      return
    }
    alert('Thông báo của bạn!')
  }

  const handleLogoutClick = () => {
    setUserMenuOpen(false)
    logout()
    navigate('/')
  }

  return (
    <>
      <header className="bg-[#75b06f] sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-4 gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <FiMenu className="w-6 h-6" />
              </button>
              <button
                onClick={handleNavigateHome}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="bg-white rounded-lg p-2 w-12 h-12 flex items-center justify-center">
                  <span className="text-2xl">🥬</span>
                </div>
                <span className="text-white font-bold text-xl hidden sm:block">Fresh Market</span>
              </button>
            </div>

            {/* Categories Navigation - Desktop (Center) */}
            <nav className="hidden lg:flex items-center gap-6">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="text-white hover:text-white/80 font-semibold transition-colors whitespace-nowrap"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                className="relative p-2 hover:bg-white/20 rounded-lg transition-colors"
                onClick={handleCartClick}
              >
                <FiShoppingCart className="w-6 h-6 text-white" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                className="relative p-2 hover:bg-white/20 rounded-lg transition-colors hidden sm:flex"
                onClick={handleNotificationClick}
              >
                <FiBell className="w-6 h-6 text-white" />
              </button>
              {currentUser ? (
                <div className="relative">
                  <button
                    className="flex items-center gap-2 px-4 py-2 hover:bg-white/20 rounded-lg transition-colors"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <FiUser className="w-5 h-5 text-white" />
                    <span className="text-white hidden md:block">{currentUser.name}</span>
                    <FiChevronDown className="w-4 h-4 text-white" />
                  </button>
                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="font-semibold text-gray-800">{currentUser.name}</p>
                          <p className="text-sm text-gray-500">{currentUser.email}</p>
                          {currentUser.role === 'admin' && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                              Admin
                            </span>
                          )}
                          {currentUser.role === 'supplier' && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">
                              Nhà Cung Cấp
                            </span>
                          )}
                        </div>
                        {currentUser.role === 'admin' && (
                          <button
                            className="flex items-center gap-2 w-full text-left px-4 py-3 text-purple-700 hover:bg-purple-50 transition-colors"
                            onClick={() => {
                              setUserMenuOpen(false)
                              navigate('/admin')
                            }}
                          >
                            <FiGrid className="w-4 h-4" />
                            <span>Dashboard</span>
                          </button>
                        )}
                        {currentUser.role === 'supplier' && (
                          <button
                            className="flex items-center gap-2 w-full text-left px-4 py-3 text-green-700 hover:bg-green-50 transition-colors"
                            onClick={() => {
                              setUserMenuOpen(false)
                              navigate('/supplier')
                            }}
                          >
                            <FiGrid className="w-4 h-4" />
                            <span>Dashboard</span>
                          </button>
                        )}
                        <button
                          className="flex items-center gap-2 w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => {
                            setUserMenuOpen(false)
                            navigate('/orders')
                          }}
                        >
                          <FiPackage className="w-4 h-4" />
                          <span>Đơn Hàng Của Tôi</span>
                        </button>
                        <button
                          className="flex items-center gap-2 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                          onClick={handleLogoutClick}
                        >
                          <FiLogOut className="w-4 h-4" />
                          <span>Đăng Xuất</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <button className="hidden md:flex items-center gap-2 px-4 py-2 hover:bg-white/20 rounded-lg transition-colors">
                      <FiUser className="w-5 h-5 text-white" />
                      <span className="text-white">Đăng Nhập</span>
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white text-[#75b06f] font-semibold rounded-lg hover:bg-white/90 transition-colors">
                      <span>Đăng Ký</span>
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 space-y-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="block w-full text-left px-4 py-2 rounded-lg text-white font-semibold hover:bg-white/20 transition-colors"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

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

export default Header
