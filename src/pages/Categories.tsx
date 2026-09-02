import { useNavigate } from 'react-router-dom';
import { Package, Users, ArrowRight } from 'lucide-react';
import { categories } from '../data';

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-700">Product Categories</h1>
        <p className="text-sm text-gray-500">{categories.length} categories available</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map(cat => (
          <div
            key={cat.id}
            onClick={() => navigate(`/products?category=${cat.id}`)}
            className="card p-6 cursor-pointer group hover:shadow-lg transition-all"
          >
            <div className="text-4xl mb-3">{cat.icon}</div>
            <h3 className="text-lg font-semibold text-navy-700 group-hover:text-brand-600 transition-colors">
              {cat.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">{cat.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-gray-600">
                <Package className="w-4 h-4 text-brand-500" />
                {cat.productCount} Products
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <Users className="w-4 h-4 text-green-500" />
                {cat.supplierCount} Suppliers
              </span>
            </div>
            <button className="w-full mt-4 text-xs text-brand-600 font-medium flex items-center justify-center gap-1 py-2 bg-brand-50 rounded-lg group-hover:bg-brand-100 transition-colors">
              Browse Products <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
