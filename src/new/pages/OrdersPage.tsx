import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Wallet,
  CreditCard,
  ChevronRight,
  ShoppingBag,
  Calendar,
  Receipt,
  Trash2,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getProductById } from "../data/products";

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  quantity: number;
}

export interface Order {
  order_id: string;
  order_date: string;
  status:
    | "pending"
    | "packing"
    | "shipping"
    | "failed"
    | "success";
  total_amount: number;
  items: OrderItem[];
  shipping_address: {
    street: string;
    ward: string;
    city: string;
    province: string;
  };
  payment_method: "COD" | "ONLINE";
  discount?: number;
  shipping_fee: number;
  cancel_reason?: string;
}

interface OrdersPageProps {
  onPageChange: (page: string) => void;
  currentUser: { email: string; name: string } | null;
}

// Helper function to create order items from product IDs
const createOrderItems = (
  productData: { id: string; quantity: number }[],
): OrderItem[] => {
  return productData.map((item) => {
    const product = getProductById(item.id);
    if (!product) {
      throw new Error(`Product with ID ${item.id} not found`);
    }
    return {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      quantity: item.quantity,
    };
  });
};

// Mock orders data
const MOCK_ORDERS: Order[] = [
  // ===== PENDING ORDERS (5) =====
  {
    order_id: "ORD005",
    order_date: "2026-01-14T16:20:00",
    status: "pending",
    total_amount: 320000,
    items: createOrderItems([
      { id: "10", quantity: 2 }, // Bơ (-19% discount)
      { id: "42", quantity: 1 }, // Nho Xanh Không Hạt
    ]),
    shipping_address: {
      street: "47 Trần Hưng Đạo",
      ward: "Bà Rịa",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD006",
    order_date: "2026-01-14T15:00:00",
    status: "pending",
    total_amount: 245000,
    items: createOrderItems([
      { id: "5", quantity: 3 }, // Cải Kale
      { id: "8", quantity: 2 }, // Cải Xanh
    ]),
    shipping_address: {
      street: "123 Nguyễn Văn Linh",
      ward: "Tân Phú",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD007",
    order_date: "2026-01-14T14:30:00",
    status: "pending",
    total_amount: 180000,
    items: createOrderItems([
      { id: "17", quantity: 1 }, // Nấm Hương (-15% discount)
      { id: "22", quantity: 2 }, // Nấm Portobello (-19% discount)
    ]),
    shipping_address: {
      street: "89 Lê Lợi",
      ward: "Bến Thành",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 15000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD008",
    order_date: "2026-01-14T13:45:00",
    status: "pending",
    total_amount: 420000,
    items: createOrderItems([
      { id: "36", quantity: 2 }, // Thanh Long Ruột Đỏ
      { id: "37", quantity: 3 }, // Chuối Tiêu
    ]),
    shipping_address: {
      street: "56 Võ Văn Tần",
      ward: "Võ Thị Sáu",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD009",
    order_date: "2026-01-14T12:00:00",
    status: "pending",
    total_amount: 350000,
    items: createOrderItems([
      { id: "41", quantity: 2 }, // Táo Gala (-21% discount)
      { id: "48", quantity: 1 }, // Hồng Giòn
    ]),
    shipping_address: {
      street: "234 Hai Bà Trưng",
      ward: "Đa Kao",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 30000,
    shipping_fee: 30000,
  },

  // ===== PACKING ORDERS (5) =====
  {
    order_id: "ORD003",
    order_date: "2026-01-12T09:20:00",
    status: "packing",
    total_amount: 520000,
    items: createOrderItems([
      { id: "41", quantity: 2 }, // Táo Gala (-21% discount)
      { id: "42", quantity: 2 }, // Nho Xanh Không Hạt
      { id: "39", quantity: 1 }, // Nhãn Lồng (-24% discount)
    ]),
    shipping_address: {
      street: "47 Trần Hưng Đạo",
      ward: "Bà Rịa",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    discount: 50000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD010",
    order_date: "2026-01-13T11:30:00",
    status: "packing",
    total_amount: 280000,
    items: createOrderItems([
      { id: "5", quantity: 2 }, // Cải Kale
      { id: "2", quantity: 3 }, // Xà Lách Tươi
    ]),
    shipping_address: {
      street: "78 Pasteur",
      ward: "Bến Nghé",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD011",
    order_date: "2026-01-13T10:15:00",
    status: "packing",
    total_amount: 195000,
    items: createOrderItems([
      { id: "12", quantity: 3 }, // Cà Rốt
      { id: "14", quantity: 2 }, // Ớt Chuông
    ]),
    shipping_address: {
      street: "145 Điện Biên Phủ",
      ward: "Đa Kao",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    discount: 10000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD012",
    order_date: "2026-01-13T09:00:00",
    status: "packing",
    total_amount: 450000,
    items: createOrderItems([
      { id: "45", quantity: 2 }, // Cherry Đỏ
      { id: "10", quantity: 1 }, // Bơ (-19% discount)
    ]),
    shipping_address: {
      street: "67 Cách Mạng Tháng 8",
      ward: "Bến Thành",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD013",
    order_date: "2026-01-12T16:40:00",
    status: "packing",
    total_amount: 340000,
    items: createOrderItems([
      { id: "48", quantity: 2 }, // Hồng Giòn
      { id: "36", quantity: 1 }, // Thanh Long Ruột Đỏ
    ]),
    shipping_address: {
      street: "92 Nam Kỳ Khởi Nghĩa",
      ward: "Bến Nghé",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    discount: 25000,
    shipping_fee: 30000,
  },

  // ===== SHIPPING ORDERS (5) =====
  {
    order_id: "ORD002",
    order_date: "2026-01-13T15:45:00",
    status: "shipping",
    total_amount: 285000,
    items: createOrderItems([
      { id: "22", quantity: 3 }, // Nấm Portobello (-19% discount)
      { id: "17", quantity: 1 }, // Nấm Hương (-15% discount)
      { id: "2", quantity: 2 }, // Xà Lách Tươi
    ]),
    shipping_address: {
      street: "47 Phạm Ngọc Thạch",
      ward: "Bà Rịa",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD014",
    order_date: "2026-01-12T14:20:00",
    status: "shipping",
    total_amount: 310000,
    items: createOrderItems([
      { id: "9", quantity: 3 }, // Cà Chua Bi
      { id: "8", quantity: 2 }, // Cải Xanh
    ]),
    shipping_address: {
      street: "156 Lý Chính Thắng",
      ward: "Võ Thị Sáu",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD015",
    order_date: "2026-01-12T13:10:00",
    status: "shipping",
    total_amount: 385000,
    items: createOrderItems([
      { id: "39", quantity: 2 }, // Nhãn Lồng (-24% discount)
      { id: "37", quantity: 3 }, // Chuối Tiêu
    ]),
    shipping_address: {
      street: "88 Tôn Đức Thắng",
      ward: "Bến Nghé",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 35000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD016",
    order_date: "2026-01-11T17:30:00",
    status: "shipping",
    total_amount: 265000,
    items: createOrderItems([
      { id: "19", quantity: 2 }, // Đậu Hủ Non
      { id: "33", quantity: 3 }, // Cam Sành
    ]),
    shipping_address: {
      street: "45 Nguyễn Thị Minh Khai",
      ward: "Đa Kao",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD017",
    order_date: "2026-01-11T16:00:00",
    status: "shipping",
    total_amount: 520000,
    items: createOrderItems([
      { id: "42", quantity: 2 }, // Nho Xanh Không Hạt
      { id: "45", quantity: 1 }, // Cherry Đỏ
    ]),
    shipping_address: {
      street: "234 Trần Quốc Toản",
      ward: "Võ Thị Sáu",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 40000,
    shipping_fee: 30000,
  },

  // ===== SUCCESS ORDERS (5) =====
  {
    order_id: "ORD001",
    order_date: "2026-01-14T10:30:00",
    status: "success",
    total_amount: 198000,
    items: createOrderItems([
      { id: "5", quantity: 2 }, // Cải Kale
      { id: "9", quantity: 2 }, // Cà Chua Bi
    ]),
    shipping_address: {
      street: "47 Trần Hưng Đạo",
      ward: "Bà Rịa",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    discount: 20000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD018",
    order_date: "2026-01-11T11:20:00",
    status: "success",
    total_amount: 425000,
    items: createOrderItems([
      { id: "37", quantity: 4 }, // Chuối Tiêu
      { id: "41", quantity: 2 }, // Táo Gala (-21% discount)
    ]),
    shipping_address: {
      street: "78 Lê Thánh Tôn",
      ward: "Bến Nghé",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD019",
    order_date: "2026-01-10T15:40:00",
    status: "success",
    total_amount: 290000,
    items: createOrderItems([
      { id: "2", quantity: 3 }, // Xà Lách Tươi
      { id: "17", quantity: 2 }, // Nấm Hương (-15% discount)
    ]),
    shipping_address: {
      street: "145 Nguyễn Đình Chiểu",
      ward: "Đa Kao",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    discount: 18000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD020",
    order_date: "2026-01-10T09:15:00",
    status: "success",
    total_amount: 365000,
    items: createOrderItems([
      { id: "22", quantity: 2 }, // Nấm Portobello (-19% discount)
      { id: "14", quantity: 3 }, // Ớt Chuông
    ]),
    shipping_address: {
      street: "67 Võ Thị Sáu",
      ward: "Võ Thị Sáu",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 28000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD021",
    order_date: "2026-01-09T14:30:00",
    status: "success",
    total_amount: 480000,
    items: createOrderItems([
      { id: "48", quantity: 2 }, // Hồng Giòn
      { id: "33", quantity: 4 }, // Cam Sành
    ]),
    shipping_address: {
      street: "89 Trần Cao Vân",
      ward: "Đa Kao",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
  },

  // ===== FAILED ORDERS (5) =====
  {
    order_id: "ORD004",
    order_date: "2026-01-11T14:10:00",
    status: "failed",
    total_amount: 195000,
    items: createOrderItems([
      { id: "12", quantity: 3 }, // Cà Rốt
      { id: "33", quantity: 2 }, // Cam Sành
      { id: "19", quantity: 1 }, // Đậu Hủ Non
    ]),
    shipping_address: {
      street: "47 Phạm Ngọc Thạch",
      ward: "Bà Rịa",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    shipping_fee: 30000,
    cancel_reason: "Muốn thay đổi địa chỉ giao hàng",
  },
  {
    order_id: "ORD022",
    order_date: "2026-01-09T10:25:00",
    status: "failed",
    total_amount: 220000,
    items: createOrderItems([
      { id: "10", quantity: 2 }, // Bơ (-19% discount)
      { id: "45", quantity: 1 }, // Cherry Đỏ
    ]),
    shipping_address: {
      street: "123 Cộng Hòa",
      ward: "Tân Bình",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
    cancel_reason: "Đặt nhầm sản phẩm",
  },
  {
    order_id: "ORD023",
    order_date: "2026-01-08T16:50:00",
    status: "failed",
    total_amount: 175000,
    items: createOrderItems([
      { id: "39", quantity: 2 }, // Nhãn Lồng (-24% discount)
      { id: "36", quantity: 1 }, // Thanh Long Ruột Đỏ
    ]),
    shipping_address: {
      street: "56 Phan Xích Long",
      ward: "Phú Nhuận",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 12000,
    shipping_fee: 30000,
    cancel_reason: "Tìm được giá tốt hơn",
  },
  {
    order_id: "ORD024",
    order_date: "2026-01-08T12:00:00",
    status: "failed",
    total_amount: 335000,
    items: createOrderItems([
      { id: "42", quantity: 2 }, // Nho Xanh Không Hạt
      { id: "41", quantity: 1 }, // Táo Gala (-21% discount)
    ]),
    shipping_address: {
      street: "234 Lý Thường Kiệt",
      ward: "Tân Bình",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
    cancel_reason: "Không cần nữa",
  },
  {
    order_id: "ORD025",
    order_date: "2026-01-07T09:30:00",
    status: "failed",
    total_amount: 410000,
    items: createOrderItems([
      { id: "48", quantity: 2 }, // Hồng Giòn
      { id: "8", quantity: 3 }, // Cải Xanh
    ]),
    shipping_address: {
      street: "78 Hoàng Văn Thụ",
      ward: "Tân Bình",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 22000,
    shipping_fee: 30000,
    cancel_reason: "Thời gian giao hàng quá lâu",
  },

  // ===== ADDITIONAL PENDING ORDERS (5 more) =====
  {
    order_id: "ORD026",
    order_date: "2026-01-14T11:45:00",
    status: "pending",
    total_amount: 280000,
    items: createOrderItems([
      { id: "22", quantity: 2 }, // Nấm Portobello (-19% discount)
      { id: "19", quantity: 3 }, // Đậu Hủ Non
    ]),
    shipping_address: {
      street: "99 Lê Văn Sỹ",
      ward: "Phú Nhuận",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD027",
    order_date: "2026-01-14T10:20:00",
    status: "pending",
    total_amount: 395000,
    items: createOrderItems([
      { id: "45", quantity: 1 }, // Cherry Đỏ
      { id: "37", quantity: 2 }, // Chuối Tiêu
    ]),
    shipping_address: {
      street: "156 Nguyễn Văn Trỗi",
      ward: "Phú Nhuận",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 20000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD028",
    order_date: "2026-01-14T09:15:00",
    status: "pending",
    total_amount: 215000,
    items: createOrderItems([
      { id: "9", quantity: 2 }, // Cà Chua Bi
      { id: "12", quantity: 3 }, // Cà Rốt
    ]),
    shipping_address: {
      street: "234 Trường Chinh",
      ward: "Tân Bình",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD029",
    order_date: "2026-01-14T08:30:00",
    status: "pending",
    total_amount: 465000,
    items: createOrderItems([
      { id: "41", quantity: 3 }, // Táo Gala (-21% discount)
      { id: "39", quantity: 2 }, // Nhãn Lồng (-24% discount)
    ]),
    shipping_address: {
      street: "45 Xô Viết Nghệ Tĩnh",
      ward: "Bình Thạnh",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD030",
    order_date: "2026-01-13T18:40:00",
    status: "pending",
    total_amount: 320000,
    items: createOrderItems([
      { id: "42", quantity: 2 }, // Nho Xanh Không Hạt
      { id: "14", quantity: 1 }, // Ớt Chuông
    ]),
    shipping_address: {
      street: "78 Đinh Tiên Hoàng",
      ward: "Bình Thạnh",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    discount: 15000,
    shipping_fee: 30000,
  },

  // ===== ADDITIONAL PACKING ORDERS (5 more) =====
  {
    order_id: "ORD031",
    order_date: "2026-01-12T15:20:00",
    status: "packing",
    total_amount: 255000,
    items: createOrderItems([
      { id: "2", quantity: 4 }, // Xà Lách Tươi
      { id: "8", quantity: 2 }, // Cải Xanh
    ]),
    shipping_address: {
      street: "123 Lý Tự Trọng",
      ward: "Bến Nghé",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD032",
    order_date: "2026-01-12T14:10:00",
    status: "packing",
    total_amount: 380000,
    items: createOrderItems([
      { id: "48", quantity: 2 }, // Hồng Giòn
      { id: "33", quantity: 2 }, // Cam Sành
    ]),
    shipping_address: {
      street: "67 Nguyễn Huệ",
      ward: "Bến Nghé",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    discount: 25000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD033",
    order_date: "2026-01-12T13:00:00",
    status: "packing",
    total_amount: 290000,
    items: createOrderItems([
      { id: "17", quantity: 3 }, // Nấm Hương (-15% discount)
      { id: "5", quantity: 2 }, // Cải Kale
    ]),
    shipping_address: {
      street: "89 Đồng Khởi",
      ward: "Bến Nghé",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 18000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD034",
    order_date: "2026-01-12T11:45:00",
    status: "packing",
    total_amount: 505000,
    items: createOrderItems([
      { id: "10", quantity: 3 }, // Bơ (-19% discount)
      { id: "36", quantity: 4 }, // Thanh Long Ruột Đỏ
    ]),
    shipping_address: {
      street: "145 Hai Bà Trưng",
      ward: "Bến Nghé",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD035",
    order_date: "2026-01-12T10:30:00",
    status: "packing",
    total_amount: 425000,
    items: createOrderItems([
      { id: "45", quantity: 1 }, // Cherry Đỏ
      { id: "41", quantity: 1 }, // Táo Gala (-21% discount)
    ]),
    shipping_address: {
      street: "234 Lê Duẩn",
      ward: "Bến Nghé",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 35000,
    shipping_fee: 30000,
  },

  // ===== ADDITIONAL SHIPPING ORDERS (5 more) =====
  {
    order_id: "ORD036",
    order_date: "2026-01-11T15:30:00",
    status: "shipping",
    total_amount: 270000,
    items: createOrderItems([
      { id: "22", quantity: 2 }, // Nấm Portobello (-19% discount)
      { id: "2", quantity: 3 }, // Xà Lách Tươi
    ]),
    shipping_address: {
      street: "56 Nguyễn Trãi",
      ward: "Bến Thành",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD037",
    order_date: "2026-01-11T14:15:00",
    status: "shipping",
    total_amount: 335000,
    items: createOrderItems([
      { id: "37", quantity: 4 }, // Chuối Tiêu
      { id: "33", quantity: 3 }, // Cam Sành
    ]),
    shipping_address: {
      street: "78 Phạm Viết Chánh",
      ward: "Nguyễn Cư Trinh",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 20000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD038",
    order_date: "2026-01-11T13:00:00",
    status: "shipping",
    total_amount: 480000,
    items: createOrderItems([
      { id: "42", quantity: 3 }, // Nho Xanh Không Hạt
      { id: "10", quantity: 1 }, // Bơ (-19% discount)
    ]),
    shipping_address: {
      street: "123 Bùi Viện",
      ward: "Phạm Ngũ Lão",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD039",
    order_date: "2026-01-11T11:30:00",
    status: "shipping",
    total_amount: 390000,
    items: createOrderItems([
      { id: "48", quantity: 2 }, // Hồng Giòn
      { id: "39", quantity: 1 }, // Nhãn Lồng (-24% discount)
    ]),
    shipping_address: {
      street: "89 Nguyễn Thái Học",
      ward: "Cầu Ông Lãnh",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 30000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD040",
    order_date: "2026-01-11T10:00:00",
    status: "shipping",
    total_amount: 220000,
    items: createOrderItems([
      { id: "9", quantity: 3 }, // Cà Chua Bi
      { id: "19", quantity: 2 }, // Đậu Hủ Non
    ]),
    shipping_address: {
      street: "45 Đề Thám",
      ward: "Cô Giang",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
  },

  // ===== ADDITIONAL SUCCESS ORDERS (5 more) =====
  {
    order_id: "ORD041",
    order_date: "2026-01-08T16:30:00",
    status: "success",
    total_amount: 355000,
    items: createOrderItems([
      { id: "5", quantity: 3 }, // Cải Kale
      { id: "14", quantity: 2 }, // Ớt Chuông
    ]),
    shipping_address: {
      street: "67 Hùng Vương",
      ward: "Bến Thành",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD042",
    order_date: "2026-01-08T14:20:00",
    status: "success",
    total_amount: 520000,
    items: createOrderItems([
      { id: "41", quantity: 2 }, // Táo Gala (-21% discount)
      { id: "42", quantity: 2 }, // Nho Xanh Không Hạt
    ]),
    shipping_address: {
      street: "123 Yersin",
      ward: "Nguyễn Thái Bình",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    discount: 40000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD043",
    order_date: "2026-01-08T11:10:00",
    status: "success",
    total_amount: 275000,
    items: createOrderItems([
      { id: "12", quantity: 4 }, // Cà Rốt
      { id: "8", quantity: 3 }, // Cải Xanh
    ]),
    shipping_address: {
      street: "89 Trần Hưng Đạo",
      ward: "Cầu Kho",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 16000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD044",
    order_date: "2026-01-07T17:45:00",
    status: "success",
    total_amount: 445000,
    items: createOrderItems([
      { id: "45", quantity: 1 }, // Cherry Đỏ
      { id: "36", quantity: 3 }, // Thanh Long Ruột Đỏ
    ]),
    shipping_address: {
      street: "234 Nam Kỳ Khởi Nghĩa",
      ward: "Võ Thị Sáu",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD045",
    order_date: "2026-01-07T15:20:00",
    status: "success",
    total_amount: 310000,
    items: createOrderItems([
      { id: "17", quantity: 2 }, // Nấm Hương (-15% discount)
      { id: "22", quantity: 2 }, // Nấm Portobello (-19% discount)
    ]),
    shipping_address: {
      street: "56 Sư Vạn Hạnh",
      ward: "Phường 10",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 24000,
    shipping_fee: 30000,
  },

  // ===== ADDITIONAL FAILED ORDERS (5 more) =====
  {
    order_id: "ORD046",
    order_date: "2026-01-06T16:30:00",
    status: "failed",
    total_amount: 265000,
    items: createOrderItems([
      { id: "37", quantity: 3 }, // Chuối Tiêu
      { id: "33", quantity: 2 }, // Cam Sành
    ]),
    shipping_address: {
      street: "78 Cao Thắng",
      ward: "Phường 3",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD047",
    order_date: "2026-01-06T14:15:00",
    status: "failed",
    total_amount: 385000,
    items: createOrderItems([
      { id: "10", quantity: 2 }, // Bơ (-19% discount)
      { id: "48", quantity: 1 }, // Hồng Giòn
    ]),
    shipping_address: {
      street: "123 Điện Biên Phủ",
      ward: "Đa Kao",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 28000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD048",
    order_date: "2026-01-06T11:00:00",
    status: "failed",
    total_amount: 195000,
    items: createOrderItems([
      { id: "2", quantity: 2 }, // Xà Lách Tươi
      { id: "5", quantity: 2 }, // Cải Kale
    ]),
    shipping_address: {
      street: "45 Trần Quang Khải",
      ward: "Tân Định",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD049",
    order_date: "2026-01-05T18:30:00",
    status: "failed",
    total_amount: 430000,
    items: createOrderItems([
      { id: "42", quantity: 2 }, // Nho Xanh Không Hạt
      { id: "41", quantity: 1 }, // Táo Gala (-21% discount)
    ]),
    shipping_address: {
      street: "89 Nguyễn Đình Chiểu",
      ward: "Đa Kao",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 35000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD050",
    order_date: "2026-01-05T15:00:00",
    status: "failed",
    total_amount: 340000,
    items: createOrderItems([
      { id: "39", quantity: 3 }, // Nhãn Lồng (-24% discount)
      { id: "19", quantity: 4 }, // Đậu Hủ Non
    ]),
    shipping_address: {
      street: "234 Võ Văn Tần",
      ward: "Võ Thị Sáu",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
  },

  // ===== HIGH DISCOUNT ORDERS - Đơn hàng có giảm giá cao (10) =====
  {
    order_id: "ORD051",
    order_date: "2026-01-15T10:30:00",
    status: "pending",
    total_amount: 420000,
    items: createOrderItems([
      { id: "10", quantity: 2 }, // Bơ (-19%)
      { id: "41", quantity: 2 }, // Táo Gala (-21%)
    ]),
    shipping_address: {
      street: "123 Lê Lợi",
      ward: "Bến Thành",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 45000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD052",
    order_date: "2026-01-15T09:15:00",
    status: "pending",
    total_amount: 405000,
    items: createOrderItems([
      { id: "39", quantity: 3 }, // Nhãn Lồng (-24%)
      { id: "22", quantity: 2 }, // Nấm Portobello (-19%)
    ]),
    shipping_address: {
      street: "456 Nguyễn Huệ",
      ward: "Bến Nghé",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD053",
    order_date: "2026-01-15T08:00:00",
    status: "packing",
    total_amount: 485000,
    items: createOrderItems([
      { id: "41", quantity: 3 }, // Táo Gala (-21%)
      { id: "10", quantity: 2 }, // Bơ (-19%)
    ]),
    shipping_address: {
      street: "789 Trần Hưng Đạo",
      ward: "Cầu Ông Lãnh",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 60000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD054",
    order_date: "2026-01-14T18:30:00",
    status: "packing",
    total_amount: 355000,
    items: createOrderItems([
      { id: "22", quantity: 3 }, // Nấm Portobello (-19%)
      { id: "39", quantity: 2 }, // Nhãn Lồng (-24%)
    ]),
    shipping_address: {
      street: "234 Lý Thường Kiệt",
      ward: "Phường 7",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    discount: 30000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD055",
    order_date: "2026-01-14T17:00:00",
    status: "shipping",
    total_amount: 395000,
    items: createOrderItems([
      { id: "10", quantity: 3 }, // Bơ (-19%)
      { id: "17", quantity: 2 }, // Nấm Hương (-15%)
    ]),
    shipping_address: {
      street: "567 Cách Mạng Tháng 8",
      ward: "Võ Thị Sáu",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 40000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD056",
    order_date: "2026-01-14T15:45:00",
    status: "shipping",
    total_amount: 465000,
    items: createOrderItems([
      { id: "41", quantity: 4 }, // Táo Gala (-21%)
    ]),
    shipping_address: {
      street: "890 Điện Biên Phủ",
      ward: "Đa Kao",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    shipping_fee: 30000,
  },
  {
    order_id: "ORD057",
    order_date: "2026-01-13T16:20:00",
    status: "success",
    total_amount: 520000,
    items: createOrderItems([
      { id: "39", quantity: 4 }, // Nhãn Lồng (-24%)
      { id: "10", quantity: 3 }, // Bơ (-19%)
    ]),
    shipping_address: {
      street: "123 Pasteur",
      ward: "Bến Nghé",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    discount: 55000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD058",
    order_date: "2026-01-13T14:50:00",
    status: "success",
    total_amount: 445000,
    items: createOrderItems([
      { id: "22", quantity: 4 }, // Nấm Portobello (-19%)
      { id: "41", quantity: 2 }, // Táo Gala (-21%)
    ]),
    shipping_address: {
      street: "456 Hai Bà Trưng",
      ward: "Tân Định",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    discount: 50000,
    shipping_fee: 30000,
  },
  {
    order_id: "ORD059",
    order_date: "2026-01-12T13:30:00",
    status: "failed",
    total_amount: 340000,
    items: createOrderItems([
      { id: "17", quantity: 4 }, // Nấm Hương (-15%)
      { id: "39", quantity: 1 }, // Nhãn Lồng (-24%)
    ]),
    shipping_address: {
      street: "789 Võ Văn Tần",
      ward: "Võ Thị Sáu",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "ONLINE",
    shipping_fee: 30000,
    cancel_reason: "Đổi ý không mua nữa",
  },
  {
    order_id: "ORD060",
    order_date: "2026-01-12T11:15:00",
    status: "failed",
    total_amount: 385000,
    items: createOrderItems([
      { id: "10", quantity: 2 }, // Bơ (-19%)
      { id: "41", quantity: 2 }, // Táo Gala (-21%)
    ]),
    shipping_address: {
      street: "234 Nam Kỳ Khởi Nghĩa",
      ward: "Bến Thành",
      city: "Thành Phố Hồ Chí Minh",
      province: "Hồ Chí Minh",
    },
    payment_method: "COD",
    discount: 35000,
    shipping_fee: 30000,
    cancel_reason: "Thời gian giao hàng không phù hợp",
  },
];

export function OrdersPage({
  onPageChange,
  currentUser,
}: OrdersPageProps) {
  const [selectedStatus, setSelectedStatus] =
    useState<string>("pending");
  const [expandedOrders, setExpandedOrders] = useState<
    Set<string>
  >(new Set());
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const ordersPerPage = 8;

  // Sync pageInput with currentPage when currentPage changes (e.g., via pagination buttons)
  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  // Word count helper
  const getWordCount = (text: string): number => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const wordCount = getWordCount(cancelReason);
  const isWordLimitExceeded = wordCount > 100;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAddress = (
    address: Order["shipping_address"],
  ) => {
    return `${address.street}, ${address.ward}, ${address.city}, ${address.province}`;
  };

  const getStatusConfig = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return {
          label: "Chờ xác nhận",
          icon: Clock,
          color: "text-amber-700",
          bgColor:
            "bg-gradient-to-r from-amber-50 to-amber-100",
          borderColor: "border-amber-300",
          dotColor: "bg-amber-500",
          badgeBg: "bg-amber-500",
          priceColor: "text-amber-600",
        };
      case "packing":
        return {
          label: "Đang đóng gói",
          icon: Package,
          color: "text-blue-700",
          bgColor: "bg-gradient-to-r from-blue-50 to-blue-100",
          borderColor: "border-blue-300",
          dotColor: "bg-blue-500",
          badgeBg: "bg-blue-500",
          priceColor: "text-blue-600",
        };
      case "shipping":
        return {
          label: "Đang vận chuyển",
          icon: Truck,
          color: "text-purple-700",
          bgColor:
            "bg-gradient-to-r from-purple-50 to-purple-100",
          borderColor: "border-purple-300",
          dotColor: "bg-purple-500",
          badgeBg: "bg-purple-500",
          priceColor: "text-purple-600",
        };
      case "failed":
        return {
          label: "Thất bại",
          icon: XCircle,
          color: "text-red-700",
          bgColor: "bg-gradient-to-r from-red-50 to-red-100",
          borderColor: "border-red-300",
          dotColor: "bg-red-500",
          badgeBg: "bg-red-500",
          priceColor: "text-red-600",
        };
      case "success":
        return {
          label: "Thành công",
          icon: CheckCircle,
          color: "text-green-700",
          bgColor:
            "bg-gradient-to-r from-green-50 to-green-100",
          borderColor: "border-green-300",
          dotColor: "bg-green-500",
          badgeBg: "bg-green-500",
          priceColor: "text-green-600",
        };
    }
  };

  const toggleOrderExpanded = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const filteredOrders = orders.filter((order) => {
    return order.status === selectedStatus;
  });

  const statusCounts = {
    pending: orders.filter((o) => o.status === "pending")
      .length,
    packing: orders.filter((o) => o.status === "packing")
      .length,
    shipping: orders.filter((o) => o.status === "shipping")
      .length,
    failed: orders.filter((o) => o.status === "failed")
      .length,
    success: orders.filter((o) => o.status === "success")
      .length,
  };

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

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

  const handleCancelOrder = (orderId: string) => {
    setOrderToCancel(orderId);
    setCancelModalOpen(true);
  };

  const confirmCancelOrder = () => {
    if (orderToCancel) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderToCancel
            ? { 
                ...order, 
                status: "failed" as const,
                cancel_reason: cancelReason || undefined
              }
            : order
        )
      );
      setCancelModalOpen(false);
      setOrderToCancel(null);
      setCancelReason("");
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#75b06f] to-[#5a9450] rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Vui lòng đăng nhập
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Bạn cần đăng nhập để xem đơn hàng của mình
            </p>
            <button
              onClick={() => onPageChange("login")}
              className="w-full bg-gradient-to-r from-[#75b06f] to-[#5a9450] text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Đăng Nhập Ngay
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#75b06f] to-[#5a9450] rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                Đơn Hàng Của Tôi
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm">
                Quản lý và theo dõi đơn hàng của bạn
              </p>
            </div>
          </div>
        </div>

        {/* Status Filter - Horizontal Scroll on Mobile */}
        <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-2 sm:gap-4 md:gap-8 min-w-max md:min-w-0 md:flex-wrap md:justify-center">
            <button
              onClick={() => {
                setSelectedStatus("pending");
                setCurrentPage(1);
              }}
              className={`px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 flex items-center gap-1 sm:gap-2 whitespace-nowrap ${
                selectedStatus === "pending"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-200 scale-105"
                  : "bg-white text-gray-700 hover:bg-amber-50 border-2 border-gray-200 hover:border-amber-400"
              }`}
            >
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Chờ xác nhận</span>
              <span className="sm:hidden">Chờ XN</span>
              <span className="ml-1 opacity-80">
                ({statusCounts.pending})
              </span>
            </button>
            <button
              onClick={() => {
                setSelectedStatus("packing");
                setCurrentPage(1);
              }}
              className={`px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 flex items-center gap-1 sm:gap-2 whitespace-nowrap ${
                selectedStatus === "packing"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                  : "bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400"
              }`}
            >
              <Package className="w-3 h-3 sm:w-4 sm:h-4" />
              Đóng gói
              <span className="ml-1 opacity-80">
                ({statusCounts.packing})
              </span>
            </button>
            <button
              onClick={() => {
                setSelectedStatus("shipping");
                setCurrentPage(1);
              }}
              className={`px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 flex items-center gap-1 sm:gap-2 whitespace-nowrap ${
                selectedStatus === "shipping"
                  ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-200 scale-105"
                  : "bg-white text-gray-700 hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-400"
              }`}
            >
              <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Vận chuyển</span>
              <span className="sm:hidden">VChuyen</span>
              <span className="ml-1 opacity-80">
                ({statusCounts.shipping})
              </span>
            </button>
            <button
              onClick={() => {
                setSelectedStatus("success");
                setCurrentPage(1);
              }}
              className={`px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 flex items-center gap-1 sm:gap-2 whitespace-nowrap ${
                selectedStatus === "success"
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-200 scale-105"
                  : "bg-white text-gray-700 hover:bg-green-50 border-2 border-gray-200 hover:border-green-400"
              }`}
            >
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Thành công</span>
              <span className="sm:hidden">T.Công</span>
              <span className="ml-1 opacity-80">
                ({statusCounts.success})
              </span>
            </button>
            <button
              onClick={() => {
                setSelectedStatus("failed");
                setCurrentPage(1);
              }}
              className={`px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 flex items-center gap-1 sm:gap-2 whitespace-nowrap ${
                selectedStatus === "failed"
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-200 scale-105"
                  : "bg-white text-gray-700 hover:bg-red-50 border-2 border-gray-200 hover:border-red-400"
              }`}
            >
              <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Thất bại</span>
              <span className="sm:hidden">T.Bại</span>
              <span className="ml-1 opacity-80">
                ({statusCounts.failed})
              </span>
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-8 sm:p-16 text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                Không có đơn hàng
              </h2>
              <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8 max-w-md mx-auto">
                Bạn chưa có đơn hàng nào trong danh mục này
              </p>
              <button
                onClick={() => onPageChange("products")}
                className="bg-gradient-to-r from-[#75b06f] to-[#5a9450] text-white font-semibold py-3 sm:py-4 px-8 sm:px-10 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                Mua Sắm Ngay
              </button>
            </div>
          ) : (
            paginatedOrders.map((order) => {
                const statusConfig = getStatusConfig(
                  order.status,
                );
                const StatusIcon = statusConfig.icon;
                const isExpanded = expandedOrders.has(
                  order.order_id,
                );

                return (
                  <div
                    key={order.order_id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    {/* Order Card Header - Clickable */}
                    <div
                      onClick={() =>
                        toggleOrderExpanded(order.order_id)
                      }
                      className="cursor-pointer"
                    >
                      {/* Status Bar */}

                      {/* Order Info */}
                      <div className="p-4 sm:p-5 md:p-6">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-5">
                          {/* Left: Order ID & Date */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 sm:gap-3 mb-2">
                              <div
                                className={`w-2 h-2 rounded-full ${statusConfig.dotColor} animate-pulse`}
                              ></div>
                              <span className="font-bold text-gray-900 text-base sm:text-lg">
                                {order.order_id}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>
                                {formatDate(order.order_date)}
                              </span>
                            </div>
                          </div>

                          {/* Right: Status Badge */}
                          <div
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border-2 ${statusConfig.bgColor} ${statusConfig.borderColor} flex items-center gap-1.5 sm:gap-2`}
                          >
                            <StatusIcon
                              className={`w-4 h-4 sm:w-5 sm:h-5 ${statusConfig.color}`}
                            />
                            <span
                              className={`font-bold text-xs sm:text-sm ${statusConfig.color}`}
                            >
                              {statusConfig.label}
                            </span>
                          </div>
                        </div>

                        {/* Products Preview */}
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex-shrink-0 relative"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border-2 border-gray-200"
                              />
                              <div
                                className={`absolute top-0 -right-2 w-5 h-5 ${statusConfig.badgeBg} text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg ring-2 ring-white`}
                              >
                                {item.quantity}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Cancel Reason - Show for Failed Orders */}
                        {order.status === "failed" && order.cancel_reason && (
                          <div className="mb-4 p-2.5 sm:p-3 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs font-semibold text-red-600 mb-1">
                                Lý do hủy đơn
                              </p>
                              <p className="text-xs sm:text-sm text-red-700">
                                {order.cancel_reason}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Bottom Row: Total & Expand Button */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pt-4 border-t border-gray-100">
                          <div>
                            <p className="text-xs sm:text-sm text-gray-500 mb-1">
                              Tổng thanh toán
                            </p>
                            <p className="text-xl sm:text-2xl font-bold text-gray-900">
                              {formatPrice(order.total_amount)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            {/* Delete Button - Only for Pending Orders */}
                            {order.status === "pending" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCancelOrder(order.order_id);
                                }}
                                className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors font-semibold border-2 border-red-200 hover:border-red-300 flex items-center justify-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span className="text-xs sm:text-sm">Hủy Đơn</span>
                              </button>
                            )}
                            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors font-semibold text-gray-700">
                              <span className="text-xs sm:text-sm">
                                {isExpanded
                                  ? "Thu gọn"
                                  : "Chi tiết"}
                              </span>
                              <ChevronRight
                                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="border-t-2 border-gray-100 bg-gradient-to-b from-gray-50 to-white p-6 space-y-6">
                        {/* Products Detail */}
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Receipt className="w-5 h-5 text-[#75b06f]" />
                            <h3 className="font-bold text-gray-800 text-lg">
                              Chi tiết sản phẩm
                            </h3>
                          </div>
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100 hover:border-[#75b06f] transition-colors"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-900 mb-1 truncate">
                                    {item.name}
                                  </h4>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <p className="text-sm font-semibold text-[#75b06f]">
                                      {formatPrice(item.price)}
                                    </p>
                                    {item.originalPrice && item.originalPrice > item.price && (
                                      <p className="text-xs text-gray-400 line-through">
                                        {formatPrice(item.originalPrice)}
                                      </p>
                                    )}
                                    <p className="text-sm text-gray-500">
                                      × {item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <p className="font-bold text-gray-900">
                                    {formatPrice(
                                      item.price * item.quantity,
                                    )}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="bg-white rounded-xl p-5 border-2 border-gray-100">
                          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Wallet className="w-5 h-5 text-[#75b06f]" />
                            Chi tiết thanh toán
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between text-gray-600">
                              <span>Tạm tính:</span>
                              <span className="font-semibold">
                                {formatPrice(
                                  order.total_amount -
                                    order.shipping_fee +
                                    (order.discount || 0),
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                              <span>Phí vận chuyển:</span>
                              <span className="font-semibold">
                                {formatPrice(order.shipping_fee)}
                              </span>
                            </div>
                            {order.discount && (
                              <div className="flex justify-between text-green-600">
                                <span>Giảm giá voucher:</span>
                                <span className="font-semibold">
                                  -{formatPrice(order.discount)}
                                </span>
                              </div>
                            )}
                            <div className="border-t-2 border-gray-200 pt-3 flex justify-between items-center">
                              <span className="font-bold text-gray-800 text-lg">
                                Tổng cộng:
                              </span>
                              <span className="font-bold text-2xl text-gray-900">
                                {formatPrice(order.total_amount)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Shipping & Payment Info */}
                        <div className="grid md:grid-cols-2 gap-4">
                          {/* Shipping Address */}
                          <div className="bg-white rounded-xl p-5 border-2 border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-[#75b06f]" />
                              Địa chỉ nhận hàng
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                              {formatAddress(
                                order.shipping_address,
                              )}
                            </p>
                          </div>

                          {/* Payment Method */}
                          <div className="bg-white rounded-xl p-5 border-2 border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                              {order.payment_method === "COD" ? (
                                <Wallet className="w-5 h-5 text-[#75b06f]" />
                              ) : (
                                <CreditCard className="w-5 h-5 text-[#75b06f]" />
                              )}
                              Thanh toán
                            </h3>
                            <p className="font-semibold text-gray-700">
                              {order.payment_method === "COD"
                                ? "Thanh toán khi nhận hàng (COD)"
                                : "Thanh toán trực tuyến"}
                            </p>
                          </div>
                        </div>

              
                      </div>
                    )}
                  </div>
                );
              })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center px-4 py-6 mt-6 sm:mt-8">
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

        {/* Cancel Confirmation Modal */}
        {cancelModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setCancelModalOpen(false)}
          >
            <div
              className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 text-center">
                Xác Nhận Hủy Đơn Hàng
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6 leading-relaxed text-center">
                Bạn chắc chắn muốn hủy đơn hàng <span className="font-bold text-gray-800">{orderToCancel}</span> không?
              </p>
              
              {/* Optional Cancel Reason Input */}
              <div className="mb-5 sm:mb-6">
                <label htmlFor="cancelReason" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Lý do hủy đơn (không bắt buộc)
                </label>
                
                {/* Quick Suggestions */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {[
                    "Muốn thay đổi địa chỉ giao hàng",
                    "Muốn thay đổi sản phẩm",
                    "Tìm được giá tốt hơn",
                    "Đặt nhầm sản phẩm",
                    "Không cần nữa",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setCancelReason(suggestion)}
                      className="px-2.5 sm:px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-red-50 hover:text-red-600 hover:border-red-300 border-2 border-gray-200 rounded-lg transition-all duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                
                <textarea
                  id="cancelReason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Nhập lý do hủy đơn hàng..."
                  rows={3}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 outline-none transition-all duration-300 resize-none text-gray-700 ${
                    isWordLimitExceeded
                      ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-red-400 focus:ring-red-100"
                  }`}
                />
                
                {/* Word Counter */}
                <div className="flex items-center justify-between mt-2">
                  <p
                    className={`text-xs font-medium ${
                      isWordLimitExceeded ? "text-red-600" : "text-gray-500"
                    }`}
                  >
                    {wordCount}/100 từ
                  </p>
                  {isWordLimitExceeded && (
                    <p className="text-xs font-semibold text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Vượt quá giới hạn cho phép
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    setCancelModalOpen(false);
                    setCancelReason("");
                  }}
                  className="w-full sm:flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Quay Lại
                </button>
                <button
                  onClick={confirmCancelOrder}
                  disabled={isWordLimitExceeded}
                  className={`w-full sm:flex-1 font-semibold py-3 px-6 rounded-xl transition-all duration-300 ${
                    isWordLimitExceeded
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg"
                  }`}
                >
                  Xác Nhận Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}