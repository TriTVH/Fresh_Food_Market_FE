import { FiShield, FiLock, FiEye, FiDatabase } from 'react-icons/fi'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'

function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#75b06f] p-3 rounded-lg">
              <FiShield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Chính Sách Bảo Mật</h1>
              <p className="text-gray-600">Cập nhật lần cuối: 14/01/2025</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Fresh Market cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách
            này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <FiDatabase className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  1. Thông Tin Chúng Tôi Thu Thập
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>1.1. Thông tin cá nhân:</strong>
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Họ tên, email, số điện thoại</li>
                    <li>Địa chỉ giao hàng</li>
                    <li>Thông tin thanh toán</li>
                    <li>Lịch sử mua hàng</li>
                  </ul>
                  <p className="mt-4">
                    <strong>1.2. Thông tin tự động:</strong>
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Địa chỉ IP, loại trình duyệt</li>
                    <li>Thời gian truy cập website</li>
                    <li>Cookies và dữ liệu tương tự</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <FiEye className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  2. Cách Chúng Tôi Sử Dụng Thông Tin
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>Chúng tôi sử dụng thông tin của bạn để:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Xử lý và giao đơn hàng</li>
                    <li>Cải thiện dịch vụ và trải nghiệm người dùng</li>
                    <li>Gửi thông báo về đơn hàng và khuyến mãi</li>
                    <li>Phân tích và nghiên cứu thị trường</li>
                    <li>Bảo vệ chống gian lận</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <FiLock className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  3. Bảo Mật Thông Tin
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>Chúng tôi áp dụng các biện pháp bảo mật:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Mã hóa SSL/TLS cho mọi giao dịch</li>
                    <li>Hệ thống firewall và bảo mật mạng</li>
                    <li>Kiểm soát truy cập nghiêm ngặt</li>
                    <li>Sao lưu dữ liệu định kỳ</li>
                    <li>Đào tạo nhân viên về bảo mật</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">4. Chia Sẻ Thông Tin</h2>
            <div className="space-y-3 text-gray-700">
              <p>Chúng tôi có thể chia sẻ thông tin với:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Đối tác vận chuyển để giao hàng</li>
                <li>Cổng thanh toán để xử lý giao dịch</li>
                <li>Cơ quan pháp luật khi có yêu cầu hợp pháp</li>
              </ul>
              <p className="mt-4">
                <strong>Lưu ý:</strong> Chúng tôi KHÔNG bán hoặc cho thuê thông tin cá nhân của
                bạn cho bên thứ ba.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">5. Quyền Của Bạn</h2>
            <div className="space-y-3 text-gray-700">
              <p>Bạn có quyền:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Truy cập và xem thông tin cá nhân</li>
                <li>Yêu cầu chỉnh sửa thông tin không chính xác</li>
                <li>Xóa tài khoản và dữ liệu cá nhân</li>
                <li>Từ chối nhận email marketing</li>
                <li>Khiếu nại về việc xử lý dữ liệu</li>
              </ul>
            </div>
          </div>

          {/* Section 6 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">6. Cookies</h2>
            <div className="space-y-3 text-gray-700">
              <p>Chúng tôi sử dụng cookies để:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Ghi nhớ đăng nhập và giỏ hàng</li>
                <li>Phân tích lưu lượng truy cập</li>
                <li>Cá nhân hóa nội dung</li>
              </ul>
              <p className="mt-4">
                Bạn có thể tắt cookies trong cài đặt trình duyệt, nhưng một số tính năng có thể
                không hoạt động.
              </p>
            </div>
          </div>

          {/* Contact Box */}
          <div className="bg-[#75b06f] text-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-3">Liên Hệ Về Quyền Riêng Tư</h2>
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
    <Footer />
    </>
  )
}

export default PrivacyPolicyPage
