import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductSection } from "./components/ProductSection";
import { Footer } from "./components/Footer";
import { LiveChat } from "./components/LiveChat";
import { AboutPage } from "./pages/AboutPage";
import { NewsPage } from "./pages/NewsPage";
import { ContactPage } from "./pages/ContactPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProductsPage } from "./pages/ProductsPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsPage } from "./pages/TermsPage";
import { ReturnPolicyPage } from "./pages/ReturnPolicyPage";
import { ShoppingGuidePage } from "./pages/ShoppingGuidePage";
import { RefundRequestPage } from "./pages/RefundRequestPage";
import { CartPage, CartItem } from "./pages/CartPage";
import { OrdersPage } from "./pages/OrdersPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ProductCatalog } from "./pages/ProductCatalog";
import { BatchManagement } from "./pages/BatchManagement";
import { OrderManagement } from "./pages/OrderManagement";
import { Toast } from "./components/Toast";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

// Mock product data - Mixed between categories
const vegetables = [
  // Mixed: Rau Ăn Lá, Củ Quả, Nấm Đậu Hủ (24 products total, 8 each)
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1614690738055-33507a488f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWxlJTIwdmVnZXRhYmxlJTIwZ3JlZW58ZW58MXx8fHwxNzY4Mjk2NDIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Cải Kale",
    weight: 500,
    unit: "gram",
    category: "Rau Ăn Lá",
    rating: 5,
    reviews: 31,
    sold: 245,
    price: 42000,
    origin: "Úc",
  },
  {
    id: "14",
    image:
      "https://images.unsplash.com/photo-1751199681771-cba0d6edb1f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWxsJTIwcGVwcGVyJTIwY29sb3JmdWx8ZW58MXx8fHwxNzY4Mjk2NDI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Ớt Chuông",
    weight: 1,
    unit: "kilogram",
    category: "Củ, Quả",
    rating: 5,
    reviews: 44,
    sold: 389,
    price: 48000,
    origin: "Việt Nam",
  },
  {
    id: "19",
    image:
      "https://images.unsplash.com/photo-1661349008073-136bed6e6788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2Z1JTIwYmxvY2slMjB3aGl0ZXxlbnwxfHx8fDE3NjgyOTYxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Đậu Hủ Non",
    weight: 500,
    unit: "gram",
    category: "Nấm, Đậu Hủ",
    rating: 5,
    reviews: 42,
    sold: 489,
    price: 22000,
    origin: "Việt Nam",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1657411658279-e32af8636eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGxldHR1Y2UlMjBsZWF2ZXN8ZW58MXx8fHwxNzY4Mjk1OTE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Xà Lách Tươi",
    weight: 300,
    unit: "gram",
    category: "Rau Ăn Lá",
    rating: 5,
    reviews: 28,
    sold: 345,
    price: 28000,
    origin: "Việt Nam",
  },
  {
    id: "10",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.BB3L2e63DSfqP3ReHd9ddAHaGy?rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Bơ",
    weight: 500,
    unit: "gram",
    category: "Củ, Quả",
    rating: 5,
    reviews: 45,
    sold: 723,
    price: 89000,
    originalPrice: 110000,
    discount: 19,
    origin: "Mexico",
  },
  {
    id: "22",
    image:
      "https://images.unsplash.com/photo-1670015825002-daf31ad0b881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0b2JlbGxvJTIwbXVzaHJvb20lMjBicm93bnxlbnwxfHx8fDE3NjgyOTY0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Nấm Portobello",
    weight: 300,
    unit: "gram",
    category: "Nấm, Đậu Hủ",
    rating: 5,
    reviews: 36,
    sold: 267,
    price: 58000,
    originalPrice: 72000,
    discount: 19,
    origin: "Mỹ",
  },
  {
    id: "8",
    image:
      "https://images.unsplash.com/photo-1644261863177-5b45b44e3790?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXN0YXJkJTIwZ3JlZW5zJTIwdmVnZXRhYmxlfGVufDF8fHx8MTc2ODI5NjQyNHww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Cải Xanh",
    weight: 500,
    unit: "gram",
    category: "Rau Ăn Lá",
    rating: 4,
    reviews: 17,
    sold: 178,
    price: 30000,
    origin: "Việt Nam",
  },
  {
    id: "9",
    image:
      "https://images.unsplash.com/photo-1692790129501-30efcb045e46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVycnklMjB0b21hdG9lcyUyMHJlZHxlbnwxfHx8fDE3NjgyOTU5MTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Cà Chua Bi",
    weight: 500,
    unit: "gram",
    category: "Củ, Quả",
    rating: 4,
    reviews: 32,
    sold: 512,
    price: 42000,
    origin: "Việt Nam",
  },
  {
    id: "17",
    image:
      "https://images.unsplash.com/photo-1726998814976-f24cf7919217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlpdGFrZSUyMG11c2hyb29tfGVufDF8fHx8MTc2ODI5NzY3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Nấm Hương",
    weight: 300,
    unit: "gram",
    category: "Nấm, Đậu Hủ",
    rating: 4,
    reviews: 19,
    sold: 267,
    price: 55000,
    originalPrice: 65000,
    discount: 15,
    origin: "Nhật Bản",
  },
  {
    id: "16",
    image:
      "https://cdn.tgdd.vn/2021/02/content/km3-800x500.jpg",
    name: "Khoai Lang Mật",
    weight: 1,
    unit: "kilogram",
    category: "Củ, Quả",
    rating: 5,
    reviews: 62,
    sold: 541,
    price: 32000,
    origin: "Việt Nam",
  },
  {
    id: "23",
    image:
      "https://images.unsplash.com/photo-1762305194201-077e7e23ccf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2Z1JTIwZnJpZWQlMjBnb2xkZW58ZW58MXx8fHwxNzY4Mjk2NDI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Đậu Hủ Chiên",
    weight: 400,
    unit: "gram",
    category: "Nấm, Đậu Hủ",
    rating: 5,
    reviews: 47,
    sold: 412,
    price: 28000,
    origin: "Việt Nam",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1634731201932-9bd92839bea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGluYWNoJTIwZnJlc2glMjBncmVlbnxlbnwxfHx8fDE3NjgyOTYxMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Rau Chân Vịt",
    weight: 500,
    unit: "gram",
    category: "Rau Ăn Lá",
    rating: 4,
    reviews: 15,
    sold: 187,
    price: 32000,
    originalPrice: 40000,
    discount: 20,
    origin: "Việt Nam",
  },
  {
    id: "12",
    image:
      "https://images.unsplash.com/photo-1611048660183-dc688cc049f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJyb3QlMjBvcmFuZ2UlMjB2ZWdldGFibGV8ZW58MXx8fHwxNzY4Mjk2MTM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Cà Rốt",
    weight: 1,
    unit: "kilogram",
    category: "Củ, Quả",
    rating: 5,
    reviews: 38,
    sold: 456,
    price: 28000,
    origin: "Việt Nam",
  },
  {
    id: "7",
    image:
      "https://images.unsplash.com/photo-1459162433446-35f351aa36d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNyZXNzJTIwZnJlc2glMjBncmVlbnxlbnwxfHx8fDE3NjgyOTY0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Rau Xà Lách Xoong",
    weight: 300,
    unit: "gram",
    category: "Rau Ăn Lá",
    rating: 5,
    reviews: 24,
    sold: 201,
    price: 35000,
    origin: "Việt Nam",
  },
  {
    id: "13",
    image:
      "https://images.unsplash.com/photo-1744659751904-3b2e5c095323?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3RhdG8lMjBicm93biUyMGZyZXNofGVufDF8fHx8MTc2ODI5NjEzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Khoai Tây",
    weight: 1,
    unit: "kilogram",
    category: "Củ, Quả",
    rating: 5,
    reviews: 51,
    sold: 634,
    price: 35000,
    originalPrice: 45000,
    discount: 22,
    origin: "Việt Nam",
  },
  {
    id: "18",
    image:
      "https://cdn.tgdd.vn/Files/2020/12/08/1312301/11-cach-lam-nam-kim-cham-xao-thom-ngon-don-gian-tai-nha-202103111931418935.jpg",
    name: "Nấm Kim Châm",
    weight: 200,
    unit: "gram",
    category: "Nấm, Đậu Hủ",
    rating: 5,
    reviews: 24,
    sold: 312,
    price: 35000,
    origin: "Vit Nam",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1612231653032-8a93d1de0834?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2slMjBjaG95JTIwY2hhaSUyMGdyZWVufGVufDF8fHx8MTc2ODI5NjEzNXww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Cải Bắc Thảo",
    weight: 500,
    unit: "gram",
    category: "Rau Ăn Lá",
    rating: 5,
    reviews: 22,
    sold: 298,
    price: 25000,
    origin: "Việt Nam",
  },
  {
    id: "15",
    image:
      "https://images.unsplash.com/photo-1638439938841-0aff3d651f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW1wa2luJTIwb3JhbmdlfGVufDF8fHx8MTc2ODI5NzY3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Bí Đỏ",
    weight: 1,
    unit: "kilogram",
    category: "Củ, Quả",
    rating: 4,
    reviews: 27,
    sold: 278,
    price: 35000,
    origin: "Việt Nam",
  },
  {
    id: "11",
    image:
      "https://vinmec-prod.s3.amazonaws.com/images/20210125_135257_451549_cu-cai.max-1800x1800.jpg",
    name: "Củ Cải Trắng",
    weight: 1,
    unit: "kilogram",
    category: "Củ, Quả",
    rating: 5,
    reviews: 22,
    sold: 189,
    price: 32000,
    origin: "Việt Nam",
  },
  {
    id: "24",
    image:
      "https://images.unsplash.com/photo-1580425183866-9cd697e073e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wZWglMjBmZXJtZW50ZWQlMjBzb3l8ZW58MXx8fHwxNzY4Mjk2NDI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Tempeh",
    weight: 300,
    unit: "gram",
    category: "Nấm, Đậu Hủ",
    rating: 4,
    reviews: 21,
    sold: 156,
    price: 45000,
    origin: "Indonesia",
  },
];

