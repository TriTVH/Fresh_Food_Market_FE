import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import Home from '@pages/Home/Home'
import Login from '@pages/Auth/Login'
import Register from '@pages/Auth/Register'
import CartPage from '@pages/Cart/CartPage'
import CheckoutPage from '@pages/Checkout/CheckoutPage'
import ProductsPage from '@pages/Products/ProductsPage'
import ProductDetailPage from '@pages/ProductDetail/ProductDetailPage'
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
import PaymentSuccessPage from '@pages/Payment/PaymentSuccessPage'
import PaymentFailurePage from '@pages/Payment/PaymentFailurePage'
import PaymentPendingPage from '@pages/Payment/PaymentPendingPage'
import AdminDashboard from '@pages/Admin/AdminDashboard'
import AdminProductsPage from '@pages/Admin/AdminProductsPage'
import SupplierDashboard from '@pages/Supplier/SupplierDashboard'
import ProfilePage from '@pages/Profile/ProfilePage'
import ScrollToTop from '@/components/common/ScrollToTop'
import ProtectedRoute from '@/components/common/ProtectedRoute/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles/index.css'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable theme="light" />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute allowedRoles={['customer', 'admin', 'supplier', 'staff']}>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment/success" element={<PaymentSuccessPage />} />
            <Route path="/payment/failure" element={<PaymentFailurePage />} />
            <Route path="/payment/pending" element={<PaymentPendingPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/fruits" element={<FruitsPage />} />
            <Route path="/vegetables" element={<VegetablesPage />} />
            <Route path="/seafood-meat" element={<SeafoodMeatPage />} />
            <Route path="/dry-food" element={<DryFoodPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/chinh-sach-bao-mat" element={<PrivacyPolicyPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/shopping-guide" element={<ShoppingGuidePage />} />
            <Route path="/return-policy" element={<ReturnPolicyPage />} />
<<<<<<< HEAD
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/supplier" element={<SupplierDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
=======
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard initialActiveNav="Dashboard" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/batch"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard initialActiveNav="Quản Lý Lô Hàng" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard initialActiveNav="Quản Lý Đơn Hàng" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard initialActiveNav="Quản Lý Sản Phẩm" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/voucher"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard initialActiveNav="Quản Lý Voucher" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/supplier"
              element={
                <ProtectedRoute allowedRoles={['supplier']}>
                  <SupplierDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute allowedRoles={['customer', 'admin', 'supplier', 'staff']}>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
>>>>>>> tri
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App

