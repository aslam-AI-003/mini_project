import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Package, Users, TrendingDown, Clock, ArrowRight,
  Star, ChevronRight
} from 'lucide-react';
import { products, suppliers } from '../data';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/helpers';

const categoryShortcuts = [
  { label: 'Rice', icon: '🍚', query: 'rice' },
  { label: 'Flour', icon: '🌾', query: 'flour' },
  { label: 'Oil', icon: '🫗', query: 'oil' },
  { label: 'Spices', icon: '🧂', query: 'spices' },
  { label: 'Biscuits', icon: '🍪', query: 'biscuits' },
  { label: 'Beverages', icon: '🥤', query: 'drinks' },
  { label: 'Meat', icon: '🥩', query: 'chicken' },
  { label: 'Vegetables', icon: '🥬', query: 'vegetables' },
  { label: 'Dairy', icon: '🥛', query: 'milk' },
];

const popularProducts = [
  { name: 'Premium Basmati Rice', searches: 245 },
  { name: 'Sunflower Oil', searches: 189 },
  { name: 'Chicken', searches: 156 },
  { name: 'Sugar', searches: 134 },
  { name: 'Wheat Flour', searches: 112 },
];

const recentActivity = [
  { text: 'New supplier added – Royal Agro Wholesale', time: '2 min ago', type: 'new' },
  { text: 'Price updated – Premium Basmati Rice', time: '1 hour ago', type: 'update' },
  { text: 'New product available – Sunflower Oil', time: '3 hours ago', type: 'new' },
  { text: 'Supplier verified – Balaji Wholesale Mart', time: '5 hours ago', type: 'verified' },
];

const recommended = [
  { name: 'Premium Basmati Rice', price: 85, unit: 'kg' },
  { name: 'Sunflower Oil', price: 118, unit: 'litre' },
  { name: 'Chicken', price: 195, unit: 'kg' },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { recentSearches } = useApp();

  const handleSearch = (query?: string) => {
    const q = query || searchQuery;
    if (q.trim()) {
      navigate(`/find-suppliers?q=${encodeURIComponent(q.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 fade-in">
      {/* Search Section */}
      <div className="bg-gradient-to-r from-navy-700 to-brand-800 rounded-2xl p-6 sm:p-8 text-white">
        <h3 className="text-lg sm:text-xl font-bold mb-1">What grocery item are you looking for?</h3>
        <p className="text-blue-200 text-sm mb-5">Search from 128+ products across 46 verified suppliers</p>

        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products e.g. Basmati Rice, Oil, Sugar..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:ring-2 focus:ring-brand-300 outline-none"
            />
          </div>
          <button
            onClick={() => handleSearch()}
            className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3.5 rounded-xl font-medium transition-colors whitespace-nowrap hidden sm:block"
          >
            Search Suppliers
          </button>
          <button
            onClick={() => handleSearch()}
            className="bg-brand-500 hover:bg-brand-600 text-white p-3.5 rounded-xl font-medium transition-colors sm:hidden"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Category Shortcuts */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categoryShortcuts.map(cat => (
            <button
              key={cat.label}
              onClick={() => handleSearch(cat.query)}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-700">{products.length * 5}</p>
              <p className="text-xs text-gray-500">Total Products</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-700">{suppliers.length + 34}</p>
              <p className="text-xs text-gray-500">Verified Suppliers</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-700">₹18,500</p>
              <p className="text-xs text-gray-500">Average Savings</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-700">{recentSearches.length}</p>
              <p className="text-xs text-gray-500">Recent Searches</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Popular Products */}
        <div className="lg:col-span-1 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-700">Popular Products</h3>
            <button onClick={() => navigate('/products')} className="text-brand-600 text-xs font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {popularProducts.map((p, i) => (
              <button
                key={p.name}
                onClick={() => handleSearch(p.name)}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <span className="w-7 h-7 bg-brand-100 text-brand-700 rounded-lg flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.searches} searches</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-700">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-2">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  a.type === 'new' ? 'bg-green-500' : a.type === 'update' ? 'bg-blue-500' : 'bg-purple-500'
                }`} />
                <div>
                  <p className="text-sm text-gray-700">{a.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended */}
        <div className="lg:col-span-1 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-700">Recommended For You</h3>
          </div>
          <p className="text-xs text-gray-400 mb-3">Based on recent searches</p>
          <div className="space-y-3">
            {recommended.map(r => (
              <div key={r.name} className="p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-800">{r.name}</p>
                  <span className="flex items-center gap-1 text-xs text-amber-600">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    4.5+
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">Starting from {formatPrice(r.price)}/{r.unit}</p>
                <button
                  onClick={() => handleSearch(r.name)}
                  className="text-xs text-brand-600 font-medium hover:text-brand-700 flex items-center gap-1"
                >
                  Compare Suppliers <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
