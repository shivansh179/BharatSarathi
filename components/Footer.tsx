import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-600">Email: support@driverapp.com</p>
              <p className="text-gray-600">Phone: +91 1234567890</p>
              <p className="text-gray-600">Address: 123 Transport Lane, Mumbai, India</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 hover:text-blue-500">About Us</Link></li>
                <li><Link href="/services" className="text-gray-600 hover:text-blue-500">Our Services</Link></li>
                <li><Link href="/faq" className="text-gray-600 hover:text-blue-500">FAQs</Link></li>
                <li><Link href="/support" className="text-gray-600 hover:text-blue-500">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Download App</h3>
              <div className="flex flex-col gap-3">
                <Link href="#" className="block w-40">
                  <Image src="/app-store.png" alt="App Store" width={160} height={48} />
                </Link>
                <Link href="#" className="block w-40">
                  <Image src="/play-store.png" alt="Play Store" width={160} height={48} />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Driver Onboarding App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }