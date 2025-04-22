'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';

type JwtPayload = {
  sub: string;
  email: string;
  exp: number;
};

export default function Navbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('userDetail');
      if (token) {
        try {
          const parsed = JSON.parse(token);
          if (parsed?.email) {
            setUserEmail(parsed.email);
          }
        } catch (err) {
          console.error('Failed to parse userDetail from localStorage', err);
        }
      }
    };
  
    checkAuthStatus();
  }, []);
  
 
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          // Mock implementation for jwtDecode - replace with actual library in production
          const decoded = {
            sub: "driver@example.com",
            email: "driver@example.com",
            exp: Math.floor(Date.now() / 1000) + 3600
          };
          
          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('authToken');
            setUserEmail(null);
          }
        } catch (err) {
          console.error('Invalid token:', err);
          localStorage.removeItem('authToken');
          setUserEmail(null);
        }
      } else {
        setUserEmail(null);
      }
      setLoading(false);
    };

    

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    checkToken();
    document.addEventListener('mousedown', handleClickOutside);
    const handleLoginEvent = () => checkToken();
    window.addEventListener('loginSuccess', handleLoginEvent);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('loginSuccess', handleLoginEvent);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUserEmail(null);
    window.location.href = '/';
  };

  const handleFeatureInDevelopment = () => {
    toast.success("Function yet to be implemented.");
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="relative h-12 w-48">
                {/* Placeholder logo - replace with your actual logo */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg">
                  BHARAT SARTHI
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link onClick={handleFeatureInDevelopment} href="" className="text-gray-600 hover:text-blue-600 font-medium transition duration-150">
              How It Works
            </Link>
            <Link onClick={handleFeatureInDevelopment} href="" className="text-gray-600 hover:text-blue-600 font-medium transition duration-150">
              Benefits
            </Link>
            <Link onClick={handleFeatureInDevelopment} href="" className="text-gray-600 hover:text-blue-600 font-medium transition duration-150">
              FAQ
            </Link>
            <Link onClick={handleFeatureInDevelopment} href="" className="text-gray-600 hover:text-blue-600 font-medium transition duration-150">
              Support
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {!loading && userEmail ? (
              <div className="relative" ref={dropdownRef}>
                {/* User dropdown button */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition duration-150"
                >
                  <UserCircleIcon className="h-6 w-6 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700 max-w-xs truncate hidden md:block">
                    {userEmail}
                  </span>
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Signed in as</p>
                      <p className="text-sm text-gray-500 truncate">{userEmail}</p>
                    </div>
                    
                    <Link onClick={handleFeatureInDevelopment} href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link  href="/driver" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                    <Link onClick={handleFeatureInDevelopment} href="" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Earnings
                    </Link>
                    <Link onClick={handleFeatureInDevelopment} href="" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
                <Link
                  href="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition duration-200 shadow-sm hover:shadow-md"
                >
                  Become a Driver
                </Link>
              </div>
            ) : (
              <div className="w-24 h-8 bg-gray-200 rounded-md animate-pulse"></div>
            )}
          </div>
        </div>
      </div>
      <Toaster/>
    </nav>
  );
}