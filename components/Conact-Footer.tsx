// src/components/layout/Footer.tsx
import Link from 'next/link';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
// Assuming you might use a library like 'react-icons' for social media
// Example: import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

// Placeholder Social Media Icons (replace with actual icons/links)
const SocialIconPlaceholder = ({ label }: { label: string }) => (
  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs text-gray-600 hover:bg-gray-400 transition" title={label}>
    {label.substring(0, 2)}
  </div>
);


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto text-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand/About Section (Optional - good for balance) */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Bharat Sarthi</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Connecting drivers and passengers across India. Your trusted travel partner.
              {/* Add a bit more descriptive text if you like */}
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-span-1">
            <h3 className="text-base font-medium text-gray-800 mb-4">Quick Links</h3>
             <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-gray-600 hover:text-indigo-600 transition">About Us</Link></li>
              <li><Link href="/how-it-works" className="text-sm text-gray-600 hover:text-indigo-600 transition">How It Works</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-600 hover:text-indigo-600 transition">FAQ</Link></li>
              {/* Add more relevant links */}
            </ul>
          </div>

          {/* Legal Section */}
          <div className="col-span-1">
            <h3 className="text-base font-medium text-gray-800 mb-4">Legal</h3>
             <ul className="space-y-3">
              <li><Link href="/terms" className="text-sm text-gray-600 hover:text-indigo-600 transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-indigo-600 transition">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="text-sm text-gray-600 hover:text-indigo-600 transition">Cookie Policy</Link></li>
             </ul>
          </div>


          {/* Contact Info Section */}
          <div className="col-span-1">
            <h3 className="text-base font-medium text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@bharatsarthi.com" className="flex items-start text-sm text-gray-600 hover:text-indigo-600 transition group">
                  <EnvelopeIcon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-indigo-500 transition flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>support@bharatsarthi.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+911234567890" className="flex items-start text-sm text-gray-600 hover:text-indigo-600 transition group">
                  <PhoneIcon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-indigo-500 transition flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>+91 123 456 7890</span> {/* Replace */}
                </a>
              </li>
              <li className="flex items-start text-sm text-gray-600">
                 <MapPinIcon className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                 <span>123 Sarthi Marg, New Delhi, India</span> {/* Replace */}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Social Links */}
        <div className="mt-10 pt-8 border-t border-gray-300 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs text-gray-500 order-2 sm:order-1 mt-4 sm:mt-0">
            © {currentYear} Bharat Sarthi Technologies Pvt. Ltd. All Rights Reserved.
          </p>
          {/* Social Media Icons */}
          <div className="flex space-x-5 order-1 sm:order-2">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">Facebook</span>
              {/* Replace with actual Icon Component e.g. <FaFacebook className="w-5 h-5" /> */}
              <SocialIconPlaceholder label="FB" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
               <span className="sr-only">Twitter</span>
               {/* <FaTwitter className="w-5 h-5" /> */}
               <SocialIconPlaceholder label="TW" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
               <span className="sr-only">Instagram</span>
               {/* <FaInstagram className="w-5 h-5" /> */}
               <SocialIconPlaceholder label="IG" />
            </a>
             <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
               <span className="sr-only">LinkedIn</span>
               {/* <FaLinkedin className="w-5 h-5" /> */}
               <SocialIconPlaceholder label="LI" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;