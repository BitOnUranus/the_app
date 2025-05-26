import React, { useRef, useState, useEffect } from 'react';
import { Camera, CameraOff, Download, RefreshCw } from 'lucide-react';
import { Product } from '../../types/product';

interface VirtualTryOnProps {
  product: Product;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ product }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isCameraAvailable, setIsCameraAvailable] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error("Camera access not supported in this browser");
        }

        stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsStreaming(true);
          setIsCameraAvailable(true);
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setIsCameraAvailable(false);
        setError("Camera access denied or not available");
      } finally {
        setIsLoading(false);
      }
    };

    startCamera();

    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setIsStreaming(false);
    };
  }, []);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame on the canvas
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Here we would normally add the 3D model overlay to the canvas
      // This is a simplified version without actual AR implementation
      
      // Get the data URL of the canvas
      const imageDataUrl = canvas.toDataURL('image/png');
      setCapturedImage(imageDataUrl);
    }
  };

  const handleReset = () => {
    setCapturedImage(null);
  };

  const handleDownload = () => {
    if (!capturedImage) return;
    
    const link = document.createElement('a');
    link.href = capturedImage;
    link.download = `jewelry-tryon-${product.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Initializing camera...</p>
        </div>
      </div>
    );
  }

  if (error || !isCameraAvailable) {
    return (
      <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center p-6">
          <CameraOff size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Camera Not Available</h3>
          <p className="text-gray-600 mb-4">{error || "Please grant camera access to use the virtual try-on feature."}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        {capturedImage ? (
          <div className="aspect-video bg-black">
            <img 
              src={capturedImage} 
              alt="Captured try-on" 
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="aspect-video bg-black">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className="w-full h-full object-cover"
              onLoadedMetadata={() => setIsLoading(false)}
            />
          </div>
        )}
        
        {/* Overlay information about the jewelry being tried on */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded-lg">
          <p className="text-sm font-medium">{product.name}</p>
          <p className="text-xs opacity-80">{product.tryOnType} jewelry</p>
        </div>
        
        {/* Canvas for capturing and processing images (hidden) */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Virtual Try-On</h3>
            <p className="text-sm text-gray-500">
              Try on {product.name} using AR technology
            </p>
          </div>
          
          <div className="flex space-x-3">
            {capturedImage ? (
              <>
                <button 
                  onClick={handleReset}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  title="Try again"
                >
                  <RefreshCw size={20} />
                </button>
                <button 
                  onClick={handleDownload}
                  className="p-2 bg-amber-100 text-amber-800 rounded-full hover:bg-amber-200 transition-colors"
                  title="Download image"
                >
                  <Download size={20} />
                </button>
              </>
            ) : (
              <button 
                onClick={handleCapture}
                className="p-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
                title="Take photo"
              >
                <Camera size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-4 text-sm text-gray-500">
        <p className="mb-2">
          <strong>Note:</strong> This is a prototype of the AR try-on feature. In a production environment, this would:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Detect facial landmarks using MediaPipe or TensorFlow.js</li>
          <li>Render 3D jewelry models with Three.js</li>
          <li>Position jewelry accurately on {product.tryOnType}</li>
          <li>Apply realistic lighting and shadows</li>
        </ul>
      </div>
    </div>
  );
};

export default VirtualTryOn;