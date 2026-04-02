import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const getAuthToken = () => localStorage.getItem('authToken')
const getRefreshToken = () => localStorage.getItem('refreshToken')

const setTokens = (token, refreshToken) => {
  if (token) localStorage.setItem('authToken', token)
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
}

const clearTokens = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('refreshToken')
}

// Gắn token vào mọi request
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Xử lý 401: thử refresh token rồi gửi lại request
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => (token ? prom.resolve(token) : prom.reject(error)))
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        })
    }

    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      clearTokens()
      processQueue(error, null)
      return Promise.reject(error)
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/refresh`,
        { refreshToken },
        { headers: { 'Content-Type': 'application/json' } }
      )
      const newToken = data?.token ?? data?.data?.token
      const newRefreshToken = data?.refreshToken ?? data?.data?.refreshToken
      if (newToken) {
        setTokens(newToken, newRefreshToken)
        processQueue(null, newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      }
      throw new Error('No token in refresh response')
    } catch (refreshError) {
      clearTokens()
      processQueue(refreshError, null)
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

export { getAuthToken, getRefreshToken, setTokens, clearTokens }
