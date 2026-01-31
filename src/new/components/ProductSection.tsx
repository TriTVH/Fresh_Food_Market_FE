import { useState } from "react";
import { ProductCard } from "./ProductCard";

interface Product {
  id: string;
  image: string;
  name: string;
  category?: string;
  rating: number;
  reviews: number;
  sold: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  weight?: number;
  unit?: string;
  origin?: string;
}

interface ProductSectionProps {
  title: string;
  categories?: string[];
  products: Product[];
  onAddToCart?: (product: {
    id: string;
    name: string;
    image: string;
    price: number;
    weight?: number;
    unit?: string;
    origin?: string;
  }) => void;
  currentUser: { email: string; name: string } | null;
  onLoginRequired?: () => void;
}

export function ProductSection({
  title,
  categories,
  products,
  onAddToCart,
  currentUser,
  onLoginRequired,
}: ProductSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "Tất cả"
      ? products.slice(0, 8)
      : products.filter((product) => product.category === selectedCategory);

  return (
    <section className="py-6 sm:py-12">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Section Header */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-5 sm:mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
            <button className="text-[#75b06f] font-semibold hover:underline whitespace-nowrap text-sm sm:text-base">
              Xem tất cả →
            </button>
          </div>

          {/* Categories Filter */}
          {categories && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              <button
                onClick={() => setSelectedCategory("Tất cả")}
                className={`flex-shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === "Tất cả"
                    ? "bg-[#75b06f] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Tất cả
              </button>
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-[#75b06f] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={onAddToCart}
              currentUser={currentUser}
              onLoginRequired={onLoginRequired}
            />
          ))}
        </div>

        {/* No products message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-base sm:text-lg">
              Không có sản phẩm nào trong danh mục này
            </p>
          </div>
        )}
      </div>
    </section>
  );
}