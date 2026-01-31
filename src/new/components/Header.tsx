import { ShoppingCart, Bell, User, Menu, ChevronDown, Package, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";

const categories = [
  { name: "Trái Cây", id: "fruits" },
  { name: "Rau, Củ & Nấm", id: "vegetables" },
  { name: "Thịt, Cá & Hải Sản", id: "seafood" },
  { name: "Thực Phẩm Khô", id: "dryFood" },
  { name: "Tin Tức", id: "news" },
];

interface HeaderProps {
  onPageChange: (page: string) => void;
  currentPage: string;
  onCategoryNavigate?: (category: string) => void;
  currentUser: { email: string; name: string; role?: string } | null;
  onLogout: () => void;
  cartItemCount: number;
}

export function Header({ onPageChange, currentPage, onCategoryNavigate, currentUser, onLogout, cartItemCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const handleNavigateHome = () => {
    onPageChange("home");
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "news") {
      onPageChange("news");
    } else {
      if (onCategoryNavigate) {
        onCategoryNavigate(categoryId);
      }
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCartClick = () => {
    if (!currentUser) {
      setShowLoginAlert(true);
      return;
    }
    onPageChange("cart");
  };

  const handleNotificationClick = () => {
    if (!currentUser) {
      setShowLoginAlert(true);
      return;
    }
    // TODO: Navigate to notifications page
    alert("Thông báo của bạn!");
  };

  const handleLogoutClick = () => {
    setUserMenuOpen(false);
    onLogout();
  };

  return (
    <header className="bg-[#75b06f] sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNavigateHome}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="bg-white rounded-lg p-2 w-12 h-12 flex items-center justify-center">
                <span className="text-2xl">🥬</span>
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">
                Fresh Market
              </span>
            </button>
          </div>

          {/* Categories Navigation - Desktop (Center) */}
          <nav className="hidden lg:flex items-center gap-6">
            {categories.map((category, index) => (
              <button
                key={index}
                className="text-white hover:text-white/80 font-semibold transition-colors whitespace-nowrap"
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-white/20 rounded-lg transition-colors" onClick={handleCartClick}>
              <ShoppingCart className="w-6 h-6 text-white" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button className="relative p-2 hover:bg-white/20 rounded-lg transition-colors hidden sm:flex" onClick={handleNotificationClick}>
              <Bell className="w-6 h-6 text-white" />
            </button>
            {currentUser ? (
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-4 py-2 hover:bg-white/20 rounded-lg transition-colors"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <User className="w-5 h-5 text-white" />
                  <span className="text-white hidden md:block">{currentUser.name}</span>
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>
                {userMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="font-semibold text-gray-800">{currentUser.name}</p>
                        <p className="text-sm text-gray-500">{currentUser.email}</p>
                        {currentUser.role === "admin" && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                            Admin
                          </span>
                        )}
                        {currentUser.role === "supplier" && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">
                            Nhà Cung Cấp
                          </span>
                        )}
                      </div>
                      {currentUser.role === "admin" && (
                        <button
                          className="flex items-center gap-2 w-full text-left px-4 py-3 text-purple-700 hover:bg-purple-50 transition-colors"
                          onClick={() => {
                            setUserMenuOpen(false);
                            onPageChange("admin-dashboard");
                          }}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Dashboard</span>
                        </button>
                      )}
                      {currentUser.role === "supplier" && (
                        <button
                          className="flex items-center gap-2 w-full text-left px-4 py-3 text-green-700 hover:bg-green-50 transition-colors"
                          onClick={() => {
                            setUserMenuOpen(false);
                            onPageChange("batch-management");
                          }}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Dashboard</span>
                        </button>
                      )}
                      <button
                        className="flex items-center gap-2 w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => {
                          setUserMenuOpen(false);
                          onPageChange("orders");
                        }}
                      >
                        <Package className="w-4 h-4" />
                        <span>Đơn Hàng Của Tôi</span>
                      </button>
                      <button
                        className="flex items-center gap-2 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                        onClick={handleLogoutClick}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng Xuất</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <button 
                  onClick={() => onPageChange("login")}
                  className="hidden md:flex items-center gap-2 px-4 py-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5 text-white" />
                  <span className="text-white">Đăng Nhập</span>
                </button>
                <button 
                  onClick={() => onPageChange("register")}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-white text-[#75b06f] font-semibold rounded-lg hover:bg-white/90 transition-colors"
                >
                  <span>Đăng Ký</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-2 rounded-lg text-white font-semibold hover:bg-white/20 transition-colors"
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Login Alert Modal */}
      {showLoginAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center bg-yellow-100 rounded-full p-4 mb-4">
                <User className="w-12 h-12 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Yêu Cầu Đăng Nhập
              </h2>
              <p className="text-gray-600 mb-6">
                Bạn cần đăng nhập để sử dụng tính năng này. Vui lòng đăng nhập hoặc tạo tài khoản mới.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowLoginAlert(false);
                    onPageChange("login");
                  }}
                  className="flex-1 bg-[#75b06f] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#5a9450] transition-colors"
                >
                  Đăng Nhập
                </button>
                <button
                  onClick={() => setShowLoginAlert(false)}
                  className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}