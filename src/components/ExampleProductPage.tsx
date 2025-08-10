'use client';

import React, { useEffect } from 'react';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

interface ExampleProductPageProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

const ExampleProductPage: React.FC<ExampleProductPageProps> = ({ product }) => {
  const { addToRecentlyViewed } = useRecentlyViewed();

  // Add product to recently viewed when component mounts
  useEffect(() => {
    addToRecentlyViewed(product);
  }, [product, addToRecentlyViewed]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-lg text-gray-600 mb-2">Category: {product.category}</p>
      <p className="text-xl font-semibold text-[#7A1315]">${product.price.toFixed(2)}</p>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-2">Development Note:</h3>
        <p className="text-sm text-gray-600">
          This product has been automatically added to the recently viewed list when this component mounted.
          To use this functionality in your product pages:
        </p>
        <ol className="list-decimal list-inside text-sm text-gray-600 mt-2 space-y-1">
          <li>Import the useRecentlyViewed hook from RecentlyViewedContext</li>
          <li>Call addToRecentlyViewed(product) in useEffect</li>
          <li>Make sure the product object has id, name, price, image, and category</li>
        </ol>
      </div>
    </div>
  );
};

export default ExampleProductPage;
