import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import Home from '@pages/Home/Home'
import Login from '@pages/Auth/Login'
import Register from '@pages/Auth/Register'
import CartPage from '@pages/Cart/CartPage'
import ProductsPage from '@pages/Products/ProductsPage'
import FruitsPage from '@pages/Fruits/FruitsPage'
import VegetablesPage from '@pages/Vegetables/VegetablesPage'
import SeafoodMeatPage from '@pages/SeafoodMeat/SeafoodMeatPage'
import DryFoodPage from '@pages/DryFood/DryFoodPage'
import AboutPage from '@pages/About/AboutPage'
import ContactPage from '@pages/Contact/ContactPage'
import NewsPage from '@pages/News/NewsPage'
import OrdersPage from '@pages/Orders/OrdersPage'
import TermsPage from '@pages/Terms/TermsPage'
import PrivacyPolicyPage from '@pages/Privacy/PrivacyPolicyPage'
import ShoppingGuidePage from '@pages/ShoppingGuide/ShoppingGuidePage'
import ReturnPolicyPage from '@pages/ReturnPolicy/ReturnPolicyPage'
import AdminDashboard from '@pages/Admin/AdminDashboard'
import SupplierDashboard from '@pages/Supplier/SupplierDashboard'
import ScrollToTop from '@/components/common/ScrollToTop'
import './styles/index.css'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/fruits" element={<FruitsPage />} />
            <Route path="/vegetables" element={<VegetablesPage />} />
            <Route path="/seafood-meat" element={<SeafoodMeatPage />} />
            <Route path="/dry-food" element={<DryFoodPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/chinh-sach-bao-mat" element={<PrivacyPolicyPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/shopping-guide" element={<ShoppingGuidePage />} />
            <Route path="/return-policy" element={<ReturnPolicyPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/supplier" element={<SupplierDashboard />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App

