'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductsDropdownProps {
  isOpen: boolean;
}

const ProductsDropdown = ({ isOpen }: ProductsDropdownProps) => {
  const productsData = [
    {
      name: 'Sofa',
      items: ['L-Shape Sofa', 'Sectional Sofa', 'Recliner Sofa', '3-Seater Sofa', '2-Seater Sofa', 'Loveseat']
    },
    {
      name: 'Tables',
      items: ['Coffee Table', 'Center Table', 'Side Table', 'Console Table', 'Nesting Tables']
    },
    {
      name: 'Storage',
      items: ['TV Cabinet', 'Display Unit', 'Bookshelf', 'Storage Ottoman', 'Media Console']
    },
    {
      name: 'Beds',
      items: ['King Size Bed', 'Queen Size Bed', 'Single Bed', 'Double Bed', 'Platform Bed', 'Storage Bed']
    },
    {
      name: 'Wardrobes',
      items: ['Wardrobe', 'Chest of Drawers', 'Dresser', 'Nightstand', 'Armoire']
    },
    {
      name: 'Seating',
      items: ['Dining Chair', 'Bar Stool', 'Counter Stool', 'Bench', 'Accent Chair', 'Bedroom Chair', 'Vanity Stool', 'Ottoman']
    },
    {
      name: 'Dining Sets',
      items: ['4-Seater Dining Set', '6-Seater Dining Set', '8-Seater Dining Set', 'Round Dining Set', 'Extendable Dining Set']
    },
    {
      name: 'Office Furniture',
      items: ['Executive Desk', 'Office Chair', 'Conference Table', 'Filing Cabinet', 'Bookshelf']
    }
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed top-16 left-0 right-0 bg-white shadow-xl border-b border-gray-200 z-50 max-h-[80vh] overflow-y-auto w-full"
      style={{ 
        scrollbarWidth: 'thin', 
        scrollbarColor: '#861718 #f1f1f1' 
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {productsData.map((category, index) => (
            <div key={category.name} className="mb-4">
              <Link
                href={`/products/${category.name.toLowerCase().replace(' ', '-')}`}
                className="font-medium text-gray-800 hover:text-[#861718] transition flex items-center gap-1 mb-2"
              >
                {category.name}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <ul className="space-y-1 ml-2">
                {category.items.slice(0, 6).map((item) => (
                  <li key={item}>
                    <Link
                      href={`/products/${category.name.toLowerCase().replace(' ', '-')}/${item.toLowerCase().replace(' ', '-')}`}
                      className="text-sm text-gray-600 hover:text-[#861718] transition block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
                {category.items.length > 6 && (
                  <li>
                    <Link
                      href={`/products/${category.name.toLowerCase().replace(' ', '-')}`}
                      className="text-[#861718] hover:underline text-sm font-medium"
                    >
                      View All ({category.items.length})
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsDropdown;
