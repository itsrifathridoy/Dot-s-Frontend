'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity?: number;
}

interface Order {
  id: string;
  status: 'Pending' | 'On Delivery' | 'Arrived' | 'Canceled';
  items: OrderItem[];
  total: number;
  estimatedDelivery: string;
  deliveryAddress: string;
}

const OrdersContent = () => {
  const [activeTab, setActiveTab] = useState<'Pending' | 'On Shipping' | 'Arrived' | 'Canceled'>('Pending');
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const orders: Order[] = [
    {
      id: 'CTH-12345',
      status: 'Pending',
      items: [
        {
          id: '4',
          name: 'Modern Office Chair',
          price: 750000,
          size: 'Standard',
          image: '/Images/office-chair.jpg'
        }
      ],
      total: 750000,
      estimatedDelivery: 'Processing',
      deliveryAddress: "George's House, Indonesia"
    },
    {
      id: 'CTH-89765',
      status: 'On Delivery',
      items: [
        {
          id: '1',
          name: 'Japan Green Outer',
          price: 399000,
          size: 'M',
          image: '/Images/green-jacket.jpg'
        },
        {
          id: '2',
          name: 'White off jacket 2024',
          price: 450000,
          size: 'M',
          image: '/Images/white-jacket.jpg'
        }
      ],
      total: 849000,
      estimatedDelivery: '28 May 2024',
      deliveryAddress: "George's House, Indonesia"
    },
    {
      id: 'CTH-45672',
      status: 'On Delivery',
      items: [
        {
          id: '3',
          name: 'Soft Hoodie',
          price: 250000,
          size: 'L',
          image: '/Images/soft-hoodie.jpg'
        }
      ],
      total: 300000,
      estimatedDelivery: '28 May 2024',
      deliveryAddress: "George's House, Indonesia"
    }
  ];

  const getStatusCount = (status: string) => {
    return orders.filter(order => 
      status === 'Pending' ? order.status === 'Pending' :
      status === 'On Shipping' ? order.status === 'On Delivery' :
      status === 'Arrived' ? order.status === 'Arrived' :
      order.status === 'Canceled'
    ).length;
  };

  const getFilteredOrders = () => {
    return orders.filter(order => 
      activeTab === 'Pending' ? order.status === 'Pending' :
      activeTab === 'On Shipping' ? order.status === 'On Delivery' :
      activeTab === 'Arrived' ? order.status === 'Arrived' :
      order.status === 'Canceled'
    );
  };

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString()}`;
  };

  const tabs = [
    { name: 'Pending', count: getStatusCount('Pending') },
    { name: 'On Shipping', count: getStatusCount('On Shipping') },
    { name: 'Arrived', count: getStatusCount('Arrived') },
    { name: 'Canceled', count: getStatusCount('Canceled') }
  ];

  const getActiveTab = () => {
    return tabs.find(tab => tab.name === activeTab);
  };

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName as any);
    setIsMobileDropdownOpen(false);
  };

  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 text-center">My Orders</h1>
        </div>

        {/* Mobile Dropdown */}
        <div className="lg:hidden border-b border-gray-200 px-4 py-4">
          <div className="relative">
            <button
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 rounded-lg text-left"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-900">{getActiveTab()?.name}</span>
                {getActiveTab()?.count > 0 && (
                  <span className="bg-gray-900 text-white px-2 py-1 text-xs rounded-full">
                    {getActiveTab()?.count}
                  </span>
                )}
              </div>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform ${isMobileDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isMobileDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setIsMobileDropdownOpen(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  {tabs.map((tab) => (
                    <button
                      key={tab.name}
                      onClick={() => handleTabChange(tab.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 last:border-b-0 ${
                        activeTab === tab.name
                          ? "bg-gray-100 text-gray-900 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      <span>{tab.name}</span>
                      {tab.count > 0 && (
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          activeTab === tab.name
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden lg:block border-b border-gray-200">
          <nav className="flex px-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name as any)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.name
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.name}
                {tab.count > 0 && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.name
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Orders List */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-6">
          {getFilteredOrders().map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-200 rounded-lg p-4 lg:p-6"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="bg-gray-100 p-2 rounded flex-shrink-0">
                    <svg className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base">{order.id}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs lg:text-sm text-gray-500 mt-1">
                      <span>Estimated arrival: {order.estimatedDelivery}</span>
                      <span className="hidden sm:inline">•••••••</span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate">{order.deliveryAddress}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium self-start sm:self-auto ${
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'On Delivery' ? 'bg-orange-100 text-orange-800' :
                  order.status === 'Arrived' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div className="space-y-3 lg:space-y-4 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 lg:gap-4">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-black text-sm lg:text-base truncate">{item.name}</h4>
                      <p className="text-xs lg:text-sm text-black">{formatPrice(item.price)}</p>
                      <p className="text-xs lg:text-sm text-black">{item.size}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex items-center justify-between pt-3 lg:pt-4 border-t border-gray-200">
                <div className="text-base lg:text-lg font-semibold text-black">
                  Total: {formatPrice(order.total)}
                </div>
                <button className="text-[#861718] hover:text-[#A82B2B] font-medium text-sm lg:text-base">
                  Details
                </button>
              </div>
            </motion.div>
          ))}

          {getFilteredOrders().length === 0 && (
            <div className="text-center py-8 lg:py-12">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-base lg:text-lg font-medium text-black mb-2">No orders found</h3>
              <p className="text-black text-sm lg:text-base">You don't have any {activeTab.toLowerCase()} orders yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersContent;
