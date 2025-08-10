'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  type: 'product' | 'category' | 'collection';
  title: string;
  description?: string;
  price?: string;
  image?: string;
  url: string;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock search data - replace with your actual data source
  const mockData: SearchResult[] = [
    {
      id: '1',
      type: 'product',
      title: 'Alder Ridge Table',
      description: 'Elegant wooden dining table',
      price: '৳ 12,500 BDT',
      image: '/Images/DotsSofa1.jpeg',
      url: '/IndividualProduct/1'
    },
    {
      id: '2',
      type: 'product',
      title: 'Modern Office Chair',
      description: 'Ergonomic office chair with lumbar support',
      price: '৳ 8,900 BDT',
      image: '/Images/DotsSofa2.jpeg',
      url: '/IndividualProduct/2'
    },
    {
      id: '3',
      type: 'product',
      title: 'ZECNA King Bed Set',
      description: 'King Bed + 2 Nightstands + Dresser Mirror + Mattress',
      price: '৳ 530,000 BDT',
      image: '/Images/bedroom-set.jpg',
      url: '/IndividualProduct/3'
    },
    {
      id: '4',
      type: 'category',
      title: 'Living Room',
      description: 'Sofas, coffee tables, TV units and more',
      url: '/CollectionsPage?category=living'
    },
    {
      id: '5',
      type: 'category',
      title: 'Bedroom',
      description: 'Beds, wardrobes, dressers and nightstands',
      url: '/CollectionsPage?category=bedroom'
    },
    {
      id: '6',
      type: 'collection',
      title: 'Sofa Collection',
      description: 'Premium sofas and seating solutions',
      url: '/Products?collection=sofa'
    }
  ];

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    const timeoutId = setTimeout(() => {
      const filtered = mockData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  const handleResultClick = () => {
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-4 right-4 sm:top-20 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 sm:w-full sm:max-w-2xl bg-white rounded-lg shadow-xl z-50"
          >
            {/* Search Input */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                  autoFocus
                />
                <button
                  onClick={handleClose}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
                  <p className="text-black mt-2">Searching...</p>
                </div>
              ) : searchQuery && searchResults.length === 0 ? (
                <div className="p-8 text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-black">No results found for "{searchQuery}"</p>
                  <p className="text-black text-sm mt-2">Try different keywords or browse our categories</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="p-2">
                  {searchResults.map((result) => (
                    <Link
                      key={result.id}
                      href={result.url}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {result.image && (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={result.image}
                            alt={result.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {!result.image && (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {result.type === 'product' ? (
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          )}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-black truncate">{result.title}</h3>
                        {result.description && (
                          <p className="text-sm text-black truncate">{result.description}</p>
                        )}
                        {result.price && (
                          <p className="text-sm font-semibold text-red-600">{result.price}</p>
                        )}
                        <span className="inline-block px-2 py-1 bg-gray-100 text-xs text-black rounded-full mt-1 capitalize">
                          {result.type}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-black">Start typing to search</p>
                  <p className="text-black text-sm mt-2">Find products, categories, and collections</p>
                </div>
              )}
            </div>

            {/* Quick Links */}
            {!searchQuery && (
              <div className="border-t border-gray-200 p-4">
                <p className="text-sm font-medium text-black mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {['Sofa', 'Dining Table', 'Bed', 'Office Chair', 'Wardrobe'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1 bg-gray-100 text-black text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
