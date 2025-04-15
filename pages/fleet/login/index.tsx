// src/app/fleet/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function FleetLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log('Attempting Fleet login with:', email); // Avoid logging password in production logs

    // --- TODO: API Call for fleet email/password login ---
    // try {
    //   const fleetManager = await api.loginFleetManager(email, password);
    //   // Handle successful login (e.g., redirect to fleet dashboard, set auth state)
    //   console.log('Fleet Login successful:', fleetManager);
    //   // router.push('/fleet/dashboard');
    // } catch (err: any) {
    //   console.error("Fleet login error:", err);
    //   setError(err.message || 'Invalid email/password or login failed. Please try again.');
    // } finally {
    //   setIsLoading(false);
    // }
    // --- End of API call logic ---

    // --- Mock Success/Failure ---
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    if (email === "error@example.com") {
        setError("Invalid email or password provided.");
        setIsLoading(false);
    } else {
        console.log("Mock Fleet Login Successful");
        // Redirect or update auth state here
        setIsLoading(false);
        // Example redirect: window.location.href = '/fleet/dashboard'; // Or use Next.js router
    }
    // --- End Mock ---
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          {/* Optional Logo */}
          {/* <Image src="/logo.png" alt="Logo" width={150} height={40} className="mx-auto h-12 w-auto mb-4" /> */}
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">
            Fleet Owner Login
          </h1>
          <p className="text-gray-600">
            Access your fleet management dashboard.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white shadow-xl rounded-xl p-8 space-y-6">
          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              icon={EnvelopeIcon}
              required
              autoComplete="email"
            />
            <div> {/* Wrap password and forgot link */}
              <InputField
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  icon={LockClosedIcon}
                  required
                  autoComplete="current-password"
              />
               <div className="text-right text-sm -mt-2 mr-1"> {/* Adjust spacing as needed */}
                  <Link href="/fleet/forgot-password" // TODO: Create this page
                     className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                     Forgot Password?
                  </Link>
               </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out"
            >
              {isLoading ? 'Logging in...' : 'Login to Dashboard'}
              {!isLoading && <ArrowRightOnRectangleIcon className="w-5 h-5 ml-2" />}
            </button>
          </form>
        </div>

        {/* Registration Link */}
        <div className="text-center text-sm text-gray-600">
          Don't have a fleet account yet?{' '}
          <Link href="/fleet/login" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
            Register Your Fleet
          </Link>
        </div>
      </div>
    </div>
  );
}


// --- Reusable Input Field Component ---
// (Make sure this component is defined correctly, either here or imported)
function InputField({ id, label, type = 'text', value, onChange, placeholder, icon: Icon, required = false, prefix, className = '', ...props }: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ElementType;
  required?: boolean;
  prefix?: string; // Added prefix prop
  className?: string;
  [key: string]: any; // Allow other input props like autoComplete
}) {
  const hasIconOrPrefix = Icon || prefix;
  return (
    <div>
      {label && (
         <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
           {label}
         </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {hasIconOrPrefix && (
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
          className={`block w-full border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out ${hasIconOrPrefix ? 'pl-12 pr-4' : 'px-4'} ${className}`} // Adjusted padding for icon/prefix
          {...props}
        />
      </div>
    </div>
  );
}