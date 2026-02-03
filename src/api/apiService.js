// ==================== API SERVICE TEMPLATE ====================
// TODO: Update YOUR_API_BASE_URL with your actual API endpoint
// Example: const API_BASE_URL = 'http://localhost:8080' or 'https://api.freshmarket.com'

const API_BASE_URL = 'YOUR_API_BASE_URL'

// ==================== PRODUCT API ====================

/**
 * Fetch all products with optional filters
 * @param {Object} params - Query parameters
 * @param {string} params.category - Category filter (vegetables, fruits, meatSeafood, driedFood)
 * @param {string} params.subcategory - Subcategory filter
 * @param {number} params.page - Page number for pagination
 * @param {number} params.limit - Items per page
 * @param {number} params.minPrice - Minimum price filter
 * @param {number} params.maxPrice - Maximum price filter
 * @param {string} params.search - Search query
 * @returns {Promise<Object>} Products data
 */
export const fetchProducts = async (params = {}) => {
    try {
        const queryParams = new URLSearchParams()

        // Add all non-empty params
        Object.keys(params).forEach((key) => {
            if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
                queryParams.append(key, params[key])
            }
        })

        const response = await fetch(`${API_BASE_URL}/api/products?${queryParams}`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching products:', error)
        throw error
    }
}

/**
 * Fetch single product by ID
 * @param {string|number} productId - Product ID
 * @returns {Promise<Object>} Product data
 */
export const fetchProductById = async (productId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products/${productId}`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching product:', error)
        throw error
    }
}

// ==================== CART API ====================

/**
 * Get user's cart
 * @returns {Promise<Object>} Cart data
 */
export const fetchCart = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cart`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`, // TODO: Implement getAuthToken()
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching cart:', error)
        throw error
    }
}

/**
 * Add item to cart
 * @param {Object} item - Cart item
 * @param {string|number} item.productId - Product ID
 * @param {number} item.quantity - Quantity
 * @returns {Promise<Object>} Updated cart
 */
export const addToCart = async (item) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`,
            },
            body: JSON.stringify(item),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error adding to cart:', error)
        throw error
    }
}

/**
 * Update cart item quantity
 * @param {string|number} itemId - Cart item ID
 * @param {number} quantity - New quantity
 * @returns {Promise<Object>} Updated cart
 */
export const updateCartItem = async (itemId, quantity) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cart/update/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`,
            },
            body: JSON.stringify({ quantity }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error updating cart item:', error)
        throw error
    }
}

/**
 * Remove item from cart
 * @param {string|number} itemId - Cart item ID
 * @returns {Promise<Object>} Updated cart
 */
export const removeFromCart = async (itemId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cart/remove/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error removing from cart:', error)
        throw error
    }
}

// ==================== AUTH API ====================

/**
 * Login user
 * @param {Object} credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} Auth data with token
 */
export const login = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Store token (adjust based on your auth strategy)
        if (data.token) {
            localStorage.setItem('authToken', data.token)
        }

        return data
    } catch (error) {
        console.error('Error logging in:', error)
        throw error
    }
}

/**
 * Register new user
 * @param {Object} userData
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @param {string} userData.name - User name
 * @returns {Promise<Object>} Auth data
 */
export const register = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error registering:', error)
        throw error
    }
}

/**
 * Logout user
 * @returns {Promise<void>}
 */
export const logout = async () => {
    try {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
            },
        })

        // Clear token
        localStorage.removeItem('authToken')
    } catch (error) {
        console.error('Error logging out:', error)
        throw error
    }
}

/**
 * Get current user
 * @returns {Promise<Object>} User data
 */
export const getCurrentUser = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching current user:', error)
        throw error
    }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get auth token from localStorage
 * @returns {string|null} Auth token
 */
const getAuthToken = () => {
    return localStorage.getItem('authToken')
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
    return !!getAuthToken()
}
