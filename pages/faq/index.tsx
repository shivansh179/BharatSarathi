import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const FAQPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "How do I register on Bharat Sarathi?",
      answer: "Simply click on the 'Join' button and fill in your details to get started."
    },
    {
      question: "Are the job listings verified?",
      answer: "Yes, we ensure all listings are from reputable employers."
    },
    {
      question: "Can I apply for multiple services simultaneously?",
      answer: "Absolutely! Our platform is designed to cater to all your needs in one place."
    },
    {
      question: "Is there a fee to use Bharat Sarathi?",
      answer: "No, our basic services are free for all users."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-blue-100">
        <div className="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-red-500 text-white px-2 rounded-md font-bold text-lg">
              ?
            </div>
            <h1 className="text-s font-bold text-gray-900">FAQ</h1>
          </div>

          <Link href="/">
          <div className='font-bold text-s text-blue-700'>
            Back to dashboard
          </div>
        </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-5 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-300 opacity-10 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white opacity-5 rounded-full blur-lg"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-500 bg-opacity-20 rounded-full px-6 py-3 mb-8">
              <HelpCircle className="w-6 h-6" />
              <span className="text-lg font-medium">Frequently Asked Questions</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Have Questions? We've Got Answers
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Find quick answers to common questions about Bharat Sarathi. Can't find what you're looking for? Our support team is here to help.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-200 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search for answers..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sample Questions</h2>
            <p className="text-xl text-gray-600">
              Here are some of the most common questions our users ask
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <h3 className="text-xl font-semibold text-gray-900 italic">
                      {faq.question}
                    </h3>
                  </div>
                  {openFAQ === index ? (
                    <ChevronUp className="w-6 h-6 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-blue-600" />
                  )}
                </button>
                
                {openFAQ === index && (
                  <div className="px-8 pb-6">
                    <div className="pl-7 border-l-2 border-blue-200">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Our comprehensive FAQ section has all the answers you need to get started with Bharat Sarathi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <HelpCircle className="w-6 h-6" />
              <span>View All FAQs</span>
            </button>
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center space-x-2 border-2 border-blue-400">
              <MessageCircle className="w-6 h-6" />
              <span>Contact Support</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-red-500 text-white px-3 py-2 rounded-md font-bold text-lg">
                ?
              </div>
              <span className="text-2xl font-bold text-gray-900">FAQ</span>
            </div>
            <p className="text-gray-600 mb-6">
              Getting you the answers you need, when you need them.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <span>Quick Answers</span>
              <span>•</span>
              <span>Easy Search</span>
              <span>•</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQPage;