export interface Supplier {
  id: string;
  name: string;
  businessName: string;
  contact: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  location: string;
  category: string[];
  products: SupplierProduct[];
  rating: number;
  reviewCount: number;
  verified: boolean;
  yearsInBusiness: number;
  businessHours: string;
  description: string;
  status: 'verified' | 'pending' | 'suspended';
}

export interface SupplierProduct {
  productId: string;
  productName: string;
  price: number;
  bulkPrice?: number;
  bulkMinQty?: number;
  unit: string;
  moq: number;
  moqUnit: string;
  availability: 'In Stock' | 'Out of Stock' | 'Limited Stock';
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  unit: string;
  image?: string;
  description: string;
  priceRange: { min: number; max: number };
  supplierCount: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: number;
  supplierCount: number;
  description: string;
}

export interface ShortlistItem {
  supplierId: string;
  productId: string;
  addedAt: string;
}

export interface RecentSearch {
  id: string;
  query: string;
  timestamp: string;
  resultCount: number;
}

export interface FilterState {
  category: string;
  priceMin: number;
  priceMax: number;
  locations: string[];
  moq: string;
  rating: number;
  availability: string;
  sortBy: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export interface User {
  name: string;
  email: string;
  hotelName: string;
  role: 'user' | 'admin';
}
