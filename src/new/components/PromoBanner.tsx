import { Truck, Gift, Percent } from "lucide-react";

export function PromoBanner() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#f0f9ef]">
      <div className="container mx-auto px-4">
        {/* Main Banner with CTA */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 h-[400px]">
          <img
            src="https://images.unsplash.com/photo-1598546937882-4fa25fa29418?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGRlbGl2ZXJ5JTIwc2VydmljZXxlbnwxfHx8fDE3NjgyOTQ5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Khuyến mãi đặc biệt"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-8 md:px-16">
              <div className="max-w-2xl space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full">
                  <Percent className="w-5 h-5" />
                  <span className="font-bold">KHUYẾN MÃI LỚN</span>
                </div>
                
                {/* Heading */}
                <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  Ưu Đãi Tết 2026
                  <br />
                  <span className="text-[#b8e5b4]">Giảm đến 50%</span>
                </h2>
                
                {/* Description */}
                <p className="text-white/90 text-lg md:text-xl max-w-lg">
                  Mua sắm thực phẩm tươi ngon cho ngày Tết với giá cực ưu đãi
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="bg-[#75b06f] hover:bg-[#63a05d] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg">
                    Mua Ngay
                  </button>
                  <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-8 py-4 rounded-full font-semibold border-2 border-white/50 transition-all duration-300">
                    Xem Thêm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="bg-[#75b06f]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
              <Truck className="w-8 h-8 text-[#75b06f]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Giao Hàng Nhanh Chóng
            </h3>
            <p className="text-gray-600">
              Giao hàng nhanh trong 2 giờ nội thành
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="bg-yellow-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
              <Gift className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Quà Tặng Hấp Dẫn
            </h3>
            <p className="text-gray-600">
              Nhận ngay voucher 100.000đ cho đơn hàng đầu tiên
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}