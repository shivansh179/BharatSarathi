import React from 'react';
import { Settings, UserPlus, Search, Users, Bell, ArrowRight, CheckCircle, Play } from 'lucide-react';
import Link from 'next/link';

const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      number: "1",
      title: "Sign Up Easily",
      description: "Register with your basic details and get started in minutes.",
      icon: <UserPlus className="w-8 h-8 text-blue-900" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "2", 
      title: "Explore Opportunities",
      description: "Access job listings, insurance options, loan facilities, and more—all in one place.",
      icon: <Search className="w-8 h-8 text-blue-900" />,
      color: "from-green-500 to-green-600"
    },
    {
      number: "3",
      title: "Connect & Grow",
      description: "Engage with a community that supports your professional and personal growth.",
      icon: <Users className="w-8 h-8 text-blue-900" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      number: "4",
      title: "Stay Informed",
      description: "Receive updates on traffic rules, challan resolutions, and driver welfare schemes.",
      icon: <Bell className="w-8 h-8 text-blue-900" />,
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-blue-100">
        <div className="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-gray-700" />
            <h1 className="text-s font-bold  text-gray-900">How It Works</h1>
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
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-500 bg-opacity-20 rounded-full px-6 py-3 mb-8">
                <Settings className="w-6 h-6" />
                <span className="text-lg font-medium">Simple Process</span>
              </div>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Simplifying Your Drive Towards Success
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Our streamlined platform makes it easy for drivers to access all the services they need. From registration to getting results, every step is designed with you in mind.
              </p>
              <div className="flex flex-wrap gap-4 text-blue-700">
                <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-lg px-4 py-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Quick Setup</span>
                </div>
                <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-lg px-4 py-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Easy Navigation</span>
                </div>
                <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-lg px-4 py-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Instant Results</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white bg-opacity-10 text-blue-900 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-10 h-10 ml-1" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Watch How It Works</h3>
                  <p className="text-blue-900">See our platform in action</p>
                </div>
                
                <button className="w-full bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-200 rounded-lg px-6 py-3 font-semibold flex items-center justify-center space-x-2 mb-4">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo Video</span>
                </button>
                
                <div className="text-center text-sm text-blue-900">
                  <p>3 min overview • No signup required</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Our Platform Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to unlock all the benefits Bharat Sarathi has to offer
            </p>
          </div>
          // Continue from where your code left off

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <div key={index} className={`bg-gradient-to-br ${step.color} text-white rounded-xl shadow-md p-6`}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-white bg-opacity-20 rounded-full p-3">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-white text-opacity-90">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🎁 Benefits</h2>
            <p className="text-xl text-gray-600">Why Choose Bharat Sarathi?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            <div>
              <h3 className="text-lg text-black font-semibold">• Comprehensive Job Listings</h3>
              <p className="text-gray-700 ml-4">Find driving jobs that match your skills and preferences.</p>
            </div>
            <div>
              <h3 className="text-lg text-black font-semibold">• Affordable Insurance Plans</h3>
              <p className="text-gray-700 ml-4">Secure health and vehicle insurance tailored for drivers.</p>
            </div>
            <div>
              <h3 className="text-lg text-black font-semibold">• Easy Loan Access</h3>
              <p className="text-gray-700 ml-4">Apply for loans with minimal documentation and quick approvals.</p>
            </div>
            <div>
              <h3 className="text-lg text-black font-semibold">• Challan Assistance</h3>
              <p className="text-gray-700 ml-4">Get expert help to resolve traffic challans efficiently.</p>
            </div>
            <div>
              <h3 className="text-lg text-black font-semibold">• Community Support</h3>
              <p className="text-gray-700 ml-4">Join a network of drivers sharing experiences and advice.</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <a
              href="#"
              className="inline-flex items-center bg-blue-600 text-white text-lg px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Discover More Benefits
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
