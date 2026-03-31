import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiChevronRight,
  FiChevronLeft,
  FiChevronDown,
  FiSearch,
  FiX,
  FiSliders,
} from 'react-icons/fi'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import ProductCard from '@/components/product/ProductCard/ProductCard'
import { fetchProducts } from '@/api/productApi'
import { mapProductDtoToFrontend, matchCategory } from '@/utils/mapper'

// Utility function to remove Vietnamese accents
const removeVietnameseAccents = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
}

function VegetablesPage() {
  const navigate = useNavigate()
  const [selectedSubcategory, setSelectedSubcategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([])
  const [showFilters, setShowFilters] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [goToPage, setGoToPage] = useState('')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const productsPerPage = 12

  const [allVegetables, setAllVegetables] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts(true);
        if (response && response.success && response.data) {
          const mapped = response.data.map(mapProductDtoToFrontend);
          const filtered = mapped.filter(p => matchCategory(p.category, 'vegetables'));
          setAllVegetables(filtered);
        }
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setIsLoading(false)
      }
    };
    loadProducts();
  }, [])

  // Category options for dropdown
  const categories = [
    { id: 'all', name: 'Tất Cả Sản Phẩm', path: '/products' },
    { id: 'vegetables', name: 'Rau, Củ & Nấm', path: '/vegetables' },
    { id: 'fruits', name: 'Trái Cây', path: '/fruits' },
    { id: 'seafood', name: 'Thịt, Cá & Hải Sản', path: '/seafood-meat' },
    { id: 'dryFood', name: 'Thực Ăn Khô', path: '/dry-food' },
  ]

  // Subcategories for Vegetables - values match against product.subcategory (subCategoryName from BE)
  const vegetableSubcategories = [
    { id: 'all', name: 'Tất Cả', keywords: [] },
    { id: 'leafy', name: 'Rau Ăn Lá', keywords: ['rau', 'lá', 'cải', 'xà lách', 'rau muống', 'rau dền'] },
    { id: 'root', name: 'Củ, Quả', keywords: ['củ', 'quả', 'cà', 'bí', 'dưa', 'khoai', 'hành', 'tỏi', 'gừng', 'ớt'] },
    { id: 'mushroom', name: 'Nấm, Đậu Hũ', keywords: ['nấm', 'đậu', 'hũ', 'đậu hũ', 'đậu phụ'] },
  ]

  // Price ranges
  const priceRanges = [
    { id: '0-50', label: 'Dưới 50.000đ', min: 0, max: 50000 },
    { id: '50-100', label: '50.000đ - 100.000đ', min: 50000, max: 100000 },
    { id: '100-150', label: '100.000đ - 150.000đ', min: 100000, max: 150000 },
    { id: '150-200', label: '150.000đ - 200.000đ', min: 150000, max: 200000 },
    { id: '200+', label: 'Trên 200.000đ', min: 200000, max: Infinity },
  ]

  // Filter products
  const filteredProducts = useMemo(() => {
    return allVegetables.filter((product) => {
      // Search filter
      if (searchQuery) {
        const query = removeVietnameseAccents(searchQuery.toLowerCase())
        if (!removeVietnameseAccents(product.name.toLowerCase()).includes(query)) {
          return false
        }
      }

      // Subcategory filter - match against real Vietnamese subcategory name from BE
      if (selectedSubcategory !== 'all') {
        const selectedTab = vegetableSubcategories.find((s) => s.id === selectedSubcategory)
        if (selectedTab && selectedTab.keywords.length > 0) {
          const subcat = removeVietnameseAccents((product.subcategory || product.category || '').toLowerCase())
          const matches = selectedTab.keywords.some(kw =>
            subcat.includes(removeVietnameseAccents(kw.toLowerCase()))
          )
          if (!matches) return false
        }
      }

      // Price filter
      if (selectedPriceRanges.length > 0) {
        const matchesPrice = selectedPriceRanges.some((rangeId) => {
          const range = priceRanges.find((r) => r.id === rangeId)
          if (!range) return false
          return product.price >= range.min && product.price < range.max
        })
        if (!matchesPrice) return false
      }

      return true
    })
  }, [allVegetables, searchQuery, selectedSubcategory, selectedPriceRanges])

  const togglePriceRange = (rangeId) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId) ? prev.filter((r) => r !== rangeId) : [...prev, rangeId]
    )
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedPriceRanges([])
    setCurrentPage(1)
  }

  const hasActiveFilters = searchQuery || selectedPriceRanges.length > 0

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage <= 4) {
        for (let i = 2; i <= 5; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-[#75b06f] transition-colors"
          >
            Trang chủ
          </button>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-800 font-semibold">Rau, Củ & Nấm</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
            Rau, Củ & Nấm Fresh Market
          </h1>
          <p className="text-gray-600">Tươi ngon - An toàn - Chất lượng</p>
        </div>

        {/* Search Bar with Category Dropdown */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-4 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
            {/* Search Input */}
            <div className="relative w-full">
              <FiSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm rau, củ, nấm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="w-full md:w-64 px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors flex items-center justify-between gap-2"
              >
                <span className="text-gray-700 font-medium">Rau, Củ & Nấm</span>
                <FiChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {showCategoryDropdown && (
                <div className="absolute right-0 mt-2 w-full md:w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        navigate(category.path)
                        setShowCategoryDropdown(false)
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                        category.id === 'vegetables' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Subcategory Tabs */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-2 sm:p-3 mb-6 sm:mb-8">
          <div className="flex gap-2 overflow-x-auto">
            {vegetableSubcategories.map((subcat) => (
              <button
                key={subcat.id}
                onClick={() => {
                  setSelectedSubcategory(subcat.id)
                  setCurrentPage(1)
                }}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base whitespace-nowrap transition-all ${
                  selectedSubcategory === subcat.id
                    ? 'bg-[#75b06f] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {subcat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 lg:sticky lg:top-4">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <FiSliders className="w-4 h-4 sm:w-5 sm:h-5 text-[#75b06f]" />
                  <h3 className="font-bold text-base sm:text-lg">Bộ Lọc</h3>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-gray-600"
                >
                  {showFilters ? <FiX className="w-5 h-5" /> : <FiSliders className="w-5 h-5" />}
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
                      <FiX className="w-3 h-3 sm:w-4 sm:h-4" />
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
                Tìm thấy{' '}
                <span className="font-semibold text-gray-800">{filteredProducts.length}</span> sản
                phẩm
              </p>
            </div>

            {/* Products */}
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <FiSearch className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
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
                    <FiChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map((pageNum, index) =>
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
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                          currentPage === pageNum
                            ? 'bg-[#75b06f] text-white'
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiChevronRight className="w-5 h-5 text-gray-600" />
                  </button>

                  {/* Go to Page */}
                  <div className="hidden sm:flex items-center gap-2 ml-4">
                    <input
                      type="number"
                      min="1"
                      max={totalPages}
                      value={goToPage}
                      onChange={(e) => setGoToPage(e.target.value)}
                      placeholder="1"
                      className="w-16 px-2 py-2 text-center border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-transparent"
                    />
                    <span className="text-sm text-gray-600">/ {totalPages}</span>
                    <button
                      onClick={() => {
                        const page = parseInt(goToPage)
                        if (page >= 1 && page <= totalPages) {
                          handlePageChange(page)
                          setGoToPage('')
                        }
                      }}
                      disabled={!goToPage || parseInt(goToPage) < 1 || parseInt(goToPage) > totalPages}
                      className="px-4 py-2 bg-[#75b06f] text-white rounded-lg font-medium hover:bg-[#5a9450] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Go
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default VegetablesPage
