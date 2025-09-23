  import { useState } from 'react';
  import Image from 'next/image';
  import Link from 'next/link';
  import CountUp from 'react-countup';
  import { useInView } from 'react-intersection-observer';
  import Navbar from '@/components/Navbar';
  import ContactFooter from '@/components/Conact-Footer';
  import { useTranslation } from '@/hooks/useTranslation';
  import { FaqItem, ServiceItem } from '@/types/translations';
  import { toast, Toaster } from 'react-hot-toast';

  import {
    ArrowRight, GraduationCap, HeartPulse, Gavel, Wrench, Briefcase,
    ChevronDown, ChevronUp, ShieldCheck, Zap, PlayIcon, ArrowRightIcon,
  } from 'lucide-react';
  import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
  import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import InstallButton from '@/components/InstallButton';
import HeroInstallButton from '@/components/HeroInstallButton';
import Categories from './categories';


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

  export default function Homepage() {
    const { t } = useTranslation('homepage');
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [isRegistered, setIsRegistered] = useState(false);

    const handleJoinNow = () => {
      window.location.href = "/register";
    };
    
    const handleGetStarted = () => {
      if (isRegistered) {
        toast.success("Welcome back! Redirecting to dashboard...");
        setTimeout(() => { window.location.href = "/driver/dashboard"; }, 1500);
      } else {
        window.location.href = "/register";
      }
    };

    const servicesIcons = [
      { icon: <GraduationCap className="w-8 h-8 text-blue-600" /> },
      { icon: <HeartPulse className="w-8 h-8 text-green-600" /> },
      { icon: <Gavel className="w-8 h-8 text-orange-600" /> },
      { icon: <Wrench className="w-8 h-8 text-red-600" /> },
      { icon: <Briefcase className="w-8 h-8 text-purple-600" /> },
    ];

    return (
      <>
        <Toaster position="top-center" />
        <Navbar />
        <main className="overflow-hidden bg-white">
          <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-full px-6 py-2 mb-8">
                    <span className="text-blue-300 text-sm font-medium">{t.hero_tagline}</span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    {t.hero_title.split(' ').slice(0, 2).join(' ')}
                  
                    <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                      {t.hero_title.split(' ').slice(2).join(' ')}
                    </span>
                  </h3>
                  
                  <p className="text-xl lg:text-2xl text-blue-100 mb-10 leading-relaxed">
                    {t.hero_description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button onClick={handleGetStarted} className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl transition-all duration-300 hover:shadow-blue-500/25 hover:scale-105 flex items-center justify-center">
                      {isRegistered ? "Go to Dashboard" : t.hero_cta_main}
                      <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <Link 
                      href="#services"
                      className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center"
                    >
                      <PlayIcon className="w-5 h-5 mr-2" />
                      {t.hero_cta_secondary}
                    </Link>
                  </div>

                  {/* Install App Button */}
                  <div className="flex justify-center sm:justify-start mb-12">
                    <HeroInstallButton />
                  </div>


                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {t.stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.number}</div>
                        <div className="text-blue-200 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
                      <Image src="/cab2.jpg" alt="Happy driver" width={500} height={400} className="rounded-2xl object-cover w-full" priority />
                    </div>
                    <div className="absolute -top-6 -right-6 bg-green-500 text-white p-4 rounded-2xl shadow-lg"><div className="flex items-center gap-2"><CurrencyDollarIcon className="w-6 h-6" /><div><div className="text-sm font-medium">Today's Earnings</div><div className="text-lg font-bold">₹2,450</div></div></div></div>
                    <div className="absolute -bottom-6 -left-6 bg-blue-500 text-white p-4 rounded-2xl shadow-lg"><div className="flex items-center gap-2"><StarSolid className="w-6 h-6 text-yellow-400" /><div><div className="text-sm font-medium">{t.driver_insured}</div><div className="text-lg font-bold">9 000</div></div></div></div>
                  </div>
                  <div className="absolute top-10 right-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>
                  <div className="absolute bottom-10 left-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatItem number={1500} suffix="+" label="Driver trained - change number to 2x" />
                <StatItem number={900} suffix="+" label="Insured via Platform" />
                <StatItem number={2000} suffix="+" label="Challans Settled" />
                <StatItem number={800} suffix="+" label="Platform Referrals" />
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <Categories />

          <section id="services" className="py-20 md:py-28 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.services_title}</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.services_description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.services_list.map((service: ServiceItem, index: number) => (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6">{servicesIcons[index]?.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <Link href={`/services/${index}`} className="font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center">{t.learn_more} <ArrowRight className="w-4 h-4 ml-1" /></Link>
                  </div>
                ))}
                <div className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center">
                    <Zap className="w-10 h-10 mb-4"/>
                    <h3 className="text-2xl font-bold mb-3">{t.and_much_more}</h3>
                    <p className="mb-6">We are constantly adding new services to empower our driver partners.</p>
                    <button onClick={handleJoinNow} className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105">{t.join_today}</button>
                  </div>
              </div>
            </div>
          </section>
          
          <section className="py-20 md:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.why_us_section.title}</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.why_us_section.description}</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                  <h3 className="text-2xl font-bold text-red-700 mb-6">{t.why_us_section.problems_title}</h3>
                  <ul className="space-y-4 text-gray-700">
                    {t.why_us_section.problems_list.map((problem: string) => (
                      <li key={problem} className="flex items-start">
                        <span className="text-red-500 mr-3 mt-1 font-bold">»</span> {problem}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green-50 p-8 rounded-2xl border border-green-200">
                  <h3 className="text-2xl font-bold text-green-700 mb-6">{t.why_us_section.solutions_title}</h3>
                  <ul className="space-y-4 text-gray-800">
                    {t.why_us_section.solutions_list.map((solution: string) => (
                      <li key={solution} className="flex items-start">
                        <ShieldCheck className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0"/> {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 md:py-28 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.testimonials_title}</h2><p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.testimonials_description}</p></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.testimonials_list.map((testimonial, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
                    <div className="flex-grow"><p className="text-gray-700 text-lg mb-6">"{testimonial.quote}"</p></div>
                    <div className="flex items-center mt-auto">
                      <Image src={testimonial.image} alt={testimonial.name} width={50} height={50} className="rounded-full object-cover" onError={(e) => { e.currentTarget.src = '/user-placeholder.png'; }} />
                      <div className="ml-4"><p className="font-bold text-gray-900">{testimonial.name}</p><p className="text-sm text-gray-500">{testimonial.location} • <span className="font-semibold text-blue-600">{testimonial.service}</span></p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          <section className="py-20 md:py-28 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.faq_title}</h2><p className="text-lg text-gray-600">{t.faq_description}</p></div>
                  <div className="space-y-4">
                      {t.faq_list.map((faq: FaqItem, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                              <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex justify-between items-center p-6 text-left"><h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>{openFaq === index ? <ChevronUp className="w-6 h-6 text-blue-600" /> : <ChevronDown className="w-6 h-6 text-gray-500" />}</button>
                              {openFaq === index && (<div className="px-6 pb-6"><p className="text-gray-600 leading-relaxed">{faq.answer}</p></div>)}
                          </div>
                      ))}
                  </div>
                  <button className='text-white border-1 p-2 rounded-full bg-blue-500 mt-4'>{t.visit_faq}</button> 
              </div>
          </section>
          
          <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h3 className="text-center text-xl font-semibold text-gray-500 mb-8">{t.trust}</h3>
                  <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
                      <Image src="https://cdn.iconscout.com/icon/free/png-512/free-ola-icon-download-in-svg-png-gif-file-formats--cabs-logo-brand-world-logos-vol-1-pack-icons-282225.png?f=webp&w=512" alt="Ola" width={100} height={40} />
                      <Image src="https://cdn.iconscout.com/icon/free/png-512/free-uber-icon-download-in-svg-png-gif-file-formats--brand-company-logo-world-logos-vol-3-pack-icons-282340.png?f=webp&w=512" alt="Uber" width={100} height={40} />
                      <Image src="https://cdn.iconscout.com/icon/free/png-256/free-blusmart-4987640-4155106.png?f=webp&w=256" alt="BluSmart" width={140} height={40} />
                  </div>
              </div>
          </section>

          <section className="bg-gradient-to-r from-blue-700 to-indigo-800 py-20 md:py-28">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-6">{t.ready_tag}</h2>
                  <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">{t.hero_description}</p>
                  <button onClick={handleJoinNow} className="group bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">{t.start_journey} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></button>
              </div>
          </section>
        </main>
        <ContactFooter />
      </>
    );
  }