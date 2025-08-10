'use client';

import React from 'react';
import UserSidebar from '../../components/UserSidebar';
import OrdersContent from '../../components/OrdersContent';

const OrdersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <UserSidebar activeSection="orders" />
          <OrdersContent />
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
