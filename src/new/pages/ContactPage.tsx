import { Mail, Phone, MapPin, Clock, Send, Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-gradient-to-r from-[#75b06f] to-[#5a9450]">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Liên Hệ</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
          </p>
        </div>
      </div>

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#75b06f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-[#75b06f]" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Điện Thoại
              </h3>
              <p className="text-gray-600 mb-1">Hotline: 1900-xxxx</p>
              <p className="text-gray-600">Mobile: 0123-456-789</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#75b06f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-[#75b06f]" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 mb-1">support@freshmarket.vn</p>
              <p className="text-gray-600">info@freshmarket.vn</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#75b06f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-[#75b06f]" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Địa Chỉ
              </h3>
              <p className="text-gray-600">
                123 Đường ABC, Quận 1, TP. Hồ Chí Minh
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#75b06f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#75b06f]" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Giờ Làm Việc
              </h3>
              <p className="text-gray-600 mb-1">T2 - T7: 8:00 - 20:00</p>
              <p className="text-gray-600">Chủ Nhật: 9:00 - 18:00</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12 items-stretch mb-16">
            {/* Why Choose Us */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Tại Sao Chọn Fresh Market?
              </h2>
              
              {/* Feature 1 */}
              <div className="bg-[#e8f5e7] p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-[#75b06f] p-3 rounded-xl flex-shrink-0">
                    <Truck className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-[#2d5a2b]">Giao Hàng Nhanh Chóng</h3>
                    <p className="text-[#4a7548]">
                      Giao hàng nhanh trong vòng 2 giờ nội thành. Phí vận chuyển chỉ 30.000đ.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#e8f5e7] p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-[#75b06f] p-3 rounded-xl flex-shrink-0">
                    <ShieldCheck className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-[#2d5a2b]">Sản Phẩm An Toàn</h3>
                    <p className="text-[#4a7548]">
                      100% sản phẩm được kiểm tra chất lượng, nguồn gốc rõ ràng và an toàn cho sức khỏe.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#e8f5e7] p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-[#75b06f] p-3 rounded-xl flex-shrink-0">
                    <RefreshCw className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-[#2d5a2b]">Đổi Trả Dễ Dàng</h3>
                    <p className="text-[#4a7548]">
                      Chính sách đổi trả trong 24 giờ nếu sản phẩm không đạt chất lượng cam kết.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-[#e8f5e7] p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-[#75b06f] p-3 rounded-xl flex-shrink-0">
                    <Headphones className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-[#2d5a2b]">Hỗ Trợ 24/7</h3>
                    <p className="text-[#4a7548]">
                      Đội ngũ chăm sóc khách hàng nhiệt tình, sẵn sàng tư vấn và giải đáp mọi thắc mắc.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              <div className="bg-[#75b06f] text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">
                  Bạn Cần Hỗ Trợ Gấp?
                </h3>
                <p className="mb-6 opacity-90">
                  Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ
                  trợ bạn 24/7. Hãy gọi ngay để được tư vấn và giải đáp mọi
                  thắc mắc.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <span className="font-semibold">
                      Hotline: 1900-xxxx (Miễn phí)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    <span className="font-semibold">
                      support@freshmarket.vn
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Câu Hỏi Thường Gặp
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#75b06f] transition-colors flex items-start gap-2"
                    >
                      <span className="text-[#75b06f] mt-1">•</span>
                      <span>Chính sách đổi trả sản phẩm</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#75b06f] transition-colors flex items-start gap-2"
                    >
                      <span className="text-[#75b06f] mt-1">•</span>
                      <span>Hướng dẫn đặt hàng online</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#75b06f] transition-colors flex items-start gap-2"
                    >
                      <span className="text-[#75b06f] mt-1">•</span>
                      <span>Phí vận chuyển và thời gian giao hàng</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#75b06f] transition-colors flex items-start gap-2"
                    >
                      <span className="text-[#75b06f] mt-1">•</span>
                      <span>Phương thức thanh toán</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Map Full Width */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4970937994644!2d106.69741731471872!3d10.775147292321314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc9%3A0xb0536b3d96956b78!2zUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1647856789123!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Fresh Market Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}