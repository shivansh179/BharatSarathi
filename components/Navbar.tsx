'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

import {
  ChevronDownIcon, UserCircleIcon, Bars3Icon, XMarkIcon, ShieldCheckIcon,
  AcademicCapIcon, UsersIcon, NewspaperIcon, HomeIcon, QuestionMarkCircleIcon,
  LifebuoyIcon, CogIcon, DocumentTextIcon, BanknotesIcon, UserPlusIcon,
  GlobeAltIcon, InformationCircleIcon, BriefcaseIcon,
} from '@heroicons/react/24/outline';

import { HiArrowRightStartOnRectangle } from "react-icons/hi2";
import { FaChevronDown } from 'react-icons/fa';
import NavbarInstallButton from './NavbarInstallButton';

type UserDetail = { email?: string; name?: string; phoneNumber?: string; };

export default function Navbar() {
  const { locale, setLocale } = useLanguage();
  const { t } = useTranslation('common');

  // State Management
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isGetStartedDropdownOpen, setIsGetStartedDropdownOpen] = useState(false);
  const [isApplyDropdownOpen, setIsApplyDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileApplyExpanded, setIsMobileApplyExpanded] = useState(false);

  // Refs for closing dropdowns on outside click
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const getStartedDropdownRef = useRef<HTMLDivElement>(null);
  const applyDropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  // Effect for Auth, Outside Clicks, and Body Scroll
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('userDetail');
      if (token && user) {
        try { setUserDetail(JSON.parse(user)); } catch { setUserDetail(null); }
      } else {
        setUserDetail(null);
      }
      setLoading(false);
    };

    checkAuthStatus();
    window.addEventListener('loginSuccess', checkAuthStatus);
    window.addEventListener('storage', checkAuthStatus);

    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) setIsProfileDropdownOpen(false);
      if (getStartedDropdownRef.current && !getStartedDropdownRef.current.contains(event.target as Node)) setIsGetStartedDropdownOpen(false);
      if (applyDropdownRef.current && !applyDropdownRef.current.contains(event.target as Node)) setIsApplyDropdownOpen(false);
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) setIsLanguageDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('loginSuccess', checkAuthStatus);
      window.removeEventListener('storage', checkAuthStatus);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  // Handlers
  const closeAllDropdowns = () => {
    setIsProfileDropdownOpen(false);
    setIsGetStartedDropdownOpen(false);
    setIsApplyDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsLanguageDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDetail');
    setUserDetail(null);
    toast.success(t.logged_out_success);
    closeAllDropdowns();
    window.location.href = '/';
  };

  const handleFeatureInDevelopment = () => {
    toast.success(t.feature_coming_soon);
  };

  // Data for Menus
  const profileMenuItems = [
    { icon: UserCircleIcon, text: t.my_profile, href: '/driver' },
    { icon: BanknotesIcon, text: t.earnings, onClick: handleFeatureInDevelopment },
    { icon: DocumentTextIcon, text: t.documents, onClick: handleFeatureInDevelopment },
    { icon: CogIcon, text: t.settings, onClick: handleFeatureInDevelopment },
  ];

  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'hi-IN', name: 'हिन्दी (Hinglish)' },
    { code: 'pa-IN', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'kan', name: 'ಕನ್ನಡ (Kannada)' },
  ];

  const mainNavLinks = [
    { href: "/", text: t.nav_home, icon: HomeIcon },
    { href: "/howItWorks", text: t.nav_how_it_works, icon: InformationCircleIcon },
    { href: "/forBusiness", text: t.nav_business, icon: BriefcaseIcon },
    { href: "/faq", text: t.nav_faq, icon: QuestionMarkCircleIcon },
    { href: "/support", text: t.nav_support, icon: LifebuoyIcon },
  ];

  return (
    <>
      <Toaster position="top-right" toastOptions={{ className: 'font-sans', style: { border: '1px solid #E5E7EB', padding: '16px', color: '#1F2937' } }} />
      <nav className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-200/80">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group" onClick={closeAllDropdowns}>
                <div className="relative"><span className="bg-blue-700 text-white font-bold py-2.5 px-5 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-0.5">BHARAT SARTHI</span></div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link href="/" className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md transition-colors">{t.nav_home}</Link>
              <Link href="/howItWorks" className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md transition-colors">{t.nav_how_it_works}</Link>
              <Link href="/forBusiness" className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md transition-colors">{t.nav_business}</Link>
              
              {!userDetail && (
                <div className="relative" ref={applyDropdownRef}>
                  <button onClick={() => setIsApplyDropdownOpen(p => !p)} className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md transition-colors">
                    {t.nav_apply}
                    <FaChevronDown className={`ml-2 transition-transform duration-300 ${isApplyDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                  </button>
                  {isApplyDropdownOpen && (
                    <div className="absolute z-50 mt-2 w-72 bg-white rounded-md shadow-lg ring-1 ring-gray-200">
                      <div className="p-2">
                        {t.nav_apply_content.map((item: any, index: number) => (
                          <Link key={index} href="/forBusiness" onClick={() => setIsApplyDropdownOpen(false)} className="group flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-center h-10 w-10 flex-shrink-0 bg-gray-100 rounded-lg group-hover:bg-blue-50">
                              <img src={item.icon} alt={item.title} className="h-6 w-6 object-contain transition-transform group-hover:scale-110" />
                            </div>
                            <div className="ml-4"><p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">{item.title}</p></div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <Link href="/faq" className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md transition-colors">{t.nav_faq}</Link>
              <Link href="/support" className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md transition-colors">{t.nav_support}</Link>
            </div>

            {/* Right-side Actions & Mobile Toggle */}
            <div className="flex items-center">
              <div className="hidden lg:flex items-center space-x-4">
                {/* Install App Button */}
                <NavbarInstallButton />
                
                {/* Language Dropdown */}
                <div className="relative" ref={languageDropdownRef}>
                  <button onClick={() => setIsLanguageDropdownOpen(p => !p)} className="p-2 text-gray-600 hover:text-blue-600 rounded-md transition-colors"><GlobeAltIcon className="h-6 w-6" /></button>
                  <div className={`absolute right-0 mt-4 w-48 origin-top-right bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-out ${isLanguageDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                    <div className="p-2">{languageOptions.map((lang) => (<button key={lang.code} onClick={() => { setLocale(lang.code); setIsLanguageDropdownOpen(false); }} className={`w-full text-left flex items-center px-3 py-2 text-sm rounded-md transition-colors ${locale === lang.code ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}>{lang.name}</button>))}</div>
                  </div>
                </div>
                
                {/* Auth-based UI */}
                {loading ? (
                  <>
                    <div className="w-24 h-9 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="w-32 h-11 bg-gray-200 rounded-lg animate-pulse"></div>
                  </>
                ) : userDetail ? (
                  <div className="relative" ref={profileDropdownRef}>
                    <button onClick={() => setIsProfileDropdownOpen(p => !p)} className="flex items-center space-x-2 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                      <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">{(userDetail.name || 'U')[0].toUpperCase()}</div>
                      <span className="text-sm font-medium text-gray-800 pr-2">{userDetail.name?.split(' ')[0] || 'Profile'}</span>
                      <ChevronDownIcon className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`absolute right-0 mt-4 w-64 origin-top-right bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-out ${isProfileDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                      <div className="px-4 py-3 border-b border-gray-200/80"><p className="text-sm font-semibold text-gray-800 truncate">{userDetail.name || 'User'}</p><p className="text-xs text-gray-500 truncate">{userDetail.email}</p></div>
                      <div className="py-2">{profileMenuItems.map((item) => {
                          // FIX: Assign icon to a capitalized variable
                          const Icon = item.icon;
                          return item.href ? (
                            <Link key={item.text} href={item.href} onClick={() => setIsProfileDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors">
                                <Icon className="h-5 w-5 mr-3 text-gray-500" /> {item.text}
                            </Link>
                          ) : (
                            <button key={item.text} onClick={() => { item.onClick?.(); setIsProfileDropdownOpen(false); }} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors">
                                <Icon className="h-5 w-5 mr-3 text-gray-500" /> {item.text}
                            </button>
                          );
                      })}</div>
                      <div className="border-t border-gray-200/80 py-2"><button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"><HiArrowRightStartOnRectangle className="h-5 w-5 mr-3" /> {t.sign_out}</button></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link href="/driver/login" className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md transition-colors">{t.nav_sign_in}</Link>
                    <div className="relative" ref={getStartedDropdownRef}>
                      <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center">{t.nav_get_started}</Link>
                    </div>
                  </>
                )}
              </div>
              {/* Mobile Menu Toggle */}
              <button onClick={() => setIsMobileMenuOpen(p => !p)} className="lg:hidden ml-4 p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors">
                <span className="sr-only">Open menu</span>
                {isMobileMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Mobile Menu --- */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} role="dialog" aria-modal="true">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" onClick={closeAllDropdowns}></div>
        {/* Panel */}
        <div className={`relative h-full w-full max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Link href="/" className="flex items-center group" onClick={closeAllDropdowns}>
                <span className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm">BHARAT SARTHI</span>
              </Link>
              <button type="button" className="-m-2.5 p-2.5 rounded-md text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <div className="divide-y divide-gray-200">
                {/* User Specific Section */}
                <div className="p-4">
                  {loading ? (
                    <div className="space-y-3">
                      <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ) : userDetail ? (
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                         <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">{(userDetail.name || 'U')[0].toUpperCase()}</div>
                         <div>
                            <p className="font-semibold text-gray-800 truncate">{userDetail.name || 'User'}</p>
                            <p className="text-xs text-gray-500 truncate">{userDetail.email}</p>
                         </div>
                      </div>
                      <div className="space-y-1">
                        {profileMenuItems.map((item) => {
                            // FIX: Assign icon to a capitalized variable
                            const Icon = item.icon;
                            return item.href ? (
                              <Link key={item.text} href={item.href} onClick={closeAllDropdowns} className="flex items-center p-3 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-600">
                                <Icon className="h-5 w-5 mr-3 text-gray-500" /> {item.text}
                              </Link>
                            ) : (
                              <button key={item.text} onClick={() => { item.onClick?.(); closeAllDropdowns(); }} className="w-full text-left flex items-center p-3 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-600">
                                <Icon className="h-5 w-5 mr-3 text-gray-500" /> {item.text}
                              </button>
                            );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                        <Link href="/driver/login" onClick={closeAllDropdowns} className="w-full text-center px-4 py-2.5 text-sm font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                            {t.nav_sign_in}
                        </Link>
                        <Link href="/register" onClick={closeAllDropdowns} className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                            {t.nav_get_started}
                        </Link>
                    </div>
                  )}
                </div>
                
                {/* Main Navigation */}
                <div className="py-2 px-4 space-y-1">
                  {mainNavLinks.map(link => {
                    // FIX: Assign icon to a capitalized variable
                    const Icon = link.icon;
                    return (
                      <Link key={link.href} href={link.href} onClick={closeAllDropdowns} className="flex items-center p-3 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100">
                        <Icon className="h-6 w-6 mr-3 text-gray-500"/>
                        {link.text}
                      </Link>
                    );
                  })}
                  
                  {/* Mobile Install Button */}
                  <div className="px-3 py-2">
                    <NavbarInstallButton />
                  </div>
                  {/* Apply Section for Logged-out Mobile Users */}
                  {!userDetail && (
                    <div>
                      <button onClick={() => setIsMobileApplyExpanded(p => !p)} className="flex items-center justify-between w-full p-3 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100">
                        <span className="flex items-center"><UserPlusIcon className="h-6 w-6 mr-3 text-gray-500" />{t.nav_apply}</span>
                        <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${isMobileApplyExpanded ? 'rotate-180' : ''}`}/>
                      </button>
                      {isMobileApplyExpanded && (
                         <div className="pl-6 mt-1 space-y-1">
                          {t.nav_apply_content.map((item: any, index: number) => (
                            <Link key={index} href="/forBusiness" onClick={closeAllDropdowns} className="group flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <img src={item.icon} alt={item.title} className="h-6 w-6 object-contain flex-shrink-0 mr-3"/>
                                <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">{item.title}</p>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Language Selector */}
                <div className="py-4 px-4">
                   <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"></p>
                   <div className="mt-2 space-y-1">
                      {languageOptions.map((lang) => (
                        <button key={lang.code} onClick={() => { setLocale(lang.code); closeAllDropdowns(); }} className={`w-full text-left flex items-center p-3 text-sm font-medium rounded-md transition-colors ${locale === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                          {lang.name}
                        </button>
                      ))}
                   </div>
                </div>

                {/* Logout Button */}
                {userDetail && (
                  <div className="py-4 px-4">
                     <button onClick={handleLogout} className="w-full text-left flex items-center p-3 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors">
                        <HiArrowRightStartOnRectangle className="h-5 w-5 mr-3" />
                        {t.sign_out}
                     </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}