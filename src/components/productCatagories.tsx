"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const ProductCategories = () => {
  const [showAll, setShowAll] = useState(false);
  
  const allCategories = [
    { name: 'New Arrivals', icon: '/Icons/new.gif' },
    { name: 'Hot Deals', icon: '/Icons/Hot Deals.gif' },
    { name: 'Office Desk', icon: '/Icons/office desk.gif' },
    { name: 'Racks', icon: '/Icons/Racks.gif' },
    { name: 'Shelves', icon: '/Icons/shelves.gif' },
    { name: 'Sofa', icon: '/Icons/sofa.gif' },
    { name: 'Study Table', icon: '/Icons/Study Table.gif' },
    { name: 'Dining Table', icon: '/Icons/Table.gif' },
    { name: 'Wardrobe', icon: '/Icons/wardrobe.gif' },
    { name: 'Bed', icon: '/Icons/Bed.gif' },
    { name: 'Chair', icon: '/Icons/chair.gif' },
    { name: 'Rocking Chair', icon: '/Icons/rocking chair.gif' },
    { name: 'Mattress', icon: '/Icons/mattress.gif' },
    { name: 'Bookshelf', icon: '/Icons/bookshelf.gif' },
    { name: 'Coffee Table', icon: '/Icons/coffee-table.gif' },
    { name: 'Side Table', icon: '/Icons/side-table.gif' },
    { name: 'Bar Stool', icon: '/Icons/bar-stool.gif' },
    { name: 'Bean Bag', icon: '/Icons/bean-bag.gif' }
  ];

  // Calculate categories to show for 3 full rows across different screen sizes
  // We want to show enough to fill 3 rows on larger screens but not all categories
  // Mobile (3 cols): 3×3 = 9, Small (4 cols): 4×3 = 12, Medium (5 cols): 5×3 = 15
  // Large (6 cols): 6×3 = 18 - this would show all, so we limit to 15 to ensure button shows
  const categoriesToShow = 15; // This fills 3 rows on medium screens and leaves 3 categories for "show more"
  
  const displayedCategories = showAll ? allCategories : allCategories.slice(0, categoriesToShow);
  const hasMoreCategories = allCategories.length > categoriesToShow;

  return (
    <section className="py-4 sm:py-6 lg:py-8 px-2 sm:px-4 text-center">
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3 lg:gap-4 xl:gap-6">
        {displayedCategories.map((category, index) => (
          <a 
            key={index} 
            href="#" 
            className="flex flex-col items-center transform transition duration-300 hover:scale-110 cursor-pointer p-1 sm:p-2"
          >
            <Image 
              src={category.icon} 
              alt={category.name} 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain mb-1 sm:mb-2" 
              width={64} 
              height={64} 
            />
            <p className="font-medium text-xs sm:text-sm text-black text-center leading-tight break-words max-w-full">{category.name}</p>
          </a>
        ))}
      </div>
        
      {hasMoreCategories && (
        <div className="mt-6 sm:mt-8 lg:mt-10 flex justify-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="group relative inline-flex items-center gap-2 text-white bg-gradient-to-r from-[#7A1315] to-[#a11618] hover:from-[#5a0f11] hover:to-[#7a1315] rounded-lg px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#7A1315]/30 active:scale-95 transition-all duration-300 overflow-hidden"
          >
            {/* Background Animation */}
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            {/* Content */}
            <div className="relative flex items-center gap-2">
              {showAll ? (
                <>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                  <span className="font-semibold">Show Less</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0l-4-4m4 4l-4 4" />
                  </svg>
                  <span className="font-semibold">View All</span>
                  <div className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs font-bold">
                    +{allCategories.length - categoriesToShow}
                  </div>
                </>
              )}
            </div>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductCategories;