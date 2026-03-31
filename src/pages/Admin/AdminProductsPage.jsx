import ProtectedRoute from '@/components/common/ProtectedRoute/ProtectedRoute'
import { ProductManagementView } from './AdminDashboard'

// Trang riêng chỉ hiển thị phần Quản Lý Sản Phẩm (không sidebar)
export default function AdminProductsPage() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div
        style={{
          minHeight: '100vh',
          background: '#f8fafc',
          padding: '28px 32px',
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
        }}
      >
        <ProductManagementView />
      </div>
    </ProtectedRoute>
  )
}
