import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  onPageChange: (page: string) => void;
  onCategoryNavigate?: (category: string) => void;
}

export function Footer({ onPageChange, onCategoryNavigate }: FooterProps) {
  const handleNavigate = (page: string) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductsNavigate = () => {
    if (onCategoryNavigate) {
      onCategoryNavigate("all");
    } else {
      onPageChange("products");
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Về Chúng Tôi</h3>
            <p className="text-sm mb-4">
              Cung cấp thực phẩm tươi sống, sạch và an toàn cho sức khỏe gia
              đình bạn.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Liên Kết</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigate("about")}
                  className="hover:text-white transition-colors"
                >
                  Giới thiệu
                </button>
              </li>
              <li>
                <button
                  onClick={handleProductsNavigate}
                  className="hover:text-white transition-colors"
                >
                  Sản phẩm
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("news")}
                  className="hover:text-white transition-colors"
                >
                  Tin tức
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("contact")}
                  className="hover:text-white transition-colors"
                >
                  Liên hệ
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Hỗ Trợ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigate("privacy")}
                  className="hover:text-white transition-colors"
                >
                  Chính sách bảo mật
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("terms")}
                  className="hover:text-white transition-colors"
                >
                  Điều khoản sử dụng
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("return")}
                  className="hover:text-white transition-colors"
                >
                  Chính sách đổi trả
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("guide")}
                  className="hover:text-white transition-colors"
                >
                  Hướng dẫn mua hàng
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Liên Hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[#75b06f] flex-shrink-0" />
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#75b06f]" />
                <span>1900 xxxx</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#75b06f]" />
                <span>info@freshmarket.vn</span>
              </li>
            </ul>
          </div>
        </div>       

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm">
          <p>© 2025 Fresh Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}