import { Search } from "lucide-react";
import { useState } from "react";

interface HeroProps {
  image: string;
  onSearch?: (query: string) => void;
}

export function Hero({ image, onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
      setSearchQuery("");
    }
  };

  return (
    <section className="relative">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Hero Image with better gradient and overlay */}
        <div className="relative h-[380px] sm:h-[450px] md:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={image}
            alt="Ăn sạch sống khỏe"
            className="w-full h-full object-cover"
          />
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#75b06f]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-green-500/10 rounded-full blur-3xl" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-5 sm:px-8 md:px-16 max-w-2xl">
            <div className="space-y-4 sm:space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 sm:px-4 sm:py-2 w-fit">
                <span className="text-white text-xs sm:text-sm font-semibold">🌱 100% Organic</span>
              </div>
              
              {/* Main heading */}
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                Ăn Sạch
                <br />
                <span className="text-[#b8e5b4]">Sống Khỏe</span>
              </h1>
              
              {/* Description - Hidden on mobile for cleaner look */}
              {/* <p className="text-white/90 text-lg md:text-xl max-w-md drop-shadow-lg">
                Thực phẩm tươi ngon, an toàn được chọn lọc kỹ càng
                cho sức khỏe gia đình bạn
              </p> */}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-4 pt-2 sm:pt-4">
                <button className="bg-[#75b06f] hover:bg-[#63a05d] text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Khám Phá Ngay
                </button>
                <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-semibold border-2 border-white/30 transition-all duration-300">
                  Ưu Đãi
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="flex justify-center -mt-6 sm:-mt-8 relative z-10 px-2 sm:px-0">
          <form onSubmit={handleSearch} className="bg-white rounded-xl sm:rounded-2xl shadow-2xl px-3 py-3 sm:px-6 sm:py-5 flex items-center gap-2 sm:gap-3 w-full max-w-3xl border border-gray-100">
            <div className="bg-[#f0f9ef] p-2 sm:p-3 rounded-lg sm:rounded-xl">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#75b06f]" />
            </div>
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              className="flex-1 outline-none text-gray-700 placeholder:text-gray-400 text-sm sm:text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-[#75b06f] hover:bg-[#63a05d] text-white px-4 py-2 sm:px-8 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-lg">
              Tìm
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}