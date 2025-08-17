"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./productcard";
import { products, type Product } from "../data/products";

interface ProductListProps {
  activeTab?: string;
}

const ProductList: React.FC<ProductListProps> = ({ activeTab = 'trending' }) => {
  const [visibleProducts, setVisibleProducts] = useState(8); // Show first 3 rows (5 products per row)
  const [isLoading, setIsLoading] = useState(false);

  // Filter products based on active tab
  const filteredProducts = products.filter(product => product.category === activeTab);

  // Reset visible products when tab changes
  useEffect(() => {
    setVisibleProducts(8);
  }, [activeTab]);

  const showMoreProducts = () => {
    setIsLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleProducts((prev) => prev + 8); // Show 3 more rows
      setIsLoading(false);
    }, 500);
  };

  const displayedProducts = filteredProducts.slice(0, visibleProducts);
  const hasMoreProducts = visibleProducts < filteredProducts.length;

  return (
    <div className="space-y-6">
      <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMoreProducts && (
        <div className="flex flex-col items-center mt-8 sm:mt-10 space-y-4">
          <div className="text-center mb-4">
            <p className="text-gray-600 text-sm sm:text-base">
              Showing {displayedProducts.length} of {filteredProducts.length} products
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2 max-w-xs mx-auto">
              <div 
                className="bg-gradient-to-r from-[#7A1315] to-[#a11618] h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(displayedProducts.length / filteredProducts.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <button
            onClick={showMoreProducts}
            disabled={isLoading}
            className={`group relative overflow-hidden bg-gradient-to-r from-[#7A1315] to-[#a11618] hover:from-[#5a0f11] hover:to-[#7a1315] text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#7A1315]/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${
              isLoading ? 'animate-pulse' : ''
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs sm:text-sm">Loading...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <span className="text-xs sm:text-sm">Load More</span>
                  <div className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs font-medium">
                    +{Math.min(15, filteredProducts.length - displayedProducts.length)}
                  </div>
                </>
              )}
            </div>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;