import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useTranslation } from '@/hooks/useTranslation';

const SupportPage: React.FC = () => {
  const { t } = useTranslation('support');

  const contactIcons = [
    { icon: <Mail className="w-8 h-8 text-white" /> },
    { icon: <Phone className="w-8 h-8 text-white" /> },
    { icon: <MessageCircle className="w-8 h-8 text-white" /> },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-blue-500 bg-opacity-20 rounded-full px-4 py-2 mb-6"><span className="text-sm font-medium">{t.page_title}</span></div>
                <h2 className="text-5xl font-bold mb-6 leading-tight">{t.hero_title}</h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">{t.hero_description}</p>
                <div className="flex flex-wrap text-bnlue-700 gap-4">{t.hero_tags.map(tag => <div key={tag} className="flex items-center space-x-2 bg-white text-blue-700 bg-opacity-10 rounded-lg px-4 py-2"><span>{tag}</span></div>)}</div>
              </div>
              <div className="relative">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                  <div className="text-center mb-6 text-blue-800"><h3 className="text-2xl font-semibold mb-2">{t.card_title}</h3><p className="text-blue-800">{t.card_description}</p></div>
                  <div className="space-y-4">
                    <button className="w-full bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-200 rounded-lg px-6 py-3 font-semibold flex items-center justify-center space-x-2"><MessageCircle className="w-5 h-5" /><span>{t.live_chat_button}</span></button>
                    <button className="w-full bg-blue-500 hover:bg-blue-400 text-white transition-colors duration-200 rounded-lg px-6 py-3 font-semibold flex items-center justify-center space-x-2"><Phone className="w-5 h-5" /><span>{t.call_now_button}</span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16"><h2 className="text-4xl font-bold text-gray-900 mb-4">{t.grid_title}</h2><p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.grid_description}</p></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.contact_options.map((option, index) => (
                <div key={index} className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-700 transition-colors">{contactIcons[index]?.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{option.title}</h3>
                    <p className="text-gray-600 mb-6">{option.description}</p>
                    <div className="bg-white rounded-lg p-4 border border-blue-200"><p className="text-blue-600 font-semibold break-all">{option.value}</p></div>
                    <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">{option.cta}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">{t.cta_title}</h2><p className="text-xl text-blue-100 mb-10">{t.cta_description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center space-x-2"><MessageCircle className="w-6 h-6" /><span>{t.cta_button_contact}</span></button>
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center space-x-2 border-2 border-blue-400"><Phone className="w-6 h-6" /><span>{t.call_now_button}</span></button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default SupportPage;