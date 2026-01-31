import { Shield, Lock, Eye, Database, Mail } from "lucide-react";

export function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#75b06f] p-3 rounded-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Chính Sách Bảo Mật
              </h1>
              <p className="text-gray-600">
                Cập nhật lần cuối: 14/01/2025
              </p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Fresh Market cam kết bảo vệ quyền riêng tư và thông tin cá nhân của
            khách hàng. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và
            bảo vệ thông tin của bạn.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <Database className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  1. Thông Tin Chúng Tôi Thu Thập
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Thông tin cá nhân:</strong> Họ tên, số điện thoại,
                    địa chỉ email, địa chỉ giao hàng.
                  </p>
                  <p>
                    <strong>Thông tin đơn hàng:</strong> Lịch sử mua hàng, sản
                    phẩm yêu thích, giỏ hàng.
                  </p>
                
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <Eye className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  2. Mục Đích Sử Dụng Thông Tin
                </h2>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>Xử lý và giao hàng cho đơn hàng của bạn</li>
                  <li>Gửi thông báo về trạng thái đơn hàng</li>
                  <li>Cải thiện trải nghiệm mua sắm</li>
                  <li>Phân tích và cải thiện dịch vụ</li>
                  <li>Phòng chống gian lận và bảo mật</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <Lock className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  3. Bảo Mật Thông Tin
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    Chúng tôi áp dụng các biện pháp bảo mật tiêu chuẩn ngành:
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Sao lưu dữ liệu định kỳ</li>
                    <li>Đào tạo nhân viên về bảo mật thông tin</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  4. Chia Sẻ Thông Tin
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>Chúng tôi không bán thông tin cá nhân của bạn. Thông tin chỉ được chia sẻ với:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Đối tác vận chuyển (chỉ thông tin cần thiết để giao hàng)</li>
                    <li>Cổng thanh toán (thông tin được mã hóa)</li>
                    <li>Cơ quan pháp luật (khi có yêu cầu hợp lệ)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <Mail className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  5. Quyền Của Bạn
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>Bạn có quyền:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Truy cập và xem thông tin cá nhân</li>
                    <li>Yêu cầu chỉnh sửa thông tin không chính xác</li>
                    <li>Yêu cầu xóa thông tin cá nhân</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

   

          {/* Contact Box */}
          <div className="bg-[#75b06f] text-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-3">Liên Hệ</h2>
            <p className="mb-4">
              Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ:
            </p>
            <div className="space-y-2">
              <p>📧 Email: privacy@freshmarket.vn</p>
              <p>📞 Hotline: 1900 xxxx</p>
              <p>📍 Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
