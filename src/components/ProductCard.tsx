"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

interface Product {
  image: string;
  images?: string[]; 
  title: string;
  description: string;
  reviews: number;
  price: string;
  catagory?: string;
  id?: number;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const productImages = product.images?.map((img) =>
    img.startsWith('/') ? img : `/${img}`
  ) || [
    product.image.startsWith('/') ? product.image : `/${product.image}`,
    product.image.startsWith('/') ? product.image : `/${product.image}`,
    product.image.startsWith('/') ? product.image : `/${product.image}`,
    product.image.startsWith('/') ? product.image : `/${product.image}`,
  ];

  // Check if product is in cart
  const cartItem = cartItems.find(item => item.id === (product.id?.toString() || `${Date.now()}-${Math.random()}`));
  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  // Get tag based on product characteristics
  const getProductTag = () => {
    const price = parseFloat(product.price);
    const reviews = product.reviews;
    
    // Best Seller: high reviews (>150)
    if (reviews > 150) {
      return { text: "BEST SELLER", bgColor: "bg-gradient-to-r from-green-600 to-green-700" };
    }
    // New: lower product IDs or specific price range
    else if ((product.id && product.id <= 10) || price > 25000) {
      return { text: "NEW", bgColor: "bg-gradient-to-r from-[#7A1315] to-[#a11618]" };
    }
    // No tag for regular products
    return null;
  };

  const productTag = getProductTag();

  const handleAddToCart = () => {
    const priceNumber = parseFloat(product.price);
    const productId = product.id?.toString() || `${Date.now()}-${Math.random()}`;
    addToCart({
      id: productId,
      name: product.title,
      price: priceNumber,
      imageUrl: product.image.startsWith('/') ? product.image : `/${product.image}`,
      color: "Off white"
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    const productId = product.id?.toString() || `${Date.now()}-${Math.random()}`;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveFromCart = () => {
    const productId = product.id?.toString() || `${Date.now()}-${Math.random()}`;
    removeFromCart(productId);
  };

  return (
    <div 
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col h-full border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1 w-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Tag */}
      {productTag && (
        <div className={`absolute top-4 right-4 ${productTag.bgColor} text-white px-3 py-1.5 rounded-full text-xs font-semibold z-10 shadow-md`}>
          {productTag.text}
        </div>
      )}

      {/* Product Image */}
      <Link
        href={{
          pathname: '/IndividualProduct',
          query: {
            id: product.id?.toString() || '1',
          },
        }}
        className="block mb-5 overflow-hidden rounded-xl bg-gray-50 relative"
      >
        {/* Main Image */}
        <img
          src={product.image.startsWith('/') ? product.image : `/${product.image}`}
          alt={product.title}
          className={`w-full h-48 object-cover transition-all duration-500 cursor-pointer ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {/* Hover Image */}
        <img
          src={productImages[1] || (product.image.startsWith('/') ? product.image : `/${product.image}`)}
          alt={`${product.title} - alternate view`}
          className={`absolute inset-0 w-full h-48 object-cover transition-all duration-500 cursor-pointer ${
            isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1 flex flex-col space-y-4">
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-lg line-clamp-2 leading-tight group-hover:text-[#7A1315] transition-colors duration-200">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-base text-gray-600 line-clamp-2 leading-relaxed font-medium">
          {product.description}
        </p>

        {/* EMI Price */}
        <div className="bg-gradient-to-r from-[#7A1315]/10 to-[#a11618]/10 border border-[#7A1315]/20 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white px-2 py-1 rounded text-xs font-bold">
              EMI
            </div>
            <span className="text-lg font-bold text-[#7A1315]">
              ৳{Math.round(parseFloat(product.price) / 12).toLocaleString()}
            </span>
            <span className="text-sm text-[#7A1315]/70">/month</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <div className="font-extrabold text-transparent bg-gradient-to-r from-[#7A1315] to-[#a11618] bg-clip-text text-xl">
            ৳{parseFloat(product.price).toLocaleString()}
          </div>
          <span className="text-sm text-gray-500 font-medium">BDT</span>
        </div>

        {/* Add to Cart Button or Quantity Controls */}
        {!isInCart ? (
          <button
            onClick={handleAddToCart}
            className={`w-full font-semibold py-4 rounded-xl transition-all duration-300 text-base transform ${
              isHovered 
                ? 'bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white shadow-lg scale-105' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } focus:outline-none focus:ring-4 focus:ring-[#7A1315]/30 active:scale-95`}
          >
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
              </svg>
              <span>Add to Cart</span>
            </div>
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {/* Quantity Controls */}
            <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden flex-1">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="p-3 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:bg-gray-200"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                </svg>
              </button>
              <div className="flex-1 text-center py-3 font-bold text-lg text-gray-800">
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="p-3 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:bg-gray-200"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            
            {/* Remove Button */}
            <button
              onClick={handleRemoveFromCart}
              className="p-3 bg-red-100 hover:bg-red-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
