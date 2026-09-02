import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Search, Package, Grid3X3, Heart, Clock, ShoppingCart,
  User, Settings, X, Shield
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/find-suppliers', label: 'Find Suppliers', icon: Search },
  { path: '/products', label: 'Products', icon: Package },
  { path: '/categories', label: 'Categories', icon: Grid3X3 },
  { path: '/shortlist', label: 'My Shortlist', icon: Heart },
  { path: '/recent-searches', label: 'Recent Searches', icon: Clock },
  { path: '/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, shortlist } = useApp();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-navy-700 text-white
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-navy-600">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-500 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">SupplyHub</h1>
              <p className="text-[10px] text-gray-400 -mt-0.5">Smart Wholesale Finder</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
                {item.path === '/shortlist' && shortlist.length > 0 && (
                  <span className="ml-auto bg-brand-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {shortlist.length}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Admin Link */}
          <div className="mt-6 pt-4 border-t border-navy-600">
            <NavLink
              to="/admin"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <Shield className="w-5 h-5 flex-shrink-0" />
              <span>Admin Panel</span>
            </NavLink>
          </div>
        </nav>

        {/* User Info */}
        <div className="px-4 py-4 border-t border-navy-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center text-sm font-bold">
              DH
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">Hotel Account</p>
              <p className="text-xs text-gray-400 truncate">Demo Hotel</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
