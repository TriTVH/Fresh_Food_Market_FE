import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiUser, FiPhone, FiMail, FiShield, FiPackage,
  FiEdit2, FiLogOut, FiChevronRight, FiCamera,
  FiLock, FiCheck, FiX
} from 'react-icons/fi'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import { useAuth } from '@/context/AuthContext'

const PRIMARY = '#75b06f'
const PRIMARY_DARK = '#5a9450'

const roleConfig = {
  admin: { label: 'Quản Trị Viên', color: '#7c3aed', bg: '#f5f3ff', icon: '👑' },
  supplier: { label: 'Nhà Cung Cấp', color: '#059669', bg: '#ecfdf5', icon: '🏪' },
  customer: { label: 'Khách Hàng', color: '#2563eb', bg: '#eff6ff', icon: '🛍️' },
}

export default function ProfilePage() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('info')
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  if (!currentUser) {
    navigate('/login')
    return null
  }

  const role = roleConfig[currentUser.role] || roleConfig.customer
  const avatarLetter = (currentUser.username || currentUser.phone || 'U')[0].toUpperCase()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const tabs = [
    { id: 'info', label: 'Thông Tin Cá Nhân', icon: FiUser },
    { id: 'security', label: 'Bảo Mật', icon: FiLock },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
      <Header />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px 60px' }}>
        {/* Page title */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: 0 }}>Tài Khoản Của Tôi</h1>
          <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>Quản lý thông tin và bảo mật tài khoản</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, alignItems: 'start' }}>
          {/* ── Left Sidebar ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Avatar Card */}
            <div style={{ background: '#fff', borderRadius: 16, padding: '28px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center' }}>
              {/* Avatar */}
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
                <div style={{
                  width: 96, height: 96, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_DARK})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 36, fontWeight: 800, color: '#fff', margin: '0 auto',
                  boxShadow: `0 4px 16px ${PRIMARY}50`
                }}>
                  {avatarLetter}
                </div>
                <button style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: 28, height: 28, borderRadius: '50%',
                  background: '#fff', border: `2px solid ${PRIMARY}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: PRIMARY
                }}>
                  <FiCamera style={{ fontSize: 13 }} />
                </button>
              </div>

              <p style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
                {currentUser.username || 'Người Dùng'}
              </p>
              <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 12px' }}>{currentUser.phone}</p>

              {/* Role Badge */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 14px', borderRadius: 20, fontSize: 12.5, fontWeight: 700,
                background: role.bg, color: role.color
              }}>
                {role.icon} {role.label}
              </span>
            </div>

            {/* Navigation */}
            <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
              {tabs.map((tab, i) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      width: '100%', padding: '14px 18px',
                      background: isActive ? `${PRIMARY}10` : 'transparent',
                      border: 'none', borderLeft: isActive ? `3px solid ${PRIMARY}` : '3px solid transparent',
                      cursor: 'pointer', textAlign: 'left',
                      borderBottom: i < tabs.length - 1 ? '1px solid #f1f5f9' : 'none',
                      transition: 'all 0.15s'
                    }}
                  >
                    <Icon style={{ fontSize: 17, color: isActive ? PRIMARY : '#94a3b8' }} />
                    <span style={{ fontSize: 14, fontWeight: isActive ? 700 : 500, color: isActive ? PRIMARY : '#374151' }}>
                      {tab.label}
                    </span>
                    <FiChevronRight style={{ marginLeft: 'auto', fontSize: 14, color: '#cbd5e1' }} />
                  </button>
                )
              })}

              {/* Quick links */}
              <button
                onClick={() => navigate('/orders')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  width: '100%', padding: '14px 18px',
                  background: 'transparent', border: 'none',
                  borderTop: '1px solid #f1f5f9', borderLeft: '3px solid transparent',
                  cursor: 'pointer', textAlign: 'left'
                }}
              >
                <FiPackage style={{ fontSize: 17, color: '#94a3b8' }} />
                <span style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>Đơn Hàng Của Tôi</span>
                <FiChevronRight style={{ marginLeft: 'auto', fontSize: 14, color: '#cbd5e1' }} />
              </button>

              {/* Logout */}
              <button
                onClick={() => setShowLogoutConfirm(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  width: '100%', padding: '14px 18px',
                  background: 'transparent', border: 'none',
                  borderTop: '1px solid #f1f5f9', borderLeft: '3px solid transparent',
                  cursor: 'pointer', textAlign: 'left'
                }}
              >
                <FiLogOut style={{ fontSize: 17, color: '#ef4444' }} />
                <span style={{ fontSize: 14, fontWeight: 500, color: '#ef4444' }}>Đăng Xuất</span>
              </button>
            </div>
          </div>

          {/* ── Right Content ── */}
          <div>
            {activeTab === 'info' && (
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ padding: '22px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h2 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', margin: 0 }}>Thông Tin Cá Nhân</h2>
                    <p style={{ fontSize: 13, color: '#64748b', margin: '3px 0 0' }}>Thông tin cơ bản của tài khoản bạn</p>
                  </div>
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                    background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_DARK})`,
                    color: '#fff', border: 'none', cursor: 'pointer',
                    boxShadow: `0 2px 8px ${PRIMARY}40`
                  }}>
                    <FiEdit2 style={{ fontSize: 13 }} />
                    Chỉnh Sửa
                  </button>
                </div>

                {/* Info fields */}
                <div style={{ padding: '8px 0' }}>
                  {[
                    { icon: FiUser, label: 'Tên đăng nhập', value: currentUser.username || '—', },
                    { icon: FiPhone, label: 'Số điện thoại', value: currentUser.phone || '—' },
                    { icon: FiMail, label: 'Email', value: currentUser.email || 'Chưa cập nhật' },
                    { icon: FiShield, label: 'Vai trò', value: role.label, badge: true, badgeColor: role.color, badgeBg: role.bg },
                  ].map((field, i) => {
                    const Icon = field.icon
                    return (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: 16,
                        padding: '18px 28px',
                        borderBottom: i < 3 ? '1px solid #f8fafc' : 'none'
                      }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 10,
                          background: `${PRIMARY}12`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Icon style={{ fontSize: 17, color: PRIMARY }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            {field.label}
                          </p>
                          {field.badge ? (
                            <span style={{
                              display: 'inline-flex', alignItems: 'center', gap: 4,
                              padding: '3px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700,
                              background: field.badgeBg, color: field.badgeColor
                            }}>
                              {field.value}
                            </span>
                          ) : (
                            <p style={{ fontSize: 15, fontWeight: 600, color: '#1e293b', margin: 0 }}>{field.value}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Account stats */}
                <div style={{ padding: '20px 28px', background: '#f8fafc', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {[
                    { label: 'Tổng Đơn Hàng', value: '—', icon: '📦' },
                    { label: 'Đang Giao', value: '—', icon: '🚚' },
                    { label: 'Hoàn Thành', value: '—', icon: '✅' },
                  ].map((stat, i) => (
                    <div key={i} style={{
                      background: '#fff', borderRadius: 12, padding: '14px 16px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)', textAlign: 'center'
                    }}>
                      <p style={{ fontSize: 22, margin: '0 0 4px' }}>{stat.icon}</p>
                      <p style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: '0 0 2px' }}>{stat.value}</p>
                      <p style={{ fontSize: 11.5, color: '#94a3b8', margin: 0, fontWeight: 600 }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                <div style={{ padding: '22px 28px', borderBottom: '1px solid #f1f5f9' }}>
                  <h2 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', margin: 0 }}>Bảo Mật Tài Khoản</h2>
                  <p style={{ fontSize: 13, color: '#64748b', margin: '3px 0 0' }}>Quản lý mật khẩu và bảo mật tài khoản</p>
                </div>
                <div style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Password change section */}
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
                      <div style={{ padding: '16px 20px', background: '#f8fafc', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <FiLock style={{ color: PRIMARY, fontSize: 16 }} />
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Đổi Mật Khẩu</span>
                      </div>
                      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {['Mật khẩu hiện tại', 'Mật khẩu mới', 'Xác nhận mật khẩu mới'].map((label, i) => (
                          <div key={i}>
                            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{label}</label>
                            <input
                              type="password"
                              placeholder="••••••••"
                              style={{
                                width: '100%', padding: '10px 14px', borderRadius: 8,
                                border: '1.5px solid #e2e8f0', fontSize: 14,
                                outline: 'none', boxSizing: 'border-box', color: '#374151'
                              }}
                              onFocus={e => e.target.style.borderColor = PRIMARY}
                              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                            />
                          </div>
                        ))}
                        <button style={{
                          alignSelf: 'flex-start', padding: '10px 24px', borderRadius: 8, border: 'none',
                          background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_DARK})`,
                          color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                          boxShadow: `0 2px 8px ${PRIMARY}40`
                        }}>
                          Cập Nhật Mật Khẩu
                        </button>
                      </div>
                    </div>

                    {/* Login info */}
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
                      <div style={{ padding: '16px 20px', background: '#f8fafc', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <FiShield style={{ color: '#2563eb', fontSize: 16 }} />
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Thông Tin Đăng Nhập</span>
                      </div>
                      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f8fafc', borderRadius: 8 }}>
                          <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Tài khoản đăng nhập bằng</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>📱 Số điện thoại</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f0fdf4', borderRadius: 8 }}>
                          <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Trạng thái tài khoản</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 700, color: '#16a34a' }}>
                            <FiCheck /> Đang Hoạt Động
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Logout Confirm Modal ── */}
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, width: 380, padding: '32px', boxShadow: '0 24px 60px rgba(0,0,0,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>👋</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>Xác Nhận Đăng Xuất</h3>
            <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 24px' }}>Bạn có chắc muốn đăng xuất khỏi tài khoản không?</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#f8fafc', color: '#374151', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
              >
                <FiX style={{ marginRight: 6 }} />Hủy
              </button>
              <button
                onClick={handleLogout}
                style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#ef4444,#dc2626)', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
              >
                <FiLogOut style={{ marginRight: 6 }} />Đăng Xuất
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
