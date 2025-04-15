// src/app/driver/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Keep if needed for QR upload, otherwise remove
import {
  DevicePhoneMobileIcon,
  QrCodeIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';

type LoginMethod = 'phone' | 'email' | 'qr';

export default function DriverLogin() {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Optional: for loading states
  const [error, setError] = useState<string | null>(null); // Optional: for error messages

  // --- Form Handlers ---

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log('Sending OTP to:', phoneNumber);
    // --- TODO: API Call to send OTP ---
    // try {
    //   await api.sendOtp(phoneNumber);
       setShowOtpInput(true);
    // } catch (err) {
    //   setError('Failed to send OTP. Please try again.');
    // } finally {
    //   setIsLoading(false);
    // }
     // --- Mock Success ---
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    setShowOtpInput(true);
    setIsLoading(false);
    // --- End Mock ---
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log('Verifying OTP:', otp, 'for phone:', phoneNumber);
    // --- TODO: API Call to verify OTP and log in ---
    // try {
    //   const user = await api.verifyOtpAndLogin(phoneNumber, otp);
    //   // Handle successful login (e.g., redirect, set auth state)
    //   console.log('Login successful:', user);
    // } catch (err) {
    //   setError('Invalid OTP or login failed.');
    // } finally {
    //   setIsLoading(false);
    // }
     // --- Mock Success ---
     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
     console.log("Mock Login Successful with OTP");
     // Redirect or update auth state here
     setIsLoading(false);
     // --- End Mock ---
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log('Logging in with Email:', email);
    // --- TODO: API Call for email/password login ---
    // try {
    //   const user = await api.loginWithEmail(email, password);
    //   // Handle successful login
    //   console.log('Login successful:', user);
    // } catch (err) {
    //   setError('Invalid email/password or login failed.');
    // } finally {
    //   setIsLoading(false);
    // }
     // --- Mock Success ---
     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
     console.log("Mock Login Successful with Email");
     // Redirect or update auth state here
     setIsLoading(false);
     // --- End Mock ---
  };

  const handleMethodChange = (method: LoginMethod) => {
    setLoginMethod(method);
    setShowOtpInput(false); // Reset OTP view when switching methods
    setError(null); // Clear errors on method switch
    // Clear form fields if desired
    // setPhoneNumber('');
    // setEmail('');
    // setPassword('');
    // setOtp('');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
           {/* Optional Logo */}
           {/* <Image src="/logo.png" alt="Logo" width={150} height={40} className="mx-auto h-12 w-auto mb-4" /> */}
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">
            Driver Portal Login
          </h1>
          <p className="text-gray-600">
            Access your dashboard using your preferred method.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white shadow-xl rounded-xl p-8 space-y-6">
          {/* Method Switcher */}
          <div className="grid grid-cols-3 gap-2 rounded-lg bg-gray-100 p-1">
            <LoginMethodButton
              label="Phone"
              icon={DevicePhoneMobileIcon}
              isActive={loginMethod === 'phone'}
              onClick={() => handleMethodChange('phone')}
            />
             <LoginMethodButton
              label="Email"
              icon={EnvelopeIcon}
              isActive={loginMethod === 'email'}
              onClick={() => handleMethodChange('email')}
            />
            <LoginMethodButton
              label="QR Code"
              icon={QrCodeIcon}
              isActive={loginMethod === 'qr'}
              onClick={() => handleMethodChange('qr')}
            />
          </div>

           {/* Error Display */}
           {error && (
             <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md text-sm">
               {error}
             </div>
           )}

          {/* Phone Login */}
          {loginMethod === 'phone' && (
            <div>
              {!showOtpInput ? (
                <form onSubmit={handlePhoneSubmit} className="space-y-6">
                  <InputField
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} // Keep only digits, max 10
                    placeholder="Enter your 10-digit number"
                    icon={DevicePhoneMobileIcon}
                    prefix="+91"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading || phoneNumber.length !== 10}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                  >
                    {isLoading ? 'Sending...' : 'Send OTP'}
                     <PaperAirplaneIcon className="w-5 h-5 ml-2 -rotate-45" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                   <div className="flex justify-between items-baseline mb-1">
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
                      <button
                        type="button"
                        onClick={() => { setShowOtpInput(false); setError(null); setOtp(''); }}
                        className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                      >
                        Change Number?
                      </button>
                    </div>
                  <InputField
                    id="otp"
                    label="" // Label provided above
                    type="text" // Use text to allow easier input on some devices
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} // Keep only digits, max 6
                    placeholder="------"
                    inputMode="numeric" // Hint for mobile keyboards
                    maxLength={6}
                    required
                    className="text-center tracking-[0.5em] text-lg font-medium" // OTP styling
                  />
                   <p className="text-xs text-center text-gray-500 -mt-3">
                     Enter the 6-digit code sent to +91 {phoneNumber}
                   </p>
                  <button
                    type="submit"
                    disabled={isLoading || otp.length !== 6}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                  >
                     {isLoading ? 'Verifying...' : 'Verify & Login'}
                    <ArrowRightOnRectangleIcon className="w-5 h-5 ml-2" />
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Email Login */}
          {loginMethod === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <InputField
                id="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                icon={EnvelopeIcon}
                required
              />
              <InputField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                icon={LockClosedIcon}
                required
              />
               <div className="text-right text-sm">
                  <Link href="/forgot-password" // TODO: Create this page
                     className="font-medium text-indigo-600 hover:text-indigo-500">
                     Forgot your password?
                  </Link>
               </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150 ease-in-out"
              >
                 {isLoading ? 'Logging in...' : 'Login with Email'}
                 <ArrowRightOnRectangleIcon className="w-5 h-5 ml-2" />
              </button>
            </form>
          )}

          {/* QR Code Login */}
          {loginMethod === 'qr' && (
            <div className="text-center space-y-4 pt-4">
              <div className="flex justify-center items-center bg-gray-100 rounded-lg p-6 border border-gray-200 max-w-xs mx-auto">
                 <QrCodeIcon className="h-20 w-20 text-indigo-400" />
              </div>
              <p className="text-gray-600 text-sm">
                Open the Bharat Sarthi Driver App on your phone and scan this screen, or use the QR code provided during registration.
              </p>
               {/* QR Upload is less common for web login, but kept as placeholder if needed */}
              {/* <button className="text-indigo-600 text-sm hover:underline font-medium">
                Upload QR image (Optional)
              </button> */}
               <p className="text-xs text-gray-400">QR login might require the mobile app.</p>
            </div>
          )}
        </div>

        {/* Sign Up Link */}
        <div className="text-center text-sm text-gray-600">
          Don't have a driver account yet?{' '}
          <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}


// --- Reusable Components ---

// Input Field Component
function InputField({ id, label, type = 'text', value, onChange, placeholder, icon: Icon, required = false, prefix, className = '', ...props }: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ElementType;
  required?: boolean;
  prefix?: string;
  className?: string;
  [key: string]: any; // Allow other input props like maxLength, inputMode
}) {
  return (
    <div>
      {label && (
         <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
           {label}
         </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {(Icon || prefix) && (
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center border-r border-gray-300 bg-gray-50 rounded-l-md px-3">
            {Icon && <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
            {prefix && <span className="text-gray-500 sm:text-sm">{prefix}</span>}
          </div>
        )}
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`block w-full border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out ${Icon || prefix ? 'pl-16' : 'px-4'} ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}


// Login Method Button Component
function LoginMethodButton({ label, icon: Icon, isActive, onClick }: {
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center justify-center space-x-2 w-full px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500
        ${isActive ? 'bg-white text-indigo-700 shadow' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'}
      `}
    >
      <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
      <span>{label}</span>
    </button>
  );
}