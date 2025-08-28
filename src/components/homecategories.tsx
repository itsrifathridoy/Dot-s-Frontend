import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Category {
  name: string;
  image: string;
  colSpan?: string; 
  rowSpan?: string;
  path: string;
}

const categories: Category[] = [
  { name: 'Living Room', image: '/Images/Living room.jpg', rowSpan: 'md:row-span-2', path: '/collectionspage/living' },
  { name: 'Kitchen', image: '/Images/Kitchen.png', colSpan: 'md:col-span-2', path: '/collectionspage/kitchen' },
  { name: 'Bed Room', image: '/BedroomFinal.jpeg', rowSpan: 'md:row-span-2', path: '/collectionspage/bedroom' },
  { name: 'Dining Room', image: '/Images/balcony.jpg', rowSpan: 'md:row-span-2', colSpan: 'md:col-span-2', path: '/collectionspage/dining' },
  { name: 'Study Room', image: '/Images/balcony.jpg', rowSpan: 'md:row-span-2', path: '/collectionspage/study' },
  { name: 'Balcony', image: '/Images/balcony.jpg', path: '/collectionspage/balcony' },
  { name: 'Kids Room', image: '/Images/balcony.jpg', path: '/collectionspage/kids' },
  { name: 'Drawing', image: '/Images/balcony.jpg', colSpan: 'md:col-span-2', path: '/collectionspage/drawing' },
];

const HomeCategories: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[12vh] sm:auto-rows-[15vh] md:auto-rows-[20vh] gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 md:p-4 group/container">
      {categories.map((cat, index) => (
        <Link 
          href={cat.path} 
          key={index}
          className={`relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl group transition-all duration-700 ease-out transform hover:scale-[1.02] hover:-translate-y-1 ${cat.colSpan || ''} ${cat.rowSpan || ''}`}
        >
          {/* Background Image with Overlay */}
          <div className="relative w-full h-full">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover transition-all duration-1000 ease-out group-hover:scale-125 group-hover:brightness-75 group-hover:saturate-110 group-hover/container:grayscale group-hover:!grayscale-0 group-hover:!contrast-110"
              sizes="(max-width: 768px) 50vw, 25vw"
              priority={index < 4}
            />
            
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-700 ease-out"></div>
            
            {/* Animated Border Effect */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/40 rounded-xl sm:rounded-2xl transition-all duration-700 ease-out"></div>
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
              <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
          </div>
          
          {/* Enhanced Category Label */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform transition-all duration-700 ease-out group-hover:translate-y-[-8px]">
            <h3 className="text-white text-sm sm:text-base lg:text-lg font-bold drop-shadow-2xl leading-tight transform transition-all duration-500 ease-out group-hover:text-xl group-hover:tracking-wide">
              {cat.name}
            </h3>
            <div className="w-0 h-0.5 bg-gradient-to-r from-white/80 to-white/40 group-hover:w-12 transition-all duration-700 ease-out mt-2 rounded-full"></div>
          </div>
          
          {/* Enhanced Hover Icon */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transform translate-x-4 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700 ease-out group-hover:rotate-12">
            <div className="w-8 h-8 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/20 transform transition-all duration-500 group-hover:scale-110">
              <svg className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomeCategories;