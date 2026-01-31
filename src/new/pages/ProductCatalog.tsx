import {
  Search,
  Plus,
  Edit,
  Trash2,
  Menu,
  User,
  Package,
  ChevronLeft,
  ChevronRight,
  X,
  Percent,
  CheckCircle,
  Box
} from "lucide-react";
import { useState, useEffect } from "react";
import { ImageUploader } from "../components/ImageUploader";
import { Sidebar } from "../components/Sidebar";
import { getSidebarConfig } from "../components/sidebar-configs";

interface Product {
  product_id: string;
  sub_category_id: string;
  product_name: string;
  description: string;
  manufacturing_location: string;
  price_sell: number;
  quantity: number;
  weight: number;
  unit: string;
  status: 'active' | 'inactive' | 'delete';
  attributes?: { key: string; value: string }[];
  images?: string[];
  mainImageIndex?: number;
}

interface DiscountProgram {
  program_id: string;
  product_id: string;
  discount_percentage: number;
  from_date: string;
  to_date: string;
  created_date: string;
  updated_date: string;
  max_usage: number;
  status: 'active' | 'pending' | 'expired' | 'delete';
}

interface ProductCatalogProps {
  onPageChange: (page: string) => void;
  currentUser: { email: string; name: string; role?: string } | null;
  onLogout: () => void;
}

