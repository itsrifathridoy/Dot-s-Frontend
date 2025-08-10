"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

interface Address {
  id: string;
  label: string;
  addressLine: string;
  region: string;
  city: string;
  area: string;
  zone: string;
  postalCode: string;
  isDefault: boolean;
}

const ShoppingCartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [shippingCost, setShippingCost] = useState<number | null>(5.00);
  const [promoCode, setPromoCode] = useState<string>('');
  
  // Mock saved addresses
  const savedAddresses: Address[] = [
    {
      id: '1',
      label: 'Home',
      addressLine: 'Jl. Sudirman No. 123, Apartment Block A, Unit 15',
      region: 'Jakarta',
      city: 'Jakarta Selatan',
      area: 'Kebayoran Baru',
      zone: 'Senayan',
      postalCode: '12190',
      isDefault: true
    },
    {
      id: '2',
      label: 'Office',
      addressLine: 'Jl. Thamrin No. 456, Building B, Floor 10',
      region: 'Jakarta',
      city: 'Jakarta Pusat',
      area: 'Menteng',
      zone: 'Pegangsaan',
      postalCode: '10310',
      isDefault: false
    }
  ];

  const [selectedAddress, setSelectedAddress] = useState<string>(
    savedAddresses.find(addr => addr.isDefault)?.id || savedAddresses[0]?.id || ''
  );

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleApplyPromoCode = () => {
    console.log('Applying promo code:', promoCode);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotalCost = () => {
    const subtotal = calculateSubtotal();
    return shippingCost !== null ? subtotal + shippingCost : subtotal;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Shopping Cart Section */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-2">Shopping Cart</h2>
              <p className="text-black text-sm sm:text-base">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} Items
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-4 sm:pb-6 border-b border-gray-200 last:border-b-0">
                  {/* Product Image and Info */}
                  <div className="flex gap-3 sm:gap-4 flex-1 min-w-0">
                    <Link href={`/products/${item.slug || item.id}`} className="flex-shrink-0">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity" 
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-black text-sm sm:text-base mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-black mb-1 truncate">
                        Color: {item.color || 'Default'}
                      </p>
                      <p className="text-sm sm:text-base font-medium text-black">
                        ৳{item.price.toFixed(2)} BDT
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 text-xs sm:text-sm mt-2 inline-block"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity and Total */}
                  <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors text-black"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 bg-gray-50 text-sm font-medium min-w-[3rem] text-center text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors text-black"
                      >
                        +
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-sm text-black sm:mb-1">Total</p>
                      <p className="font-semibold text-black text-sm sm:text-base whitespace-nowrap">
                        ৳{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {cartItems.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-black mb-2">Your cart is empty</h3>
                <p className="text-black mb-6">Add some items to get started</p>
                <Link 
                  href='/Products' 
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link 
                  href='/Products' 
                  className="inline-flex items-center text-red-600 hover:text-red-700 font-medium text-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          <div className="w-full lg:w-96 bg-white rounded-lg shadow-sm p-4 sm:p-6 h-fit lg:sticky lg:top-4">
            <h2 className="text-lg sm:text-xl font-bold text-black mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-black">
                  Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                </span>
                <span className="font-medium text-black whitespace-nowrap">
                  ৳{calculateSubtotal().toFixed(2)}
                </span>
              </div>

              {/* Shipping Options */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Shipping Options
                </label>
                <select
                  value={shippingCost !== null ? `Standard Delivery - ৳${shippingCost.toFixed(2)}` : ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.includes('৳')) {
                      setShippingCost(parseFloat(value.split('৳')[1]));
                    } else {
                      setShippingCost(null);
                    }
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option>Standard Delivery - ৳5.00</option>
                  <option>Free Shipping - ৳0.00</option>
                </select>
              </div>

              {/* Address Selection */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Delivery Address
                </label>
                <select
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {savedAddresses.map((address) => (
                    <option key={address.id} value={address.id}>
                      {address.label} - {address.zone}, {address.area}
                      {address.isDefault ? ' (Default)' : ''}
                    </option>
                  ))}
                </select>
                <Link 
                  href="/saved-address" 
                  className="inline-block text-red-600 hover:text-red-700 text-xs mt-2 font-medium"
                >
                  Manage Addresses
                </Link>
              </div>

              {/* Promo Code */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  <button
                    onClick={handleApplyPromoCode}
                    className="px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-sm whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-black">Total</span>
                <span className="text-lg font-bold text-black whitespace-nowrap">
                  ৳{calculateTotalCost().toFixed(2)}
                </span>
              </div>
              {shippingCost !== null && (
                <p className="text-xs text-black mt-1">Including shipping</p>
              )}
            </div>

            {/* Checkout Button */}
            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>

            {/* Security Badge */}
            <div className="flex items-center justify-center mt-4 text-xs text-black">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;