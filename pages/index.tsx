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
  UserPlusIcon,
  DocumentCheckIcon,
  QrCodeIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import Navbar from '@/components/Navbar';
import ContactFooter from '@/components/Conact-Footer';
 
export default function DriverRecruitment() {
  const [isRegistered, setIsRegistered] = useState(false);

  const p1 = 'p1.jpeg';
  const p2 = 'p2.jpeg';
  const p3 = 'p3.jpeg';
  const p4 = 'p4.jpeg';
   

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      setIsRegistered(!!token);
    };
    
    checkAuthStatus();
  }, []);

  const handleRegistrationClick = () => {
    if (isRegistered) {
      toast.success("You're already registered! Redirecting to dashboard...");
      setTimeout(() => {
        window.location.href = "/driver/dashboard";
      }, 1500);
    } else {
      window.location.href = "/register";
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      
      <main className="bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 opacity-80"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Drive With <span className="text-indigo-600">Bharat Sarthi</span>
                  </h1>
                  <p className="mt-4 text-xl text-gray-600">
                    Turn your vehicle into a steady income source. Flexible hours, competitive pay, and full control.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleRegistrationClick}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-medium flex items-center shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    {isRegistered ? "Go to Dashboard" : "Become a Driver Partner"}
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </button>
                  
                  <Link href="/driver/benefits" className="bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-200 px-8 py-4 rounded-lg font-medium flex items-center shadow-sm transition-all duration-300">
                    Learn More
                  </Link>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-2">
                    {[p1, p2, p3, p4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center overflow-hidden">
                        <Image 
                          src={`/${i}`} 
                          alt="Driver" 
                          width={40} 
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600">Join 10,000+ drivers across India</p>
                </div>
              </div>
              
              <div className="lg:px-6">
                <div className="relative">
                  <Image
                    src="/cab2.jpg" 
                    alt="Happy Bharat Sarthi driver with passenger"
                    width={600}
                    height={400}
                    priority
                    className="rounded-xl shadow-2xl object-cover"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Average weekly earnings</p>
                        <p className="text-lg font-bold text-gray-900">₹15,000+</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Why Drive With Bharat Sarthi?</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                We offer the best platform for drivers looking to maximize their earnings while maintaining flexibility.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  icon: <CurrencyDollarIcon className="h-8 w-8 text-indigo-600" />,
                  title: "Competitive Earnings",
                  description: "Earn up to ₹2,500 daily with competitive base rates, surge pricing, and regular bonuses.",
                  highlight: "Earn 15-30% more than other platforms"
                },
                {
                  icon: <ClockIcon className="h-8 w-8 text-indigo-600" />,
                  title: "Complete Flexibility",
                  description: "Drive whenever you want. No minimum hours or schedules. You control your workday.",
                  highlight: "Work on your terms"
                },
                {
                  icon: <ShieldCheckIcon className="h-8 w-8 text-indigo-600" />,
                  title: "Safety & Support",
                  description: "24/7 assistance, emergency response, and comprehensive insurance coverage on every trip.",
                  highlight: "Your safety is our priority"
                },
              ].map((benefit, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                  <div className="bg-indigo-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="mt-3 text-gray-600">{benefit.description}</p>
                  <div className="mt-4 inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                    {benefit.highlight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Get Started in 4 Simple Steps</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Our streamlined onboarding process gets you on the road and earning quickly.
              </p>
            </div>
            
            <div className="relative">
              <div className="hidden lg:block absolute top-24 left-0 w-full h-1 bg-indigo-100"></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {[
                  {
                    icon: <UserPlusIcon className="h-6 w-6 text-white" />,
                    title: "Register Online",
                    description: "Fill out our simple form with your basic information to get started."
                  },
                  {
                    icon: <DocumentCheckIcon className="h-6 w-6 text-white" />,
                    title: "Upload Documents",
                    description: "Submit your license, vehicle registration, and identity documents securely."
                  },
                  {
                    icon: <QrCodeIcon className="h-6 w-6 text-white" />,
                    title: "Get Verified",
                    description: "Our team will verify your documents and issue your unique driver ID and QR code."
                  },
                  {
                    icon: <TruckIcon className="h-6 w-6 text-white" />,
                    title: "Start Driving",
                    description: "Download the Bharat Sarthi Driver App, go online, and start accepting rides."
                  }
                ].map((step, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="bg-indigo-600 w-14 h-14 rounded-full flex items-center justify-center shadow-md mb-6 z-10">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <button 
                onClick={handleRegistrationClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-medium inline-flex items-center shadow-md transition-all duration-300 hover:shadow-lg"
              >
                Register Now
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Hear From Our Drivers</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Real stories from real partners who've grown their income with Bharat Sarthi.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The flexible hours allow me to spend time with my family while still earning a great income. The app is easy to use, and I feel valued as a partner.",
                  name: "Rajesh Kumar",
                  city: "Mumbai",
                  image: "/testimonial-1.jpg",
                  rating: 5
                },
                {
                  quote: "As a woman driver, safety is my top priority. Bharat Sarthi's security features give me confidence, and the earnings have helped me become financially independent.",
                  name: "Priya Sharma",
                  city: "Bangalore",
                  image: "/testimonial-2.jpg",
                  rating: 5
                },
                {
                  quote: "I've tried multiple platforms, but Bharat Sarthi offers the best commission rates and customer support. The incentives during festivals really boost my earnings.",
                  name: "Amit Patel",
                  city: "Delhi",
                  image: "/testimonial-3.jpg",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full">
                  <div className="flex-grow">
                    <div className="flex mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 italic mb-6">{`"${testimonial.quote}"`}</p>
                  </div>
                  <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        width={48} 
                        height={48}
                        className="object-cover" 
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-indigo-600 text-sm">{testimonial.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <p className="mt-4 text-xl text-gray-600">
                Everything you need to know about driving with Bharat Sarthi.
              </p>
            </div>
            
            <div className="space-y-8">
              {[
                {
                  question: "What are the requirements to become a driver?",
                  answer: "You need to be at least 21 years old, have a valid driver's license with at least 1 year of driving experience, vehicle registration, insurance, and must pass our background check."
                },
                {
                  question: "How much can I earn as a Bharat Sarthi driver?",
                  answer: "Earnings vary based on your location, hours driven, and vehicle type. On average, our drivers earn ₹15,000-₹25,000 weekly working full-time. Part-time drivers typically earn ₹8,000-₹12,000 weekly."
                },
                {
                  question: "When and how will I get paid?",
                  answer: "We process payments weekly. You can choose direct deposit to your bank account or instant cashouts (up to 5 times per day) for a small fee."
                },
                {
                  question: "Can I drive for multiple platforms simultaneously?",
                  answer: "Yes, Bharat Sarthi allows you to drive for other platforms. However, many of our drivers choose to drive exclusively with us due to our competitive rates and incentives."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-3 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Start Your Journey With Bharat Sarthi Today</h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto">
              Join thousands of drivers who've found financial freedom and work-life balance with India's fastest-growing ride-hailing platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleRegistrationClick}
                className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-lg font-bold shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                Become a Driver Partner
              </button>
              <Link href="/contact-us" className="bg-transparent hover:bg-indigo-700 text-white border border-white px-8 py-4 rounded-lg font-medium transition-all duration-300">
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <ContactFooter />
    </>
  );
}