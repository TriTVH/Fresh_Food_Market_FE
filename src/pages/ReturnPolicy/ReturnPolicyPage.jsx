import { FiRotateCcw, FiCheckCircle, FiXCircle, FiPackage, FiDollarSign, FiAlertTriangle } from 'react-icons/fi'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'

function ReturnPolicyPage() {
  return (
    <div className="bg-gray-50 py-12">
      <Header />
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#75b06f] p-3 rounded-lg">
              <FiRotateCcw className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Chính Sách Đổi Trả</h1>
              <p className="text-gray-600">Đổi trả dễ dàng trong 24 giờ</p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Conditions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <FiCheckCircle className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">Điều Kiện Đổi Trả</h2>
                <div className="space-y-3 text-gray-700">
                  <p>Sản phẩm được chấp nhận đổi trả khi:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Sản phẩm không đúng chủng loại, số lượng như đơn hàng</li>
                    <li>Sản phẩm bị hư hỏng, hỏng trong quá trình vận chuyển</li>
                    <li>Sản phẩm không đạt chất lượng như cam kết</li>
                    <li>Sản phẩm hết hạn sử dụng hoặc gần hết hạn</li>
                    <li>Đổi trả trong vòng 24 giờ kể từ khi nhận hàng</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Not Accepted */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <FiAlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Trường Hợp Không Chấp Nhận Đổi Trả
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>Chúng tôi không chấp nhận đổi trả trong các trường hợp:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Sản phẩm đã qua sử dụng hoặc chế biến</li>
                    <li>Sản phẩm không còn nguyên vẹn, bao bì bị rách</li>
                    <li>Quá thời hạn 24 giờ kể từ khi nhận hàng</li>
                    <li>Không có hóa đơn hoặc chứng từ mua hàng</li>
                    <li>Sản phẩm khuyến mãi, giảm giá đặc biệt</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Process */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quy Trình Đổi Trả</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-[#75b06f] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Liên Hệ</h3>
                  <p className="text-gray-700">
                    Gọi hotline 1900 xxxx hoặc email support@freshmarket.vn để thông báo đổi trả
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#75b06f] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Cung Cấp Thông Tin</h3>
                  <p className="text-gray-700">
                    Cung cấp mã đơn hàng, hình ảnh sản phẩm, lý do đổi trả
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#75b06f] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Xác Nhận</h3>
                  <p className="text-gray-700">
                    Nhân viên kiểm tra và xác nhận yêu cầu đổi trả trong 2 giờ
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#75b06f] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Đổi Trả</h3>
                  <p className="text-gray-700">
                    Nhân viên đến lấy hàng và giao sản phẩm mới (hoặc hoàn tiền)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Refund */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Chính Sách Hoàn Tiền</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Thời gian hoàn tiền:</strong>
              </p>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>COD: Hoàn tiền ngay khi nhân viên lấy hàng</li>
                <li>Chuyển khoản: 3-5 ngày làm việc</li>
                <li>Thẻ tín dụng: 7-14 ngày làm việc</li>
                <li>Ví điện tử: 1-3 ngày làm việc</li>
              </ul>
              <p className="mt-4">
                <strong>Lưu ý:</strong> Phí vận chuyển ban đầu sẽ không được hoàn lại (trừ trường
                hợp lỗi từ phía Fresh Market)
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-[#75b06f] text-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-3">Liên Hệ Đổi Trả</h2>
            <p className="mb-4">Để được hỗ trợ đổi trả nhanh chóng, vui lòng liên hệ:</p>
            <div className="space-y-2">
              <p>📞 Hotline: 1900 xxxx (miễn phí)</p>
              <p>📧 Email: support@freshmarket.vn</p>
              <p>💬 Chat trực tuyến: 8:00 - 22:00</p>
              <p>🕒 Thời gian xử lý: 2-4 giờ</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ReturnPolicyPage
