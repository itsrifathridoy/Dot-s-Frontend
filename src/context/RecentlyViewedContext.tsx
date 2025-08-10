'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  viewedAt: number;
}

interface RecentlyViewedContextType {
  recentProducts: Product[];
  addToRecentlyViewed: (product: Omit<Product, 'viewedAt'>) => void;
  removeFromRecentlyViewed: (productId: string) => void;
  clearRecentlyViewed: () => void;
  getRecentlyViewedCount: () => number;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const MAX_RECENT_PRODUCTS = 20;

export const RecentlyViewedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      try {
        const products = JSON.parse(stored);
        // Ensure proper type conversion and sort by viewedAt (most recent first)
        const typedProducts = products.map((product: any) => ({
          ...product,
          price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
          viewedAt: typeof product.viewedAt === 'string' ? parseInt(product.viewedAt) : product.viewedAt
        }));
        const sortedProducts = typedProducts.sort((a: Product, b: Product) => b.viewedAt - a.viewedAt);
        setRecentProducts(sortedProducts);
      } catch (error) {
        console.error('Error parsing recently viewed products:', error);
        setRecentProducts([]);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever recentProducts changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('recentlyViewed', JSON.stringify(recentProducts));
    }
  }, [recentProducts, isLoaded]);

  // Add a product to recently viewed
  const addToRecentlyViewed = useCallback((product: Omit<Product, 'viewedAt'>) => {
    const newProduct: Product = {
      ...product,
      viewedAt: Date.now()
    };

    setRecentProducts(prevProducts => {
      // Remove the product if it already exists
      const filteredProducts = prevProducts.filter(p => p.id !== product.id);
      
      // Add the new product at the beginning
      const updatedProducts = [newProduct, ...filteredProducts];
      
      // Keep only the last MAX_RECENT_PRODUCTS
      return updatedProducts.slice(0, MAX_RECENT_PRODUCTS);
    });
  }, []);

  // Remove a product from recently viewed
  const removeFromRecentlyViewed = useCallback((productId: string) => {
    setRecentProducts(prevProducts => 
      prevProducts.filter(p => p.id !== productId)
    );
  }, []);

  // Clear all recently viewed products
  const clearRecentlyViewed = useCallback(() => {
    setRecentProducts([]);
    localStorage.removeItem('recentlyViewed');
  }, []);

  // Get recently viewed count
  const getRecentlyViewedCount = useCallback(() => recentProducts.length, [recentProducts.length]);

  const value: RecentlyViewedContextType = {
    recentProducts,
    addToRecentlyViewed,
    removeFromRecentlyViewed,
    clearRecentlyViewed,
    getRecentlyViewedCount
  };

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = (): RecentlyViewedContextType => {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};

export default RecentlyViewedContext;
