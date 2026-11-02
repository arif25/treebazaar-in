'use client';

import React, { useState } from 'react';
import { X, MapPin, Check } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onSelectLocation: (location: string) => void;
}

const POPULAR_CITIES = [
  { city: 'Kolkata', pincode: '700001' },
  { city: 'Mumbai', pincode: '400001' },
  { city: 'Bengaluru', pincode: '560001' },
  { city: 'New Delhi', pincode: '110001' },
  { city: 'Hyderabad', pincode: '500001' },
  { city: 'Chennai', pincode: '600001' },
  { city: 'Pune', pincode: '411001' },
];

export default function LocationModal({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}: LocationModalProps) {
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleApplyPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincode.trim();
    if (!/^\d{6}$/.test(clean)) {
      setError('Please enter a valid 6-digit Indian PIN code');
      return;
    }
    setError('');
    onSelectLocation(`India ${clean}`);
    onClose();
  };

  const handleSelectCity = (city: string, pin: string) => {
    onSelectLocation(`${city} ${pin}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#E5EEE5] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#244C38] text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#80C995]" />
              <h3 className="text-sm font-bold">Choose your delivery location</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#EAF6EC] hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-4">
            <p className="text-xs text-[#718078] leading-relaxed">
              Select your delivery location to see product availability and Amazon Prime delivery speeds.
            </p>

            {/* PIN Code Form */}
            <form onSubmit={handleApplyPincode} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter a 6-digit PIN code"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                    if (error) setError('');
                  }}
                  className="flex-1 px-3.5 py-2 text-xs border border-[#E5EEE5] rounded-xl text-[#244C38] focus:border-[#4CAF72] focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4CAF72] hover:bg-[#278653] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {error && <p className="text-[11px] text-[#E85D5D]">{error}</p>}
            </form>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#E5EEE5] w-full" />
              <span className="bg-white px-3 text-[11px] text-[#718078] absolute">or select a popular city</span>
            </div>

            {/* Popular Cities */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {POPULAR_CITIES.map((item) => {
                const isSelected = currentLocation.includes(item.city);
                return (
                  <button
                    key={item.city}
                    onClick={() => handleSelectCity(item.city, item.pincode)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[#4CAF72] bg-[#EAF6EC] font-bold text-[#244C38]'
                        : 'border-[#E5EEE5] hover:bg-[#FAF9F5] text-[#244C38]'
                    }`}
                  >
                    <div>
                      <span className="block font-semibold">{item.city}</span>
                      <span className="text-[10px] text-[#718078]">{item.pincode}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#278653]" />}
                  </button>
                );
              })}
            </div>

            <div className="p-3 rounded-xl bg-[#F3FAF4] border border-[#E5EEE5] text-[11px] text-[#718078]">
              🌲 <strong>Prime Delivery:</strong> All plant orders are dispatched safely across India with shockproof packaging.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

