import { Bell, Globe, Shield, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { addToast } = useApp();

  return (
    <div className="max-w-3xl mx-auto fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-700">Settings</h1>
        <p className="text-sm text-gray-500">Manage your application preferences</p>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-brand-600" />
            <h3 className="font-semibold text-navy-700">Notifications</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Price drop alerts', desc: 'Get notified when product prices decrease', checked: true },
              { label: 'New supplier notifications', desc: 'Get notified when new suppliers join', checked: true },
              { label: 'Order updates', desc: 'Receive updates on your order status', checked: true },
              { label: 'Weekly price report', desc: 'Receive weekly price comparison reports', checked: false },
            ].map(item => (
              <label key={item.label} className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-gray-700">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
                <div className="relative">
                  <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                  <div className="w-10 h-6 bg-gray-200 peer-checked:bg-brand-600 rounded-full transition-colors cursor-pointer after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-4 after:shadow-sm"></div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-brand-600" />
            <h3 className="font-semibold text-navy-700">Preferences</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Location</label>
              <select className="input-field text-sm">
                <option>Chennai</option>
                <option>Tambaram</option>
                <option>Koyambedu</option>
                <option>All Locations</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Currency</label>
              <select className="input-field text-sm">
                <option>₹ INR (Indian Rupee)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Language</label>
              <select className="input-field text-sm">
                <option>English</option>
                <option>Tamil</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Default Sort</label>
              <select className="input-field text-sm">
                <option>Recommended</option>
                <option>Lowest Price</option>
                <option>Highest Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-brand-600" />
            <h3 className="font-semibold text-navy-700">Security</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
              <input type="password" placeholder="••••••••" className="input-field text-sm max-w-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
              <input type="password" placeholder="••••••••" className="input-field text-sm max-w-md" />
            </div>
          </div>
        </div>

        <button
          onClick={() => addToast('success', 'Settings saved successfully!')}
          className="btn-primary flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>
    </div>
  );
}
