'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, AddOnItem, BlogPost } from '@/lib/types';
import { PRODUCTS, BLOG_POSTS, BUSINESS_INFO } from '@/lib/data';

export interface LocationState {
  state: string;
  postcode: string;
  city: string;
  deliveryDays: string;
  shippingFee: number;
}

interface AppContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedAddOns?: AddOnItem[]) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotal: number;
  cryptoDiscountAmount: number;
  isCryptoPayment: boolean;
  setIsCryptoPayment: (active: boolean) => void;
  shippingCost: number;
  currentLocation: LocationState;
  setCurrentLocation: (loc: LocationState) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  compareList: Product[];
  toggleCompare: (prod: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
  subcategoryFilter: string;
  setSubcategoryFilter: (sub: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeBlog: BlogPost | null;
  setActiveBlog: (post: BlogPost | null) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (prod: Product | null) => void;
  viewProduct: (productOrSlug: Product | string) => void;
  viewBlog: (blogOrSlug: BlogPost | string) => void;
  notification: string | null;
  setNotification: (msg: string | null) => void;
  isFinderOpen: boolean;
  setIsFinderOpen: (open: boolean) => void;
}

const DEFAULT_LOCATION: LocationState = {
  state: 'QLD',
  postcode: '4000',
  city: 'Brisbane Metro',
  deliveryDays: '2-3 Business Days',
  shippingFee: 0,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ebikes_cart_v1');
        if (saved) {
          return JSON.parse(saved);
        }
      } catch {
        // ignore
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCryptoPayment, setIsCryptoPayment] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationState>(DEFAULT_LOCATION);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [compareList, setCompareList] = useState<Product[]>([]);

  // Initialize view from URL if in browser
  const [currentView, setCurrentView] = useState<string>(() => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname;
    if (path.startsWith('/product/')) return 'product';
    if (path.startsWith('/blog/')) return 'blog-detail';
    if (path.startsWith('/ebikes') || path.startsWith('/e-bikes')) return 'ebikes';
    if (path.startsWith('/scooters')) return 'scooters';
    if (path.startsWith('/accessories')) return 'accessories';
    if (path.startsWith('/parts')) return 'parts';
    if (path.startsWith('/shop')) return 'shop';
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/contact')) return 'contact';
    if (path.startsWith('/wholesale')) return 'wholesale';
    if (path.startsWith('/compare')) return 'compare';
    if (path.startsWith('/legal')) return 'legal';
    if (path.startsWith('/brands')) return 'brands';
    if (path.startsWith('/faq')) return 'faq';
    if (path.startsWith('/blog')) return 'blog';
    return 'home';
  });

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [subcategoryFilter, setSubcategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(() => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname;
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '').replace(/\/$/, '');
      return BLOG_POSTS.find((b) => b.slug === slug || b.id === slug) || null;
    }
    return null;
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(() => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname;
    if (path.startsWith('/product/')) {
      const slug = path.replace('/product/', '').replace(/\/$/, '');
      return PRODUCTS.find((p) => p.slug === slug || p.id === slug) || null;
    }
    return null;
  });

  const [notification, setNotification] = useState<string | null>(null);
  const [isFinderOpen, setIsFinderOpen] = useState(false);

  // Subscribe to browser back/forward history navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/product/')) {
        const slug = path.replace('/product/', '').replace(/\/$/, '');
        const found = PRODUCTS.find((p) => p.slug === slug);
        if (found) {
          setSelectedProduct(found);
          setCurrentView('product');
        }
      } else if (path.startsWith('/blog/')) {
        const slug = path.replace('/blog/', '').replace(/\/$/, '');
        const found = BLOG_POSTS.find((b) => b.slug === slug);
        if (found) {
          setActiveBlog(found);
          setCurrentView('blog-detail');
        }
      } else if (path === '/' || path === '') {
        setCurrentView('home');
      } else if (path.startsWith('/ebikes') || path.startsWith('/e-bikes')) {
        setCurrentView('ebikes');
      } else if (path.startsWith('/scooters')) {
        setCurrentView('scooters');
      } else if (path.startsWith('/accessories')) {
        setCurrentView('accessories');
      } else if (path.startsWith('/parts')) {
        setCurrentView('parts');
      } else if (path.startsWith('/shop')) {
        setCurrentView('shop');
      } else if (path.startsWith('/about')) {
        setCurrentView('about');
      } else if (path.startsWith('/contact')) {
        setCurrentView('contact');
      } else if (path.startsWith('/wholesale')) {
        setCurrentView('wholesale');
      } else if (path.startsWith('/compare')) {
        setCurrentView('compare');
      } else if (path.startsWith('/legal')) {
        setCurrentView('legal');
      } else if (path.startsWith('/brands')) {
        setCurrentView('brands');
      } else if (path.startsWith('/faq')) {
        setCurrentView('faq');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const viewProduct = (productOrSlug: Product | string) => {
    let prod: Product | undefined;
    if (typeof productOrSlug === 'string') {
      prod = PRODUCTS.find((p) => p.slug === productOrSlug || p.id === productOrSlug);
    } else {
      prod = productOrSlug;
    }
    if (prod) {
      setSelectedProduct(prod);
      setCurrentView('product');
      setQuickViewProduct(null);
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', `/product/${prod.slug}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const viewBlog = (blogOrSlug: BlogPost | string) => {
    let post: BlogPost | undefined;
    if (typeof blogOrSlug === 'string') {
      post = BLOG_POSTS.find((b) => b.slug === blogOrSlug || b.id === blogOrSlug);
    } else {
      post = blogOrSlug;
    }
    if (post) {
      setActiveBlog(post);
      setCurrentView('blog-detail');
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', `/blog/${post.slug}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ebikes_cart_v1', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Toast auto-clear
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const addToCart = (
    product: Product, 
    quantity = 1, 
    selectedSize = product.sizeVariants?.[0]?.label || 'Standard', 
    selectedAddOns: AddOnItem[] = []
  ) => {
    setCart((prev) => {
      const cartId = `${product.id}-${selectedSize}-${selectedAddOns.map(a => a.id).sort().join(',')}`;
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          product,
          quantity,
          selectedSize,
          selectedAddOns,
        },
      ];
    });
    setNotification(`Added "${product.name}" to your cart!`);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Subtotal calculation
  const cartSubtotal = cart.reduce((total, item) => {
    const addOnTotal = item.selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
    const sizeDelta = item.product.sizeVariants?.find(v => v.label === item.selectedSize)?.priceDelta || 0;
    const itemUnit = item.product.price + sizeDelta + addOnTotal;
    return total + itemUnit * item.quantity;
  }, 0);

  // Free shipping over threshold ($1500)
  const shippingCost = cartSubtotal >= BUSINESS_INFO.freeDeliveryThreshold || cartSubtotal === 0 ? 0 : 75;

  // 10% Crypto discount
  const cryptoDiscountAmount = isCryptoPayment ? Math.round(cartSubtotal * (BUSINESS_INFO.cryptoDiscountPercentage / 100)) : 0;
  const cartTotal = Math.max(0, cartSubtotal - cryptoDiscountAmount + shippingCost);

  // Compare functions
  const toggleCompare = (prod: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === prod.id);
      if (exists) {
        setNotification(`Removed "${prod.name}" from comparison.`);
        return prev.filter((p) => p.id !== prod.id);
      }
      if (prev.length >= 4) {
        setNotification('You can compare a maximum of 4 e-bikes at once.');
        return prev;
      }
      setNotification(`Added "${prod.name}" to comparison table.`);
      return [...prev, prod];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartTotal,
        cryptoDiscountAmount,
        isCryptoPayment,
        setIsCryptoPayment,
        shippingCost,
        currentLocation,
        setCurrentLocation,
        quickViewProduct,
        setQuickViewProduct,
        compareList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        currentView,
        setCurrentView,
        categoryFilter,
        setCategoryFilter,
        subcategoryFilter,
        setSubcategoryFilter,
        searchQuery,
        setSearchQuery,
        activeBlog,
        setActiveBlog,
        selectedProduct,
        setSelectedProduct,
        viewProduct,
        viewBlog,
        notification,
        setNotification,
        isFinderOpen,
        setIsFinderOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
