// src/app/register/page.tsx (or relevant path)
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  UserIcon,
  IdentificationIcon,
  DocumentArrowUpIcon,
  CameraIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';
// Ensure axios is installed (npm install axios or yarn add axios)
import axios, { isAxiosError } from 'axios';

// Import child components
import QRCode from './components/QRCode';
import DocumentUpload from './components/DocumentUpload';
import SelfieCapture from './components/SelfieCapture';
import AadhaarVerification from './components/AadhaarVerification';

const stepsInfo = [
  { number: 1, title: 'Personal Info', icon: UserIcon },
  { number: 2, title: 'Aadhaar', icon: IdentificationIcon },
  { number: 3, title: 'License Doc', icon: DocumentArrowUpIcon },
  { number: 4, title: 'Selfie', icon: CameraIcon },
];


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


// Helper function (keep as is)
function dataURLtoFile(dataurl: string, filename: string): File | null {
    try {
        const arr = dataurl.split(',');
        if (arr.length < 2) return null;
        const mimeMatch = arr[0].match(/:(.*?);/);
        if (!mimeMatch || mimeMatch.length < 2) return null;
        const mime = mimeMatch[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    } catch (error) {
        console.error("Error converting data URL to File:", error);
        return null;
    }
}

// --- Reusable InputField Component ---
function InputField({ label, id, type = 'text', value, onChange, placeholder, required = true, ...props }: {
    label: string;
    id: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    [key: string]: any;
}) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out shadow-sm text-black"
                required={required}
                {...props}
            />
        </div>
    );
}

// --- Reusable StepWrapper Component ---
function StepWrapper({ title, icon: Icon, children }: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="flex items-center mb-6 border-b border-gray-200 pb-3">
                <Icon className="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0" />
                <h2 className="text-xl md:text-2xl font-semibold text-indigo-800">{title}</h2>
            </div>
            {children}
        </div>
    );
}


