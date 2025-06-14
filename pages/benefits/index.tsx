import React from 'react';
import { Gift, Briefcase, Shield, CreditCard, AlertTriangle, Users, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const BenefitsPage: React.FC = () => {
  const benefits = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Comprehensive Job Listings",
      description: "Find driving jobs that match your skills and preferences.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Affordable Insurance Plans",
      description: "Secure health and vehicle insurance tailored for drivers.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Easy Loan Access",
      description: "Apply for loans with minimal documentation and quick approvals.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Challan Assistance",
      description: "Get expert help to resolve traffic challans efficiently.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Support",
      description: "Join a network of drivers sharing experiences and advice.",
      color: "from-teal-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-blue-100">
        <div className="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="text-s">🎁</div>
            <h1 className="text-s font-bold text-gray-900">Benefits</h1>
          </div>

        <Link href="/">
          <div className='font-bold text text-blue-700'>
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
                <Gift className="w-6 h-6" />
                <span className="text-lg font-medium">Exclusive Benefits</span>
              </div>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Why Choose Bharat Sarathi?
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Discover the comprehensive benefits that make Bharat Sarathi the perfect platform for drivers across India. From job opportunities to financial services, we've got you covered.
              </p>
              <div className="flex flex-wrap text-blue-900 gap-4">
                <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-lg px-4 py-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>All-in-One Platform</span>
                </div>
                <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-lg px-4 py-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Driver-Focused</span>
                </div>
                <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-lg px-4 py-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Trusted Services</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white text-blue-900 bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">5+ Core Benefits</h3>
                  <p className="text-blue-100">Everything you need in one place</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                    <Briefcase className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Job Listings</p>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                    <Shield className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Insurance</p>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                    <CreditCard className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Easy Loans</p>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                    <Users className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Community</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Key Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the comprehensive range of services designed specifically for drivers and their unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-200 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 text-white`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {benefit.description}
                  </p>
                  <button className="group-hover:bg-blue-600 group-hover:text-white border-2 border-blue-600 text-blue-600 font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center space-x-2 mx-auto">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Drivers Trust Us</h2>
            <p className="text-xl text-blue-100">
              Numbers that speak for our commitment to the driver community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-blue-200">Active Drivers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">5K+</div>
              <div className="text-blue-200">Job Placements</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Insurance Claims</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">2K+</div>
              <div className="text-blue-200">Loans Approved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Unlock These Benefits?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of drivers who are already experiencing the advantages of Bharat Sarathi's comprehensive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <Gift className="w-6 h-6" />
              <span>Discover More Benefits</span>
            </button>
            <button className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center space-x-2 border-2 border-blue-600">
              <ArrowRight className="w-6 h-6" />
              <span>Get Started Today</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="text-2xl">🎁</div>
              <span className="text-2xl font-bold text-gray-900">Benefits</span>
            </div>
            <p className="text-gray-600 mb-6">
              Empowering drivers with comprehensive benefits and services.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-blue-900">
              <span>All-in-One Platform</span>
              <span>•</span>
              <span>Driver-Focused</span>
              <span>•</span>
              <span>Trusted Services</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BenefitsPage;