import React, { useState } from 'react';
import { Clock, Shield, CheckCircle, UserCheck, Car, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

export default function DriverHiringPage() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { locale, setLocale } = useLanguage();
  const { t } = useTranslation('common');

  const handleSubmit = () => {
    if (query.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setQuery('');
    }
  };

  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: t.features[0].title,
      description: t.features[0].description
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t.features[1].title,
      description: t.features[1].description
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: t.features[2].title,
      description: t.features[2].description
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: t.features[3].title,
      description: t.features[3].description
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">{t.brand}</h1>
            </div>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              {t.badge}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Clock className="w-4 h-4 mr-2" />
            {t.coming_soon}
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {t.hero_title}
            <span className="text-blue-600"> {t.hero_title_highlight}</span>
          </h2>

          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            {t.hero_description}
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-green-800 font-medium">
              {t.verified_banner}
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <div className="text-blue-600">
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
              <div className="mt-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Key Benefits */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t.why_title}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {t.why_points.map((point, idx) => (
              <div key={idx} className="text-center">
                <div className={`p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center ${
                  idx === 0 ? 'bg-green-100' : idx === 1 ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  {idx === 0 && <Shield className="w-8 h-8 text-green-600" />}
                  {idx === 1 && <Clock className="w-8 h-8 text-blue-600" />}
                  {idx === 2 && <Car className="w-8 h-8 text-purple-600" />}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{point.title}</h4>
                <p className="text-gray-600 text-sm">{point.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Query Form */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">{t.query_title}</h3>
            <p className="mb-6 text-blue-100">{t.query_description}</p>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.query_placeholder}
                  className="flex-1 px-4 py-3 rounded-lg text-white placeholder-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSubmit}
                  disabled={submitted}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      {t.query_submitted}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.query_button}
                    </>
                  )}
                </button>
              </div>
            </div>

            {submitted && (
              <div className="mt-4 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg p-3">
                <p className="text-green-100">{t.thank_you}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">{t.brand}</span>
            </div>
            <p className="text-gray-400">{t.footer_text}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
