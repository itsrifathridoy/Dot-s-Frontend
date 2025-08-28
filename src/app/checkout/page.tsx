"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { ArrowLeft, MapPin, Truck, CreditCard, Shield, Clock, Phone, Edit, Plus, CheckCircle } from 'lucide-react';

interface Address {
  id: string;
  label: string;
  addressLine: string;
  region: string;
  city: string;
  area: string;
  zone: string;
  postalCode: string;
  phone: string;
  extraPhone?: string;
  additionalInfo?: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'mobile' | 'bank';
  name: string;
  icon: string;
  details?: string;
}

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [deliveryMethod, setDeliveryMethod] = useState<string>('standard');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState<string>('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Available coupons (in real app, this would come from API)
  const availableCoupons = [
    { code: 'SAVE10', discount: 10, type: 'percentage', description: '10% off on orders above ৳2000', minAmount: 2000 },
    { code: 'FLAT500', discount: 500, type: 'fixed', description: '৳500 off on orders above ৳5000', minAmount: 5000 },
    { code: 'NEWUSER', discount: 15, type: 'percentage', description: '15% off for new users', minAmount: 1000 },
    { code: 'FURNITURE20', discount: 20, type: 'percentage', description: '20% off on furniture', minAmount: 3000 },
    { code: 'WELCOME', discount: 200, type: 'fixed', description: '৳200 off on first order', minAmount: 1500 }
  ];

  // Mock saved addresses (in real app, this would come from API)
  const savedAddresses: Address[] = [
    {
      id: '1',
      label: 'Home',
      addressLine: 'Jl. Sudirman No. 123, Apartment Block A, Unit 15',
      region: 'Dhaka',
      city: 'Dhaka',
      area: 'Dhanmondi',
      zone: 'Dhanmondi 15',
      postalCode: '1209',
      phone: '+880 1711 111111',
      extraPhone: '+880 1611 111111',
      additionalInfo: 'Near the main gate, blue building',
      isDefault: true
    },
    {
      id: '2',
      label: 'Office',
      addressLine: 'House 45, Road 12, Block C, Banani',
      region: 'Dhaka',
      city: 'Dhaka',
      area: 'Banani',
      zone: 'Banani Commercial Area',
      postalCode: '1213',
      phone: '+880 1722 222222',
      isDefault: false
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    { id: 'bkash', type: 'mobile', name: 'bKash', icon: '📱', details: '**** **** **** 1234' },
    { id: 'nagad', type: 'mobile', name: 'Nagad', icon: '💳', details: '**** **** **** 5678' },
    { id: 'rocket', type: 'mobile', name: 'Rocket', icon: '🚀', details: '**** **** **** 9012' },
    { id: 'card', type: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'bank', type: 'bank', name: 'Bank Transfer', icon: '🏦' },
    { id: 'cod', type: 'mobile', name: 'Cash on Delivery', icon: '💵' }
  ];

  const deliveryOptions = [
    { id: 'standard', name: 'Standard Delivery', time: '5-7 business days', cost: 100, description: 'Free for orders over ৳5000' },
    { id: 'express', name: 'Express Delivery', time: '2-3 business days', cost: 200, description: 'Faster delivery' },
    { id: 'premium', name: 'Premium Delivery', time: 'Next business day', cost: 500, description: 'White glove service' }
  ];

  useEffect(() => {
    // Set default address
    const defaultAddr = savedAddresses.find(addr => addr.isDefault);
    if (defaultAddr) {
      setSelectedAddress(defaultAddr.id);
    }
    
    // Redirect if cart is empty
    if (cartItems.length === 0) {
      window.location.href = '/cart';
    }
  }, [cartItems]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getDeliveryCost = () => {
    const option = deliveryOptions.find(opt => opt.id === deliveryMethod);
    const subtotal = calculateSubtotal();
    
    if (deliveryMethod === 'standard' && subtotal >= 5000) {
      return 0; // Free standard delivery for orders over 5000
    }
    
    return option?.cost || 0;
  };

  const calculateCouponDiscount = () => {
    if (!appliedCoupon) return 0;
    
    const subtotal = calculateSubtotal();
    if (appliedCoupon.type === 'percentage') {
      return subtotal * (appliedCoupon.discount / 100);
    }
    return appliedCoupon.discount;
  };

  const calculateTax = () => {
    const subtotalAfterDiscount = calculateSubtotal() - calculateCouponDiscount();
    return subtotalAfterDiscount * 0.05; // 5% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + getDeliveryCost() + calculateTax() - calculateCouponDiscount();
  };

  const handleApplyCoupon = async () => {
    setIsApplyingCoupon(true);
    setCouponError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const coupon = availableCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    const subtotal = calculateSubtotal();
    
    if (!coupon) {
      setCouponError('Invalid coupon code');
    } else if (subtotal < coupon.minAmount) {
      setCouponError(`Minimum order amount of ৳${coupon.minAmount} required for this coupon`);
    } else if (appliedCoupon && appliedCoupon.code === coupon.code) {
      setCouponError('This coupon is already applied');
    } else {
      setAppliedCoupon(coupon);
      setCouponCode('');
      setCouponError('');
    }
    
    setIsApplyingCoupon(false);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setOrderSuccess(true);
    
    // Clear cart after successful order
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  const getSelectedAddress = () => {
    return savedAddresses.find(addr => addr.id === selectedAddress);
  };

  const getSelectedPaymentMethod = () => {
    return paymentMethods.find(method => method.id === selectedPayment);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Your order has been confirmed and will be delivered soon.</p>
          <p className="text-sm text-gray-500 mb-8">Order ID: #CTH-{Date.now()}</p>
          <div className="space-y-3">
            <Link 
              href="/orders" 
              className="w-full bg-[#861718] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#A82B2B] transition-colors block"
            >
              Track Your Order
            </Link>
            <Link 
              href="/products" 
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-8">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link 
            href="/cart" 
            className="inline-flex items-center text-gray-600 hover:text-[#861718] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-[#861718] text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-12 sm:w-20 h-0.5 ${
                    step < currentStep ? 'bg-[#861718]' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          
          <div className="flex justify-center space-x-8 text-sm">
            <span className={currentStep >= 1 ? 'text-[#861718] font-medium' : 'text-gray-500'}>
              Address
            </span>
            <span className={currentStep >= 2 ? 'text-[#861718] font-medium' : 'text-gray-500'}>
              Payment
            </span>
            <span className={currentStep >= 3 ? 'text-[#861718] font-medium' : 'text-gray-500'}>
              Review
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            
            {/* Step 1: Address Selection */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Delivery Address
                  </h2>
                  <Link 
                    href="/saved-address" 
                    className="text-[#861718] hover:text-[#A82B2B] font-medium text-sm flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add New
                  </Link>
                </div>

                <div className="space-y-4">
                  {savedAddresses.map((address) => (
                    <div key={address.id} className="border border-gray-200 rounded-xl p-4 sm:p-6">
                      <div className="flex items-start gap-4">
                        <input
                          type="radio"
                          id={address.id}
                          name="address"
                          value={address.id}
                          checked={selectedAddress === address.id}
                          onChange={(e) => setSelectedAddress(e.target.value)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{address.label}</h3>
                            {address.isDefault && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="space-y-1 text-gray-600 text-sm">
                            <p>{address.addressLine}</p>
                            <p>{address.zone}, {address.area}</p>
                            <p>{address.city}, {address.region} {address.postalCode}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {address.phone}
                              </span>
                              {address.extraPhone && (
                                <span className="flex items-center gap-1 text-xs">
                                  <Phone className="w-3 h-3" />
                                  {address.extraPhone} (Extra)
                                </span>
                              )}
                            </div>
                            {address.additionalInfo && (
                              <p className="text-xs italic mt-2 p-2 bg-gray-50 rounded">
                                "{address.additionalInfo}"
                              </p>
                            )}
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Options */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    Delivery Options
                  </h3>
                  <div className="space-y-3">
                    {deliveryOptions.map((option) => (
                      <div key={option.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            id={option.id}
                            name="delivery"
                            value={option.id}
                            checked={deliveryMethod === option.id}
                            onChange={(e) => setDeliveryMethod(e.target.value)}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">{option.name}</h4>
                              <span className="font-semibold text-gray-900">
                                {option.id === 'standard' && calculateSubtotal() >= 5000 
                                  ? 'Free' 
                                  : `৳${option.cost}`
                                }
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {option.time}
                              </span>
                              <span>{option.description}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleNextStep}
                    disabled={!selectedAddress}
                    className="bg-[#861718] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#A82B2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Payment
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#861718] transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          id={method.id}
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                        />
                        <div className="text-2xl">{method.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{method.name}</h4>
                          {method.details && (
                            <p className="text-sm text-gray-500">{method.details}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Special Instructions */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Instructions</h3>
                  <textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    rows={4}
                    placeholder="Any special delivery instructions or notes..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent resize-none"
                  />
                </div>

                {/* Coupon Code */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply Coupon</h3>
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponCode}
                      className="bg-[#861718] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#A82B2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isApplyingCoupon ? 'Applying...' : 'Apply'}
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-sm text-red-500 mt-2">{couponError}</p>
                  )}
                  {appliedCoupon && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-800 font-medium">
                          {appliedCoupon.description}
                        </p>
                        <p className="text-xs text-green-600">
                          Code: {appliedCoupon.code}
                        </p>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handlePrevStep}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={!selectedPayment}
                    className="bg-[#861718] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#A82B2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Review Order
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Order Summary */}
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Order Review</h2>

                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                          <p className="text-sm text-gray-500">Color: {item.color}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                            <span className="font-medium text-gray-900">৳{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
                  {getSelectedAddress() && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{getSelectedAddress()!.label}</h4>
                        <button onClick={() => setCurrentStep(1)} className="text-[#861718] text-sm hover:underline">
                          Change
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {getSelectedAddress()!.addressLine}<br />
                        {getSelectedAddress()!.zone}, {getSelectedAddress()!.area}<br />
                        {getSelectedAddress()!.city}, {getSelectedAddress()!.region} {getSelectedAddress()!.postalCode}
                      </p>
                    </div>
                  )}
                </div>

                {/* Payment Info */}
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                  {getSelectedPaymentMethod() && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getSelectedPaymentMethod()!.icon}</span>
                          <span className="font-medium text-gray-900">{getSelectedPaymentMethod()!.name}</span>
                        </div>
                        <button onClick={() => setCurrentStep(2)} className="text-[#861718] text-sm hover:underline">
                          Change
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handlePrevStep}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="bg-[#861718] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#A82B2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>৳{calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>{getDeliveryCost() === 0 ? 'Free' : `৳${getDeliveryCost().toLocaleString()}`}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-gray-600">
                    <span>Coupon Discount</span>
                    <span>-৳{calculateCouponDiscount().toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax (5%)</span>
                  <span>৳{calculateTax().toLocaleString()}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>৳{calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Shield className="w-4 h-4" />
                <span>Secure checkout with SSL encryption</span>
              </div>

              {/* Mini cart items */}
              <div className="max-h-40 overflow-y-auto space-y-2">
                {cartItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex gap-2 text-sm">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 line-clamp-1">{item.name}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <p className="text-sm text-gray-500 text-center">
                    +{cartItems.length - 3} more items
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;