"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import ProductList from '../../components/ProductList';
import HomeCategories from '../../components/homecatagories';
import ProductCategories from '../../components/productCatagories';
import IndustrialCatagories from '../../components/industrialCatagories';
import SaleSection from '../../components/SaleSection';
import Link from 'next/link';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('trending');
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;
  const slides = [
    { 
      src: "/Images/Monsoon-Offer-2.png", 
      alt: "Modern Furniture Collection",
      title: "Sets you as a trend",
      subtitle: "aesthetically stylish setter"
    },
    { 
      src: "/Images/banner-03.jpg", 
      alt: "Premium Sofa Collection",
      title: "Premium Comfort",
      subtitle: "luxury meets functionality"
    },
    { 
      src: "/Images/1380-x-780-slider-1.jpg", 
      alt: "Bedroom Furniture",
      title: "Dream Spaces",
      subtitle: "create your perfect sanctuary"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % slides.length;
        console.log('Advancing to slide:', next); // Debug log
        return next;
      });
    }, 3000); // Reduced to 3 seconds for faster testing
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  // Touch handlers for swipe functionality
  const onTouchStart = (e) => {
    setTouchEnd(null); // Clear any previous touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || isTransitioning) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  console.log('Current slide:', currentSlide); // Debug log

  return (
    <div className="p-2">
      {/* Hero Slider Section */}
      <section className="relative h-[30vh] sm:h-[88dvh]">
        <div 
          className="overflow-hidden rounded-md w-full h-full relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Slides Container with Transform */}
          <div 
            className="flex w-full h-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 relative"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                  width={1920}
                  height={1080}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
          <button 
            onClick={prevSlide}
            className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Dot Indicators - Enhanced for mobile */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-2 sm:space-x-3 z-20 py-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setCurrentSlide(index);
                    setTimeout(() => setIsTransitioning(false), 500);
                  }
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide 
                    ? 'w-8 h-3 sm:w-10 sm:h-4 bg-gradient-to-r from-white via-white/90 to-white scale-110' 
                    : 'w-3 h-3 sm:w-4 sm:h-4 bg-white/40 hover:bg-white/60 active:bg-white/80'
                } focus:outline-none focus:ring-2 focus:ring-white/50`}
                style={{
                  minWidth: index === currentSlide ? '32px' : '12px',
                  minHeight: '12px'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="px-2 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-3">
          <div className="flex flex-col flex-1">
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text leading-tight tracking-tight">
              Crafted Comfort For&nbsp;<span className="whitespace-nowrap bg-gradient-to-r from-[#7A1315] to-[#a11618] bg-clip-text">Everyday Moments</span>
            </h2>
            <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-[#7A1315] to-[#a11618] mt-1 sm:mt-2 rounded-full"></div>
          </div>
          <div className="flex justify-end flex-shrink-0">
            <Link href="/CollectionsPage" className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm lg:text-base font-semibold text-[#7A1315] border border-[#7A1315] rounded-full hover:bg-[#7A1315] hover:text-white hover:ring-2 hover:ring-[#7A1315] hover:ring-offset-2 focus:bg-[#7A1315] focus:text-white active:bg-[#5a0f11] active:border-[#5a0f11] active:scale-95 focus:outline-none transition-all duration-200 group touch-manipulation">
              <span>Explore More</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      
        {/* Grid Layout */}
        <HomeCategories />
      </section>
      
      {/* Trending Products Section */}
      <section className="px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 space-y-4 sm:space-y-6">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 ${
                activeTab === 'trending'
                  ? 'bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white'
                  : 'border-2 border-gray-300 text-gray-700 hover:border-[#7A1315] hover:text-[#7A1315]'
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => setActiveTab('exclusive')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 ${
                activeTab === 'exclusive'
                  ? 'bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white'
                  : 'border-2 border-gray-300 text-gray-700 hover:border-[#7A1315] hover:text-[#7A1315]'
              }`}
            >
              Exclusive
            </button>
            <button
              onClick={() => setActiveTab('hot-deals')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 ${
                activeTab === 'hot-deals'
                  ? 'bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white'
                  : 'border-2 border-gray-300 text-gray-700 hover:border-[#7A1315] hover:text-[#7A1315]'
              }`}
            >
              Hot Deals
            </button>
          </div>

          <div className="mt-6 sm:mt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text mb-3 sm:mb-4 leading-tight tracking-tight">
              Our <span className="bg-gradient-to-r from-[#7A1315] to-[#a11618] bg-clip-text">
                {activeTab === 'trending' && 'Trending'}
                {activeTab === 'exclusive' && 'Exclusive'}
                {activeTab === 'hot-deals' && 'Hot Deals'}
              </span> Products
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-[#7A1315] to-[#a11618] mb-4 sm:mb-5 rounded-full"></div>
            <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6 leading-relaxed font-medium">
              {activeTab === 'trending' && 'Discover what everyone\'s loving right now. These top picks are flying off the shelves!'}
              {activeTab === 'exclusive' && 'Explore our exclusive collection of premium furniture pieces, available only for you.'}
              {activeTab === 'hot-deals' && 'Don\'t miss out on these amazing deals! Limited time offers on our best furniture.'}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#7A1315] border-2 border-[#7A1315] rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-semibold hover:bg-[#7A1315] hover:text-white hover:shadow-lg hover:scale-105 focus:bg-[#7A1315] focus:text-white focus:outline-none active:scale-95 transition-all duration-300 group"
            >
              <span>View All</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </aside>

        {/* Product Grid - Replaced with ProductList component */}
        <div className="w-full lg:w-3/4">
          <ProductList activeTab={activeTab} />
        </div>
      </div>
    </section>

      {/* Category Section */}
      <section className="py-4 sm:py-6 lg:py-8 px-2 sm:px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text mb-3 sm:mb-4 leading-tight tracking-tight">
            Find <span className="bg-gradient-to-r from-[#7A1315] to-[#a11618] bg-clip-text">Everything</span> You Need
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#7A1315] to-[#a11618] mx-auto mb-4 sm:mb-6 lg:mb-8 rounded-full"></div>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 lg:mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
            Explore our comprehensive collection of premium furniture designed to transform every corner of your home
          </p>
        </div>
        <ProductCategories />   

       </section>

      {/* Sale Section */}
      <section className="px-2 sm:px-4 py-4 sm:py-8 bg-white">
        <SaleSection />
      </section>


      {/* Industry Products Section */}
      <section className="px-2 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-3">
          <div className="flex flex-col flex-1">
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text leading-tight tracking-tight">
              Decorate your&nbsp;<span className="whitespace-nowrap bg-gradient-to-r from-[#7A1315] to-[#a11618] bg-clip-text">Every Space</span>
            </h2>
            <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-[#7A1315] to-[#a11618] mt-1 sm:mt-2 rounded-full"></div>
          </div>
          <div className="flex justify-end flex-shrink-0">
            <a href="/CollectionsPage" className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm lg:text-base font-semibold text-[#7A1315] border border-[#7A1315] rounded-full hover:bg-[#7A1315] hover:text-white hover:ring-2 hover:ring-[#7A1315] hover:ring-offset-2 focus:bg-[#7A1315] focus:text-white active:bg-[#5a0f11] active:border-[#5a0f11] active:scale-95 focus:outline-none transition-all duration-200 group touch-manipulation">
              <span>Explore More</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      
        {/* Grid Layout */}
        <div>
          <IndustrialCatagories />
        </div>
      </section>
      
    </div>
  );
};

export default HomePage;