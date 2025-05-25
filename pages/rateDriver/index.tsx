'use client';

import { useEffect, useState, useRef, ReactNode } from 'react'; // Added ReactNode
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
  Percent,   // For ScratchableCoupon
  Calendar,  // For ScratchableCoupon
  Tag,       // For ScratchableCoupon
} from 'lucide-react';

// FormData interface (can be defined once if used by both)
interface PageFormData {
  name: string;
  driverId: number; // Ensure this is treated as a number if API expects it
  mobileNumber: string;
  emailId: string;
  carRating: number;
  driverRating: number;
  rideExperienceRating: number;
  safetyRating: number;
  [key: string]: any; // For dynamic access
}

export default function RateDriverPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2>(2);
  const [userData, setUserData] = useState<{ // Not strictly used for form, but good for context
    name?: string;
    email?: string;
  }>({});

  const [formData, setFormData] = useState<PageFormData>({
    name: '',
    driverId: 0,
    mobileNumber: '',
    emailId: '',
    carRating: 3, // Default rating
    driverRating: 3,
    rideExperienceRating: 3,
    safetyRating: 3,
  });

  // Load user data and driverId from URL/localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token'); // Assuming token is the driverId
    // Ensure driverId is a number, default to 0 if not valid
    const driverId = token && !isNaN(parseInt(token, 10)) ? parseInt(token, 10) : 0;

    const storedUserDetails = localStorage.getItem('userDetail');
    let userName = '';
    let userEmail = '';

    if (storedUserDetails) {
      try {
        const parsed = JSON.parse(storedUserDetails);
        setUserData(parsed); // Store parsed user data
        userName = parsed.name || '';
        userEmail = parsed.email || '';
      } catch (error) {
        console.error("Failed to parse userDetail from localStorage:", error);
        // Fallback or default values if parsing fails
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      name: userName,
      emailId: userEmail,
      driverId,
    }));
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
        'https://ritiktest.site/api/ratings/rate-driver', // Your API endpoint
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      toast.success('Rating submitted successfully!');
      setStep(2); // Move to coupon step
    } catch (err) {
      console.error("API Error:", err);
      // More specific error handling if possible (e.g., check err.response)
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
              className={`flex flex-col items-center transition-colors duration-300 ${
                step >= 1 ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 ${
                  step >= 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200'
                }`}
              >
                <Star size={18} />
              </div>
              <span className="text-xs mt-1 font-medium">Rating</span>
            </div>
            <div
              className={`h-1 flex-1 mx-2 transition-colors duration-500 ${
                step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            />
            <div
              className={`flex flex-col items-center transition-colors duration-300 ${
                step >= 2 ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 ${
                  step >= 2
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200'
                }`}
              >
                <Gift size={18} />
              </div>
              <span className="text-xs mt-1 font-medium">Coupon</span>
            </div>
          </div>
        </div>

        <div className="bg-white text-black rounded-xl shadow-xl overflow-hidden">
          {/* Dynamic Header */}
          <div className="bg-indigo-600 px-6 py-5">
            <h1 className="text-2xl font-bold text-white text-center">
              {step === 1 ? 'THANKS FOR RATING' : 'SCRATCH TO WIN!'}
            </h1>
            <p className="text-indigo-200 text-center text-sm mt-1">
              {step === 1
                ? 'Your feedback helps us improve our services'
                : 'Scratch the coupon below to reveal your discount'}
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Details */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
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
                    className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="driverId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Driver ID
                </label>
                <input
                  type="text" // Keep as text if it can have non-numeric parts, otherwise 'number'
                  id="driverId"
                  name="driverId"
                  value={formData.driverId === 0 ? '' : formData.driverId} // Show empty if 0
                  readOnly
                  className="block w-full border-gray-300 rounded-lg shadow-sm bg-gray-100 py-2.5 px-3 sm:text-sm cursor-not-allowed"
                />
              </div>

              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
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
                    className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="emailId"
                  className="block text-sm font-medium text-gray-700 mb-1"
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
                    className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Ratings */}
              <div className="space-y-6 pt-2">
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
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition duration-200 flex items-center justify-center shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback & Reveal Reward'}
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="p-6 flex justify-center items-center text-center ">
              <ScratchableCoupon />
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Tailwind already has animate-bounce */
      `}</style>
    </div>
  );
}

