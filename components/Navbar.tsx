'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  sub: string;
  email: string;
  exp: number;
};

const Navbar = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const decoded: JwtPayload = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('authToken');
            setUserEmail(null);
          } else {
            setUserEmail(decoded.sub); // or decoded.sub
            console.log('User email:', decoded.sub);
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

    checkToken();
    const handleLoginEvent = () => checkToken();
    window.addEventListener('loginSuccess', handleLoginEvent);
    return () => window.removeEventListener('loginSuccess', handleLoginEvent);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUserEmail(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.tiff"
                alt="Bharat Sarthi Logo"
                width={160}
                height={40}
                priority
                className="h-12 md:h-16 rounded-4xl w-auto"
              />
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 relative">
            {!loading && userEmail ? (
              <>
                {/* Avatar button */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                >
                  <span className="text-xl">👤</span>
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute top-14 right-0 w-48 bg-white rounded-md shadow-lg ring-1 ring-black w-auto ring-opacity-5 z-10">
                    <div className="px-4 py-3 border-b text-sm text-gray-700 overflow-hidden w-auto">
                      {userEmail}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : !loading ? (
              <Link
                href="/driver/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out shadow-sm"
              >
                Log In / Sign Up
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
