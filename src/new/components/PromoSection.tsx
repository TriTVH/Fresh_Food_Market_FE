interface PromoSectionProps {
  images: {
    banner: string;
    promo1: string;
    promo2: string;
  };
}

export function PromoSection({ images }: PromoSectionProps) {
  return (
    <section className="bg-[#e8f5e7] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Banner */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-[300px] lg:h-[400px]">
            <img
              src={images.banner}
              alt="Promo"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Ưu đãi đặc biệt</h3>
              <p className="text-lg">Giảm giá lên đến 30%</p>
            </div>
          </div>

          {/* Right Side - Two Promos */}
          <div className="grid grid-cols-1 gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-[140px] lg:h-[190px]">
              <img
                src={images.promo1}
                alt="Promo 1"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center px-6">
                <div className="text-white">
                  <h4 className="font-bold text-xl mb-1">Combo tiết kiệm</h4>
                  <p className="text-sm">Mua 2 tặng 1</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-[140px] lg:h-[190px]">
              <img
                src={images.promo2}
                alt="Promo 2"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center px-6">
                <div className="text-white">
                  <h4 className="font-bold text-xl mb-1">Tươi ngon mỗi ngày</h4>
                  <p className="text-sm">100% đảm bảo chất lượng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}