'use client';

import React, { useState } from 'react';
import UserDropdown from '../../components/usersidebar';
import { motion } from 'framer-motion';

interface Address {
  id: string;
  label: string;
  addressLine: string;
  region: string;
  city: string;
  area: string;
  zone: string;
  postalCode: string;
  phone: string;
  extraPhone?: string;
  additionalInfo?: string;
  isDefault: boolean;
}

const SavedAddressPage = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Home',
      addressLine: 'Jl. Sudirman No. 123, Apartment Block A, Unit 15',
      region: 'Jakarta',
      city: 'Jakarta Selatan',
      area: 'Kebayoran Baru',
      zone: 'Senayan',
      postalCode: '12190',
      phone: '+62 812 3456 7890',
      extraPhone: '+62 811 2345 6789',
      additionalInfo: 'Near the main gate, blue building',
      isDefault: true
    }
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState({
    label: '',
    addressLine: '',
    region: '',
    city: '',
    area: '',
    zone: '',
    postalCode: '',
    phone: '',
    extraPhone: '',
    additionalInfo: ''
  });

  // Mock data for dropdowns
  const regions = ['Jakarta', 'West Java', 'Central Java', 'East Java', 'Bali', 'Sumatra'];
  const citiesByRegion: Record<string, string[]> = {
    'Jakarta': ['Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Utara', 'Jakarta Barat', 'Jakarta Timur'],
    'West Java': ['Bandung', 'Bogor', 'Depok', 'Bekasi', 'Tangerang'],
    'Central Java': ['Semarang', 'Solo', 'Yogyakarta', 'Magelang'],
    'East Java': ['Surabaya', 'Malang', 'Kediri', 'Blitar'],
    'Bali': ['Denpasar', 'Ubud', 'Sanur', 'Kuta'],
    'Sumatra': ['Medan', 'Palembang', 'Padang', 'Pekanbaru']
  };
  const areasByCity: Record<string, string[]> = {
    'Jakarta Selatan': ['Kebayoran Baru', 'Pondok Indah', 'Kemang', 'Cilandak', 'Pasar Minggu'],
    'Jakarta Pusat': ['Menteng', 'Tanah Abang', 'Gambir', 'Sawah Besar'],
    'Bandung': ['Dago', 'Cihampelas', 'Riau', 'Buah Batu'],
    'Surabaya': ['Gubeng', 'Wonokromo', 'Rungkut', 'Mulyorejo']
  };
  const zonesByArea: Record<string, string[]> = {
    'Kebayoran Baru': ['Senayan', 'Melawai', 'Kramat Pela', 'Gandaria Utara'],
    'Menteng': ['Pegangsaan', 'Kebon Sirih', 'Gondangdia'],
    'Dago': ['Dago Atas', 'Dago Bawah', 'Dago Pakar'],
    'Gubeng': ['Gubeng Kertajaya', 'Gubeng Airlangga', 'Gubeng Surabaya']
  };

  const getCitiesForRegion = (region: string) => citiesByRegion[region] || [];
  const getAreasForCity = (city: string) => areasByCity[city] || [];
  const getZonesForArea = (area: string) => zonesByArea[area] || [];

  const handleAddAddress = () => {
    const address: Address = {
      id: Date.now().toString(),
      ...newAddress,
      isDefault: addresses.length === 0
    };
    setAddresses([...addresses, address]);
    setNewAddress({
      label: '',
      addressLine: '',
      region: '',
      city: '',
      area: '',
      zone: '',
      postalCode: '',
      phone: '',
      extraPhone: '',
      additionalInfo: ''
    });
    setIsAddingNew(false);
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleEditAddress = (address: Address) => {
    setEditingId(address.id);
    setNewAddress({
      label: address.label,
      addressLine: address.addressLine,
      region: address.region,
      city: address.city,
      area: address.area,
      zone: address.zone,
      postalCode: address.postalCode,
      phone: address.phone,
      extraPhone: address.extraPhone || '',
      additionalInfo: address.additionalInfo || ''
    });
    setIsAddingNew(true);
  };

  const handleUpdateAddress = () => {
    if (editingId) {
      setAddresses(addresses.map(addr => 
        addr.id === editingId 
          ? { ...addr, ...newAddress }
          : addr
      ));
      setEditingId(null);
    } else {
      const address: Address = {
        id: Date.now().toString(),
        ...newAddress,
        isDefault: addresses.length === 0
      };
      setAddresses([...addresses, address]);
    }
    setNewAddress({
      label: '',
      addressLine: '',
      region: '',
      city: '',
      area: '',
      zone: '',
      postalCode: '',
      phone: '',
      extraPhone: '',
      additionalInfo: ''
    });
    setIsAddingNew(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-8">
        {/* User Dropdown Header */}
        <div className="mb-6 sm:mb-8">
          <UserDropdown activeSection="address" />
        </div>
        
        {/* Address Content */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Saved Addresses</h1>
              <button
                onClick={() => setIsAddingNew(true)}
                className="w-full sm:w-auto px-4 py-3 bg-[#861718] text-white rounded-lg hover:bg-[#A82B2B] transition-colors font-medium text-center"
              >
                Add New Address
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {isAddingNew && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-xl p-4 sm:p-6 mb-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {editingId ? 'Edit Address' : 'Add New Address'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Label*</label>
                    <input
                      type="text"
                      value={newAddress.label}
                      onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
                      placeholder="e.g., Home, Office"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent text-base"
                      required
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Line*</label>
                    <input
                      type="text"
                      value={newAddress.addressLine}
                      onChange={(e) => setNewAddress({...newAddress, addressLine: e.target.value})}
                      placeholder="Street address, building name, apartment number"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Region*</label>
                    <select
                      value={newAddress.region}
                      onChange={(e) => {
                        setNewAddress({
                          ...newAddress, 
                          region: e.target.value,
                          city: '',
                          area: '',
                          zone: ''
                        });
                      }}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent text-base"
                      required
                    >
                      <option value="">Select Region</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City*</label>
                    <select
                      value={newAddress.city}
                      onChange={(e) => {
                        setNewAddress({
                          ...newAddress, 
                          city: e.target.value,
                          area: '',
                          zone: ''
                        });
                      }}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent text-base"
                      disabled={!newAddress.region}
                      required
                    >
                      <option value="">Select City</option>
                      {getCitiesForRegion(newAddress.region).map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Area*</label>
                    <select
                      value={newAddress.area}
                      onChange={(e) => {
                        setNewAddress({
                          ...newAddress, 
                          area: e.target.value,
                          zone: ''
                        });
                      }}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent text-base"
                      disabled={!newAddress.city}
                      required
                    >
                      <option value="">Select Area</option>
                      {getAreasForCity(newAddress.city).map((area) => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Zone*</label>
                    <select
                      value={newAddress.zone}
                      onChange={(e) => setNewAddress({...newAddress, zone: e.target.value})}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent text-base"
                      disabled={!newAddress.area}
                      required
                    >
                      <option value="">Select Zone</option>
                      {getZonesForArea(newAddress.area).map((zone) => (
                        <option key={zone} value={zone}>{zone}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code*</label>
                    <input
                      type="text"
                      value={newAddress.postalCode}
                      onChange={(e) => setNewAddress({...newAddress, postalCode: e.target.value})}
                      placeholder="12345"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number*</label>
                    <input
                      type="tel"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                      placeholder="+62 812 3456 7890"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Extra Phone Number</label>
                    <input
                      type="tel"
                      value={newAddress.extraPhone}
                      onChange={(e) => setNewAddress({...newAddress, extraPhone: e.target.value})}
                      placeholder="+62 811 2345 6789 (Optional)"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent text-base"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
                    <textarea
                      value={newAddress.additionalInfo}
                      onChange={(e) => setNewAddress({...newAddress, additionalInfo: e.target.value})}
                      rows={3}
                      placeholder="Landmark, building color, special instructions for delivery..."
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#861718] focus:border-transparent text-base resize-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
                  <button
                    onClick={handleUpdateAddress}
                    className="w-full sm:w-auto px-6 py-3 bg-[#861718] text-white rounded-lg hover:bg-[#A82B2B] transition-colors font-medium text-center"
                  >
                    {editingId ? 'Update Address' : 'Save Address'}
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingNew(false);
                      setEditingId(null);
                      setNewAddress({
                        label: '',
                        addressLine: '',
                        region: '',
                        city: '',
                        area: '',
                        zone: '',
                        postalCode: '',
                        phone: '',
                        extraPhone: '',
                        additionalInfo: ''
                      });
                    }}
                    className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            <div className="space-y-4">
              {addresses.map((address) => (
                <motion.div
                  key={address.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-xl p-4 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <h3 className="font-semibold text-gray-900 text-lg">{address.label}</h3>
                        {address.isDefault && (
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 text-gray-600">
                        <p className="font-medium">{address.addressLine}</p>
                        <p>{address.zone}, {address.area}</p>
                        <p>{address.city}, {address.region} {address.postalCode}</p>
                      </div>
                      <div className="mt-3 space-y-2">
                        <p className="text-gray-600 flex items-center gap-2 text-sm">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="break-all">{address.phone}</span>
                        </p>
                        {address.extraPhone && (
                          <p className="text-gray-600 flex items-center gap-2 text-sm">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="break-all">{address.extraPhone} (Extra)</span>
                          </p>
                        )}
                        {address.additionalInfo && (
                          <p className="text-gray-500 text-sm italic mt-2 p-2 bg-gray-50 rounded-lg">
                            "{address.additionalInfo}"
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col gap-3 sm:gap-2 justify-center sm:justify-start">
                      {!address.isDefault && (
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          className="px-3 py-2 text-[#861718] hover:text-[#A82B2B] text-sm font-medium hover:bg-red-50 rounded-lg transition-colors whitespace-nowrap"
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        onClick={() => handleEditAddress(address)}
                        className="px-3 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="px-3 py-2 text-red-600 hover:text-red-700 text-sm font-medium hover:bg-red-50 rounded-lg transition-colors whitespace-nowrap"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {addresses.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No saved addresses</h3>
                <p className="text-gray-500 text-center">Add your first address to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedAddressPage;
