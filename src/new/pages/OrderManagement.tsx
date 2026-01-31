import {
  Package,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Calendar,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  User,
  X,
  Menu,
  ChevronDown,
  Filter,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { getSidebarConfig } from "../components/sidebar-configs";

interface OrderManagementProps {
  onPageChange: (page: string) => void;
  currentUser: { email: string; name: string; role?: string } | null;
  onLogout: () => void;
}

// Mock orders data from localStorage or default
const getMockOrders = () => {
  const saved = localStorage.getItem("adminOrders");
  if (saved) {
    return JSON.parse(saved);
  }
  
  return [
    {
      order_id: "ORD001",
      customer_name: "Nguyễn Văn A",
      customer_phone: "0901234567",
      customer_email: "nguyenvana@email.com",
      customer_address: "123 Đường ABC, Quận 1, TP.HCM",
      total_amount: 450000,
      status: "pending",
      created_date: "2026-01-15T10:30:00",
      items: [
        { product_name: "Cà chua bi", quantity: 2, price: 125000 },
        { product_name: "Rau muống", quantity: 3, price: 200000 },
      ],
    },
    {
      order_id: "ORD002",
      customer_name: "Trần Thị B",
      customer_phone: "0912345678",
      customer_email: "tranthib@email.com",
      customer_address: "456 Đường XYZ, Quận 3, TP.HCM",
      total_amount: 680000,
      status: "packing",
      created_date: "2026-01-14T14:20:00",
      items: [
        { product_name: "Thịt bò Úc", quantity: 1, price: 480000 },
        { product_name: "Cải thảo", quantity: 2, price: 200000 },
      ],
    },
    {
      order_id: "ORD003",
      customer_name: "Lê Văn C",
      customer_phone: "0923456789",
      customer_email: "levanc@email.com",
      customer_address: "789 Đường DEF, Quận 5, TP.HCM",
      total_amount: 320000,
      status: "shipping",
      created_date: "2026-01-13T09:15:00",
      items: [
        { product_name: "Cá hồi Na Uy", quantity: 1, price: 320000 },
      ],
    },
    {
      order_id: "ORD004",
      customer_name: "Phạm Thị D",
      customer_phone: "0934567890",
      customer_email: "phamthid@email.com",
      customer_address: "321 Đường GHI, Quận 7, TP.HCM",
      total_amount: 560000,
      status: "success",
      created_date: "2026-01-12T16:45:00",
      items: [
        { product_name: "Sườn heo", quantity: 2, price: 360000 },
        { product_name: "Xà lách", quantity: 1, price: 200000 },
      ],
    },
    {
      order_id: "ORD005",
      customer_name: "Hoàng Văn E",
      customer_phone: "0945678901",
      customer_email: "hoangvane@email.com",
      customer_address: "654 Đường JKL, Quận 10, TP.HCM",
      total_amount: 890000,
      status: "pending",
      created_date: "2026-01-15T11:20:00",
      items: [
        { product_name: "Tôm sú", quantity: 2, price: 540000 },
        { product_name: "Rau cải", quantity: 1, price: 350000 },
      ],
    },
  ];
};

export function OrderManagement({ onPageChange, currentUser, onLogout }: OrderManagementProps) {
  const [orders, setOrders] = useState<any[]>([]);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Redirect if not admin
  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      onPageChange("home");
    }
  }, [currentUser, onPageChange]);

  // Initialize orders
  useEffect(() => {
    setOrders(getMockOrders());
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("adminOrders", JSON.stringify(orders));
  }, [orders]);

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "packing":
        return "Đang đóng gói";
      case "shipping":
        return "Đang giao";
      case "success":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "packing":
        return "bg-blue-100 text-blue-700";
      case "shipping":
        return "bg-purple-100 text-purple-700";
      case "success":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "packing":
        return <Package className="w-4 h-4" />;
      case "shipping":
        return <Truck className="w-4 h-4" />;
      case "success":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.order_id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setSelectedOrder((prev: any) => prev ? { ...prev, status: newStatus } : null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + "đ";
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    packing: orders.filter(o => o.status === "packing").length,
    shipping: orders.filter(o => o.status === "shipping").length,
    success: orders.filter(o => o.status === "success").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  const statusOptions = [
    { value: "all", label: "Tất cả", count: stats.total },
    { value: "pending", label: "Chờ xác nhận", count: stats.pending },
    { value: "packing", label: "Đang đóng gói", count: stats.packing },
    { value: "shipping", label: "Đang giao", count: stats.shipping },
    { value: "success", label: "Hoàn thành", count: stats.success },
    { value: "cancelled", label: "Đã hủy", count: stats.cancelled },
  ];

  // Don't render if not admin
  if (!currentUser || currentUser.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Component */}
      <Sidebar
        sections={getSidebarConfig('admin')}
        activePage="order-management"
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
                Quản Lý Đơn Hàng
              </h1>
            </div>
          </div>

          {/* Header */}
          <div className="mb-6 hidden lg:block">
            <h1 className="text-2xl font-bold text-gray-800">
              Quản Lý Đơn Hàng
            </h1>
            <p className="text-gray-600 mt-1">
              Theo dõi và quản lý tất cả đơn hàng
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <Package className="w-5 h-5 text-gray-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              <p className="text-sm text-gray-600">Tổng đơn</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-sm text-gray-600">Chờ xác nhận</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{stats.packing}</p>
              <p className="text-sm text-gray-600">Đang đóng gói</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <Truck className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">{stats.shipping}</p>
              <p className="text-sm text-gray-600">Đang giao</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{stats.success}</p>
              <p className="text-sm text-gray-600">Hoàn thành</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-red-200">
              <div className="flex items-center justify-between mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
              <p className="text-sm text-gray-600">Đã hủy</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm theo mã đơn, tên khách hàng, số điện thoại..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Filter className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">
                    {statusOptions.find(opt => opt.value === statusFilter)?.label}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {showFilterDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowFilterDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
                      {statusOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setStatusFilter(option.value);
                            setShowFilterDropdown(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                            statusFilter === option.value ? "bg-gray-50" : ""
                          }`}
                        >
                          <span className="font-medium text-gray-700">{option.label}</span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold">
                            {option.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Mã đơn hàng
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Khách hàng
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Ngày đặt
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Tổng tiền
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">Không tìm thấy đơn hàng nào</p>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.order_id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-800">{order.order_id}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-800">{order.customer_name}</p>
                          <p className="text-sm text-gray-500">{order.customer_phone}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-700">{formatDate(order.created_date)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-800">
                            {formatCurrency(order.total_amount)}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            {getStatusDisplay(order.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowOrderModal(true);
                            }}
                            className="flex items-center gap-2 px-3 py-2 bg-[#75b06f] text-white rounded-lg hover:bg-[#68a062] transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="text-sm font-medium">Chi tiết</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <div className="px-4 py-12 text-center">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Không tìm thấy đơn hàng nào</p>
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div key={order.order_id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">{order.order_id}</p>
                        <p className="text-sm text-gray-600">{order.customer_name}</p>
                        <p className="text-sm text-gray-500">{order.customer_phone}</p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {getStatusDisplay(order.status)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-gray-600">{formatDate(order.created_date)}</p>
                      <p className="font-semibold text-gray-800">
                        {formatCurrency(order.total_amount)}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowOrderModal(true);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#75b06f] text-white rounded-lg hover:bg-[#68a062] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">Xem chi tiết</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowOrderModal(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Chi Tiết Đơn Hàng</h2>
                  <p className="text-sm text-gray-600 mt-1">{selectedOrder.order_id}</p>
                </div>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Trạng thái đơn hàng
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["pending", "packing", "shipping", "success", "cancelled"].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleUpdateStatus(selectedOrder.order_id, status)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          selectedOrder.status === status
                            ? getStatusColor(status)
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {getStatusDisplay(status)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Thông Tin Khách Hàng
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Họ và tên</p>
                        <p className="font-medium text-gray-800">{selectedOrder.customer_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Số điện thoại</p>
                        <p className="font-medium text-gray-800">{selectedOrder.customer_phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-800">{selectedOrder.customer_email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Địa chỉ giao hàng</p>
                        <p className="font-medium text-gray-800">{selectedOrder.customer_address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Ngày đặt hàng</p>
                        <p className="font-medium text-gray-800">
                          {formatDate(selectedOrder.created_date)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Sản Phẩm ({selectedOrder.items.length})
                  </h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Sản phẩm
                          </th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                            SL
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                            Đơn giá
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedOrder.items.map((item: any, index: number) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-gray-800">{item.product_name}</td>
                            <td className="px-4 py-3 text-center text-gray-700">{item.quantity}</td>
                            <td className="px-4 py-3 text-right font-medium text-gray-800">
                              {formatCurrency(item.price)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-800">Tổng cộng:</p>
                    <p className="text-2xl font-bold text-[#75b06f]">
                      {formatCurrency(selectedOrder.total_amount)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}