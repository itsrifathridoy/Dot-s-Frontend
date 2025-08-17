"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { products } from '../../data/products';
import ProductCategories from '../../components/productcategories';
import { ArrowLeft, Filter, Grid, List } from 'lucide-react';

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const subcategoryParam = searchParams.get('subcategory');

  // State for filters and view
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(subcategoryParam || 'all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Update filters when URL parameters change
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam.replace(/-/g, ' '));
    }
    if (subcategoryParam) {
      setSelectedSubcategory(subcategoryParam.replace(/-/g, ' '));
    }
  }, [categoryParam, subcategoryParam]);

  // Get unique categories from products
  const categories = useMemo(() => {
    const categorySet = new Set(products.map(product => product.category));
    return Array.from(categorySet).sort();
  }, []);

  // Get subcategories for selected category
  const availableSubcategories = useMemo(() => {
    if (selectedCategory === 'all') return [];
    
    const categoryProducts = products.filter(product => 
      product.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      selectedCategory.toLowerCase().includes(product.category.toLowerCase())
    );
    
    // Extract potential subcategories from product titles
    const subcategories = new Set<string>();
    categoryProducts.forEach(product => {
      const words = product.title.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.length > 3 && !['the', 'and', 'with', 'for', 'table', 'chair'].includes(word)) {
          subcategories.add(word);
        }
      });
    });
    
    return Array.from(subcategories).slice(0, 10);
  }, [selectedCategory]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory.toLowerCase().includes(product.category.toLowerCase())
      );
    }

    // Filter by subcategory
    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(selectedSubcategory.toLowerCase())
      );
    }

    // Filter by price range
    if (priceRange !== 'all') {
      filtered = filtered.filter(product => {
        const price = parseInt(product.price);
        switch (priceRange) {
          case 'under-10000': return price < 10000;
          case '10000-25000': return price >= 10000 && price <= 25000;
          case '25000-50000': return price >= 25000 && price <= 50000;
          case 'over-50000': return price > 50000;
          default: return true;
        }
      });
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseInt(b.price) - parseInt(a.price));
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'reviews':
        filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, selectedSubcategory, priceRange, sortBy]);

  // Build dynamic page title
  const getPageTitle = () => {
    let title = 'All Products';
    if (selectedCategory !== 'all') {
      title = `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`;
    }
    if (selectedSubcategory !== 'all') {
      title += ` - ${selectedSubcategory.charAt(0).toUpperCase() + selectedSubcategory.slice(1)}`;
    }
    return title;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Show ProductCategories only when no filters are applied */}
        {selectedCategory === 'all' && selectedSubcategory === 'all' && (
          <section className="mb-12">
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text mb-4 leading-tight tracking-tight">
                Browse by <span className="bg-gradient-to-r from-[#7A1315] to-[#a11618] bg-clip-text">Category</span>
              </h2>
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#7A1315] to-[#a11618] rounded-full"></div>
            </div>
            <ProductCategories />
          </section>
        )}

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-[#7A1315]">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Products</span>
          {selectedCategory !== 'all' && (
            <>
              <span>/</span>
              <span className="text-gray-900 font-medium capitalize">{selectedCategory}</span>
            </>
          )}
          {selectedSubcategory !== 'all' && (
            <>
              <span>/</span>
              <span className="text-gray-900 font-medium capitalize">{selectedSubcategory}</span>
            </>
          )}
        </nav>

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {getPageTitle()}
            </h1>
            <p className="text-gray-600 text-lg">
              {selectedCategory !== 'all' || selectedSubcategory !== 'all' 
                ? `Filtered results for your selection`
                : `Discover our complete range of premium furniture`
              }
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-[#7A1315] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-[#7A1315] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              
              {/* Categories Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setSelectedSubcategory('all');
                      }}
                      className="mr-3"
                    />
                    <span className="text-sm">All Categories</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.toLowerCase()}
                        checked={selectedCategory === category.toLowerCase()}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setSelectedSubcategory('all');
                        }}
                        className="mr-3"
                      />
                      <span className="text-sm capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subcategories Filter */}
              {availableSubcategories.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Subcategories</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="subcategory"
                        value="all"
                        checked={selectedSubcategory === 'all'}
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm">All Subcategories</span>
                    </label>
                    {availableSubcategories.map((subcategory) => (
                      <label key={subcategory} className="flex items-center">
                        <input
                          type="radio"
                          name="subcategory"
                          value={subcategory}
                          checked={selectedSubcategory === subcategory}
                          onChange={(e) => setSelectedSubcategory(e.target.value)}
                          className="mr-3"
                        />
                        <span className="text-sm capitalize">{subcategory}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Prices' },
                    { value: 'under-10000', label: 'Under ৳10,000' },
                    { value: '10000-25000', label: '৳10,000 - ৳25,000' },
                    { value: '25000-50000', label: '৳25,000 - ৳50,000' },
                    { value: 'over-50000', label: 'Over ৳50,000' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        value={option.value}
                        checked={priceRange === option.value}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden ${
                      viewMode === 'list' ? 'flex gap-4 p-4' : ''
                    }`}
                  >
                    <Link href={`/products/${product.slug}`} className={viewMode === 'list' ? 'flex-shrink-0' : 'block'}>
                      <div className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'w-32 h-32' : 'aspect-[4/3] w-full'
                      }`}>
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </Link>
                    
                    <div className={`${viewMode === 'list' ? 'flex-1' : 'p-4'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`font-semibold text-gray-900 group-hover:text-[#7A1315] transition-colors ${
                          viewMode === 'list' ? 'text-lg' : 'text-base'
                        }`}>
                          <Link href={`/products/${product.slug}`} className="line-clamp-2">
                            {product.title}
                          </Link>
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[#7A1315] font-bold text-lg">
                          ৳{parseInt(product.price).toLocaleString()} BDT
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{product.reviews || 0}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or browse all products
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Browse All Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;