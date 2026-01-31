import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  product?: {
    id: string;
    image: string;
    name: string;
    weight?: number;
    unit?: string;
    category?: string;
    rating: number;
    reviews: number;
    sold: number;
    price: number;
    originalPrice?: number;
    discount?: number;
    origin?: string;
  };
  onAddToCart?: (product: {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number; // Thêm originalPrice
    discount?: number;
    weight?: number;
    unit?: string;
    origin?: string;
  }) => void;
  currentUser: { email: string; name: string } | null;
  onLoginRequired?: () => void;
}

export function ProductCard({ product, onAddToCart, currentUser, onLoginRequired }: ProductCardProps) {
  if (!product) {
    return null;
  }

  const {
    id,
    image,
    name,
    weight,
    unit,
    category,
    rating,
    reviews,
    sold,
    price,
    originalPrice,
    discount,
    origin,
  } = product;

  const handleAddToCart = () => {
    if (!currentUser) {
      onLoginRequired?.();
      return;
    }

    onAddToCart?.({
      id,
      name,
      image,
      price,
      originalPrice, // Thêm originalPrice
      discount,
      weight,
      unit,
      origin,
    });
  };

  return (
    <div className="group relative bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full z-10">
          <span className="font-semibold text-xs sm:text-sm">-{discount}%</span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-36 sm:h-56 overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5 space-y-2 sm:space-y-3">
        {/* Product Name with Weight and Unit */}
        <h3 className="font-semibold text-gray-800 line-clamp-2 text-sm sm:text-base min-h-[2.5rem] sm:min-h-[3rem]">
          {name}
          {weight && unit && ` (${weight} ${unit})`}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  i < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm text-[#63b45b]">({reviews})</span>
        </div>

        {/* Sold Count */}
        <p className="text-xs sm:text-sm text-gray-500">{sold} Đã bán</p>

        {/* Price Section */}
        <div className="flex items-baseline gap-1 sm:gap-2">
          <span className="text-base sm:text-2xl font-bold text-[#63b45b]">
            {price.toLocaleString("vi-VN")} đ
          </span>
          {originalPrice && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              {originalPrice.toLocaleString("vi-VN")} đ
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className="w-full bg-[#75b06f] hover:bg-[#63a05d] text-white py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 font-semibold text-sm sm:text-base group-hover:shadow-lg"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Thêm vào giỏ</span>
          <span className="sm:hidden">Thêm</span>
        </button>
      </div>
    </div>
  );
}