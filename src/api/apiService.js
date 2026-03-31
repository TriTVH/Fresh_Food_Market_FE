import { api, getAuthToken, setTokens, clearTokens } from './axiosInstance'

// Re-export để component khác dùng
export { getAuthToken } from './axiosInstance'

// ==================== PRODUCT API ====================

// Map category_id từ API -> key đang dùng trong FE
const CATEGORY_MAP = {
  1: 'vegetables',
  2: 'fruits',
  3: 'meatSeafood',
  4: 'driedFood',
}

// Map sub_category_id từ API -> key subcategory đang dùng trong FE
const SUBCATEGORY_MAP = {
  1: 'leafy', // Rau ăn lá
  2: 'root', // Củ, Quả
  3: 'mushroom', // Nấm, Đậu Hũ
  4: 'vietnam', // Trái Việt Nam
  5: 'imported', // Trái Nhập Khẩu
  6: 'seafood', // Hải Sản
  7: 'pork', // Thịt Heo
  8: 'beef', // Thịt Bò
  9: 'poultry', // Thịt Gà, Vịt & Chim
  10: 'dried-fruit', // Trái Cây Sấy
  11: 'processed', // Khô Chế Biến Sẵn
}

// Map sub_category_id -> category key (phòng khi field categoryId không chuẩn)
const SUBCATEGORY_TO_CATEGORY = {
  1: 'vegetables',
  2: 'vegetables',
  3: 'vegetables',
  4: 'fruits',
  5: 'fruits',
  6: 'meatSeafood',
  7: 'meatSeafood',
  8: 'meatSeafood',
  9: 'meatSeafood',
  10: 'driedFood',
  11: 'driedFood',
}

// Convert 1 sản phẩm từ API -> format mockProducts đang dùng trong FE
const mapApiProductToFrontend = (p) => {
  const images = p.imagesJson || p.images || []
  let imageUrl = ''
  if (Array.isArray(images) && images.length > 0) {
    const primaryImg = images.find((img) => img.primary)
    imageUrl = primaryImg?.url || images[0].url || ''
  }

  const rawCategoryId = p.categoryId ?? p.categoryID ?? p.category_id
  const rawSubCategoryId = p.subCategoryId ?? p.subCategoryID ?? p.sub_category_id

  const categoryKey = CATEGORY_MAP[rawCategoryId] || SUBCATEGORY_TO_CATEGORY[rawSubCategoryId] || ''
  const subCategoryKey = SUBCATEGORY_MAP[rawSubCategoryId] || ''

  return {
    id: p.productId,
    name: p.productName,
    category: categoryKey,
    subcategory: subCategoryKey,
    price: p.priceSell,
    originalPrice: null,
    discount: 0,
    rating: p.ratingAverage || 0,
    reviewCount: p.ratingCount || 0,
    soldCount: p.soldCount || 0,
    image: imageUrl,
    isOrganic: p.isOrganic ?? false,
    inStock: p.isAvailable ?? true,
  }
}

/**
 * Lấy toàn bộ sản phẩm active từ API /product/active
 * Trả về object giống mockProducts: { vegetables: [], fruits: [], meatSeafood: [], driedFood: [] }
 */
export const fetchActiveProductsByCategory = async () => {
  const { data } = await api.get('/product/active')
  const list = data?.data || []

  const result = {
    vegetables: [],
    fruits: [],
    meatSeafood: [],
    driedFood: [],
  }

  list.forEach((raw) => {
    const prod = mapApiProductToFrontend(raw)
    if (result[prod.category]) {
      result[prod.category].push(prod)
    }
  })

  return result
}

/**
 * Lấy danh sách toàn bộ sản phẩm cho màn admin
 * Tạm thời dùng /product/active vì /product đang lỗi
 * Trả về mảng raw product từ API
 */
export const fetchAllProducts = async () => {
  const { data } = await api.get('/product/active')
  return data?.data || data || []
}

/**
 * Map 1 bản ghi /product/active -> dòng chọn trong modal lô hàng (tên, giá bán, đơn vị, nguồn).
 * Giá: priceSell; đơn vị hiển thị: weight + unit (vd 500 + gram -> "500gram") nếu có cả hai.
 */
export const mapProductForBatchPicker = (raw) => {
  const id = raw?.productId ?? raw?.ProductId ?? raw?.product_id
  if (id == null) return null
  const name = raw?.productName ?? raw?.ProductName ?? ''
  const price =
    Number(raw?.priceSell ?? raw?.PriceSell ?? raw?.price_sell ?? raw?.price ?? raw?.Price ?? 0) || 0
  const w = raw?.weight ?? raw?.Weight
  const unitBase = (raw?.unit ?? raw?.Unit ?? '').toString().trim()
  const wNum = w != null && w !== '' ? Number(w) : NaN
  const unitLabel =
    Number.isFinite(wNum) && wNum > 0 && unitBase
      ? `${String(wNum % 1 === 0 ? Math.trunc(wNum) : wNum)}${unitBase}`
      : unitBase || '—'
  const origin = raw?.manufacturingLocation ?? raw?.ManufacturingLocation ?? raw?.origin ?? '—'
  // Backend field cho tồn kho/số lượng còn lại có thể khác nhau theo dự án:
  // ưu tiên các field "remaining*", sau đó fallback sang "quantity/qty".
  const remainingRaw =
    raw?.remainingQuantity ??
    raw?.RemainingQuantity ??
    raw?.remaining ??
    raw?.Remaining ??
    raw?.availableQuantity ??
    raw?.AvailableQuantity ??
    raw?.quantity ??
    raw?.Quantity ??
    raw?.qty ??
    raw?.Qty ??
    null
  const remaining =
    remainingRaw == null || remainingRaw === '' ? null : Number(remainingRaw)

  return {
    id,
    name,
    price,
    unit: unitLabel,
    origin,
    remaining: Number.isFinite(remaining) ? remaining : null,
  }
}

/**
 * Lấy chi tiết 1 sản phẩm theo id (GET /product/{id})
 */
export const fetchProductDetail = async (productId) => {
  const { data } = await api.get(`/product/${productId}`)
  // API trả { success, message, data, statusCode }
  return data?.data || data
}

/**
 * Danh sách nhà cung cấp (GET /supplier)
 * Mỗi phần tử: { supplierId, name, address, phone, ... }
 */
export const fetchSuppliers = async () => {
  const { data } = await api.get('/supplier')
  return Array.isArray(data?.data) ? data.data : []
}

/**
 * Tạo lô hàng (POST /batch)
 * Body: { supplierId: number, items: { productId: number, quantity: number }[] }
 */
export const createBatch = async (payload) => {
  const { data } = await api.post('/batch', payload)
  return data
}

/**
 * Danh sách lô hàng (GET /batch)
 */
export const fetchBatches = async () => {
  // Cache-bust: sau POST tạo lô, một số môi trường có thể trả list cũ nếu không ép tải lại.
  const { data } = await api.get('/batch', { params: { _t: Date.now() } })
  return Array.isArray(data?.data) ? data.data : []
}

/**
 * Chi tiết 1 lô (GET /batch/{id})
 */
export const fetchBatchById = async (batchId) => {
  const { data } = await api.get(`/batch/${batchId}`)
  return data?.data ?? data
}

/** BatchAction (backend enum): Confirm=0, Delivery=1, Complete=2, Cancel=3 */
export const BATCH_ACTION = {
  Confirm: 0,
  Delivery: 1,
  Complete: 2,
  Cancel: 3,
}

/**
 * Dòng items PUT /batch: backend C# thường bind `ExpiredDate`, `BatchDetailId`.
 * Gửi kèm camelCase để tương thích axios/JSON mặc định.
 */
export const buildBatchDetailItemPayload = ({ id, quantity, expiredDate }) => {
  const exp =
    expiredDate == null || expiredDate === ''
      ? null
      : String(expiredDate).trim().slice(0, 10)
  const n = Math.floor(Number(quantity)) || 0
  const detailId = id
  return {
    id: detailId,
    batchDetailId: detailId,
    quantity: n,
    expiredDate: exp,
    ExpiredDate: exp,
  }
}

