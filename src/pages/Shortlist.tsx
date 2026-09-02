import { useNavigate } from 'react-router-dom';
import { Heart, Star, MapPin, Eye, MessageCircle, Trash2 } from 'lucide-react';
import { suppliers } from '../data';
import { useApp } from '../context/AppContext';

export default function Shortlist() {
  const { shortlist, removeFromShortlist, addToast } = useApp();
  const navigate = useNavigate();

  const shortlistItems = shortlist.map(item => {
    const supplier = suppliers.find(s => s.id === item.supplierId);
    const product = supplier?.products.find(p => p.productId === item.productId);
    return { ...item, supplier, product };
  }).filter(item => item.supplier && item.product);

  const handleRemove = (supplierId: string, productId: string) => {
    removeFromShortlist(supplierId, productId);
    addToast('info', 'Removed from shortlist');
  };

  return (
    <div className="max-w-5xl mx-auto fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-700">My Shortlisted Suppliers</h1>
        <p className="text-sm text-gray-500">{shortlistItems.length} suppliers saved</p>
      </div>

      {shortlistItems.length === 0 ? (
        <div className="text-center py-20 card">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No shortlisted suppliers yet</h3>
          <p className="text-sm text-gray-500 mb-4">Search for products and add suppliers to your shortlist</p>
          <button onClick={() => navigate('/find-suppliers')} className="btn-primary">
            Find Suppliers
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {shortlistItems.map(item => (
            <div key={`${item.supplierId}-${item.productId}`} className="card p-5">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center text-brand-700 font-bold text-lg flex-shrink-0">
                  {item.supplier!.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-navy-700">{item.supplier!.name}</h3>
                  <p className="text-sm text-gray-600 mt-0.5">{item.product!.productName}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="font-bold text-navy-700 text-lg">₹{item.product!.price} / {item.product!.unit}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {item.supplier!.location}</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {item.supplier!.rating}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button onClick={() => navigate(`/supplier/${item.supplierId}`)} className="btn-primary text-sm py-2 px-4 flex items-center gap-1.5">
                      <Eye className="w-4 h-4" /> View
                    </button>
                    <a href={`https://wa.me/${item.supplier!.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-sm py-2">
                      <MessageCircle className="w-4 h-4" /> Contact
                    </a>
                    <button onClick={() => handleRemove(item.supplierId, item.productId)} className="text-sm py-2 px-4 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-medium flex items-center gap-1.5 transition-colors">
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
