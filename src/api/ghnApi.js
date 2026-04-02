import axios from 'axios'

const GHN_BASE_URL = 'https://online-gateway.ghn.vn/shiip/public-api'

const token =
  import.meta.env.VITE_GHN_API_TOKEN || import.meta.env.GHN_API_TOKEN || ''
const shopId =
  import.meta.env.VITE_GHN_SHOP_ID || import.meta.env.GHN_SHOP_ID || ''
const fromDistrictIdEnv =
  Number(import.meta.env.VITE_GHN_FROM_DISTRICT_ID || import.meta.env.GHN_FROM_DISTRICT_ID || 0)

const ghnClient = axios.create({
  baseURL: GHN_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

ghnClient.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Token = token
    }
    if (shopId) {
      config.headers.ShopId = shopId
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const fetchProvinces = async () => {
  const res = await ghnClient.get('/master-data/province')
  return res.data
}

export const fetchDistricts = async (provinceId) => {
  if (!provinceId) return { data: [] }
  const res = await ghnClient.post('/master-data/district', {
    province_id: Number(provinceId),
  })
  return res.data
}

export const fetchWards = async (districtId) => {
  if (!districtId) return { data: [] }
  const res = await ghnClient.post('/master-data/ward', {
    district_id: Number(districtId),
  })
  return res.data
}

export const fetchAvailableServices = async (toDistrictId) => {
  const res = await ghnClient.post('/v2/shipping-order/available-services', {
    shop_id: Number(shopId),
    from_district: fromDistrictIdEnv || undefined,
    to_district: Number(toDistrictId),
  })
  return res.data
}

export const calculateShippingFee = async ({
  serviceId,
  toDistrictId,
  toWardCode,
  weight,
  insuranceValue = 0,
}) => {
  const res = await ghnClient.post('/v2/shipping-order/fee', {
    shop_id: Number(shopId),
    service_id: Number(serviceId),
    from_district_id: fromDistrictIdEnv || undefined,
    to_district_id: Number(toDistrictId),
    to_ward_code: String(toWardCode),
    weight: Number(weight),
    insurance_value: Number(insuranceValue),
  })
  return res.data
}

