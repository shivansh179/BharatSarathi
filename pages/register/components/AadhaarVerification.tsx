'use client';

// Ensure props match how they are used in the parent
interface AadhaarVerificationProps {
  aadhaarNumber: string;
  updateAadhaarNumber: (number: string) => void;
}

export default function AadhaarVerification({ aadhaarNumber, updateAadhaarNumber }: AadhaarVerificationProps) {
  // ... rest of the component code remains the same
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 12) {
      updateAadhaarNumber(value);
    }
  };

  const formatAadhaar = (value: string | undefined) => {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, ''); // Ensure only digits before formatting
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})$/);
    if (!match) return cleaned;
    return match.slice(1).filter(Boolean).join(' ');
  };

  const isValidFormat = aadhaarNumber && aadhaarNumber.length === 12;

  return (
    <div>
      {/* Title moved to StepWrapper */}
      {/* <h2 className="text-xl font-semibold mb-6">Aadhaar Verification</h2> */}
      <p className="text-gray-600 mb-6 text-sm">
        Enter your 12-digit Aadhaar number for identity verification. This helps secure your account.
      </p>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
         {/* ... info box content ... */}
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-blue-800 font-medium">Why Aadhaar?</p>
              <p className="text-blue-700 text-sm mt-1">
                Your Aadhaar helps us verify your identity, ensuring platform security and preventing duplicate accounts. It's a crucial step for creating your unique driver profile.
              </p>
            </div>
          </div>
      </div>

      {/* Input Field */}
      <div className="mb-4">
        <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700 mb-1">
            Aadhaar Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text" // Use text to allow spaces during input
          id="aadhaar"
          value={formatAadhaar(aadhaarNumber)}
          onChange={handleChange}
          placeholder="XXXX XXXX XXXX"
          className="block w-full border text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out shadow-sm text-lg tracking-wider"
          required
          maxLength={14} // Max length including spaces (4 + 1 + 4 + 1 + 4)
          inputMode="numeric" // Hint for mobile keyboards
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter the 12-digit number from your Aadhaar card.
        </p>
      </div>

      {/* Validation Indicator */}
      {aadhaarNumber && ( // Show indicator only when there's input
          <div className={`rounded-lg p-3 text-sm transition-opacity duration-300 ${isValidFormat ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
          {isValidFormat ? (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-800 font-medium">Valid Aadhaar Number Format</span>
            </div>
          ) : (
             <div className="flex items-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M8.257 3.099c.636-1.039 2.21-1.039 2.846 0l6.516 10.646c.63 1.029-.16 2.318-1.423 2.318H3.164c-1.263 0-2.053-1.289-1.423-2.318L8.257 3.099zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
               </svg>
               <span className="text-yellow-800 font-medium">Incomplete or Invalid Format (needs 12 digits)</span>
             </div>
          )}
        </div>
      )}
    </div>
  );
}