import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Package, 
  Star,
  ChevronRight,
  Eye,
  Calendar,
  ChevronDown,
  User,
  ClipboardList,

  
  Gift,
  MessageSquare,
  Search,
  X,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Menu,
  XCircle,
  Box,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { getSidebarConfig } from "../components/sidebar-configs";

interface AdminDashboardProps {
  onPageChange: (page: string) => void;
  currentUser: { email: string; name: string; role?: string } | null;
  onLogout: () => void;
}

export function AdminDashboard({ onPageChange, currentUser, onLogout }: AdminDashboardProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [searchPending, setSearchPending] = useState("");
  const [searchDelivering, setSearchDelivering] = useState("");
  const [searchPacking, setSearchPacking] = useState("");
  const [searchRecurring, setSearchRecurring] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [selectedRecurringOrder, setSelectedRecurringOrder] = useState<any>(null);
  const [showRecurringOrderModal, setShowRecurringOrderModal] = useState(false);
  const [recurringOrders, setRecurringOrders] = useState<any[]>([]);

  // Redirect if not admin
  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      onPageChange("home");
    }
  }, [currentUser, onPageChange]);

  // Initialize orders state
  useEffect(() => {
    setOrders(allOrders);
  }, []);

  // Mock recurring orders data - initialize outside component
  const initialRecurringOrders = [
    {
      id: "DH-REC-001",
      customer: "Nguyễn Văn An",
      email: "nguyenvanan@email.com",
      phone: "0901234567",
      address: "123 Đường Lý Thường Kiệt, Phường 14, Quận 10, TP. Hồ Chí Minh",
      deliveryDate: "22/01/2026",
      total: 680000,
      status: "pending",
      items: [
        { name: "Cà Chua Bi", quantity: 2, price: 89000, total: 178000 },
        { name: "Thịt Bò Úc", quantity: 1, price: 240000, total: 240000 },
        { name: "Cá Hồi Na Uy", quantity: 1, price: 291000, total: 291000 },
      ],
      subtotal: 709000,
      shipping: 25000,
      discount: 54000,
      paymentMethod: "Chuyển khoản",
    },
    {
      id: "DH-REC-002",
      customer: "Trần Thị Bình",
      email: "tranthibinh@email.com",
      phone: "0912345678",
      address: "456 Đường Cách Mạng Tháng 8, Phường 10, Quận 3, TP. Hồ Chí Minh",
      deliveryDate: "23/01/2026",
      total: 485000,
      status: "pending",
      items: [
        { name: "Bơ Mexico", quantity: 3, price: 89000, total: 267000 },
        { name: "Táo Fuji", quantity: 2, price: 70000, total: 140000 },
        { name: "Xà Lách Xoong", quantity: 2, price: 45000, total: 90000 },
      ],
      subtotal: 497000,
      shipping: 20000,
      discount: 32000,
      paymentMethod: "COD",
    },
    {
      id: "DH-REC-003",
      customer: "Lê Minh Cường",
      email: "leminhcuong@email.com",
      phone: "0923456789",
      address: "789 Đường Nguyễn Thị Minh Khai, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh",
      deliveryDate: "24/01/2026",
      total: 280000,
      status: "pending",
      items: [
        { name: "Táo Fuji", quantity: 4, price: 70000, total: 280000 },
      ],
      subtotal: 280000,
      shipping: 15000,
      discount: 15000,
      paymentMethod: "Chuyển khoản",
    },
    {
      id: "DH-REC-004",
      customer: "Phạm Thu Hà",
      email: "phamthuha@email.com",
      phone: "0934567890",
      address: "321 Đường Lê Văn Sỹ, Phường 14, Quận Phú Nhuận, TP. Hồ Chí Minh",
      deliveryDate: "25/01/2026",
      total: 450000,
      status: "pending",
      items: [
        { name: "Tôm Sú", quantity: 1, price: 240000, total: 240000 },
        { name: "Cà Chua Bi", quantity: 2, price: 89000, total: 178000 },
      ],
      subtotal: 418000,
      shipping: 32000,
      discount: 0,
      paymentMethod: "COD",
    },
    {
      id: "DH-REC-005",
      customer: "Võ Đình Nam",
      email: "vodinhnam@email.com",
      phone: "0945678901",
      address: "654 Đường Hoàng Văn Thụ, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh",
      deliveryDate: "26/01/2026",
      total: 290000,
      status: "pending",
      items: [
        { name: "Bơ Mexico", quantity: 2, price: 89000, total: 178000 },
        { name: "Xà Lách Xoong", quantity: 2, price: 45000, total: 90000 },
      ],
      subtotal: 268000,
      shipping: 22000,
      discount: 0,
      paymentMethod: "Chuyển khoản",
    },
  ];

  // Initialize recurring orders state
  useEffect(() => {
    setRecurringOrders(initialRecurringOrders);
  }, []);

  // Get user initials from name
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      // Lấy chữ cái đầu của họ và tên
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    // Nếu chỉ có 1 từ, lấy 2 chữ cái đầu
    return name.substring(0, 2).toUpperCase();
  };

  // Format role display
  const getRoleDisplay = (role?: string) => {
    if (role === "admin") return "Admin";
    return "Người dùng";
  };

  // Month options - Chỉ 5 tháng gần nhất (bỏ "all" khỏi dropdown)
  const months = [
    { value: "2026-01", label: "Tháng 1, 2026" },
    { value: "2025-12", label: "Tháng 12, 2025" },
    { value: "2025-11", label: "Tháng 11, 2025" },
    { value: "2025-10", label: "Tháng 10, 2025" },
    { value: "2025-09", label: "Tháng 9, 2025" },
  ];

  // Mock monthly statistics data
  const monthlyStats: Record<string, any> = {
    "all": {
      revenue: 248560000,
      orders: 1482,
      customers: 856,
      products: 88,
      revenueChange: "+12.5%",
      ordersChange: "+8.2%",
      customersChange: "+15.3%",
      productsChange: "+4",
    },
    "2026-01": {
      revenue: 45320000,
      orders: 267,
      customers: 145,
      products: 88,
      revenueChange: "+18.5%",
      ordersChange: "+12.3%",
      customersChange: "+22.1%",
      productsChange: "+2",
    },
    "2025-12": {
      revenue: 52780000,
      orders: 312,
      customers: 178,
      products: 86,
      revenueChange: "+15.2%",
      ordersChange: "+9.8%",
      customersChange: "+18.5%",
      productsChange: "+3",
    },
    "2025-11": {
      revenue: 38920000,
      orders: 234,
      customers: 132,
      products: 83,
      revenueChange: "+10.3%",
      ordersChange: "+6.5%",
      customersChange: "+12.8%",
      productsChange: "+1",
    },
    "2025-10": {
      revenue: 41560000,
      orders: 245,
      customers: 138,
      products: 82,
      revenueChange: "+8.7%",
      ordersChange: "+5.2%",
      customersChange: "+9.4%",
      productsChange: "+2",
    },
    "2025-09": {
      revenue: 35480000,
      orders: 198,
      customers: 115,
      products: 80,
      revenueChange: "+6.9%",
      ordersChange: "+4.1%",
      customersChange: "+7.2%",
      productsChange: "0",
    },
  };

  const currentStats = monthlyStats[selectedMonth] || monthlyStats["2026-01"];

  // Mock statistics data
  const stats = [
    {
      id: 1,
      title: "Tổng Doanh Thu",
      value: currentStats.revenue.toLocaleString('vi-VN') + "₫",
      change: currentStats.revenueChange,
      trend: "up",
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      id: 2,
      title: "Đơn Hàng",
      value: currentStats.orders.toLocaleString('vi-VN'),
      change: currentStats.ordersChange,
      trend: "up",
      icon: ShoppingBag,
      color: "bg-blue-500",
    },
    {
      id: 3,
      title: "Khách Hàng",
      value: currentStats.customers.toLocaleString('vi-VN'),
      change: currentStats.customersChange,
      trend: "up",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "Sản Phẩm",
      value: currentStats.products.toString(),
      change: currentStats.productsChange,
      trend: "up",
      icon: Package,
      color: "bg-orange-500",
    },
  ];

  // Mock orders data
  const allOrders = [
    {
      id: "ORD-2026-001",
      customer: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0901234567",
      address: "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      total: 456000,
      status: "pending",
      date: "14/01/2026",
      time: "09:30",
      items: [
        { name: "Cà Chua Bi", quantity: 2, price: 89000, total: 178000 },
        { name: "Cá Hồi Na Uy", quantity: 1, price: 291000, total: 291000 },
      ],
      subtotal: 469000,
      shipping: 30000,
      discount: 43000,
      paymentMethod: "COD",
    },
    {
      id: "ORD-2026-002",
      customer: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0912345678",
      address: "456 Đường Nguyễn Huệ, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh",
      total: 328000,
      status: "pending",
      date: "14/01/2026",
      time: "10:15",
      items: [
        { name: "Bơ Mexico", quantity: 3, price: 89000, total: 267000 },
        { name: "Táo Fuji", quantity: 2, price: 70000, total: 140000 },
      ],
      subtotal: 407000,
      shipping: 25000,
      discount: 104000,
      paymentMethod: "Chuyển khoản",
    },
    {
      id: "ORD-2026-003",
      customer: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0923456789",
      address: "789 Đường Trần Hưng Đạo, Phường Cầu Kho, Quận 1, TP. Hồ Chí Minh",
      total: 589000,
      status: "pending",
      date: "14/01/2026",
      time: "11:45",
      items: [
        { name: "Thịt Bò Úc", quantity: 2, price: 240000, total: 480000 },
        { name: "Cà Chua Bi", quantity: 1, price: 89000, total: 89000 },
      ],
      subtotal: 569000,
      shipping: 20000,
      discount: 0,
      paymentMethod: "COD",
    },
    {
      id: "ORD-2026-004",
      customer: "Phạm Thị D",
      email: "phamthid@email.com",
      phone: "0934567890",
      address: "321 Đường Pasteur, Phường 6, Quận 3, TP. Hồ Chí Minh",
      total: 234000,
      status: "pending",
      date: "13/01/2026",
      time: "14:20",
      items: [
        { name: "Táo Fuji", quantity: 3, price: 70000, total: 210000 },
      ],
      subtotal: 210000,
      shipping: 24000,
      discount: 0,
      paymentMethod: "COD",
    },
    {
      id: "ORD-2026-005",
      customer: "Hoàng Văn E",
      email: "hoangvane@email.com",
      phone: "0945678901",
      address: "654 Đường Võ Văn Tần, Phường 5, Quận 3, TP. Hồ Chí Minh",
      total: 678000,
      status: "pending",
      date: "13/01/2026",
      time: "16:00",
      items: [
        { name: "Tôm Sú", quantity: 2, price: 240000, total: 480000 },
        { name: "Cá Hồi Na Uy", quantity: 1, price: 291000, total: 291000 },
      ],
      subtotal: 771000,
      shipping: 30000,
      discount: 123000,
      paymentMethod: "Chuyển khoản",
    },
    {
      id: "ORD-2026-006",
      customer: "Vũ Thị F",
      email: "vuthif@email.com",
      phone: "0956789012",
      address: "987 Đường Cách Mạng Tháng 8, Phường 7, Quận 3, TP. Hồ Chí Minh",
      total: 892000,
      status: "shipping",
      date: "13/01/2026",
      time: "08:30",
      items: [
        { name: "Cá Hồi Na Uy", quantity: 2, price: 291000, total: 582000 },
        { name: "Thịt Bò Úc", quantity: 1, price: 240000, total: 240000 },
        { name: "Bơ Mexico", quantity: 1, price: 89000, total: 89000 },
      ],
      subtotal: 911000,
      shipping: 25000,
      discount: 44000,
      paymentMethod: "COD",
    },
    {
      id: "ORD-2026-007",
      customer: "Đặng Văn G",
      email: "dangvang@email.com",
      phone: "0967890123",
      address: "159 Đường Hai Bà Trưng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      total: 445000,
      status: "shipping",
      date: "12/01/2026",
      time: "10:00",
      items: [
        { name: "Bơ Mexico", quantity: 4, price: 89000, total: 356000 },
        { name: "Cà Chua Bi", quantity: 1, price: 89000, total: 89000 },
      ],
      subtotal: 445000,
      shipping: 30000,
      discount: 30000,
      paymentMethod: "Chuyển khoản",
    },
    {
      id: "ORD-2026-008",
      customer: "Bùi Thị H",
      email: "buithih@email.com",
      phone: "0978901234",
      address: "753 Đường Nam Kỳ Khởi Nghĩa, Phư��ng 7, Quận 3, TP. Hồ Chí Minh",
      total: 567000,
      status: "shipping",
      date: "12/01/2026",
      time: "13:45",
      items: [
        { name: "Táo Fuji", quantity: 5, price: 70000, total: 350000 },
        { name: "Cà Chua Bi", quantity: 2, price: 89000, total: 178000 },
      ],
      subtotal: 528000,
      shipping: 39000,
      discount: 0,
      paymentMethod: "COD",
    },
    {
      id: "ORD-2026-009",
      customer: "Ngô Văn I",
      email: "ngovani@email.com",
      phone: "0989012345",
      address: "852 Đường Lý Tự Trọng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      total: 723000,
      status: "shipping",
      date: "11/01/2026",
      time: "15:30",
      items: [
        { name: "Tôm Sú", quantity: 3, price: 240000, total: 720000 },
      ],
      subtotal: 720000,
      shipping: 28000,
      discount: 25000,
      paymentMethod: "Chuyển khoản",
    },
    {
      id: "ORD-2026-010",
      customer: "Phan Thị J",
      email: "phanthij@email.com",
      phone: "0912223334",
      address: "234 Đường Lý Chính Thắng, Phường 7, Quận 3, TP. Hồ Chí Minh",
      total: 345000,
      status: "packing",
      date: "14/01/2026",
      time: "14:00",
      items: [
        { name: "Táo Fuji", quantity: 4, price: 70000, total: 280000 },
        { name: "Cà Chua Bi", quantity: 1, price: 89000, total: 89000 },
      ],
      subtotal: 369000,
      shipping: 26000,
      discount: 50000,
      paymentMethod: "COD",
    },
    {
      id: "ORD-2026-011",
      customer: "Võ Văn K",
      email: "vovank@email.com",
      phone: "0987654321",
      address: "567 Đường Đinh Tiên Hoàng, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh",
      total: 891000,
      status: "packing",
      date: "14/01/2026",
      time: "13:15",
      items: [
        { name: "Cá Hồi Na Uy", quantity: 3, price: 291000, total: 873000 },
      ],
      subtotal: 873000,
      shipping: 30000,
      discount: 12000,
      paymentMethod: "Chuyển khoản",
    },
    {
      id: "ORD-2026-012",
      customer: "Đỗ Thị L",
      email: "dothil@email.com",
      phone: "0903334445",
      address: "890 Đường Hai Bà Trưng, Phường Tân Định, Quận 1, TP. Hồ Chí Minh",
      total: 567000,
      status: "packing",
      date: "14/01/2026",
      time: "11:20",
      items: [
        { name: "Thịt Bò Úc", quantity: 2, price: 240000, total: 480000 },
        { name: "Bơ Mexico", quantity: 1, price: 89000, total: 89000 },
      ],
      subtotal: 569000,
      shipping: 28000,
      discount: 30000,
      paymentMethod: "COD",
    },
  ];

  // Filter orders by status - use state instead of const
  const pendingOrders = orders.filter(order => order.status === "pending");
  const deliveringOrders = [
    ...orders.filter(order => order.status === "shipping"),
    ...recurringOrders.filter(order => order.status === "shipping")
  ];
  const packingOrders = orders.filter(order => order.status === "packing");
  const pendingRecurringOrders = recurringOrders.filter(order => order.status === "pending");

  // Mock top products by month
  const topProductsByMonth: Record<string, any[]> = {
    "all": [
      {
        id: 1,
        name: "Cà Chua Bi",
        sold: 723,
        revenue: 64476000,
        rating: 5,
      },
      {
        id: 2,
        name: "Cá Hồi Na Uy",
        sold: 489,
        revenue: 142335000,
        rating: 5,
      },
      {
        id: 3,
        name: "Bơ Mexico",
        sold: 678,
        revenue: 60342000,
        rating: 5,
      },
      {
        id: 4,
        name: "Táo Fuji",
        sold: 556,
        revenue: 38920000,
        rating: 5,
      },
      {
        id: 5,
        name: "Thịt Bò Úc",
        sold: 445,
        revenue: 106800000,
        rating: 5,
      },
      {
        id: 6,
        name: "Tôm Sú",
        sold: 389,
        revenue: 93360000,
        rating: 5,
      },
      {
        id: 7,
        name: "Nho Mỹ",
        sold: 512,
        revenue: 61440000,
        rating: 5,
      },
      {
        id: 8,
        name: "Sầu Riêng",
        sold: 234,
        revenue: 46800000,
        rating: 5,
      },
      {
        id: 9,
        name: "Xoài Cát",
        sold: 378,
        revenue: 26460000,
        rating: 5,
      },
      {
        id: 10,
        name: "Ớt Chuông",
        sold: 445,
        revenue: 22250000,
        rating: 5,
      },
    ],
    "2026-01": [
      {
        id: 1,
        name: "Cá Hồi Na Uy",
        sold: 156,
        revenue: 45408000,
        rating: 5,
      },
      {
        id: 2,
        name: "Bơ Mexico",
        sold: 234,
        revenue: 20826000,
        rating: 5,
      },
      {
        id: 3,
        name: "Cà Chua Bi",
        sold: 189,
        revenue: 16863000,
        rating: 5,
      },
      {
        id: 4,
        name: "Thịt Bò Úc",
        sold: 98,
        revenue: 23520000,
        rating: 5,
      },
      {
        id: 5,
        name: "Táo Fuji",
        sold: 167,
        revenue: 11690000,
        rating: 5,
      },
      {
        id: 6,
        name: "Tôm Sú",
        sold: 87,
        revenue: 20880000,
        rating: 5,
      },
      {
        id: 7,
        name: "Nho Mỹ",
        sold: 145,
        revenue: 17400000,
        rating: 5,
      },
      {
        id: 8,
        name: "Sầu Riêng",
        sold: 67,
        revenue: 13400000,
        rating: 5,
      },
      {
        id: 9,
        name: "Xoài Cát",
        sold: 98,
        revenue: 6860000,
        rating: 5,
      },
      {
        id: 10,
        name: "Ớt Chuông",
        sold: 112,
        revenue: 5600000,
        rating: 5,
      },
    ],
    "2025-12": [
      {
        id: 1,
        name: "Thịt Bò Úc",
        sold: 187,
        revenue: 44880000,
        rating: 5,
      },
      {
        id: 2,
        name: "Cá Hồi Na Uy",
        sold: 178,
        revenue: 51822000,
        rating: 5,
      },
      {
        id: 3,
        name: "Tôm Sú",
        sold: 156,
        revenue: 37440000,
        rating: 5,
      },
      {
        id: 4,
        name: "Cà Chua Bi",
        sold: 245,
        revenue: 21805000,
        rating: 5,
      },
      {
        id: 5,
        name: "Bơ Mexico",
        sold: 198,
        revenue: 17622000,
        rating: 5,
      },
      {
        id: 6,
        name: "Táo Fuji",
        sold: 134,
        revenue: 9380000,
        rating: 5,
      },
      {
        id: 7,
        name: "Nho Mỹ",
        sold: 123,
        revenue: 14760000,
        rating: 5,
      },
      {
        id: 8,
        name: "Sầu Riêng",
        sold: 56,
        revenue: 11200000,
        rating: 5,
      },
      {
        id: 9,
        name: "Xoài Cát",
        sold: 89,
        revenue: 6230000,
        rating: 5,
      },
      {
        id: 10,
        name: "Ớt Chuông",
        sold: 134,
        revenue: 6700000,
        rating: 5,
      },
    ],
    "2025-11": [
      {
        id: 1,
        name: "Cà Chua Bi",
        sold: 198,
        revenue: 17622000,
        rating: 5,
      },
      {
        id: 2,
        name: "Bơ Mexico",
        sold: 167,
        revenue: 14863000,
        rating: 5,
      },
      {
        id: 3,
        name: "Táo Fuji",
        sold: 145,
        revenue: 10150000,
        rating: 5,
      },
      {
        id: 4,
        name: "Cá Hồi Na Uy",
        sold: 112,
        revenue: 32592000,
        rating: 5,
      },
      {
        id: 5,
        name: "Thịt Bò Úc",
        sold: 89,
        revenue: 21360000,
        rating: 5,
      },
      {
        id: 6,
        name: "Tôm Sú",
        sold: 76,
        revenue: 18240000,
        rating: 5,
      },
      {
        id: 7,
        name: "Nho Mỹ",
        sold: 101,
        revenue: 12120000,
        rating: 5,
      },
      {
        id: 8,
        name: "Sầu Riêng",
        sold: 45,
        revenue: 9000000,
        rating: 5,
      },
      {
        id: 9,
        name: "Xoài Cát",
        sold: 67,
        revenue: 4690000,
        rating: 5,
      },
      {
        id: 10,
        name: "Ớt Chuông",
        sold: 98,
        revenue: 4900000,
        rating: 5,
      },
    ],
    "2025-10": [
      {
        id: 1,
        name: "Bơ Mexico",
        sold: 212,
        revenue: 18868000,
        rating: 5,
      },
      {
        id: 2,
        name: "Táo Fuji",
        sold: 178,
        revenue: 12460000,
        rating: 5,
      },
      {
        id: 3,
        name: "Cà Chua Bi",
        sold: 167,
        revenue: 14863000,
        rating: 5,
      },
      {
        id: 4,
        name: "Cá Hồi Na Uy",
        sold: 134,
        revenue: 39006000,
        rating: 5,
      },
      {
        id: 5,
        name: "Tôm Sú",
        sold: 98,
        revenue: 23520000,
        rating: 5,
      },
      {
        id: 6,
        name: "Thịt Bò Úc",
        sold: 87,
        revenue: 20880000,
        rating: 5,
      },
      {
        id: 7,
        name: "Nho Mỹ",
        sold: 112,
        revenue: 13440000,
        rating: 5,
      },
      {
        id: 8,
        name: "Sầu Riêng",
        sold: 51,
        revenue: 10200000,
        rating: 5,
      },
      {
        id: 9,
        name: "Xoài Cát",
        sold: 78,
        revenue: 5460000,
        rating: 5,
      },
      {
        id: 10,
        name: "Ớt Chuông",
        sold: 123,
        revenue: 6150000,
        rating: 5,
      },
    ],
    "2025-09": [
      {
        id: 1,
        name: "Táo Fuji",
        sold: 189,
        revenue: 13230000,
        rating: 5,
      },
      {
        id: 2,
        name: "Cà Chua Bi",
        sold: 156,
        revenue: 13896000,
        rating: 5,
      },
      {
        id: 3,
        name: "Bơ Mexico",
        sold: 145,
        revenue: 12905000,
        rating: 5,
      },
      {
        id: 4,
        name: "Thịt Bò Úc",
        sold: 76,
        revenue: 18240000,
        rating: 5,
      },
      {
        id: 5,
        name: "Cá Hồi Na Uy",
        sold: 98,
        revenue: 28518000,
        rating: 5,
      },
      {
        id: 6,
        name: "Tôm Sú",
        sold: 67,
        revenue: 16080000,
        rating: 5,
      },
      {
        id: 7,
        name: "Nho Mỹ",
        sold: 89,
        revenue: 10680000,
        rating: 5,
      },
      {
        id: 8,
        name: "Sầu Riêng",
        sold: 38,
        revenue: 7600000,
        rating: 5,
      },
      {
        id: 9,
        name: "Xoài Cát",
        sold: 56,
        revenue: 3920000,
        rating: 5,
      },
      {
        id: 10,
        name: "Ớt Chuông",
        sold: 91,
        revenue: 4550000,
        rating: 5,
      },
    ],
  };

  const topProducts = topProductsByMonth[selectedMonth] || topProductsByMonth["2026-01"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "shipping":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "packing":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "packing":
        return "Chờ đóng gói";
      case "shipping":
        return "Đang giao";
      case "success":
        return "Hoàn thành";
      default:
        return status;
    }
  };

  // Don't render if not admin
  if (!currentUser || currentUser.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Component */}
      <Sidebar
        sections={getSidebarConfig('admin')}
        activePage="admin-dashboard"
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
                Dashboard Quản Trị
              </h1>
            </div>
          </div>

          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="hidden lg:block">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  Dashboard Quản Trị
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Xin chào, <span className="font-semibold text-[#75b06f]">{currentUser.name}</span>! 
                  Chúc bạn một ngày làm việc hiệu quả.
                </p>
              </div>

              {/* Filter Section */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center">
                {/* Checkbox "Tất cả" */}
                <label className="flex items-center gap-2 px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#75b06f] transition-all">
                  <input
                    type="checkbox"
                    checked={selectedMonth === "all"}
                    onChange={(e) => {
                      // Chỉ cho phép check, không cho uncheck trực tiếp
                      if (e.target.checked) {
                        setSelectedMonth("all");
                        setShowMonthDropdown(false);
                      } else {
                        // Nếu đang checked mà click lại, giữ nguyên trạng thái checked
                        e.preventDefault();
                      }
                    }}
                    onClick={(e) => {
                      // Nếu đang checked, ngăn không cho uncheck
                      if (selectedMonth === "all") {
                        e.preventDefault();
                      }
                    }}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#75b06f] bg-gray-100 border-gray-300 rounded focus:ring-[#75b06f] focus:ring-2 cursor-pointer"
                  />
                  <span className="text-sm sm:text-base font-semibold text-gray-800">
                    Tất cả
                  </span>
                </label>

                {/* Month Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowMonthDropdown(!showMonthDropdown);
                    }}
                    className="w-full sm:w-auto flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 sm:py-3 transition-all bg-white border-2 border-gray-200 hover:border-[#75b06f] text-gray-800"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      <span className="text-sm sm:text-base font-semibold">
                        {selectedMonth === "all" 
                          ? "Chọn tháng" 
                          : months.find(m => m.value === selectedMonth)?.label}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 transition-transform ${showMonthDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showMonthDropdown && (
                    <div className="absolute right-0 mt-2 w-full sm:w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                      {months.map((month, index) => (
                        <button
                          key={month.value}
                          onClick={() => {
                            setSelectedMonth(month.value);
                            setShowMonthDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                            selectedMonth === month.value ? 'bg-[#75b06f]/10 text-[#75b06f] font-semibold' : 'text-gray-800'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm sm:text-base">{month.label}</span>
                            {selectedMonth === month.value && (
                              <div className="w-2 h-2 rounded-full bg-[#75b06f]"></div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className={`${stat.color} p-2.5 sm:p-3 rounded-lg`}>
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-semibold">{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{stat.title}</h3>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column: Orders Sections */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Recurring Orders Section */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#75b06f]" />
                        Đơn Hàng Giao Định Kỳ
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {pendingRecurringOrders.filter(order => 
                          order.id.toLowerCase().includes(searchRecurring.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchRecurring.toLowerCase())
                        ).length} đơn hàng đang chờ giao
                      </p>
                    </div>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm theo mã đơn, khách hàng..."
                      value={searchRecurring}
                      onChange={(e) => setSearchRecurring(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto max-h-[220px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Mã Đơn
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Khách Hàng
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Tổng Tiền
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Ngày Giao
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Trạng Thái
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-600">
                          Hành Động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pendingRecurringOrders
                        .filter(order => 
                          order.id.toLowerCase().includes(searchRecurring.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchRecurring.toLowerCase())
                        )
                        .map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm font-semibold text-[#75b06f]">
                              {order.id}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm text-gray-800">{order.customer}</span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm font-semibold text-gray-800">
                              {order.total.toLocaleString('vi-VN')}₫
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm text-gray-600">{order.deliveryDate}</span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                              <Clock className="w-3.5 h-3.5" />
                              Chờ Giao
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <div className="flex justify-center">
                              <button
                                onClick={() => {
                                  setSelectedRecurringOrder(order);
                                  setShowRecurringOrderModal(true);
                                }}
                                className="p-2 rounded-lg hover:bg-[#75b06f]/10 transition-colors group"
                                title="Xem chi tiết"
                              >
                                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#75b06f]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Đơn Hàng Cần Xác Nhận */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-800">Đơn Hàng Cần Xác Nhận</h2>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {pendingOrders.filter(order => 
                          order.id.toLowerCase().includes(searchPending.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchPending.toLowerCase())
                        ).length} đơn hàng đang chờ xử lý
                      </p>
                    </div>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm theo mã đơn, khách hàng..."
                      value={searchPending}
                      onChange={(e) => setSearchPending(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto max-h-[220px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Mã Đơn
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Khách Hàng
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Tổng Tiền
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Ngày
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Giờ
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-600">
                          Hành Động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pendingOrders
                        .filter(order => 
                          order.id.toLowerCase().includes(searchPending.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchPending.toLowerCase())
                        )
                        .map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm font-semibold text-[#75b06f]">
                              {order.id}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm text-gray-800">{order.customer}</span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm font-semibold text-gray-800">
                              {order.total.toLocaleString('vi-VN')}₫
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm text-gray-600">{order.date}</span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm text-gray-600">{order.time}</span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <div className="flex justify-center">
                              <button
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowOrderModal(true);
                                }}
                                className="p-2 rounded-lg hover:bg-[#75b06f]/10 transition-colors group"
                                title="Xem chi tiết"
                              >
                                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#75b06f]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Đơn Hàng Đang Đóng Gói */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-800">Đơn Hàng Đang Đóng Gói</h2>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {packingOrders.filter(order => 
                          order.id.toLowerCase().includes(searchPacking.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchPacking.toLowerCase())
                        ).length} đơn hàng đang được đóng gói
                      </p>
                    </div>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm theo mã đơn, khách hàng..."
                      value={searchPacking}
                      onChange={(e) => setSearchPacking(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto max-h-[220px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Mã Đơn
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Khách Hàng
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Tổng Tiền
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Ngày
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Giờ
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-600">
                          Hành Động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {packingOrders
                        .filter(order => 
                          order.id.toLowerCase().includes(searchPacking.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchPacking.toLowerCase())
                        )
                        .map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm font-semibold text-[#75b06f]">
                              {order.id}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm text-gray-800">{order.customer}</span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm font-semibold text-gray-800">
                              {order.total.toLocaleString('vi-VN')}₫
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm text-gray-600">{order.date}</span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm text-gray-600">{order.time}</span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <div className="flex justify-center">
                              <button
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowOrderModal(true);
                                }}
                                className="p-2 rounded-lg hover:bg-[#75b06f]/10 transition-colors group"
                                title="Xem chi tiết"
                              >
                                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#75b06f]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Đơn Hàng Đang Giao */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-800">Đơn Hàng Đang Giao</h2>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {deliveringOrders.filter(order => 
                          order.id.toLowerCase().includes(searchDelivering.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchDelivering.toLowerCase())
                        ).length} đơn hàng đang trên đường giao
                      </p>
                    </div>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm theo mã đơn, khách hàng..."
                      value={searchDelivering}
                      onChange={(e) => setSearchDelivering(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto max-h-[220px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Mã Đơn
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Khách Hàng
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Tổng Tiền
                        </th>
                     
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Ngày
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Giờ
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-600">
                          Hành Động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {deliveringOrders
                        .filter(order => 
                          order.id.toLowerCase().includes(searchDelivering.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchDelivering.toLowerCase())
                        )
                        .map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm font-semibold text-[#75b06f]">
                              {order.id}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm text-gray-800">{order.customer}</span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm font-semibold text-gray-800">
                              {order.total.toLocaleString('vi-VN')}₫
                            </span>
                          </td>
                        
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm text-gray-600">{order.date}</span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm text-gray-600">{order.time}</span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <div className="flex justify-center">
                              <button
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowOrderModal(true);
                                }}
                                className="p-2 rounded-lg hover:bg-[#75b06f]/10 transition-colors group"
                                title="Xem chi tiết"
                              >
                                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#75b06f]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm">
                <div className="p-5 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">Sản Phẩm Bán Chạy</h2>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="space-y-6 sm:space-y-7">
                    {topProducts.map((product, index) => (
                      <div key={product.id} className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                            index === 0 ? 'bg-yellow-100 text-yellow-600' :
                            index === 1 ? 'bg-gray-200 text-gray-600' :
                            index === 2 ? 'bg-orange-100 text-orange-600' :
                            'bg-blue-100 text-blue-600'
                          } font-bold text-sm sm:text-base`}>
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex items-center gap-0.5">
                              {[...Array(product.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">({product.sold} đã bán)</span>
                          </div>
                          <p className="text-xs sm:text-sm font-semibold text-[#75b06f]">
                            {product.revenue.toLocaleString('vi-VN')}₫
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Chi Tiết Đơn Hàng</h2>
                <p className="text-sm text-gray-600 mt-1">Mã đơn: <span className="font-semibold text-[#75b06f]">{selectedOrder.id}</span></p>
              </div>
              <button
                onClick={() => {
                  setShowOrderModal(false);
                  setSelectedOrder(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Order Status & Time */}
              <div className="flex items-center justify-between">
                <div>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusDisplay(selectedOrder.status)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Đặt hàng lúc</p>
                  <p className="text-base font-semibold text-gray-800">{selectedOrder.time} - {selectedOrder.date}</p>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Thông Tin Khách Hàng</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Họ tên</p>
                      <p className="text-base font-semibold text-gray-800">{selectedOrder.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Số điện thoại</p>
                      <p className="text-base font-semibold text-gray-800">{selectedOrder.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-base font-semibold text-gray-800">{selectedOrder.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Địa chỉ giao hàng</p>
                      <p className="text-base font-semibold text-gray-800">{selectedOrder.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Sản Phẩm Đã Đặt</h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Sản phẩm</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Số lượng</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Đơn giá</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map((item: any, index: number) => (
                        <tr key={index}>
                          <td className="px-4 py-4">
                            <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-sm text-gray-800">{item.quantity}</span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <span className="text-sm text-gray-800">{item.price.toLocaleString('vi-VN')}₫</span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <span className="text-sm font-semibold text-gray-800">{item.total.toLocaleString('vi-VN')}₫</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tạm tính</span>
                  <span className="text-base font-semibold text-gray-800">{selectedOrder.subtotal.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Phí vận chuyển</span>
                  <span className="text-base font-semibold text-gray-800">{selectedOrder.shipping.toLocaleString('vi-VN')}₫</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Giảm giá</span>
                    <span className="text-base font-semibold text-red-600">-{selectedOrder.discount.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-800">Tổng cộng</span>
                  <span className="text-2xl font-bold text-[#75b06f]">{selectedOrder.total.toLocaleString('vi-VN')}₫</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex items-center justify-between bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Phương thức thanh toán</p>
                    <p className="text-base font-semibold text-gray-800">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
              <button
                onClick={() => {
                  setShowOrderModal(false);
                  setSelectedOrder(null);
                }}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
              >
                Đóng
              </button>
              {selectedOrder.status === "pending" ? (
                <>
                  <button
                    onClick={() => {
                      // Cancel order - update status to cancelled
                      const updatedOrders = orders.map(o => 
                        o.id === selectedOrder.id ? {...o, status: "failed"} : o
                      );
                      setOrders(updatedOrders);
                      setShowOrderModal(false);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Hủy Đơn Hàng
                  </button>
                  <button
                    onClick={() => {
                      // Update order status in state
                      const updatedOrders = orders.map(o => 
                        o.id === selectedOrder.id ? {...o, status: "packing"} : o
                      );
                      setOrders(updatedOrders);
                      setShowOrderModal(false);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 px-6 py-3 bg-[#75b06f] hover:bg-[#5c8c57] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Xác Nhận Đơn Hàng
                  </button>
                </>
              ) : selectedOrder.status === "packing" ? (
                <button
                  onClick={() => {
                    // Update order status to shipping
                    const updatedOrders = orders.map(o => 
                      o.id === selectedOrder.id ? {...o, status: "shipping"} : o
                    );
                    setOrders(updatedOrders);
                    setShowOrderModal(false);
                    setSelectedOrder(null);
                  }}
                  className="flex-1 px-6 py-3 bg-[#75b06f] hover:bg-[#5c8c57] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Package className="w-5 h-5" />
                  Bàn Giao Vận Chuyển
                </button>
              ) : selectedOrder.status === "shipping" ? (
                <button
                  onClick={() => {
                    // Update order status to success
                    const updatedOrders = orders.map(o => 
                      o.id === selectedOrder.id ? {...o, status: "success"} : o
                    );
                    setOrders(updatedOrders);
                    setShowOrderModal(false);
                    setSelectedOrder(null);
                  }}
                  className="flex-1 px-6 py-3 bg-[#75b06f] hover:bg-[#5c8c57] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Đã Giao
                </button>
              ) : (
                <button
                  className="flex-1 px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed"  
                >
                  Hoàn Thành
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recurring Order Detail Modal */}
      {showRecurringOrderModal && selectedRecurringOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Chi Tiết Đơn Hàng Giao Định Kỳ</h2>
                <p className="text-sm text-gray-600 mt-1">Mã đơn: <span className="font-semibold text-[#75b06f]">{selectedRecurringOrder.id}</span></p>
              </div>
              <button
                onClick={() => {
                  setShowRecurringOrderModal(false);
                  setSelectedRecurringOrder(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Order Status & Delivery Date */}
              <div className="flex items-center justify-between">
                <div>
                  {selectedRecurringOrder.status === "pending" ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-amber-50 text-amber-700 border border-amber-200 shadow-sm">
                      <Clock className="w-4 h-4" />
                      Chờ Giao
                    </span>
                  ) : selectedRecurringOrder.status === "shipping" ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 shadow-sm">
                      <Package className="w-4 h-4" />
                      Đang Giao
                    </span>
                  ) : (
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm ${getStatusColor(selectedRecurringOrder.status)}`}>
                      {getStatusDisplay(selectedRecurringOrder.status)}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Ngày giao hàng</p>
                  <p className="text-base font-semibold text-gray-800 flex items-center gap-2 justify-end">
                    <Calendar className="w-5 h-5 text-[#75b06f]" />
                    {selectedRecurringOrder.deliveryDate}
                  </p>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Thông Tin Khách Hàng</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Họ tên</p>
                      <p className="text-base font-semibold text-gray-800">{selectedRecurringOrder.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Số điện thoại</p>
                      <p className="text-base font-semibold text-gray-800">{selectedRecurringOrder.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-base font-semibold text-gray-800">{selectedRecurringOrder.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Địa chỉ giao hàng</p>
                      <p className="text-base font-semibold text-gray-800">{selectedRecurringOrder.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Sản Phẩm Đã Đặt</h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Sản phẩm</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Số lượng</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Đơn giá</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedRecurringOrder.items.map((item: any, index: number) => (
                        <tr key={index}>
                          <td className="px-4 py-4">
                            <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-sm text-gray-800">{item.quantity}</span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <span className="text-sm text-gray-800">{item.price.toLocaleString('vi-VN')}₫</span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <span className="text-sm font-semibold text-gray-800">{item.total.toLocaleString('vi-VN')}₫</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tạm tính</span>
                  <span className="text-base font-semibold text-gray-800">{selectedRecurringOrder.subtotal.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Phí vận chuyển</span>
                  <span className="text-base font-semibold text-gray-800">{selectedRecurringOrder.shipping.toLocaleString('vi-VN')}₫</span>
                </div>
                {selectedRecurringOrder.discount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Giảm giá</span>
                    <span className="text-base font-semibold text-red-600">-{selectedRecurringOrder.discount.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-800">Tổng cộng</span>
                  <span className="text-2xl font-bold text-[#75b06f]">{selectedRecurringOrder.total.toLocaleString('vi-VN')}₫</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex items-center justify-between bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Phương thức thanh toán</p>
                    <p className="text-base font-semibold text-gray-800">{selectedRecurringOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
              <button
                onClick={() => {
                  setShowRecurringOrderModal(false);
                  setSelectedRecurringOrder(null);
                }}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
              >
                Đóng
              </button>
              {selectedRecurringOrder.status === "pending" && (
                <button
                  onClick={() => {
                    // Update recurring order status to shipping
                    const updatedOrder = {...selectedRecurringOrder, status: "shipping"};
                    const updatedOrders = recurringOrders.map(o => 
                      o.id === selectedRecurringOrder.id ? updatedOrder : o
                    );
                    setRecurringOrders(updatedOrders);
                    setSelectedRecurringOrder(updatedOrder);
                  }}
                  className="flex-1 px-6 py-3 bg-[#75b06f] hover:bg-[#5c8c57] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Package className="w-5 h-5" />
                  Bàn Giao Vận Chuyển
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}