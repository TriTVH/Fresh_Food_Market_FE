import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiPhone } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { useAuth } from '@/context/AuthContext'

function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp!')
      return
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!')
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Auto login after registration
      login({
        email: formData.email,
        name: formData.fullName,
        role: 'customer',
      })
      navigate('/')
    }, 1500)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel - Green Background with Image */}
        <div className="md:w-1/2 relative overflow-hidden">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1765100213678-5cb8dfb91e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZnJlc2glMjBmb29kJTIwc2hvcHBpbmd8ZW58MXx8fHwxNzY4NTc4OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#75b06f]/95 via-[#5fb558]/90 to-[#4da845]/95"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between text-white min-h-[600px]">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-3 mb-12">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 shadow-lg">
                  <span className="text-3xl">🥬</span>
                </div>
                <div>
                  <span className="text-2xl font-bold tracking-tight">FRESH MARKET</span>
                  <p className="text-white/80 text-xs mt-1">Tươi Ngon - An Tâm</p>
                </div>
              </div>

              {/* Welcome Text */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Bắt Đầu Hành Trình
                  <br />
                  Sống Khỏe! 🌱
                </h1>
                <p className="text-white/90 text-lg leading-relaxed mb-8">
                  Tham gia cộng đồng hơn 50,000+ người yêu thích sản phẩm tươi sống và nhận ngay
                  ưu đãi đặc biệt cho thành viên mới!
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="bg-white/20 rounded-lg p-2">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <div>
                    <p className="font-semibold">Voucher 100K</p>
                    <p className="text-white/70 text-sm">Cho đơn hàng đầu tiên</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="bg-white/20 rounded-lg p-2">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <div>
                    <p className="font-semibold">Bảo Vệ An Toàn</p>
                    <p className="text-white/70 text-sm">Thông tin được mã hóa 100%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Quote */}
            <div className="mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-white/90 text-sm italic">
                  "Đăng ký ngay hôm nay và trải nghiệm sự khác biệt từ sản phẩm tươi sống chất
                  lượng cao!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Register Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50 overflow-y-auto max-h-screen">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Đăng Ký</h2>
              <p className="text-gray-500">Tạo tài khoản để nhận ưu đãi độc quyền</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-gray-700 text-sm font-semibold mb-2">
                  Họ và Tên
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-[#75b06f] transition-all hover:border-gray-300 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-[#75b06f] transition-all hover:border-gray-300 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold mb-2">
                  Số Điện Thoại
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0912 345 678"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-[#75b06f] transition-all hover:border-gray-300 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                  Mật Khẩu
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-[#75b06f] transition-all hover:border-gray-300 bg-white"
                    required
                    minLength={6}
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

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Xác Nhận Mật Khẩu
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu"
                    className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-[#75b06f] transition-all hover:border-gray-300 bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 mt-1 text-[#75b06f] border-gray-300 rounded focus:ring-[#75b06f] cursor-pointer"
                  required
                />
                <label htmlFor="agreeToTerms" className="text-gray-600 text-sm leading-relaxed">
                  Tôi đồng ý với{' '}
                  <Link to="/terms" className="text-[#75b06f] hover:text-[#5a9450] font-semibold transition-colors">
                    Điều khoản dịch vụ
                  </Link>{' '}
                  và{' '}
                  <Link to="/privacy" className="text-[#75b06f] hover:text-[#5a9450] font-semibold transition-colors">
                    Chính sách bảo mật
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#75b06f] to-[#5fb558] text-white font-bold py-4 px-6 rounded-xl hover:from-[#5a9450] hover:to-[#4da845] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 mt-2"
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
                    Đang xử lý...
                  </span>
                ) : (
                  'Tạo Tài Khoản'
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
                  Hoặc đăng ký với
                </span>
              </div>
            </div>

            {/* Social Register */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group">
                <FcGoogle className="w-5 h-5" />
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  Google
                </span>
              </button>

              <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group">
                <FaFacebook className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  Facebook
                </span>
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Đã có tài khoản?{' '}
                <Link
                  to="/login"
                  className="text-[#75b06f] hover:text-[#5a9450] font-bold transition-colors underline decoration-2 underline-offset-2"
                >
                  Đăng nhập ngay
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

export default Register
