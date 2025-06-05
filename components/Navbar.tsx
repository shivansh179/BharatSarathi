'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { 
  ChevronDownIcon, 
  UserCircleIcon, 
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  UsersIcon,
  NewspaperIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  LifebuoyIcon,
  CogIcon,
  DocumentTextIcon,
  BanknotesIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
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
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const driverDropdownRef = useRef<HTMLDivElement>(null);
  const resourcesDropdownRef = useRef<HTMLDivElement>(null);

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

    // Close dropdowns on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (driverDropdownRef.current && !driverDropdownRef.current.contains(event.target as Node)) {
        setIsDriverDropdownOpen(false);
      }
      if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(event.target as Node)) {
        setIsResourcesDropdownOpen(false);
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
    toast.success('Logged out successfully');
    window.location.href = '/';
  };

  const handleFeatureInDevelopment = () => {
    toast.success("Feature coming soon!");
  };

  const resourcesItems = [
    {
      icon: ShieldCheckIcon,
      title: 'Driver Welfare Schemes',
      description: 'Government initiatives and benefits for drivers',
      href: '/driver-welfare',
      color: 'text-green-600'
    },
    {
      icon: AcademicCapIcon,
      title: 'Training & Certification',
      description: 'Enhance skills with certified programs',
      href: '/training-certification',
      color: 'text-blue-600'
    },
    {
      icon: UsersIcon,
      title: 'Community Forum',
      description: 'Connect with fellow drivers',
      href: '/community-forum',
      color: 'text-purple-600'
    },
    {
      icon: NewspaperIcon,
      title: 'News & Updates',
      description: 'Latest transportation news and regulations',
      href: '/news-updates',
      color: 'text-orange-600'
    }
  ];

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <Toaster position="top-right" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                    <span className="text-lg tracking-wide">BHARAT SARTHI</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link 
                href="/" 
                className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                Home
              </Link>
              <Link 
                href="/howItWorks" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
              >
                How It Works
              </Link>
              <Link 
                href="/benefits" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
              >
                Benefits
              </Link>

              {/* Resources Dropdown */}
              <div className="relative" ref={resourcesDropdownRef}>
                <button
                  onClick={() => setIsResourcesDropdownOpen(!isResourcesDropdownOpen)}
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
                >
                  Resources
                  <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform duration-200 ${isResourcesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isResourcesDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 overflow-hidden">
                    <div className="p-2">
                      {resourcesItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                          onClick={() => setIsResourcesDropdownOpen(false)}
                        >
                          <item.icon className={`h-6 w-6 mt-0.5 mr-3 ${item.color} group-hover:scale-110 transition-transform duration-200`} />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link 
                href="/faq" 
                className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
              >
                <QuestionMarkCircleIcon className="h-4 w-4 mr-2" />
                FAQ
              </Link>
              <Link 
                href="/support" 
                className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
              >
                <LifebuoyIcon className="h-4 w-4 mr-2" />
                Support
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {!loading && userDetail ? (
                <div className="relative" ref={dropdownRef}>
                  {/* User dropdown button */}
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {(userDetail.name || userDetail.email || 'U')[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-semibold text-gray-900 truncate max-w-32">
                        {userDetail.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-32">
                        {userDetail.email}
                      </p>
                    </div>
                    <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                  </button>
                  
                  {/* Enhanced Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-10 overflow-hidden">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {(userDetail.name || userDetail.email || 'U')[0].toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{userDetail.name || 'User'}</p>
                            <p className="text-sm text-gray-600 truncate">{userDetail.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-2">
                        <Link 
                          href="/driver" 
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <UserCircleIcon className="h-5 w-5 mr-3" />
                          My Profile
                        </Link>
                        <button
                          onClick={handleFeatureInDevelopment}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-200"
                        >
                          <BanknotesIcon className="h-5 w-5 mr-3" />
                          Earnings
                        </button>
                        <button
                          onClick={handleFeatureInDevelopment}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-200"
                        >
                          <DocumentTextIcon className="h-5 w-5 mr-3" />
                          Documents
                        </button>
                        <button
                          onClick={handleFeatureInDevelopment}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-200"
                        >
                          <CogIcon className="h-5 w-5 mr-3" />
                          Settings
                        </button>
                      </div>
                      
                      <div className="border-t border-gray-100 p-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
                        >
                          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
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
                    className="hidden md:block text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  
                  {/* Enhanced Become a Driver Dropdown */}
                  <div className="relative" ref={driverDropdownRef}>
                    <button
                      onClick={() => setIsDriverDropdownOpen(!isDriverDropdownOpen)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center"
                    >
                      Get Started
                      <ChevronDownIcon className="h-4 w-4 ml-2" />
                    </button>
                    
                    {isDriverDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-10 overflow-hidden">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                          <h3 className="font-semibold text-gray-900">Join Bharat Sarthi</h3>
                          <p className="text-sm text-gray-600 mt-1">Choose your path</p>
                        </div>
                        <div className="p-2">
                          <Link
                            href="/register"
                            className="flex items-center px-4 py-3 text-blue-700 font-semibold hover:bg-blue-50 rounded-xl transition-colors duration-200"
                            onClick={() => setIsDriverDropdownOpen(false)}
                          >
                            <UserPlusIcon className="h-5 w-5 mr-3" />
                            Register as Driver
                          </Link>
                          <button
                            className="flex items-center w-full px-4 py-3 text-gray-400 cursor-not-allowed rounded-xl"
                            disabled
                          >
                            <UserCircleIcon className="h-5 w-5 mr-3" />
                            User Registration
                            <span className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded-full">Soon</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="w-20 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-24 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            <Link 
              href="/" 
              className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              Home
            </Link>
            <Link 
              href="/howItWorks" 
              className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              href="/benefits" 
              className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Benefits
            </Link>
            
            {/* Mobile Resources */}
            <div className="px-4 py-2">
              <p className="text-sm font-semibold text-gray-500 mb-2">Resources</p>
              {resourcesItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200 mb-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
                  {item.title}
                </Link>
              ))}
            </div>
            
            <Link 
              href="/faq" 
              className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <QuestionMarkCircleIcon className="h-5 w-5 mr-3" />
              FAQ
            </Link>
            <Link 
              href="/support" 
              className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LifebuoyIcon className="h-5 w-5 mr-3" />
              Support
            </Link>
            
            {!userDetail && (
              <div className="pt-4 border-t border-gray-100">
                <Link
                  href="/driver/login"
                  className="block w-full text-center px-4 py-3 text-blue-600 font-medium hover:bg-blue-50 rounded-xl transition-colors duration-200 mb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}