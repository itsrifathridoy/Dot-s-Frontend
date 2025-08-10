"use client";

import React from 'react';
import { X, Trash2, ShoppingCart, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Image from 'next/image';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

const CartItems: React.FC<CartProps> = ({ isOpen, onClose, onNavigate }) => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

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
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                <p className="text-sm text-gray-500">Your selected items</p>
              </div>
              <span className="bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white px-3 py-1 rounded-full text-xs font-semibold">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all p-2 rounded-full"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Clear All Button */}
          {cartItems.length > 0 && (
            <div className="px-6 py-3 border-b border-gray-100 bg-red-50">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 text-sm font-semibold hover:underline flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All Items ({cartItems.length})
              </button>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-16 px-6">
                <div className="p-4 bg-gray-200 rounded-full mb-6">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Your cart is empty</h3>
                <p className="text-gray-500 text-center text-sm leading-relaxed max-w-sm">
                  Add some products to your cart and they will appear here. Start shopping now!
                </p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
                  >
                    {/* Product Image */}
                    <Link
                      href={`/IndividualProduct?id=${item.id}`}
                      onClick={onClose}
                      className="flex-shrink-0"
                    >
                      <div className="w-20 h-20 relative bg-gray-100 rounded-xl overflow-hidden group-hover:shadow-lg transition-shadow">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/IndividualProduct?id=${item.id}`} onClick={onClose}>
                        <h3 className="font-semibold text-gray-900 text-base line-clamp-2 hover:text-[#7A1315] transition-colors group-hover:text-[#7A1315]">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        Color: {item.color || 'Default'}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-lg font-bold text-[#7A1315]">
                          {item.price.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' })}
                        </p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-sm text-gray-500">Quantity:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white text-sm font-semibold px-3 py-1 rounded-full min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="flex-shrink-0 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all p-2 rounded-full"
                      aria-label={`Remove ${item.name}`}
                      title="Remove from cart"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-white">
              <div className="space-y-4">
                {/* Total Calculation */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>{calculateTotal().toLocaleString('en-BD', { style: 'currency', currency: 'BDT' })}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-[#7A1315]">{calculateTotal().toLocaleString('en-BD', { style: 'currency', currency: 'BDT' })}</span>
                  </div>
                </div>
                
                {/* Action Button */}
                <Link
                  href="/Cart"
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#8b1719] hover:to-[#b01a1d] hover:shadow-lg transition-all duration-200 text-base flex items-center justify-center group"
                >
                  <span>Checkout</span>
                  <ShoppingCart className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CartItems;