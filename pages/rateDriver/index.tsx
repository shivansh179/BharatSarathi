'use client';

import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import {
  Star,
  CheckCircle,
  User,
  Phone,
  Mail,
  Car,
  ThumbsUp,
  Shield,
  Gift,
} from 'lucide-react';

export default function RateDriverPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [userData, setUserData] = useState<{
    name?: string;
    email?: string;
  }>({});

  const [formData, setFormData] = useState<{
    name: string;
    driverId: number;
    mobileNumber: string;
    emailId: string;
    carRating: number;
    driverRating: number;
    rideExperienceRating: number;
    safetyRating: number;
  }>({
    name: '',
    driverId: 0,
    mobileNumber: '',
    emailId: '',
    carRating: 3,
    driverRating: 3,
    rideExperienceRating: 3,
    safetyRating: 3,
  });

  // Load user data and driverId from URL/localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const driverId = token && !isNaN(+token) ? +token : 0;

    const stored = localStorage.getItem('userDetail');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserData(parsed);
        setFormData((p) => ({
          ...p,
          name: parsed.name || '',
          emailId: parsed.email || '',
          driverId,
        }));
      } catch {
        setFormData((p) => ({ ...p, driverId }));
      }
    } else {
      setFormData((p) => ({ ...p, driverId }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleRatingChange = (name: string, value: number) => {
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(
        'https://ritiktest.site/api/ratings/rate-driver',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setStep(2);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <Toaster position="top-center" />
      <div className="max-w-lg mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div
              className={`flex flex-col items-center ${
                step >= 1 ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  step >= 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200'
                }`}
              >
                <Star size={18} />
              </div>
              <span className="text-xs mt-1">Rating</span>
            </div>
            <div
              className={`h-1 flex-1 mx-2 ${
                step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            />
            <div
              className={`flex flex-col items-center ${
                step >= 2 ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  step >= 2
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200'
                }`}
              >
                <Gift size={18} />
              </div>
              <span className="text-xs mt-1">Coupon</span>
            </div>
          </div>
        </div>

        <div className="bg-white text-black rounded-xl shadow-lg overflow-hidden">
          {/* Dynamic Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white text-center">
              {step === 1 ? 'THANKS FOR RATING' : 'AVAIL COUPON'}
            </h1>
            <p className="text-indigo-200 text-center text-sm mt-1">
              {step === 1
                ? 'Your feedback helps us improve our services'
                : 'Claim your voucher and start shopping now'}
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Details */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="driverId"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Driver ID
                </label>
                <input
                  type="text"
                  id="driverId"
                  name="driverId"
                  value={formData.driverId}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                />
              </div>

              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="emailId"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="emailId"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Ratings */}
              <div className="space-y-6">
                <RatingComponent
                  label="Car Cleanliness & Comfort"
                  name="carRating"
                  value={formData.carRating}
                  onChange={handleRatingChange}
                  icon={<Car size={20} />}
                />
                <RatingComponent
                  label="Driver Behavior & Professionalism"
                  name="driverRating"
                  value={formData.driverRating}
                  onChange={handleRatingChange}
                  icon={<User size={20} />}
                />
                <RatingComponent
                  label="Overall Ride Experience"
                  name="rideExperienceRating"
                  value={formData.rideExperienceRating}
                  onChange={handleRatingChange}
                  icon={<ThumbsUp size={20} />}
                />
                <RatingComponent
                  label="Safety Rating"
                  name="safetyRating"
                  value={formData.safetyRating}
                  onChange={handleRatingChange}
                  icon={<Shield size={20} />}
                />
              </div>

              {/* Submit */}
              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition duration-200 flex items-center"
                >
                  {isSubmitting ? 'Submitting...' : 'START SHOPPING'}
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="p-6 text-center">
              <div className="mb-4">
                <CheckCircle
                  size={48}
                  className="mx-auto text-green-500"
                />
              </div>
              <h2 className="text-xl font-semibold mb-4">
                Here’s your coupon!
              </h2>
              <div className="text-3xl font-bold text-indigo-600 mb-6">
                SAVE10
              </div>
              <a
                href="https://yourshop.com" // ← replace with your product/Shopify/WhatsApp link
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium"
              >
                Shop Now
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Star rating component
function RatingComponent({
  label,
  name,
  value,
  onChange,
  icon,
}: {
  label: string;
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
  icon: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <div className="mr-2 text-indigo-600">{icon}</div>
        <label className="text-gray-700 font-medium">{label}</label>
      </div>
      <div className="flex justify-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(name, star)}
            className="focus:outline-none mx-1 transition duration-150"
          >
            <Star
              size={32}
              className={`${
                star <= value
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              } hover:scale-110 transition-transform`}
            />
          </button>
        ))}
      </div>
      <div className="text-center text-sm text-gray-500">
        {value === 1 && 'Poor'}
        {value === 2 && 'Below Average'}
        {value === 3 && 'Average'}
        {value === 4 && 'Good'}
        {value === 5 && 'Excellent'}
      </div>
    </div>
  );
}
