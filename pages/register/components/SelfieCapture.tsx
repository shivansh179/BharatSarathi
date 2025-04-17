'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';

interface SelfieCaptureProps {
  // Changed prop name for clarity from parent's perspective
  onCapture: (image: string | null) => void; // Base64 string or null
  initialImage?: string | null;
}

export default function SelfieCapture({ onCapture, initialImage }: SelfieCaptureProps) {
  // Local state for the image within this component
  const [image, setImage] = useState<string | null>(initialImage || null);
  const webcamRef = useRef<Webcam>(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Effect to call the parent's update function when the local image changes
  useEffect(() => {
    onCapture(image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]); // Dependency array includes local state

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc); // Update local state
      // The useEffect hook will handle calling onCapture
    }
  }, [webcamRef]); // Removed dependencies onCapture and updateSelfie

  const retake = () => {
    setImage(null); // Clear local state
    // The useEffect hook will handle calling onCapture with null
  };

  const enableCamera = async () => {
    setCameraError(null); // Clear previous errors
    try {
        // Attempt to get camera access to check permissions early
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // We don't need to keep the stream, just check if it works
        stream.getTracks().forEach(track => track.stop());
        setCameraEnabled(true);
    } catch (err) {
        console.error("Camera access denied or error:", err);
        if (err instanceof DOMException) {
            if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
                setCameraError("Camera access denied. Please allow camera permissions in your browser settings.");
            } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
                setCameraError("No camera found. Please ensure a webcam is connected and enabled.");
            } else {
                 setCameraError("Could not access camera. Please ensure it's not used by another application.");
            }
        } else {
           setCameraError("An unexpected error occurred while accessing the camera.");
        }
    }
  };

  const videoConstraints = {
    width: 480, // Slightly larger for better quality
    height: 360,
    facingMode: "user"
  };

  return (
    <div>
      {/* Title and description moved to StepWrapper */}
      <p className="text-gray-600 mb-6 text-sm">
        Take a clear selfie in a well-lit area. Make sure your face is fully visible and centered.
      </p>

      <div className="flex justify-center">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 w-full max-w-md relative overflow-hidden">
          {/* Camera View or Placeholder */}
          <div className={`aspect-video w-full rounded-lg overflow-hidden mb-4 ${!cameraEnabled || image ? 'bg-gray-300' : 'bg-black'}`}>
             {cameraEnabled && !image && (
               <Webcam
                 audio={false}
                 ref={webcamRef}
                 screenshotFormat="image/jpeg"
                 videoConstraints={videoConstraints}
                 className="w-full h-full object-cover" // Ensure webcam fills the container
                 onUserMediaError={(err) => {
                     console.error("Webcam UserMediaError:", err);
                     setCameraError("Failed to start camera. Is it used elsewhere?");
                     setCameraEnabled(false); // Disable if error occurs during use
                 }}
                 mirrored={true} // Mirror view like a regular camera
               />
             )}
             {image && (
               <img src={image} alt="Captured Selfie" className="w-full h-full object-cover" />
             )}
              {!cameraEnabled && !image && (
                 <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                       <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {!cameraError && <p>Camera is off</p>}
                 </div>
              )}
          </div>

          {/* Controls and Status */}
          <div className="text-center">
            {cameraError && (
              <div className="text-red-600 bg-red-100 border border-red-300 rounded-md p-3 text-sm mb-4">
                {cameraError}
              </div>
            )}

            {!cameraEnabled ? (
              <button
                onClick={enableCamera}
                disabled={!!cameraError && cameraError.includes("denied")} // Don't allow retry if permissions denied
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition duration-150 disabled:opacity-50"
              >
                Enable Camera
              </button>
            ) : image ? (
              <button
                onClick={retake}
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg font-medium transition duration-150"
              >
                Retake Selfie
              </button>
            ) : (
              <button
                onClick={capture}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition duration-150"
              >
                Take Selfie
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}