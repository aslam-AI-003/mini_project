import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search, Star, MapPin, Phone, MessageCircle, Heart, Eye,
  SlidersHorizontal, X, ArrowUpDown, CheckCircle, Award
} from 'lucide-react';
import { searchSuppliers, applyFilters, getUniqueLocations, getLowestPrice, SearchResult } from '../services/searchService';
import { useApp } from '../context/AppContext';
import { formatPriceWithUnit } from '../utils/helpers';

export default function FindSuppliers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addRecentSearch, addToShortlist, isShortlisted, addToast } = useApp();

  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [searchExecuted, setSearchExecuted] = useState(!!initialQuery);
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [availability, setAvailability] = useState('all');
  const [moq, setMoq] = useState('any');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);

  const rawResults = useMemo(() => {
    if (!initialQuery) return [];
    return searchSuppliers(initialQuery);
  }, [initialQuery]);

  const filteredResults = useMemo(() => {
    return applyFilters(rawResults, {
      sortBy,
      locations: selectedLocations,
      rating: minRating,
      availability,
      moq,
      priceMin,
      priceMax,
    });
  }, [rawResults, sortBy, selectedLocations, minRating, availability, moq, priceMin, priceMax]);

  const locations = useMemo(() => getUniqueLocations(rawResults), [rawResults]);
  const lowestPriceResult = useMemo(() => getLowestPrice(rawResults), [rawResults]);

  useEffect(() => {
    if (initialQuery && rawResults.length >= 0) {
      addRecentSearch(initialQuery, rawResults.length);
    }
  }, [initialQuery]);

  const handleSearch = () => {
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
      setSearchExecuted(true);
    }
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations(prev =>
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };

  const handleShortlist = (result: SearchResult) => {
    if (isShortlisted(result.supplier.id, result.matchedProduct.productId)) {
      addToast('info', 'Already in your shortlist');
      return;
    }
    addToShortlist({
      supplierId: result.supplier.id,
      productId: result.matchedProduct.productId,
      addedAt: new Date().toISOString(),
    });
    addToast('success', `${result.supplier.name} added to your shortlist.`);
  };

  const clearFilters = () => {
    setSelectedLocations([]);
    setMinRating(0);
    setAvailability('all');
    setMoq('any');
    setPriceMin(0);
    setPriceMax(0);
    setSortBy('recommended');
  };

  return (
    <div className="max-w-7xl mx-auto fade-in">
      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Search products e.g. Basmati Rice, Oil, Sugar..."
            className="input-field pl-12"
          />
        </div>
        <button onClick={handleSearch} className="btn-primary whitespace-nowrap">
          Search
        </button>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn-secondary lg:hidden flex items-center gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {!searchExecuted && !initialQuery ? (
        <div className="text-center py-20">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Search for products</h3>
          <p className="text-gray-500 text-sm">Enter a product name to find wholesale suppliers</p>
        </div>
      ) : (
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`
            ${showFilters ? 'fixed inset-0 z-50 bg-black/50 lg:relative lg:bg-transparent' : 'hidden lg:block'}
          `}>
            <div className={`
              ${showFilters ? 'absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto lg:relative lg:w-64 lg:shadow-none' : 'w-64'}
              flex-shrink-0
            `}>
              <div className="card p-5 sticky top-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-navy-700">Filters</h3>
                  <div className="flex items-center gap-2">
                    <button onClick={clearFilters} className="text-xs text-brand-600 hover:underline">Clear All</button>
                    <button onClick={() => setShowFilters(false)} className="lg:hidden"><X className="w-5 h-5" /></button>
                  </div>
                </div>

                {/* Sort */}
                <div className="mb-5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="input-field text-sm"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Lowest Price</option>
                    <option value="price-high">Highest Price</option>
                    <option value="rating">Highest Rating</option>
                    <option value="moq">Minimum Order</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceMin || ''}
                      onChange={e => setPriceMin(Number(e.target.value))}
                      className="input-field text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceMax || ''}
                      onChange={e => setPriceMax(Number(e.target.value))}
                      className="input-field text-sm"
                    />
                  </div>
                </div>

                {/* Location */}
                {locations.length > 0 && (
                  <div className="mb-5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Location</label>
                    <div className="space-y-2">
                      {locations.map(loc => (
                        <label key={loc} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedLocations.includes(loc)}
                            onChange={() => toggleLocation(loc)}
                            className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                          />
                          <span className="text-sm text-gray-700">{loc}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* MOQ */}
                <div className="mb-5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Minimum Order</label>
                  <div className="space-y-2">
                    {['any', '10', '25', '50', '100'].map(v => (
                      <label key={v} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="moq"
                          checked={moq === v}
                          onChange={() => setMoq(v)}
                          className="text-brand-600 focus:ring-brand-500"
                        />
                        <span className="text-sm text-gray-700">{v === 'any' ? 'Any' : `${v} kg or less`}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Rating</label>
                  <div className="space-y-2">
                    {[0, 4, 3].map(r => (
                      <label key={r} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === r}
                          onChange={() => setMinRating(r)}
                          className="text-brand-600 focus:ring-brand-500"
                        />
                        <span className="text-sm text-gray-700 flex items-center gap-1">
                          {r === 0 ? 'All' : <>{r}★ & above</>}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Availability</label>
                  <div className="space-y-2">
                    {['all', 'In Stock', 'Out of Stock'].map(a => (
                      <label key={a} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="availability"
                          checked={availability === a}
                          onChange={() => setAvailability(a)}
                          className="text-brand-600 focus:ring-brand-500"
                        />
                        <span className="text-sm text-gray-700">{a === 'all' ? 'All' : a}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-navy-700">
                  {initialQuery} Suppliers
                </h2>
                <p className="text-sm text-gray-500">
                  {filteredResults.length} supplier{filteredResults.length !== 1 ? 's' : ''} found
                  {selectedLocations.length > 0 ? ` in ${selectedLocations.join(', ')}` : ' near your preferred location'}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-100 outline-none"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Lowest Price</option>
                  <option value="price-high">Highest Price</option>
                  <option value="rating">Highest Rating</option>
                </select>
              </div>
            </div>

            {filteredResults.length === 0 ? (
              <div className="text-center py-16 card">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-700 mb-1">No suppliers found</h3>
                <p className="text-gray-500 text-sm">Try a different search term or adjust your filters</p>
              </div>
            ) : (
              <>
                {/* Supplier Cards */}
                <div className="space-y-4 mb-8">
                  {filteredResults.map((result) => {
                    const isLowest = lowestPriceResult?.supplier.id === result.supplier.id &&
                      lowestPriceResult?.matchedProduct.productId === result.matchedProduct.productId;
                    const shortlisted = isShortlisted(result.supplier.id, result.matchedProduct.productId);

                    return (
                      <div key={`${result.supplier.id}-${result.matchedProduct.productId}`} className="card p-5 relative">
                        {isLowest && (
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                              <Award className="w-3 h-3" /> BEST PRICE
                            </span>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                          {/* Supplier Icon */}
                          <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center text-brand-700 font-bold text-lg flex-shrink-0">
                            {result.supplier.name.charAt(0)}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-semibold text-navy-700 text-base">
                                  {result.supplier.name}
                                </h3>
                                {result.supplier.verified && (
                                  <span className="inline-flex items-center gap-1 text-xs text-blue-600 mt-0.5">
                                    <CheckCircle className="w-3 h-3" /> Verified Supplier
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mt-1">
                              <span className="font-medium">Product:</span> {result.matchedProduct.productName}
                            </p>

                            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm">
                              <div>
                                <span className="text-gray-500">Price: </span>
                                <span className="font-bold text-navy-700 text-lg">
                                  {formatPriceWithUnit(result.matchedProduct.price, result.matchedProduct.unit)}
                                </span>
                              </div>
                              {result.matchedProduct.bulkPrice && (
                                <div>
                                  <span className="text-gray-500">Bulk: </span>
                                  <span className="font-semibold text-green-600">
                                    ₹{result.matchedProduct.bulkPrice}/{result.matchedProduct.unit}
                                  </span>
                                  <span className="text-xs text-gray-400 ml-1">
                                    for {result.matchedProduct.bulkMinQty}+ {result.matchedProduct.unit}
                                  </span>
                                </div>
                              )}
                              <div>
                                <span className="text-gray-500">MOQ: </span>
                                <span className="font-medium">{result.matchedProduct.moq} {result.matchedProduct.moqUnit}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" /> {result.supplier.location}
                              </span>
                              <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                                result.matchedProduct.availability === 'In Stock' ? 'text-green-600' :
                                result.matchedProduct.availability === 'Limited Stock' ? 'text-orange-600' : 'text-red-500'
                              }`}>
                                <span className={`w-2 h-2 rounded-full ${
                                  result.matchedProduct.availability === 'In Stock' ? 'bg-green-500' :
                                  result.matchedProduct.availability === 'Limited Stock' ? 'bg-orange-500' : 'bg-red-500'
                                }`}></span>
                                {result.matchedProduct.availability}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                <span className="font-medium text-gray-700">{result.supplier.rating}</span>
                              </span>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-2 mt-4">
                              <button
                                onClick={() => navigate(`/supplier/${result.supplier.id}`)}
                                className="btn-primary text-sm py-2 px-4 flex items-center gap-1.5"
                              >
                                <Eye className="w-4 h-4" /> View Details
                              </button>
                              <a
                                href={`https://wa.me/${result.supplier.whatsapp}?text=Hi, I'm interested in ${result.matchedProduct.productName} from SupplyHub.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-whatsapp text-sm py-2"
                              >
                                <MessageCircle className="w-4 h-4" /> WhatsApp
                              </a>
                              <a
                                href={`tel:${result.supplier.contact}`}
                                className="btn-secondary text-sm py-2 px-4 flex items-center gap-1.5"
                              >
                                <Phone className="w-4 h-4" /> Call
                              </a>
                              <button
                                onClick={() => handleShortlist(result)}
                                className={`text-sm py-2 px-4 rounded-lg border transition-colors flex items-center gap-1.5 font-medium ${
                                  shortlisted
                                    ? 'bg-red-50 border-red-200 text-red-600'
                                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${shortlisted ? 'fill-red-500 text-red-500' : ''}`} />
                                {shortlisted ? 'Shortlisted' : 'Shortlist'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Comparison Table */}
                {filteredResults.length > 1 && (
                  <div className="card p-5 overflow-x-auto">
                    <h3 className="text-lg font-bold text-navy-700 mb-4">Compare Supplier Prices</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-3 font-semibold text-gray-600">Supplier</th>
                          <th className="text-left py-3 px-3 font-semibold text-gray-600">Product</th>
                          <th className="text-left py-3 px-3 font-semibold text-gray-600">Price/{filteredResults[0]?.matchedProduct.unit || 'unit'}</th>
                          <th className="text-left py-3 px-3 font-semibold text-gray-600">MOQ</th>
                          <th className="text-left py-3 px-3 font-semibold text-gray-600">Location</th>
                          <th className="text-left py-3 px-3 font-semibold text-gray-600">Rating</th>
                          <th className="text-left py-3 px-3 font-semibold text-gray-600">Availability</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredResults.map(result => {
                          const isLowest = lowestPriceResult?.supplier.id === result.supplier.id &&
                            lowestPriceResult?.matchedProduct.productId === result.matchedProduct.productId;
                          return (
                            <tr
                              key={`table-${result.supplier.id}-${result.matchedProduct.productId}`}
                              className={`border-b border-gray-100 hover:bg-gray-50 ${isLowest ? 'bg-green-50' : ''}`}
                            >
                              <td className="py-3 px-3 font-medium text-gray-800">
                                {result.supplier.name}
                                {result.supplier.verified && (
                                  <CheckCircle className="w-3 h-3 text-blue-500 inline ml-1" />
                                )}
                              </td>
                              <td className="py-3 px-3 text-gray-600">{result.matchedProduct.productName}</td>
                              <td className="py-3 px-3">
                                <span className="font-bold text-navy-700">₹{result.matchedProduct.price}</span>
                                {isLowest && (
                                  <span className="ml-2 bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                    BEST PRICE
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-3 text-gray-600">{result.matchedProduct.moq} {result.matchedProduct.moqUnit}</td>
                              <td className="py-3 px-3 text-gray-600">{result.supplier.location.split(',')[0]}</td>
                              <td className="py-3 px-3">
                                <span className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                  {result.supplier.rating}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                                  result.matchedProduct.availability === 'In Stock' ? 'text-green-600' : 'text-orange-600'
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${
                                    result.matchedProduct.availability === 'In Stock' ? 'bg-green-500' : 'bg-orange-500'
                                  }`}></span>
                                  {result.matchedProduct.availability}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
