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
const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
const [isGetStartedDropdownOpen, setIsGetStartedDropdownOpen] = useState(false);
const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
const profileDropdownRef = useRef<HTMLDivElement>(null);
const getStartedDropdownRef = useRef<HTMLDivElement>(null);
const resourcesDropdownRef = useRef<HTMLDivElement>(null);
useEffect(() => {
const checkAuthStatus = () => {
const token = localStorage.getItem('authToken');
const user = localStorage.getItem('userDetail');
if (token && user) {
try {
setUserDetail(JSON.parse(user));
} catch {
setUserDetail(null);
}
} else {
setUserDetail(null);
}
setLoading(false);
};checkAuthStatus();
window.addEventListener('loginSuccess', checkAuthStatus);
window.addEventListener('storage', checkAuthStatus);

const handleClickOutside = (event: MouseEvent) => {
  if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
    setIsProfileDropdownOpen(false);
  }
  if (getStartedDropdownRef.current && !getStartedDropdownRef.current.contains(event.target as Node)) {
    setIsGetStartedDropdownOpen(false);
  }
  if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(event.target as Node)) {
    setIsResourcesDropdownOpen(false);
  }
};
document.addEventListener('mousedown', handleClickOutside);

return () => {
  window.removeEventListener('loginSuccess', checkAuthStatus);
  window.removeEventListener('storage', checkAuthStatus);
  document.removeEventListener('mousedown', handleClickOutside);
};}, []);
useEffect(() => {
if (isMobileMenuOpen) {
document.body.style.overflow = 'hidden';
} else {
document.body.style.overflow = 'unset';
}
return () => {
document.body.style.overflow = 'unset';
};
}, [isMobileMenuOpen]);
const closeAllDropdowns = () => {
setIsProfileDropdownOpen(false);
setIsGetStartedDropdownOpen(false);
setIsResourcesDropdownOpen(false);
setIsMobileMenuOpen(false);
setIsMobileProfileOpen(false);
};
const handleLogout = () => {
localStorage.removeItem('authToken');
localStorage.removeItem('userDetail');
setUserDetail(null);
toast.success('Logged out successfully');
closeAllDropdowns();
window.location.href = '/';
};
const handleFeatureInDevelopment = () => {
toast.success("Feature coming soon!");
};
const resourcesItems = [
{ icon: ShieldCheckIcon, title: 'Driver Welfare Schemes', description: 'Govt. initiatives and benefits', href: '/driver-welfare', color: 'text-green-600' },
{ icon: AcademicCapIcon, title: 'Training & Certification', description: 'Enhance your professional skills', href: '/training-certification', color: 'text-blue-600' },
{ icon: UsersIcon, title: 'Community Forum', description: 'Connect with fellow drivers', href: '/community-forum', color: 'text-purple-600' },
{ icon: NewspaperIcon, title: 'News & Updates', description: 'Latest transport industry news', href: '/news-updates', color: 'text-orange-600' }
];
const profileMenuItems = [
{ icon: UserCircleIcon, text: 'My Profile', href: '/driver' },
{ icon: BanknotesIcon, text: 'Earnings', onClick: handleFeatureInDevelopment },
{ icon: DocumentTextIcon, text: 'Documents', onClick: handleFeatureInDevelopment },
{ icon: CogIcon, text: 'Settings', onClick: handleFeatureInDevelopment }
];
return (
<>
<Toaster position="top-right" toastOptions={{
className: 'font-sans',
style: {
border: '1px solid #E5E7EB',
padding: '16px',
color: '#1F2937',
},
}}/>
<nav className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-200/80">
<div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between items-center h-20">
<div className="flex-shrink-0">
<Link href="/" className="flex items-center group" onClick={closeAllDropdowns}>
<div className="relative">
<span className="bg-blue-700 text-white font-bold py-2.5 px-5 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-0.5">
BHARAT SARTHI
</span>
</div>
</Link>
</div>        <div className="hidden lg:flex items-center space-x-2">
          <Link href="/" className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md transition-colors">Home</Link>
          <Link href="/howItWorks" className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md transition-colors">How It Works</Link>
          <Link href="/benefits" className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md transition-colors">Benefits</Link>
          
          <div className="relative" ref={resourcesDropdownRef}>
            <button onClick={() => setIsResourcesDropdownOpen(p => !p)} className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md transition-colors">
              Resources <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform duration-200 ${isResourcesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute left-1/2 -translate-x-1/2 mt-4 w-96 origin-top-right bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-out ${isResourcesDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
              <div className="p-2">
                {resourcesItems.map((item) => (
                  <Link key={item.title} href={item.href} onClick={() => setIsResourcesDropdownOpen(false)} className="group flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-center h-10 w-10 flex-shrink-0 bg-gray-100 rounded-lg group-hover:bg-blue-50">
                      <item.icon className={`h-6 w-6 ${item.color} transition-transform group-hover:scale-110`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/faq" className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md transition-colors">FAQ</Link>
          <Link href="/support" className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md transition-colors">Support</Link>
        </div>

        <div className="flex items-center">
          <div className="hidden lg:flex items-center space-x-4">
            {loading ? (
              <>
                <div className="w-24 h-9 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="w-32 h-11 bg-gray-200 rounded-lg animate-pulse"></div>
              </>
            ) : userDetail ? (
              <div className="relative" ref={profileDropdownRef}>
                <button onClick={() => setIsProfileDropdownOpen(p => !p)} className="flex items-center space-x-2 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {(userDetail.name || 'U')[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-800 pr-2">{userDetail.name?.split(' ')[0] || 'Profile'}</span>
                  <ChevronDownIcon className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute right-0 mt-4 w-64 origin-top-right bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-out ${isProfileDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                  <div className="px-4 py-3 border-b border-gray-200/80">
                    <p className="text-sm font-semibold text-gray-800 truncate">{userDetail.name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{userDetail.email}</p>
                  </div>
                  <div className="py-2">
                    {profileMenuItems.map((item) => (
                      item.href ? (
                        <Link key={item.text} href={item.href} onClick={() => setIsProfileDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors">
                          <item.icon className="h-5 w-5 mr-3 text-gray-500" /> {item.text}
                        </Link>
                      ) : (
                        <button key={item.text} onClick={item.onClick} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors">
                          <item.icon className="h-5 w-5 mr-3 text-gray-500" /> {item.text}
                        </button>
                      )
                    ))}
                  </div>
                  <div className="border-t border-gray-200/80 py-2">
                    <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link href="/driver/login" className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-md transition-colors">
                  Sign In
                </Link>
                <div className="relative" ref={getStartedDropdownRef}>
                  <button onClick={() => setIsGetStartedDropdownOpen(p => !p)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center">
                    Get Started
                  </button>
                  <div className={`absolute right-0 mt-4 w-64 origin-top-right bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-out ${isGetStartedDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                    <div className="p-2">
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-900">Join Bharat Sarthi</h3>
                        <p className="text-sm text-gray-500 mt-1">Choose your path to begin</p>
                      </div>
                      <Link href="/register" onClick={() => setIsGetStartedDropdownOpen(false)} className="group flex items-center w-full p-3 text-sm rounded-lg hover:bg-blue-50 transition-colors">
                        <UserPlusIcon className="h-6 w-6 mr-3 text-blue-600"/>
                        <div>
                            <p className="font-semibold text-blue-700">Register as a Driver</p>
                            <p className="text-xs text-gray-500">Start your journey with us today.</p>
                        </div>
                      </Link>
                      <div className="group flex items-center w-full p-3 text-sm rounded-lg bg-gray-50 cursor-not-allowed">
                        <UserCircleIcon className="h-6 w-6 mr-3 text-gray-400"/>
                         <div>
                            <p className="font-semibold text-gray-500">User Registration</p>
                            <p className="text-xs text-gray-400">Coming soon.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <button onClick={() => setIsMobileMenuOpen(p => !p)} className="lg:hidden ml-4 p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors">
            {isMobileMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
          </button>
        </div>
      </div>
    </div>

    {isMobileMenuOpen && (
      <div className="lg:hidden absolute top-full left-0 w-full h-[calc(100vh-5rem)] bg-white overflow-y-auto">
        <div className="px-4 pt-4 pb-8 space-y-2">
          {userDetail ? (
            <div className="bg-gray-50 rounded-lg">
              <button onClick={() => setIsMobileProfileOpen(p => !p)} className="w-full flex justify-between items-center p-4">
                 <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {(userDetail.name || 'U')[0].toUpperCase()}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800 text-left">{userDetail.name}</p>
                        <p className="text-sm text-gray-500 text-left">{userDetail.email}</p>
                    </div>
                 </div>
                 <ChevronDownIcon className={`h-5 w-5 text-gray-500 transition-transform ${isMobileProfileOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileProfileOpen && (
                <div className="px-2 pb-2 space-y-1 border-t border-gray-200">
                    {profileMenuItems.map((item) => (
                       item.href ? (
                        <Link key={item.text} href={item.href} onClick={closeAllDropdowns} className="flex items-center px-3 py-3 text-base text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <item.icon className="h-5 w-5 mr-4 text-gray-500" /> {item.text}
                        </Link>
                      ) : (
                        <button key={item.text} onClick={item.onClick} className="w-full text-left flex items-center px-3 py-3 text-base text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <item.icon className="h-5 w-5 mr-4 text-gray-500" /> {item.text}
                        </button>
                      )
                    ))}
                    <button onClick={handleLogout} className="w-full text-left flex items-center px-3 py-3 text-base text-red-600 rounded-md hover:bg-red-50 transition-colors">
                        <ArrowRightOnRectangleIcon className="h-5 w-5 mr-4" /> Sign Out
                    </button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
                <Link href="/driver/login" onClick={closeAllDropdowns} className="w-full text-center px-4 py-3 bg-gray-100 text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition-colors">Sign In</Link>
                <Link href="/register" onClick={closeAllDropdowns} className="w-full text-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">Get Started</Link>
            </div>
          )}
          
          <div className="py-4 space-y-2 border-t border-gray-200/80 mt-4">
              <Link href="/" onClick={closeAllDropdowns} className="flex items-center px-3 py-3 text-base text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"><HomeIcon className="h-5 w-5 mr-4 text-gray-500"/>Home</Link>
              <Link href="/howItWorks" onClick={closeAllDropdowns} className="block px-3 py-3 text-base text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors">How It Works</Link>
              <Link href="/benefits" onClick={closeAllDropdowns} className="block px-3 py-3 text-base text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors">Benefits</Link>
              <p className="px-3 pt-4 pb-1 text-sm font-semibold text-gray-400">Resources</p>
              {resourcesItems.map((item) => (
                <Link key={item.title} href={item.href} onClick={closeAllDropdowns} className="flex items-center px-3 py-3 text-base text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <item.icon className={`h-5 w-5 mr-4 ${item.color}`} /> {item.title}
                </Link>
              ))}
              <p className="px-3 pt-4 pb-1 text-sm font-semibold text-gray-400">Help</p>
              <Link href="/faq" onClick={closeAllDropdowns} className="flex items-center px-3 py-3 text-base text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"><QuestionMarkCircleIcon className="h-5 w-5 mr-4 text-gray-500"/>FAQ</Link>
              <Link href="/support" onClick={closeAllDropdowns} className="flex items-center px-3 py-3 text-base text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"><LifebuoyIcon className="h-5 w-5 mr-4 text-gray-500"/>Support</Link>
          </div>
        </div>
      </div>
    )}
  </nav>
</>);
}