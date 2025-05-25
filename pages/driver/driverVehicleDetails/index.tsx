'use client';

import { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  CloudArrowUpIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
  XCircleIcon,
  CameraIcon as CameraOutlineIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';
import axios, { isAxiosError } from 'axios';
import Image from 'next/image';
import { DocumentTypeKey, DocumentUploadConfig, DOCUMENT_TYPES } from '../../../documentConfig';

// ---- HYDRATION FIX: Set initial state to all false, and update from localStorage in useEffect ----
const UPLOADED_DOCS_STORAGE_KEY = 'userUploadedDocsStatus';

const getDefaultUploadedStatus = () =>
  DOCUMENT_TYPES.reduce((acc, doc) => ({ ...acc, [doc.key]: false }), {} as Record<DocumentTypeKey, boolean>);

const getStoredUploadedDocs = (): Record<DocumentTypeKey, boolean> => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(UPLOADED_DOCS_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return DOCUMENT_TYPES.reduce((acc, doc) => {
          acc[doc.key] = !!parsed[doc.key];
          return acc;
        }, {} as Record<DocumentTypeKey, boolean>);
      } catch {
        // ignore parse error, fallback below
      }
    }
  }
  return getDefaultUploadedStatus();
};

export default function UploadDocumentsPage() {
  const router = useRouter();
  const [selectedDocType, setSelectedDocType] = useState<DocumentUploadConfig | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // HYDRATION FIX: Always start with all false, update from localStorage in useEffect
  const [uploadedStatus, setUploadedStatus] = useState<Record<DocumentTypeKey, boolean>>(getDefaultUploadedStatus());
  const [mounted, setMounted] = useState(false); // Track client mount

  const [authToken, setAuthToken] = useState<string | null>(null);

  // For Selfie Camera
  const [useCamera, setUseCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    setMounted(true); // Mark as client-side after hydration
  }, []);

  useEffect(() => {
    // Only access localStorage on client
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error("Authentication token not found. Please log in again.");
      router.push('/login');
    }
    setAuthToken(token);

    // HYDRATION FIX: Load uploadedStatus from localStorage
    setUploadedStatus(getStoredUploadedDocs());
  }, [router]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(UPLOADED_DOCS_STORAGE_KEY, JSON.stringify(uploadedStatus));
    }
  }, [uploadedStatus, mounted]);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    if (file.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [file]);

  useEffect(() => {
    if (useCamera && selectedDocType?.hasCameraOption) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useCamera, selectedDocType]);

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        toast.error("Could not access camera. Please check permissions.");
        setUseCamera(false);
      }
    } else {
      toast.error("Camera not supported by your browser.");
      setUseCamera(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureSelfie = () => {
    if (videoRef.current && canvasRef.current && stream) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
          if (blob) {
            const selfieFile = new File([blob], "selfie.jpg", { type: "image/jpeg" });
            setFile(selfieFile);
            setUseCamera(false);
          }
        }, 'image/jpeg');
      }
    }
  };

  const handleDocTypeSelect = (docConfig: DocumentUploadConfig) => {
    setSelectedDocType(docConfig);
    setFile(null);
    setAadhaarNumber('');
    setError(null);
    setSuccessMessage(null);
    setUseCamera(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds 10MB limit.");
        setFile(null);
        e.target.value = '';
        return;
      }
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
    }
  };

  const handleAadhaarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 12) {
      setAadhaarNumber(value);
    }
  };

  const clearSelection = () => {
    setSelectedDocType(null);
    setFile(null);
    setAadhaarNumber('');
    setError(null);
    setSuccessMessage(null);
    setUseCamera(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedDocType || !file) {
      setError("Please select a document type and provide a file.");
      toast.error("Document type and file are required.");
      return;
    }
    if (selectedDocType.key === "AADHAAR" && (!aadhaarNumber || aadhaarNumber.length !== 12)) {
      setError("Valid 12-digit Aadhaar number is required for Aadhaar Card.");
      toast.error("Valid 12-digit Aadhaar number is required for Aadhaar Card.");
      return;
    }
    if (!authToken) {
      setError("Authentication error. Please log in again.");
      toast.error("Authentication error.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    const loadingToastId = toast.loading(`Uploading ${selectedDocType.label}...`);

    const formData = new FormData();
    formData.append('type', selectedDocType.key);
    formData.append('file', file, file.name);

    if (selectedDocType.key === "AADHAAR" && aadhaarNumber) {
      formData.append('aadhaarNumber', aadhaarNumber);
    }

    try {
      const response = await axios.post(
        `https://ritiktest.site/auth/upload-document`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.dismiss(loadingToastId);
      const successMsg = `${selectedDocType.label} uploaded successfully!`;
      toast.success(successMsg);
      setSuccessMessage(successMsg);

      setUploadedStatus(prev => ({ ...prev, [selectedDocType.key]: true }));

      setTimeout(() => {
        clearSelection();
      }, 1500);

    } catch (err) {
      toast.dismiss(loadingToastId);
      let errorMsg = `Failed to upload ${selectedDocType.label}.`;
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

  // HYDRATION FIX: Only check allDocumentsUploaded after mount
  const allDocumentsUploaded = mounted && DOCUMENT_TYPES.every(doc => uploadedStatus[doc.key]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div className="max-w-5xl mx-auto">

        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-orange-400 mb-3">
            Upload Your Documents
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Please upload the required documents to complete your driver profile. Select a document type below to begin.
          </p>
        </div>

        {/* HYDRATION FIX: Only render document grid after mount */}
        {mounted && !selectedDocType && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {DOCUMENT_TYPES.map((doc) => (
              <button
                key={doc.key}
                onClick={() => handleDocTypeSelect(doc)}
                disabled={uploadedStatus[doc.key]}
                className={`relative group p-6 bg-slate-800 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75
                            ${uploadedStatus[doc.key] ? 'opacity-60 cursor-not-allowed ring-2 ring-green-500/70 bg-slate-800/50' : 'hover:bg-slate-700'}`}
              >
                {uploadedStatus[doc.key] && (
                  <CheckCircleIcon className="absolute top-3 right-3 w-7 h-7 text-green-400" />
                )}
                <div className="flex flex-col items-center text-center">
                  <doc.icon className={`w-12 h-12 mb-4 ${uploadedStatus[doc.key] ? 'text-green-400/80' : 'text-indigo-400 group-hover:text-indigo-300'}`} />
                  <span className="text-md font-semibold text-slate-100">{doc.label}</span>
                  {doc.requiresAadhaarNumber && <span className="text-xs text-slate-400 mt-1">(Aadhaar No. Req.)</span>}
                </div>
              </button>
            ))}
          </div>
        )}

        {selectedDocType && (
          <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl mb-12 border border-slate-700 relative">
            <button
              onClick={clearSelection}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors z-10"
              title="Close selection"
            >
              <XCircleIcon className="w-7 h-7" />
            </button>

            <div className="flex items-center mb-6 pb-4 border-b border-slate-700">
              <selectedDocType.icon className="w-8 h-8 text-indigo-400 mr-3 flex-shrink-0" />
              <h2 className="text-2xl font-semibold text-indigo-300">
                Upload: {selectedDocType.label}
              </h2>
            </div>

            {error && (
              <div className="mb-4 bg-red-700/30 border border-red-600 text-red-300 px-4 py-3 rounded-md text-sm flex items-center">
                <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                <span>{error}</span>
              </div>
            )}
            {successMessage && !error && (
                <div className="mb-4 bg-green-700/30 border border-green-600 text-green-300 px-4 py-3 rounded-md text-sm flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    <span>{successMessage}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {selectedDocType.key === "AADHAAR" && (
                <div>
                  <label htmlFor="aadhaarNumber" className="block text-sm font-medium text-slate-300 mb-1">
                    Aadhaar Number
                  </label>
                  <input
                    id="aadhaarNumber"
                    type="text"
                    value={aadhaarNumber}
                    onChange={handleAadhaarChange}
                    placeholder="Enter 12-digit Aadhaar"
                    maxLength={12}
                    required
                    disabled={isLoading}
                    className="block w-full border border-slate-600 bg-slate-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out shadow-sm"
                  />
                </div>
              )}

              {selectedDocType.hasCameraOption && (
                <div className="my-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Choose upload method:</label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => { setUseCamera(false); setFile(null); setPreview(null);}}
                      className={`px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all ${!useCamera ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                      <CloudArrowUpIcon className="w-5 h-5 mr-2"/> Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => { setUseCamera(true); setFile(null); setPreview(null);}}
                      className={`px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all ${useCamera ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                      <VideoCameraIcon className="w-5 h-5 mr-2"/> Use Camera
                    </button>
                  </div>
                </div>
              )}

              {useCamera && selectedDocType.hasCameraOption && (
                <div className="my-4 p-4 border border-slate-600 rounded-md bg-slate-900/50">
                  <video ref={videoRef} autoPlay playsInline className="w-full max-w-md mx-auto rounded-md h-64 object-cover border border-slate-500" />
                  {stream && (
                    <button
                        type="button"
                        onClick={captureSelfie}
                        disabled={isLoading}
                        className="mt-4 w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-green-500 disabled:opacity-50"
                    >
                        <CameraOutlineIcon className="w-5 h-5 mr-2"/> Capture Selfie
                    </button>
                  )}
                  {!stream && <p className='text-center text-slate-400 mt-2'>Waiting for camera access...</p>}
                </div>
              )}

              {(!useCamera || !selectedDocType.hasCameraOption) && (
                <div>
                    <label htmlFor="fileUpload" className="block text-sm font-medium text-slate-300 mb-1">
                    Choose File <span className="text-red-400">*</span>
                    <span className="text-xs text-slate-400 ml-1"> (Max 10MB. Accepted: {selectedDocType.accept || 'any'})</span>
                    </label>
                    <div className={`mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-slate-600 hover:border-indigo-500 border-dashed rounded-md transition-colors duration-200 ${preview && file?.type.startsWith('image/') ? 'py-2' : ''}`}>
                    <div className="space-y-1 text-center w-full">
                    {preview && file?.type.startsWith('image/') ? (
                        <div className="relative mx-auto max-w-xs">
                            <Image src={preview} alt="File preview" width={200} height={150} className="mx-auto max-h-40 w-auto rounded-md object-contain" />
                            <button type="button" onClick={() => { setFile(null); setPreview(null); const el = document.getElementById('fileUpload') as HTMLInputElement; if(el) el.value = ''; }} 
                                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700 transition-colors">
                                <XCircleIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ) : file ? (
                      <div className='py-4'>
                        <svg className="mx-auto h-10 w-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        <p className="text-sm text-slate-300">{file.name} ({ (file.size / (1024*1024)).toFixed(2) } MB)</p>
                        <button type="button" onClick={() => { setFile(null); setPreview(null); const el = document.getElementById('fileUpload') as HTMLInputElement; if(el) el.value = ''; }} 
                                    className="mt-2 text-sm text-red-400 hover:text-red-300">
                                Change file
                        </button>
                      </div>
                    ) : (
                      <>
                        <CloudArrowUpIcon className="mx-auto h-12 w-12 text-slate-500" />
                        <div className="flex text-sm text-slate-400 justify-center">
                          <label
                            htmlFor="fileUpload"
                            className="relative cursor-pointer bg-slate-700 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-slate-800 focus-within:ring-indigo-500 px-3 py-1"
                          >
                            <span>Upload a file</span>
                            <input id="fileUpload" name="fileUpload" type="file" className="sr-only" onChange={handleFileChange} accept={selectedDocType.accept} required={!useCamera} />
                          </label>
                          <p className="pl-1 hidden sm:inline">or drag and drop</p>
                        </div>
                        <p className="text-xs text-slate-500">PNG, JPG, PDF, etc. up to 10MB</p>
                      </>
                    )}
                  </div>
                    </div>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isLoading || !file}
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-in-out min-w-[180px]"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      Upload {selectedDocType.label.split(' ')[0]} <PaperAirplaneIcon className="w-5 h-5 ml-2 -rotate-45" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {mounted && allDocumentsUploaded && !selectedDocType && (
            <div className="mt-12 text-center p-8 bg-slate-800 rounded-xl shadow-lg border border-green-500">
                <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-green-300 mb-2">All Documents Uploaded!</h2>
                <p className="text-slate-300 mb-6">
                    Great job! You've uploaded all the required documents. Your profile is now being reviewed or you can proceed.
                </p>
                <Link href="/"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-colors"
                >
                    Go to Dashboard
                </Link>
            </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/driver/dashboard"
            className="inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300 transition-colors group"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}
