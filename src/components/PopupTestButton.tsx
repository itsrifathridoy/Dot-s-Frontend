'use client';

import React, { useState } from 'react';
import PopupAd from './PopupAd';

const PopupTestButton: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('lastPopupShown');
    alert('localStorage cleared! Refresh the page to see the popup.');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <button
        onClick={handleOpenPopup}
        className="block w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
      >
        Test Popup
      </button>
      <button
        onClick={clearLocalStorage}
        className="block w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
      >
        Clear Storage
      </button>
      
      <PopupAd isOpen={showPopup} onClose={handleClosePopup} />
    </div>
  );
};

export default PopupTestButton;
