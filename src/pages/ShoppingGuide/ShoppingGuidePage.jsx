import { FiShoppingCart, FiUser, FiMapPin, FiCreditCard, FiCheckCircle, FiTruck, FiHeadphones } from 'react-icons/fi'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'

function ShoppingGuidePage() {
  return (
    <div className="bg-gray-50 py-12">
      <Header />
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#75b06f] p-3 rounded-lg">
              <FiShoppingCart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Hướng Dẫn Mua Hàng</h1>
              <p className="text-gray-600">Quy trình đặt hàng đơn giản và nhanh chóng</p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#75b06f] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Chọn Sản Phẩm</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Cách chọn sản phẩm:</strong>
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Duyệt danh mục sản phẩm trên trang chủ</li>
                    <li>Sử dụng thanh tìm kiếm để tìm sản phẩm cụ thể</li>
                    <li>Lọc theo danh mục, giá, đánh giá</li>
                    <li>Xem chi tiết sản phẩm: giá, mô tả, đánh giá</li>
                    <li>Nhấn "Thêm vào giỏ hàng"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#75b06f] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Kiểm Tra Giỏ Hàng</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Trong giỏ hàng bạn có thể:</strong>
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Xem danh sách sản phẩm đã chọn</li>
                    <li>Điều chỉnh số lượng sản phẩm</li>
                    <li>Xóa sản phẩm không mong muốn</li>
                    <li>Áp dụng mã giảm giá (nếu có)</li>
                    <li>Xem tổng tiền tạm tính</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#75b06f] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Đăng Nhập / Đăng Ký</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Để tiếp tục đặt hàng:</strong>
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Đăng nhập nếu đã có tài khoản</li>
                    <li>Hoặc đăng ký tài khoản mới (miễn phí)</li>
                    <li>Điền thông tin: email, mật khẩu, số điện thoại</li>
                  </ul>
                  <p className="mt-4">
                    <strong>Lợi ích khi có tài khoản:</strong> Theo dõi đơn hàng, lưu địa chỉ,
                    nhận ưu đãi độc quyền
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#75b06f] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                4
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Nhập Thông Tin Giao Hàng</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Thông tin cần thiết:</strong>
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Họ tên người nhận</li>
                    <li>Số điện thoại liên hệ</li>
                    <li>Địa chỉ giao hàng chi tiết</li>
                    <li>Ghi chú đơn hàng (nếu có)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#75b06f] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                5
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Chọn Phương Thức Thanh Toán</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Các phương thức thanh toán:</strong>
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>
                      <strong>COD:</strong> Thanh toán khi nhận hàng (tiền mặt)
                    </li>
                    <li>
                      <strong>Thẻ tín dụng/ghi nợ:</strong> Visa, Mastercard, JCB
                    </li>
                    <li>
                      <strong>Ví điện tử:</strong> MoMo, ZaloPay, VNPay
                    </li>
                    <li>
                      <strong>Chuyển khoản:</strong> Ngân hàng
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#75b06f] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                6
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Xác Nhận Đơn Hàng</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Sau khi đặt hàng:</strong>
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Nhận email xác nhận đơn hàng</li>
                    <li>Nhân viên gọi xác nhận trong 24h</li>
                    <li>Theo dõi đơn hàng trong tài khoản</li>
                    <li>Nhận thông báo khi đơn hàng được giao</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-gradient-to-r from-[#75b06f] to-[#5a9450] text-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Thông Tin Giao Hàng</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-2">⏰ Thời Gian Giao Hàng</h3>
                <ul className="space-y-1 opacity-90">
                  <li>• Nội thành: 2-4 giờ</li>
                  <li>• Ngoại thành: 1-2 ngày</li>
                  <li>• Tỉnh thành khác: 2-5 ngày</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">💰 Phí Vận Chuyển</h3>
                <ul className="space-y-1 opacity-90">
                  <li>• Nội thành: 30.000đ</li>
                  <li>• Ngoại thành: 50.000đ</li>
                  <li>• Miễn phí: Đơn từ 500.000đ</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-3">💡 Cần Hỗ Trợ?</h3>
            <p className="text-blue-700 mb-4">
              Nếu bạn gặp khó khăn trong quá trình đặt hàng, đừng ngần ngại liên hệ với chúng tôi:
            </p>
            <div className="space-y-2 text-blue-800">
              <p>📞 Hotline: 1900 xxxx (miễn phí)</p>
              <p>📧 Email: support@freshmarket.vn</p>
              <p>💬 Chat trực tuyến: 8:00 - 22:00 hàng ngày</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ShoppingGuidePage
