import { suppliers } from '../data';
import { Supplier, SupplierProduct, FilterState } from '../types';

export interface SearchResult {
  supplier: Supplier;
  matchedProduct: SupplierProduct;
}

export function searchSuppliers(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  suppliers.forEach(supplier => {
    supplier.products.forEach(product => {
      if (product.productName.toLowerCase().includes(q)) {
        results.push({ supplier, matchedProduct: product });
      }
    });
  });

  return results;
}

export function searchByProductId(productId: string): SearchResult[] {
  const results: SearchResult[] = [];
  suppliers.forEach(supplier => {
    supplier.products.forEach(product => {
      if (product.productId === productId) {
        results.push({ supplier, matchedProduct: product });
      }
    });
  });
  return results;
}

export function searchByCategory(categoryId: string): SearchResult[] {
  const results: SearchResult[] = [];
  suppliers.forEach(supplier => {
    if (supplier.category.includes(categoryId)) {
      supplier.products.forEach(product => {
        results.push({ supplier, matchedProduct: product });
      });
    }
  });
  return results;
}

export function applyFilters(results: SearchResult[], filters: Partial<FilterState>): SearchResult[] {
  let filtered = [...results];

  if (filters.priceMin !== undefined && filters.priceMin > 0) {
    filtered = filtered.filter(r => r.matchedProduct.price >= filters.priceMin!);
  }
  if (filters.priceMax !== undefined && filters.priceMax > 0) {
    filtered = filtered.filter(r => r.matchedProduct.price <= filters.priceMax!);
  }
  if (filters.locations && filters.locations.length > 0) {
    filtered = filtered.filter(r =>
      filters.locations!.some(loc => r.supplier.location.toLowerCase().includes(loc.toLowerCase()))
    );
  }
  if (filters.rating && filters.rating > 0) {
    filtered = filtered.filter(r => r.supplier.rating >= filters.rating!);
  }
  if (filters.availability && filters.availability !== 'all') {
    filtered = filtered.filter(r => r.matchedProduct.availability === filters.availability);
  }
  if (filters.moq && filters.moq !== 'any') {
    const moqValue = parseInt(filters.moq);
    if (!isNaN(moqValue)) {
      filtered = filtered.filter(r => r.matchedProduct.moq <= moqValue);
    }
  }

  // Sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.matchedProduct.price - b.matchedProduct.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.matchedProduct.price - a.matchedProduct.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.supplier.rating - a.supplier.rating);
        break;
      case 'moq':
        filtered.sort((a, b) => a.matchedProduct.moq - b.matchedProduct.moq);
        break;
      default:
        // recommended - sort by rating then price
        filtered.sort((a, b) => {
          if (b.supplier.rating !== a.supplier.rating) return b.supplier.rating - a.supplier.rating;
          return a.matchedProduct.price - b.matchedProduct.price;
        });
    }
  }

  return filtered;
}

export function getUniqueLocations(results: SearchResult[]): string[] {
  const locations = new Set<string>();
  results.forEach(r => {
    const loc = r.supplier.location.split(',')[0].trim();
    locations.add(loc);
  });
  return Array.from(locations).sort();
}

export function getLowestPrice(results: SearchResult[]): SearchResult | null {
  if (results.length === 0) return null;
  return results.reduce((min, r) =>
    r.matchedProduct.price < min.matchedProduct.price ? r : min
  , results[0]);
}
