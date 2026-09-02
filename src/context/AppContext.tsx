import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ShortlistItem, RecentSearch, ToastMessage, User } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  shortlist: ShortlistItem[];
  addToShortlist: (item: ShortlistItem) => void;
  removeFromShortlist: (supplierId: string, productId: string) => void;
  isShortlisted: (supplierId: string, productId: string) => boolean;
  recentSearches: RecentSearch[];
  addRecentSearch: (query: string, resultCount: number) => void;
  clearRecentSearches: () => void;
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], message: string) => void;
  removeToast: (id: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [shortlist, setShortlist] = useState<ShortlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('supplyhub_shortlist');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(() => {
    try {
      const saved = localStorage.getItem('supplyhub_recent');
      return saved ? JSON.parse(saved) : [
        { id: '1', query: 'Basmati Rice', timestamp: new Date(Date.now() - 120000).toISOString(), resultCount: 6 },
        { id: '2', query: 'Cooking Oil', timestamp: new Date(Date.now() - 3600000).toISOString(), resultCount: 5 },
        { id: '3', query: 'Chicken', timestamp: new Date(Date.now() - 86400000).toISOString(), resultCount: 1 },
        { id: '4', query: 'Biscuits', timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(), resultCount: 3 },
      ];
    } catch { return []; }
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addToShortlist = useCallback((item: ShortlistItem) => {
    setShortlist(prev => {
      const exists = prev.some(s => s.supplierId === item.supplierId && s.productId === item.productId);
      if (exists) return prev;
      const updated = [...prev, item];
      localStorage.setItem('supplyhub_shortlist', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromShortlist = useCallback((supplierId: string, productId: string) => {
    setShortlist(prev => {
      const updated = prev.filter(s => !(s.supplierId === supplierId && s.productId === productId));
      localStorage.setItem('supplyhub_shortlist', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isShortlisted = useCallback((supplierId: string, productId: string) => {
    return shortlist.some(s => s.supplierId === supplierId && s.productId === productId);
  }, [shortlist]);

  const addRecentSearch = useCallback((query: string, resultCount: number) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.query.toLowerCase() !== query.toLowerCase());
      const updated = [
        { id: Date.now().toString(), query, timestamp: new Date().toISOString(), resultCount },
        ...filtered,
      ].slice(0, 20);
      localStorage.setItem('supplyhub_recent', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('supplyhub_recent');
  }, []);

  const addToast = useCallback((type: ToastMessage['type'], message: string) => {
    const id = Date.now().toString() + Math.random();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <AppContext.Provider value={{
      user, setUser,
      shortlist, addToShortlist, removeFromShortlist, isShortlisted,
      recentSearches, addRecentSearch, clearRecentSearches,
      toasts, addToast, removeToast,
      sidebarOpen, setSidebarOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
