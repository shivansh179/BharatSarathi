'use client';

import { useEffect, useState, useRef } from 'react'; // Import useRef
import QRCode from '@/pages/register/components/QRCode'; // Assuming this path is correct
import { FiUser, FiMail, FiCreditCard, FiClock, FiTag, FiLoader, FiAlertTriangle, FiDownload } from 'react-icons/fi'; // Import FiDownload

type QRData = {
  type: string; // Keep original type if needed elsewhere, but we'll override in scan format
  name: string;
  email: string;
  aadhaarLast4: string;
  registrationTimestamp: string;
};

// Function to format data for better readability when scanned
function formatQrDataForScanning(data: QRData): string {
  const formattedTimestamp = new Date(data.registrationTimestamp).toLocaleString();
  // Construct a multi-line string. Most scanners interpret \n as a newline.
  return `BHARATSARTH DRIVER REGISTRATION
---------------------------------
Name: ${data.name || 'N/A'}
Email: ${data.email || 'N/A'}
Aadhaar (Last 4): ${data.aadhaarLast4 || 'N/A'}
Registered On: ${formattedTimestamp}`;
  // You could also explore structured formats like vCard if applicable,
  // but plain text with newlines is broadly compatible.
}

export default function RegistrationSummaryPage() {
  const [qrData, setQrData] = useState<QRData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const qrCodeContainerRef = useRef<HTMLDivElement>(null); // Ref for the container holding the QR code

  useEffect(() => {
    // ... (loading logic remains the same)
    setIsLoading(true);
    setError(null);
    try {
      const storedData = localStorage.getItem('userDetail');
      
      if (storedData) {
        const parsed: QRData = JSON.parse(storedData);
        console.log("user Data is ", parsed);
        if (parsed && parsed.name && parsed.email ) {
           setQrData(parsed);
        } else {
           throw new Error("Stored data is incomplete or invalid.");
        }
      } else {
        setError('No registration data found in storage.');
      }
    } catch (err) {
      console.error('Error processing registration data:', err);
      setError('Could not load registration data. It might be corrupted.');
      setQrData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDownload = () => {
    // Find the canvas element rendered by the QRCode component
    const canvas = qrCodeContainerRef.current?.querySelector<HTMLCanvasElement>('canvas');

    if (canvas) {
      try {
        const pngUrl = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream'); // Suggest download instead of displaying
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        // Use name and timestamp for a somewhat unique filename
        const filename = `BharatSarth_Reg_QR_${qrData?.name?.replace(/\s+/g, '_') || 'User'}_${Date.now()}.png`;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } catch (error) {
         console.error("Failed to download QR code:", error);
         alert("Could not download QR code. Ensure the canvas is not tainted (if drawing external images).");
      }
    } else {
      console.error('Could not find QR code canvas element for download.');
      alert('Error preparing QR code for download.');
    }
  };

  // --- Loading and Error States remain the same ---
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
        <FiLoader className="animate-spin text-4xl mb-4" />
        <p>Loading Registration Data...</p>
      </div>
    );
  }

  if (error || !qrData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-red-600 dark:text-red-400">
        <FiAlertTriangle className="text-4xl mb-4" />
        <p>{error || 'An unexpected error occurred.'}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Please try registering again or contact support.</p>
      </div>
    );
  }

  // --- Success State - Display Data (with modifications) ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
        <div className="p-8 md:p-12">
           <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Registration Successful!
           </h1>
           <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
            Here is a summary of your registration details and your unique QR code.
           </p>

           <div className="md:grid md:grid-cols-2 md:gap-12 items-start">
              {/* Left Info Section */}
              <div className="space-y-5 mb-10 md:mb-0">
                <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 border-b pb-2 border-gray-200 dark:border-gray-700">
                  Registration Details
                </h2>

                {/* Data Items using Icons */}
                 {/* Display the user-friendly type here, but the specific type "driverRegistrationQR" might still be useful in the raw qrData if needed elsewhere */}
                <InfoItem icon={FiTag} label="Identification Type" value="BHARATSARTH DRIVER REGISTRATION"/>
                <InfoItem icon={FiUser} label="Name" value={qrData.name} />
                <InfoItem icon={FiMail} label="Email" value={qrData.email} />
                <InfoItem icon={FiCreditCard} label="Aadhaar (Last 4)" value={qrData.aadhaarLast4} />
                <InfoItem icon={FiClock} label="Registered On" value={new Date(qrData.registrationTimestamp).toLocaleString()} />
              </div>

              {/* Right QR Code Section */}
              <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
                 <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                    Your Unique Registration Code
                 </h3>
                 {/* Container div for the QR Code with ref */}
                 <div ref={qrCodeContainerRef} className="p-4 bg-white rounded-md inline-block shadow mb-4">
                     {/* Pass the FORMATTED string to the QRCode component */}
                    <QRCode data={formatQrDataForScanning(qrData)} size={220}/>
                     {/* level="M" (Medium) is a good balance for density/error correction */}
                 </div>
                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
                    Scan this code for verification or quick access to your details.
                 </p>

                 {/* Download Button */}
                 <button
                   onClick={handleDownload}
                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800 transition-colors duration-150"
                 >
                   <FiDownload className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                   Download QR Code
                 </button>
              </div>
           </div>
        </div>
      </div>
       <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-8">
           Keep this information safe. You might need the QR code for future verification.
       </p>
    </div>
  );
}

// --- InfoItem Helper component remains the same ---
type InfoItemProps = {
  icon: React.ElementType;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start space-x-3">
      <Icon className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mt-1 flex-shrink-0" aria-hidden="true" />
      <div>
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
        <dd className="mt-0.5 text-base text-gray-900 dark:text-white break-words">{value || 'N/A'}</dd>
      </div>
    </div>
  );
}