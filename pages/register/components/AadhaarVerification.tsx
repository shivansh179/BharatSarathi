'use client';

interface AadhaarVerificationProps {
  aadhaarNumber: string;
  updateAadhaarNumber: (number: string) => void;
}

export default function AadhaarVerification({ aadhaarNumber, updateAadhaarNumber }: AadhaarVerificationProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '');
    
    // Limit to 12 digits
    if (value.length <= 12) {
      updateAadhaarNumber(value);
    }
  };

  // Format Aadhaar with spaces
  const formatAadhaar = (value: string | undefined) => {
    if (!value) return '';
    const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})$/;
    const matches = value.match(regex);
    if (!matches) return value;
  
    return matches.slice(1).filter(Boolean).join(' ');
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Aadhaar Verification</h2>
      <p className="text-gray-600 mb-6">
        Please enter your 12-digit Aadhaar number. This will be used to verify your identity.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-blue-800 font-medium">Why do we need your Aadhaar?</p>
            <p className="text-blue-700 text-sm mt-1">
              Your Aadhaar is used to verify your identity and ensure the security of our platform. 
              It helps us create your unique driver ID and prevents fraudulent registrations.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="aadhaar" className="block text-gray-700 mb-2">Aadhaar Number</label>
        <input
          type="text"
          id="aadhaar"
          value={formatAadhaar(aadhaarNumber)}
          onChange={handleChange}
          placeholder="XXXX XXXX XXXX"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg tracking-wider"
          required
        />
        <p className="text-sm text-gray-500 mt-2">
          Enter the 12-digit number from your Aadhaar card
        </p>
      </div>

      {aadhaarNumber?.length === 12 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-800">Valid Aadhaar Number Format</span>
          </div>
        </div>
      )}
    </div>
  );
}