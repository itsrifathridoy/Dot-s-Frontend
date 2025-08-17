'use client';

import React from 'react';
import UserDropdown from '../../components/usersidebar';
import OrdersContent from '../../components/orderscontent';

const OrdersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Dropdown Header */}
        <div className="mb-8">
          <UserDropdown activeSection="orders" />
        </div>
        
        {/* Orders Content */}
        <OrdersContent />
      </div>
    </div>
  );
};

export default OrdersPage;
