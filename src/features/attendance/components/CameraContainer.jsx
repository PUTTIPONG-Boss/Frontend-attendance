import { useState } from 'react'
import Webcam from 'react-webcam'

export default function CameraContainer({ webcamRef, canvasRef }) {
  const [cameraError, setCameraError] = useState(null)

  if (cameraError) {
    return (
      <div className="w-full aspect-video bg-gray-900 rounded-2xl flex flex-col items-center justify-center gap-2 text-white">
        <span className="text-4xl">📷</span>
        <p className="text-sm text-red-400 text-center px-4">
          Camera access denied. Please allow camera permission and reload.
        </p>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-lg">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        screenshotQuality={0.8}
        videoConstraints={{ facingMode: 'user' }}
        className="w-full h-full object-cover scale-x-[-1]"
        onUserMediaError={(err) => setCameraError(err.message)}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full scale-x-[-1]"
      />
    </div>
  )
}
