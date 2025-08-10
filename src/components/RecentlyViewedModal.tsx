'use client';

import React from 'react';
import { IoClose, IoEyeOutline } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

interface RecentlyViewedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecentlyViewedModal: React.FC<RecentlyViewedModalProps> = ({ isOpen, onClose }) => {
  const { recentProducts, removeFromRecentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Enhanced Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/40"
          onClick={onClose}
        />

        {/* Sidebar Modal */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl flex flex-col border-l border-gray-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[#7A1315] to-[#a11618] rounded-lg">
                <IoEyeOutline className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recently Viewed</h2>
                <p className="text-sm text-gray-500">Your browsing history</p>
              </div>
              <span className="bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white px-3 py-1 rounded-full text-xs font-semibold">
                {recentProducts.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all p-2 rounded-full"
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>

          {/* Clear All Button */}
          {recentProducts.length > 0 && (
            <div className="px-6 py-3 border-b border-gray-100 bg-red-50">
              <button
                onClick={clearRecentlyViewed}
                className="text-red-600 hover:text-red-700 text-sm font-semibold hover:underline flex items-center gap-2 transition-colors"
              >
                <MdDeleteOutline className="w-4 h-4" />
                Clear All Items ({recentProducts.length})
              </button>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {recentProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-16 px-6">
                <div className="p-4 bg-gray-200 rounded-full mb-6">
                  <IoEyeOutline className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">No recently viewed products</h3>
                <p className="text-gray-500 text-center text-sm leading-relaxed max-w-sm">
                  Products you view will appear here for quick access. Start browsing to build your history!
                </p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {recentProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
                  >
                    {/* Product Image */}
                    <Link href={`/IndividualProduct?id=${product.id}`} onClick={onClose} className="flex-shrink-0">
                      <div className="w-20 h-20 relative bg-gray-100 rounded-xl overflow-hidden group-hover:shadow-lg transition-shadow">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/IndividualProduct?id=${product.id}`} onClick={onClose}>
                        <h3 className="font-semibold text-gray-900 text-base line-clamp-2 hover:text-[#7A1315] transition-colors group-hover:text-[#7A1315]">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 mt-1 capitalize">{product.category}</p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-lg font-bold text-[#7A1315]">
                          ${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                          {new Date(product.viewedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromRecentlyViewed(product.id)}
                      className="flex-shrink-0 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all p-2 rounded-full"
                      title="Remove from recently viewed"
                    >
                      <MdDeleteOutline className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {recentProducts.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-white">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Showing {recentProducts.length} of {recentProducts.length} products</span>
                  <span>Last 20 items</span>
                </div>
                <Link
                  href="/products"
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#8b1719] hover:to-[#b01a1d] hover:shadow-lg transition-all duration-200 text-base flex items-center justify-center group"
                >
                  <span>Browse All Products</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RecentlyViewedModal;
