// src/app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, CurrencyDollarIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'; // Using Heroicons for consistency
import Navbar from '@/components/Navbar';
import ContactFooter from '@/components/Conact-Footer';



export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="bg-white"> {/* Overall background */}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-indigo-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-fade-in-left"> {/* Simple animation */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Your Drive, Your Earnings. <span className="text-indigo-600">Join Us Today.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Become a driving partner with Bharat Sarthi. Enjoy competitive pay, flexible schedules, and the freedom to be your own boss. Sign up is quick and easy!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register" // Main driver registration
                  className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-center font-medium shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                >
                  Become a Driver Partner
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/fleet/login" // Fleet owner registration
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-200 px-8 py-3 rounded-lg text-center font-medium shadow-sm hover:shadow-md transition duration-300 ease-in-out"
                >
                  Register Your Fleet
                </Link>
              </div>
            </div>
            {/* Image */}
            <div className="flex justify-center animate-fade-in-right"> {/* Simple animation */}
              <Image
                src="/cab2.jpg" // Suggest a more specific image name
                alt="Driver partner using the Bharat Sarthi app"
                width={550}
                height={450}
                priority // Load hero image faster
                className="rounded-lg shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Why Partner with Bharat Sarthi?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature Card 1 */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-5">
                <CurrencyDollarIcon className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Maximize Your Earnings</h3>
              <p className="text-gray-600">
                Benefit from our competitive commission rates, surge pricing during peak hours, and frequent bonus opportunities. Get paid reliably every week.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-5">
                <ClockIcon className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Drive on Your Schedule</h3>
              <p className="text-gray-600">
                You're in control. Drive full-time, part-time, or just a few hours when it suits you. Log in and out of the app whenever you choose.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-5">
                <ShieldCheckIcon className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety & Support</h3>
              <p className="text-gray-600">
                Your safety is paramount. Access in-app safety features, 24/7 support, and insurance coverage for every trip. Drive with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Get Started in 4 Simple Steps
          </h2>

          <div className="relative">
             {/* Optional: Connecting line for desktop view */}
             <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-indigo-200" style={{zIndex: 0}}></div>

             <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative" style={{zIndex: 1}}>
                {/* Step 1 */}
                <div className="text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-md z-10">1</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Register Online</h3>
                  <p className="text-gray-600 text-sm">
                    Fill out the quick registration form with your basic details.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-md z-10">2</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Documents</h3>
                  <p className="text-gray-600 text-sm">
                    Submit your driving license, vehicle RC, PAN, and Aadhaar card securely via the app or portal.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-md z-10">3</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Verification & QR</h3>
                  <p className="text-gray-600 text-sm">
                    We'll quickly verify your documents. Once approved, you'll get your unique Driver ID & QR code.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-md z-10">4</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Driving!</h3>
                  <p className="text-gray-600 text-sm">
                    Download the Bharat Sarthi Driver App, log in, go online, and start accepting rides!
                  </p>
                </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-center font-medium shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              >
              Register Now & Start Earning
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Hear From Our Driver Partners
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Testimonial Card 1 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-lg flex flex-col">
              <p className="text-gray-600 italic mb-5 flex-grow">
                "Switching to Bharat Sarthi was the best decision. The earnings are much better than my previous platform, and I love the flexibility. The Driver QR makes identity verification simple for passengers."
              </p>
              <div className="flex items-center mt-auto pt-4 border-t border-gray-200">
                <Image
                  src="/placeholder-driver1.png" // Use actual or placeholder images
                  alt="Rajesh Kumar, Driver Partner"
                  width={48}
                  height={48}
                  className="rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Rajesh Kumar</h4>
                  <p className="text-indigo-600 text-sm">Driver Partner since 2023</p>
                </div>
              </div>
            </div>

            {/* Testimonial Card 2 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-lg flex flex-col">
              <p className="text-gray-600 italic mb-5 flex-grow">
                "As a woman driver, safety is my priority. Bharat Sarthi's safety features and prompt support give me peace of mind. The app is user-friendly, and payments are always on time."
              </p>
               <div className="flex items-center mt-auto pt-4 border-t border-gray-200">
               <Image
                  src="/placeholder-driver2.png"
                  alt="Priya Sharma, Driver Partner"
                  width={48}
                  height={48}
                  className="rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Priya Sharma</h4>
                  <p className="text-indigo-600 text-sm">Driver Partner since 2022</p>
                </div>
              </div>
            </div>

             {/* Testimonial Card 3 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-lg flex flex-col">
              <p className="text-gray-600 italic mb-5 flex-grow">
                "Managing my fleet is so much easier with the Bharat Sarthi platform. The dashboard provides clear insights, driver tracking is efficient, and the overall process helps maximize my fleet's earnings."
              </p>
               <div className="flex items-center mt-auto pt-4 border-t border-gray-200">
               <Image
                  src="/placeholder-fleet-owner.png"
                  alt="Amit Patel, Fleet Owner"
                  width={48}
                  height={48}
                  className="rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Amit Patel</h4>
                  <p className="text-indigo-600 text-sm">Fleet Partner since 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-20 bg-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Boost Your Income?
          </h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join the growing community of Bharat Sarthi driver partners across India. Quick registration, great earnings, and full control over your work.
          </p>
          <Link
            href="/driver/login"
            className="inline-flex items-center justify-center bg-white text-indigo-600 hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            Sign Up and Start Driving!
          </Link>
        </div>
      </section>
    </div>
    <ContactFooter/>
    </>
  );
}

// Optional: Add simple fade-in animations in globals.css or a separate CSS file
/*
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .animate-fade-in-left {
    animation: fadeInLeft 1s ease-out forwards;
    opacity: 0;
  }
  .animate-fade-in-right {
    animation: fadeInRight 1s ease-out forwards;
    opacity: 0;
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
}
*/