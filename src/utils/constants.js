// Phân quyền: role_id từ API (1=ADMIN, 2=CUSTOMER, 3=SUPPLIER, 4=STAFF)
export const ROLE_ID = {
  ADMIN: 1,
  CUSTOMER: 2,
  SUPPLIER: 3,
  STAFF: 4,
}

export const ROLE_NAME = {
  [ROLE_ID.ADMIN]: 'admin',
  [ROLE_ID.CUSTOMER]: 'customer',
  [ROLE_ID.SUPPLIER]: 'supplier',
  [ROLE_ID.STAFF]: 'staff',
}

/** role_id (number) -> role name (string) */
export const getRoleName = (roleId) => ROLE_NAME[roleId] ?? 'customer'

// Mock accounts for testing (có thể xóa khi không dùng)
export const MOCK_ACCOUNTS = [
    {
        email: 'customer@freshmarket.vn',
        password: '123456',
        name: 'Nguyễn Văn A',
        phone: '0912345678',
        role: 'customer',
    },
    {
        email: 'admin@freshmarket.vn',
        password: 'admin123',
        name: 'Admin Fresh Market',
        phone: '0987654321',
        role: 'admin',
    },
    {
        email: 'supplier@freshmarket.vn',
        password: 'supplier123',
        name: 'Nguyễn Thị B',
        phone: '0909123456',
        role: 'supplier',
    },
]

export const APP_NAME = 'Fresh Market'
export const APP_TAGLINE = 'Tươi Ngon - An Tâm'
