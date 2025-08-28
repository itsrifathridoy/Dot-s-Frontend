'use client';

import React, { useState } from 'react';
import UserDropdown from '../../components/usersidebar';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'George',
    lastName: 'Gika',
    email: 'george.gika@email.com',
    phone: '+62 812 3456 7890',
    dateOfBirth: '1990-05-15',
    gender: 'Male'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-8">
        {/* User Dropdown Header */}
        <div className="mb-6 sm:mb-8">
          <UserDropdown activeSection="profile" />
        </div>
        
        {/* Profile Content */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Profile Information</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full sm:w-auto px-4 py-3 bg-[#861718] text-white rounded-lg hover:bg-[#A82B2B] transition-colors font-medium text-center"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6 sm:mb-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#861718] to-[#A82B2B] rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shadow-lg">
                {profileData.firstName[0]}{profileData.lastName[0]}
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base break-all">{profileData.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent disabled:bg-gray-50 text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent disabled:bg-gray-50 text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent disabled:bg-gray-50 text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent disabled:bg-gray-50 text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent disabled:bg-gray-50 text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  value={profileData.gender}
                  onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent disabled:bg-gray-50 text-base"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleSave}
                  className="w-full sm:w-auto px-6 py-3 bg-[#861718] text-white rounded-lg hover:bg-[#A82B2B] transition-colors font-medium text-center"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
