import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useTranslation } from '@/hooks/useTranslation';
import { FaqItem } from '@/types/translations';

const FAQPage: React.FC = () => {
  const { t } = useTranslation('faq');
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-blue-500 bg-opacity-20 rounded-full px-6 py-3 mb-8"><HelpCircle className="w-6 h-6" /><span className="text-lg font-medium">{t.page_title}</span></div>
              <h2 className="text-5xl font-bold mb-6 leading-tight">{t.hero_title}</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">{t.hero_description}</p>
              <div className="max-w-2xl mx-auto relative"><div className="relative"><Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 w-5 h-5" /><input type="text" placeholder={t.search_placeholder} className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-600 bg-white bg-opacity-10 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"/></div></div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16"><h2 className="text-4xl font-bold text-gray-900 mb-4">{t.grid_title}</h2><p className="text-xl text-gray-600">{t.grid_description}</p></div>
            <div className="space-y-6">
              {t.faq_list.map((faq: FaqItem, index: number) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <button onClick={() => toggleFAQ(index)} className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-blue-50 transition-colors duration-200">
                    <div className="flex items-center space-x-4"><div className="w-3 h-3 bg-blue-600 rounded-full"></div><h3 className="text-xl font-semibold text-gray-900 italic">{faq.question}</h3></div>
                    {openFAQ === index ? (<ChevronUp className="w-6 h-6 text-blue-600" />) : (<ChevronDown className="w-6 h-6 text-blue-600" />)}
                  </button>
                  {openFAQ === index && (<div className="px-8 pb-6"><div className="pl-7 border-l-2 border-blue-200"><p className="text-gray-700 text-lg leading-relaxed">{faq.answer}</p></div></div>)}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">{t.cta_title}</h2><p className="text-xl text-blue-100 mb-10">{t.cta_description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center space-x-2"><HelpCircle className="w-6 h-6" /><span>{t.cta_button_all_faqs}</span></button>
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center space-x-2 border-2 border-blue-400"><MessageCircle className="w-6 h-6" /><span>{t.cta_button_contact}</span></button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default FAQPage;