'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight,
  GraduationCap,
  HeartPulse,
  Gavel,
  Wrench,
  Briefcase,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Zap,
  PlayIcon,
  ArrowRightIcon,
} from 'lucide-react';
import { 
  StarIcon as StarSolid,
} from '@heroicons/react/24/solid';
import Navbar from '@/components/Navbar'; // Assuming this is your existing Navbar
import ContactFooter from '@/components/Conact-Footer'; // Assuming this is your existing Footer
import { toast, Toaster } from 'react-hot-toast';
import { FaLocationArrow } from "react-icons/fa6";
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';


// Helper component for animated stats
const StatItem = ({ number, suffix, label }: { number: number; suffix: string; label: string }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div ref={ref} className="text-center">
      <h3 className="text-4xl md:text-5xl font-bold text-white">
        {inView ? <CountUp start={0} end={number} duration={2.5} /> : '0'}{suffix}
      </h3>
      <p className="text-blue-200 mt-2 text-sm md:text-base">{label}</p>
    </div>
  );
};

// Main Homepage Component
export default function Homepage() {
  const [isRegistered, setIsRegistered] = useState(false);

  const services = [
    {
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      title: 'Driver Training',
      description: 'Get trained by certified instructors to improve your skills and safety.',
      link: '/services/training',
    },
    {
      icon: <HeartPulse className="w-8 h-8 text-green-600" />,
      title: 'Health Insurance',
      description: 'Access affordable health plans tailored for you and your family.',
      link: '/services/insurance',
    },
    {
      icon: <Gavel className="w-8 h-8 text-orange-600" />,
      title: 'Challan Settlement',
      description: 'We help you navigate and settle traffic challans efficiently via Lok Adalat.',
      link: '/services/challan-help',
    },
    {
      icon: <Wrench className="w-8 h-8 text-red-600" />,
      title: 'Car Services',
      description: 'Get discounts on vehicle maintenance, servicing, and spare parts.',
      link: '/services/car-service',
    },
    {
      icon: <Briefcase className="w-8 h-8 text-purple-600" />,
      title: 'Job Referrals',
      description: 'Find job opportunities with top platforms like Ola, Uber, and more.',
      link: '/services/job-referral',
    },
  ];

  const testimonials = [
    {
      quote:
        'Bharat Sarthi helped me resolve my ₹4,000 challan with Lok Adalat in just 2 days. The process was so simple!',
      name: 'Rakesh Sharma',
      location: 'Delhi',
      service: 'Challan Help',
      image: '/p1.jpeg', // Replace with actual image path
    },
    {
      quote:
        'I got referred to Uber through Bharat Sarthi and now I am earning over ₹30,000 a month. Thank you for the opportunity!',
      name: 'Pritam Singh',
      location: 'Mumbai',
      service: 'Job Referral',
      image: '/p2.jpeg', // Replace with actual image path
    },
    {
      quote:
        'I found an affordable health insurance plan for my family here. It gives me peace of mind while driving.',
      name: 'Amit Kumar',
      location: 'Bangalore',
      service: 'Health Insurance',
      image: '/p3.jpeg', // Replace with actual image path
    },
    {
      quote:
        'I found an car insurance plan for my family here. ',
      name: 'Shivani Kumari',
      location: 'Delhi',
      service: 'Car Insurance',
      image: '/p4.jpeg', // Replace with actual image path
    },
  ];

  const faqs = [
    {
      question: 'How does the challan settlement work?',
      answer: 'We connect you with legal experts who represent you at the Lok Adalat, a government-backed system for quick dispute resolution. This often results in reduced fines and a hassle-free settlement process.',
    },
    {
      question: 'What documents do I need for insurance?',
      answer: 'You typically need your Aadhaar card, PAN card, and vehicle registration details. Our team will guide you through the simple documentation process for the plan you choose.',
    },
    {
      question: 'Can I join if I don’t own a car?',
      answer: 'Yes, absolutely! We provide job referrals for drivers who do not own a vehicle. Our partners have various programs for drivers looking for opportunities.',
    },
    {
      question: 'How long does it take to get a job referral?',
      answer: 'After you complete your profile and verification, we typically refer you to our partners like Ola and Uber within 3-5 business days. The final onboarding depends on the partner platform\'s process.',
    },
  ];
  
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  const handleJoinNow = () => {
    // This correctly points to your custom registration page
    window.location.href = "/register";
  };


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



  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <main className="overflow-hidden bg-white">
        {/* Step 1: Hero Section */}
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
                The all-in-one platform for India's drivers. Get job referrals, health insurance, challan help, and much more.
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

        {/* Step 6: Metrics Section */}
        <section className="bg-slate-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatItem number={1500} suffix="+" label="Drivers Trained" />
              <StatItem number={900} suffix="+" label="Insured via Platform" />
              <StatItem number={2000} suffix="+" label="Challans Settled" />
              <StatItem number={800} suffix="+" label="Platform Referrals" />
            </div>
          </div>
        </section>

        {/* Step 1: "Our Services" Section */}
        <section id="services" className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                One Platform. Many Solutions.
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We provide a complete ecosystem of services to support every aspect of a driver's life.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.title} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Link href={service.link} className="font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              ))}
               <div className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center">
                  <Zap className="w-10 h-10 mb-4"/>
                  <h3 className="text-2xl font-bold mb-3">And Much More!</h3>
                  <p className="mb-6">We are constantly adding new services to empower our driver partners.</p>
                  <button onClick={handleJoinNow} className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105">
                    Join Today
                  </button>
                </div>
            </div>
          </div>
        </section>
        
        {/* Step 3: "Why Bharat Sarthi?" Section */}
        <section className="py-20 md:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Why Choose Bharat Sarthi?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        We understand the challenges drivers face. Our platform is built to solve them.
                    </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                        <h3 className="text-2xl font-bold text-red-700 mb-6">❌ Common Driver Problems</h3>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-start"><span className="text-red-500 mr-3 mt-1 font-bold">»</span> Unstable income and lack of job security.</li>
                            <li className="flex items-start"><span className="text-red-500 mr-3 mt-1 font-bold">»</span> No access to affordable health insurance or loans.</li>
                            <li className="flex items-start"><span className="text-red-500 mr-3 mt-1 font-bold">»</span> Difficulty handling complex legal issues like challans.</li>
                            <li className="flex items-start"><span className="text-red-500 mr-3 mt-1 font-bold">»</span> High costs for vehicle maintenance and parts.</li>
                            <li className="flex items-start"><span className="text-red-500 mr-3 mt-1 font-bold">»</span> Lack of a supportive community and guidance.</li>
                        </ul>
                    </div>
                    <div className="bg-green-50 p-8 rounded-2xl border border-green-200">
                        <h3 className="text-2xl font-bold text-green-700 mb-6">✅ The Bharat Sarthi Solution</h3>
                        <ul className="space-y-4 text-gray-800">
                            <li className="flex items-start"><ShieldCheck className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0"/> Steady job referrals to leading platforms.</li>
                            <li className="flex items-start"><ShieldCheck className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0"/> Exclusive, low-cost insurance and financial products.</li>
                            <li className="flex items-start"><ShieldCheck className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0"/> Expert assistance for quick challan settlement.</li>
                            <li className="flex items-start"><ShieldCheck className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0"/> A network of trusted, discounted service centers.</li>
                            <li className="flex items-start"><ShieldCheck className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0"/> A professional community and 24/7 support.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {/* Step 5: Testimonials Section */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Real Stories, Real Impact
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Hear from drivers who have transformed their careers with Bharat Sarthi.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
                  <div className="flex-grow">
                    <p className="text-gray-700 text-lg mb-6">"{testimonial.quote}"</p>
                  </div>
                  <div className="flex items-center mt-auto">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                      onError={(e) => { e.currentTarget.src = '/user-placeholder.png'; }} // Fallback image
                    />
                    <div className="ml-4">
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location} • <span className="font-semibold text-blue-600">{testimonial.service}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Step 7: FAQ Section */}
        <section className="py-20 md:py-28 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600">
                        Have questions? We have answers.
                    </p>
                 </div>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                className="w-full flex justify-between items-center p-6 text-left"
                            >
                                <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                                {openFaq === index ? <ChevronUp className="w-6 h-6 text-blue-600" /> : <ChevronDown className="w-6 h-6 text-gray-500" />}
                            </button>
                            {openFaq === index && (
                                <div className="px-6 pb-6">
                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button className='text-whiteborder-1 p-2 rounded-full bg-blue-500 mt-2'>Visit faq section</button> 

            </div>
        </section>
        
        {/* Step 8: Partners Section */}
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-center text-xl font-semibold text-gray-500 mb-8">Trusted by drivers referred to top platforms</h3>
                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
                    {/* Replace with actual partner logos */}
                    <Image src="https://cdn.iconscout.com/icon/free/png-512/free-ola-icon-download-in-svg-png-gif-file-formats--cabs-logo-brand-world-logos-vol-1-pack-icons-282225.png?f=webp&w=512" alt="Ola" width={100} height={40}  />
                    <Image src="https://cdn.iconscout.com/icon/free/png-512/free-uber-icon-download-in-svg-png-gif-file-formats--brand-company-logo-world-logos-vol-3-pack-icons-282340.png?f=webp&w=512" alt="Uber" width={100} height={40}  />
                    <Image src="data:image/png;base64,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" alt="Lithium" width={120} height={40}  />
                    <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbwAAABxCAMAAACZb+YzAAAAnFBMVEX///8ARf8AMP8AQ/8AOf8APP8ALv8AQf+gsf8AP/8AMv8ANP/1+P8APv/m6/+InP9bef/n7f9Sc//L1f9Eav8AK/8aUv84Yf8NTv/c5P/Z4P8yXf9OcP9ng//s8P8RS/+xv/+Tpv90jf+6xv/y9f+ot//BzP/Q2f9/lv+mtf+uvP/H0f+4xP8qWP97kv+arP+Qo/9sh/9AZv9hfv9cRjG5AAAPL0lEQVR4nO2daX/qLBOHTYCkCVo9trG1tm516+JS+/2/25O4ZQYGTNV4ep+H/3lzfhYJ4WKdGbBScXJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnL619QdfDetanzNxtO/XUonSm8Jj46oJnic3L+N/nZRnRT1E6+YIu5/3f7t0johCVYQnuexWjCsmvJ5m3ORia//lFHM6c3wvid4+q+3/lrelfGIX6QBzyqTi8aTNdkkLswuk+ATOp8HGbKtROvi7/LZiGMu9g8Ia1wGz+8Xf8rv0Weye9Uosb7mDf8RPI8FdSqbBsgmuWzXq9aFjLThIZK8bhwF/ut6qR2qO7H1vZ/C87z4Rc/lCU6c/kVnxkHM6YGdiXh5yQf9IjWivJE2Lel+Ds+TX1ouS5jLJeHdzqV5TmbyoXu5R/0iAXheYEl3AjwvXqm51EU58D7i0FqSSNhn9P+oIDzfMgmdAs9L1NVeSfAmwbGlMNOK8i+oVHgsVHIpB97TUXZpUfz2hZ72i1QqPI/PcC7lwPPsY+ZWoXehp/0inQWPqdISxHilUAq8YbF2JfT1039d58CLhPqJ1GoM7/bKgNf28SNDHgdB4Mua2pSsW6H/pM6AFz1rqaYqPVZDfy8D3hdqQszvvD2NKtX26zBW2lbUuMjzfpG+ITyLO4CAx/t6Mq25xx/wzyXAq/rwkWGUm+WqQ6VPBqVYU/+ObjwhBJzrWbQxGYsmYZck4AV65U81CygeN0uA9wk7O4vQHNsPcGv7dywtk0RbYhzMnEMttQ6PRXqesB/vusID/HsJ8IYwy1hpdn3U98L1JR74K5RbNXX5N2pqHR4xhfzxtZxYDBOUAK8Fxo5wbn1JJv8ZE3VT6yXgNbmaWodHDEJ1bfmpTKQWeO/Dl0xDmyXkdbFJ8wL9H3CgFpo9ro1cyMRAr+rpvZ4+ZFEf3xkXANW7t3pa2MVqfPeDxvDUX83S16vfTIraWUfdbhcV4rZff+lv/9uwwFPWGRUKXqyHq1AOW7SENcKbRlLUMonE4AhMy96Kt2lqQb7370J48lX70jDOd6E1xeDTXszTDEV0mJY/GzLmIvtMcBl3BsQCp/q2jg9p4rizLLQI6jd4nrE/HwB+T8NWL9MaV2f7S8g4jv3OPml1Ofe5qO0cd7ae5/E35fEaPGIMete2eRnjIvDayQF7dG+ogFHtUGAwFt/CkVqqTS57ZG8vb40tZPVk57cNBttXrGF/YMgT1UPdHQYcmXOINHrB61LL+GtfK4N9ISLk3hwku3W72K0ZBvH2wbs1xJAY43J46qSnwQs7WinnlJnKh6OECd46b0h4hQMEy5scPsXwjL2W0OLQZzdT5fSRcCpFwTccuFbq1nGbRl/eQS054WgUO4/LZz6sw/6yzJfJm1dtt/aFC7fxB2Q/OeR0FJ5QzJbp6+vLlVQ+TGKA1wVLeiM8uIXMnVe3cNjUSm3RR15trJU1ddpAKvIGcTs3uHtFaO583Q7taGR8nrXqXv5HUPhbMFMH1cxrcijcDl7FUBS6GjR48lMtp75PAA/bygDvDhAwwYOAAbwRhPeTvQDo7Cm8oTFEhyXLfSGN9u8wMHX5KTdOThGfVtrgpUCVz0A1pfD6+aRyqM+JobFl0txfGjxtod8lO55YwDQmeGAQMMFD2xDgNkYNW93nWQQaN+usbOFVwYbenc3vxAzLLPuXgik0JwJ4cPsT4EwOneHO8/H0y/dKvtViqPD0LTq1T1CnoRLgdZCNiBc1PiNzNrNN/2lL/szSW32GdADQNLF/ib+DWgXwQvC1+A8aIcFINv1ch/Dr/a3e9c2WCi/S8GpmzU35BEpTAryFYpfum3Bh3ZLjBK3MsdU74jNkob7n6x6LdWVwTAXwoOErXOPlLbRDIK+CZfuowtMmxT65/lGWNSXAm+DnsrhZyHDzE3he1Kgf9RkKPVjuwbYZ02SAp3iakV3rVJeQtkUn9wlMYjtFCfC0dVeUNArMfDS8MN1FCz34E3kuTWkStUaWenMORTonCboTm+ApT4Hvdio8X/k7vU/gA5yqDHh6p4hktDgWb0TAC7nfeanXZ9+twLgQ36dpPAbqmKi6N0cxU78br2fLm+WiQ+ZfBB4L0Eh2IjxtUf5Nmbk1Q3EZ8KpETTARR0Nr/9PgMdl63w8TfwaCXsLwx0Oa27pUXlmJAMdO4nR18jjeT4vdpSDco0fgMcFjgaPaT4SnhDfQ+wTG1Em0DHjplod4dvqu0v/WbZ17qfCYj+3sL8TmQUlTbeBxEQ8zioeFKWHbdW31aoXHhN8a3qjWvxPhqedIVmR8UkvNsBR4lZVp8RFJ/mUYPxV4TKoz1kCjx2I1rxmih8cZvHMKNSPMlCtTnw2e4HUqcvHUnqcYxxI/jnV+obrtKgdeZWZcOrJa3FtSjhsFXqAzXqjvQ5hRXhChGK7OEADG9aq9VYZ7MzwWLGjf06kLFv7YybSfpEejUbWv02OxYsgvB15lYNkNM+4vdN8chqcbalM94q4hKPszqmbo1MABIQF12vsOtx8jPKb55/Y6OXqMhalwUC3R/kOG2kxZ8CofhhXGtqhCao5jBI92saPomLQKKe/sG6wWuPdFb8rJ427IhGmB5xtXXudFTCPj1yuVRKAFdGnwKtWFtnYHYnKt4EHwanQ8LrRSeTXixFoFN1jYfx9At9Wi/vdCA6cJnuHBmc6DF4DW2KV9Hz70PpQHL31+Pd3fUSXYVoGHV77YD0ivSr/gXoBrXpSNYP1BkyHyVJmi1gaGfovgWQ5ZnAUPOWQNxqDwEaQpE16q12airuHymvVwPAjMLqZffFzgNCE8cQiCAJ4gvMBkdvwD3Vwm26YWVJXrLHhwnDBa/2QfJCoXXrpwelv7nLBdZVWLagHCU8K6D/qAk56pvcCi39Mf6zEHe82RW+DwMYSn7qihzoIHprw7400f0BhTOrxU3XFT6gcVstqBMxuC16NzaoPuwxidBq4qATy4kCGXsltBl4gBnmFI3+gsePkZoCrd2rc1nY9X14CXlWYylMT8BxfsCJ7hXgpoNmKPdBoDvBWkMjYW9I3250F4scVDeQ48MBw/WyJ4QcDEleBlmjR8zXQMxoBLwWvT8OAuwNJ3JrQnHcKz+enOgZePB0tbGAEYta8IL/2GZjoO8oVbyfBgqBsVkLjT3XF4gSWw9xx4hyb1ZL3aCvgPrwovXb40jabj/3t4h8nMHiMAVltXhpc+EA0JoHZ/x7D58dfgHWJhXiymKZjuL8DD5mVwBKNkePViCxZDANIV4O2j+t6PhIP8EJ5hU3oivIoHVy35drlkeDfFtgqr41uFkuDthoPbYxdpRHSDNMAz7ZixzcJcUFXo0qXcyVEyvIKbdHhe5Lrwds2YjDyCAmbfAvDAOQSkSQFzByXkm8nDpkqGh5ua8bQYNAdfFd5ufNN8lpqAXdYAr40qmN6VwhEGwqvOnvf6prxmKEDjavCqyDBtmvRQg7wqvO2UNwnUzzWBpbLpoAmsYIMNHsWeAnjz/PLkGnVHFYZ3aBglw0PjUWi6WRS901XhbQwnI9tpld1ryzwX0xEvftSMjs6ZwFNC8HNqpTql7ftlw0OOVkl3vQ+00rsqvI3dZn08KBjG+JrgwZMVnhbno1UGPCWEKoB4A1hw0I7Khoc8EkySNq4eavjnwrMEiuuHK7MOsrKd8dsJntwxwUNuT6rrqfFChhogVuXowoGrbdIVLzk5mjTx9vgEeNCOYzNg6/DSkk6PT3jpNgvkYoL3jnLneqiPsqQF8PABX199hRvYvMCFA6XDwwdghH5y8MV8+qMovEUxUwB1G8Tg1RJTfxAa703w/mDjqFzgh1c7qoU5/xu+uZyFeID6wFNljrZ0eG3csGs93Ky6a7VCT4AHwygsu0nSwnJ8saJEQZhvg3jAPYs/wFf9rKkzK9znoTAhL6zBmKiBbxq8SoenXtgQBou8XVVXurvxBHgo2JJ/GVOedt+menbGCE89IB/69+ONNWQ0HRAn/SG8JS4Zix+236xOVx7+kwSR/uXDa6uuFhE3x0/dUffp/VsS7f4EeMgUkHam+8WsTsVJnQhPuS3VfIlOqL5NxONARoEfUxF9yMKifjW7s7EWSe2baBAoHx5hvkjfyff9mA6yOQFeBR9EYqEQQtZ0U8Vp8GrKxssMb0yuW03jMoL3SiybqNk4gH61K8ArdgPvQafAo+5wIE5YnwQv8pQnW66v6vzkGCm2bX4VKhuKP7oKvON3X6Ow6hPgvVIRDPrS5RR4UU+1yFrgddWziIrQelMxTK/tDsVtYfBW6xrwKu9HtlKyfp5LSHF4Hb6i7Zd+Dk/MNWu67da/D+vVCXJmMExv9HCUXtTDlXAVeJWBlV6wfDruSTc4WXbCd1Luc1J/WOjH8Jiv3Rdx5MrGTws9f1a1OmOblh802bzP3HJWwQgPVP1p8Co35ndiwapADAt1qynUM9FstcsePgsYwqCEhj8Tgqe5uSa+Yd7LrnaDnnTC2jQIbDdQBtphjS68RMcAD96uZIIHDeMEvMrEdAVSGIyVAKT+4UsA3rE76as9PX8NXreAJSx/U2H4AT0Ij3AB3NIXdfHoA8f1x4QpqH1vwsd4RIQAAZunCR40ypngweArCl6le+8Ti07GW9nEBOGBy0DB5ufolfSjlm770q5gK/jrBVlH5/7QYOKG8BIqIu4tksqrpg1hu1c8cGVSv1Y+091zoB8zYZFUr6TY6jXvekZ/GzjtHprggUWJ4eqz11asbOzSnejWaQkuXeNglsmT+9r1r7qGiRLcT5g5n4/82FJWU9nvDcrnsXGBlC9KooSs0rQy1r7cXXPCwrQdePWdVek92V6tJX1jQM/toJN9eddwt6Vp9g2JV8m+p0rjWQ6QZmFKMzuk0X/4aqdJM87fqcaD1v6kdXVfp0yim422HYWJpAC7dNB5kRLcDMMSouu8zZPArrDzMviwLm1v5C5p03xRSvdz9tzzkyCR8+8lPF7w/pZqPLH+nnB3svruhLvSfFtL8/G8LUpiPr2Y9eZtGmL1tdfkfpfGMj2NXmf3XpZGdF5uwIG7O7ap06SHmnK1mX2aRF9Fb1KrvmZVtiuG4SRhpWpTwecUTXveZd7Fvl2kLJdKs0lW+KuF61PL65+5BN3JycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnpNP0Pb3wP/FvmeJgAAAAASUVORK5CYII=" alt="BluSmart" width={140} height={40} />
                    <Image src="data:image/png;base64,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" alt="Evera" width={110} height={40} />
                </div>
            </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-blue-700 to-indigo-800 py-20 md:py-28">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                    Ready to Take Control of Your Driving Career?
                </h2>
                <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
                The all-in-one platform for India's drivers. Get job referrals, health insurance, challan help, and much more.
                </p>
                <button
                    onClick={handleJoinNow}
                    className="group bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
                >
                    Start Your Journey Today
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </section>

      </main>
      <ContactFooter />
    </>
  );
}