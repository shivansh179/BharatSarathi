import React from 'react';
import { Gift, Briefcase, Shield, CreditCard, AlertTriangle, Users, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useTranslation } from '@/hooks/useTranslation';
import { BenefitItem } from '@/types/translations';

const BenefitsPage: React.FC = () => {
  const { t } = useTranslation('benefits');
 
  const benefitIcons = [
    { icon: <Briefcase className="w-8 h-8" />, color: "from-blue-500 to-blue-600" },
    { icon: <Shield className="w-8 h-8" />, color: "from-green-500 to-green-600" },
    { icon: <CreditCard className="w-8 h-8" />, color: "from-purple-500 to-purple-600" },
    { icon: <AlertTriangle className="w-8 h-8" />, color: "from-orange-500 to-orange-600" },
    { icon: <Users className="w-8 h-8" />, color: "from-teal-500 to-teal-600" },
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
                <div className="inline-flex items-center space-x-2 bg-blue-500 bg-opacity-20 rounded-full px-6 py-3 mb-8"><Gift className="w-6 h-6" /><span className="text-lg font-medium">{t.page_title}</span></div>
                <h2 className="text-5xl font-bold mb-6 leading-tight">{t.hero_title}</h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">{t.hero_description}</p>
                <div className="flex flex-wrap text-blue-700 gap-4">{t.hero_tags.map(tag => <div key={tag} className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-lg text-blue-700 px-4 py-2"><CheckCircle className="w-5 h-5" /><span>{tag}</span></div>)}</div>
              </div>
              <div className="relative text-blue-800">
                <div className="bg-white text-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"><Gift className="w-10 h-10 text-white" /></div>
                    <h3 className="text-2xl font-semibold mb-2 text-blue-800">{t.card_title}</h3><p className="text-blue-800">{t.card_description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {t.card_items.map(item => <div key={item} className="bg-white bg-opacity-10 text-blue-600 rounded-lg p-4 text-center"><Briefcase className="w-8 h-8 mx-auto mb-2" /><p className="text-sm font-medium">{item}</p></div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16"><h2 className="text-4xl font-bold text-gray-900 mb-4">{t.grid_title}</h2><p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.grid_description}</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.benefits_list.map((benefit: BenefitItem, index: number) => (
                <div key={index} className="group bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-200 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${benefitIcons[index]?.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 text-white`}>{benefitIcons[index]?.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{benefit.description}</p>
                    <button className="group-hover:bg-blue-600 group-hover:text-white border-2 border-blue-600 text-blue-600 font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center space-x-2 mx-auto"><span>{t.learn_more}</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16"><h2 className="text-4xl font-bold mb-4">{t.stats_title}</h2><p className="text-xl text-blue-100">{t.stats_description}</p></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">{t.stats_list.map(stat => <div key={stat.label} className="text-center"><div className="text-5xl font-bold mb-2">{stat.value}</div><div className="text-blue-200">{stat.label}</div></div>)}</div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t.cta_title}</h2><p className="text-xl text-gray-600 mb-10">{t.cta_description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center space-x-2"><Gift className="w-6 h-6" /><span>{t.cta_button_discover}</span></button>
              <button className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center space-x-2 border-2 border-blue-600"><ArrowRight className="w-6 h-6" /><span>{t.cta_button_start}</span></button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default BenefitsPage;