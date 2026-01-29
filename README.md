# Fresh Market - E-Commerce Website

> **Ăn Sạch Sống Khỏe** - Cung cấp thực phẩm tươi sống, sạch và an toàn

## 📋 Giới thiệu

Fresh Market là một website e-commerce chuyên cung cấp các sản phẩm thực phẩm tươi sống bao gồm rau củ, trái cây, thịt cá, hải sản và các thực phẩm khô. Website được thiết kế với giao diện hiện đại, thân thiện với người dùng và tối ưu cho trải nghiệm mua sắm trực tuyến.

## 🚀 Công nghệ sử dụng

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Icons**: React Icons

## 📦 Cài đặt

### Yêu cầu hệ thống
- Node.js >= 18.0.0
- npm hoặc yarn

### Các bước cài đặt

1. **Clone repository**
```bash
git clone <repository-url>
cd fresh-market
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Tạo file environment**
```bash
cp .env.example .env.local
```
Sau đó cập nhật các biến môi trường trong file `.env.local`

4. **Chạy development server**
```bash
npm run dev
```

Website sẽ chạy tại `http://localhost:3000`

## 📜 Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run lint` - Chạy ESLint

## 📁 Cấu trúc thư mục

```
fresh-market/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, icons
│   ├── components/     # React components
│   │   ├── common/    # Reusable components
│   │   ├── layout/    # Layout components
│   │   ├── product/   # Product-related components
│   │   ├── cart/      # Cart components
│   │   └── home/      # Home page components
│   ├── pages/         # Page components
│   ├── context/       # React Context providers
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services
│   ├── utils/         # Utility functions
│   ├── styles/        # Global styles
│   └── routes/        # Route configuration
├── .env.example       # Environment variables template
├── vite.config.js     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── package.json       # Dependencies
```

## 🎨 Design System

### Màu sắc chính
- **Primary (Green)**: Màu chủ đạo cho brand, buttons, links
- **Secondary (Red)**: Màu phụ cho CTAs, badges, discounts

### Typography
- **Font chính**: Inter (body text)
- **Font display**: Outfit (headings)

### Components
- Buttons: `.btn-primary`, `.btn-secondary`, `.btn-outline`
- Inputs: `.input-field`
- Cards: `.card`
- Badges: `.badge`, `.badge-discount`, `.badge-organic`

## 🔧 Path Aliases

Project sử dụng path aliases để import dễ dàng hơn:

```javascript
import Button from '@components/common/Button'
import { useCart } from '@hooks/useCart'
import { api } from '@services/api'
```

Available aliases:
- `@` → `./src`
- `@components` → `./src/components`
- `@pages` → `./src/pages`
- `@assets` → `./src/assets`
- `@services` → `./src/services`
- `@utils` → `./src/utils`
- `@hooks` → `./src/hooks`
- `@context` → `./src/context`
- `@styles` → `./src/styles`

## 📝 Quy tắc Code

- Sử dụng functional components và React Hooks
- Tuân thủ ESLint rules
- Format code với Prettier
- Component names sử dụng PascalCase
- File names sử dụng PascalCase cho components
- Sử dụng named exports cho utilities, default export cho components

## 🌟 Tính năng chính

- [ ] Trang chủ với hero section và product showcase
- [ ] Danh sách sản phẩm với filter và search
- [ ] Chi tiết sản phẩm
- [ ] Giỏ hàng
- [ ] Đăng nhập / Đăng ký
- [ ] Checkout và thanh toán
- [ ] Quản lý đơn hàng
- [ ] Responsive design

## 📄 License

MIT

## 👥 Contributors

- Your Name - Initial work

---

**Happy Coding! 🚀**
