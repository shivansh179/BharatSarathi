'use client';

import { useEffect, useRef } from 'react';
import QRCodeGenerator from 'qrcode';

interface QRCodeProps {
  data: string;
  size?: number;
}

export default function QRCode({ data, size = 200 }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCodeGenerator.toCanvas(canvasRef.current, data, {
        width: size,
        margin: 2,
        color: {
          dark: '#000',
          light: '#FFF'
        }
      });
    }
  }, [data, size]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <canvas ref={canvasRef} className="mx-auto"></canvas>
    </div>
  );
}
