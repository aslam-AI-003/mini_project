import { useParams, useNavigate } from 'react-router-dom';
import {
  Star, MapPin, Phone, MessageCircle, Clock, CheckCircle, ArrowLeft,
  Heart, Calendar, Mail, Clipboard
} from 'lucide-react';
import { suppliers } from '../data';
import { useApp } from '../context/AppContext';

export default function SupplierDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToShortlist, isShortlisted, addToast } = useApp();

  const supplier = suppliers.find(s => s.id === id);

  if (!supplier) {
    return (
      <div className="text-center py-20">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Supplier not found</h3>
        <button onClick={() => navigate(-1)} className="btn-primary mt-4">Go Back</button>
      </div>
    );
  }

  const handleShortlist = (productId: string) => {
    if (isShortlisted(supplier.id, productId)) {
      addToast('info', 'Already in your shortlist');
      return;
    }
    addToShortlist({ supplierId: supplier.id, productId, addedAt: new Date().toISOString() });
    addToast('success', 'Supplier added to your shortlist.');
  };

  return (
    <div className="max-w-5xl mx-auto fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back to results
      </button>

      {/* Supplier Header */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-20 h-20 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-700 font-bold text-2xl flex-shrink-0">
            {supplier.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-navy-700">{supplier.name}</h1>
              {supplier.verified && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3" /> Verified Supplier
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-gray-800">{supplier.rating}</span>
                <span className="text-gray-400 text-sm">/ 5</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">{supplier.reviewCount} reviews</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{supplier.description}</p>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="text-sm font-medium text-gray-700">{supplier.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Contact</p>
                  <p className="text-sm font-medium text-gray-700">{supplier.contact}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">WhatsApp</p>
                  <p className="text-sm font-medium text-gray-700">{supplier.contact}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Business Hours</p>
                  <p className="text-sm font-medium text-gray-700">{supplier.businessHours}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Years in Business</p>
                  <p className="text-sm font-medium text-gray-700">{supplier.yearsInBusiness} Years</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm font-medium text-gray-700">{supplier.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card p-6 mb-6">
        <h2 className="text-lg font-bold text-navy-700 mb-4">Products Available</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-3 font-semibold text-gray-600">Product</th>
                <th className="text-left py-3 px-3 font-semibold text-gray-600">Price</th>
                <th className="text-left py-3 px-3 font-semibold text-gray-600">Unit</th>
                <th className="text-left py-3 px-3 font-semibold text-gray-600">MOQ</th>
                <th className="text-left py-3 px-3 font-semibold text-gray-600">Availability</th>
                <th className="text-left py-3 px-3 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {supplier.products.map(product => (
                <tr key={product.productId} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium text-gray-800">{product.productName}</td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-navy-700">₹{product.price}</span>
                    {product.bulkPrice && (
                      <span className="block text-xs text-green-600">
                        Bulk: ₹{product.bulkPrice} ({product.bulkMinQty}+)
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-gray-600">1 {product.unit}</td>
                  <td className="py-3 px-3 text-gray-600">{product.moq} {product.moqUnit}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                      product.availability === 'In Stock' ? 'text-green-600' :
                      product.availability === 'Limited Stock' ? 'text-orange-600' : 'text-red-500'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        product.availability === 'In Stock' ? 'bg-green-500' :
                        product.availability === 'Limited Stock' ? 'bg-orange-500' : 'bg-red-500'
                      }`}></span>
                      {product.availability}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => handleShortlist(product.productId)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                        isShortlisted(supplier.id, product.productId)
                          ? 'bg-red-50 border-red-200 text-red-600'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Heart className={`w-3 h-3 inline mr-1 ${isShortlisted(supplier.id, product.productId) ? 'fill-red-500' : ''}`} />
                      {isShortlisted(supplier.id, product.productId) ? 'Saved' : 'Shortlist'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Section */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-navy-700 mb-2">Interested in this supplier?</h2>
        <p className="text-sm text-gray-500 mb-5">Contact them directly through any of these channels</p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${supplier.whatsapp}?text=Hi, I found your profile on SupplyHub and I'm interested in your wholesale products.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp py-3 px-6"
          >
            <MessageCircle className="w-5 h-5" /> WhatsApp Supplier
          </a>
          <a
            href={`tel:${supplier.contact}`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Phone className="w-5 h-5" /> Call Supplier
          </a>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(supplier.address + ', ' + supplier.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary py-3 px-6 flex items-center gap-2"
          >
            <MapPin className="w-5 h-5" /> View Location
          </a>
          <button
            onClick={() => {
              supplier.products.forEach(p => handleShortlist(p.productId));
            }}
            className="btn-secondary py-3 px-6 flex items-center gap-2"
          >
            <Clipboard className="w-5 h-5" /> Add All to Shortlist
          </button>
        </div>
      </div>
    </div>
  );
}
