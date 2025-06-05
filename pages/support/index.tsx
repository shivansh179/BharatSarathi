import React from 'react';
import { Phone, Mail, MessageCircle, Clock, Users, Shield, Headphones } from 'lucide-react';
import Link from 'next/link';

const SupportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center space-x-3">
            <div className='flex space-x-3'>
            <div className="bg-red-500 text-white px-3 py-1 rounded-md font-bold text-sm">
              SOS
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Support</h1>
            </div>
            <Link href="/">
                <div className='text-blue-700 font-bold '>
                    Back to dashboard
                </div>
            </Link>
          </div>
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
              <div className="inline-flex items-center text-black space-x-2 bg-blue-500 bg-opacity-20 rounded-full px-4 py-2 mb-6">
                <Headphones className="w-5 h-5 " />
                <span className="text-sm font-medium">24/7 Support Available</span>
              </div>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                We're Here to Help
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Facing issues or have queries? Our dedicated support team is available 24/7 to assist you with any questions or concerns you may have.
              </p>
              <div className="flex flex-wrap text-blue-900 gap-4">
                <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5" />
                  <span>24/7 Available</span>
                </div>
                <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-lg px-4 py-2">
                  <Users className="w-5 h-5" />
                  <span>Expert Team</span>
                </div>
                <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-lg px-4 py-2">
                  <Shield className="w-5 h-5" />
                  <span>Secure Support</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                <div className="text-center mb-6 text-blue-900">
                  <div className="w-20 h-20 bg-white text-blue-900 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Headphones className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Quick Support Access</h3>
                  <p className="text-blue-900">Choose your preferred contact method</p>
                </div>
                
                <div className="space-y-4">
                  <button className="w-full bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-200 rounded-lg px-6 py-3 font-semibold flex items-center justify-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Start Live Chat</span>
                  </button>
                  <button className="w-full bg-blue-500 hover:bg-blue-400 transition-colors duration-200 rounded-lg px-6 py-3 font-semibold flex items-center justify-center space-x-2">
                    <Phone className="w-5 h-5" />
                    <span>Call Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Options</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the contact method that works best for you. We're here to help in whatever way is most convenient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email Card */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-700 transition-colors">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Support</h3>
                <p className="text-gray-600 mb-6">
                  Send us detailed queries and we'll respond within 24 hours.
                </p>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-blue-600 font-semibold break-all">
                    support@bharatsarathi.com
                  </p>
                </div>
                <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                  Send Email
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-700 transition-colors">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Phone Support</h3>
                <p className="text-gray-600 mb-6">
                  Speak directly with our support team for immediate assistance.
                </p>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-blue-600 font-semibold text-lg">
                    +91 1234 567 890
                  </p>
                </div>
                <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                  Call Now
                </button>
              </div>
            </div>

            {/* Live Chat Card */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-700 transition-colors">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Chat</h3>
                <p className="text-gray-600 mb-6">
                  Get instant help through our live chat available on our website.
                </p>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-blue-600 font-semibold">Available Now</p>
                  </div>
                </div>
                <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Support?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Don't let issues hold you back. Our expert support team is standing by to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <MessageCircle className="w-6 h-6" />
              <span>Contact Support</span>
            </button>
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center space-x-2 border-2 border-blue-400">
              <Phone className="w-6 h-6" />
              <span>Call Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-red-500 text-white px-3 py-1 rounded-md font-bold text-sm">
                SOS
              </div>
              <span className="text-2xl font-bold text-gray-900">Support</span>
            </div>
            <p className="text-gray-600 mb-6">
              Providing exceptional support when you need it most.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <span>Available 24/7</span>
              <span>•</span>
              <span>Expert Team</span>
              <span>•</span>
              <span>Quick Response</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SupportPage;