import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff, FiAlertCircle, FiShoppingBag } from 'react-icons/fi'
import { FaLeaf, FaStar } from 'react-icons/fa'
import { useAuth } from '@/context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await login(phone, password)
      if (response && response.success) {
        const role = response.user.role
        if (role === 'admin') {
          navigate('/admin')
        } else if (role === 'supplier') {
          navigate('/supplier')
        } else {
          navigate('/')
        }
      } else {
        setError(response?.error || 'Số điện thoại hoặc mật khẩu không chính xác!')
      }
    } catch (err) {
      console.error(err)
      setError('Số điện thoại hoặc mật khẩu không chính xác!')
    } finally {
      setIsLoading(false)
    }
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



            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Phone Field */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  placeholder="Nhập số điện thoại của bạn"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-[#75b06f] transition-all hover:border-gray-300 bg-white"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
