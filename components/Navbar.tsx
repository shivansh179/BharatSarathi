// src/components/layout/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section (Top Left) */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              {/* Replace with your actual logo */}
              <Image
                src="/logo.tiff" // Place your logo in the 'public' folder
                alt="Bharat Sarthi Logo"
                width={160} // Adjust width as needed
                height={40} // Adjust height as needed
                priority // Good practice for LCP elements like logos
                className="h-12 md:h-16  rounded-4xl w-auto" // Control responsive height
              />
            </Link>
          </div>

          {/* Login Section (Top Right) */}
          <div className="flex items-center">
            <Link
              href="/driver/login" // Adjust link to your login page route
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out shadow-sm"
            >
              Log In / Sign Up
            </Link>
            {/* You could add other nav items here if needed */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;