/**
 * Cập nhật lô (PUT /batch) — action: BATCH_ACTION.*
 * Body: { id, action, items?, imagesJson?, cancelReason? }
 * items[]: { id, quantity, expiredDate? } (batch detail id + số lượng + HSD YYYY-MM-DD)
 */
export const updateBatch = async (payload) => {
  const { data } = await api.put('/batch', payload)
  return data
}

/**
 * Upload 1 ảnh lên Cloudinary (unsigned upload)
 * Trả về URL ảnh.
 */
export const uploadImageToCloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  if (!cloudName || !uploadPreset) {
    throw new Error('Thiếu cấu hình Cloudinary (CLOUD_NAME hoặc UPLOAD_PRESET).')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  const axios = (await import('axios')).default
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData
  )
  return data.secure_url || data.url
}

/**
 * Tạo sản phẩm mới (POST /product)
 * body theo swagger backend.
 */
export const createProduct = async (payload) => {
  const { data } = await api.post('/product', payload)
  return data
}

/**
 * Cập nhật sản phẩm (PUT /product)
 * body theo swagger backend.
 */
export const updateProduct = async (payload) => {
  const { data } = await api.put('/product', payload)
  return data
}

// ==================== CART API ====================

export const fetchCart = async () => {
  const { data } = await api.get('/api/cart')
  return data
}

export const addToCart = async (item) => {
  const { data } = await api.post('/api/cart/add', item)
  return data
}

export const updateCartItem = async (itemId, quantity) => {
  const { data } = await api.put(`/api/cart/update/${itemId}`, { quantity })
  return data
}

export const removeFromCart = async (itemId) => {
  const { data } = await api.delete(`/api/cart/remove/${itemId}`)
  return data
}

// ==================== AUTH API ====================

/**
 * Login (phone + password). Response: { success, message, data: { token, refreshToken, role, username, ... } }
 */
export const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials)
  const token = data?.data?.token ?? data?.data?.accessToken ?? data?.data?.access_token ?? data?.token ?? data?.accessToken
  const refreshToken = data?.data?.refreshToken ?? data?.data?.refresh_token ?? data?.refreshToken
  if (token) setTokens(token, refreshToken)
  return data
}

/**
 * Register. Body: phone, password; optional: email, username
 */
export const register = async (userData) => {
  const { data } = await api.post('/auth/register', {
    phone: userData.phone,
    password: userData.password,
    email: userData.email || undefined,
    username: userData.fullName || undefined,
  })
  return data
}

/**
 * Logout: gọi API (nếu có) và xóa token local
 */
export const logout = async () => {
  try {
    await api.post('/auth/logout')
  } catch (_) {
    // ignore
  }
  clearTokens()
}

/**
 * Refresh token (gọi tay khi cần; bình thường interceptor tự xử lý 401)
 */
export const refreshAuthToken = async () => {
  const axios = (await import('axios')).default
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) throw new Error('No refresh token found')
  const { data } = await axios.post(
    `${api.defaults.baseURL}/auth/refresh`,
    { refreshToken },
    { headers: { 'Content-Type': 'application/json' } }
  )
  const token = data?.token ?? data?.data?.token
  const newRefresh = data?.refreshToken ?? data?.data?.refreshToken
  if (token) setTokens(token, newRefresh)
  return data
}

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => !!getAuthToken()

/**
 * Lấy message lỗi từ ApiResponse backend (Success, Message, Data, StatusCode).
 * Hỗ trợ cả message (camelCase) và Message (PascalCase).
 * @param {*} err - Error từ axios (err.response.data là body API)
 * @returns {string} - Thông báo lỗi để hiển thị
 */
export const getApiErrorMessage = (err) => {
  const data = err?.response?.data
  if (!data) return null
  const msg = data.message ?? data.Message
  return typeof msg === 'string' && msg.trim() ? msg.trim() : null
}
