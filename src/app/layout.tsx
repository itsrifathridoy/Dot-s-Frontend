"use client";
import React, { useEffect, useState } from 'react';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransitionWrapper from '../components/PageTransitionWrapper';
import PopupAd from '../components/PopupAd';
import PopupTestButton from '../components/PopupTestButton';
import { usePathname } from 'next/navigation';
import { CartProvider } from '../context/CartContext';
import { RecentlyViewedProvider } from '../context/RecentlyViewedContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/SignIn' || pathname === '/register';
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll position to the top
    
    // Show popup ad on page refresh/load with a slight delay
    const popupTimer = setTimeout(() => {
      // For testing: always show popup (comment out localStorage check)
      // You can uncomment the localStorage logic below for production
      
      // Check if popup was shown recently (within last 24 hours)
      const lastPopupShown = localStorage.getItem('lastPopupShown');
      const now = new Date().getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      // For testing purposes - always show popup
      // Remove this line and uncomment the condition below for production
      setShowPopup(true);
      
      // Production logic (uncomment for production):
      // if (!lastPopupShown || (now - parseInt(lastPopupShown)) > twentyFourHours) {
      //   setShowPopup(true);
      //   localStorage.setItem('lastPopupShown', now.toString());
      // }
      
      console.log('Popup should show:', true);
    }, 1000); // Reduced delay to 1 second

    return () => clearTimeout(popupTimer);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    // Set localStorage when user closes popup
    const now = new Date().getTime();
    localStorage.setItem('lastPopupShown', now.toString());
  };

  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={isAuthPage ? "" : "min-h-screen bg-white mt-16"}>
        <CartProvider>
          <RecentlyViewedProvider>
            <PageTransitionWrapper>
              <Navbar />
                {children}
                <Footer />
            </PageTransitionWrapper>
            
            {/* Popup Ad */}
            <PopupAd isOpen={showPopup} onClose={handleClosePopup} />
            
            {/* Test Button - Remove in production */}
            <PopupTestButton />
          </RecentlyViewedProvider>
        </CartProvider>
      </body>
    </html>
  );
}