// src/app/driver/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import for redirection
import axios, { isAxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
  TruckIcon, // Added for visual element
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export default function DriverLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize router

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic validation
    if (!email || !password) {
        setError("Please enter both email and password.");
        setIsLoading(false);
        toast.error("Please enter both email and password.");
        return;
    }

    const loadingToastId = toast.loading('Logging in...');
    console.log('Attempting login with Email:', email);

    try {
      // --- Axios Login API Call ---
      const response = await axios.post(
        'http://52.66.5.17:8080/auth/login', // Use the correct API endpoint
        {
          // Send data as JSON object
          email: email,
          password: password,
        },
        {
          // Explicitly set Content-Type header (though Axios often infers it for objects)
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast.dismiss(loadingToastId); // Dismiss loading toast

      // --- Handle Success ---
      console.log('Login API Response:', response.data);
      const token = response.data?.token; // Extract token based on Postman screenshot

      if (token && typeof token === 'string') {
        localStorage.setItem('authToken', token); // Store token
        toast.success('Login Successful!');
        console.log("Auth token stored.");

        // --- TODO: Redirect to the driver dashboard ---
        // Replace '/driver/dashboard' with your actual dashboard route
        router.push('/driver/dashboard');

      } else {
        console.warn("Login successful, but token not found in response:", response.data);
        setError("Login succeeded but failed to retrieve session token.");
        toast.error("Login succeeded but failed to retrieve session token.");
      }
      // --- End Success Handling ---

    } catch (err) { // Handle Axios and other errors
      toast.dismiss(loadingToastId);
      console.error("Login error:", err);

      let errorMsg = "An unexpected error occurred during login.";

      if (isAxiosError(err)) {
        if (err.response) {
          // Server responded with an error status (4xx, 5xx)
          console.error("Error response data:", err.response.data);
          console.error("Error response status:", err.response.status);
           // Try to get specific message from backend
          errorMsg = err.response.data?.message ||
                     (typeof err.response.data === 'string' ? err.response.data : null) ||
                     `Login failed (Status: ${err.response.status})`;
        } else if (err.request) {
          // Request made, but no response received (Network Error)
          console.error("Error request:", err.request);
          errorMsg = "Could not connect to the server. Please check your connection.";
        } else {
          // Error setting up the request
          errorMsg = err.message || "Error setting up the login request.";
        }
      } else if (err instanceof Error) {
        errorMsg = err.message;
      }

      setError(errorMsg);
      toast.error(`Login Failed: ${errorMsg}`); // Show specific error

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 via-white to-sky-100 p-4 sm:p-6 lg:p-8">
       <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"> {/* Slightly wider card */}
        <div className="px-6 py-8 sm:px-10 sm:py-12"> {/* Increased padding */}

          {/* Header */}
          <div className="text-center mb-8">
             <TruckIcon className="mx-auto h-12 w-auto text-indigo-600 mb-4" /> {/* Added Icon */}
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Driver Portal
            </h1>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Sign in to access your dashboard.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            {/* Error Display */}
            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                       <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                       <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
            )}

            {/* Email Input */}
            <InputField
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              icon={EnvelopeIcon} // Keep icon for visual cue
              required
              autoComplete="email"
            />

            {/* Password Input */}
            <InputField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              icon={LockClosedIcon} // Keep icon for visual cue
              required
              autoComplete="current-password"
            />

            {/* Forgot Password Link */}
            <div className="text-right text-sm">
              <Link href="/forgot-password" // TODO: Implement this page if needed
                className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out"
            >
              {isLoading ? (
                 <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                 </>
              ) : (
                 <>
                    Sign In
                    <ArrowRightOnRectangleIcon className="w-5 h-5 ml-2" />
                 </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Don't have a driver account?{' '}
            <Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 hover:underline">
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


// --- Reusable InputField Component (Slightly simplified styling) ---
function InputField({ id, label, type = 'text', value, onChange, placeholder, icon: Icon, required = false, className = '', ...props }: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ElementType; // Keep icon prop
  required?: boolean;
  className?: string;
  [key: string]: any; // Allow other input props like autoComplete
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        {Icon && ( // Conditionally render icon container
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
          // Adjust padding based on icon presence
          className={`block w-full rounded-md border-0 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition duration-150 ease-in-out ${Icon ? 'pl-10' : 'px-3'} ${className}`} // Updated classes for better focus/border
          {...props}
        />
      </div>
    </div>
  );
}