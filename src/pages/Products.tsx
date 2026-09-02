import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Package, Users, ArrowRight } from 'lucide-react';
import { products } from '../data';
import { formatPrice } from '../utils/helpers';

export default function Products() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const navigate = useNavigate();

  const categories = [...new Set(products.map(p => p.category))];

  let filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === 'price-low') filtered.sort((a, b) => a.priceRange.min - b.priceRange.min);
  if (sortBy === 'price-high') filtered.sort((a, b) => b.priceRange.max - a.priceRange.max);
  if (sortBy === 'suppliers') filtered.sort((a, b) => b.supplierCount - a.supplierCount);

  return (
    <div className="max-w-7xl mx-auto fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Products</h1>
          <p className="text-sm text-gray-500">{products.length} products available</p>
        </div>
        <div className="flex gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="input-field pl-10 text-sm"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="input-field text-sm w-auto"
          >
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="input-field text-sm w-auto hidden sm:block"
          >
            <option value="name">Name</option>
            <option value="price-low">Lowest Price</option>
            <option value="price-high">Highest Price</option>
            <option value="suppliers">Most Suppliers</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(product => (
          <div key={product.id} className="card p-5 hover:shadow-lg cursor-pointer group" onClick={() => navigate(`/find-suppliers?q=${encodeURIComponent(product.name)}`)}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-brand-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-navy-700 text-sm truncate group-hover:text-brand-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-400">{product.category}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="text-xs text-gray-400">Price Range</p>
                <p className="font-bold text-navy-700">
                  {formatPrice(product.priceRange.min)} – {formatPrice(product.priceRange.max)}
                  <span className="text-xs font-normal text-gray-400"> / {product.unit}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Suppliers</p>
                <p className="font-semibold text-brand-600 flex items-center gap-1">
                  <Users className="w-3 h-3" /> {product.supplierCount}
                </p>
              </div>
            </div>
            <button className="w-full mt-3 text-xs text-brand-600 font-medium flex items-center justify-center gap-1 py-2 bg-brand-50 rounded-lg group-hover:bg-brand-100 transition-colors">
              Find Suppliers <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No products found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
