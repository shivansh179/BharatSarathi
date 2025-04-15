// src/app/register/page.tsx (or relevant path)
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  UserIcon,
  IdentificationIcon,
  TruckIcon,
  DocumentArrowUpIcon,
  CameraIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon, // For error display
} from '@heroicons/react/24/outline';

// Assume these components exist and handle their respective logic/UI
import QRCode from './components/QRCode';
import DocumentUpload from './components/DocumentUpload';
import SelfieCapture from './components/SelfieCapture';
import AadhaarVerification from './components/AadhaarVerification';
import VehicleInfo from './components/VehicleInfo';

// Define step details including icons
const stepsInfo = [
  { number: 1, title: 'Personal Info', icon: UserIcon },
  { number: 2, title: 'Aadhaar', icon: IdentificationIcon },
  { number: 3, title: 'Vehicle', icon: TruckIcon },
  { number: 4, title: 'Documents', icon: DocumentArrowUpIcon },
  { number: 5, title: 'Selfie', icon: CameraIcon },
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    aadhaarNumber: '',
    vehicleNumber: '',
    vehicleModel: '',
    vehicleYear: '',
    drivingLicense: null as File | null, // Assuming File type for uploads
    vehicleRegistration: null as File | null,
    aadhaarCard: null as File | null,
    selfieImage: null as string | null, // Assuming base64 string or URL for selfie
  });
  const [isLoading, setIsLoading] = useState(false); // State for final submission loading
  const [error, setError] = useState<string | null>(null); // State for final submission error

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    console.log("Form Data Updated: ", { ...formData, ...data });
    setError(null); // Clear error when data changes
  };

  const handleNext = () => {
    // --- TODO: Add validation logic for the current step ---
    // Example for step 1:
    // if (step === 1 && (!formData.name || !formData.phone /* ... other fields */)) {
    //   setError("Please fill in all required personal information.");
    //   return;
    // }
    setError(null); // Clear error before proceeding
    if (step < stepsInfo.length) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setError(null); // Clear error when going back
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setIsLoading(true);
    console.log('Submitting final registration data:', formData);

    // --- TODO: Add your API call logic here ---
    // Use FormData for file uploads if necessary
    // const apiFormData = new FormData();
    // Object.entries(formData).forEach(([key, value]) => {
    //   if (value instanceof File) {
    //     apiFormData.append(key, value);
    //   } else if (value !== null && value !== undefined) {
    //     apiFormData.append(key, String(value));
    //   }
    // });

    try {
    //   const response = await fetch('/api/register-driver', {
    //     method: 'POST',
    //     body: apiFormData, // Use FormData if files are involved
    //     // Or: headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
    //   });
    //   if (!response.ok) {
    //      const errorData = await response.json().catch(() => ({ message: 'Submission failed with status: ' + response.status }));
    //      throw new Error(errorData.message || 'Registration submission failed.');
    //   }
    //   const result = await response.json();
    //   // Potentially update formData with result.driverId if needed for QR
    //   updateFormData({ /* ... */ });

       // --- Mock Success ---
       await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
       console.log("Mock registration successful");
       // --- End Mock ---

       setStep(stepsInfo.length + 1); // Move to success step

    } catch (err: any) {
       console.error("Submission error:", err);
       setError(err.message || "An unexpected error occurred during submission.");
    } finally {
       setIsLoading(false);
    }
    // --- End of API call logic ---
  };

  // Calculate progress percentage
  const progressPercent = ((step - 1) / stepsInfo.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
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
           {/* ... Progress indicator code remains the same ... */}
           <div className="relative">
            {/* Connecting Line Background */}
            <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 transform -translate-y-1/2 rounded-full"></div>
            {/* Connecting Line Progress */}
            <div
              className="absolute left-0 top-1/2 h-1 bg-indigo-600 transform -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
            {/* Step Markers */}
            <div className="relative flex justify-between items-start">
              {stepsInfo.map(({ number, title, icon: Icon }) => {
                const isActive = step === number;
                const isCompleted = step > number;
                return (
                  <div key={number} className="flex flex-col items-center text-center w-20 z-10">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                        ${isActive ? 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-lg' : ''}
                        ${isCompleted ? 'bg-indigo-600 border-indigo-600 text-white' : ''}
                        ${!isActive && !isCompleted ? 'bg-white border-gray-300 text-gray-500' : ''} {/* Updated idle state */}
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
          {/* Error Display Area */}
          {error && step === stepsInfo.length && ( // Show error only on the last step before success
            <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md text-sm flex items-center">
               <ExclamationTriangleIcon className="w-5 h-5 mr-2 flex-shrink-0" />
               <span>{error}</span>
            </div>
           )}

          {/* Render Step Content - No changes needed here if components are correct */}
          {step === 1 && (
            <StepWrapper title="Personal Information" icon={UserIcon}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2"> {/* Adjusted gap */}
                <InputField label="Full Name" id="name" value={formData.name} onChange={(e) => updateFormData({ name: e.target.value })} placeholder="As per Aadhaar" required />
                <InputField label="Phone Number" id="phone" type="tel" value={formData.phone} onChange={(e) => updateFormData({ phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} placeholder="10-digit mobile number" maxLength={10} required />
                <InputField label="Email Address" id="email" type="email" value={formData.email} onChange={(e) => updateFormData({ email: e.target.value })} placeholder="you@example.com" required />
                <InputField label="Current Address" id="address" value={formData.address} onChange={(e) => updateFormData({ address: e.target.value })} placeholder="Full address" required />
              </div>
            </StepWrapper>
          )}
          {/* ... other steps remain the same ... */}
           {step === 2 && (
             <StepWrapper title="Aadhaar Verification" icon={IdentificationIcon}>
               <AadhaarVerification
                 aadhaarNumber={formData.aadhaarNumber}
                 updateAadhaarNumber={(number) => updateFormData({ aadhaarNumber: number })}
               />
             </StepWrapper>
           )}
           {step === 3 && (
             <StepWrapper title="Vehicle Information" icon={TruckIcon}>
               <VehicleInfo
                 vehicleData={{ vehicleNumber: formData.vehicleNumber, vehicleModel: formData.vehicleModel, vehicleYear: formData.vehicleYear }}
                 updateVehicleData={(data) => updateFormData(data)}
               />
             </StepWrapper>
           )}
          {step === 4 && (
  <StepWrapper title="Upload Documents" icon={DocumentArrowUpIcon}>
    <DocumentUpload
                initialFiles={{
                  drivingLicense: formData.drivingLicense,
                  vehicleRegistration: formData.vehicleRegistration,
                  aadhaarCard: formData.aadhaarCard
                }}
                onUpload={(files) => updateFormData(files)} updateDocuments={function (docs: { drivingLicense: File | null; vehicleRegistration: File | null; aadhaarCard: File | null; }): void {
                  throw new Error('Function not implemented.');
                } }    />
  </StepWrapper>
)}

{step === 5 && (
  <StepWrapper title="Capture Selfie" icon={CameraIcon}>
    <SelfieCapture
                initialImage={formData.selfieImage}
                onCapture={(image) => updateFormData({ selfieImage: image })} updateSelfie={function (selfie: string | null): void {
                  throw new Error('Function not implemented.');
                } }    />
  </StepWrapper>
)}

          {/* Success Step - No changes needed */}
          {step === stepsInfo.length + 1 && (
            <div className="text-center py-8">
               {/* ... success content remains the same ... */}
               <div className="flex justify-center mb-6">
                 <CheckCircleIcon className="w-16 h-16 text-green-500" />
               </div>
               <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-green-600">Registration Submitted Successfully!</h2>
               <p className="text-gray-600 mb-8 max-w-md mx-auto">
                 Thank you! We've received your details. Your profile is under review, and we'll notify you upon approval (usually within 24-48 hours).
               </p>
               <div className="mb-10 bg-gray-50 p-6 rounded-lg inline-block border border-gray-200">
                 <h3 className="text-lg font-medium mb-4 text-indigo-700">Your Driver QR Code</h3>
                 <div className="flex justify-center">
                   <QRCode data={`BHARATSARTHI_DRIVER_ID:${formData.aadhaarNumber || 'PENDING_ID'}`} size={160} />
                 </div>
                 <p className="text-gray-500 mt-4 text-sm">
                   Save or screenshot this QR code. You might need it for app login or identification.
                 </p>
               </div>
               <div>
                 <Link
                   href="/"
                   className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 >
                   Go Back to Homepage
                 </Link>
               </div>
             </div>
          )}

          {/* Navigation Buttons */}
          {step <= stepsInfo.length && (
            <div className={`flex mt-10 ${step > 1 ? 'justify-between' : 'justify-end'}`}>
              {step > 1 && (
                <button
                  onClick={handleBack}
                  type="button"
                  disabled={isLoading} // Disable while submitting
                  className="inline-flex items-center bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  Back
                </button>
              )}

              {step < stepsInfo.length ? (
                <button
                  onClick={handleNext}
                  type="button"
                  className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-medium shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Next
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
              ) : (
                // Final Submit Button
                <button
                  type="button" // Changed to button, handled by onClick
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60"
                >
                  {isLoading ? 'Submitting...' : 'Submit Registration'}
                  {!isLoading && <PaperAirplaneIcon className="w-5 h-5 ml-2 -rotate-45" />}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Reusable Components ---

// Input Field Component - Make sure this matches the one used in login pages
function InputField({ label, id, type = 'text', value, onChange, placeholder, required = true, ...props }: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  [key: string]: any; // Allow other input props like maxLength
}) {
  return (
    <div className="mb-4"> {/* Reduced bottom margin slightly */}
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
        className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out shadow-sm"
        required={required}
        {...props}
      />
    </div>
  );
}

// Wrapper for Step Content - No changes needed
function StepWrapper({ title, icon: Icon, children }: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center mb-6 border-b border-gray-200 pb-3">
        <Icon className="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0" /> {/* Added flex-shrink-0 */}
        <h2 className="text-xl md:text-2xl font-semibold text-indigo-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}