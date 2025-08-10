'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

const SaleSection = () => {
  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  // Sample sale products with dynamic data
  const saleProducts = [
    {
      id: 1,
      name: "Soft Seated Chair",
      category: "Living Room",
      collection: "Modern Sofa's",
      originalPrice: "₹19,500",
      salePrice: "₹12,500",
      startingFrom: "Starting From",
      image: "/Images/DotsSofa1.jpeg",
      banner: "/Images/sale-banner.webp",
      saleTitle: "Time-Bound Deal",
      saleHeading: "Time's Running Out!",
      expiredAt: new Date('2025-12-31T23:59:59').getTime() // Sale expires on this date
    },
    {
      id: 2,
      name: "Modern Sofa Set",
      category: "Living Room",
      collection: "Luxury Collection",
      originalPrice: "₹45,000",
      salePrice: "₹32,000",
      startingFrom: "Starting From",
      image: "/Images/DotsSofa.jpeg",
      banner: "/Images/sale-banner-2.png",
      saleTitle: "Flash Sale",
      saleHeading: "Limited Time Offer!",
      expiredAt: new Date('2025-10-15T23:59:59').getTime() // Sale expires on this date
    },
    {
      id: 3,
      name: "Luxury Armchair",
      category: "Office",
      collection: "Executive Series",
      originalPrice: "₹25,000",
      salePrice: "₹18,000",
      startingFrom: "Starting From",
      image: "/Images/DotsSofa7.jpeg",
      banner: "/Images/sale-banner-3.jpg",
      saleTitle: "Weekend Special",
      saleHeading: "Don't Miss Out!",
      expiredAt: new Date('2025-09-30T23:59:59').getTime() // Sale expires on this date
    }
  ];

  // Calculate time remaining until sale expires
  const calculateTimeLeft = (expiredAt) => {
    const now = new Date().getTime();
    const timeRemaining = expiredAt - now;
    
    if (timeRemaining <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const currentProduct = saleProducts[currentProductIndex];
      const newTimeLeft = calculateTimeLeft(currentProduct.expiredAt);
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentProductIndex]);

  // Update countdown when product changes
  useEffect(() => {
    const currentProduct = saleProducts[currentProductIndex];
    const newTimeLeft = calculateTimeLeft(currentProduct.expiredAt);
    setTimeLeft(newTimeLeft);
  }, [currentProductIndex]);

  const nextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % saleProducts.length);
  };

  const prevProduct = () => {
    setCurrentProductIndex((prev) => (prev - 1 + saleProducts.length) % saleProducts.length);
  };

  const currentProduct = saleProducts[currentProductIndex];

  // Cart functionality
  const cartItem = cartItems.find(item => item.id === currentProduct.id.toString());
  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    const priceNumber = parseFloat(currentProduct.salePrice.replace(/[₹,]/g, ''));
    addToCart({
      id: currentProduct.id.toString(),
      name: currentProduct.name,
      price: priceNumber,
      imageUrl: currentProduct.image,
      color: "Default"
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart();
    } else {
      updateQuantity(currentProduct.id.toString(), newQuantity);
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(currentProduct.id.toString());
  };

  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 mx-auto max-w-7xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div className="mb-6 lg:mb-0">
          <p className="text-sm lg:text-base text-gray-500 mb-2 font-medium tracking-wide uppercase">
            {currentProduct.saleTitle}
          </p>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 leading-tight tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            {currentProduct.saleHeading}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7A1315] to-[#a11618] rounded-full mt-3"></div>
        </div>
        
        {/* Countdown Timer - Responsive sizing and layout */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-1 mt-4 lg:mt-0">
          <div className="text-center">
            <div 
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              {timeLeft.days.toString().padStart(3, '0')}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Days</div>
          </div>
          <span 
            className="text-red-500 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black mx-1 sm:mx-2"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >|</span>
          <div className="text-center">
            <div 
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Hours</div>
          </div>
          <span 
            className="text-red-500 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black mx-1 sm:mx-2"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >|</span>
          <div className="text-center">
            <div 
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Minutes</div>
          </div>
          <span 
            className="text-red-500 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black mx-1 sm:mx-2"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >|</span>
          <div className="text-center">
            <div 
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Seconds</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-center">
        {/* Banner Image - Full width on mobile, 70% on desktop */}
        <div className="w-full lg:w-[70%] rounded-2xl overflow-hidden h-48 sm:h-64 lg:h-80">
          <Image
            src={currentProduct.banner}
            alt={`${currentProduct.saleTitle} - ${currentProduct.saleHeading}`}
            width={800}
            height={320}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Product Card - Full width on mobile, 30% on desktop */}
        <div className="w-full lg:w-[30%] space-y-4 lg:space-y-6 relative">
          {/* Navigation Arrows - Hidden on mobile, positioned outside card on desktop */}
          <button
            onClick={prevProduct}
            className="hidden lg:block absolute left-[-40px] top-1/2 transform -translate-y-1/2 p-2 bg-white hover:bg-gray-100 rounded-full transition-colors z-10 shadow-lg border border-gray-200"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextProduct}
            className="hidden lg:block absolute right-[-40px] top-1/2 transform -translate-y-1/2 p-2 bg-white hover:bg-gray-100 rounded-full transition-colors z-10 shadow-lg border border-gray-200"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Product Card - Responsive sizing */}
          <div className="rounded-xl p-2 sm:p-4 relative w-full sm:w-[280px] lg:w-[250px] h-[380px] sm:h-[420px] mx-auto">
            
            {/* Collection Title - Responsive positioning and sizing */}
            <div className="absolute left-[5px] sm:left-[10px] top-0 w-[calc(100%-10px)] sm:w-[260px] lg:w-[230px] h-[35px] text-black font-extrabold text-[16px] sm:text-[18px] lg:text-[20px] leading-[18px] sm:leading-[20px] lg:leading-[22px] tracking-tight text-center" style={{ fontFamily: 'Orbitron, monospace' }}>
              {currentProduct.collection}
            </div>

            {/* Product Image - Responsive sizing */}
            <div 
              className="absolute left-0 top-[40px] sm:top-[45px] w-full sm:w-[268px] lg:w-[248px] h-[200px] sm:h-[240px] rounded-[10px] overflow-hidden"
              style={{
                boxShadow: "10px 10px 60px 8px rgba(134, 23, 24, 0.57)"
              }}
            >
              <Image
                src={currentProduct.image}
                alt={currentProduct.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 268px, 248px"
              />
            </div>
            
            {/* Price Section Container - Responsive positioning */}
            <div className="absolute left-[3px] sm:left-[6px] top-[175px] sm:top-[215px] w-[calc(100%-6px)] sm:w-[240px] h-[65px]">
              {/* Price Box - Responsive sizing */}
              <div className="absolute left-0 top-[18px] w-[calc(100%-70px)] sm:w-[210px] h-[47px] rounded-[4px] border border-[#861718] bg-[#ffd1d1]">
                {/* Starting From Label - Responsive text */}
                <div className="absolute left-[5px] top-[3px] w-[100px] h-[12px] text-black font-black text-[8px] sm:text-[9px] leading-[12px] tracking-wide" style={{ fontFamily: 'Orbitron, monospace' }}>
                  {currentProduct.startingFrom.toUpperCase()}
                </div>
                
                {/* Current Price - Responsive sizing */}
                <div 
                  className="absolute left-[5px] top-[16px] flex items-baseline font-black text-[18px] sm:text-[20px] leading-[16px] tracking-tight" 
                  style={{ fontFamily: 'Orbitron, monospace' }}
                >
                  <span className="text-black relative strikethrough before:absolute before:content-[''] before:left-0 before:top-1/2 before:right-0 before:border-t before:border-2 before:border-[#861718] before:transform before:rotate-[-5deg]">{currentProduct.originalPrice}</span>
                  <span className="text-[#861718] after:content-['BDT'] after:text-[#861718] after:font-black after:text-[8px] sm:after:text-[10px] after:ml-1 after:tracking-wider">.</span>
                </div>
              </div>
              
              {/* New Price Badge - Responsive positioning */}
              <div
                className="absolute right-0 top-0 w-[80px] sm:w-[100px] h-[30px] ring-2 ring-white rounded-[5px] flex items-center justify-center"
                style={{
                  background: "#861718"
                }}
              >
                <div className="text-left">
                   <div className="text-white text-[6px] sm:text-[7px] font-black leading-[7px] tracking-wide" style={{ fontFamily: 'Orbitron, monospace' }}>
                    NOW
                  </div>
                  <div className="text-white font-black text-[16px] sm:text-[18px] leading-[18px] tracking-tight" style={{ fontFamily: 'Orbitron, monospace' }}>
                    {currentProduct.salePrice}.
                  </div>
                 
                </div>
              </div>
            </div>
            
            {/* Category Label - Responsive positioning */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-[255px] sm:top-[295px] w-[110px] h-[15px] text-[#666666] font-semibold text-[12px] sm:text-[13px] leading-[15px] tracking-wide text-center" style={{ fontFamily: 'Orbitron, monospace' }}>
              {currentProduct.category}
            </div>
            
            {/* Product Name - Responsive positioning and sizing */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-[275px] sm:top-[315px] w-[90%] sm:w-[200px] h-[40px] text-black font-bold text-[16px] sm:text-[18px] leading-[18px] sm:leading-[20px] tracking-tight text-center">
              {currentProduct.name}
            </div>
            
            {/* Add To Cart Button Container - Responsive positioning */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-[320px] sm:top-[365px] w-[90%] sm:w-[210px] h-[48px]">
              {!isInCart ? (
                <button
                  onClick={handleAddToCart}
                  className="w-full font-semibold py-3 rounded-xl transition-all duration-300 text-sm transform bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#7A1315]/30 active:scale-95 group h-[40px]"
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                    </svg>
                    <span className="font-bold tracking-wide transition-all duration-300 text-xs sm:text-sm">
                      Add to Cart
                    </span>
                  </div>
                </button>
              ) : (
                <div className="flex items-center gap-2 h-[40px]">
                  {/* Quantity Controls */}
                  <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden flex-1 h-full shadow-sm">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="p-2 hover:bg-gradient-to-r hover:from-[#7A1315] hover:to-[#a11618] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7A1315]/30 h-full flex items-center justify-center group active:scale-95"
                    >
                      <svg className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                      </svg>
                    </button>
                    <div className="flex-1 text-center font-bold text-lg text-gray-800 h-full flex items-center justify-center bg-gray-50 border-x border-gray-200">
                      {quantity}
                    </div>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-2 hover:bg-gradient-to-r hover:from-[#7A1315] hover:to-[#a11618] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7A1315]/30 h-full flex items-center justify-center group active:scale-95"
                    >
                      <svg className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Enhanced Remove Button */}
                  <button
                    onClick={handleRemoveFromCart}
                    className="p-2 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-500 hover:to-red-600 border-2 border-red-200 hover:border-red-500 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300 h-full flex items-center justify-center group active:scale-95 shadow-sm hover:shadow-md"
                    title="Remove from cart"
                  >
                    <svg className="w-4 h-4 text-red-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation Arrows - Visible only on mobile */}
          <div className="flex lg:hidden justify-center gap-4 mt-4">
            <button
              onClick={prevProduct}
              className="p-3 bg-white hover:bg-gray-100 rounded-full transition-colors shadow-lg border border-gray-200"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextProduct}
              className="p-3 bg-white hover:bg-gray-100 rounded-full transition-colors shadow-lg border border-gray-200"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Product Indicators - Enhanced for mobile */}
          <div className="flex justify-center items-center space-x-2 sm:space-x-3 mt-4 py-2">
            {saleProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProductIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentProductIndex 
                    ? 'w-8 h-3 sm:w-10 sm:h-4 bg-gradient-to-r from-[#7A1315] to-[#a11618] scale-110' 
                    : 'w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 hover:bg-gray-400 active:bg-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-[#7A1315]/50`}
                style={{
                  minWidth: index === currentProductIndex ? '32px' : '12px',
                  minHeight: '12px'
                }}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleSection;
