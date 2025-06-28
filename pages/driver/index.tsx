'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import {
  CheckCircle,
  QrCode,
  Download,
  Loader2,
  Share2,
  AlertTriangle,
  ArrowLeft,
  Printer,
} from 'lucide-react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from '@/hooks/useTranslation';

type UserRegistration = {
  phoneNumber: any;
  name: string;
  email: string;
  aadhaarLast4: string;
  registrationTimestamp: string;
  type?: string;
};

export default function RegistrationComplete() {
  const { t } = useTranslation('registrationComplete');
  const [userData, setUserData] = useState<UserRegistration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [driverId, setDriverId] = useState('');
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [allDocumentUploaded, setAllDocumentUploaded] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 600));
        const storedData = localStorage.getItem('userDetail');
        if (!storedData) throw new Error(t.error_no_data);
        
        const parsedData = JSON.parse(storedData);
        if (!parsedData.name) {
          throw new Error(t.error_incomplete_data);
        }
        if (typeof window !== 'undefined') {
          const storedQR = localStorage.getItem('qrCodePath');
          setQrCode(storedQR);
        }
        setUserData(parsedData);
        
        const uploadedDocs = JSON.parse(localStorage.getItem('userUploadedDocsStatus') || '{}');
        setAllDocumentUploaded(Object.values(uploadedDocs).every(v => v === true));

      } catch (err) {
        console.error('Registration data error:', err);
        setError(err instanceof Error ? err.message : t.error_failed_load);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, [t]);

  useEffect(() => {
    if (userData) {
      const id = `BS-${userData.name.slice(0, 4).toUpperCase()}${userData.aadhaarLast4}`;
      setDriverId(id);
    }
  }, [userData]);
  
  const handleDownload = () => {
    // ... (Your handleDownload logic remains the same)
  };
  const handlePrint = () => { window.print(); };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">{t.loading_title}</h2>
          <p className="text-gray-500 mt-2">{t.loading_description}</p>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-rose-50 to-white p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="flex flex-col items-center text-center">
            <div className="bg-rose-100 p-3 rounded-full mb-4"><AlertTriangle className="h-8 w-8 text-rose-600" /></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.error_title}</h2>
            <p className="text-gray-600 mb-6">{error || t.error_description}</p>
            <Link href="/register" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center hover:bg-indigo-700">
              <ArrowLeft className="mr-2 h-5 w-5" /> {t.return_to_registration_button}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(userData.registrationTimestamp).toLocaleString();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-8 px-4 sm:px-6 print:bg-white print:py-0">
      <div className="max-w-3xl mx-auto">
        <div className="bg-green-50 rounded-t-2xl p-4 flex items-center border-b border-green-100 print:hidden">
          <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
          <p className="text-green-800 font-medium">{t.success_message}</p>
        </div>

        <div className="bg-white rounded-b-2xl shadow-lg overflow-hidden print:shadow-none">
          <div className="bg-indigo-600 text-white p-6 relative print:bg-indigo-600">
            <div className="flex justify-between items-center">
              <div><h1 className="text-2xl font-bold">{t.welcome_title}</h1><p className="text-indigo-100 mt-1">{t.welcome_subtitle}</p></div>
              {/* Logo remains static */}
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-8">
              <div className="flex justify-between bg-gray-50 p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center"><QrCode className="h-5 w-5 mr-2 text-indigo-600" />{t.card_title}</h2>
                <div>{!allDocumentUploaded && (<Link href="/driver/driverVehicleDetails"><button className='text-green-800 p-2 border-2 border-white bg-green-200 rounded-lg'>{t.complete_documentation_button}</button></Link>)}</div>
              </div>

              <div className="p-6 md:flex items-center">
                <div ref={qrRef} className="flex-shrink-0 flex justify-center mb-6 md:mb-0 md:mr-8">
                  <div className="bg-white p-3 border-2 border-indigo-100 rounded-lg shadow-sm">
                    {qrCode && <Image src={qrCode} alt="Registration QR Code" width={180} height={180} className="rounded shadow" />}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="space-y-4">
                    <div><h3 className="font-medium text-gray-800">{t.driver_id_label}</h3><p className="text-2xl font-bold text-indigo-600">{driverId}</p></div>
                    <div><h3 className="font-medium text-gray-800">{t.name_label}</h3><p className="text-lg text-black font-semibold">{userData.name}</p></div>
                    <div className="flex sm:grid-cols-2 gap-4">
                      <div><h3 className="font-medium text-gray-500">{t.phone_label}</h3><p className="text-black">{userData.phoneNumber}</p></div>
                      <div><h3 className="font-medium text-gray-500">{t.aadhaar_label}</h3><p className="text-black">XXXX-XXXX-{userData.aadhaarLast4}</p></div>
                    </div>
                    <div><h3 className="font-medium text-black">{t.registration_date_label}</h3><p className="text-black">{formattedDate}</p></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 text-black rounded-xl p-6 mb-8 print:border print:border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">{t.next_steps_title}</h2>
              <ol className="space-y-3">
                {t.next_steps_list.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full flex items-center justify-center mr-3">{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            
            <div className="flex flex-wrap gap-3 print:hidden">
              <button onClick={handleDownload} className={`flex items-center px-4 py-2 rounded-lg font-medium ${downloadSuccess ? 'bg-green-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'} transition-colors duration-200`}>
                {downloadSuccess ? <><CheckCircle className="mr-2 h-5 w-5" />{t.downloaded_button}</> : <><Download className="mr-2 h-5 w-5" />{t.download_qr_button}</>}
              </button>
              <button onClick={handlePrint} className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                <Printer className="mr-2 h-5 w-5" />{t.print_button}
              </button>
              <button onClick={() => setShowShareOptions(!showShareOptions)} className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 ml-auto">
                <Share2 className="mr-2 h-5 w-5" />{t.share_button}
              </button>
              {showShareOptions && (
                <div className="absolute mt-12 bg-white rounded-lg shadow-lg border border-gray-200 p-3 w-60">
                  <p className="text-gray-700 mb-2">{t.share_coming_soon}</p><div className="text-gray-500 text-sm">{t.share_options}</div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-6 border-t border-gray-200 text-center print:hidden">
            <p className="text-gray-600">{t.footer_prompt}{' '}<Link href="/support" className="text-indigo-600 font-medium hover:text-indigo-700">{t.footer_contact_link}</Link></p>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center print:hidden">
          <Link href="/driver/dashboard" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">{t.dashboard_link}</Link>
          <Link href="/" className="text-gray-600 hover:text-gray-800 font-medium">{t.home_link}</Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
}