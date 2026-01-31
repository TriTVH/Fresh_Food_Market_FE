import { Eye, EyeOff, User, Phone, Gift, Heart, Shield } from "lucide-react";
import { useState } from "react";

interface RegisterPageProps {
  onPageChange: (page: string) => void;
}

export function RegisterPage({ onPageChange }: RegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to login after successful registration
      onPageChange("login");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Image & Welcome Section */}
        <div className="md:w-1/2 relative overflow-hidden">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1765100213678-5cb8dfb91e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZnJlc2glMjBmb29kJTIwc2hvcHBpbmd8ZW58MXx8fHwxNzY4NTc4OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#75b06f]/95 via-[#5fb558]/90 to-[#4da845]/95"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-12 h-full flex flex-col justify-between text-white min-h-[600px]">
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
                  Bắt Đầu Hành Trình<br />Sống Khỏe! 🌱
                </h1>
                <p className="text-white/90 text-lg leading-relaxed mb-8">
                  Tham gia cộng đồng hơn 50,000+ người yêu thích sản phẩm tươi sống 
                  và nhận ngay ưu đãi đặc biệt cho thành viên mới!
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="bg-white/20 rounded-lg p-2">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Voucher 100K</p>
                    <p className="text-white/70 text-sm">Cho đơn hàng đầu tiên</p>
                  </div>
                </div>
           
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="bg-white/20 rounded-lg p-2">
                    <Shield className="w-5 h-5" />
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
                  "Đăng ký ngay hôm nay và trải nghiệm sự khác biệt từ sản phẩm tươi sống chất lượng cao!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50 overflow-y-auto max-h-screen">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                Đăng Ký
              </h2>
              <p className="text-gray-500">
                Tạo tài khoản để nhận ưu đãi độc quyền
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Full Name Field */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Họ và Tên
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-[#75b06f] transition-all hover:border-gray-300 bg-white"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-[#75b06f] transition-all hover:border-gray-300 bg-white"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Số Điện Thoại
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    placeholder="0912 345 678"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-[#75b06f] transition-all hover:border-gray-300 bg-white"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Mật Khẩu
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-[#75b06f] transition-all hover:border-gray-300 bg-white"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Xác Nhận Mật Khẩu
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-[#75b06f] transition-all hover:border-gray-300 bg-white"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="w-4 h-4 mt-1 text-[#75b06f] border-gray-300 rounded focus:ring-[#75b06f] cursor-pointer"
                  required
                />
                <label htmlFor="terms" className="text-gray-600 text-sm leading-relaxed">
                  Tôi đồng ý với{" "}
                  <button type="button" className="text-[#75b06f] hover:text-[#5a9450] font-semibold transition-colors">
                    Điều khoản dịch vụ
                  </button>{" "}
                  và{" "}
                  <button type="button" className="text-[#75b06f] hover:text-[#5a9450] font-semibold transition-colors">
                    Chính sách bảo mật
                  </button>
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
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </span>
                ) : (
                  "Tạo Tài Khoản"
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
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">Google</span>
              </button>

              <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">Facebook</span>
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Đã có tài khoản?{" "}
                <button
                  onClick={() => onPageChange("login")}
                  className="text-[#75b06f] hover:text-[#5a9450] font-bold transition-colors underline decoration-2 underline-offset-2"
                >
                  Đăng nhập ngay
                </button>
              </p>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-4">
              <button
                onClick={() => onPageChange("home")}
                className="text-gray-500 hover:text-[#75b06f] text-sm font-medium transition-colors inline-flex items-center gap-1"
              >
                <span>←</span>
                <span>Quay lại trang chủ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
