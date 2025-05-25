'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';

type UserDetail = {
  email?: string;
  name?: string;
  phoneNumber?: string;
};

export default function Navbar() {
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDriverDropdownOpen, setIsDriverDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const driverDropdownRef = useRef<HTMLDivElement>(null);

  // Hydration-safe check for login status
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('userDetail');
      if (token && user) {
        try {
          const parsed = JSON.parse(user);
          setUserDetail(parsed);
        } catch {
          setUserDetail(null);
        }
      } else {
        setUserDetail(null);
      }
      setLoading(false);
    };

    checkAuthStatus();

    // Listen for login/logout events across tabs
    const handleLogin = () => checkAuthStatus();
    window.addEventListener('loginSuccess', handleLogin);
    window.addEventListener('storage', handleLogin);

    // Close dropdown on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (driverDropdownRef.current && !driverDropdownRef.current.contains(event.target as Node)) {
        setIsDriverDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('loginSuccess', handleLogin);
      window.removeEventListener('storage', handleLogin);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDetail');
    setUserDetail(null);
    window.location.href = '/';
  };

  const handleFeatureInDevelopment = () => {
    toast.success("Function yet to be implemented.");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <Toaster />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="relative h-12 w-48">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg">
                  BHARAT SARTHI
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link onClick={handleFeatureInDevelopment} href="#" className="text-gray-600 hover:text-blue-600 font-medium transition duration-150">
              How It Works
            </Link>
            <Link onClick={handleFeatureInDevelopment} href="#" className="text-gray-600 hover:text-blue-600 font-medium transition duration-150">
              Benefits
            </Link>
            <Link onClick={handleFeatureInDevelopment} href="#" className="text-gray-600 hover:text-blue-600 font-medium transition duration-150">
              FAQ
            </Link>
            <Link onClick={handleFeatureInDevelopment} href="#" className="text-gray-600 hover:text-blue-600 font-medium transition duration-150">
              Support
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {!loading && userDetail ? (
              <div className="relative" ref={dropdownRef}>
                {/* User dropdown button */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition duration-150"
                >
                  <UserCircleIcon className="h-6 w-6 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700 max-w-xs truncate hidden md:block">
                    {userDetail.name ? userDetail.name : userDetail.email}
                  </span>
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Signed in as</p>
                      <p className="text-sm text-gray-500 truncate">{userDetail.email}</p>
                    </div>
                    <Link onClick={handleFeatureInDevelopment} href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link href="/driver" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                    <Link onClick={handleFeatureInDevelopment} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Earnings
                    </Link>
                    <Link onClick={handleFeatureInDevelopment} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Documents
                    </Link>
                    <div className="border-t border-gray-100 mt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : !loading ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/driver/login"
                  className="text-gray-700 hover:text-blue-600 text-sm font-medium hidden md:block"
                >
                  Sign In
                </Link>
                {/* Become a Driver Dropdown */}
                <div className="relative" ref={driverDropdownRef}>
                  <button
                    onClick={() => setIsDriverDropdownOpen(!isDriverDropdownOpen)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition duration-200 shadow-sm hover:shadow-md flex items-center"
                  >
                    Become a Driver
                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                  </button>
                  {isDriverDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
                      <div className="px-4 py-2 border-b border-gray-100 text-gray-700 font-medium">
                        Continue as...
                      </div>
                      <Link
                        href="/register"
                        className="block px-4 py-2 text-sm text-blue-700 font-semibold hover:bg-blue-50"
                        onClick={() => setIsDriverDropdownOpen(false)}
                      >
                        As a Driver
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
                        disabled
                      >
                        As a User (Coming Soon)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-24 h-8 bg-gray-200 rounded-md animate-pulse"></div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
