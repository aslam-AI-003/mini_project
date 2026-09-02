import { useState } from 'react';
import {
  LayoutDashboard, Users, Package, Grid3X3, UserCheck,
  Plus, Search, CheckCircle, Clock, XCircle, Edit, Trash2, Save, X
} from 'lucide-react';
import { suppliers, products, categories } from '../data';
import { useApp } from '../context/AppContext';

type AdminTab = 'overview' | 'suppliers' | 'products' | 'categories' | 'add-supplier' | 'add-product';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const { addToast } = useApp();

  const tabs = [
    { id: 'overview' as AdminTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'suppliers' as AdminTab, label: 'Manage Suppliers', icon: Users },
    { id: 'products' as AdminTab, label: 'Manage Products', icon: Package },
    { id: 'categories' as AdminTab, label: 'Categories', icon: Grid3X3 },
    { id: 'add-supplier' as AdminTab, label: 'Add Supplier', icon: Plus },
    { id: 'add-product' as AdminTab, label: 'Add Product', icon: Plus },
  ];

  const statusIcon = (status: string) => {
    if (status === 'verified') return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (status === 'pending') return <Clock className="w-4 h-4 text-orange-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      verified: 'bg-green-100 text-green-700',
      pending: 'bg-orange-100 text-orange-700',
      suspended: 'bg-red-100 text-red-700',
    };
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colors[status] || ''}`}>
        {statusIcon(status)} {status}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-700">Admin Panel</h1>
        <p className="text-sm text-gray-500">Manage suppliers, products, and platform settings</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-3">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-brand-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="stat-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy-700">{suppliers.length}</p>
                  <p className="text-xs text-gray-500">Total Suppliers</p>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy-700">{products.length}</p>
                  <p className="text-xs text-gray-500">Total Products</p>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy-700">24</p>
                  <p className="text-xs text-gray-500">Total Users</p>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy-700">3</p>
                  <p className="text-xs text-gray-500">Pending Approvals</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-navy-700 mb-4">Recent Supplier Activity</h3>
            <div className="space-y-3">
              {[
                { text: 'Royal Agro Wholesale registered', time: '2 hours ago', type: 'new' },
                { text: 'Metro Wholesale Foods updated prices', time: '5 hours ago', type: 'update' },
                { text: 'Aavin Dairy Distributors verified', time: '1 day ago', type: 'verified' },
                { text: 'New product added: Groundnut Oil', time: '2 days ago', type: 'new' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                  <div className={`w-2 h-2 rounded-full ${
                    item.type === 'new' ? 'bg-green-500' : item.type === 'update' ? 'bg-blue-500' : 'bg-purple-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{item.text}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Manage Suppliers */}
      {activeTab === 'suppliers' && (
        <div className="card overflow-x-auto">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search suppliers..." className="input-field pl-10 text-sm" />
            </div>
            <button onClick={() => setActiveTab('add-supplier')} className="btn-primary text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Supplier
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Supplier Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Products</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Phone</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(s => (
                <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{s.name}</td>
                  <td className="py-3 px-4 text-gray-600 text-xs">{s.category.join(', ')}</td>
                  <td className="py-3 px-4 text-gray-600">{s.products.length}</td>
                  <td className="py-3 px-4 text-gray-600">{s.location.split(',')[0]}</td>
                  <td className="py-3 px-4 text-gray-600">{s.contact}</td>
                  <td className="py-3 px-4">{statusBadge(s.status)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-blue-50 rounded text-blue-600"><Edit className="w-4 h-4" /></button>
                      <button className="p-1 hover:bg-red-50 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Manage Products */}
      {activeTab === 'products' && (
        <div className="card overflow-x-auto">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search products..." className="input-field pl-10 text-sm" />
            </div>
            <button onClick={() => setActiveTab('add-product')} className="btn-primary text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Product Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Unit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Price Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Suppliers</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{p.name}</td>
                  <td className="py-3 px-4 text-gray-600">{p.category}</td>
                  <td className="py-3 px-4 text-gray-600">{p.unit}</td>
                  <td className="py-3 px-4 text-gray-600">₹{p.priceRange.min} – ₹{p.priceRange.max}</td>
                  <td className="py-3 px-4 text-gray-600">{p.supplierCount}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-blue-50 rounded text-blue-600"><Edit className="w-4 h-4" /></button>
                      <button className="p-1 hover:bg-red-50 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Categories */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(cat => (
            <div key={cat.id} className="card p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-semibold text-navy-700">{cat.name}</h3>
              </div>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>{cat.productCount} Products</span>
                <span>{cat.supplierCount} Suppliers</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Supplier Form */}
      {activeTab === 'add-supplier' && (
        <div className="card p-6 max-w-3xl">
          <h3 className="text-lg font-bold text-navy-700 mb-5">Add New Supplier</h3>
          <form onSubmit={e => { e.preventDefault(); addToast('success', 'Supplier added successfully!'); setActiveTab('suppliers'); }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name *</label>
                <input type="text" className="input-field text-sm" placeholder="e.g. Sri Lakshmi Traders" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input type="text" className="input-field text-sm" placeholder="Registered business name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                <input type="tel" className="input-field text-sm" placeholder="+91 98765 43210" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                <input type="tel" className="input-field text-sm" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="input-field text-sm" placeholder="supplier@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input type="text" className="input-field text-sm" placeholder="Chennai" required />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <input type="text" className="input-field text-sm" placeholder="Full address" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select className="input-field text-sm" required>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Hours</label>
                <input type="text" className="input-field text-sm" placeholder="8:00 AM - 8:00 PM" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="input-field text-sm" rows={3} placeholder="Brief description of the supplier business" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" /> Add Supplier
              </button>
              <button type="button" onClick={() => setActiveTab('suppliers')} className="btn-secondary flex items-center gap-2">
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Product Form */}
      {activeTab === 'add-product' && (
        <div className="card p-6 max-w-3xl">
          <h3 className="text-lg font-bold text-navy-700 mb-5">Add New Product</h3>
          <form onSubmit={e => { e.preventDefault(); addToast('success', 'Product added successfully!'); setActiveTab('products'); }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input type="text" className="input-field text-sm" placeholder="e.g. Premium Basmati Rice" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select className="input-field text-sm" required>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
                <select className="input-field text-sm" required>
                  <option value="kg">kg</option>
                  <option value="litre">litre</option>
                  <option value="packet">packet</option>
                  <option value="case">case</option>
                  <option value="piece">piece</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                <input type="number" className="input-field text-sm" placeholder="e.g. 92" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order Quantity *</label>
                <input type="number" className="input-field text-sm" placeholder="e.g. 25" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability *</label>
                <select className="input-field text-sm" required>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Limited Stock">Limited Stock</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <select className="input-field text-sm">
                  <option value="">Select Supplier</option>
                  {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="input-field text-sm" rows={3} placeholder="Brief product description" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" /> Add Product
              </button>
              <button type="button" onClick={() => setActiveTab('products')} className="btn-secondary flex items-center gap-2">
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