const fruits = [
  // Mixed: Trái Việt Nam, Trái Nhập Khẩu (16 products total, 8 each)
  {
    id: "36",
    image:
      "https://thuyanhfruits.com/wp-content/uploads/2020/11/thanh-long-do.jpg",
    name: "Thanh Long Ruột Đỏ",
    weight: 1,
    unit: "kilogram",
    category: "Trái Việt Nam",
    rating: 5,
    reviews: 48,
    sold: 567,
    price: 35000,
    origin: "Việt Nam",
  },
  {
    id: "45",
    image:
      "https://ngonfruit.com/wp-content/uploads/2021/12/nhung_luu_y_khi_an_cherry_de_khong_anh_huong_den_suc_khoe_0.jpg",
    name: "Cherry Đỏ",
    weight: 500,
    unit: "gram",
    category: "Trái Nhập Khẩu",
    rating: 5,
    reviews: 73,
    sold: 845,
    price: 285000,
    origin: "Mỹ",
  },
  {
    id: "39",
    image:
      "https://images.unsplash.com/photo-1755971103541-402280c3befc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25nYW4lMjBmcnVpdHxlbnwxfHx8fDE3NjgyOTc2ODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Nhãn Lồng",
    weight: 1,
    unit: "kilogram",
    category: "Trái Việt Nam",
    rating: 5,
    reviews: 59,
    sold: 612,
    price: 42000,
    originalPrice: 55000,
    discount: 24,
    origin: "Việt Nam",
  },
  {
    id: "41",
    image:
      "https://images.unsplash.com/photo-1623815242959-fb20354f9b8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBsZSUyMHJlZCUyMGZyZXNofGVufDF8fHx8MTc2ODI4NzI1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Táo Gala",
    weight: 1,
    unit: "kilogram",
    category: "Trái Nhập Khẩu",
    rating: 5,
    reviews: 42,
    sold: 834,
    price: 95000,
    originalPrice: 120000,
    discount: 21,
    origin: "Mỹ",
  },
  {
    id: "33",
    image:
      "https://vnn-imgs-f.vgcloud.vn/2021/07/21/10/cam-sanh-1.jpg",
    name: "Cam Sành",
    weight: 1,
    unit: "kilogram",
    category: "Trái Việt Nam",
    rating: 5,
    reviews: 67,
    sold: 921,
    price: 45000,
    origin: "Việt Nam",
  },
  {
    id: "48",
    image:
      "https://images.unsplash.com/photo-1576076176836-42808565e498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaW1tb24lMjBvcmFuZ2V8ZW58MXx8fHwxNzY4Mjk3Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Hồng Giòn",
    weight: 500,
    unit: "gram",
    category: "Trái Nhập Khẩu",
    rating: 5,
    reviews: 64,
    sold: 723,
    price: 165000,
    origin: "Mỹ",
  },
  {
    id: "37",
    image:
      "https://images.unsplash.com/photo-1634972999688-fbf9d28f2878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmElMjB5ZWxsb3d8ZW58MXx8fHwxNzY4MjMzMDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Chuối Tiêu",
    weight: 1,
    unit: "kilogram",
    category: "Trái Việt Nam",
    rating: 5,
    reviews: 52,
    sold: 678,
    price: 25000,
    origin: "Việt Nam",
  },
  {
    id: "42",
    image:
      "https://images.unsplash.com/photo-1609784431304-8144b5a5f017?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGdyYXBlc3xlbnwxfHx8fDE3NjgyOTc2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Nho Xanh Không Hạt",
    weight: 500,
    unit: "gram",
    category: "Trái Nhập Khẩu",
    rating: 5,
    reviews: 53,
    sold: 678,
    price: 125000,
    origin: "Mỹ",
  },
  {
    id: "35",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.qmyp7qm7zl654MGOcVBz8gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Bưởi Da Xanh",
    weight: 1,
    unit: "kilogram",
    category: "Trái Việt Nam",
    rating: 4,
    reviews: 31,
    sold: 289,
    price: 48000,
    origin: "Việt Nam",
  },
  {
    id: "47",
    image:
      "https://images.unsplash.com/photo-1631641484442-8be117290013?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb21lZ3JhbmF0ZSUyMHJlZHxlbnwxfHx8fDE3NjgyOTc2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Lựu Đỏ",
    weight: 500,
    unit: "gram",
    category: "Trái Nhập Khẩu",
    rating: 5,
    reviews: 51,
    sold: 612,
    price: 145000,
    origin: "Mỹ",
  },
  {
    id: "40",
    image:
      "https://th.bing.com/th/id/R.b4cca8592b422bb44599ef0c26de68c0?rik=bZLervZ1eO6n%2bQ&riu=http%3a%2f%2fwww.vinagreenco.vn%2fdata%2fupload%2fduamoi.png&ehk=TSZTs1LBGSI8qplUeqAU%2bPV1zuYVDLcQc7CERA2PFr0%3d&risl=&pid=ImgRaw&r=0",
    name: "Dừa Xiêm",
    weight: 1,
    unit: "kilogram",
    category: "Trái Việt Nam",
    rating: 5,
    reviews: 44,
    sold: 523,
    price: 28000,
    origin: "Việt Nam",
  },
  {
    id: "44",
    image:
      "https://images.unsplash.com/photo-1699029330848-335e7e2c073f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXdpJTIwZnJ1aXQlMjBzbGljZWR8ZW58MXx8fHwxNzY4Mjk1OTIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Kiwi Vàng",
    weight: 500,
    unit: "gram",
    category: "Trái Nhập Khẩu",
    rating: 5,
    reviews: 44,
    sold: 601,
    price: 135000,
    origin: "Mỹ",
  },
  {
    id: "34",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.Iq9di-k9DcGjeMOup8MgbwHaEe?rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Xoài Cát",
    weight: 1,
    unit: "kilogram",
    category: "Trái Vi�����t Nam",
    rating: 4,
    reviews: 35,
    sold: 456,
    price: 65000,
    originalPrice: 80000,
    discount: 19,
    origin: "Việt Nam",
  },
  {
    id: "38",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.tz0gLbfyRfuuwURFuiSR7gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Khế Ngọt",
    weight: 500,
    unit: "gram",
    category: "Trái Việt Nam",
    rating: 4,
    reviews: 26,
    sold: 298,
    price: 35000,
    origin: "Việt Nam",
  },
];

const seafood = [
  // Mixed: Hải Sản, Thịt Heo, Thịt Bò, Tht Gà Vịt Chim (32 products total, 8 each)
  {
    id: "57",
    image:
      "https://images.unsplash.com/flagged/photo-1568925320772-ce274118d46c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaHJpbXAlMjBzZWFmb29kfGVufDF8fHx8MTc2ODI5NzY4OXww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Khay Tôm Sú",
    weight: 500,
    unit: "gram",
    category: "Hải Sản",
    rating: 5,
    reviews: 89,
    sold: 1234,
    price: 245000,
    originalPrice: 295000,
    discount: 17,
    origin: "Việt Nam",
  },
  {
    id: "68",
    image:
      "https://blog.organicfood.vn/wp-content/uploads/2023/02/5-bi-quyet-lam-thit-ba-chi-heo-ngon-va-dua-com-704x454.jpg",
    name: "Khay Thịt Ba Chỉ Heo",
    weight: 500,
    unit: "gram",
    category: "Thịt Heo",
    rating: 5,
    reviews: 102,
    sold: 1456,
    price: 125000,
    origin: "Việt Nam",
  },
  {
    id: "76",
    image:
      "https://th.bing.com/th/id/R.04dc41adfcf01dcf2223f0f1f65192ba?rik=VOuIhFsnZ6%2b%2b8Q&riu=http%3a%2f%2fcdn.tgdd.vn%2fFiles%2f2021%2f03%2f09%2f1333714%2fnam-bo-la-gi-nhung-mon-an-ngon-tu-thit-nam-bo-202103091106517995.jpg&ehk=A2ngr7N6LAK5rBPbEc%2bvI2knqFcPXABtiYHvJEOLCXE%3d&risl=&pid=ImgRaw&r=0",
    name: "Khay Thịt Bò Nạm",
    weight: 500,
    unit: "gram",
    category: "Thịt Bò",
    rating: 5,
    reviews: 103,
    sold: 967,
    price: 195000,
    origin: "Việt Nam",
  },
  {
    id: "60",
    image:
      "https://images.unsplash.com/photo-1633960413118-d22d9be39641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFtJTIwc2hlbGxmaXNofGVufDF8fHx8MTc2ODI5NzY5MHww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Khay Nghêu Tươi",
    weight: 500,
    unit: "gram",
    category: "Hải Sản",
    rating: 4,
    reviews: 42,
    sold: 567,
    price: 75000,
    origin: "Việt Nam",
  },
  {
    id: "81",
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnJlYXN0JTIwcmF3fGVufDF8fHx8MTc2ODIzMjI2OXww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Khay Ức Gà",
    weight: 500,
    unit: "gram",
    category: "Thịt Gà, Vịt & Chim",
    rating: 5,
    reviews: 124,
    sold: 1678,
    price: 115000,
    originalPrice: 138000,
    discount: 17,
    origin: "Việt Nam",
  },
  {
    id: "59",
    image:
      "https://th.bing.com/th/id/R.01db0a57128c6cfce7023cf1d7043d32?rik=K2DgUQbeQluutA&riu=http%3a%2f%2ffile.hstatic.net%2f1000030244%2farticle%2fphi-le-ca-hoi-lam-mon-gi-1_4ab08c181d25468b9a700a939fe032bf.jpg&ehk=LCVFVKWF7ruXtPqHYNXCoyiQYvVilRn6uN1Nsh8Vhh4%3d&risl=&pid=ImgRaw&r=0",
    name: "Khay Cá Hồi Phi Lê",
    weight: 500,
    unit: "gram",
    category: "Hải Sản",
    rating: 5,
    reviews: 67,
    sold: 892,
    price: 195000,
    origin: "Việt Nam",
  },
  {
    id: "71",
    image:
      "https://th.bing.com/th/id/OIP.201oL4xB4vCUyAci5KhItgHaEc?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Khay Sườn Non Heo",
    weight: 500,
    unit: "gram",
    category: "Thịt Heo",
    rating: 5,
    reviews: 87,
    sold: 923,
    price: 145000,
    origin: "Việt Nam",
  },
  {
    id: "79",
    image:
      "https://tse1.explicit.bing.net/th/id/OIP.lS_HD79SmBNe4TnJ00ADGwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Khay Thịt Bò Xay",
    weight: 500,
    unit: "gram",
    category: "Thịt Bò",
    rating: 5,
    reviews: 89,
    sold: 1134,
    price: 165000,
    origin: "Việt Nam",
  },

  {
    id: "58",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.pd4EPWL1zNEcMibHAtt67wHaE-?rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Khay Mực Tươi",
    weight: 500,
    unit: "gram",
    category: "Hải Sản",
    rating: 5,
    reviews: 53,
    sold: 723,
    price: 165000,
    origin: "Việt Nam",
  },
  {
    id: "66",
    image:
      "https://thucphamvanquy.com/wp-content/uploads/2022/05/nac-dui-heo-2.jpg",
    name: "Khay Thịt Heo Nạc Đùi",
    weight: 500,
    unit: "gram",
    category: "Thịt Heo",
    rating: 5,
    reviews: 76,
    sold: 1089,
    price: 135000,
    origin: "Việt Nam",
  },
  {
    id: "74",
    image:
      "https://phamgiafood.com.vn/wp-content/uploads/2017/07/topside.jpg",
    name: "Khay Thịt Bò Nạc Đùi",
    weight: 500,
    unit: "gram",
    category: "Thịt Bò",
    rating: 5,
    reviews: 98,
    sold: 1234,
    price: 225000,
    origin: "Việt Nam",
  },
  {
    id: "82",
    image:
      "https://cdn.tgdd.vn/Files/2017/05/20/984099/canh-ga-sot-chanh-day-an-la-ngat-ngay.jpg",
    name: "Khay Cánh Gà",
    weight: 500,
    unit: "gram",
    category: "Thịt Gà, Vịt & Chim",
    rating: 5,
    reviews: 156,
    sold: 1923,
    price: 85000,
    origin: "Việt Nam",
  },
  {
    id: "63",
    image:
      "https://images.unsplash.com/photo-1554071407-1fb7259a9118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNrZXJlbCUyMGZpc2h8ZW58MXx8fHwxNzY4MjQzODc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Khay Cá Thu",
    weight: 500,
    unit: "gram",
    category: "Hải Sản",
    rating: 4,
    reviews: 38,
    sold: 512,
    price: 125000,
    originalPrice: 155000,
    discount: 19,
    origin: "Việt Nam",
  },
  {
    id: "69",
    image:
      "https://content.pancake.vn/1/s1950x3380/fwebp/02/d3/6a/c0/43d0ddb806013fce26777a5ef2d817eaec7b46a108af4968c2f27c09-w:1000-h:1000-l:549588-t:image/png.png",
    name: "Khay Thịt Mông Heo",
    weight: 500,
    unit: "gram",
    category: "Thịt Heo",
    rating: 4,
    reviews: 68,
    sold: 867,
    price: 125000,
    origin: "Việt Nam",
  },

  {
    id: "61",
    image:
      "https://images.unsplash.com/photo-1650081486942-818b77296bde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFiJTIwc2VhZm9vZHxlbnwxfHx8fDE3NjgyMzU3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Khay Cua Biển",
    weight: 500,
    unit: "gram",
    category: "Hải Sản",
    rating: 5,
    reviews: 76,
    sold: 934,
    price: 185000,
    origin: "Việt Nam",
  },
  {
    id: "70",
    image:
      "https://nguyenkhoifarm.com/wp-content/uploads/2020/04/Nac-vai-1024x1024.jpg",
    name: "Khay Thịt Heo Nạc Vai",
    weight: 500,
    unit: "gram",
    category: "Thịt Heo",
    rating: 5,
    reviews: 92,
    sold: 1167,
    price: 128000,
    originalPrice: 148000,
    discount: 14,
    origin: "Việt Nam",
  },
  {
    id: "87",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.-AW-UzeMkvZJ9l_ixYI47gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Khay Gà Ta Nguyên Con",
    weight: 1,
    unit: "kilogram",
    category: "Thịt Gà, Vịt & Chim",
    rating: 5,
    reviews: 96,
    sold: 767,
    price: 145000,
    origin: "Việt Nam",
  },
  {
    id: "62",
    image:
      "https://th.bing.com/th/id/OIP.wPIWaKScBM6Bh4fyFyfKIgHaFj?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Khay Sò Điệp",
    weight: 500,
    unit: "gram",
    category: "Hải Sản",
    rating: 5,
    reviews: 59,
    sold: 678,
    price: 145000,
    originalPrice: 175000,
    discount: 17,
    origin: "Việt Nam",
  },
  {
    id: "67",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.KtMs0eRk080c7TibcvgS8gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Khay Thịt Heo Xay",
    weight: 500,
    unit: "gram",
    category: "Thịt Heo",
    rating: 5,
    reviews: 81,
    sold: 1345,
    price: 95000,
    origin: "Việt Nam",
  },
  {
    id: "80",
    image:
      "https://cdn.tgdd.vn/Files/2021/04/03/1340438/bap-bo-la-gi-phan-biet-bap-truoc-bap-sau-cac-mon-an-ngon-tu-bap-bo-202104031701037640.jpg",
    name: "Khay Bắp Bò",
    weight: 500,
    unit: "gram",
    category: "Thịt Bò",
    rating: 5,
    reviews: 92,
    sold: 1056,
    price: 195000,
    origin: "Việt Nam",
  },
  {
    id: "88",
    image:
      "https://th.bing.com/th/id/R.ef3d0a9b807b2946a99b6ac277892915?rik=CbwU81EcrWu8HQ&pid=ImgRaw&r=0",
    name: "Khay Đùi Gà",
    weight: 500,
    unit: "gram",
    category: "Thịt Gà, Vịt & Chim",
    rating: 5,
    reviews: 189,
    sold: 2234,
    price: 95000,
    originalPrice: 115000,
    discount: 17,
    origin: "Việt Nam",
  },
  {
    id: "64",
    image:
      "https://cdn.lottemart.vn/media/catalog/product/cache/0x0/2/0/2089720000000-1.jpg.webp",
    name: "Khay Cá Ngừ Phi Lê",
    weight: 500,
    unit: "gram",
    category: "Hải Sản",
    rating: 5,
    reviews: 84,
    sold: 1012,
    price: 175000,
    origin: "Việt Nam",
  },
  {
    id: "72",
    image:
      "https://www.thucphamsachhd.com/uploads/files/2023/06/19/thumbs-1024-768-0/HTBN0006-PD01603-WEB_Than-Lung-Heo-Tay-Ban-Nha.png",
    name: "Khay Thăn Lưng Heo",
    weight: 500,
    unit: "gram",
    category: "Thịt Heo",
    rating: 5,
    reviews: 95,
    sold: 1278,
    price: 155000,
    origin: "Việt Nam",
  },
  {
    id: "83",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.4-C4DiJQZ1PYTrH1ra-szAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Khay Vịt Nguyên Con",
    weight: 1,
    unit: "kilogram",
    category: "Thịt Gà, Vịt & Chim",
    rating: 4,
    reviews: 73,
    sold: 656,
    price: 125000,
    origin: "Việt Nam",
  },
];

