import { createContext, useContext, useState, useEffect } from 'react'
import * as authApi from '../api/authApi'
<<<<<<< HEAD
=======

>>>>>>> tri

const AuthContext = createContext(null)

// Role mapping based on BE setup (Assuming 1: Admin, 2: Customer, 3: Supplier)
const getRoleString = (roleId) => {
  if (roleId === 1) return 'admin';
  if (roleId === 3) return 'supplier';
  return 'customer'; // Default to customer
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('freshmarket_user')
    const token = localStorage.getItem('authToken')
    if (savedUser && token) {
      try {
        setCurrentUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Failed to parse saved user:', error)
        localStorage.removeItem('freshmarket_user')
        localStorage.removeItem('authToken')
<<<<<<< HEAD
=======
        localStorage.removeItem('refreshToken')
>>>>>>> tri
      }
    } else {
        localStorage.removeItem('freshmarket_user')
        localStorage.removeItem('authToken')
<<<<<<< HEAD
=======
        localStorage.removeItem('refreshToken')
>>>>>>> tri
    }
    setIsLoading(false)
  }, [])

  const login = async (phone, password) => {
    try {
        const response = await authApi.login({ phone, password });
        // Expected response is the deserialized DTO (ApiResponse<AuthenticationToken>)
        // Usually, Axios intercepts to response.data natively if configured, 
        // which gives us an object with `data`, `message`, `success`
        
<<<<<<< HEAD
        if (response.success && response.data) {
            const { token, role, username } = response.data;
=======
        const ok = response.success ?? response.Success
        const payload = response.data ?? response.Data
        if (ok && payload) {
            const token =
              payload.token ??
              payload.accessToken ??
              payload.access_token ??
              payload.Token ??
              payload.AccessToken
            const refreshToken =
              payload.refreshToken ??
              payload.refresh_token ??
              payload.RefreshToken
            const role = payload.role ?? payload.Role
            const username = payload.username ?? payload.Username ?? payload.userName

>>>>>>> tri
            const roleString = getRoleString(role);
            
            const user = {
                username: username,
                phone: phone,
                role: roleString
            };
            
<<<<<<< HEAD
            // Save to state and storage
            setCurrentUser(user);
            localStorage.setItem('freshmarket_user', JSON.stringify(user));
            localStorage.setItem('authToken', token);
            
            return { success: true, user };
        } else {
            return { success: false, error: response.message || 'Login failed' };
=======
            if (!token) {
              return { success: false, error: response.message || response.Message || 'Login failed' };
            }

            setCurrentUser(user);
            localStorage.setItem('freshmarket_user', JSON.stringify(user));
            localStorage.setItem('authToken', token);
            if (refreshToken) localStorage.setItem('refreshToken', refreshToken);

            return { success: true, user };
        } else {
            return { success: false, error: response.message || response.Message || 'Login failed' };
>>>>>>> tri
        }
    } catch (error) {
        return { success: false, error: error.message || 'Network error' };
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('freshmarket_user')
<<<<<<< HEAD
    localStorage.removeItem('authToken')
=======

    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
>>>>>>> tri
    localStorage.removeItem('freshmarket_cart') // Clear cart on logout

  }

  const value = {
    currentUser,
    isLoading,
    login,
    logout,
    isAuthenticated: !!currentUser,
    roleId: currentUser?.roleId ?? null,
    role: currentUser?.role ?? null,
    isAdmin: currentUser?.role === 'admin',
    isSupplier: currentUser?.role === 'supplier',
    isCustomer: currentUser?.role === 'customer',
    isStaff: currentUser?.role === 'staff',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
