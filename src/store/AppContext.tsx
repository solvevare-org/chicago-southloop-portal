import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Category, Product, CartItem, Page } from '../types';
import { supabase, getSessionId } from '../lib/supabase';

type Profile = {
  username: string;
  email: string;
  password: string;
  securityQuestion?: string;
  securityAnswer?: string;
};

interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  categories: Category[];
  cartItems: CartItem[];
  cartCount: number;
  refreshCart: () => Promise<void>;
  isAuthenticated: boolean;
  userName: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  profile: Profile | null;
  updateProfile: (patch: Partial<Profile>) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCategories();
    refreshCart();
    // initialize mock auth from localStorage
    const storedUser = localStorage.getItem('mock_user');
    const storedProfile = localStorage.getItem('mock_profile');

    // ensure there's a profile saved for demo purposes
    if (!storedProfile) {
      const demoProfile: Profile = {
        username: 'demo',
        email: 'demo@example.com',
        password: 'Password123!',
        securityQuestion: '',
        securityAnswer: '',
      };
      localStorage.setItem('mock_profile', JSON.stringify(demoProfile));
      setProfile(demoProfile);
    } else {
      try {
        setProfile(JSON.parse(storedProfile));
      } catch {
        // ignore parse errors
      }
    }

    if (storedUser) {
      setIsAuthenticated(true);
      setUserName(storedUser);
    }
  }, []);

  const loadCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    if (data) setCategories(data);
  };

  const refreshCart = async () => {
    const sessionId = getSessionId();
    const { data } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        size,
        color,
        product:products(*)
      `)
      .eq('session_id', sessionId);

    if (data) {
      setCartItems(data.map(item => ({
        id: item.id,
        product: item.product as unknown as Product,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      })));
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Mock authentication: check against stored profile in localStorage
  const login = async (username: string, password: string) => {
    const storedProfile = localStorage.getItem('mock_profile');
    if (!storedProfile) return false;
    try {
      const p: Profile = JSON.parse(storedProfile);
      if (username === p.username && password === p.password) {
        setIsAuthenticated(true);
        setUserName(username);
        setProfile(p);
        localStorage.setItem('mock_user', username);
        return true;
      }
    } catch (e) {
      // parse error
    }
    return false;
  };

  const updateProfile = (patch: Partial<Profile>) => {
    const stored = localStorage.getItem('mock_profile');
    let p: Profile = {
      username: 'demo',
      email: 'demo@example.com',
      password: 'Password123!',
      securityQuestion: '',
      securityAnswer: '',
    };
    if (stored) {
      try {
        p = JSON.parse(stored);
      } catch {}
    }
    const next = { ...p, ...patch };
    localStorage.setItem('mock_profile', JSON.stringify(next));
    setProfile(next);
    if (next.username) {
      setUserName(next.username);
      // if logged in, keep the mock_user in sync
      if (isAuthenticated) localStorage.setItem('mock_user', next.username);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName(null);
    localStorage.removeItem('mock_user');
    setCurrentPage('home');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        setSelectedProduct,
        categories,
        cartItems,
        cartCount,
        refreshCart,
        isAuthenticated,
        userName,
        login,
        profile,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