// Scratchable Coupon Component
function ScratchableCoupon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  const COUPON_WIDTH = 320; // Increased width for better text fit
  const COUPON_HEIGHT = 180; // Increased height for better text fit

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = COUPON_WIDTH;
    canvas.height = COUPON_HEIGHT;

    // Create scratch surface with gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#D1D5DB'); // gray-300
    gradient.addColorStop(0.5, '#9CA3AF'); // gray-400
    gradient.addColorStop(1, '#6B7280'); // gray-500
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add scratch pattern (more subtle)
    ctx.fillStyle = 'rgba(229, 231, 235, 0.7)'; // gray-200 with opacity
    for (let i = 0; i < 100; i++) { // Increased density
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 2 + 0.5; // Smaller specks
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add "SCRATCH HERE" text
    ctx.fillStyle = '#374151'; // gray-700
    ctx.font = 'bold 20px Arial, sans-serif'; // Slightly larger
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle'; // Better vertical alignment
    ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2 - 12);
    ctx.font = '14px Arial, sans-serif'; // Slightly larger
    ctx.fillText('to reveal your discount', canvas.width / 2, canvas.height / 2 + 12);
  }, []);

  const calculateScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;

    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) { // Check alpha channel
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }
    return (transparentPixels / (pixels.length / 4)) * 100;
  };

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return; // Don't scratch if already revealed

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      if (!e.touches[0]) return; // No touch point
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2); // Brush size
    ctx.fill();

    // Only calculate percentage if not already revealed to save performance
    if (!isRevealed) {
        const percentage = calculateScratchPercentage();
        setScratchPercentage(percentage);

        if (percentage > 50) { // Reveal threshold
            setIsRevealed(true);
            toast.success('Congratulations! Your discount is revealed!');
            // Optionally fade out the canvas entirely
            if (canvas) {
                canvas.style.transition = 'opacity 0.5s ease-out';
                canvas.style.opacity = '0';
            }
        }
    }
  };

  const handleInteractionStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    // Prevent default for touch to avoid scrolling while scratching
    if ('touches' in e && e.cancelable) {
        e.preventDefault();
    }
    scratch(e); // Scratch on initial touch/click
  };
  const handleInteractionEnd = () => setIsDrawing(false);
  
  const handleInteractionMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if ('touches' in e && e.cancelable) {
        e.preventDefault();
    }
    if (isDrawing) scratch(e);
  };


  return (
    <div className="text-center">
      <div className="mb-6">
        <CheckCircle size={48} className="mx-auto text-green-500 mb-3" />
        <h2 className="text-2xl font-semibold mb-1 text-gray-800">Thank you for your feedback!</h2>
        <p className="text-gray-600">Scratch below to reveal your exclusive discount.</p>
      </div>

      <div className="relative mx-auto mb-6 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-1 rounded-xl shadow-2xl max-w-sm">
        <div className="bg-white rounded-lg p-5 relative overflow-hidden">
          {/* Background Pattern - Subtle dots */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(#a78bfa 1px, transparent 1px)', // indigo-400 dots
            backgroundSize: '10px 10px'
          }}></div>
          
          <div className="relative z-10 mb-4">
            <div className="flex items-center justify-center mb-1">
              <Gift className="text-purple-600 mr-2" size={28} />
              <h3 className="text-xl font-bold text-gray-800 tracking-tight">MEGAMART</h3>
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Exclusive Offer</p>
          </div>

          <div 
            className="relative rounded-lg overflow-hidden mx-auto"
            style={{ width: `${COUPON_WIDTH}px`, height: `${COUPON_HEIGHT}px`}}
          >
            {/* Hidden Coupon Content Behind Canvas */}
            <div className={`absolute inset-0 z-0 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-lg text-white p-4 transition-opacity duration-500 ${isRevealed ? 'opacity-100' : 'opacity-100'}`}>
              <Percent size={40} className="mb-2 opacity-80" />
              <div className="text-4xl font-extrabold leading-tight tracking-tighter">25% OFF</div>
              <div className="mt-2 text-sm bg-white/25 px-3 py-1 rounded-md font-mono shadow-sm">
                CODE: SAVE25
              </div>
              <div className="text-xs mt-2 opacity-90">On Your Next Purchase!</div>
            </div>

            {/* Scratchable Canvas Overlay */}
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 z-10 w-full h-full cursor-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="rgba(0,0,0,0.2)" stroke="rgba(255,255,255,0.5)" stroke-width="2"/></svg>'),_auto] transition-opacity duration-500`}
              onMouseDown={handleInteractionStart}
              onMouseUp={handleInteractionEnd}
              onMouseLeave={handleInteractionEnd} // End drawing if mouse leaves
              onMouseMove={handleInteractionMove}
              onTouchStart={handleInteractionStart}
              onTouchEnd={handleInteractionEnd}
              onTouchMove={handleInteractionMove}
              style={{ opacity: isRevealed ? 0 : 1, touchAction: 'none' }}
            />
          </div>

          {isRevealed && (
            <div className="mt-5 space-y-2 text-sm text-gray-700 animate-fade-in">
              <div className="flex items-center justify-center space-x-2">
                <Calendar size={16} className="text-indigo-500" />
                <span>Valid until: Dec 31, 2024</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Tag size={16} className="text-indigo-500" />
                <span>Min. purchase: ₹500</span>
              </div>
              <div className="text-center mt-3">
                <p className="text-xs text-gray-500">Your coupon code:</p>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-md text-base font-mono font-semibold shadow-sm">SAVE25</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {!isRevealed && (
        <div className="mb-4 px-2 max-w-sm mx-auto">
            <div className="text-xs text-gray-500 mb-1 text-left">
            Scratch Progress: {Math.round(scratchPercentage)}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 shadow-inner">
            <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(scratchPercentage, 100)}%` }}
            ></div>
            </div>
        </div>
      )}

      {isRevealed && (
        <div className="mt-6 animate-bounce">
          <a
            href="https://yourshop.com" // Replace with your actual link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl hover:from-purple-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
          >
            🛍️ Shop Now & Save 25%
          </a>
        </div>
      )}

      {!isRevealed && (
        <p className="text-sm text-gray-500 mt-4">
          💡 Tip: Use your finger or mouse to scratch the gray area above.
        </p>
      )}
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
  icon: ReactNode;
}) {
  const ratingDescriptions: {[key: number]: string} = {
    1: 'Poor',
    2: 'Below Average',
    3: 'Average',
    4: 'Good',
    5: 'Excellent'
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center">
        <div className="mr-2.5 p-1.5 bg-indigo-100 rounded-md text-indigo-600">{icon}</div>
        <label className="text-gray-700 font-medium text-sm">{label}</label>
      </div>
      <div className="flex justify-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button" // Important to prevent form submission
            onClick={() => onChange(name, star)}
            className="focus:outline-none p-1 rounded-md focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1"
            aria-label={`Rate ${star} out of 5: ${ratingDescriptions[star] || ''}`}
          >
            <Star
              size={28} // Slightly smaller for better fit on mobile
              className={`${
                star <= value
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 hover:text-gray-400'
              } transition-all duration-150 hover:scale-110 active:scale-100`}
            />
          </button>
        ))}
      </div>
      <div className="text-center text-xs text-gray-500 h-4">
        {value > 0 && ratingDescriptions[value]}
      </div>
    </div>
  );
}