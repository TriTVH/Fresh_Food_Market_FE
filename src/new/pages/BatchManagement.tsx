import { useState } from "react";
import {
  Package,
  Search,
  Plus,
  Edit,
  Eye,
  X,
  Calendar,
  Box,
  FileText,
  ChevronDown,
  ChevronUp,
  Minus,
  CheckCircle,
  Hash,
  Truck,
  AlertTriangle,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
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

// Mock products data
const MOCK_PRODUCTS: Product[] = [
  {
    product_id: "P004",
    sub_category_id: "SC004",
    product_name: "Xà Lách Tươi",
    description: "Xà lách tươi Đà Lạt, giòn ngọt",
    manufacturing_location: "Đà Lạt, Việt Nam",
    price_sell: 28000,
    quantity: 150,
    weight: 300,
    unit: "gram",
    status: 'active',
  },
  {
    product_id: "P005",
    sub_category_id: "SC004",
    product_name: "Cà Chua Bi",
    description: "Cà chua bi ngọt, giàu vitamin",
    manufacturing_location: "Đà Lạt, Việt Nam",
    price_sell: 45000,
    quantity: 200,
    weight: 500,
    unit: "gram",
    status: 'active',
  },
  {
    product_id: "P006",
    sub_category_id: "SC005",
    product_name: "Bơ Booth",
    description: "Bơ booth nhập khẩu, béo ngậy",
    manufacturing_location: "Úc",
    price_sell: 89000,
    quantity: 100,
    weight: 1,
    unit: "trái",
    status: 'active',
  },
  {
    product_id: "P007",
    sub_category_id: "SC005",
    product_name: "Dâu Tây Đà Lạt",
    description: "Dâu tây tươi Đà Lạt, ngọt tự nhiên",
    manufacturing_location: "Đà Lạt, Việt Nam",
    price_sell: 120000,
    quantity: 80,
    weight: 500,
    unit: "gram",
    status: 'active',
  },
  {
    product_id: "P008",
    sub_category_id: "SC004",
    product_name: "Cải Kale",
    description: "Cải kale hữu cơ, giàu dinh dưỡng",
    manufacturing_location: "Đà Lạt, Việt Nam",
    price_sell: 42000,
    quantity: 120,
    weight: 300,
    unit: "gram",
    status: 'active',
  },
];

interface BatchDetail {
  batch_detail_id: string;
  product_id: string;
  batch_id: string;
  quantity: number;
  subtotal: number;
  expired_date: string;
  remaining_quantity: number;
}

interface Batch {
  batch_id: string;
  account_id: string;
  account_name: string;
  supplier_phone: string;
  product_id: string | null;
  status: "delivering" | "completed" | "delete";
  total_items: number;
  batch_code: string;
  quantity: number;
  delivered_date: string;
  total_price: number;
  created_date: string;
  updated_date: string;
  details: BatchDetail[];
  verification_images?: string[]; // URLs của ảnh minh chứng
}

interface BatchManagementProps {
  onPageChange: (page: string) => void;
  currentUser: { email: string; name: string; role?: string } | null;
  onLogout: () => void;
}

interface SelectedProduct {
  product: Product;
  quantity: number;
  expired_date: string;
}

// Mock data
const MOCK_BATCHES: Batch[] = [
  {
    batch_id: "B001",
    account_id: "ACC001",
    account_name: "Nguyễn Văn B",
    supplier_phone: "0901234567",
    product_id: null,
    status: "completed",
    total_items: 80,
    batch_code: "BATCH-2026-001",
    quantity: 80,
    delivered_date: "2026-01-10",
    total_price: 2750000,
    created_date: "2026-01-10",
    updated_date: "2026-01-10",
    verification_images: [
      "https://images.unsplash.com/photo-1768796372882-8b67936af681?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1706605212111-cb4426970ab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1765144815892-1925a0def4a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    details: [
      {
        batch_detail_id: "BD001",
        product_id: "P004",
        batch_id: "B001",
        quantity: 50,
        subtotal: 1400000,
        expired_date: "2026-01-20",
        remaining_quantity: 50,
      },
      {
        batch_detail_id: "BD002",
        product_id: "P005",
        batch_id: "B001",
        quantity: 30,
        subtotal: 1350000,
        expired_date: "2026-01-20",
        remaining_quantity: 30,
      },
    ],
  },
  {
    batch_id: "B002",
    account_id: "ACC002",
    account_name: "Nguyễn Văn A",
    supplier_phone: "0912345678",
    product_id: null,
    status: "delivering",
    total_items: 90,
    batch_code: "BATCH-2026-002",
    quantity: 90,
    delivered_date: "2026-01-12",
    total_price: 8940000,
    created_date: "2026-01-12",
    updated_date: "2026-01-12",
    details: [
      {
        batch_detail_id: "BD003",
        product_id: "P006",
        batch_id: "B002",
        quantity: 60,
        subtotal: 5340000,
        expired_date: "2026-01-25",
        remaining_quantity: 60,
      },
      {
        batch_detail_id: "BD004",
        product_id: "P007",
        batch_id: "B002",
        quantity: 30,
        subtotal: 3600000,
        expired_date: "2026-01-25",
        remaining_quantity: 30,
      },
    ],
  },
];

export function BatchManagement({ onPageChange, currentUser, onLogout }: BatchManagementProps) {
  const [batches, setBatches] = useState<Batch[]>(MOCK_BATCHES);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [expandedBatchId, setExpandedBatchId] = useState<string | null>(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState<Set<string>>(new Set());
  const [missingProducts, setMissingProducts] = useState<Map<string, number>>(new Map());
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  // Form state
  const [batchCode, setBatchCode] = useState("");
  const [warehouseStaffName, setWarehouseStaffName] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [deliveredDate, setDeliveredDate] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [searchProduct, setSearchProduct] = useState("");

  // Helper: Get product name by ID
  const getProductName = (productId: string): string => {
    const product = MOCK_PRODUCTS.find(p => p.product_id === productId);
    return product ? product.product_name : "Unknown Product";
  };

  // Remove Vietnamese tones for search
  const removeVietnameseTones = (str: string): string => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  // Get status info
  const getStatusInfo = (status: "delivering" | "completed" | "delete") => {
    switch (status) {
      case "delivering":
        return { label: "Đang Giao", color: "text-orange-600 bg-orange-50" };
      case "completed":
        return { label: "Hoàn Thành", color: "text-green-600 bg-green-50" };
      default:
        return { label: "Đã Xóa", color: "text-gray-600 bg-gray-50" };
    }
  };

  // Generate batch code automatically
  const generateBatchCode = () => {
    const now = new Date();
    const year = now.getFullYear();
    
    // Find max batch number for current year
    const currentYearBatches = batches.filter(b => 
      b.batch_code.startsWith(`BATCH-${year}`)
    );
    
    let maxNum = 0;
    currentYearBatches.forEach(b => {
      const match = b.batch_code.match(/BATCH-\d{4}-(\d{3})/);
      if (match) {
        const num = parseInt(match[1]);
        if (num > maxNum) maxNum = num;
      }
    });
    
    return `BATCH-${year}-${String(maxNum + 1).padStart(3, "0")}`;
  };

  const handleOpenAddModal = () => {
    setBatchCode(generateBatchCode());
    setWarehouseStaffName(currentUser?.name || "");
    setSupplierPhone("0912345678"); // Auto set default phone for demo
    setDeliveredDate(new Date().toISOString().split("T")[0]); // Auto set current date
    setSelectedProducts([]);
    setSearchProduct("");
    setShowModal(true);
  };

  const handleViewDetails = (batch: Batch) => {
    setSelectedBatch(batch);
    setShowDetailModal(true);
  };

  const handleOpenCompleteModal = (batch: Batch) => {
    setSelectedBatch(batch);
    setCheckedProducts(new Set());
    setMissingProducts(new Map());
    // Reset image uploads
    imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
    setUploadedImages([]);
    setImagePreviewUrls([]);
    setShowCompleteModal(true);
  };

  const handleCloseCompleteModal = () => {
    // Clean up image preview URLs
    imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
    setUploadedImages([]);
    setImagePreviewUrls([]);
    setShowCompleteModal(false);
  };

  const handleToggleProductCheck = (productId: string) => {
    const newChecked = new Set(checkedProducts);
    if (newChecked.has(productId)) {
      newChecked.delete(productId);
      // Also remove from missing if unchecked
      const newMissing = new Map(missingProducts);
      newMissing.delete(productId);
      setMissingProducts(newMissing);
    } else {
      newChecked.add(productId);
    }
    setCheckedProducts(newChecked);
  };

  const handleToggleMissing = (productId: string) => {
    const newMissing = new Map(missingProducts);
    if (newMissing.has(productId)) {
      newMissing.delete(productId);
    } else {
      newMissing.set(productId, 1); // Default missing quantity is 1
    }
    setMissingProducts(newMissing);
  };

  const handleUpdateMissingQuantity = (productId: string, quantity: number) => {
    const newMissing = new Map(missingProducts);
    newMissing.set(productId, quantity);
    setMissingProducts(newMissing);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const newImages = [...uploadedImages, ...fileArray];
    
    // Limit to 5 images
    if (newImages.length > 5) {
      alert("Bạn chỉ có thể tải lên tối đa 5 ảnh!");
      return;
    }

    setUploadedImages(newImages);

    // Create preview URLs
    const newPreviewUrls = fileArray.map(file => URL.createObjectURL(file));
    setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    const newPreviewUrls = imagePreviewUrls.filter((_, i) => i !== index);
    
    // Revoke the URL to free memory
    URL.revokeObjectURL(imagePreviewUrls[index]);
    
    setUploadedImages(newImages);
    setImagePreviewUrls(newPreviewUrls);
  };

  const handleConfirmComplete = () => {
    if (!selectedBatch) return;

    // Check if all products are checked
    const allProductIds = selectedBatch.details.map(d => d.product_id);
    const allChecked = allProductIds.every(id => checkedProducts.has(id));

    if (!allChecked) {
      alert("Vui lòng kiểm tra tất cả sản phẩm trước khi hoàn thành!");
      return;
    }

    // Check if missing products have valid quantities
    for (const [productId, quantity] of missingProducts.entries()) {
      if (quantity <= 0) {
        alert("Vui lòng nhập số lượng thiếu hợp lệ cho tất cả sản phẩm bị thiếu!");
        return;
      }
      // Check if missing quantity exceeds batch quantity
      const detail = selectedBatch.details.find(d => d.product_id === productId);
      if (detail && quantity > detail.quantity) {
        const productName = getProductName(productId);
        alert(`Số lượng thiếu của "${productName}" không được vượt quá số lượng trong lô hàng (${detail.quantity})!`);
        return;
      }
    }

    // Check images requirement
    if (uploadedImages.length === 0) {
      alert("Vui lòng tải lên ít nhất 1 ảnh minh chứng trước khi hoàn thành!");
      return;
    }

    // Build report message
    let message = "Đã đánh dấu lô hàng là Hoàn Thành!";
    message += `\n\nSố lượng ảnh minh chứng: ${uploadedImages.length}`;
    if (missingProducts.size > 0) {
      message += "\n\nBáo cáo sản phẩm thiếu:";
      missingProducts.forEach((missingQty, productId) => {
        const productName = getProductName(productId);
        const detail = selectedBatch.details.find(d => d.product_id === productId);
        const totalQty = detail?.quantity || 0;
        const remainingQty = totalQty - missingQty;
        message += `\n- ${productName}: Thiếu ${missingQty}/${totalQty} (Còn lại: ${remainingQty})`;
      });
    }

    const updatedBatches = batches.map((batch) =>
      batch.batch_id === selectedBatch.batch_id
        ? { 
            ...batch, 
            status: "completed" as const, 
            delivered_date: new Date().toISOString().split("T")[0],
            updated_date: new Date().toISOString().split("T")[0],
            // Save verification images (in real app, upload to server first)
            verification_images: imagePreviewUrls,
            // Update remaining_quantity for each detail
            details: batch.details.map(detail => ({
              ...detail,
              remaining_quantity: detail.quantity - (missingProducts.get(detail.product_id) || 0)
            }))
          }
        : batch
    );
    setBatches(updatedBatches);
    setShowCompleteModal(false);
    setSelectedBatch(null);
    setCheckedProducts(new Set());
    setMissingProducts(new Map());
    
    // Don't clean up image preview URLs yet - they're now stored in batch data
    setUploadedImages([]);
    setImagePreviewUrls([]);
    
    alert(message);
  };

  const handleAddProduct = (product: Product) => {
    const existing = selectedProducts.find(sp => sp.product.product_id === product.product_id);
    if (existing) {
      alert("Sản phẩm này đã được thêm vào danh sách!");
      return;
    }
    setSelectedProducts([...selectedProducts, { product, quantity: 1, expired_date: "2026-01-20" }]);
    setSearchProduct("");
  };

  const handleUpdateProductQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setSelectedProducts(selectedProducts.map(sp => 
      sp.product.product_id === productId 
        ? { ...sp, quantity }
        : sp
    ));
  };

  const handleUpdateProductExpiredDate = (productId: string, expiredDate: string) => {
    setSelectedProducts(selectedProducts.map(sp => 
      sp.product.product_id === productId 
        ? { ...sp, expired_date: expiredDate }
        : sp
    ));
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(sp => sp.product.product_id !== productId));
  };

  const getTotalItems = () => {
    return selectedProducts.reduce((sum, sp) => sum + sp.quantity, 0);
  };

  const getTotalValue = () => {
    return selectedProducts.reduce((sum, sp) => sum + (sp.product.price_sell * sp.quantity), 0);
  };

  const handleSaveBatch = () => {
    if (
      !warehouseStaffName ||
      !batchCode ||
      !deliveredDate ||
      selectedProducts.length === 0
    ) {
      alert("Vui lòng điền đầy đủ thông tin và thêm ít nhất 1 sản phẩm!");
      return;
    }

    // Generate new ID
    const maxId = batches.reduce((max, b) => {
      const num = parseInt(b.batch_id.substring(1));
      return num > max ? num : max;
    }, 0);
    const newBatchId = `B${String(maxId + 1).padStart(3, "0")}`;

    // Create batch details
    const details: BatchDetail[] = selectedProducts.map((sp, index) => ({
      batch_detail_id: `BD${String(Date.now() + index).padStart(10, "0")}`,
      product_id: sp.product.product_id,
      batch_id: newBatchId,
      quantity: sp.quantity,
      subtotal: sp.product.price_sell * sp.quantity,
      expired_date: sp.expired_date,
      remaining_quantity: sp.quantity, // Initially, remaining equals quantity
    }));

    const newBatch: Batch = {
      batch_id: newBatchId,
      account_id: `ACC${String(maxId + 1).padStart(3, "0")}`,
      account_name: warehouseStaffName,
      supplier_phone: supplierPhone,
      product_id: null,
      status: "delivering", // New batch starts as delivering
      total_items: getTotalItems(),
      batch_code: batchCode,
      quantity: getTotalItems(),
      delivered_date: deliveredDate,
      total_price: getTotalValue(),
      created_date: new Date().toISOString().split("T")[0],
      updated_date: new Date().toISOString().split("T")[0],
      details,
    };

    setBatches([newBatch, ...batches]);
    alert("Thêm lô hàng thành công!");
    setShowModal(false);
  };

  const toggleExpandBatch = (batchId: string) => {
    setExpandedBatchId(expandedBatchId === batchId ? null : batchId);
  };

  // Filter batches by search term and exclude deleted batches
  const filteredBatches = batches
    .filter((batch) => {
      // Exclude deleted batches
      if (batch.status === "delete") return false;
      
      const searchLower = removeVietnameseTones(searchTerm);
      return (
        removeVietnameseTones(batch.batch_code).includes(searchLower) ||
        removeVietnameseTones(batch.account_name).includes(searchLower) ||
        batch.details.some(d => removeVietnameseTones(getProductName(d.product_id)).includes(searchLower))
      );
    })
    .sort((a, b) => {
      const searchLower = removeVietnameseTones(searchTerm);
      
      // Priority 0: If searching, prioritize staff name matches first
      if (searchTerm) {
        const aStaffMatch = removeVietnameseTones(a.account_name).includes(searchLower);
        const bStaffMatch = removeVietnameseTones(b.account_name).includes(searchLower);
        
        if (aStaffMatch && !bStaffMatch) return -1;
        if (!aStaffMatch && bStaffMatch) return 1;
      }
      
      // Priority 1: Current user's batches first (when not searching or both match search)
      const aIsCurrentUser = a.account_name === currentUser?.name;
      const bIsCurrentUser = b.account_name === currentUser?.name;
      
      if (aIsCurrentUser && !bIsCurrentUser) return -1;
      if (!aIsCurrentUser && bIsCurrentUser) return 1;
      
      // Priority 2: Sort by created date (newest first)
      return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
    });

  // Filter products for selection
  const availableProducts = MOCK_PRODUCTS.filter(p =>
    p.status === 'active' &&
    removeVietnameseTones(p.product_name).includes(removeVietnameseTones(searchProduct))
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        sections={getSidebarConfig(currentUser?.role === 'supplier' ? 'supplier' : 'admin')}
        activePage="batch-management"
        onPageChange={onPageChange}
        onLogout={onLogout}
        showMobile={showMobileSidebar}
        onCloseMobile={() => setShowMobileSidebar(false)}
        currentUser={currentUser}
      />

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Quản Lý Lô Hàng
                </h1>
                <p className="text-gray-600 mt-1">
                  Quản lý thông tin lô hàng nhập kho
                </p>
              </div>
              <button
                onClick={handleOpenAddModal}
                className="bg-[#75b06f] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-[#5a9450] transition-colors flex items-center gap-2 font-semibold"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Thêm Lô Hàng</span>
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo mã lô, sản phẩm, nhân viên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Tổng Lô Hàng</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {batches.filter(b => b.status !== "delete").length}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Đang Giao</p>
                  <p className="text-2xl font-bold text-orange-600 mt-1">
                    {batches.filter(b => b.status === "delivering").length}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Truck className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Hoàn Thành</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {batches.filter(b => b.status === "completed").length}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Batches Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600">
                      Mã Lô
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600">
                      Nhà Cung Cấp
                    </th>
                    <th className="px-4 py-4 text-right text-sm font-semibold text-gray-600">
                      Tổng SL
                    </th>
                    <th className="px-4 py-4 text-right text-sm font-semibold text-gray-600">
                      Tổng Giá Trị
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600">
                      Ngày Giao Hàng
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600">
                      Trạng Thái
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-gray-600">
                      Thao Tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBatches.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Package className="w-12 h-12 mb-2 opacity-50" />
                          <p>Không tìm thấy lô hàng nào</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredBatches.flatMap((batch) => {
                      const statusInfo = getStatusInfo(batch.status);
                      const isExpanded = expandedBatchId === batch.batch_id;

                      const rows = [
                        <tr key={batch.batch_id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleExpandBatch(batch.batch_id)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </button>
                              <span className="font-semibold text-gray-800">
                                {batch.batch_code}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-gray-600">
                              {batch.account_name}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <span className="font-semibold text-gray-800">
                              {batch.total_items}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <span className="font-semibold text-[#75b06f]">
                              {formatPrice(batch.total_price)}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-gray-600">
                              {batch.status === "delivering" ? "-" : formatDate(batch.delivered_date)}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}
                            >
                              {statusInfo.label}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleViewDetails(batch)}
                                className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Xem chi tiết"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              {batch.status === "delivering" && currentUser?.role !== 'supplier' && (
                                <button
                                  onClick={() => handleOpenCompleteModal(batch)}
                                  className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Hoàn thành"
                                >
                                  <CheckCircle className="w-5 h-5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ];

                      // Add expanded row if needed
                      if (isExpanded) {
                        rows.push(
                          <tr key={`${batch.batch_id}-detail`}>
                            <td colSpan={7} className="px-4 py-4 bg-gray-50">
                              <div className="pl-8">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                  <Hash className="w-4 h-4" />
                                  Danh Sách Sản Phẩm Trong Lô
                                </h4>
                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                  <table className="w-full">
                                    <thead className="bg-gray-50 border-b">
                                      <tr>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                                          Sản Phẩm
                                        </th>
                                        <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">
                                          Số Lượng
                                        </th>
                                        {batch.status === "completed" && (
                                          <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">
                                            Còn Lại
                                          </th>
                                        )}
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                                          Hạn Sử Dụng
                                        </th>
                                        <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">
                                          Thành Tiền
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                      {batch.details.map((detail) => {
                                        const hasMissing = batch.status === "completed" && detail.remaining_quantity < detail.quantity;
                                        const missingQty = detail.quantity - detail.remaining_quantity;
                                        return (
                                          <tr key={detail.batch_detail_id} className={hasMissing ? 'bg-red-50' : ''}>
                                            <td className="px-4 py-2 text-sm text-gray-800">
                                              <div className="flex items-center gap-1">
                                                {hasMissing && (
                                                  <AlertTriangle className="w-3 h-3 text-red-600 flex-shrink-0" />
                                                )}
                                                <span>{getProductName(detail.product_id)}</span>
                                              </div>
                                            </td>
                                            <td className="px-4 py-2 text-sm text-right font-semibold text-gray-800">
                                              {detail.quantity}
                                            </td>
                                            {batch.status === "completed" && (
                                              <td className="px-4 py-2 text-sm text-right">
                                                <span className={`font-semibold ${hasMissing ? 'text-red-600' : 'text-green-600'}`}>
                                                  {detail.remaining_quantity}
                                                </span>
                                                {hasMissing && (
                                                  <span className="text-xs text-red-600 block">
                                                    (Thiếu: {missingQty})
                                                  </span>
                                                )}
                                              </td>
                                            )}
                                            <td className="px-4 py-2 text-sm text-gray-600">
                                              {formatDate(detail.expired_date)}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-right font-semibold text-[#75b06f]">
                                              {formatPrice(detail.subtotal)}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      }

                      return rows;
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">
                    Thêm Lô Hàng Mới
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-hidden flex flex-col md:flex-row min-h-0">
                {/* Left Side - Batch Info & Product Selection */}
                <div className="flex-1 overflow-y-auto p-4 border-r">
                  <div className="space-y-4">
                    {/* Batch Info */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h3 className="font-bold text-gray-800 mb-3 text-sm">Thông Tin Lô Hàng</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Mã Lô Hàng *
                          </label>
                          <input
                            type="text"
                            value={batchCode}
                            readOnly
                            disabled
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                            placeholder="Tự động sinh"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Nhà Cung Cấp *
                          </label>
                          <input
                            type="text"
                            value={warehouseStaffName}
                            readOnly
                            disabled
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                            placeholder="Tự động từ tài khoản"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Product Selection */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2 text-sm">Chọn Sản Phẩm</h3>
                      <div className="relative mb-3">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Tìm kiếm sản phẩm..."
                          value={searchProduct}
                          onChange={(e) => setSearchProduct(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-transparent"
                        />
                      </div>

                      {/* Product List */}
                      <div className="bg-gray-50 rounded-lg border border-gray-200 max-h-64 overflow-y-auto">
                        {availableProducts.length === 0 ? (
                          <div className="p-6 text-center text-gray-500">
                            <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Không tìm thấy sản phẩm</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-gray-200">
                            {availableProducts.map((product) => {
                              const isSelected = selectedProducts.some(
                                sp => sp.product.product_id === product.product_id
                              );
                              return (
                                <div
                                  key={product.product_id}
                                  className={`p-3 hover:bg-white transition-colors ${
                                    isSelected ? 'bg-green-50' : ''
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                      <p className="font-semibold text-gray-800 truncate text-sm">
                                        {product.product_name}
                                      </p>
                                      <p className="text-xs text-gray-600">
                                        {formatPrice(product.price_sell)} / {product.weight}{product.unit}
                                      </p>
                                      <p className="text-xs text-gray-500 mt-0.5">
                                        Nguồn: {product.manufacturing_location}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => handleAddProduct(product)}
                                      disabled={isSelected}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                                        isSelected
                                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                          : 'bg-[#75b06f] text-white hover:bg-[#5a9450]'
                                      }`}
                                    >
                                      {isSelected ? (
                                        <>
                                          <CheckCircle className="w-3.5 h-3.5" />
                                          Đã chọn
                                        </>
                                      ) : (
                                        <>
                                          <Plus className="w-3.5 h-3.5" />
                                          Thêm
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Selected Products */}
                <div className="w-full md:w-80 flex flex-col bg-gray-50">
                  <div className="px-4 py-3 border-b bg-white">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                      <Package className="w-4 h-4 text-[#75b06f]" />
                      Sản Phẩm Đã Chọn ({selectedProducts.length})
                    </h3>
                  </div>

                  <div className="flex-1 overflow-y-auto p-3 min-h-0">
                    {selectedProducts.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-gray-400 p-4">
                        <Box className="w-12 h-12 mb-2 opacity-50" />
                        <p className="text-center text-sm">Chưa có sản phẩm</p>
                        <p className="text-xs text-center mt-1">Chọn từ danh sách bên trái</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {selectedProducts.map((sp) => (
                          <div
                            key={sp.product.product_id}
                            className="bg-white rounded-lg p-3 shadow-sm border border-gray-200"
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-800 text-xs truncate">
                                  {sp.product.product_name}
                                </p>
                                <p className="text-xs text-gray-600 mt-0.5">
                                  {formatPrice(sp.product.price_sell)}
                                </p>
                              </div>
                              <button
                                onClick={() => handleRemoveProduct(sp.product.product_id)}
                                className="p-1 rounded-lg hover:bg-red-50 text-red-600 flex-shrink-0"
                                title="Xóa sản phẩm"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center gap-1.5 mb-2">
                              <button
                                onClick={() => handleUpdateProductQuantity(sp.product.product_id, sp.quantity - 1)}
                                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 border border-gray-300"
                                disabled={sp.quantity <= 1}
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <input
                                type="number"
                                value={sp.quantity}
                                onChange={(e) => handleUpdateProductQuantity(sp.product.product_id, parseInt(e.target.value) || 1)}
                                className="flex-1 px-2 py-1.5 text-center text-xs border border-gray-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-transparent"
                                min="1"
                              />
                              <button
                                onClick={() => handleUpdateProductQuantity(sp.product.product_id, sp.quantity + 1)}
                                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 border border-gray-300"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="mb-2">
                              <label className="block text-xs text-gray-600 mb-1">Hạn sử dụng:</label>
                              <input
                                type="date"
                                value={sp.expired_date}
                                onChange={(e) => handleUpdateProductExpiredDate(sp.product.product_id, e.target.value)}
                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-transparent"
                              />
                            </div>

                            <div className="pt-2 border-t border-gray-200 text-right">
                              <span className="text-xs text-gray-600">Thành tiền: </span>
                              <span className="font-bold text-[#75b06f] text-xs">
                                {formatPrice(sp.product.price_sell * sp.quantity)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  {selectedProducts.length > 0 && (
                    <div className="px-3 py-2.5 bg-white border-t border-gray-200">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-600">Tổng Số Lượng:</span>
                          <span className="font-bold text-gray-800">{getTotalItems()}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1.5 border-t border-gray-200">
                          <span className="font-semibold text-gray-800 text-xs">Tổng Giá Trị:</span>
                          <span className="font-bold text-[#75b06f] text-sm">{formatPrice(getTotalValue())}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t bg-gray-50">
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSaveBatch}
                    className="flex-1 px-4 py-2 text-sm bg-[#75b06f] text-white rounded-lg font-semibold hover:bg-[#5a9450] transition-colors"
                  >
                    Thêm Lô Hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedBatch && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Chi Tiết Lô Hàng
                  </h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Batch Info */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">
                      Thông Tin Lô Hàng
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Mã Lô:</p>
                        <p className="font-semibold text-gray-800">
                          {selectedBatch.batch_code}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Nhà Cung Cấp:</p>
                        <p className="font-semibold text-gray-800">
                          {selectedBatch.account_name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Số Điện Thoại:</p>
                        <p className="font-semibold text-gray-800">
                          {selectedBatch.supplier_phone}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tổng Số Lượng:</p>
                        <p className="font-semibold text-gray-800">
                          {selectedBatch.total_items}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tổng Giá Trị:</p>
                        <p className="font-semibold text-[#75b06f]">
                          {formatPrice(selectedBatch.total_price)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Ngày Tạo:</p>
                        <p className="font-semibold text-gray-800">
                          {formatDate(selectedBatch.created_date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Ngày Giao Hàng:</p>
                        <p className="font-semibold text-gray-800">
                          {formatDate(selectedBatch.delivered_date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Trạng Thái:</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusInfo(selectedBatch.status).color}`}>
                          {getStatusInfo(selectedBatch.status).label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Batch Details */}
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-4">
                      Chi Tiết Sản Phẩm
                    </h3>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                              Sản Phẩm
                            </th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
                              Số Lượng
                            </th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
                              Còn Lại
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                              Hạn Sử Dụng
                            </th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
                              Thành Tiền
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {selectedBatch.details.map((detail) => {
                            const hasMissing = detail.remaining_quantity < detail.quantity;
                            const missingQty = detail.quantity - detail.remaining_quantity;
                            return (
                              <tr key={detail.batch_detail_id} className={hasMissing ? 'bg-red-50' : ''}>
                                <td className="px-4 py-3 text-sm text-gray-800">
                                  <div className="flex items-center gap-2">
                                    {hasMissing && (
                                      <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                                    )}
                                    <span>{getProductName(detail.product_id)}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-right font-semibold text-gray-800">
                                  {detail.quantity}
                                </td>
                                <td className="px-4 py-3 text-sm text-right">
                                  <span className={`font-semibold ${hasMissing ? 'text-red-600' : 'text-green-600'}`}>
                                    {detail.remaining_quantity}
                                  </span>
                                  {hasMissing && (
                                    <span className="text-xs text-red-600 block">
                                      (Thiếu: {missingQty})
                                    </span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                  {formatDate(detail.expired_date)}
                                </td>
                                <td className="px-4 py-3 text-sm text-right font-semibold text-[#75b06f]">
                                  {formatPrice(detail.subtotal)}
                                </td>
                              </tr>
                            );
                          })}
                          <tr className="bg-gray-50 font-bold">
                            <td colSpan={1} className="px-4 py-3 text-sm text-right text-gray-800">
                              Tổng Cộng:
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-gray-800">
                              {selectedBatch.total_items}
                            </td>
                            <td className="px-4 py-3 text-sm text-right">
                              <span className={`${
                                selectedBatch.details.some(d => d.remaining_quantity < d.quantity)
                                  ? 'text-red-600'
                                  : 'text-green-600'
                              }`}>
                                {selectedBatch.details.reduce((sum, d) => sum + d.remaining_quantity, 0)}
                              </span>
                            </td>
                            <td></td>
                            <td className="px-4 py-3 text-sm text-right text-[#75b06f]">
                              {formatPrice(selectedBatch.total_price)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Verification Images Section */}
                  {selectedBatch.verification_images && selectedBatch.verification_images.length > 0 ? (
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-[#75b06f]" />
                        Ảnh Minh Chứng Kiểm Tra ({selectedBatch.verification_images.length})
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedBatch.verification_images.map((imageUrl, index) => (
                          <div
                            key={index}
                            className="relative group rounded-lg overflow-hidden border-2 border-gray-200 hover:border-[#75b06f] transition-all cursor-pointer"
                            onClick={() => window.open(imageUrl, '_blank')}
                          >
                            <img
                              src={imageUrl}
                              alt={`Ảnh minh chứng ${index + 1}`}
                              className="w-full h-40 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                              <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                              {index + 1}/{selectedBatch.verification_images.length}
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-3 italic">
                        * Nhấn vào ảnh để xem kích thước đầy đủ
                      </p>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-center">
                      <ImageIcon className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                      <h3 className="font-bold text-lg text-gray-800 mb-2">
                        Chưa Có Ảnh Minh Chứng
                      </h3>
                      <p className="text-sm text-gray-600">
                        Ảnh minh chứng sẽ được tải lên khi hoàn thành kiểm tra lô hàng
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t bg-gray-50">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Complete Modal */}
        {showCompleteModal && selectedBatch && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Hoàn Thành Lô Hàng
                  </h2>
                  <button
                    onClick={handleCloseCompleteModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Batch Info */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">
                      Thông Tin Lô Hàng
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Mã Lô:</p>
                        <p className="font-semibold text-gray-800">
                          {selectedBatch.batch_code}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Nhà Cung Cấp:</p>
                        <p className="font-semibold text-gray-800">
                          {selectedBatch.account_name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Số Điện Thoại:</p>
                        <p className="font-semibold text-gray-800">
                          {selectedBatch.supplier_phone}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tổng Số Lượng:</p>
                        <p className="font-semibold text-gray-800">
                          {selectedBatch.total_items}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tổng Giá Trị:</p>
                        <p className="font-semibold text-[#75b06f]">
                          {formatPrice(selectedBatch.total_price)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Ngày Tạo:</p>
                        <p className="font-semibold text-gray-800">
                          {formatDate(selectedBatch.created_date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Ngày Giao Hàng:</p>
                        <p className="font-semibold text-gray-800">
                          {formatDate(selectedBatch.delivered_date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Trạng Thái:</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusInfo(selectedBatch.status).color}`}>
                          {getStatusInfo(selectedBatch.status).label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Batch Details */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-gray-800">
                        Kiểm Tra Sản Phẩm
                      </h3>
                      <div className="text-sm flex gap-4">
                        <div>
                          <span className="text-gray-600">Đã kiểm tra: </span>
                          <span className="font-bold text-[#75b06f]">
                            {checkedProducts.size}/{selectedBatch.details.length}
                          </span>
                        </div>
                        {missingProducts.size > 0 && (
                          <div>
                            <span className="text-gray-600">Thiếu: </span>
                            <span className="font-bold text-red-600">
                              {missingProducts.size} loại ({Array.from(missingProducts.values()).reduce((sum, qty) => sum + qty, 0)} SP)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Vui lòng tick vào ô checkbox để xác nhận số lượng sản phẩm. Nếu thiếu, tick "Thiếu" và điền số lượng còn thiếu.
                    </p>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 w-16">
                              ✓
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                              Sản Phẩm
                            </th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
                              Số Lượng
                            </th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 w-24">
                              Thiếu
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                              Hạn Sử Dụng
                            </th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
                              Thành Tiền
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {selectedBatch.details.map((detail) => {
                            const isChecked = checkedProducts.has(detail.product_id);
                            const isMissing = missingProducts.has(detail.product_id);
                            const missingQty = missingProducts.get(detail.product_id) || 0;
                            return (
                              <tr 
                                key={detail.batch_detail_id}
                                className={`transition-colors ${
                                  isMissing ? 'bg-red-50' : isChecked ? 'bg-green-50' : 'hover:bg-gray-50'
                                }`}
                              >
                                <td className="px-4 py-3 text-center">
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleToggleProductCheck(detail.product_id)}
                                    className="w-5 h-5 rounded border-gray-300 text-[#75b06f] focus:ring-[#75b06f] cursor-pointer"
                                  />
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-800">
                                  <div className="flex items-center gap-2">
                                    {isChecked && !isMissing && (
                                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    )}
                                    {isMissing && (
                                      <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                                    )}
                                    <span className={isChecked ? 'font-semibold' : ''}>
                                      {getProductName(detail.product_id)}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-right font-semibold text-gray-800">
                                  {detail.quantity}
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex flex-col gap-1 items-center">
                                    <label className="flex items-center gap-1 cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={isMissing}
                                        onChange={() => handleToggleMissing(detail.product_id)}
                                        disabled={!isChecked}
                                        className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                      />
                                      <span className="text-xs text-gray-600">Thiếu</span>
                                    </label>
                                    {isMissing && (
                                      <input
                                        type="number"
                                        min="1"
                                        max={detail.quantity}
                                        value={missingQty || ''}
                                        onChange={(e) => handleUpdateMissingQuantity(detail.product_id, parseInt(e.target.value) || 0)}
                                        placeholder="SL thiếu"
                                        className="w-20 px-2 py-1 text-xs border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                      />
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                  {formatDate(detail.expired_date)}
                                </td>
                                <td className="px-4 py-3 text-sm text-right font-semibold text-[#75b06f]">
                                  {formatPrice(detail.subtotal)}
                                </td>
                              </tr>
                            );
                          })}
                          <tr className="bg-gray-50 font-bold">
                            <td></td>
                            <td className="px-4 py-3 text-sm text-right text-gray-800">
                              Tổng Cộng:
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-gray-800">
                              {selectedBatch.total_items}
                            </td>
                            <td></td>
                            <td></td>
                            <td className="px-4 py-3 text-sm text-right text-[#75b06f]">
                              {formatPrice(selectedBatch.total_price)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Upload Images Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-[#75b06f]" />
                        Ảnh Minh Chứng Kiểm Tra
                      </h3>
                      <span className="text-sm text-gray-600">
                        {uploadedImages.length}/5 ảnh
                      </span>
                    </div>
                    <p className="text-sm text-red-600 mb-4">
                      * Bắt buộc tải lên ít nhất 1 ảnh minh chứng (tối đa 5 ảnh)
                    </p>

                    {/* Upload Area */}
                    <div className="space-y-4">
                      {uploadedImages.length < 5 && (
                        <label className="block cursor-pointer">
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-[#75b06f] hover:bg-[#75b06f]/5 transition-all text-center">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-sm font-semibold text-gray-700 mb-1">
                              Nhấn để tải ảnh lên
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, JPEG (tối đa 5MB mỗi ảnh)
                            </p>
                          </div>
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/jpg"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      )}

                      {/* Image Previews */}
                      {uploadedImages.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {imagePreviewUrls.map((url, index) => (
                            <div
                              key={index}
                              className="relative group rounded-lg overflow-hidden border-2 border-gray-200 hover:border-[#75b06f] transition-all"
                            >
                              <img
                                src={url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                  onClick={() => handleRemoveImage(index)}
                                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                                {index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t bg-gray-50">
                <div className="flex gap-2">
                  <button
                    onClick={handleCloseCompleteModal}
                    className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleConfirmComplete}
                    disabled={checkedProducts.size < selectedBatch.details.length}
                    className={`flex-1 px-4 py-2 text-sm rounded-lg font-semibold transition-colors ${
                      checkedProducts.size < selectedBatch.details.length
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : missingProducts.size > 0
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'bg-[#75b06f] text-white hover:bg-[#5a9450]'
                    }`}
                  >
                    {missingProducts.size > 0 
                      ? `Hoàn Thành (${missingProducts.size} SP Thiếu)` 
                      : `Xác Nhận Hoàn Thành (${checkedProducts.size}/${selectedBatch.details.length})`
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}