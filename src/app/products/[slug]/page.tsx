"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductGallery from "../../../components/productgallery";
import { useRecentlyViewed } from "../../../context/RecentlyViewedContext";
import { getProductBySlug, type Product } from "../../../data/products";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Shield, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";

const IndividualProduct = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [productData, setProductData] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToRecentlyViewed } = useRecentlyViewed();

  // Debug logging
  console.log('Slug from params:', slug);

  // Fetch product data from products store using slug
  useEffect(() => {
    if (slug) {
      const product = getProductBySlug(slug);
      console.log('Found product:', product);
      setProductData(product || null);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [slug]);

  // Add product to recently viewed when productData is available
  useEffect(() => {
    if (productData) {
      addToRecentlyViewed({
        id: productData.id.toString(),
        name: productData.title,
        price: parseFloat(productData.price),
        image: productData.image,
        category: productData.category
      });
    }
  }, [productData, addToRecentlyViewed]);

  // Show loading state while fetching product
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-[#7A1315] to-[#a11618] rounded-full blur-lg opacity-20 animate-pulse"></div>
            <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#7A1315] mx-auto"></div>
          </div>
          <motion.p 
            className="text-gray-600 text-lg font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading product details...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-[#7A1315]/5 to-[#a11618]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-[#a11618]/5 to-[#7A1315]/5 rounded-full blur-3xl"></div>
      </div>

      {productData ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          {/* Navigation breadcrumb */}
          <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center gap-3">
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 text-[#7A1315] hover:text-[#a11618] font-medium transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600 font-medium truncate">{productData.category}</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-semibold truncate">{productData.title}</span>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#7A1315]" />
                  <span>2 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#7A1315]" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#7A1315]" />
                  <span>7-Day Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>4.8/5 Rating</span>
                </div>
              </div>
            </div>
          </div>

          <ProductGallery productData={productData} />
        </motion.div>
      ) : (
        <motion.div 
          className="min-h-screen flex items-center justify-center text-center p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="w-20 h-20 bg-gradient-to-r from-[#7A1315] to-[#a11618] rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl text-white">❌</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">Product Not Found</h1>
              <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed from our catalog.</p>
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600"><strong>Debug info:</strong></p>
                <p className="text-sm text-gray-600">Looking for slug: <code>{slug}</code></p>
              </div>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default IndividualProduct;



