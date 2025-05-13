'use client';

import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Star, CheckCircle, X, User, Phone, Mail, Car, ThumbsUp } from 'lucide-react';

export default function RateDriverPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<{
    type: string;
    name: string;
    email: string;
    aadhaarLast4: string;
    registrationTimestamp: string | null;
  } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    driverId: 0, 
    mobileNumber: '',
    emailId: '',
    carRating: 3,
    driverRating: 3,
    rideExperienceRating: 3,
    // comments: '',
  });

  // Load user data and driverId from token
  useEffect(() => {
    // Extract token (driverId) from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tokenString = urlParams.get('token'); // token is a string | null

    let numericDriverId = 0; // Default to 0, which is a number

    if (tokenString) { // Check if tokenString is not null or empty
      const parsed = parseInt(tokenString, 10);
      if (!isNaN(parsed)) {
        numericDriverId = parsed;
      } else {
        // Optional: Log a warning if token is present but not a valid number string
        console.warn(`URL token '${tokenString}' is not a valid number for driverId. Using default 0.`);
      }
    }
    // At this point, numericDriverId is guaranteed to be a number.

    const storedUserDetail = localStorage.getItem('userDetail');
    if (storedUserDetail) {
      try {
        const parsedData = JSON.parse(storedUserDetail);
        setUserData(parsedData); // Set the userData state for other uses (e.g. resetForm, display)

        setFormData(prev => ({
          ...prev, // Keep other form data like ratings, comments, mobileNumber
        //   name: parsedxData.name || '', // Prefill name from localStorage
        //   emailId: parsedData.email || '', // Prefill email from localStorage
          driverId: numericDriverId, // Set numeric driverId from token
        }));
      } catch (e) {
        console.error('Invalid user data in localStorage:', e);
        // Fallback: still set driverId from token, but name/email will remain their defaults (empty string)
        setFormData(prev => ({
          ...prev,
          driverId: numericDriverId,
        }));
      }
    } else {
      // No userDetail in localStorage, just set driverId from token.
      // Name/email will remain their defaults (empty string from initial formData state).
      setFormData(prev => ({
        ...prev,
        driverId: numericDriverId,
      }));
    }
  }, []); // Empty dependency array, runs once on mount


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (name: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // formData.driverId will now be a number
      await axios.post('https://ritiktest.site/api/ratings/rate-driver', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      setSubmitted(true);
      setStep(3); // Move to thank you step
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateStep1 = () => {
    // Ensure driverId is not 0 if it's required to be a positive number from token
    // For now, 0 might be a valid default if token is not present or invalid.
    // If driverId must be > 0, add: && formData.driverId > 0
    return formData.name && formData.driverId !== undefined && formData.mobileNumber && formData.emailId;
  };

  const resetForm = () => {
    // When resetting, driverId goes back to 0 (or you could re-parse from URL if needed)
    // userData might be stale if localStorage changed, but for this scope, it's using what was loaded.
    setFormData({
      name: userData?.name || '',
      driverId: 0, // Reset to a default numeric value
      mobileNumber: '',
      emailId: userData?.email || '',
      carRating: 3,
      driverRating: 3,
      rideExperienceRating: 3,
    //   comments: '',

    });
    setStep(1);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <Toaster position="top-center" />
      
      <div className="max-w-lg mx-auto">
        {/* Progress indicator */}
        {!submitted && (
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                  <User size={18} />
                </div>
                <span className="text-xs mt-1">Details</span>
              </div>
              <div className={`h-1 flex-1 mx-2 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                  <Star size={18} />
                </div>
                <span className="text-xs mt-1">Rating</span>
              </div>
              <div className={`h-1 flex-1 mx-2 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <div className={`flex flex-col items-center ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                  <CheckCircle size={18} />
                </div>
                <span className="text-xs mt-1">Confirm</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white text-black rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white text-center">Rate Your Driver</h1>
            <p className="text-indigo-200 text-center text-sm mt-1">Your feedback helps us improve our services</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Enter Trip Details</h2>
                
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
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
                      className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="driverId" className="block text-sm font-medium text-gray-600 mb-1">
                    Driver ID
                  </label>
                  <input
                    type="text" // Using type="text" is fine for display; it will show the number as a string.
                               // If you prefer, type="number" can be used, but it has different UI controls.
                    id="driverId"
                    name="driverId"
                    value={formData.driverId} // formData.driverId is a number, input value converts it to string for display
                    // onChange={} // Intentionally commented out as it's set from URL.
                    readOnly // Good to add if it's not meant to be changed by user here
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50" // Added bg-gray-50 for readonly appearance
                    placeholder="DRV123456" // Placeholder might be confusing if ID is purely numeric
                  />
                </div>
                
                <div className="relative">
                  <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-600 mb-1">
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
                      className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label htmlFor="emailId" className="block text-sm font-medium text-gray-600 mb-1">
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
                      className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!validateStep1()}
                    className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${
                      validateStep1()
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Rate Your Experience</h2>
                
                <div className="space-y-8">
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
                </div>
                
                {/* <div>
                  <label htmlFor="comments" className="block text-sm font-medium text-gray-600 mb-1">
                    Additional Comments (Optional)
                  </label>
                  <textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Tell us more about your experience..."
                  />
                </div> */}
                
                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && !submitted && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Confirm Your Rating</h2>
                
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Your Name:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Driver ID:</span>
                    <span className="font-medium">{formData.driverId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Car Rating:</span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < formData.carRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Driver Rating:</span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < formData.driverRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Overall Experience:</span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < formData.rideExperienceRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition duration-200 flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Submitting...
                      </>
                    ) : (
                      'Submit Rating'
                    )}
                  </button>
                </div>
              </div>
            )}

            {submitted && (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
                <p className="text-gray-600 mb-6">Your feedback helps us improve our service</p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition duration-200"
                >
                  Rate Another Driver
                </button>
              </div>
            )}
          </form>
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
  icon
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
                star <= value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
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