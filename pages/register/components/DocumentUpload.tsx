'use client';

import { useState } from 'react';

interface DocumentUploadProps {
  updateDocuments: (docs: {
    drivingLicense: File | null;
    vehicleRegistration: File | null;
    aadhaarCard: File | null;
  }) => void;

  onUpload: (files: {
    drivingLicense: File | null;
    vehicleRegistration: File | null;
    aadhaarCard: File | null;
  }) => void;
  initialFiles?: {
    drivingLicense: File | null;
    vehicleRegistration: File | null;
    aadhaarCard: File | null;
  };
}

 
export default function DocumentUpload({ updateDocuments }: DocumentUploadProps) {
  const [drivingLicense, setDrivingLicense] = useState<File | null>(null);
  const [vehicleRegistration, setVehicleRegistration] = useState<File | null>(null);
  const [aadhaarCard, setAadhaarCard] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      switch (type) {
        case 'license':
          setDrivingLicense(file);
          break;
        case 'registration':
          setVehicleRegistration(file);
          break;
        case 'aadhaar':
          setAadhaarCard(file);
          break;
      }
      
      updateDocuments({
        drivingLicense: type === 'license' ? file : drivingLicense,
        vehicleRegistration: type === 'registration' ? file : vehicleRegistration,
        aadhaarCard: type === 'aadhaar' ? file : aadhaarCard,
      });
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Document Upload</h2>
      <p className="text-gray-600 mb-6">
        Please upload clear photos or scans of the following documents. All documents must be valid and up-to-date.
      </p>
      
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium mb-2">Driving License</h3>
          <div className="flex items-center">
            <label className="flex-1 cursor-pointer bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-blue-800 text-sm">Upload Driving License</span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*,.pdf" 
                onChange={(e) => handleFileChange(e, 'license')}
                required
              />
            </label>
            <div className="ml-4 flex-1">
              {drivingLicense ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-800 text-sm truncate">{drivingLicense.name}</span>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  Upload a clear photo of your driving license (front and back)
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium mb-2">Vehicle Registration</h3>
          <div className="flex items-center">
            <label className="flex-1 cursor-pointer bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-blue-800 text-sm">Upload Registration</span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*,.pdf" 
                onChange={(e) => handleFileChange(e, 'registration')}
                required
              />
            </label>
            <div className="ml-4 flex-1">
              {vehicleRegistration ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-800 text-sm truncate">{vehicleRegistration.name}</span>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  Upload a clear photo of your vehicle registration certificate
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium mb-2">Aadhaar Card</h3>
          <div className="flex items-center">
            <label className="flex-1 cursor-pointer bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-blue-800 text-sm">Upload Aadhaar</span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*,.pdf" 
                onChange={(e) => handleFileChange(e, 'aadhaar')}
                required
              />
            </label>
            <div className="ml-4 flex-1">
              {aadhaarCard ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-800 text-sm truncate">{aadhaarCard.name}</span>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  Upload a clear photo of your Aadhaar card (front and back)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}