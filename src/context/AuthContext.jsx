import { createContext, useContext, useState, useEffect } from 'react'
import * as authApi from '../api/authApi'

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

  // Load user from localStorage on mount
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
      }
    } else {
        localStorage.removeItem('freshmarket_user')
        localStorage.removeItem('authToken')
    }
    setIsLoading(false)
  }, [])

  const login = async (phone, password) => {
    try {
        const response = await authApi.login({ phone, password });
        // Expected response is the deserialized DTO (ApiResponse<AuthenticationToken>)
        // Usually, Axios intercepts to response.data natively if configured, 
        // which gives us an object with `data`, `message`, `success`
        
        if (response.success && response.data) {
            const { token, role, username } = response.data;
            const roleString = getRoleString(role);
            
            const user = {
                username: username,
                phone: phone,
                role: roleString
            };
            
            // Save to state and storage
            setCurrentUser(user);
            localStorage.setItem('freshmarket_user', JSON.stringify(user));
            localStorage.setItem('authToken', token);
            
            return { success: true, user };
        } else {
            return { success: false, error: response.message || 'Login failed' };
        }
    } catch (error) {
        return { success: false, error: error.message || 'Network error' };
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('freshmarket_user')
    localStorage.removeItem('authToken')
    localStorage.removeItem('freshmarket_cart') // Clear cart on logout
  }

  const value = {
    currentUser,
    isLoading,
    login,
    logout,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === 'admin',
    isSupplier: currentUser?.role === 'supplier',
    isCustomer: currentUser?.role === 'customer',
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
