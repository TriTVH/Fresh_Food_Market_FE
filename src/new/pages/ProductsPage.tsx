import { useState, useMemo, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { ChevronRight, ChevronLeft, Search, X, SlidersHorizontal } from "lucide-react";

// Utility function to remove Vietnamese accents
const removeVietnameseAccents = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

interface Product {
  id: string;
  image: string;
  name: string;
  weight?: number;
  unit?: string;
  category: string;
  rating: number;
  reviews: number;
  sold: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  origin?: string;
}

interface ProductsPageProps {
  onPageChange: (page: string) => void;
  vegetables: Product[];
  fruits: Product[];
  seafood: Product[];
  dryFood: Product[];
  searchQuery?: string;
  selectedCategory?: string;
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

export function ProductsPage({
  onPageChange,
  vegetables,
  fruits,
  seafood,
  dryFood,
  searchQuery: initialSearchQuery = "",
  selectedCategory: initialSelectedCategory = "",
  onAddToCart,
  currentUser,
  onLoginRequired,
}: ProductsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialSelectedCategory || "all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const productsPerPage = 12;

  // Sync pageInput with currentPage when currentPage changes
  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  // Update search query when prop changes
  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Update selected category when prop changes
  useEffect(() => {
    if (initialSelectedCategory) {
      setSelectedCategory(initialSelectedCategory);
      setSelectedSubcategory("all");
    }
  }, [initialSelectedCategory]);

  const categories = [
    { id: "all", name: "Tất Cả Sản Phẩm" },
    { id: "vegetables", name: "Rau, Củ & Nấm" },
    { id: "fruits", name: "Trái Cây" },
    { id: "seafood", name: "Thịt, Cá & Hải Sản" },
    { id: "dryFood", name: "Thức Ăn Khô" },
  ];

  // Subcategories based on selected main category
  const getSubcategories = () => {
    if (selectedCategory === "vegetables") {
      return [
        { id: "all", name: "Tất Cả" },
        { id: "Rau Ăn Lá", name: "Rau Ăn Lá" },
        { id: "Củ, Quả", name: "Củ, Quả" },
        { id: "Nấm, Đậu Hủ", name: "Nấm, Đậu Hủ" },
      ];
    } else if (selectedCategory === "fruits") {
      return [
        { id: "all", name: "Tất Cả" },
        { id: "Trái Việt Nam", name: "Trái Việt Nam" },
        { id: "Trái Nhập Khẩu", name: "Trái Nhập Khẩu" },
      ];
    } else if (selectedCategory === "seafood") {
      return [
        { id: "all", name: "Tất Cả" },
        { id: "Hải Sản", name: "Hải Sản" },
        { id: "Thịt Heo", name: "Thịt Heo" },
        { id: "Thịt Bò", name: "Thịt Bò" },
        { id: "Thịt Gà, Vịt & Chim", name: "Thịt Gà, Vịt & Chim" },
      ];
    } else if (selectedCategory === "dryFood") {
      return [
        { id: "all", name: "Tất Cả" },
        { id: "Trái Cây Sấy", name: "Trái Cây Sấy" },
        { id: "Khô Chế Biến Sẵn", name: "Khô Chế Biến Sẵn" },
      ];
    }
    return [];
  };

  const subcategories = getSubcategories();

  // Combine all products
  const allProducts = useMemo(() => {
    let products: Product[] = [];
    if (selectedCategory === "all" || selectedCategory === "vegetables") {
      products = [...products, ...vegetables];
    }
    if (selectedCategory === "all" || selectedCategory === "fruits") {
      products = [...products, ...fruits];
    }
    if (selectedCategory === "all" || selectedCategory === "seafood") {
      products = [...products, ...seafood];
    }
    if (selectedCategory === "all" || selectedCategory === "dryFood") {
      products = [...products, ...dryFood];
    }
    return products;
  }, [selectedCategory, vegetables, fruits, seafood, dryFood]);

  // Price ranges
  const priceRanges = [
    { id: "0-50", label: "Dưới 50.000đ", min: 0, max: 50000 },
    { id: "50-100", label: "50.000đ - 100.000đ", min: 50000, max: 100000 },
    { id: "100-150", label: "100.000đ - 150.000đ", min: 100000, max: 150000 },
    { id: "150-200", label: "150.000đ - 200.000đ", min: 150000, max: 200000 },
    { id: "200+", label: "Trên 200.000đ", min: 200000, max: Infinity },
  ];

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Subcategory filter
      if (selectedSubcategory !== "all") {
        if (product.category !== selectedSubcategory) {
          return false;
        }
      }

      // Search filter
      if (searchQuery) {
        const query = removeVietnameseAccents(searchQuery.toLowerCase());
        if (!removeVietnameseAccents(product.name.toLowerCase()).includes(query)) {
          return false;
        }
      }

      // Price filter
      if (selectedPriceRanges.length > 0) {
        const matchesPrice = selectedPriceRanges.some((rangeId) => {
          const range = priceRanges.find((r) => r.id === rangeId);
          if (!range) return false;
          return product.price >= range.min && product.price < range.max;
        });
        if (!matchesPrice) return false;
      }

      return true;
    });
  }, [allProducts, selectedSubcategory, searchQuery, selectedPriceRanges]);

  const togglePriceRange = (rangeId: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId)
        ? prev.filter((r) => r !== rangeId)
        : [...prev, rangeId]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedPriceRanges([]);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery || selectedPriceRanges.length > 0;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Show all pages if 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage <= 4) {
        // Near the beginning: 1 2 3 4 5 ... last
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Near the end: 1 ... last-4 last-3 last-2 last-1 last
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle: 1 ... current-1 current current+1 ... last
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <button
            onClick={() => onPageChange("home")}
            className="text-gray-600 hover:text-[#75b06f] transition-colors"
          >
            Trang chủ
          </button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-800 font-semibold">Sản phẩm</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
            Sản Phẩm Fresh Market
          </h1>
        </div>

        {/* Search Bar & Category Tabs */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-4 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Search Bar */}
            <div className="relative w-full lg:flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>

            {/* Category Select Dropdown */}
            <div className="w-full lg:w-auto min-w-[200px] sm:min-w-[250px]">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory("all");
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-[#75b06f] hover:border-gray-300 transition-all cursor-pointer appearance-none bg-no-repeat bg-right pr-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 0.5rem center",
                  backgroundSize: "1.5em 1.5em",
                }}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Subcategory Tabs */}
        {subcategories.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {subcategories.map((subcat) => (
                <button
                  key={subcat.id}
                  onClick={() => {
                    setSelectedSubcategory(subcat.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    selectedSubcategory === subcat.id
                      ? "bg-[#75b06f] text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:border-[#75b06f] hover:text-[#75b06f]"
                  }`}
                >
                  {subcat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 sticky top-4">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-[#75b06f]" />
                  <h3 className="font-bold text-base sm:text-lg">Bộ Lọc</h3>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-gray-600"
                >
                  {showFilters ? <X className="w-5 h-5" /> : <SlidersHorizontal className="w-5 h-5" />}
                </button>
              </div>

              <div className={`space-y-4 sm:space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Active Filters */}
                {hasActiveFilters && (
                  <div className="pb-4 sm:pb-6 border-b border-gray-200">
                    <button
                      onClick={clearFilters}
                      className="text-xs sm:text-sm text-[#75b06f] hover:text-[#5a9450] font-semibold flex items-center gap-2"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      Xóa tất cả bộ lọc
                    </button>
                  </div>
                )}

                {/* Price Filter */}
                <div className="pt-4 sm:pt-6 border-t border-gray-200">
                  <h4 className="font-semibold mb-3 text-sm sm:text-base text-gray-800">
                    Khoảng Giá
                  </h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label
                        key={range.id}
                        className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPriceRanges.includes(range.id)}
                          onChange={() => togglePriceRange(range.id)}
                          className="w-4 h-4 text-[#75b06f] border-gray-300 rounded focus:ring-[#75b06f]"
                        />
                        <span className="text-xs sm:text-sm text-gray-700 group-hover:text-gray-900">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
              <p className="text-sm sm:text-base text-gray-600">
                Tìm thấy <span className="font-semibold text-gray-800">{filteredProducts.length}</span> sản phẩm
              </p>
            </div>

            {/* Products */}
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} currentUser={currentUser} onLoginRequired={onLoginRequired} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6">
                  Vui lòng thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-[#75b06f] text-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-semibold hover:bg-[#5a9450] transition-colors"
                >
                  Xóa Bộ Lọc
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center px-4 py-6 mt-6 sm:mt-8">
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map((pageNum, index) => (
                    pageNum === '...' ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 font-medium"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum as number)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                          currentPage === pageNum
                            ? 'bg-[#75b06f] text-white'
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Page Jump Input */}
                <div className="ml-4 flex items-center gap-2">
                  <input
                    type="number"
                    value={pageInput}
                    onChange={(e) => setPageInput(e.target.value)}
                    className={`w-16 px-2 py-1 text-center border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      pageInput === "" || 
                      isNaN(parseInt(pageInput)) || 
                      parseInt(pageInput) < 1 || 
                      parseInt(pageInput) > totalPages
                        ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                        : "border-gray-200 focus:ring-[#75b06f] focus:border-[#75b06f]"
                    }`}
                    min="1"
                    max={totalPages}
                    placeholder={currentPage.toString()}
                  />
                  <span className="text-sm text-gray-600 font-medium">
                    / {totalPages}
                  </span>
                  <button
                    onClick={() => {
                      const page = parseInt(pageInput);
                      if (!isNaN(page) && page >= 1 && page <= totalPages) {
                        handlePageChange(page);
                      }
                    }}
                    disabled={
                      pageInput === "" || 
                      isNaN(parseInt(pageInput)) || 
                      parseInt(pageInput) < 1 || 
                      parseInt(pageInput) > totalPages
                    }
                    className="px-3 py-1 bg-[#75b06f] text-white text-sm font-semibold rounded-lg hover:bg-[#5a9450] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Go
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      
      </div>
    </div>
  );
}