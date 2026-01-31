import { ShoppingBag, Search, CreditCard, Truck, Gift, HelpCircle } from "lucide-react";

export function ShoppingGuidePage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#75b06f] p-3 rounded-lg">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Hướng Dẫn Mua Hàng
              </h1>
              <p className="text-gray-600">
                Mua sắm dễ dàng, nhanh chóng tại Fresh Market
              </p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Chào mừng bạn đến với Fresh Market! Hướng dẫn này sẽ giúp bạn mua
            sắm thuận tiện và tận hưởng trải nghiệm tốt nhất.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <Search className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Bước 1: Tìm Kiếm Sản Phẩm
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">🔍 Cách tìm kiếm:</p>
                    <ul className="space-y-2 list-disc list-inside ml-4">
                      <li>
                        <strong>Thanh tìm kiếm:</strong> Nhập tên sản phẩm (VD: "cà chua", "tom", "thit bo")
                      </li>
                      <li>
                        <strong>Danh mục:</strong> Click vào menu "Rau Củ", "Trái Cây"...
                      </li>
                      <li>
                        <strong>Bộ lọc:</strong> Lọc theo giá, đánh giá
                      </li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-[#75b06f]">
                    <p className="font-semibold text-gray-800 mb-1">💡 Mẹo:</p>
                    <p className="text-sm">
                      Không cần gõ dấu tiếng Việt! Tìm "tom" sẽ ra "Tôm Sú", tìm "cai" sẽ ra "Cải Kale"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <ShoppingBag className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Bước 2: Thêm Vào Giỏ Hàng
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="font-semibold mb-2">1️⃣ Xem chi tiết sản phẩm</p>
                      <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                        <li>Hình ảnh sản phẩm</li>
                        <li>Giá cả, khuyến mãi</li>
                        <li>Trọng lượng, xuất xứ</li>
                        <li>Đánh giá từ khách hàng</li>
                      </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="font-semibold mb-2">2️⃣ Chọn số lượng</p>
                      <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                        <li>Click nút + / - để tăng giảm</li>
                        <li>Hoặc nhập số lượng trực tiếp</li>
                        <li>Xem tổng tiền tự động</li>
                        <li>Click "Thêm vào giỏ"</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-2">
                      🛒 Quản lý giỏ hàng:
                    </p>
                    <p className="text-sm">
                      Click icon giỏ hàng ở góc phải để xem, sửa đổi hoặc xóa sản phẩm. Bạn có thể tiếp tục mua sắm mà không mất giỏ hàng hiện tại.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <Truck className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Bước 3: Tạo Thông Tin Giao Hàng
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">📝 Thông tin cần thiết:</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <span className="text-[#75b06f] font-bold">✓</span>
                        <span className="text-sm">Họ và tên người nhận</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#75b06f] font-bold">✓</span>
                        <span className="text-sm">Số điện thoại liên hệ</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#75b06f] font-bold">✓</span>
                        <span className="text-sm">Địa chỉ giao hàng chi tiết</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#75b06f] font-bold">✓</span>
                        <span className="text-sm">Email (tùy chọn)</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <p className="font-semibold text-gray-800 mb-1">⚠️ Lưu ý:</p>
                    <p className="text-sm">
                      Vui lòng điền đầy đủ và chính xác thông tin để đảm bảo giao hàng nhanh chóng. Kiểm tra kỹ số điện thoại và địa chỉ.
                    </p>
                  </div>
                
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Bước 4: Chọn Phương Thức Thanh Toán
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border-2 border-[#75b06f] rounded-lg p-4 bg-green-50">
                      <p className="font-semibold text-gray-800 mb-2">
                        💵 Thanh toán khi nhận hàng (COD)
                      </p>
                      <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                        <li>Trả tiền mặt cho shipper</li>
                        <li>Không cần thẻ ngân hàng</li>
                        <li>Kiểm tra hàng trước khi trả tiền</li>
                      </ul>
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4">
                      <p className="font-semibold text-gray-800 mb-2">
                        💳 Thanh toán online
                      </p>
                      <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                        <li>Thẻ ATM nội địa</li>
                        <li>Thẻ Visa/Mastercard</li>
                        <li>Ví điện tử (Momo, ZaloPay)</li>
                      </ul>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <Gift className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Bước 5: Sử Dụng Mã Giảm Giá (Nếu Có)
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="mb-3">Nhập mã giảm giá vào ô "Mã khuyến mãi" để được giảm giá:</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Nhập mã giảm giá"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#75b06f]"
                        disabled
                      />
                      <button className="px-6 py-2 bg-[#75b06f] text-white rounded-lg hover:bg-[#68a063] transition-colors">
                        Áp dụng
                      </button>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-2">🎫 Mã khuyến mãi hiện có:</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-white p-2 rounded">
                        <span className="font-mono font-semibold text-purple-600">FRESH50K</span>
                        <span className="text-sm text-gray-600">Giảm 50k cho đơn từ 500k</span>
                      </div>
                      <div className="flex items-center justify-between bg-white p-2 rounded">
                        <span className="font-mono font-semibold text-purple-600">NEWMEMBER</span>
                        <span className="text-sm text-gray-600">Giảm 15% cho thành viên mới</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Bước 6: Xác Nhận Đơn Hàng
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="mb-3">Kiểm tra lại toàn bộ thông tin:</p>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li>Danh sách sản phẩm và số lượng</li>
                  <li>Địa chỉ giao hàng</li>
                  <li>Thời gian giao hàng</li>
                  <li>Phương thức thanh toán</li>
                  <li>Mã giảm giá (nếu có)</li>
                  <li>Tổng tiền thanh toán</li>
                </ul>
              </div>
              <div className="bg-[#75b06f] text-white p-4 rounded-lg">
                <p className="font-semibold mb-2">✅ Hoàn tất đơn hàng:</p>
                <p className="text-sm mb-3">
                  Click nút "Đặt hàng" để hoàn tất. Bạn sẽ nhận được:
                </p>
                <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                  <li>Email xác nhận đơn hàng</li>
                  <li>Mã đơn hàng để tra cứu</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 7 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <HelpCircle className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Câu Hỏi Thường Gặp (FAQ)
                </h2>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-3">
                    <p className="font-semibold text-gray-800 mb-1">
                      ❓ Đơn hàng tối thiểu là bao nhiêu?
                    </p>
                    <p className="text-sm text-gray-700">
                      Đơn hàng tối thiểu 100.000đ. Miễn phí ship cho đơn từ 300.000đ.
                    </p>
                  </div>
                 
                  <div className="border-b border-gray-200 pb-3">
                    <p className="font-semibold text-gray-800 mb-1">
                      ❓ Làm sao để theo dõi đơn hàng?
                    </p>
                    <p className="text-sm text-gray-700">
                      Vào "Tài khoản" → "Đơn hàng của tôi" hoặc click link trong email xác nhận.
                    </p>
                  </div>
                  <div className="pb-3">
                    <p className="font-semibold text-gray-800 mb-1">
                      ❓ Sản phẩm có tươi không?
                    </p>
                    <p className="text-sm text-gray-700">
                      Fresh Market cam kết 100% sản phẩm tươi mới, nhập hàng mỗi ngày. Nếu không hài lòng, đổi trả miễn phí trong 2 giờ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Box */}
          <div className="bg-gradient-to-r from-[#75b06f] to-[#68a063] text-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-3">Cần Hỗ Trợ?</h2>
            <p className="mb-4">
              Đội ngũ CSKH của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p>📞 Hotline: 1900 xxxx</p>
                <p>📧 Email: support@freshmarket.vn</p>
                <p>💬 Live Chat: Góc phải màn hình</p>
              </div>
              <div className="space-y-2">
                <p>📱 Zalo: 0901 xxx xxx</p>
                <p>📘 Facebook: fb.com/freshmarket</p>
                <p>📍 123 Đường ABC, Q1, TP.HCM</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/30">
              <p className="text-sm">
                💚 Cảm ơn bạn đã tin tưởng và mua sắm tại Fresh Market!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
