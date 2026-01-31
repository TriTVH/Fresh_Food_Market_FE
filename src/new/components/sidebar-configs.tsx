import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  PackageSearch,
  BarChart3,
  AlertTriangle,
  FileText,
  Truck,
  Box,
} from "lucide-react";
import { MenuSection, MenuItem } from "./Sidebar";

// ==================== UNIFIED SIDEBAR CONFIG ====================
export const getSidebarConfig = (role: 'admin' | 'supplier'): MenuSection[] => {
  if (role === 'admin') {
    return [
      {
        title: "Quản Trị Hệ Thống",
        items: [
          {
            id: "admin-dashboard",
            icon: LayoutDashboard,
            label: "Dashboard",
            description: "Tổng quan hệ thống",
          },
          {
            id: "product-catalog",
            icon: Package,
            label: "Quản Lý Sản Phẩm",
            description: "Danh mục sản phẩm",
          },
          {
            id: "batch-management",
            icon: PackageSearch,
            label: "Quản Lý Lô Hàng",
            description: "Nhập kho & hạn sử dụng",
          },
          {
            id: "order-management",
            icon: ShoppingCart,
            label: "Quản Lý Đơn Hàng",
            description: "Đơn hàng & vận chuyển",
          },
        ],
      },
    ];
  }
  
  // Supplier - chỉ có Quản Lý Lô Hàng
  return [
    {
      title: "Quản Lý Nhà Cung Cấp",
      items: [
        {
          id: "batch-management",
          icon: PackageSearch,
          label: "Quản Lý Lô Hàng",
          description: "Nhập kho & hạn sử dụng",
        },
      ],
    },
  ];
};

// ==================== LEGACY FUNCTIONS (for backward compatibility) ====================
export const getAdminSidebarConfig = (): MenuSection[] => getSidebarConfig('admin');
export const getSupplierSidebarConfig = (): MenuSection[] => getSidebarConfig('supplier');

// ==================== ADMIN MENU ITEMS (for Batch Sidebar) ====================
export const getAdminMenuItems = (): MenuItem[] => [
  {
    id: "admin-dashboard",
    icon: LayoutDashboard,
    label: "Dashboard Admin",
  },
  {
    id: "product-catalog",
    icon: BarChart3,
    label: "Quản Lý Sản Phẩm",
  },
  {
    id: "order-management",
    icon: ShoppingCart,
    label: "Quản Lý Đơn Hàng",
  },
];