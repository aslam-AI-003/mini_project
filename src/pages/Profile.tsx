import { User, Mail, Phone, MapPin, Building, Edit } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const { addToast } = useApp();

  return (
    <div className="max-w-3xl mx-auto fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-700">Profile</h1>
        <p className="text-sm text-gray-500">Manage your hotel account details</p>
      </div>

      <div className="card p-6 mb-6">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 bg-brand-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            DH
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy-700">Demo Hotel</h2>
            <p className="text-sm text-gray-500">Hotel Manager</p>
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1">
              Active Account
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">Hotel Manager</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">demo@supplyhub.com</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Phone</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">+91 98765 00000</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Hotel Name</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Building className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">Demo Hotel</span>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Location</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">Chennai, Tamil Nadu, India</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => addToast('info', 'Profile editing will be available when backend is connected.')}
          className="btn-primary mt-6 flex items-center gap-2"
        >
          <Edit className="w-4 h-4" /> Edit Profile
        </button>
      </div>
    </div>
  );
}
