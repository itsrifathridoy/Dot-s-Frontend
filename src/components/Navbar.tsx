'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { IoSearchOutline, IoCartOutline, IoPersonOutline } from 'react-icons/io5';
import { MdOutlineTrackChanges, MdHistory } from 'react-icons/md';
import CartItems from './cartitems';
import CollectionsDropdown from './collectionsdropdown';
import ProductsDropdown from './productsdropdown';
import SearchModal from './searchmodal';
import RecentlyViewedModal from './recentlyviewedmodal';
import { useCart } from '../context/CartContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { collectionsData, productsData } from '../data/collectionsCategories';


const Navbar = () => {
  // State for mobile accordion
  const [openCollections, setOpenCollections] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null);
  const [openProducts, setOpenProducts] = useState(false);
  const [openProductCategory, setOpenProductCategory] = useState<string | null>(null);
  const [openMore, setOpenMore] = useState(false);
  const { cartItems } = useCart();
  const { getRecentlyViewedCount } = useRecentlyViewed();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRecentlyViewedOpen, setIsRecentlyViewedOpen] = useState(false);
  const [isCollectionsDropdownOpen, setIsCollectionsDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const pathname = usePathname();
  const activePath = pathname;

  // Close dropdowns when route changes
  useEffect(() => {
    setIsCollectionsDropdownOpen(false);
    setIsProductsDropdownOpen(false);
  }, [activePath]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const recentlyViewedCount = getRecentlyViewedCount();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCollectionsDropdownOpen(false);
        setIsProductsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: 'Collections', href: '/collectionspage', hasDropdown: true, dropdownType: 'collections' },
    { name: 'Products', href: '/products', hasDropdown: true, dropdownType: 'products' },
    { name: 'Store', href: '/store' },
    { name: 'Orders', href: '/orders' },
    { name: 'More', href: '/more' },
  ];

  return (
    <>
      <nav className="w-full max-h-[10dvh] bg-white shadow-sm fixed top-0 left-0 right-0 z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - left side */}
            <Link href="/" className="flex-shrink-0">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Image
                  src="/Images/image.png"
                  alt="Dots Furniture Logo"
                  width={88}
                  height={72}
                  className="object-contain"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation Links - Center */}
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-2 md:mx-8 lg:mx-12" ref={dropdownRef}>
              <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-8">
                {navItems.map((item) => {
                  // Show L-shape for dropdowns if open, or for Store/Orders/More only if route matches
                  const isActive =
                    (item.dropdownType === 'collections' && isCollectionsDropdownOpen) ||
                    (item.dropdownType === 'products' && isProductsDropdownOpen) ||
                    (item.name === 'More' && openMore) ||
                    (item.name !== 'More' && !item.hasDropdown && activePath === item.href);
                  // Ref and state for nav text width
                  const btnRef = useRef(null);
                  const [btnWidth, setBtnWidth] = useState(0);
                  const [isHovered, setIsHovered] = useState(false);
                  useEffect(() => {
                    if (btnRef.current) {
                      setBtnWidth(btnRef.current.offsetWidth);
                    }
                  }, [isActive, activePath]);
                  // Only set width if btnWidth > 0 to avoid overlap on refresh
                  const widthStyle = btnWidth > 0 && (isActive || isHovered) ? { width: btnWidth } : {};
                  const navShapeClass = (isActive || isHovered) ? ' nav-l-shape' : '';
                  // Desktop 'More' dropdown logic
                  if (item.name === 'More') {
                    // Click-only More dropdown, closes on outside click
                    useEffect(() => {
                      if (!openMore) return;
                      const handleClick = (e) => {
                        if (btnRef.current && !btnRef.current.contains(e.target)) {
                          setOpenMore(false);
                        }
                      };
                      document.addEventListener('mousedown', handleClick);
                      return () => document.removeEventListener('mousedown', handleClick);
                    }, [openMore]);
                    return (
                      <div
                        key={item.href}
                        className="relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <button
                          ref={btnRef}
                          type="button"
                          className={`text-black hover:text-gray-600 transition-colors font-medium text-sm uppercase tracking-wide py-3 md:py-4 px-2 relative group${navShapeClass} hidden sm:inline-block`}
                          style={widthStyle}
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenMore((prev) => {
                              const next = !prev;
                              if (next) {
                                setIsCollectionsDropdownOpen(false);
                                setIsProductsDropdownOpen(false);
                              }
                              return next;
                            });
                          }}
                        >
                          {item.name}
                        </button>
                        {/* Small More dropdown */}
                        {openMore && (
                          <div className="absolute left-0 top-full mt-2 w-56 bg-white shadow-lg border border-gray-200 rounded z-50">
                            {[
                              { label: 'Product Verification', href: '/product-verification' },
                              { label: 'Delivery Tracker', href: '/delivery-tracker' },
                              { label: 'Service Request', href: '/service-request' },
                              { label: 'About Us', href: '/about' },
                              { label: 'Help', href: '/help' },
                            ].map((more) => (
                              <Link
                                key={more.href}
                                href={more.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#f5eaea] hover:text-[#a12a2a] transition-colors"
                                onClick={() => setOpenMore(false)}
                              >
                                {more.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  // All other nav items
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <div className="flex items-center">
                        {item.hasDropdown ? (
                          <button
                            ref={btnRef}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.dropdownType === 'collections') {
                                setIsCollectionsDropdownOpen(!isCollectionsDropdownOpen);
                                setIsProductsDropdownOpen(false);
                              }
                              if (item.dropdownType === 'products') {
                                setIsProductsDropdownOpen(!isProductsDropdownOpen);
                                setIsCollectionsDropdownOpen(false);
                              }
                            }}
                            className={`text-black hover:text-gray-600 transition-colors font-medium text-sm uppercase tracking-wide py-3 md:py-4 px-2 relative group${navShapeClass} hidden sm:inline-block`}
                            style={widthStyle}
                          >
                            {item.name}
                          </button>
                        ) : (
                          <Link
                            ref={btnRef}
                            href={item.href}
                            className={`text-black hover:text-gray-600 transition-colors font-medium text-sm uppercase tracking-wide py-3 md:py-4 px-2 relative group${navShapeClass} hidden sm:inline-block`}
                            style={widthStyle}
                            onClick={() => {
                              setIsCollectionsDropdownOpen(false);
                              setIsProductsDropdownOpen(false);
                            }}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                      {/* Dropdowns */}
                      {item.dropdownType === 'collections' && isCollectionsDropdownOpen && (
                        <CollectionsDropdown isOpen={isCollectionsDropdownOpen} />
                      )}
                      {item.dropdownType === 'products' && isProductsDropdownOpen && (
                        <ProductsDropdown isOpen={isProductsDropdownOpen} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right side - Search, Cart, Track Order, Recently Viewed, Profile */}
            <div className="flex items-center justify-end gap-1 sm:gap-1 h-full">
              {/* Search Icon */}
              <div 
                className="relative group h-full flex items-center cursor-pointer hover:bg-gray-50 px-2 transition-all duration-200"
                onClick={() => setIsSearchOpen(true)}
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#7A1315] to-[#a11618] opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="flex items-center justify-center text-gray-600 group-hover:text-black transition-colors h-10 w-10">
                  <IoSearchOutline className="w-5 h-5" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  Search
                </div>
              </div>

              {/* Cart Icon */}
              <div 
                className="relative group h-full flex items-center cursor-pointer hover:bg-gray-50 px-2 transition-all duration-200"
                onClick={() => setIsCartOpen(true)}
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#7A1315] to-[#a11618] opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="flex items-center justify-center text-gray-600 group-hover:text-black transition-colors relative h-10 w-10">
                  <IoCartOutline className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px]">
                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </span>
                  )}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  Cart ({cartItemCount})
                </div>
              </div>

              {/* Track Order Icon */}
              <Link href="/track-order" className="relative group h-full flex items-center cursor-pointer hover:bg-gray-50 px-2 transition-all duration-200 hidden lg:flex">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#7A1315] to-[#a11618] opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="flex items-center justify-center text-gray-600 group-hover:text-black transition-colors h-10 w-10">
                  <MdOutlineTrackChanges className="w-5 h-5" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  Track Order
                </div>
              </Link>

              {/* Recently Viewed Icon */}
              <div 
                className="relative group h-full flex items-center cursor-pointer hover:bg-gray-50 px-2 transition-all duration-200 hidden lg:flex"
                onClick={() => setIsRecentlyViewedOpen(true)}
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#7A1315] to-[#a11618] opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="flex items-center justify-center text-gray-600 group-hover:text-black transition-colors relative h-10 w-10">
                  <MdHistory className="w-5 h-5" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  Recently Viewed
                </div>
              </div>

              {/* Profile Icon */}
              <Link href="/signin" className="relative group h-full flex items-center cursor-pointer hover:bg-gray-50 px-2 transition-all duration-200">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#7A1315] to-[#a11618] opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="flex items-center justify-center text-gray-600 group-hover:text-black transition-colors h-10 w-10">
                  <IoPersonOutline className="w-5 h-5" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  Profile
                </div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-600 hover:text-black transition-colors ml-2"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Side Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setIsMobileMenuOpen(false)} />
            {/* Drawer */}
            <div className="relative w-80 max-w-[90vw] h-full bg-[#fafbfc] shadow-2xl flex flex-col animate-slideInLeft">
              {/* Header: Logo and Close */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <div className="flex items-center">
                  <Image src="/Images/image.png" alt="Dots Furniture Logo" width={110} height={90} className="object-contain" />
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-2xl text-gray-700 hover:text-black p-2 focus:outline-none">
                  &times;
                </button>
              </div>
              {/* Nav Items */}
              <nav className="flex-1 overflow-y-auto px-2 py-2">
                {navItems.map((item) => (
                  <div key={item.href} className="mb-1">
                    {/* Collections: Nested Accordion */}
                    {item.name === 'Collections' ? (
                      <>
                        <button
                          className={`w-full text-black hover:text-[#a12a2a] transition-colors font-semibold text-base uppercase tracking-wide py-2 px-3 rounded flex items-center justify-between ${openCollections ? 'bg-[#f5eaea] text-[#a12a2a]' : ''}`}
                          onClick={() => setOpenCollections((prev) => !prev)}
                        >
                          <span>Collections</span>
                          <svg className={`w-4 h-4 ml-2 transition-transform ${openCollections ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                        <div className={`transition-all duration-200 ${openCollections ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white border-l-2 border-[#f5eaea] ml-2`}
                          style={{ minWidth: 0 }}
                        >
                          {collectionsData.map((cat) => (
                            <div key={cat.name}>
                              <button
                                className={`w-full flex items-center justify-between text-left text-sm text-gray-700 py-2 px-4 focus:outline-none hover:bg-gray-100 rounded ${openCategory === cat.name ? 'font-bold text-[#a12a2a]' : ''}`}
                                onClick={() => setOpenCategory(openCategory === cat.name ? null : cat.name)}
                              >
                                <span>{cat.name}</span>
                                {cat.categories && cat.categories.length > 0 && (
                                  <svg className={`w-4 h-4 ml-2 transition-transform ${openCategory === cat.name ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                )}
                              </button>
                              {/* Subcategories Accordion */}
                              {cat.categories && cat.categories.length > 0 && (
                                <div className={`transition-all duration-200 ${openCategory === cat.name ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden ml-4 border-l border-[#f5eaea]`}
                                  style={{ minWidth: 0 }}
                                >
                                  {cat.categories.map((category) => (
                                    <div key={category.name}>
                                      <button
                                        className={`w-full flex items-center justify-between text-left text-xs text-gray-700 py-2 px-4 focus:outline-none hover:bg-gray-100 rounded ${openSubcategory === category.name ? 'font-bold text-[#a12a2a]' : ''}`}
                                        onClick={() => setOpenSubcategory(openSubcategory === category.name ? null : category.name)}
                                      >
                                        <span>{category.name}</span>
                                        {category.subcategories && category.subcategories.length > 0 && (
                                          <svg className={`w-4 h-4 ml-2 transition-transform ${openSubcategory === category.name ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                        )}
                                      </button>
                                      {/* Sub-subcategories Accordion */}
                                      {category.subcategories && category.subcategories.length > 0 && (
                                        <div className={`transition-all duration-200 ${openSubcategory === category.name ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden ml-4 border-l border-[#f5eaea]`}
                                          style={{ minWidth: 0 }}
                                        >
                                          {category.subcategories.map((subcategory) => (
                                            <div key={subcategory.name} className="py-1 px-4 text-xs text-gray-600 hover:text-[#a12a2a] cursor-pointer">
                                              {subcategory.name}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : item.name === 'Products' ? (
                      <>
                        <button
                          className={`w-full text-black hover:text-[#a12a2a] transition-colors font-semibold text-base uppercase tracking-wide py-2 px-3 rounded flex items-center justify-between ${openProducts ? 'bg-[#f5eaea] text-[#a12a2a]' : ''}`}
                          onClick={() => setOpenProducts((prev) => !prev)}
                        >
                          <span>Products</span>
                          <svg className={`w-4 h-4 ml-2 transition-transform ${openProducts ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                        <div className={`transition-all duration-200 ${openProducts ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white border-l-2 border-[#f5eaea] ml-2`}
                          style={{ minWidth: 0 }}
                        >
                          {productsData.map((cat) => (
                            <div key={cat.name}>
                              <button
                                className={`w-full flex items-center justify-between text-left text-sm text-gray-700 py-2 px-4 focus:outline-none hover:bg-gray-100 rounded ${openProductCategory === cat.name ? 'font-bold text-[#a12a2a]' : ''}`}
                                onClick={() => setOpenProductCategory(openProductCategory === cat.name ? null : cat.name)}
                              >
                                <span>{cat.name}</span>
                                {cat.items && cat.items.length > 0 && (
                                  <svg className={`w-4 h-4 ml-2 transition-transform ${openProductCategory === cat.name ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                )}
                              </button>
                              {/* Items Accordion */}
                              {cat.items && cat.items.length > 0 && (
                                <div className={`transition-all duration-200 ${openProductCategory === cat.name ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden ml-4 border-l border-[#f5eaea]`}
                                  style={{ minWidth: 0 }}
                                >
                                  {cat.items.map((item) => (
                                    <div key={item} className="py-1 px-4 text-xs text-gray-600 hover:text-[#a12a2a] cursor-pointer">
                                      {item}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : item.name === 'More' ? (
                      <>
                        <button
                          className={`w-full text-black hover:text-[#a12a2a] transition-colors font-semibold text-base uppercase tracking-wide py-2 px-3 rounded flex items-center justify-between ${openMore ? 'bg-[#f5eaea] text-[#a12a2a]' : ''}`}
                          onClick={() => setOpenMore((prev) => !prev)}
                        >
                          <span>More</span>
                          <svg className={`w-4 h-4 ml-2 transition-transform ${openMore ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                        <div className={`transition-all duration-200 ${openMore ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white border-l-2 border-[#f5eaea] ml-2`}
                          style={{ minWidth: 0 }}
                        >
                          {[
                            { label: 'Product Verification', href: '/product-verification' },
                            { label: 'Delivery Tracker', href: '/delivery-tracker' },
                            { label: 'Service Request', href: '/service-request' },
                            { label: 'About Us', href: '/about' },
                            { label: 'Help', href: '/help' },
                          ].map((more) => (
                            <Link
                              key={more.href}
                              href={more.href}
                              className="block py-2 px-4 text-sm text-gray-700 hover:text-[#a12a2a] transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {more.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block w-full text-black hover:text-[#a12a2a] transition-colors font-semibold text-base uppercase tracking-wide py-2 px-3 rounded ${activePath === item.href ? 'bg-[#f5eaea] text-[#a12a2a]' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Mobile-only Track Order and Recently Viewed */}
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-2 font-semibold">Quick Actions</div>
                  
                  {/* Track Order */}
                  <Link
                    href="/track-order"
                    className="flex items-center w-full text-black hover:text-[#a12a2a] transition-colors font-medium text-base py-3 px-3 rounded hover:bg-[#f5eaea] group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <MdOutlineTrackChanges className="w-5 h-5 mr-3 text-gray-600 group-hover:text-[#a12a2a]" />
                    <span>Track Order</span>
                  </Link>
                  
                  {/* Recently Viewed */}
                  <button
                    className="flex items-center w-full text-black hover:text-[#a12a2a] transition-colors font-medium text-base py-3 px-3 rounded hover:bg-[#f5eaea] group"
                    onClick={() => {
                      setIsRecentlyViewedOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <MdHistory className="w-5 h-5 mr-3 text-gray-600 group-hover:text-[#a12a2a]" />
                    <span>Recently Viewed</span>
                    {recentlyViewedCount > 0 && (
                      <span className="ml-auto bg-[#7A1315] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {recentlyViewedCount > 9 ? '9+' : recentlyViewedCount}
                      </span>
                    )}
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Recently Viewed Modal */}
      <RecentlyViewedModal isOpen={isRecentlyViewedOpen} onClose={() => setIsRecentlyViewedOpen(false)} />

      {/* Cart Modal */}
      {isCartOpen && (
        <div>
          <CartItems
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onNavigate={(path) => {
              setIsCartOpen(false);
              router.push(path);
            }}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;