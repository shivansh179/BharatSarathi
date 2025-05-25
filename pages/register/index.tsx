'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  UserIcon,
  IdentificationIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon,
  DocumentArrowUpIcon,
} from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';
import axios, { isAxiosError } from 'axios';
import Image from 'next/image';

import { DOCUMENT_TYPES, DocumentTypeKey } from '../../documentConfig';

const UPLOADED_DOCS_STORAGE_KEY = 'userUploadedDocsStatus';
const stepsInfo = [
  { number: 1, title: 'Your Info', icon: UserIcon },
  { number: 2, title: 'Aadhaar Details', icon: IdentificationIcon },
];
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ritiktest.site";

// --- Reusable InputField Component ---
function InputField({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = true,
  disabled = false,
  ...props
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  [key: string]: any;
  className?: string;
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
        className={props.className || `block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out shadow-sm text-black ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        required={required}
        disabled={disabled}
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

// --- Enhanced Aadhaar Verification Component ---
function EnhancedAadhaarVerification({
  aadhaarNumber,
  aadhaarFile,
  updateAadhaarNumber,
  updateAadhaarFile
}: {
  aadhaarNumber: string;
  aadhaarFile: File | null;
  updateAadhaarNumber: (number: string) => void;
  updateAadhaarFile: (file: File | null) => void;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 10 * 1024 * 1024) { // 10MB
      toast.error("File size exceeds 10MB limit.");
      updateAadhaarFile(null);
      e.target.value = '';
      return;
    }
    updateAadhaarFile(file);
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 12) {
      updateAadhaarNumber(value);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Aadhaar Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="aadhaarNumber"
          value={aadhaarNumber}
          onChange={handleAadhaarChange}
          placeholder="Enter 12-digit Aadhaar number"
          className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out shadow-sm text-black"
          maxLength={12}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {aadhaarNumber.length}/12 digits
        </p>
      </div>
      <div>
        <label htmlFor="aadhaarUpload" className="block text-sm font-medium text-gray-700 mb-1">
          Upload Aadhaar Document <span className="text-red-500">*</span>
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-400 transition-colors">
          <div className="space-y-1 text-center">
            <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600 justify-center">
              <label
                htmlFor="aadhaarUpload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 px-2 py-1"
              >
                <span>Upload Aadhaar</span>
                <input
                  id="aadhaarUpload"
                  name="aadhaarUpload"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="sr-only"
                  required
                />
              </label>
              <p className="pl-1 hidden sm:inline">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
          </div>
        </div>
        {aadhaarFile && (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-700 flex items-center">
              <CheckCircleIcon className="w-4 h-4 mr-2" />
              {aadhaarFile.name} selected
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [otpPhase, setOtpPhase] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    otp: '',
    aadhaarNumber: '',
    aadhaarFile: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [newUserFlowCompleted, setNewUserFlowCompleted] = useState(false);

  // Hydration-safe localStorage management
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const storedQR = localStorage.getItem('qrCodePath');
      if (storedQR) setQrCode(storedQR);
    }
  }, []);

  // Helper to update form data
  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setError(null);
  };

  // --- OTP and Registration Logic ---
  const handleSendOtpClick = async () => {
    setError(null);

    if (!formData.name.trim()) {
      const msg = "Full name is required to send OTP.";
      toast.error(msg);
      setError(msg);
      return;
    }

    if (!formData.phone || !/^[6-9]\d{9}$/.test(formData.phone)) {
      const msg = "Valid 10-digit phone number is required to send OTP.";
      toast.error(msg);
      setError(msg);
      return;
    }

    setOtpLoading(true);
    const apiFormData = new FormData();
    apiFormData.append('name', formData.name.trim());
    apiFormData.append('phoneNumber', formData.phone);
    apiFormData.append('role', 'DRIVER');

    try {
      const response = await axios.post(`${apiBaseUrl}/auth/register`, apiFormData);
      if (response.status === 200 || response.status === 201) {
        toast.success("OTP sent to your WhatsApp!");
        setOtpPhase(true);
      } else {
        toast.error(response.data?.message || "Failed to send OTP. Unexpected response.");
        setError(response.data?.message || "Failed to send OTP. Unexpected response.");
      }
    } catch (err) {
      let errorMsg = "Failed to send OTP.";
      if (isAxiosError(err) && err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (isAxiosError(err) && err.message) {
        errorMsg = err.message;
      }
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOTP = async (): Promise<boolean> => {
    const otpLength = 4;
    if (!formData.otp || formData.otp.length !== otpLength) {
      toast.error(`Please enter a valid ${otpLength}-digit OTP`);
      return false;
    }
    setVerifyOtpLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/verify-otp`, {
        phoneNumber: formData.phone,
        otp: formData.otp
      });

      localStorage.setItem("userDetails", JSON.stringify(response.data.user));
      localStorage.setItem("authToken", response.data.user.token);
      if (response.data.user.qrCodePath) localStorage.setItem("qrCodePath", response.data.user.qrCodePath);

      toast.success("Phone number verified successfully!");
      return true;
    } catch (error) {
      const errorMsg = isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Invalid OTP or verification failed. Please try again.";
      toast.error(errorMsg);
      setError(errorMsg);
      return false;
    } finally {
      setVerifyOtpLoading(false);
    }
  };

  const handleNext = async () => {
    setError(null);
    if (step === 1) {
      if (!formData.name.trim()) {
        const msg = "Please enter your full name.";
        toast.error(msg); setError(msg); return;
      }
      if (!formData.phone || !/^[6-9]\d{9}$/.test(formData.phone)) {
        const msg = "Please enter a valid 10-digit Indian mobile number.";
        toast.error(msg); setError(msg); return;
      }
      if (!otpPhase) {
        const msg = "Please click 'Send OTP' first.";
        toast.error(msg); setError(msg); return;
      }
      const otpLength = 4;
      if (!formData.otp || formData.otp.length !== otpLength) {
        const msg = `Please enter the ${otpLength}-digit OTP received on WhatsApp.`;
        toast.error(msg); setError(msg); return;
      }
      const otpVerified = await verifyOTP();
      if (otpVerified) {
        setStep(prev => prev + 1);
      }
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setError(null);
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  // --- Aadhaar Submission ---
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);

    if (!formData.aadhaarNumber || formData.aadhaarNumber.length !== 12) {
      setError("Valid 12-digit Aadhaar number is required.");
      toast.error("Valid 12-digit Aadhaar number is required.");
      return;
    }
    if (!formData.aadhaarFile) {
      setError("Aadhaar document (PDF/Image) is required.");
      toast.error("Aadhaar document (PDF/Image) is required.");
      return;
    }

    setIsLoading(true);
    const loadingToastId = toast.loading('Uploading Aadhaar document...');

    const aadhaarForm = new FormData();
    aadhaarForm.append('aadhaarNumber', formData.aadhaarNumber);
    aadhaarForm.append('type', 'AADHAAR');
    aadhaarForm.append('file', formData.aadhaarFile, formData.aadhaarFile.name);

    const token = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;
    if (!token) {
      toast.dismiss(loadingToastId);
      toast.error("Missing authentication token. Please try verifying OTP again.");
      setError("Authentication token missing.");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(
        `${apiBaseUrl}/auth/upload-document`,
        aadhaarForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.dismiss(loadingToastId);
      toast.success("Aadhaar uploaded successfully!");

      // Update localStorage for Aadhaar upload status (hydration-safe)
      if (typeof window !== 'undefined') {
        const currentUploadedDocs = JSON.parse(localStorage.getItem(UPLOADED_DOCS_STORAGE_KEY) || '{}');
        currentUploadedDocs['AADHAAR'] = true;
        localStorage.setItem(UPLOADED_DOCS_STORAGE_KEY, JSON.stringify(currentUploadedDocs));
      }

      // Check if all docs are uploaded
      let allDocsCurrentlyUploaded = false;
      if (typeof window !== 'undefined') {
        const storedDocsStatus = JSON.parse(localStorage.getItem(UPLOADED_DOCS_STORAGE_KEY) || '{}');
        allDocsCurrentlyUploaded = DOCUMENT_TYPES.every(doc => !!storedDocsStatus[doc.key]);
      }

      setNewUserFlowCompleted(allDocsCurrentlyUploaded);
      setStep(stepsInfo.length + 1);

      if (!allDocsCurrentlyUploaded) {
        toast.success("Aadhaar submitted. Please upload remaining documents.", { duration: 4000 });
      }
    } catch (err) {
      toast.dismiss(loadingToastId);
      let errorMsg = "Failed to upload Aadhaar.";
      if (isAxiosError(err) && err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (isAxiosError(err) && err.response?.data?.error) {
        errorMsg = err.response.data.error;
      } else if (isAxiosError(err) && err.message) {
        errorMsg = err.message;
      }
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Progress bar
  const progressPercent = step <= stepsInfo.length ? ((step - 1) / (stepsInfo.length - 1)) * 100 : 100;

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-2">
            Become a Driver Partner
          </h1>
          <p className="text-gray-600 text-lg">
            Complete these simple steps to join us.
          </p>
        </div>

        {step <= stepsInfo.length && (
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
                  let itemClass = "flex flex-col items-center text-center z-10 w-24";
                  if (stepsInfo.length === 2) {
                    if (number === 1) itemClass = "flex flex-col items-start text-left z-10";
                    else if (number === stepsInfo.length) itemClass = "flex flex-col items-end text-right z-10";
                  }

                  return (
                    <div key={number} className={itemClass}>
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
        )}

        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 md:p-10">
          {error && (
            <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md text-sm flex items-center">
              <ExclamationTriangleIcon className="w-5 h-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {step === 1 && (
            <StepWrapper title="Your Information" icon={UserIcon}>
              <div className="space-y-6">
                <InputField
                  label="Full Name"
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  placeholder="As per official documents"
                  required
                  disabled={otpPhase}
                />
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      +91
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 10) {
                          updateFormData({ phone: value });
                        }
                      }}
                      placeholder="Enter 10-digit mobile number"
                      className="flex-1 block w-full border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm text-black"
                      maxLength={10}
                      required
                      disabled={otpPhase}
                    />
                  </div>
                </div>

                {!otpPhase && (
                  <button
                    type="button"
                    onClick={handleSendOtpClick}
                    disabled={otpLoading}
                    className="w-full mt-4 flex justify-center items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm disabled:opacity-60"
                  >
                    {otpLoading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                )}

                {otpPhase && (
                  <InputField
                    label="Enter OTP"
                    id="otp"
                    type="tel"
                    value={formData.otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 4) updateFormData({ otp: value });
                    }}
                    placeholder="Enter 4-digit OTP"
                    maxLength={4}
                    required
                    disabled={verifyOtpLoading}
                  />
                )}
              </div>
            </StepWrapper>
          )}

          {step === 2 && (
            <StepWrapper title="Aadhaar Verification" icon={IdentificationIcon}>
              <EnhancedAadhaarVerification
                aadhaarNumber={formData.aadhaarNumber}
                aadhaarFile={formData.aadhaarFile}
                updateAadhaarNumber={(number) => updateFormData({ aadhaarNumber: number })}
                updateAadhaarFile={(file) => updateFormData({ aadhaarFile: file })}
              />
            </StepWrapper>
          )}

          {step === stepsInfo.length + 1 && (
            <div className="text-center py-8">
              <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-green-600">
                {newUserFlowCompleted ? "Registration Submitted!" : "Aadhaar Submitted!"}
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {newUserFlowCompleted
                  ? "Thank you! Your application is under review. We'll notify you within 24-48 hours."
                  : "Your Aadhaar has been submitted. Please proceed to upload other required documents."
                }
              </p>

              {!newUserFlowCompleted ? (
                <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-md">
                  <p className="text-indigo-700 font-medium">
                    Next, please upload your remaining documents.
                  </p>
                  <button
                    onClick={() => router.push('/driver/driverVehicleDetails')}
                    className="mt-3 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-medium shadow-sm transition duration-150 ease-in-out"
                  >
                    Proceed to Upload Documents
                  </button>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-700">All documents are submitted. Your profile is under review.</p>
                </div>
              )}

              {qrCode && (
                <div className="mb-10 bg-gray-50 p-6 rounded-lg inline-block border border-gray-200">
                  <h3 className="text-lg font-medium mb-4 text-indigo-700">Your Registration QR Code</h3>
                  <Image
                    src={qrCode}
                    alt="Registration QR Code"
                    width={180}
                    height={180}
                    className="rounded shadow mx-auto"
                    unoptimized={qrCode.startsWith('http') || qrCode.startsWith('data:')}
                  />
                  <p className="text-gray-500 mt-4 text-sm max-w-xs mx-auto">
                    Save this QR code. It can be used to check your application status.
                  </p>
                </div>
              )}
              <div>
                <Link href="/" className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Back to Homepage
                </Link>
              </div>
            </div>
          )}

          {step <= stepsInfo.length && (
            <div className={`flex mt-10 ${step > 1 ? 'justify-between' : 'justify-end'}`}>
              {step > 1 && (
                <button onClick={handleBack} type="button" disabled={isLoading || verifyOtpLoading} className="inline-flex items-center bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                  <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back
                </button>
              )}
              {step < stepsInfo.length ? (
                <button
                  onClick={handleNext}
                  type="button"
                  disabled={
                    verifyOtpLoading ||
                    otpLoading ||
                    (step === 1 && !otpPhase) ||
                    (step === 1 && otpPhase && (!formData.otp || formData.otp.length !== 4))
                  }
                  className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-medium shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  disabled:opacity-60"
                >
                  Next <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="inline-flex justify-center items-center bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed min-w-[160px]"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Aadhaar <PaperAirplaneIcon className="w-5 h-5 ml-2 -rotate-45" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
