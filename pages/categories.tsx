import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  Wrench, 
  HeartPulse, 
  Car, 
  ShieldCheck, 
  Briefcase, 
  Gavel,
  CreditCard,
  Banknote,
  Star,
  ArrowRight
} from 'lucide-react';

const categoryIcons = [
  <Wrench className="w-8 h-8" />,
  <Car className="w-8 h-8" />,
  <HeartPulse className="w-8 h-8" />,
  <ShieldCheck className="w-8 h-8" />,
  <Briefcase className="w-8 h-8" />,
  <Gavel className="w-8 h-8" />,
  <Banknote className="w-8 h-8" />,
  <CreditCard className="w-8 h-8" />
];

const categoryColors = [
  'text-blue-600 bg-blue-50',
  'text-green-600 bg-green-50',
  'text-red-600 bg-red-50',
  'text-purple-600 bg-purple-50',
  'text-indigo-600 bg-indigo-50',
  'text-orange-600 bg-orange-50',
  'text-emerald-600 bg-emerald-50',
  'text-teal-600 bg-teal-50'
];

export default function Categories() {
  const { t } = useTranslation('homepage');

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.categories_title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t.categories_description}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {t.categories_list.map((category: any, index: number) => (
            <div
              key={category.id}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1"
            >
              {/* Icon and Stats */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${categoryColors[index]?.split(' ')[1]}`}>
                  <div className={categoryColors[index]?.split(' ')[0]}>
                    {categoryIcons[index]}
                  </div>
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {category.stats}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {category.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {category.description}
              </p>

              {/* Features */}
              <div className="mb-4">
                <ul className="space-y-1">
                  {category.features.slice(0, 2).map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-center text-xs text-gray-500">
                      <Star className="w-3 h-3 text-yellow-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 py-2 px-4 rounded-lg transition-all duration-200 group-hover:shadow-md">
                Explore Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Access All These Services?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of drivers who are already benefiting from our comprehensive platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2">
                <Briefcase className="w-5 h-5" />
                Join Today
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
