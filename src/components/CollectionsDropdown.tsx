'use client';


import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { collectionsData } from '../data/collectionsCategories';

interface CollectionsDropdownProps {
  isOpen: boolean;
}

const CollectionsDropdown = ({ isOpen }: CollectionsDropdownProps) => {
  const [selectedRoom, setSelectedRoom] = useState('Living');

  // Find the selected room data
  const selectedRoomData = collectionsData.find(room => room.name === selectedRoom);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed top-16 left-0 right-0 bg-white shadow-xl border-b border-gray-200 z-50 overflow-hidden w-full"
      style={{ 
        height: '500px'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 h-full">
        <div className="grid grid-cols-4 gap-6 h-full">
          {/* Room Categories - Left Side */}
          <div className="h-full flex flex-col min-h-0">
            <h3 className="font-semibold text-[#861718] mb-4 text-lg flex-shrink-0">
              <Link href="/collections" className="hover:text-[#a11618] transition-colors flex items-center gap-2 group">
                Collections
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </h3>
            <div className="flex-1 overflow-y-auto pr-2 min-h-0" style={{ scrollbarWidth: 'thin', scrollbarColor: '#861718 #f1f1f1' }}>
              <div className="space-y-3 p-2">
                {collectionsData.map((room) => (
                  <button
                    key={room.name}
                    onClick={() => setSelectedRoom(room.name)}
                    className={`block w-full text-left relative overflow-hidden group transition-all ${
                      selectedRoom === room.name
                        ? 'border-l-4 border-r-4 border-[#861718] shadow-lg rounded-xl bg-white'
                        : 'border border-gray-200 hover:border-[#ff9696] hover:shadow-md rounded-xl'
                    }`}
                  >
                    <div
                      className={
                        `h-20 bg-gray-200 flex items-center justify-center text-white font-semibold text-sm relative ` +
                        (selectedRoom === room.name ? 'rounded-r-xl' : 'rounded-xl') +
                        (selectedRoom !== room.name ? ' grayscale' : '')
                      }
                      style={{
                        backgroundImage: `url('${room.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: selectedRoom !== room.name ? 'grayscale(1)' : undefined
                      }}
                    >
                      <div className={`absolute inset-0 rounded-xl transition-all pointer-events-none ${
                        selectedRoom === room.name
                          ? 'bg-black/30'
                          : 'bg-black/30 group-hover:bg-[#ff9696]/20'
                      }`}></div>
                      <span className="relative z-10 drop-shadow font-bold text-base">{room.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Products - Right Side */}
          <div className="col-span-3 h-full flex flex-col min-h-0">
            <h3 className="font-semibold text-[#861718] mb-4 text-lg flex-shrink-0">
              <Link 
                href={`/collections/${selectedRoom.toLowerCase()}`}
                className="hover:text-[#a11618] transition-colors inline-flex items-center gap-2 group"
              >
                {selectedRoom} Collection
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </h3>
            <div className="flex-1 overflow-y-auto pr-2 min-h-0" style={{ scrollbarWidth: 'thin', scrollbarColor: '#861718 #f1f1f1' }}>
              <div className="grid grid-cols-3 gap-6">
                {selectedRoomData?.categories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="font-medium text-black mb-2">
                      <Link
                        href={`/collections/${selectedRoom.toLowerCase()}/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="hover:text-[#861718] transition inline-flex items-center gap-1 group"
                      >
                        {category.name}
                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    </div>
                    {category.subcategories.length > 0 && (
                      <ul className="space-y-1 text-sm text-black">
                        {category.subcategories.slice(0, 6).map((subcategory) => (
                          <li key={subcategory.name}>
                            <Link
                              href={`/collections/${selectedRoom.toLowerCase()}/${category.name.toLowerCase().replace(/\s+/g, '-')}/${subcategory.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="hover:text-[#861718] transition inline-block"
                            >
                              {subcategory.name}
                            </Link>
                          </li>
                        ))}
                        {category.subcategories.length > 6 && (
                          <li>
                            <Link
                              href={`/collections/${selectedRoom.toLowerCase()}/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="text-[#861718] hover:underline text-sm font-medium inline-block"
                            >
                              View All ({category.subcategories.length})
                            </Link>
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CollectionsDropdown;
