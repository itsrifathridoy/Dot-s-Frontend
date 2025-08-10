'use client';

import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  viewedAt: number;
}

const MAX_RECENT_PRODUCTS = 20;

export const useRecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      try {
        const products = JSON.parse(stored);
        setRecentProducts(products);
      } catch (error) {
        console.error('Error parsing recently viewed products:', error);
        setRecentProducts([]);
      }
    }
  }, []);

  // Add a product to recently viewed
  const addToRecentlyViewed = (product: Omit<Product, 'viewedAt'>) => {
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
      const limitedProducts = updatedProducts.slice(0, MAX_RECENT_PRODUCTS);
      
      // Save to localStorage
      localStorage.setItem('recentlyViewed', JSON.stringify(limitedProducts));
      
      return limitedProducts;
    });
  };

  // Remove a product from recently viewed
  const removeFromRecentlyViewed = (productId: string) => {
    setRecentProducts(prevProducts => {
      const updatedProducts = prevProducts.filter(p => p.id !== productId);
      localStorage.setItem('recentlyViewed', JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  // Clear all recently viewed products
  const clearRecentlyViewed = () => {
    setRecentProducts([]);
    localStorage.removeItem('recentlyViewed');
  };

  // Get recently viewed count
  const getRecentlyViewedCount = () => recentProducts.length;

  return {
    recentProducts,
    addToRecentlyViewed,
    removeFromRecentlyViewed,
    clearRecentlyViewed,
    getRecentlyViewedCount
  };
};

export default useRecentlyViewed;
