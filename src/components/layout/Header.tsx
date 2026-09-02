import React from 'react';
import { Bell, Menu, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getGreeting } from '../../utils/helpers';

export default function Header() {
  const { setSidebarOpen, setUser } = useApp();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showNotif, setShowNotif] = React.useState(false);

  const notifications = [
    { id: 1, text: 'New supplier added – Royal Agro Wholesale', time: '2 min ago' },
    { id: 2, text: 'Price updated – Premium Basmati Rice', time: '1 hour ago' },
    { id: 3, text: 'New product available – Sunflower Oil', time: '3 hours ago' },
  ];

  return (
    <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-gray-600 hover:text-gray-900"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-navy-700">
            {getGreeting()}, Hotel Manager 👋
          </h2>
          <p className="text-sm text-gray-500 hidden sm:block">
            Find the best wholesale prices for your hotel requirements.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotif(!showNotif); setShowUserMenu(false); }}
            className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
              </div>
              {notifications.map(n => (
                <div key={n.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm text-gray-700">{n.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => { setShowUserMenu(!showUserMenu); setShowNotif(false); }}
            className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              DH
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Demo Hotel</span>
          </button>
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
              <button
                onClick={() => { navigate('/profile'); setShowUserMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                <User className="w-4 h-4" />
                Profile
              </button>
              <button
                onClick={() => { setUser(null); navigate('/'); setShowUserMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close */}
      {(showNotif || showUserMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setShowNotif(false); setShowUserMenu(false); }}
        />
      )}
    </header>
  );
}
