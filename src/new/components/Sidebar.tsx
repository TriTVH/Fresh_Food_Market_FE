import {
  LayoutDashboard,
  Package,
  LogOut,
  X,
  Home,
  LucideIcon,
} from "lucide-react";

export interface MenuItem {
  id: string;
  icon: LucideIcon;
  label: string;
  description?: string;
  badge?: number | string;
  badgeColor?: string;
  onClick?: () => void;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface SidebarProps {
  // Brand
  brandName?: string;
  brandSubtitle?: string;
  brandIcon?: LucideIcon;
  
  // User Info
  currentUser: { email: string; name: string; role?: string } | null;
  userRoleLabel?: string;
  
  // Menu Sections
  sections: MenuSection[];
  
  // Active State
  activePage?: string;
  activeView?: string;
  
  // Actions
  onPageChange: (page: string) => void;
  onLogout: () => void;
  
  // Mobile
  showMobile: boolean;
  onCloseMobile: () => void;
  
  // Additional Admin Menu
  showAdminMenu?: boolean;
  adminMenuItems?: MenuItem[];
  
  // Customization
  sidebarWidth?: string;
  accentColor?: string;
}

export function Sidebar({
  brandName = "FreshMarket",
  brandSubtitle = "",
  brandIcon: BrandIcon = Package,
  currentUser,
  userRoleLabel,
  sections,
  activePage,
  activeView,
  onPageChange,
  onLogout,
  showMobile,
  onCloseMobile,
  showAdminMenu = false,
  adminMenuItems = [],
  sidebarWidth = "w-72",
  accentColor = "bg-[#75b06f]",
}: SidebarProps) {
  
  const handleLogout = () => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      onLogout();
      onCloseMobile();
    }
  };

  const SidebarContent = () => (
    <>
      {/* Logo & Brand (only show if brandName provided) */}
      {brandName && (
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${accentColor} rounded-lg flex items-center justify-center`}>
              <BrandIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-800 text-lg">{brandName}</h1>
              {brandSubtitle && <p className="text-xs text-gray-500">{brandSubtitle}</p>}
            </div>
          </div>
        </div>
      )}

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${accentColor} rounded-full flex items-center justify-center text-white font-bold`}>
            {currentUser?.name?.charAt(0) || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 truncate text-sm">
              {currentUser?.name || "Admin"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {userRoleLabel || currentUser?.email || "admin@freshmarket.vn"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* Main Sections */}
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={sectionIndex > 0 ? "pt-4 border-t border-gray-200" : "mb-2"}>
            <p className="text-xs font-semibold text-gray-500 uppercase px-3 mb-2">
              {section.title}
            </p>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id || activeView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else {
                      onPageChange(item.id);
                    }
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center ${
                    item.badge !== undefined ? "justify-between" : "gap-3"
                  } px-3 py-${item.description ? "3" : "2.5"} rounded-lg transition-colors mb-1 ${
                    isActive
                      ? `${accentColor} text-white shadow-md`
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-semibold truncate">{item.label}</p>
                      {item.description && (
                        <p
                          className={`text-xs truncate ${
                            isActive ? "text-white/80" : "text-gray-500"
                          }`}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        isActive ? "bg-white/20 text-white" : item.badgeColor || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}

        {/* Admin Menu (if enabled) */}
        {showAdminMenu && currentUser?.role === "admin" && adminMenuItems.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase px-3 mb-2">
              Quản Trị
            </p>
            {adminMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else {
                      onPageChange(item.id);
                    }
                    onCloseMobile();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors mb-1"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Quick Actions */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase px-3 mb-2">
            Điều Hướng
          </p>
          <button
            onClick={() => {
              onPageChange("home");
              onCloseMobile();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors mb-1"
          >
            <Home className="w-5 h-5" />
            <span className="text-sm font-medium">Về Trang Chủ</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium shadow-md"
          >
            <LogOut className="w-5 h-5" />
            <span>Đăng Xuất</span>
          </button>
        </div>
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:${sidebarWidth} bg-white border-r border-gray-200 flex-col`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {showMobile && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={onCloseMobile}
          />

          {/* Sidebar Panel */}
          <aside className={`lg:hidden fixed inset-y-0 left-0 ${sidebarWidth} bg-white z-50 flex flex-col shadow-xl`}>
            {/* Close Button */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-bold text-gray-800">Menu</h2>
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