export function ProductCatalog({ onPageChange, currentUser, onLogout }: ProductCatalogProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const itemsPerPage = 10;

  // Redirect if not admin
  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      onPageChange("home");
    }
  }, [currentUser, onPageChange]);

  // Sync pageInput with currentPage when currentPage changes
  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  // Mock products data
  const [products, setProducts] = useState<Product[]>([
    {
      product_id: "P001",
      sub_category_id: "SC001",
      product_name: "Cá Hồi Nauy Phi Lê",
      description: "Cá hồi tươi nhập khẩu từ Na Uy, phi lê sạch, giàu omega-3",
      manufacturing_location: "Na Uy",
      price_sell: 450000,
      quantity: 50,
      weight: 0.5,
      unit: "kg",
      status: 'active',
      images: [
        "https://th.bing.com/th/id/R.01db0a57128c6cfce7023cf1d7043d32?rik=K2DgUQbeQluutA&riu=http%3a%2f%2ffile.hstatic.net%2f1000030244%2farticle%2fphi-le-ca-hoi-lam-mon-gi-1_4ab08c181d25468b9a700a939fe032bf.jpg&ehk=LCVFVKWF7ruXtPqHYNXCoyiQYvVilRn6uN1Nsh8Vhh4%3d&risl=&pid=ImgRaw&r=0",
        "https://cdn.tgdd.vn/Products/Images/8790/325602/bhx/ca-hoi-atlantic-cat-lat-phi-le-khay-500g-202405081014596969.jpg",
        "https://product.hstatic.net/200000423303/product/ca-hoi-nauy-phi-le-khong-xuong_8f949ba68b914f01833ce39d8e8e2bb8_grande.jpg"
      ],
      mainImageIndex: 0
    },
    {
      product_id: "P002",
      sub_category_id: "SC002",
      product_name: "Thịt Bò Úc Thăn Nội",
      description: "Thịt bò nhập khẩu từ Úc, thăn nội mềm, ngon",
      manufacturing_location: "Úc",
      price_sell: 380000,
      quantity: 30,
      weight: 0.5,
      unit: "kg",
      status: 'active',
      images: [
        "https://cdn.tgdd.vn/Products/Images/8785/309035/bhx/thit-bo-uc-than-noi-cat-lat-khay-500g-202311081448152449.jpg",
        "https://ngonngon.com.vn/storage/products/25/thit-bo-uc-than-noi-cat-san.jpg"
      ],
      mainImageIndex: 0
    },
    {
      product_id: "P003",
      sub_category_id: "SC003",
      product_name: "Rau Cải Xanh Đà Lạt",
      description: "Rau cải xanh tươi từ Đà Lạt, sạch không hóa chất",
      manufacturing_location: "Đà Lạt, Việt Nam",
      price_sell: 25000,
      quantity: 100,
      weight: 0.3,
      unit: "kg",
      status: 'active',
      images: [
        "https://product.hstatic.net/200000423303/product/rau-cai-xanh_df76b6c24f524d78803daac3bef9285e_grande.jpg",
        "https://cdn.tgdd.vn/Products/Images/8820/272137/bhx/rau-cai-xanh-tui-500g-202210210958565734.jpg"
      ],
      mainImageIndex: 0
    },
    {
      product_id: "P004",
      sub_category_id: "SC001",
      product_name: "Tôm Sú Sống",
      description: "Tôm sú tươi sống, size đại, nuôi tự nhiên",
      manufacturing_location: "Cà Mau, Việt Nam",
      price_sell: 280000,
      quantity: 40,
      weight: 0.5,
      unit: "kg",
      status: 'active',
      images: [
        "https://product.hstatic.net/200000423303/product/tom-su-song_grande.jpg",
        "https://cdn.tgdd.vn/Products/Images/8790/235181/bhx/tom-su-tuoi-khay-500g-8-12-con-202301111459565179.jpg",
        "https://ngonngon.com.vn/storage/products/51/tom-su-song.jpg"
      ],
      mainImageIndex: 0
    },
    {
      product_id: "P005",
      sub_category_id: "SC004",
      product_name: "Táo Fuji Nhật Bản",
      description: "Táo Fuji nhập khẩu từ Nhật Bản, ngọt giòn",
      manufacturing_location: "Nhật Bản",
      price_sell: 95000,
      quantity: 80,
      weight: 0.5,
      unit: "kg",
      status: 'active',
      images: [
        "https://product.hstatic.net/200000423303/product/tao-fuji-nhat-ban_grande.jpg",
        "https://cdn.tgdd.vn/Products/Images/8787/228557/bhx/tao-fuji-nhat-ban-hop-1kg-4-6-trai-202301091021149966.jpg"
      ],
      mainImageIndex: 0
    },
  ]);

  const [formData, setFormData] = useState<Product>({
    product_id: "",
    sub_category_id: "",
    product_name: "",
    description: "",
    manufacturing_location: "",
    price_sell: 0,
    quantity: 0,
    weight: 0,
    unit: "kg",
    status: 'active',
    attributes: [{ key: "Hướng dẫn sử dụng", value: "" }]
  });

  // Helper functions
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleDisplay = (role?: string) => {
    return role === "admin" ? "Quản Trị Viên" : "Người Dùng";
  };

  // Remove Vietnamese accents for search
  const removeVietnameseAccents = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    // Exclude deleted products
    if (product.status === 'delete') return false;
    
    const searchNormalized = removeVietnameseAccents(searchTerm);
    const nameNormalized = removeVietnameseAccents(product.product_name);
    const idNormalized = removeVietnameseAccents(product.product_id);
    
    return nameNormalized.includes(searchNormalized) || 
           idNormalized.includes(searchNormalized);
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

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

  // Don't render if not admin
  if (!currentUser || currentUser.role !== "admin") {
    return null;
  }

  // Handle form
  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        ...product,
        attributes: product.attributes || [{ key: "Hướng dẫn sử dụng", value: "" }]
      });
    } else {
      setEditingProduct(null);
      // Generate new product ID automatically
      const maxId = products.reduce((max, p) => {
        const num = parseInt(p.product_id.replace('P', ''));
        return num > max ? num : max;
      }, 0);
      const newId = `P${String(maxId + 1).padStart(3, '0')}`;
      
      setFormData({
        product_id: newId,
        sub_category_id: "",
        product_name: "",
        description: "",
        manufacturing_location: "",
        price_sell: 0,
        quantity: 0,
        weight: 0,
        unit: "kg",
        attributes: [{ key: "Hướng dẫn sử dụng", value: "" }]
      });
    }
    setShowProductModal(true);
  };

  const handleAddAttribute = () => {
    setFormData({
      ...formData,
      attributes: [...(formData.attributes || []), { key: "", value: "" }]
    });
  };

  const handleRemoveAttribute = (index: number) => {
    const newAttributes = [...(formData.attributes || [])];
    newAttributes.splice(index, 1);
    setFormData({ ...formData, attributes: newAttributes });
  };

  const handleAttributeChange = (index: number, field: 'key' | 'value', value: string) => {
    const newAttributes = [...(formData.attributes || [])];
    newAttributes[index][field] = value;
    setFormData({ ...formData, attributes: newAttributes });
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.product_id === editingProduct.product_id ? formData : p
      ));
    } else {
      // Add new product
      setProducts([...products, formData]);
    }
    setShowProductModal(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts(products.map(p => 
        p.product_id === productId ? {...p, status: 'delete'} : p
      ));
    }
  };

  // ========== DISCOUNT PROGRAM MANAGEMENT ==========
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<DiscountProgram | null>(null);
  const [showProductDiscountsModal, setShowProductDiscountsModal] = useState(false);
  const [selectedProductForDiscounts, setSelectedProductForDiscounts] = useState<Product | null>(null);
  const [discountModalMode, setDiscountModalMode] = useState<'list' | 'form'>('list');
  
  const [discountPrograms, setDiscountPrograms] = useState<DiscountProgram[]>([
    {
      program_id: "DC001",
      product_id: "P001",
      discount_percentage: 15,
      from_date: "2026-01-15",
      to_date: "2026-01-31",
      created_date: "2026-01-10",
      updated_date: "2026-01-10",
      max_usage: 100,
      status: 'active'
    },
    {
      program_id: "DC002",
      product_id: "P002",
      discount_percentage: 10,
      from_date: "2026-01-10",
      to_date: "2026-01-25",
      created_date: "2026-01-05",
      updated_date: "2026-01-05",
      max_usage: 50,
      status: 'expired'
    },
    {
      program_id: "DC003",
      product_id: "P004",
      discount_percentage: 20,
      from_date: "2026-01-12",
      to_date: "2026-02-12",
      created_date: "2026-01-08",
      updated_date: "2026-01-08",
      max_usage: 200,
      status: 'pending'
    },
    {
      program_id: "DC004",
      product_id: "P001",
      discount_percentage: 25,
      from_date: "2025-12-01",
      to_date: "2025-12-31",
      created_date: "2025-11-25",
      updated_date: "2026-01-05",
      max_usage: 75,
      status: 'delete'
    }
  ]);

  const [discountFormData, setDiscountFormData] = useState<DiscountProgram>({
    program_id: "",
    product_id: "",
    discount_percentage: 0,
    from_date: "",
    to_date: "",
    created_date: new Date().toISOString().split('T')[0],
    updated_date: new Date().toISOString().split('T')[0],
    max_usage: 0,
    status: 'active'
  });

  const handleOpenDiscountModal = (discount?: DiscountProgram) => {
    if (discount) {
      setEditingDiscount(discount);
      setDiscountFormData(discount);
    } else {
      setEditingDiscount(null);
      const maxId = discountPrograms.reduce((max, d) => {
        const num = parseInt(d.program_id.replace('DC', ''));
        return num > max ? num : max;
      }, 0);
      const newId = `DC${String(maxId + 1).padStart(3, '0')}`;
      const today = new Date().toISOString().split('T')[0];
      
      setDiscountFormData({
        program_id: newId,
        product_id: "",
        discount_percentage: 0,
        from_date: today,
        to_date: "",
        created_date: today,
        updated_date: today,
        max_usage: 0,
        status: 'active'
      });
    }
    setShowDiscountModal(true);
    setDiscountModalMode('form');
  };

  const handleSaveDiscount = () => {
    const updatedData = {
      ...discountFormData,
      updated_date: new Date().toISOString().split('T')[0]
    };

    if (editingDiscount) {
      setDiscountPrograms(discountPrograms.map(d => 
        d.program_id === editingDiscount.program_id ? updatedData : d
      ));
    } else {
      setDiscountPrograms([...discountPrograms, updatedData]);
    }
    setShowDiscountModal(false);
    setEditingDiscount(null);
  };

  const handleDeleteDiscount = (programId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa chương trình giảm giá này?")) {
      setDiscountPrograms(discountPrograms.map(d => 
        d.program_id === programId ? {...d, status: 'delete'} : d
      ));
    }
  };

  const handleActivateDiscount = (programId: string) => {
    if (confirm("Bạn có chắc chắn muốn kích hoạt chương trình giảm giá này?")) {
      const today = new Date().toISOString().split('T')[0];
      setDiscountPrograms(discountPrograms.map(d => 
        d.program_id === programId ? {
          ...d, 
          status: 'active', 
          from_date: today,
          updated_date: today
        } : d
      ));
    }
  };

  const getProductName = (productId: string) => {
    const product = products.find(p => p.product_id === productId);
    return product ? product.product_name : productId;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Component */}
      <Sidebar
        sections={getSidebarConfig('admin')}
        activePage="product-catalog"
        onPageChange={onPageChange}
        onLogout={onLogout}
        showMobile={showMobileSidebar}
        onCloseMobile={() => setShowMobileSidebar(false)}
        currentUser={currentUser}
      />

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          
          {/* Mobile Header with Menu Button */}
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Quản Lý Sản Phẩm
              </h1>
            </div>
          </div>

          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="hidden lg:block">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  Quản Lý Danh Mục Sản Phẩm
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Quản lý toàn bộ sản phẩm trong hệ thống
                </p>
              </div>

              {/* Add Product Button */}
              <button
                onClick={() => handleOpenModal()}
                className="flex items-center gap-2 px-6 py-3 bg-[#75b06f] hover:bg-[#5c8c57] text-white font-semibold rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Thêm Sản Phẩm</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, mã sản phẩm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-transparent"
              />
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Mã SP
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Tên Sản Phẩm
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                      Mã Phân Loại
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                      Nơi Sản Xuất
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Giá Bán
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell">
                      Số Lượng
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden xl:table-cell">
                      Khối Lượng
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden xl:table-cell">
                      Đơn Vị
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Thao Tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedProducts.map((product) => (
                    <tr key={product.product_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {product.product_id}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {product.product_name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 hidden md:table-cell">
                        {product.sub_category_id}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 hidden lg:table-cell">
                        {product.manufacturing_location}
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold text-[#75b06f]">
                        {product.price_sell.toLocaleString('vi-VN')}₫
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 hidden sm:table-cell">
                        {product.quantity}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 hidden xl:table-cell">
                        {product.weight}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 hidden xl:table-cell">
                        {product.unit}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedProductForDiscounts(product);
                              setShowProductDiscountsModal(true);
                              setDiscountModalMode('list');
                            }}
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title="Xem Discounts"
                          >
                            <Percent className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenModal(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Sửa"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.product_id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center px-4 py-6 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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
                        onClick={() => setCurrentPage(pageNum as number)}
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
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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
                        setCurrentPage(page);
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

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                {editingProduct ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}
              </h2>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Product ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mã Sản Phẩm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.product_id}
                  onChange={(e) => setFormData({...formData, product_id: e.target.value})}
                  disabled={!!editingProduct}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] disabled:bg-gray-100"
                  placeholder="P001"
                />
              </div>

              {/* Sub Category ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mã Phân Loại <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.sub_category_id}
                  onChange={(e) => setFormData({...formData, sub_category_id: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                  placeholder="SC001"
                />
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên Sản Phẩm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.product_name}
                  onChange={(e) => setFormData({...formData, product_name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                  placeholder="Cá Hồi Nauy Phi Lê"
                />
              </div>

              {/* Manufacturing Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nơi Sản Xuất <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.manufacturing_location}
                  onChange={(e) => setFormData({...formData, manufacturing_location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                  placeholder="Na Uy"
                />
              </div>

              {/* Price Sell */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Giá Bán (VNĐ) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.price_sell}
                  onChange={(e) => setFormData({...formData, price_sell: Number(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                  placeholder="450000"
                  min="0"
                />
              </div>

              {/* Row: Quantity, Weight, Unit */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số Lượng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                    placeholder="50"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Khối Lượng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                    placeholder="0.5"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Đơn Vị <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="cái">cái</option>
                    <option value="hộp">hộp</option>
                    <option value="gói">gói</option>
                  </select>
                </div>
              </div>

              {/* Attributes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mô Tả Sản Phẩm
                </label>
                <div className="space-y-2">
                  {formData.attributes?.map((attr, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={attr.key}
                        onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                        className="w-1/2 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                        placeholder="Tên mô tả"
                      />
                      <input
                        type="text"
                        value={attr.value}
                        onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                        className="w-1/2 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                        placeholder="Giá trị mô tả"
                      />
                      <button
                        onClick={() => handleRemoveAttribute(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa mô tả"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddAttribute}
                    className="px-4 py-2 bg-[#75b06f] hover:bg-[#5c8c57] text-white font-semibold rounded-lg transition-colors"
                  >
                    Thêm Mô Tả
                  </button>
                </div>
              </div>

              {/* Image Upload Area */}
              <ImageUploader
                images={formData.images || []}
                onChange={(images) => setFormData({...formData, images})}
                maxImages={3}
                mainImageIndex={formData.mainImageIndex || 0}
                onSetMainImage={(index) => setFormData({...formData, mainImageIndex: index})}
              />
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
              <button
                onClick={() => setShowProductModal(false)}
                className="px-6 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveProduct}
                className="px-6 py-3 bg-[#75b06f] hover:bg-[#5c8c57] text-white font-semibold rounded-lg transition-colors"
              >
                {editingProduct ? "Cập Nhật" : "Thêm Sản Phẩm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discount Modal */}
      {showDiscountModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                {editingDiscount ? "Sửa Chương Trình Giảm Giá" : "Thêm Chương Trình Giảm Giá Mới"}
              </h2>
              <button
                onClick={() => setShowDiscountModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Program ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mã Chương Trình <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={discountFormData.program_id}
                  onChange={(e) => setDiscountFormData({...discountFormData, program_id: e.target.value})}
                  disabled={!!editingDiscount}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] disabled:bg-gray-100"
                  placeholder="DC001"
                />
              </div>

              {/* Product ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mã Sản Phẩm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={discountFormData.product_id}
                  onChange={(e) => setDiscountFormData({...discountFormData, product_id: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                  placeholder="P001"
                />
              </div>

              {/* Discount Percentage */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phần Trăm Giảm Giá <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={discountFormData.discount_percentage}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value <= 100) {
                        setDiscountFormData({...discountFormData, discount_percentage: value});
                      }
                    }}
                    className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                    placeholder="30"
                    min="0"
                    max="100"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    %
                  </span>
                </div>
              </div>

              {/* From Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ngày Bắt Đầu <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={discountFormData.from_date}
                  onChange={(e) => setDiscountFormData({...discountFormData, from_date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                />
              </div>

              {/* To Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ngày Kết Thúc <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={discountFormData.to_date}
                  onChange={(e) => setDiscountFormData({...discountFormData, to_date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                />
              </div>

              {/* Max Usage */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số Sản Phẩm Tối Đa <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={discountFormData.max_usage}
                  onChange={(e) => setDiscountFormData({...discountFormData, max_usage: Number(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                  placeholder="100"
                  min="0"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Trạng Thái <span className="text-red-500">*</span>
                </label>
                <select
                  value={discountFormData.status}
                  onChange={(e) => setDiscountFormData({...discountFormData, status: e.target.value as 'active' | 'pending' | 'expired' | 'delete'})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] bg-white"
                >
                  <option value="active">Đang Hoạt Động</option>
                  <option value="pending">Chờ Kích Hoạt</option>
                  <option value="expired">Hết Hạn</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
              <button
                onClick={() => setShowDiscountModal(false)}
                className="px-6 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveDiscount}
                className="px-6 py-3 bg-[#75b06f] hover:bg-[#5c8c57] text-white font-semibold rounded-lg transition-colors"
              >
                {editingDiscount ? "Cập Nhật" : "Thêm Chương Trình Giảm Giá"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Discounts List Modal */}
      {showProductDiscountsModal && selectedProductForDiscounts && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Percent className="w-6 h-6 text-orange-500" />
                    {discountModalMode === 'list' 
                      ? 'Discount Programs'
                      : editingDiscount 
                        ? 'Chỉnh Sửa Discount Program'
                        : 'Tạo Discount Program Mới'
                    }
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedProductForDiscounts.product_id} - {selectedProductForDiscounts.product_name}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowProductDiscountsModal(false);
                    setSelectedProductForDiscounts(null);
                    setDiscountModalMode('list');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              {discountModalMode === 'list' && (
                <button
                  onClick={() => {
                    const maxId = discountPrograms.reduce((max, d) => {
                      const num = parseInt(d.program_id.replace('DC', ''));
                      return num > max ? num : max;
                    }, 0);
                    const newId = `DC${String(maxId + 1).padStart(3, '0')}`;
                    const today = new Date().toISOString().split('T')[0];
                    
                    setDiscountFormData({
                      program_id: newId,
                      product_id: selectedProductForDiscounts.product_id,
                      discount_percentage: 0,
                      from_date: today,
                      to_date: "",
                      created_date: today,
                      updated_date: today,
                      max_usage: 0,
                      status: 'active'
                    });
                    setEditingDiscount(null);
                    setDiscountModalMode('form');
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Tạo Discount Program Mới</span>
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {discountModalMode === 'list' ? (() => {
                const productDiscounts = discountPrograms.filter(
                  d => d.product_id === selectedProductForDiscounts.product_id && d.status !== 'delete'
                );

                if (productDiscounts.length === 0) {
                  return (
                    <div className="text-center py-12">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center">
                          <Percent className="w-8 h-8 text-orange-300" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Chưa có Discount Program
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Sản phẩm này chưa có chương trình giảm giá nào
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    {productDiscounts.map((discount) => (
                      <div
                        key={discount.program_id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                              <Percent className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-gray-900">{discount.program_id}</h3>
                                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                                  discount.status === 'active' ? 'bg-green-100 text-green-700' :
                                  discount.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                  discount.status === 'expired' ? 'bg-gray-100 text-gray-600' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {discount.status === 'active' ? 'Đang Hoạt Động' :
                                   discount.status === 'pending' ? 'Chờ Kích Hoạt' :
                                   discount.status === 'expired' ? 'Hết Hạn' :
                                   'Đã Xóa'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">
                                {selectedProductForDiscounts.product_name}
                              </p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500 text-white text-lg font-bold rounded-full">
                            <Percent className="w-4 h-4" />
                            {discount.discount_percentage}%
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Ngày Bắt Đầu</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {new Date(discount.from_date).toLocaleDateString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Ngày Kết Thúc</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {new Date(discount.to_date).toLocaleDateString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Số Sản Phẩm Tối Đa</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {discount.max_usage} lần
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Cập Nhật Lần Cuối</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {new Date(discount.updated_date).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                          <button
                            onClick={() => {
                              setEditingDiscount(discount);
                              setDiscountFormData(discount);
                              setDiscountModalMode('form');
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            Sửa
                          </button>
                          {discount.status === 'pending' && (
                            <button
                              onClick={() => handleActivateDiscount(discount.program_id)}
                              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Kích Hoạt
                            </button>
                          )}
                          <button
                            onClick={() => {
                              handleDeleteDiscount(discount.program_id);
                              const remainingDiscounts = discountPrograms.filter(
                                d => d.product_id === selectedProductForDiscounts.product_id && 
                                d.program_id !== discount.program_id && 
                                d.status !== 'delete'
                              );
                              if (remainingDiscounts.length === 0) {
                                setShowProductDiscountsModal(false);
                                setSelectedProductForDiscounts(null);
                                setDiscountModalMode('list');
                              }
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Xóa
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })() : (
                <div className="space-y-4">
                  {/* Program ID */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mã Chương Trình
                    </label>
                    <input
                      type="text"
                      value={discountFormData.program_id}
                      disabled
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                      placeholder="DC001"
                    />
                  </div>

                  {/* Product ID */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mã Sản Phẩm
                    </label>
                    <input
                      type="text"
                      value={discountFormData.product_id}
                      disabled
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                      placeholder="P001"
                    />
                  </div>

                  {/* Discount Percentage */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phần Trăm Giảm Giá <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={discountFormData.discount_percentage}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value <= 100) {
                            setDiscountFormData({...discountFormData, discount_percentage: value});
                          }
                        }}
                        className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                        placeholder="30"
                        min="0"
                        max="100"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                        %
                      </span>
                    </div>
                  </div>

                  {/* From Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ngày Bắt Đầu <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={discountFormData.from_date}
                      onChange={(e) => setDiscountFormData({...discountFormData, from_date: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                    />
                  </div>

                  {/* To Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ngày Kết Thúc <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={discountFormData.to_date}
                      onChange={(e) => setDiscountFormData({...discountFormData, to_date: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                    />
                  </div>

                  {/* Max Usage */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số Sản Phẩm Tối Đa <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={discountFormData.max_usage}
                      onChange={(e) => setDiscountFormData({...discountFormData, max_usage: Number(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                      placeholder="100"
                      min="0"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Trạng Thái <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={discountFormData.status}
                      onChange={(e) => setDiscountFormData({...discountFormData, status: e.target.value as 'active' | 'pending' | 'expired' | 'delete'})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] bg-white"
                    >
                      <option value="active">Đang Hoạt Động</option>
                      <option value="pending">Chờ Kích Hoạt</option>
                      <option value="expired">Hết Hạn</option>
                    </select>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        setDiscountModalMode('list');
                        setEditingDiscount(null);
                      }}
                      className="flex-1 px-6 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => {
                        const updatedData = {
                          ...discountFormData,
                          updated_date: new Date().toISOString().split('T')[0]
                        };

                        if (editingDiscount) {
                          setDiscountPrograms(discountPrograms.map(d => 
                            d.program_id === editingDiscount.program_id ? updatedData : d
                          ));
                        } else {
                          setDiscountPrograms([...discountPrograms, updatedData]);
                        }
                        setDiscountModalMode('list');
                        setEditingDiscount(null);
                      }}
                      className="flex-1 px-6 py-3 bg-[#75b06f] hover:bg-[#5c8c57] text-white font-semibold rounded-lg transition-colors"
                    >
                      {editingDiscount ? "Cập Nhật" : "Tạo Discount Program"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}