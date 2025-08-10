"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSection {
  title: string;
  expanded: boolean;
  options?: { id: string; label: string }[];
  subCategories?: { 
    title: string; 
    options: { id: string; label: string }[] 
  }[];
  isRange?: boolean;
  min?: number;
  max?: number;
}

const ProductFilter: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 425955]);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const [filterSections, setFilterSections] = useState<FilterSection[]>([
    {
      title: "Price Range",
      expanded: true,
      isRange: true,
      min: 0,
      max: 425955
    },
    {
      title: "Availability",
      expanded: false,
      options: [
        { id: "in-stock", label: "In Stock" },
        { id: "out-of-stock", label: "Out of Stock" },
        { id: "pre-order", label: "Available for Pre-order" }
      ]
    },
    {
      title: "Category",
      expanded: false,
      subCategories: [
        {
          title: "Sofa",
          options: [
            { id: "l-shaped-sofa", label: "L-Shaped Sofa" },
            { id: "sectional-sofa", label: "Sectional Sofa" },
            { id: "2-seater-sofa", label: "2-Seater Sofa" },
            { id: "3-seater-sofa", label: "3-Seater Sofa" }
          ]
        },
        {
          title: "Bed",
          options: [
            { id: "king-size-bed", label: "King Size Bed" },
            { id: "queen-size-bed", label: "Queen Size Bed" },
            { id: "single-bed", label: "Single Bed" },
            { id: "bunk-bed", label: "Bunk Bed" }
          ]
        },
        {
          title: "Chair",
          options: [
            { id: "dining-chair", label: "Dining Chair" },
            { id: "lounge-chair", label: "Lounge Chair" },
            { id: "office-chair", label: "Office Chair" },
            { id: "accent-chair", label: "Accent Chair" }
          ]
        }
      ]
    },
    {
      title: "Collections",
      expanded: false,
      options: [
        { id: "living-room", label: "Living Room" },
        { id: "bedroom", label: "Bedroom" },
        { id: "dining-room", label: "Dining Room" },
        { id: "kitchen", label: "Kitchen" },
        { id: "office", label: "Office" },
        { id: "outdoor", label: "Outdoor" }
      ]
    },
    {
      title: "Color",
      expanded: false,
      options: [
        { id: "black", label: "Black" },
        { id: "white", label: "White" },
        { id: "brown", label: "Brown" },
        { id: "gray", label: "Gray" },
        { id: "beige", label: "Beige" },
        { id: "red", label: "Red" },
        { id: "blue", label: "Blue" },
        { id: "green", label: "Green" }
      ]
    },
    {
      title: "Size",
      expanded: false,
      options: [
        { id: "small", label: "Small" },
        { id: "medium", label: "Medium" },
        { id: "large", label: "Large" },
        { id: "extra-large", label: "Extra Large" }
      ]
    }
  ]);

  const toggleSection = (index: number) => {
    const updatedSections = [...filterSections];
    updatedSections[index].expanded = !updatedSections[index].expanded;
    setFilterSections(updatedSections);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, isMin: boolean) => {
    const value = parseInt(e.target.value);
    if (isMin) {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  const handleSliderMouseDown = (type: 'min' | 'max') => {
    setIsDragging(type);
  };

  const handleSliderMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const value = Math.round(percentage * 425955);
    
    if (isDragging === 'min') {
      setPriceRange([Math.min(value, priceRange[1]), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], Math.max(value, priceRange[0])]);
    }
  };

  const handleSliderMouseUp = () => {
    setIsDragging(null);
  };

  React.useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(null);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const sliderElement = document.getElementById('price-slider');
      if (sliderElement) {
        const rect = sliderElement.getBoundingClientRect();
        const percentage = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        const value = Math.round(percentage * 425955);
        
        if (isDragging === 'min') {
          setPriceRange([Math.min(value, priceRange[1]), priceRange[1]]);
        } else {
          setPriceRange([priceRange[0], Math.max(value, priceRange[0])]);
        }
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, priceRange]);

  return (
    <div className="w-full bg-white rounded-xl shadow p-3 sm:p-4">
      {filterSections.map((section, index) => (
        <div key={section.title} className="border-b border-gray-200 py-3 sm:py-4 last:border-b-0">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleSection(index)}
          >
            <h3 className="font-semibold text-black text-base sm:text-lg">{section.title}</h3>
            {section.expanded ? <ChevronUp size={18} className="sm:w-5 sm:h-5" /> : <ChevronDown size={18} className="sm:w-5 sm:h-5" />}
          </div>
          
          {section.expanded && (
            <div className="mt-3 sm:mt-4">
              {section.isRange ? (
                <div>
                  <div className="relative mb-4 sm:mb-6">
                    <div 
                      id="price-slider"
                      className="w-full h-1 bg-gray-300 rounded-full cursor-pointer"
                      onMouseMove={handleSliderMouseMove}
                      onMouseUp={handleSliderMouseUp}
                    >
                      <div 
                        className="absolute h-1 bg-red-500 rounded-full"
                        style={{
                          left: `${(priceRange[0] / section.max!) * 100}%`,
                          width: `${((priceRange[1] - priceRange[0]) / section.max!) * 100}%`
                        }}
                      ></div>
                      <div 
                        className="absolute w-4 h-4 sm:w-6 sm:h-6 bg-white border-2 border-red-500 rounded-full -mt-1.5 sm:-mt-2 transform -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform"
                        style={{ left: `${(priceRange[0] / section.max!) * 100}%` }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSliderMouseDown('min');
                        }}
                      ></div>
                      <div 
                        className="absolute w-4 h-4 sm:w-6 sm:h-6 bg-white border-2 border-red-500 rounded-full -mt-1.5 sm:-mt-2 transform -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform"
                        style={{ left: `${(priceRange[1] / section.max!) * 100}%` }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSliderMouseDown('max');
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
                    <input 
                      type="number" 
                      className="w-full sm:w-24 lg:w-28 px-2 py-1 border rounded-md text-black text-sm"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(e, true)}
                      min={section.min}
                      max={priceRange[1]}
                    />
                    <input 
                      type="number" 
                      className="w-full sm:w-24 lg:w-28 px-2 py-1 border rounded-md text-black text-sm"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(e, false)}
                      min={priceRange[0]}
                      max={section.max}
                    />
                  </div>
                </div>
              ) : section.options ? (
                <div className="space-y-2">
                  {section.options.map(option => (
                    <div key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={option.id}
                        className="w-4 h-4 border-gray-300 rounded"
                      />
                      <label htmlFor={option.id} className="ml-2 text-sm text-black">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              ) : section.subCategories ? (
                <div className="space-y-4">
                  {section.subCategories.map(category => (
                    <div key={category.title} className="pl-2 border-l-2 border-gray-200">
                      <h4 className="font-medium mb-2 text-black text-sm sm:text-base">{category.title}</h4>
                      <div className="space-y-2 pl-2">
                        {category.options.map(option => (
                          <div key={option.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={option.id}
                              className="w-4 h-4 border-gray-300 rounded"
                            />
                            <label htmlFor={option.id} className="ml-2 text-sm text-black">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      ))}
      
      <div className="mt-4 sm:mt-6 space-y-2">
        <button 
          className="w-full bg-red-800 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition text-sm sm:text-base"
        >
          Apply Filters
        </button>
        <button 
          className="w-full border border-gray-300 text-black py-2 rounded-lg font-medium hover:bg-gray-50 transition text-sm sm:text-base"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
