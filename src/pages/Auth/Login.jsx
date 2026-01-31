import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff, FiAlertCircle, FiShoppingBag } from 'react-icons/fi'
import { FaLeaf, FaStar } from 'react-icons/fa'
import { useAuth } from '@/context/AuthContext'
import { MOCK_ACCOUNTS } from '@/utils/constants'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Validate credentials
      const account = MOCK_ACCOUNTS.find(
        (acc) => acc.email === email && acc.password === password
      )
      if (account) {
        // Login success
        login({
          email: account.email,
          name: account.name,
          role: account.role,
        })
        // Redirect based on role
        if (account.role === 'admin' || account.role === 'supplier') {
          navigate('/')
        } else {
          navigate('/')
        }
      } else {
        // Login failed
        setError('Email hoặc mật khẩu không chính xác!')
      }
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Image & Welcome Section */}
        <div className="md:w-1/2 relative overflow-hidden">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#75b06f]/95 via-[#5fb558]/90 to-[#4da845]/95"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-12 h-full flex flex-col justify-between text-white min-h-[500px]">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-3 mb-12">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 shadow-lg">
                  <FaLeaf className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold tracking-tight">FRESH MARKET</span>
                  <p className="text-white/80 text-xs mt-1">Tươi Ngon - An Tâm</p>
                </div>
              </div>

              {/* Welcome Text */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Chào Mừng
                  <br />
                  Trở Lại! 👋
                </h1>
                <p className="text-white/90 text-lg leading-relaxed mb-8">
                  Khám phá thế giới thực phẩm tươi sống chất lượng cao từ các trang trại hữu cơ uy
                  tín trên toàn quốc.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="bg-white/20 rounded-lg p-2">
                    <FiShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Giao Hàng Nhanh Chóng</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="bg-white/20 rounded-lg p-2">
                    <FaLeaf className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">100% Tươi Sống</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="bg-white/20 rounded-lg p-2">
                    <FaStar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Ưu Đãi Đặc Biệt</p>
                    <p className="text-white/70 text-sm">Giảm giá lên đến 30% hàng tuần</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Quote */}
            <div className="mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-white/90 text-sm italic">
                  "Hơn 50,000+ khách hàng tin tưởng và yêu thích Fresh Market mỗi ngày!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Đăng Nhập</h2>
              <p className="text-gray-500">Nhận ưu đãi độc quyền khi đăng nhập ngay hôm nay</p>
            </div>

            {/* Demo Accounts - Compact */}
            <details className="mb-6">
              <summary className="cursor-pointer text-sm font-semibold text-[#75b06f] hover:text-[#5a9450] flex items-center gap-2 mb-2 transition-colors">
                <span>📋</span>
                <span>Tài khoản demo (click để xem)</span>
              </summary>
              <div className="mt-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 space-y-2 border border-gray-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">👤 Khách hàng:</span>
                  <span className="font-mono bg-white px-2 py-1 rounded text-gray-700">
                    customer@freshmarket.vn / 123456
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">🔑 Admin:</span>
                  <span className="font-mono bg-white px-2 py-1 rounded text-gray-700">
                    admin@freshmarket.vn / admin123
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">🚚 Supplier:</span>
                  <span className="font-mono bg-white px-2 py-1 rounded text-gray-700">
                    supplier@freshmarket.vn / supplier123
                  </span>
                </div>
              </div>
            </details>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Nhập địa chỉ email của bạn"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-[#75b06f] transition-all hover:border-gray-300 bg-white"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Mật Khẩu</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu của bạn"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-[#75b06f] transition-all pr-12 hover:border-gray-300 bg-white"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#75b06f] border-gray-300 rounded focus:ring-[#75b06f] cursor-pointer"
                  />
                  <span className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors">
                    Ghi nhớ đăng nhập
                  </span>
                </label>
                <button
                  type="button"
                  className="text-[#75b06f] hover:text-[#5a9450] text-sm font-semibold transition-colors"
                >
                  Quên mật khẩu?
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3 text-red-700 animate-shake">
                  <FiAlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#75b06f] to-[#5fb558] text-white font-bold py-4 px-6 rounded-xl hover:from-[#5a9450] hover:to-[#4da845] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Đang đăng nhập...
                  </span>
                ) : (
                  'Đăng Nhập Ngay'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-br from-white to-gray-50 text-gray-500">
                  Hoặc đăng nhập với
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  Google
                </span>
              </button>

              <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  Facebook
                </span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Chưa có tài khoản?{' '}
                <Link
                  to="/register"
                  className="text-[#75b06f] hover:text-[#5a9450] font-bold transition-colors underline decoration-2 underline-offset-2"
                >
                  Đăng ký miễn phí
                </Link>
              </p>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-4">
              <Link
                to="/"
                className="text-gray-500 hover:text-[#75b06f] text-sm font-medium transition-colors inline-flex items-center gap-1"
              >
                <span>←</span>
                <span>Quay lại trang chủ</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
