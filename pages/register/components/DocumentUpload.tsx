// src/app/register/components/DocumentUpload.tsx
'use client';

import { useState, useEffect } from 'react';

// Updated Props: Only handles driving license
interface DocumentUploadProps {
  onUpload: (docs: { drivingLicense: File | null }) => void; // Callback signature changed
  initialFiles?: {
    drivingLicense: File | null;
  };
}

export default function DocumentUpload({ onUpload, initialFiles }: DocumentUploadProps) {
  // State only for driving license
  const [drivingLicense, setDrivingLicense] = useState<File | null>(initialFiles?.drivingLicense || null);

  // Effect calls parent update when drivingLicense state changes
  useEffect(() => {
    onUpload({ drivingLicense }); // Pass only license state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drivingLicense]); // Depend only on license state

  // Simplified file change handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      e.target.value = ''; // Reset input
      setDrivingLicense(file); // Update local state
      // useEffect will call onUpload
    } else {
        // Handle case where user cancels file selection (optional)
        // setDrivingLicense(null); // Uncomment if you want to clear state on cancel
    }
  };

   // Function to display file info or upload prompt (Simplified)
   const renderFileInput = (
    label: string,
    file: File | null
  ) => (
     <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium mb-2">{label}</h3>
        <div className="flex items-center gap-4">
          <label className="flex-shrink-0 cursor-pointer bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 flex flex-col items-center text-center w-40 h-32 justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <span className="text-blue-800 text-sm leading-tight">
               {file ? 'Change File' : `Upload ${label}`}
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/*,.pdf"
              onChange={handleFileChange} // Use simplified handler
            />
          </label>
          <div className="flex-1 min-w-0">
            {file ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-800 text-sm font-medium truncate" title={file.name}>{file.name}</span>
                </div>
                 <p className="text-xs text-gray-500 mt-1 ml-7">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : (
              <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg border border-dashed">
                 Upload clear photos/scan (front & back recommended).
                 <br/> <span className="text-xs">(Image or PDF)</span>
              </div>
            )}
          </div>
        </div>
      </div>
  );

  return (
    <div>
      <p className="text-gray-600 mb-6 text-sm">
        Please upload a clear photo or scan of your valid Driving License.
      </p>
      <div className="space-y-6">
        {/* Only render the input for Driving License */}
        {renderFileInput('Driving License', drivingLicense)}

        {/* Removed rendering for Vehicle Registration and Aadhaar Card */}
      </div>
    </div>
  );
}