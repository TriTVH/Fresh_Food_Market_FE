import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

/**
 * Bảo vệ route theo đăng nhập và role.
 * @param {React.ReactNode} children - Nội dung render khi được phép
 * @param {string[]} allowedRoles - Các role được phép (admin, customer, supplier, staff). Để [] hoặc null = chỉ cần đăng nhập
 */
function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, isLoading, role } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#75b06f]" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const hasRole = allowedRoles.length === 0 || (role && allowedRoles.includes(role))
  if (!hasRole) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
