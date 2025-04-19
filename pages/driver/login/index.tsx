// src/app/driver/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Correct import for App Router
import axios, { isAxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {
    EnvelopeIcon,
    LockClosedIcon,
    ArrowRightOnRectangleIcon,
    TruckIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

// --- Get API Base URL from Environment Variable ---
// IMPORTANT: Set NEXT_PUBLIC_API_BASE_URL in your .env.local for development
// AND in your Vercel project settings for deployment.
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Optional: Add a check and warning if the env var is missing during development
if (!apiBaseUrl && process.env.NODE_ENV === 'development') {
    console.warn(
        "Warning: NEXT_PUBLIC_API_BASE_URL environment variable is not set in .env.local. API calls might fail locally."
    );
    // You could uncomment the line below to default to localhost for local dev if needed,
    // but setting it in .env.local is the recommended practice.
    // apiBaseUrl = 'http://localhost:8080'; // Example fallback ONLY for local dev convenience
}

export default function DriverLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter(); // Initialize Next.js router

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // --- Check if API Base URL is configured ---
        if (!apiBaseUrl) {
            const errorMsg = "API URL configuration is missing. Please contact support.";
            setError(errorMsg);
            setIsLoading(false);
            toast.error(errorMsg);
            console.error("CRITICAL ERROR: NEXT_PUBLIC_API_BASE_URL is not defined!");
            return; // Stop execution if API URL is missing
        }

        // Basic validation
        if (!email || !password) {
            setError("Please enter both email and password.");
            setIsLoading(false);
            toast.error("Please enter both email and password.");
            return;
        }

        const loadingToastId = toast.loading('Logging in...');
        console.log('Attempting login with Email:', email);
        console.log('Using API Endpoint Base:', apiBaseUrl); // Log the base URL being used

        try {
            // --- Axios Login API Call using Environment Variable ---
            const response = await axios.post(
                `https://ritiktest.site/auth/login`, // Construct the full URL
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // Optional: Add a timeout for robustness
                    // timeout: 15000, // e.g., 15 seconds
                }
            );

            toast.dismiss(loadingToastId);

            // --- Handle Success ---
            // console.log('Login API Response:', JSON.stringify(response.data.user));
            // Adjust '.token' based on your actual API response structure
            const token = response.data?.user.token;
            const userData = {
                "type":"Bharat Sarathi Registration",
                "name":response.data?.user.name,
                "email":response.data?.user.email,
                "aadhaarLast4": (response.data?.user.aadhaarNumber).slice(8,12),
                "registrationTimestamp":null
            }
            

            if(userData && userData != null){
                localStorage.setItem('userDetail', JSON.stringify(userData));
            }

            if (token && typeof token === 'string') {
                localStorage.setItem('authToken', token);
                // Optional: Dispatch event if needed by other components
                window.dispatchEvent(new Event('loginSuccess'));
                toast.success('Login Successful!');

                // --- Redirect using Next.js Router ---
                // Replace '/' with your desired driver dashboard route if different
                router.push('/');
                // Consider router.refresh() if layout/server components need updated auth state immediately
                // router.refresh();

            } else {
                console.warn("Login successful, but token not found or invalid in response:", response.data);
                const errMsg = "Login succeeded but failed to retrieve session token.";
                setError(errMsg);
                toast.error(errMsg);
            }
            // --- End Success Handling ---

        } catch (err) {
            toast.dismiss(loadingToastId);
            console.error("Login error details:", err); // Log the full error object

            let errorMsg = "An unexpected error occurred during login.";

            if (isAxiosError(err)) {
                 // Network Error / No Response (Most likely CORS or server down/unreachable)
                if (err.code === 'ERR_NETWORK' || !err.response) {
                     errorMsg = "Cannot connect to the server. Please check your network or try again later.";
                     console.error("Network Error or No Response:", err.message);
                }
                // Server responded with an error status (4xx, 5xx)
                else if (err.response) {
                    console.error("Error response status:", err.response.status);
                    console.error("Error response data:", err.response.data);

                    // Try to extract a meaningful message from the backend response
                    const backendMessage = err.response.data?.message || err.response.data?.error || (typeof err.response.data === 'string' ? err.response.data : null);

                    // Provide user-friendly messages for common statuses
                    if (err.response.status === 401 || err.response.status === 403) {
                        errorMsg = backendMessage || "Invalid email or password.";
                    } else if (err.response.status === 400) {
                         errorMsg = backendMessage || "Invalid request. Please check your input.";
                    } else if (err.response.status >= 500) {
                        errorMsg = backendMessage || "Server error during login. Please try again later.";
                    } else {
                         errorMsg = backendMessage || `Login failed (Status: ${err.response.status})`;
                    }
                } else if (err.request) {
                    // Request made, but no response received (less common with modern Axios)
                    console.error("Error request (no response received):", err.request);
                    errorMsg = "No response received from the server.";
                } else {
                    // Error setting up the request
                    errorMsg = err.message || "Error setting up the login request.";
                }
            } else if (err instanceof Error) {
                 // Handle non-Axios errors (e.g., unexpected issues in the try block)
                errorMsg = err.message;
            }

            setError(errorMsg);
            toast.error(`Login Failed: ${errorMsg}`);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 via-white to-sky-100 p-4 sm:p-6 lg:p-8">
            {/* Toaster for displaying notifications */}
            <Toaster position="top-center" reverseOrder={false} />

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="px-6 py-8 sm:px-10 sm:py-12">

                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <TruckIcon className="mx-auto h-12 w-auto text-indigo-600 mb-4" aria-hidden="true"/>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Driver Portal
                        </h1>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            Sign in to access your dashboard.
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleEmailSubmit} className="space-y-6">
                        {/* Error Display Area */}
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-red-800">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                         {/* Display warning if API URL is missing */}
                         {!apiBaseUrl && process.env.NODE_ENV === 'production' && (
                             <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-md">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <ExclamationTriangleIcon className="h-5 w-5 text-orange-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-orange-800">
                                            Login service is temporarily unavailable. Please contact support. (Error: API URL missing)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Email Input Field */}
                        <InputField
                            id="email"
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Correctly typed
                            placeholder="you@example.com"
                            icon={EnvelopeIcon}
                            required
                            autoComplete="email"
                            disabled={isLoading || !apiBaseUrl}
                        />

                        {/* Password Input Field */}
                        <InputField
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Correctly typed
                            placeholder="Enter your password"
                            icon={LockClosedIcon}
                            required
                            autoComplete="current-password"
                            disabled={isLoading || !apiBaseUrl}
                        />

                        {/* Forgot Password Link */}
                        <div className="text-right text-sm">
                            <Link href="/forgot-password" // Ensure this route exists or remove/comment out
                                className={`font-medium text-indigo-600 hover:text-indigo-500 hover:underline ${isLoading || !apiBaseUrl ? 'pointer-events-none opacity-50' : ''}`}>
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !apiBaseUrl} // Disable if loading or API URL missing
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
                                    <ArrowRightOnRectangleIcon className="w-5 h-5 ml-2" aria-hidden="true"/>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-8 text-center text-sm text-gray-500">
                        Don't have a driver account?{' '}
                        <Link href="/register" // Ensure this route exists
                              className={`font-semibold leading-6 text-indigo-600 hover:text-indigo-500 hover:underline ${isLoading || !apiBaseUrl ? 'pointer-events-none opacity-50' : ''}`}>
                            Register Here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


// --- Reusable InputField Component (with TypeScript Fix) ---
// Props type definition for InputField
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: string; // type is already part of InputHTMLAttributes, but keeping for clarity
  value: string;
  // Corrected type: optional ('?') and returns void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ElementType; // Component type for the icon
  // required is also part of InputHTMLAttributes
  className?: string;
}

function InputField({
    id,
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    icon: Icon,
    required = false,
    className = '',
    ...props // Collect remaining standard input props
}: InputFieldProps) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                {/* Render icon if provided */}
                {Icon && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                )}
                <input
                    type={type}
                    id={id}
                    name={id} // Good practice to include name attribute
                    value={value}
                    onChange={onChange} // Pass the handler
                    placeholder={placeholder}
                    required={required}
                    // Apply base styles, add padding for icon, and allow overriding/extending via className prop
                    className={`block w-full rounded-md border-0 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6 transition duration-150 ease-in-out ${Icon ? 'pl-10' : 'px-3'} ${className}`}
                    {...props} // Spread remaining props (like disabled, autoComplete, etc.)
                />
            </div>
        </div>
    );
}