// --- Main Register Component ---
export default function Register() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        aadhaarNumber: '',
        drivingLicense: null as File | null,
        selfieImage: null as string | null,
        serverResponse: null as any | null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateFormData = (data: Partial<Omit<typeof formData, 'phone'>>) => {
        const validData = Object.entries(data).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key as keyof typeof formData] = value as any;
            }
            return acc;
        }, {} as Partial<typeof formData>);
        setFormData(prev => ({ ...prev, ...validData }));
        console.log("Form Data Updated: ", { ...formData, ...validData });
        setError(null);
    };

    const handleNext = () => {
        let isValid = true;
        let currentError = null;
        if (step === 1) {
            if (!formData.name || !formData.email || !formData.password) {
                currentError = "Please fill in Name, Email, and Password.";
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                currentError = "Please enter a valid email address.";
                isValid = false;
            }
        } else if (step === 2) {
            if (!formData.aadhaarNumber || formData.aadhaarNumber.length !== 12) {
                currentError = "Please enter a valid 12-digit Aadhaar number.";
                isValid = false;
            }
        } else if (step === 3) {
            if (!formData.drivingLicense) {
                currentError = "Please upload your Driving License.";
                isValid = false;
            }
        } else if (step === 4) {
            if (!formData.selfieImage) {
                currentError = "Please capture your selfie.";
                isValid = false;
            }
        }
        setError(currentError);
        if (!isValid) {
            toast.error(currentError || "Please complete the current step.");
            return;
        }
        if (step < stepsInfo.length) {
            setStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setError(null);
        if (step > 1) {
            setStep(prev => prev - 1);
        }
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setError(null);
      
        // Final Validation
        if (!formData.name || !formData.email || !formData.password ||
            !formData.aadhaarNumber || formData.aadhaarNumber.length !== 12 ||
            !formData.drivingLicense || !formData.selfieImage) {
            const submitError = "Please ensure all steps are completed correctly before submitting.";
            setError(submitError);
            toast.error(submitError);
            return;
        }
      
        setIsLoading(true);
        const loadingToastId = toast.loading('Submitting registration...');
      
        // Prepare FormData
        const apiFormData = new FormData();
        apiFormData.append('name', formData.name);
        apiFormData.append('email', formData.email);
        apiFormData.append('password', formData.password);
        apiFormData.append('aadhaarNumber', formData.aadhaarNumber);
        apiFormData.append('role', 'USER');
      
        if (formData.selfieImage) {
            const selfieFile = dataURLtoFile(formData.selfieImage, `selfie_${formData.aadhaarNumber}.jpg`);
            if (selfieFile) {
                apiFormData.append('selfie', selfieFile);
            } else {
                toast.dismiss(loadingToastId);
                const errorMsg = "Failed to process selfie image. Please retake it.";
                toast.error(errorMsg);
                setError(errorMsg);
                setIsLoading(false);
                return;
            }
        }
      
        if (formData.drivingLicense) {
            apiFormData.append('documents', formData.drivingLicense);
        }
      
        try {
            const response = await axios.post('http://52.66.5.17:8080/auth/register', apiFormData);
      
            toast.dismiss(loadingToastId);
      
            const token = response.data?.token;
            if (token) {
                localStorage.setItem('authToken', token);
            }
      
            const qrData = generateQrData();
            localStorage.setItem('driverRegistrationQR', qrData);
                    
            updateFormData({ serverResponse: response.data });
            toast.success("Registration successful! You're now one step closer.");
            setStep(stepsInfo.length + 1);
      
        } catch (err) {
            toast.dismiss(loadingToastId);
            console.error("Submission error:", err);
      
            let errorMsg = "An unexpected error occurred during submission.";
      
            if (isAxiosError(err)) {
                if (err.response) {
                    // Server returned an error
                    const status = err.response.status;
                    const responseData = err.response.data;
                    const serverMessage = typeof responseData === 'string'
                        ? responseData
                        : responseData?.message;
      
                    if (status === 409) {
                        if (serverMessage?.toLowerCase().includes("email")) {
                            errorMsg = "This email is already registered. Try logging in or use another email.";
                        } else if (serverMessage?.toLowerCase().includes("aadhaar")) {
                            errorMsg = "Aadhaar number already exists in our system. Please verify.";
                        } else {
                            errorMsg = serverMessage || "A registration conflict occurred.";
                        }
                    } else if (status >= 500) {
                        errorMsg = "Server error occurred. Please try again later.";
                    } else {
                        errorMsg = serverMessage || "Registration failed. Please check your inputs.";
                    }
                } else if (err.request) {
                    errorMsg = "Unable to connect to server. Please check your internet or try again later.";
                } else {
                    errorMsg = err.message || "Error setting up the request.";
                }
            } else if (err instanceof Error) {
                errorMsg = err.message;
            }
      
            toast.error(errorMsg);
            setError(errorMsg);
        } finally {
            setIsLoading(false);
        }
      };
      

    const progressPercent = ((step - 1) / stepsInfo.length) * 100;

    const generateQrData = () => {
        const data = {
            type: 'BHARATSARTHI_DRIVER_REGISTRATION',
            name: formData.name,
            email: formData.email,
            aadhaarLast4: formData.aadhaarNumber?.slice(-4) || 'N/A',
            registrationTimestamp: new Date().toISOString(),
        };
        Object.keys(data).forEach(key => {
            const typedKey = key as keyof typeof data;
            if (data[typedKey] === '' || data[typedKey] === null || data[typedKey] === undefined) {
                delete data[typedKey];
            }
        });
        return JSON.stringify(data);
    };

    // --- JSX Return (Unchanged) ---
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-10 text-center">
                     <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-2">
                        Become a Driver Partner
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Complete these steps to start your journey with us.
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-12 px-4">
                   <div className="relative">
                        <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 transform -translate-y-1/2 rounded-full"></div>
                        <div
                            className="absolute left-0 top-1/2 h-1 bg-indigo-600 transform -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                        <div className="relative flex justify-between items-start">
                            {stepsInfo.map(({ number, title, icon: Icon }) => {
                                const isActive = step === number;
                                const isCompleted = step > number;
                                return (
                                    <div key={number} className="flex flex-col items-center text-center w-24 z-10">
                                        <div
                                            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                                                ${isActive ? 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-lg' : ''}
                                                ${isCompleted ? 'bg-indigo-600 border-indigo-600 text-white' : ''}
                                                ${!isActive && !isCompleted ? 'bg-white border-gray-300 text-gray-500' : ''}
                                            `}
                                        >
                                            {isCompleted ? <CheckCircleIcon className="w-6 h-6" /> : <Icon className="w-5 h-5 md:w-6 md:h-6" />}
                                        </div>
                                        <span className={`mt-2 text-xs md:text-sm font-medium transition-colors duration-300 ${isActive ? 'text-indigo-700' : 'text-gray-500'}`}>
                                            {title}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 md:p-10">
                    {/* Error Display */}
                    {error && (
                        <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md text-sm flex items-center">
                            <ExclamationTriangleIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Render Step Content */}
                    {step === 1 && ( <StepWrapper title="Personal Information" icon={UserIcon}> <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2"> <InputField label="Full Name" id="name" value={formData.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData({ name: e.target.value })} placeholder="As per Aadhaar" required /> <InputField label="Email Address" id="email" type="email" value={formData.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData({ email: e.target.value })} placeholder="you@example.com" required /> <div className="md:col-span-2"> <InputField label="Password" id="password" type="password" value={formData.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData({ password: e.target.value })} placeholder="Choose a strong password" required /> </div> </div> </StepWrapper> )}
                    {step === 2 && ( <StepWrapper title="Aadhaar Verification" icon={IdentificationIcon}> <AadhaarVerification aadhaarNumber={formData.aadhaarNumber} updateAadhaarNumber={(number) => updateFormData({ aadhaarNumber: number })} /> </StepWrapper> )}
                    {step === 3 && ( <StepWrapper title="Upload Driving License" icon={DocumentArrowUpIcon}> <DocumentUpload initialFiles={{ drivingLicense: formData.drivingLicense }} onUpload={(files) => updateFormData(files)} /> </StepWrapper> )}
                    {step === 4 && ( <StepWrapper title="Capture Selfie" icon={CameraIcon}> <SelfieCapture initialImage={formData.selfieImage} onCapture={(image) => updateFormData({ selfieImage: image })} /> </StepWrapper> )}

                    {/* Success Step */}
                    {step === stepsInfo.length + 1 && ( <div className="text-center py-8"> <div className="flex justify-center mb-6"> <CheckCircleIcon className="w-16 h-16 text-green-500" /> </div> <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-green-600">Registration Submitted!</h2> <p className="text-gray-600 mb-8 max-w-md mx-auto"> Thank you! Your details are under review. We'll notify you upon approval (24-48 hours). </p> <div className="mb-10 bg-gray-50 p-6 rounded-lg inline-block border border-gray-200"> <h3 className="text-lg font-medium mb-4 text-indigo-700">Your Registration QR Code</h3> <div className="flex justify-center"> <QRCode data={generateQrData()} size={180} /> </div> <p className="text-gray-500 mt-4 text-sm max-w-xs mx-auto"> Save this QR code. It contains your registration summary. </p> </div> <div> <Link href="/" className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" > Back to Homepage </Link> </div> </div> )}

                    {/* Navigation Buttons */}
                    {step <= stepsInfo.length && ( <div className={`flex mt-10 ${step > 1 ? 'justify-between' : 'justify-end'}`}> {step > 1 && ( <button onClick={handleBack} type="button" disabled={isLoading} className="inline-flex items-center bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50" > <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back </button> )} {step < stepsInfo.length ? ( <button onClick={handleNext} type="button" className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-medium shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" > Next <ArrowRightIcon className="w-5 h-5 ml-2" /> </button> ) : ( <button type="button" onClick={handleSubmit} disabled={isLoading} className="inline-flex justify-center items-center bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed min-w-[160px]" > {isLoading ? ( <> <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> Submitting... </> ) : ( <> Submit Registration <PaperAirplaneIcon className="w-5 h-5 ml-2 -rotate-45" /> </> )} </button> )} </div> )}
                </div> {/* End Form Card */}
            </div> {/* End Max Width Container */}
        </div> // End Root Div
    );
}