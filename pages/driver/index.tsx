'use client';

import { useEffect, useState, useRef } from 'react';
import QRCode from '@/pages/register/components/QRCode';
import Image from 'next/image';
import {
  CheckCircle,
  User,
  Mail,
  CreditCard,
  Calendar,
  QrCode,
  Download,
  Loader2,
  Share2,
  AlertTriangle,
  ArrowLeft,
  Printer,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

type UserRegistration = {
  name: string;
  email: string;
  aadhaarLast4: string;
  registrationTimestamp: string;
  type?: string;
};

export default function RegistrationComplete() {
  const [userData, setUserData] = useState<UserRegistration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [driverId, setDriverId] = useState('');
  const qrRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 600));
        const storedData = localStorage.getItem('userDetail');
        if (!storedData) throw new Error('No registration data found');
        const parsedData = JSON.parse(storedData);
        if (!parsedData.name || !parsedData.email) {
          throw new Error('Incomplete registration data');
        }

        if (typeof window !== 'undefined') {
          const storedQR = localStorage.getItem('qrCodePath');
          setQrCode(storedQR);
      }

        setUserData(parsedData);
      } catch (err) {
        console.error('Registration data error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load your registration data');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      const id = `BS-${userData.email.slice(0, 4).toUpperCase()}${userData.aadhaarLast4}`;
      setDriverId(id);
    }
  }, [userData]);

  const handleFeatureInDevelopment = () => {
    toast.success('Function yet to be implemented.');
  };

  const formatQrData = (data: UserRegistration): string => {
    const formattedDate = new Date(data.registrationTimestamp).toLocaleString();
    return `BHARAT SARTHI DRIVER
ID: ${driverId}
NAME: ${data.name}
EMAIL: ${data.email}
AADHAAR: XXXX-XXXX-${data.aadhaarLast4}
REGISTERED: ${formattedDate}`;
  };

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    try {
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `BharatSarthi_QR_${userData?.name?.replace(/\s+/g, '_') || 'Driver'}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (err) {
      console.error('QR download error:', err);
      alert('Unable to download QR code. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">Preparing Your Registration</h2>
          <p className="text-gray-500 mt-2">Loading your driver details...</p>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-rose-50 to-white p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="flex flex-col items-center text-center">
            <div className="bg-rose-100 p-3 rounded-full mb-4">
              <AlertTriangle className="h-8 w-8 text-rose-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'Unable to retrieve your registration information.'}</p>
            <Link
              href="/register"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center hover:bg-indigo-700 transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Return to Registration
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(userData.registrationTimestamp).toLocaleString();

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-8 px-4 sm:px-6 print:bg-white print:py-0">
      <div className="max-w-3xl mx-auto">
        <div className="bg-green-50 rounded-t-2xl p-4 flex items-center border-b border-green-100 print:hidden">
          <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
          <p className="text-green-800 font-medium">Registration Successfully Completed!</p>
        </div>

        <div className="bg-white rounded-b-2xl shadow-lg overflow-hidden print:shadow-none">
          <div className="bg-indigo-600 text-white p-6 relative print:bg-indigo-600">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Welcome to Bharat Sarthi</h1>
                <p className="text-indigo-100 mt-1">Your driver registration is complete</p>
              </div>
              <div className="hidden sm:block">
                <div className="flex flex-col items-center border p-2 rounded-2xl bg-white">
                  <span className="text-black font-bold text-1xl">B S</span>
                  <div className="gap-2 flex font-extrabold text-2xl">
                    <span className="text-blue-500">Bharat</span>
                    <span className="text-blue-500">Sarathi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Driver Card */}
          <div className="p-6 sm:p-8">
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-8">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <QrCode className="h-5 w-5 mr-2 text-indigo-600" />
                  Driver Verification Card
                </h2>
              </div>

              <div className="p-6 md:flex items-center">
                <div ref={qrRef} className="flex-shrink-0 flex justify-center mb-6 md:mb-0 md:mr-8">
                  <div className="bg-white p-3 border-2 border-indigo-100 rounded-lg shadow-sm">
                  {qrCode && (
  <Image
    src={qrCode}
    alt="Registration QR Code"
    width={180}
    height={180}
    className="rounded shadow"
  />
)}

                  </div>
                </div>

                <div className="flex-grow">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-800">Driver ID</h3>
                      <p className="text-2xl font-bold text-indigo-600">{driverId}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Name</h3>
                      <p className="text-lg text-black font-semibold">{userData.name}</p>
                    </div>
                    <div className="flex sm:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium text-gray-500">Email</h3>
                        <p className="text-black">{userData.email}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-500">Aadhaar</h3>
                        <p className="text-black">XXXX-XXXX-{userData.aadhaarLast4}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-black">Registration Date</h3>
                      <p className="text-black">{formattedDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gray-50 text-black rounded-xl p-6 mb-8 print:border print:border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Next Steps</h2>
              <ol className="space-y-3">
                <li className="flex">
                  <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full flex items-center justify-center mr-3">1</span>
                  Download and save your QR code for future use
                </li>
                <li className="flex">
                  <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full flex items-center justify-center mr-3">2</span>
                  Complete your profile by uploading additional documents
                </li>
                <li className="flex">
                  <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full flex items-center justify-center mr-3">3</span>
                  Download the Bharat Sarthi Driver App to start accepting rides
                </li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 print:hidden">
              <button
                onClick={handleDownload}
                className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                  downloadSuccess ? 'bg-green-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                } transition-colors duration-200`}
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Downloaded!
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Download QR Code
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <Printer className="mr-2 h-5 w-5" />
                Print Details
              </button>

              <button
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 ml-auto"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </button>

              {showShareOptions && (
                <div className="absolute mt-12 bg-white rounded-lg shadow-lg border border-gray-200 p-3 w-60">
                  <p className="text-gray-700 mb-2">Coming soon: Share via</p>
                  <div className="text-gray-500 text-sm">Email, WhatsApp, Facebook</div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-6 border-t border-gray-200 text-center print:hidden">
            <p className="text-gray-600">
              Have questions?{' '}
              <Link href="#" onClick={handleFeatureInDevelopment} className="text-indigo-600 font-medium hover:text-indigo-700">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center print:hidden">
          <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
            Go to Dashboard
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-800 font-medium">
            Back to Home
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
