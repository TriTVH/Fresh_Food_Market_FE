import { Link } from 'react-router-dom'
import { FiFacebook, FiInstagram, FiYoutube, FiMapPin, FiPhone, FiMail } from 'react-icons/fi'

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-4">
              Về Chúng Tôi
            </h3>
            <p className="text-sm mb-4 leading-relaxed">
              Cung cấp thực phẩm tươi sống, sạch và an toàn cho sức khỏe gia đình bạn.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Links Section */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-4">
              Liên Kết
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary-400 transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-primary-400 transition-colors">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support Section */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-4">
              Hỗ Trợ
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-primary-400 transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary-400 transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:text-primary-400 transition-colors">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link to="/shopping-guide" className="hover:text-primary-400 transition-colors">
                  Hướng dẫn mua hàng
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-4">
              Liên Hệ
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FiMapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-400" />
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="w-5 h-5 flex-shrink-0 text-primary-400" />
                <a href="tel:1900xxxx" className="hover:text-primary-400 transition-colors">
                  1900 xxxx
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="w-5 h-5 flex-shrink-0 text-primary-400" />
                <a href="mailto:info@freshmarket.vn" className="hover:text-primary-400 transition-colors">
                  info@freshmarket.vn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
          <p>© 2025 Fresh Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
