'use client';

import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

interface SelfieCaptureProps {
  updateSelfie: (selfie: string | null) => void;
  onCapture: (image: string | null) => void;
  initialImage?: string | null;
}




export default function SelfieCapture({ updateSelfie }: SelfieCaptureProps) {
  const [image, setImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
      updateSelfie(imageSrc);
    }
  }, [webcamRef, updateSelfie]);

  const retake = () => {
    setImage(null);
    updateSelfie(null);
  };

  const enableCamera = () => {
    setCameraEnabled(true);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Selfie Capture</h2>
      <p className="text-gray-600 mb-6">
        Please take a clear selfie. Make sure your face is clearly visible and well-lit.
      </p>

      <div className="flex justify-center">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 w-full max-w-md">
          {!cameraEnabled ? (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-gray-600 mb-4">We need access to your camera to take a selfie</p>
              <button
                onClick={enableCamera}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Enable Camera
              </button>
            </div>
          ) : image ? (
            <div className="text-center">
              <img src={image} alt="Selfie" className="mx-auto rounded-lg mb-4" />
              <button
                onClick={retake}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Retake Selfie
              </button>
            </div>
          ) : (
            <div className="text-center">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="mx-auto rounded-lg mb-4"
                width={320}
                height={240}
                videoConstraints={{
                  facingMode: "user"
                }}
              />
              <button
                onClick={capture}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Take Selfie
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}