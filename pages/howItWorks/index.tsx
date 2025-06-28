import React from 'react';
import { Settings, UserPlus, Search, Users, Bell, ArrowRight, CheckCircle, Play } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useTranslation } from '@/hooks/useTranslation';
import { StepItem } from '@/types/translations';

const HowItWorksPage: React.FC = () => {
  const { t } = useTranslation('howItWorks');

  const stepIcons = [
    { icon: <UserPlus className="w-8 h-8 text-blue-800" />, color: "from-blue-500 to-blue-600" },
    { icon: <Search className="w-8 h-8 text-blue-800" />, color: "from-green-500 to-green-600" },
    { icon: <Users className="w-8 h-8 text-blue-800" />, color: "from-purple-500 to-purple-600" },
    { icon: <Bell className="w-8 h-8 text-blue-800" />, color: "from-orange-500 to-orange-600" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-blue-800">
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-blue-500 bg-opacity-20 rounded-full px-6 py-3 mb-8"><Settings className="w-6 h-6" /><span className="text-lg font-medium">{t.page_title}</span></div>
                <h2 className="text-5xl font-bold mb-6 leading-tight">{t.hero_title}</h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">{t.hero_description}</p>
                <div className="flex flex-wrap gap-4 text-blue-700">{t.hero_tags.map(tag => <div key={tag} className="flex items-center space-x-2 bg-white text-bnlue-700 bg-opacity-10 rounded-lg px-4 py-2"><CheckCircle className="w-5 h-5" /><span>{tag}</span></div>)}</div>
              </div>
              <div className="relative text-blue-800">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-white text-blue-800 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4"><Play className="w-10 h-10 ml-1" /></div>
                    <h3 className="text-2xl font-semibold text-blue-800  mb-2">{t.video_card_title}</h3><p className="text-blue-900">{t.video_card_description}</p>
                  </div>
                  <button className="w-full bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-200 rounded-lg px-6 py-3 font-semibold flex items-center justify-center space-x-2 mb-4"><Play className="w-5 h-5" /><span>{t.video_cta}</span></button>
                  <div className="text-center text-sm text-blue-900"><p>{t.video_subtext}</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16"><h2 className="text-4xl font-bold text-gray-900 mb-4">{t.grid_title}</h2><p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.grid_description}</p></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {t.steps_list.map((step: StepItem, index: number) => (
                <div key={index} className={`bg-gradient-to-br ${stepIcons[index]?.color} text-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-transform duration-300`}>
                  <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-25 rounded-full mb-6">{stepIcons[index]?.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-white text-opacity-90">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default HowItWorksPage;