'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface PopupAdProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopupAd: React.FC<PopupAdProps> = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  // Countdown timer
  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] overflow-hidden">
        {/* Enhanced Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Popup Container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.6 
            }}
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            style={{ maxHeight: '90vh' }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-400/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors group"
            >
              <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            </motion.button>

            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-64 lg:h-auto">
                <Image
                  src="/Images/1754207404320.jpg"
                  alt="August Festival Sale - Up to 9% off furniture"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Floating Sparkles */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute top-4 left-4"
                >
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </motion.div>
                
                <motion.div
                  animate={{ 
                    rotate: [360, 0],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute bottom-4 right-4"
                >
                  <Gift className="w-8 h-8 text-purple-300" />
                </motion.div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                {/* Badge */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 w-fit"
                >
                  <Sparkles className="w-4 h-4" />
                  Limited Time Offer
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
                >
                  August Fest Special
                </motion.h2>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <div className="text-6xl font-black text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-2">
                    UP TO 9%
                  </div>
                  <div className="text-2xl font-semibold text-gray-700">
                    OFF on All Furniture
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-600 mb-6 leading-relaxed"
                >
                  Get premium furniture at affordable prices. Transform your space with our exclusive August collection featuring sofas, chairs, tables, and more!
                </motion.p>

                {/* Countdown Timer */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-xl mb-6"
                >
                  <div className="text-sm font-medium mb-1">Offer ends in:</div>
                  <div className="text-2xl font-bold font-mono">
                    {formatTime(timeLeft)}
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      window.location.href = '/products';
                      onClose();
                    }}
                    className="flex-1 bg-gradient-to-r from-[#7A1315] to-[#a11618] hover:from-[#8b1719] hover:to-[#b01a1d] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Shop Now
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-6 py-4 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold rounded-xl transition-all duration-200"
                  >
                    Maybe Later
                  </motion.button>
                </motion.div>

                {/* Fine Print */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-xs text-gray-500 mt-4"
                >
                  *Offer valid till August end. Terms and conditions apply.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default PopupAd;
