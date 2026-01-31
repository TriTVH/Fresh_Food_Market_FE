import { FiFileText, FiShoppingCart, FiCreditCard, FiTruck, FiXCircle, FiCheckCircle } from 'react-icons/fi'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import { FaBalanceScale } from 'react-icons/fa'

function TermsPage() {
  return (
    <div className="bg-gray-50 py-12">
      <Header />
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#75b06f] p-3 rounded-lg">
              <FiFileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Điều Khoản Sử Dụng</h1>
              <p className="text-gray-600">Cập nhật lần cuối: 14/01/2025</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Chào mừng bạn đến với Fresh Market. Bằng việc truy cập và sử dụng website của chúng
            tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện sau đây.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <FiCheckCircle className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">1. Chấp Nhận Điều Khoản</h2>
                <div className="space-y-3 text-gray-700">
                  <p>Khi sử dụng website Fresh Market, bạn xác nhận rằng:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Thông tin bạn cung cấp là chính xác và đầy đủ</li>
                    <li>Bạn chịu trách nhiệm về mọi hoạt động dưới tài khoản của mình</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <FaBalanceScale className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">2. Tài Khoản Người Dùng</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>2.1. Đăng ký tài khoản:</strong>
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Cung cấp thông tin chính xác, đầy đủ</li>
                    <li>Bảo mật thông tin đăng nhập của bạn</li>
                    <li>Không chia sẻ tài khoản cho người khác</li>
                    <li>Thông báo ngay nếu phát hiện truy cập trái phép</li>
                  </ul>
                  <p className="mt-4">
                    <strong>2.2. Trách nhiệm:</strong> Bạn chịu trách nhiệm về mọi hoạt động diễn
                    ra dưới tài khoản của mình.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">3. Đặt Hàng và Thanh Toán</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>3.1. Quy trình đặt hàng:</strong>
              </p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Chọn sản phẩm và thêm vào giỏ hàng</li>
                <li>Xác nhận thông tin giao hàng</li>
                <li>Chọn phương thức thanh toán</li>
                <li>Nhận xác nhận đơn hàng qua email</li>
              </ul>
              <p className="mt-4">
                <strong>3.2. Giá cả:</strong>
              </p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Giá sản phẩm đã bao gồm VAT</li>
                <li>Phí vận chuyển được tính riêng</li>
                <li>Giá có thể thay đổi mà không cần báo trước</li>
                <li>Giá áp dụng là giá tại thời điểm xác nhận đơn hàng</li>
              </ul>
              <p className="mt-4">
                <strong>3.3. Thanh toán:</strong> Chúng tôi chấp nhận thanh toán qua COD, thẻ tín
                dụng/ghi nợ, ví điện tử, chuyển khoản ngân hàng.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">4. Giao Hàng</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>4.1. Khu vực giao hàng:</strong> Nội thành TP.HCM và các tỉnh thành trên
                toàn quốc.
              </p>
              <p>
                <strong>4.2. Thời gian giao hàng:</strong>
              </p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Nội thành: 2-4 giờ (đơn hàng trước 16:00)</li>
                <li>Ngoại thành: 1-2 ngày làm việc</li>
                <li>Tỉnh/thành khác: 2-5 ngày làm việc</li>
              </ul>
              <p className="mt-4">
                <strong>4.3. Lưu ý:</strong> Thời gian giao hàng có thể thay đổi do điều kiện thời
                tiết, giao thông hoặc lý do bất khả kháng.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <FiXCircle className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">5. Hủy Đơn Hàng</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>5.1. Quyền hủy đơn:</strong>
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Khách hàng có thể hủy đơn hàng miễn phí trước khi đơn hàng được xử lý</li>
                    <li>Sau khi đơn hàng đã được xử lý, không thể hủy đơn</li>
                    <li>Liên hệ hotline: 1900 xxxx để được hỗ trợ</li>
                  </ul>
                  <p className="mt-4">
                    <strong>5.2. Hoàn tiền:</strong> Hoàn tiền trong vòng 5-7 ngày làm việc kể từ
                    khi hủy đơn thành công.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">6. Quyền Sở Hữu Trí Tuệ</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Mọi nội dung trên website (logo, hình ảnh, văn bản, thiết kế) là tài sản của Fresh
                Market và được bảo vệ bởi luật sở hữu trí tuệ.
              </p>
              <p>
                <strong>Nghiêm cấm:</strong>
              </p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Sao chép, phân phối nội dung mà không có sự cho phép</li>
                <li>Sử dụng logo, thương hiệu Fresh Market cho mục đích thương mại</li>
                <li>Thiết kế lại hoặc chỉnh sửa nội dung website</li>
              </ul>
            </div>
          </div>

          {/* Section 7 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">7. Giới Hạn Trách Nhiệm</h2>
            <div className="space-y-3 text-gray-700">
              <p>Fresh Market không chịu trách nhiệm về:</p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Thiệt hại gián tiếp phát sinh từ việc sử dụng website</li>
                <li>Lỗi kỹ thuật, gián đoạn dịch vụ ngoài tầm kiểm soát</li>
                <li>Thông tin sản phẩm từ nhà cung cấp bên thứ ba</li>
                <li>Hậu quả từ việc sử dụng sai mục đích sản phẩm</li>
              </ul>
            </div>
          </div>

          {/* Contact Box */}
          <div className="bg-[#75b06f] text-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-3">Thông Tin Liên Hệ</h2>
            <p className="mb-4">Nếu bạn có câu hỏi về điều khoản sử dụng, vui lòng liên hệ:</p>
            <div className="space-y-2">
              <p>📧 Email: support@freshmarket.vn</p>
              <p>📞 Hotline: 1900 xxxx</p>
              <p>📍 Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p>
              <p>🕒 Giờ làm việc: 8:00 - 22:00 (tất cả các ngày)</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TermsPage
