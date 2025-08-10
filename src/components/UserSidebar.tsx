"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface UserSidebarProps {
  activeSection: "profile" | "orders" | "address" | "password";
}

const UserSidebar: React.FC<UserSidebarProps> = ({ activeSection }) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const navigationItems = [
    { name: "Profile", icon: "👤", key: "profile", href: "/profile" },
    { name: "My Order", icon: "📦", key: "orders", href: "/orders" },
    { name: "Saved Address", icon: "📍", key: "address", href: "/saved-address" },
    { name: "Change Password", icon: "🔒", key: "password", href: "/change-password" },
    { name: "Logout", icon: "🚪", key: "logout", danger: true },
  ];

  const handleNavigation = (item: any) => {
    if (item.key === "logout") {
      // Handle logout logic here
      console.log("Logout clicked");
      return;
    }
    router.push(item.href);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
      >
        <span className="text-xl">☰</span>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        w-full sm:w-80 bg-white rounded-lg shadow-sm p-4 sm:p-6 h-fit
        fixed lg:static top-0 left-0 z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        max-h-screen overflow-y-auto lg:max-h-none
      `}>
        {/* Close button for mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-gray-500 text-xl"
        >
          ✕
        </button>

        <div className="mb-6 pt-8 lg:pt-0">
          <h2 className="text-sm text-gray-500 mb-2">{getGreeting()}</h2>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 break-words">George Gika</h1>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavigation(item)}
              className={`w-full flex items-center gap-3 px-3 sm:px-4 py-3 rounded-lg text-left transition-colors text-sm sm:text-base ${
                activeSection === item.key
                  ? "bg-gray-900 text-white"
                  : item.danger
                  ? "text-red-500 hover:bg-red-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-base sm:text-lg flex-shrink-0">{item.icon}</span>
              <span className="truncate">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default UserSidebar;
