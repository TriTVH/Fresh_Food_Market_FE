import { RefreshCw, PackageCheck, Clock, PhoneCall } from "lucide-react";

interface ReturnPolicyPageProps {
  onPageChange?: (page: string) => void;
}

export function ReturnPolicyPage({ onPageChange }: ReturnPolicyPageProps) {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#75b06f] p-3 rounded-lg">
              <RefreshCw className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Chính Sách Đổi Trả
              </h1>
              <p className="text-gray-600">
                Cập nhật lần cuối: 14/01/2025
              </p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Fresh Market cam kết đảm bảo chất lượng sản phẩm và sự hài lòng của
            khách hàng. Chúng tôi chấp nhận đổi trả sản phẩm theo các điều kiện
            sau đây.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <Clock className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  1. Thời Gian Đổi Trả
                </h2>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-green-50 border-l-4 border-[#75b06f] p-4 rounded">
                    <p className="font-semibold text-gray-800 mb-2">
                      ⏰ Thời gian chấp nhận đổi trả:
                    </p>
                    <ul className="space-y-2 list-disc list-inside ml-4">
                      <li>
                        <strong>Sản phẩm tươi sống:</strong> Trong vòng 2 giờ kể từ khi nhận hàng
                      </li>
                      <li>
                        <strong>Sản phẩm khô:</strong> Trong vòng 24 giờ kể từ khi nhận hàng
                      </li>

                    </ul>
                  </div>
                  <p className="text-sm italic text-gray-600">
                    * Quá thời gian trên, chúng tôi không chấp nhận đổi trả trừ trường hợp đặc biệt.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3 mb-4">
              <PackageCheck className="w-6 h-6 text-[#75b06f] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  2. Điều Kiện Đổi Trả
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      ✅ Chấp nhận đổi trả khi:
                    </p>
                    <ul className="space-y-2 list-disc list-inside ml-4">
                      <li>Sản phẩm không đúng chủng loại, số lượng đã đặt</li>
                      <li>Sản phẩm bị hư hỏng, không đảm bảo chất lượng</li>
                      <li>Sản phẩm hết hạn sử dụng hoặc sắp hết hạn (dưới 3 ngày)</li>
                      <li>Sản phẩm có dấu hiệu không tươi, mốc, hỏng</li>
                      <li>Bao bì sản phẩm bị rách, móp méo nghiêm trọng</li>
                      <li>Giao sai địa chỉ do lỗi của Fresh Market</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="font-semibold text-gray-800 mb-2">
                      ❌ Không chấp nhận đổi trả khi:
                    </p>
                    <ul className="space-y-2 list-disc list-inside ml-4">
                      <li>Khách hàng đặt nhầm, không còn nhu cầu</li>
                      <li>Sản phẩm đã qua chế biến, sử dụng</li>
                      <li>Không còn nguyên vẹn bao bì, tem nhãn</li>
                      <li>Quá thời gian quy định đổi trả</li>
                      <li>Không có hóa đơn, chứng từ mua hàng</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              3. Quy Trình Đổi Trả
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <div className="bg-[#75b06f] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Tạo yêu cầu hoàn tiền trên hệ thống</p>
                  <p className="text-sm mt-1 text-gray-700">
                    Truy cập trang <strong>"Đơn hàng của tôi"</strong> → Chọn đơn hàng có trạng thái <strong>"Thành công"</strong> → Click nút <strong>"Yêu cầu hoàn tiền"</strong>
                  </p>
                  <div className="mt-2">
                    <div className="bg-green-50 border-l-4 border-[#75b06f] p-3 rounded">
                      <p className="text-sm text-gray-700">
                        💡 Hệ thống sẽ tự động điền sẵn thông tin đơn hàng. Bạn chỉ cần điền lý do, mô tả chi tiết và upload ảnh sản phẩm.
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 italic">
                    * Lưu ý: Chỉ các đơn hàng đã hoàn thành (trạng thái "Thành công") mới có nút "Yêu cầu hoàn tiền"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-[#75b06f] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <p className="font-semibold">Chụp ảnh sản phẩm</p>
                  <p className="text-sm mt-1">
                    Chụp rõ toàn bộ sản phẩm, bao bì, tem nhãn, hạn sử dụng
                  </p>
                  <p className="text-sm">Gửi ảnh cho bộ phận hỗ trợ để xác minh</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-[#75b06f] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <p className="font-semibold">Xác nhận đổi trả</p>
                  <p className="text-sm mt-1">
                    Fresh Market xem xét và phản hồi trong vòng 30 phút
                  </p>
                  <p className="text-sm">Nếu được chấp nhận, chúng tôi sẽ hướng dẫn bước tiếp theo</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-[#75b06f] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </div>
                <div>
                  <p className="font-semibold">Thu hồi và đổi sản phẩm mới</p>
                  <p className="text-sm mt-1">
                    Đối với sản phẩm tươi sống: Tài xế sẽ thu hồi và giao sản phẩm mới cùng chuyến
                  </p>
                  <p className="text-sm">
                    Đối với sản phẩm khô: Gửi lại qua đơn vị vận chuyển (miễn phí)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-[#75b06f] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  5
                </div>
                <div>
                  <p className="font-semibold">Hoàn tiền (nếu không đổi sản phẩm)</p>
                  <p className="text-sm mt-1">
                    Hoàn tiền vào tài khoản trong vòng 3-5 ngày làm việc
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              4. Phương Thức Hoàn Tiền
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-gray-700">
                Fresh Market hoàn tiền qua <strong>chuyển khoản ngân hàng</strong> cho mọi đơn hàng được chấp nhận đổi trả.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-semibold text-gray-800 mb-3">
                  💳 Hoàn tiền qua Online Banking
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Bước 1:</strong> Cung cấp thông tin tài khoản ngân hàng khi tạo yêu cầu hoàn tiền
                  </p>
                  <p>
                    <strong>Bước 2:</strong> Sau khi yêu cầu được chấp nhận, chúng tôi sẽ xác minh thông tin
                  </p>
                  <p>
                    <strong>Bước 3:</strong> Tiền được chuyển về tài khoản trong vòng <strong>3-5 ngày làm việc</strong>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">
                  📋 Thông tin cần cung cấp:
                </p>
                <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                  <li>Tên ngân hàng (VD: Vietcombank, Techcombank...)</li>
                  <li>Số tài khoản</li>
                  <li>Tên chủ tài khoản (đúng như trên thẻ/tài khoản)</li>
                  <li>Chi nhánh ngân hàng (nếu có)</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="font-semibold text-gray-800 mb-1">
                  ⚠️ Lưu ý quan trọng:
                </p>
                <p className="text-sm">
                  Vui lòng cung cấp chính xác thông tin tài khoản. Nếu thông tin sai, quá trình hoàn tiền có thể bị chậm trễ hoặc thất bại. Fresh Market không chịu trách nhiệm nếu tiền được chuyển vào tài khoản sai do thông tin không chính xác.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              5. Trường Hợp Đặc Biệt
            </h2>
            <div className="space-y-3 text-gray-700">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="font-semibold text-gray-800 mb-2">
                  ⚠️ Sản phẩm lỗi do vận chuyển:
                </p>
                <p className="text-sm">
                  Fresh Market sẽ chịu toàn bộ trách nhiệm và đổi sản phẩm mới miễn phí.
                </p>
              </div>
             
            </div>
          </div>

          {/* Section 6 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              6. Lưu Ý Quan Trọng
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>📌 Kiểm tra kỹ sản phẩm ngay khi nhận hàng</p>
              <p>📌 Chụp ảnh/quay video khi mở hàng để làm bằng chứng (nếu cần)</p>
              <p>📌 Giữ nguyên bao bì, tem nhãn, hóa đơn</p>
              <p>📌 Liên hệ ngay với bộ phận CSKH trong thời gian quy định</p>
              <p>📌 Không tự ý trả hàng mua trên website về địa chỉ công ty mà chưa được xác nhận</p>
            </div>
          </div>

          {/* Contact Box */}
          <div className="bg-[#75b06f] text-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <PhoneCall className="w-6 h-6" />
              <h2 className="text-xl font-bold">Hỗ Trợ Đổi Trả 24/7</h2>
            </div>
            <p className="mb-4">
              Đội ngũ CSKH luôn sẵn sàng hỗ trợ bạn:
            </p>
            <div className="space-y-2">
              <p>📞 Hotline: 1900 xxxx (miễn phí)</p>
              <p>📧 Email: support@freshmarket.vn</p>
              <p>💬 Chat trực tuyến: Góc phải màn hình</p>
              <p>📍 Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}