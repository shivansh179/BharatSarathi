import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="Company Logo" width={180} height={40} className="h-10 w-auto" />
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/driver/login" 
            className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg"
          >
            Driver Login
          </Link>
          <Link 
            href="/fleet/login" 
            className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg"
          >
            Fleet Login
          </Link>
          <Link 
            href="/register" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Register Now
          </Link>
        </div>
      </div>
    </header>
  );
}