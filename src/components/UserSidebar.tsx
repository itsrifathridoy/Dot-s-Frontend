"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserDropdownProps {
  activeSection: "profile" | "orders" | "address" | "password";
}

const UserDropdown: React.FC<UserDropdownProps> = ({ activeSection }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      setIsDropdownOpen(false);
      return;
    }
    router.push(item.href);
    setIsDropdownOpen(false);
  };

  const getActiveItemName = () => {
    const activeItem = navigationItems.find(item => item.key === activeSection);
    return activeItem?.name || "Profile";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors min-w-[200px]"
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            GG
          </div>
          <div className="text-left">
            <div className="text-xs text-gray-500">{getGreeting()}</div>
            <div className="text-sm font-medium text-gray-900 truncate">George Gika</div>
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="py-2">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
                  activeSection === item.key
                    ? "bg-gray-100 text-gray-900 border-r-2 border-gray-900"
                    : item.danger
                    ? "text-red-500 hover:bg-red-50"
                    : "text-gray-600"
                }`}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
                {activeSection === item.key && (
                  <span className="ml-auto text-xs text-gray-500">Current</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
