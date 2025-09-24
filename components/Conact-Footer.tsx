import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  const { t } = useTranslation('common');
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const copyrightText = t.footer_copyright.replace('{year}', currentYear.toString());

  const toggleResources = () => {
    setIsResourcesOpen(!isResourcesOpen);
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bharat Sarthi</h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">{t.footer_description}</p>
            <div className="flex space-x-4">
              {/* Social Media Icons remain static as they have no text */}
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300">
                <span className="sr-only">Facebook</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300">
                 <span className="sr-only">Instagram</span>
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.footer_quick_links}</h3>
            <ul className="space-y-3">
              {t.footer_quick_links_list.map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="group flex items-center text-gray-600 hover:text-blue-600 transition duration-150">
                    <ChevronRightIcon className="h-4 w-4 mr-2 text-gray-400 group-hover:text-blue-500" /><span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.footer_support}</h3>
            <ul className="space-y-3">
              {t.footer_support_list.map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="group flex items-center text-gray-600 hover:text-blue-600 transition duration-150">
                    <ChevronRightIcon className="h-4 w-4 mr-2 text-gray-400 group-hover:text-blue-500" /><span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div 
              onClick={toggleResources}
              className="flex flex-col left-0  justify-between cursor-pointer group mb-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition duration-150">
                {t.footer_resources}
              </h3>

              <div className="flex items-center">
  <ChevronRightIcon
    className={`h-4 w-4 mr-2 text-gray-400 group-hover:text-blue-500 transition-transform duration-200 ${
      isResourcesOpen ? 'rotate-90' : ''
    }`}
  />
  <span className="text-gray-600">{t.nav_resources}</span>
</div>
</div>

            
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isResourcesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <ul className="space-y-4">
                {t.resources_list.map((resource) => (
                  <li key={resource.title} className="border-l-2 border-blue-100 pl-4 hover:border-blue-300 transition duration-150">
                    <Link href={resource.href} className="block group">
                      <div className="flex items-start">
                        <ChevronRightIcon className="h-4 w-4 mr-2 mt-0.5 text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition duration-150">
                            {resource.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-600 transition duration-150">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.footer_contact_us}</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+911234567890" className="flex items-start text-gray-600 hover:text-blue-600 transition duration-150">
                  <PhoneIcon className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0" /><span>+91 9953033803</span>
                </a>
              </li>
              <li>
                <a href="mailto:support@bharatsarthi.com" className="flex items-start text-gray-600 hover:text-blue-600 transition duration-150">
                  <EnvelopeIcon className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0" /><span>support@bharatsarathi.com</span>
                </a>
              </li>
              <li className="flex items-start text-gray-600">
                <MapPinIcon className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0 mt-0.5" /><span className='whitespace-pre-line'>{t.footer_address_value}</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">{t.footer_download_app}</h4>
              <div className="flex space-x-3">
                <a href="#" className="bg-black text-white px-3 py-2 rounded-lg flex items-center hover:bg-gray-800 transition duration-150">
                   <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M17.707 10.708L16.293 9.294l-3.293 3.292V2h-2v10.586l-3.293-3.292-1.414 1.414 5.707 5.707 5.707-5.707zM18 20H6v-2H4v4h16v-4h-2v2z"/></svg>
                  <div>
                    <div className="text-xs">{t.footer_download_on}</div>
                    <div className="text-sm font-semibold">{t.footer_app_store}</div>
                  </div>
                </a>
                <a href="#" className="bg-black text-white px-3 py-2 rounded-lg flex items-center hover:bg-gray-800 transition duration-150">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M17.707 10.708L16.293 9.294l-3.293 3.292V2h-2v10.586l-3.293-3.292-1.414 1.414 5.707 5.707 5.707-5.707zM18 20H6v-2H4v4h16v-4h-2v2z"/></svg>
                  <div>
                    <div className="text-xs">{t.footer_download_on}</div>
                    <div className="text-sm font-semibold">{t.footer_play_store}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 py-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">{copyrightText}</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="/terms" className="text-sm text-gray-500 hover:text-blue-600">{t.footer_terms}</Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-blue-600">{t.footer_privacy}</Link>
              <Link href="/cookies" className="text-sm text-gray-500 hover:text-blue-600">{t.footer_cookies}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}