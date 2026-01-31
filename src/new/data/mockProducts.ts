export interface Product {
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

export const MOCK_PRODUCTS: Product[] = [
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
  },
  {
    product_id: "P003",
    sub_category_id: "SC001",
    product_name: "Tôm Sú Tươi",
    description: "Tôm sú tươi sống, size lớn, nuôi tự nhiên",
    manufacturing_location: "Việt Nam",
    price_sell: 280000,
    quantity: 40,
    weight: 0.5,
    unit: "kg",
    status: 'active',
  },
  {
    product_id: "P004",
    sub_category_id: "SC003",
    product_name: "Xà Lách Tươi",
    description: "Xà Lách tươi, giòn, sạch, trồng theo phương pháp hữu cơ",
    manufacturing_location: "Đà Lạt",
    price_sell: 28000,
    quantity: 100,
    weight: 0.2,
    unit: "kg",
    status: 'active',
  },
  {
    product_id: "P005",
    sub_category_id: "SC003",
    product_name: "Cà Chua Bi",
    description: "Cà chua bi ngọt, tươi, màu đỏ tự nhiên",
    manufacturing_location: "Lâm Đồng",
    price_sell: 45000,
    quantity: 80,
    weight: 0.3,
    unit: "kg",
    status: 'active',
  },
  {
    product_id: "P006",
    sub_category_id: "SC004",
    product_name: "Bơ Booth",
    description: "Bơ Booth nhập khẩu từ Úc, béo ngậy, thơm ngon",
    manufacturing_location: "Úc",
    price_sell: 89000,
    quantity: 60,
    weight: 0.2,
    unit: "kg",
    status: 'active',
  },
  {
    product_id: "P007",
    sub_category_id: "SC004",
    product_name: "Dâu Tây Đà Lạt",
    description: "Dâu tây Đà Lạt tươi, ngọt, hương thơm tự nhiên",
    manufacturing_location: "Đà Lạt",
    price_sell: 120000,
    quantity: 50,
    weight: 0.25,
    unit: "kg",
    status: 'active',
  },
  {
    product_id: "P008",
    sub_category_id: "SC002",
    product_name: "Thịt Heo Ba Chỉ",
    description: "Thịt heo ba chỉ tươi, thịt dai ngon, có lớp mỡ vừa phải",
    manufacturing_location: "Việt Nam",
    price_sell: 95000,
    quantity: 70,
    weight: 0.5,
    unit: "kg",
    status: 'active',
  },
  {
    product_id: "P009",
    sub_category_id: "SC002",
    product_name: "Sườn Heo Non",
    description: "Sườn heo non tươi, thịt mềm, ngọt tự nhiên",
    manufacturing_location: "Việt Nam",
    price_sell: 110000,
    quantity: 55,
    weight: 0.5,
    unit: "kg",
    status: 'active',
  },
  {
    product_id: "P010",
    sub_category_id: "SC001",
    product_name: "Mực Ống Tươi",
    description: "Mực ống tươi, thịt săn chắc, ngọt tự nhiên",
    manufacturing_location: "Việt Nam",
    price_sell: 180000,
    quantity: 35,
    weight: 0.5,
    unit: "kg",
    status: 'active',
  },
];