const dryFood = [
  // Mixed: Trái Cây Sấy, Khô Chế Biến Sẵn (16 products total, 8 each)
  {
    id: "89",
    image:
      "https://th.bing.com/th/id/R.00193f1a676ec45fe1f9c94993d01f76?rik=8SAnWG9qWionUA&pid=ImgRaw&r=0",
    name: "Xoài Sấy",
    weight: 200,
    unit: "gram",
    category: "Trái Cây Sấy",
    rating: 5,
    reviews: 87,
    sold: 923,
    price: 65000,
    origin: "Việt Nam",
  },
  {
    id: "97",
    image:
      "https://haisanbay.com/wp-content/uploads/2019/09/70205489_521780115224624_711559747463020544_n.jpg",
    name: "Mực Khô",
    weight: 250,
    unit: "gram",
    category: "Khô Chế Biến Sẵn",
    rating: 5,
    reviews: 102,
    sold: 1234,
    price: 185000,
    origin: "Việt Nam",
  },
  {
    id: "90",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.oMhH4ILMK909pCmEqS033gAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Chuối Sấy",
    weight: 150,
    unit: "gram",
    category: "Trái Cây Sấy",
    rating: 5,
    reviews: 124,
    sold: 1456,
    price: 45000,
    originalPrice: 55000,
    discount: 18,
    origin: "Việt Nam",
  },
  {
    id: "98",
    image:
      "https://images.unsplash.com/photo-1609811159712-4194d9eb793d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMHNocmltcCUyMHNlYWZvb2R8ZW58MXx8fHwxNzY4MzcxODY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "Tôm Khô",
    weight: 200,
    unit: "gram",
    category: "Khô Chế Biến Sẵn",
    rating: 5,
    reviews: 98,
    sold: 1123,
    price: 195000,
    originalPrice: 225000,
    discount: 13,
    origin: "Việt Nam",
  },
  {
    id: "91",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.-RwjrMMNKDqhLa1W5qsjHwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Nho Khô",
    weight: 250,
    unit: "gram",
    category: "Trái Cây Sấy",
    rating: 5,
    reviews: 156,
    sold: 1823,
    price: 85000,
    origin: "Mỹ",
  },
  {
    id: "99",
    image:
      "https://dacsanmuicamau.com/static/product/2021/1118/kho-ca-dua-0-799_thumb_500x0.jpg",
    name: "Khô Cá Dứa",
    weight: 300,
    unit: "gram",
    category: "Khô Chế Biến Sẵn",
    rating: 4,
    reviews: 76,
    sold: 845,
    price: 145000,
    origin: "Việt Nam",
  },
  {
    id: "92",
    image:
      "https://th.bing.com/th/id/OIP.lnz8Y71wUvia2nih8cBJIAHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Mơ Sấy",
    weight: 200,
    unit: "gram",
    category: "Trái Cây Sấy",
    rating: 5,
    reviews: 89,
    sold: 967,
    price: 95000,
    origin: "Thổ Nhĩ Kỳ",
  },
  {
    id: "100",
    image:
      "https://tiemphonui.com/cdn/shop/articles/cach-lam-bo-kho.webp?v=1693802347",
    name: "Bò Khô",
    weight: 200,
    unit: "gram",
    category: "Khô Chế Biến Sẵn",
    rating: 5,
    reviews: 234,
    sold: 2456,
    price: 165000,
    originalPrice: 195000,
    discount: 15,
    origin: "Việt Nam",
  },
  {
    id: "93",
    image:
      "https://luonggiacompany.com/wp-content/uploads/2020/09/cong-dung-cua-dua-say-gion.jpg",
    name: "Dừa Sấy",
    weight: 150,
    unit: "gram",
    category: "Trái Cây Sấy",
    rating: 4,
    reviews: 67,
    sold: 678,
    price: 55000,
    origin: "Việt Nam",
  },
  {
    id: "101",
    image:
      "https://cdn.tgdd.vn/2021/09/CookProduct/Thietkekhongten-1200x676-1.jpg",
    name: "Thịt Heo Khô",
    weight: 200,
    unit: "gram",
    category: "Khô Chế Biến Sẵn",
    rating: 5,
    reviews: 189,
    sold: 1923,
    price: 145000,
    origin: "Việt Nam",
  },
  {
    id: "94",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.UanJYHHYKH_7d8CKmiE4EwHaEo?rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Dứa Sấy",
    weight: 150,
    unit: "gram",
    category: "Trái Cây Sấy",
    rating: 5,
    reviews: 112,
    sold: 1234,
    price: 58000,
    origin: "Việt Nam",
  },
  {
    id: "102",
    image:
      "https://th.bing.com/th/id/OIP.eLKR6h9lixKMmKYtBGvIbwHaFj?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    name: "Cá Cơm Khô",
    weight: 200,
    unit: "gram",
    category: "Khô Chế Biến Sẵn",
    rating: 4,
    reviews: 92,
    sold: 1056,
    price: 125000,
    origin: "Việt Nam",
  },
  {
    id: "95",
    image:
      "https://originvn.com/wp-content/uploads/2022/12/MG_9220-scaled.jpg",
    name: "Táo Sấy",
    weight: 150,
    unit: "gram",
    category: "Trái Cây Sấy",
    rating: 4,
    reviews: 78,
    sold: 834,
    price: 75000,
    originalPrice: 92000,
    discount: 18,
    origin: "Mỹ",
  },
  {
    id: "103",
    image:
      "https://onggiau.com.vn/wp-content/uploads/2024/07/1-6.png",
    name: "Sò Điệp Khô",
    weight: 150,
    unit: "gram",
    category: "Khô Chế Biến Sẵn",
    rating: 5,
    reviews: 145,
    sold: 1567,
    price: 215000,
    origin: "Việt Nam",
  },
  {
    id: "96",
    image:
      "https://www.lorca.vn/wp-content/uploads/2022/05/may-say-kho-hoa-qua-mit-say.jpg",
    name: "Mít Sấy",
    weight: 150,
    unit: "gram",
    category: "Trái Cây Sấy",
    rating: 5,
    reviews: 94,
    sold: 989,
    price: 68000,
    origin: "Việt Nam",
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  // Load user from localStorage
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; role?: string } | null>(() => {
    const savedUser = localStorage.getItem("freshmarket_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Load cart from localStorage or use empty array
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("freshmarket_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("freshmarket_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("freshmarket_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("freshmarket_user");
    }
  }, [currentUser]);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory("");
    setCurrentPage("products");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNavigate = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setCurrentPage("products");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (user: { email: string; name: string; role?: string }) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCartItems([]); // Clear cart when logout
    localStorage.removeItem("freshmarket_user"); // Remove user from localStorage
    setCurrentPage("home");
  };

  const handleAddToCart = (product: {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    weight?: number;
    unit?: string;
    origin?: string;
  }) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    
    if (existingItem) {
      setCartItems((items) =>
        items.map((item) =>
          item.id === product.id
            ? { 
                ...item, 
                quantity: item.quantity + 1,
                // Update originalPrice and discount if they exist in the new product data
                originalPrice: product.originalPrice,
                discount: product.discount,
              }
            : item
        )
      );
      setToastMessage(`Đã cập nhật số lượng "${product.name}" trong giỏ hàng!`);
    } else {
      setCartItems((items) => [
        ...items,
        {
          ...product,
          quantity: 1,
        },
      ]);
      setToastMessage(`Đã thêm "${product.name}" vào giỏ hàng!`);
    }
    
    setShowToast(true);
  };

  const handleLoginRequired = () => {
    setShowLoginAlert(true);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage !== "admin-dashboard" && currentPage !== "product-catalog" && currentPage !== "batch-management" && currentPage !== "order-management" && currentPage !== "login" && currentPage !== "register" && (
        <Header 
          onPageChange={handlePageChange} 
          currentPage={currentPage}
          onCategoryNavigate={handleCategoryNavigate}
          currentUser={currentUser}
          onLogout={handleLogout}
          cartItemCount={cartItems.length}
        />
      )}

      <main>
        {currentPage === "home" && (
          <>
            <Hero 
              image="https://images.unsplash.com/photo-1751200270667-cb13feeac24c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yZ2FuaWMlMjBncm9jZXJ5JTIwbWFya2V0JTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NjgzMTU0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              onSearch={handleSearch}
            />

            <ProductSection
              title="Rau, Củ & Nấm"
              categories={["Rau Ăn Lá", "Củ, Quả", "Nấm, Đậu Hủ"]}
              products={vegetables}
              onAddToCart={handleAddToCart}
              currentUser={currentUser}
              onLoginRequired={handleLoginRequired}
            />

            <ProductSection
              title="Trái Cây Tươi Ngon"
              categories={["Trái Việt Nam", "Trái Nhập Khẩu"]}
              products={fruits}
              onAddToCart={handleAddToCart}
              currentUser={currentUser}
              onLoginRequired={handleLoginRequired}
            />

            <ProductSection
              title="Thịt, Cá, Trứng & Hải Sản"
              categories={[
                "Hải Sản",
                "Thịt Heo",
                "Thịt Bò",
                "Thịt Gà, Vịt & Chim",
              ]}
              products={seafood}
              onAddToCart={handleAddToCart}
              currentUser={currentUser}
              onLoginRequired={handleLoginRequired}
            />

            <ProductSection
              title="Thực Phẩm Khô"
              categories={["Trái Cây Sấy", "Khô Chế Biến Sẵn"]}
              products={dryFood}
              onAddToCart={handleAddToCart}
              currentUser={currentUser}
              onLoginRequired={handleLoginRequired}
            />
          </>
        )}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "news" && <NewsPage />}
        {currentPage === "contact" && <ContactPage />}
        {currentPage === "login" && <LoginPage onPageChange={handlePageChange} onLoginSuccess={handleLoginSuccess} />}
        {currentPage === "register" && <RegisterPage onPageChange={handlePageChange} />}
        {currentPage === "products" && (
          <ProductsPage 
            onPageChange={handlePageChange}
            vegetables={vegetables}
            fruits={fruits}
            seafood={seafood}
            dryFood={dryFood}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onAddToCart={handleAddToCart}
            currentUser={currentUser}
            onLoginRequired={handleLoginRequired}
          />
        )}
        {currentPage === "privacy" && <PrivacyPolicyPage />}
        {currentPage === "terms" && <TermsPage />}
        {currentPage === "return" && <ReturnPolicyPage onPageChange={handlePageChange} />}
        {currentPage === "guide" && <ShoppingGuidePage />}
        {currentPage === "refund" && <RefundRequestPage onPageChange={handlePageChange} />}
        {currentPage === "cart" && <CartPage 
          onPageChange={handlePageChange}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          currentUser={currentUser}
        />}
        {currentPage === "orders" && <OrdersPage 
          onPageChange={handlePageChange}
          currentUser={currentUser}
        />}
        {currentPage === "admin-dashboard" && <AdminDashboard 
          onPageChange={handlePageChange}
          currentUser={currentUser}
          onLogout={handleLogout}
        />}
        {currentPage === "product-catalog" && <ProductCatalog 
          onPageChange={handlePageChange}
          currentUser={currentUser}
          onLogout={handleLogout}
        />}
        {currentPage === "batch-management" && <BatchManagement 
          onPageChange={handlePageChange}
          currentUser={currentUser}
          onLogout={handleLogout}
        />}
        {currentPage === "order-management" && <OrderManagement 
          onPageChange={handlePageChange}
          currentUser={currentUser}
          onLogout={handleLogout}
        />}
      </main>

      {currentPage !== "admin-dashboard" && currentPage !== "product-catalog" && currentPage !== "batch-management" && currentPage !== "order-management" && (
        <Footer 
          onPageChange={handlePageChange} 
          onCategoryNavigate={handleCategoryNavigate}
        />
      )}

      {/* Live Chat Widget */}
      {currentPage !== "admin-dashboard" && currentPage !== "product-catalog" && currentPage !== "batch-management" && currentPage !== "order-management" && <LiveChat />}

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Login Alert Modal */}
      {showLoginAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center bg-yellow-100 rounded-full p-4 mb-4">
                <ShoppingCart className="w-12 h-12 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Yêu Cầu Đăng Nhập
              </h2>
              <p className="text-gray-600 mb-6">
                Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng. Vui lòng đăng nhập hoặc tạo tài khoản mới.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowLoginAlert(false);
                    handlePageChange("login");
                  }}
                  className="flex-1 bg-[#75b06f] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#5a9450] transition-colors"
                >
                  Đăng Nhập
                </button>
                <button
                  onClick={() => setShowLoginAlert(false)}
                  className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}