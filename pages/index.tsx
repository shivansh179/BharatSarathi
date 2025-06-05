'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { 
  ArrowRightIcon, 
  CurrencyDollarIcon, 
  ClockIcon, 
  ShieldCheckIcon,
  StarIcon,
  PlayIcon,
  CheckCircleIcon,
  UserGroupIcon,
  TruckIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { 
  StarIcon as StarSolid,
} from '@heroicons/react/24/solid';
import Navbar from '@/components/Navbar';
import ContactFooter from '@/components/Conact-Footer';
 
export default function Homepage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      setIsRegistered(!!token);
    };
    
    checkAuthStatus();

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    if (isRegistered) {
      toast.success("Welcome back! Redirecting to dashboard...");
      setTimeout(() => {
        window.location.href = "/driver/dashboard";
      }, 1500);
    } else {
      window.location.href = "/register";
    }
  };

  const stats = [
    { number: "50K+", label: "Active Drivers" },
    { number: "₹25K", label: "Avg Monthly Earnings" },
    { number: "15+", label: "Cities" },
    { number: "4.8★", label: "Driver Rating" }
  ];

  const features = [
    {
      icon: <CurrencyDollarIcon className="h-8 w-8" />,
      title: "Higher Earnings",
      description: "Earn more with competitive rates and zero hidden fees"
    },
    {
      icon: <ClockIcon className="h-8 w-8" />,
      title: "Flexible Schedule",
      description: "Drive when you want, as much as you want"
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: "Safety First",
      description: "24/7 support and comprehensive insurance coverage"
    }
  ];

  const testimonials = [
    {
      quote: "Best platform for drivers. Fair pricing and great support team.",
      name: "Rajesh Kumar",
      location: "Mumbai",
      rating: 5,
      earnings: "₹28K/month"
    },
    {
      quote: "Finally, a platform that truly cares about drivers' welfare.",
      name: "Priya Sharma", 
      location: "Bangalore",
      rating: 5,
      earnings: "₹22K/month"
    },
    {
      quote: "Flexible hours, better pay. What more could I ask for?",
      name: "Amit Patel",
      location: "Delhi",
      rating: 5,
      earnings: "₹30K/month"
    }
  ];

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          {/* Background Pattern */}
          {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div> */}
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-full px-6 py-2 mb-8">
                  <span className="text-blue-300 text-sm font-medium">India's Fastest Growing Driver Platform</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Drive Your
                  <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Success
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-blue-100 mb-10 leading-relaxed">
                  Join thousands of drivers earning more with fair rates, flexible hours, and zero commission cuts.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <button
                    onClick={handleGetStarted}
                    className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl transition-all duration-300 hover:shadow-blue-500/25 hover:scale-105 flex items-center justify-center"
                  >
                    {isRegistered ? "Go to Dashboard" : "Start Earning Today"}
                    <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <Link 
                    href="#how-it-works"
                    className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <PlayIcon className="w-5 h-5 mr-2" />
                    See How It Works
                  </Link>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.number}</div>
                      <div className="text-blue-200 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right Visual */}
              <div className="relative">
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
                    <Image
                      src="/cab2.jpg"
                      alt="Happy driver"
                      width={500}
                      height={400}
                      className="rounded-2xl object-cover w-full"
                      priority
                    />
                  </div>
                  
                  {/* Floating Cards */}
                  <div className="absolute -top-6 -right-6 bg-green-500 text-white p-4 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-2">
                      <CurrencyDollarIcon className="w-6 h-6" />
                      <div>
                        <div className="text-sm font-medium">Today's Earnings</div>
                        <div className="text-lg font-bold">₹2,450</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-6 -left-6 bg-blue-500 text-white p-4 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-2">
                      <StarSolid className="w-6 h-6 text-yellow-400" />
                      <div>
                        <div className="text-sm font-medium">Rating</div>
                        <div className="text-lg font-bold">4.9/5.0</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Background Elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Bharat Sarthi?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're not just another platform. We're your partner in success.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <div key={index} className="group text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Get Started in Minutes
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple registration, quick verification, start earning.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-12 relative">
              {/* Connection Lines */}
              <div className="hidden lg:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"></div>
              
              {[
                {
                  step: "01",
                  title: "Register",
                  description: "Quick 2-minute signup with your basic details"
                },
                {
                  step: "02", 
                  title: "Verify",
                  description: "Upload documents and get verified instantly"
                },
                {
                  step: "03",
                  title: "Drive",
                  description: "Download app and start earning immediately"
                }
              ].map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg shadow-lg relative z-10">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 text-lg">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Loved by Drivers
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real stories from real drivers making real money.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 border border-blue-100">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <StarSolid key={i} className="h-8 w-8 text-yellow-400" />
                    ))}
                  </div>
                  
                  <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
                    "{testimonials[activeTestimonial].quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="font-bold text-gray-900 text-lg">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-gray-600">
                        {testimonials[activeTestimonial].location} • {testimonials[activeTestimonial].earnings}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Testimonial Indicators */}
              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial 
                        ? 'bg-blue-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
          {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div> */}
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
              Ready to Drive Your Future?
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join 50,000+ drivers who've already made the switch to better earnings and flexible work.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="group bg-white text-blue-600 hover:bg-blue-50 px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 hover:shadow-white/25 hover:scale-105 flex items-center"
              >
                Start Your Journey Today
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <Link 
                href="/contact" 
                className="text-white hover:text-blue-200 font-semibold text-lg transition-colors flex items-center"
              >
                Have questions? Contact us
              </Link>
            </div>
            
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {[
                { icon: <CheckCircleIcon className="w-6 h-6" />, text: "No Hidden Fees" },
                { icon: <UserGroupIcon className="w-6 h-6" />, text: "24/7 Support" },
                { icon: <TruckIcon className="w-6 h-6" />, text: "Any Vehicle Type" },
                { icon: <MapPinIcon className="w-6 h-6" />, text: "15+ Cities" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-white/90">
                  {item.icon}
                  <span className="text-sm mt-2 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <ContactFooter />
    </>
  );
}