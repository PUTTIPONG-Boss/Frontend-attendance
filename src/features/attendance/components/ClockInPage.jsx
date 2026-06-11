import { useRef } from 'react'
import CameraContainer from './CameraContainer'
import SessionStatus from './SessionStatus'
import ClockInForm from './ClockInForm'
import { useFaceDetection } from '../hooks/useFaceDetection'

export default function ClockInPage() {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const { faceStatus, modelsLoaded } = useFaceDetection(webcamRef, canvasRef)

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Left — Camera */}
      <div className="w-full lg:w-1/2 flex flex-col gap-3">
        <h2 className="text-base font-semibold text-gray-700">Camera Preview</h2>
        <CameraContainer webcamRef={webcamRef} canvasRef={canvasRef} />
        <SessionStatus faceStatus={faceStatus} modelsLoaded={modelsLoaded} />
        {!modelsLoaded && (
          <p className="text-xs text-gray-400 text-center">
            Loading AI face detection model (~2MB)...
          </p>
        )}
      </div>

      {/* Right — Form */}
      <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-base font-semibold text-gray-700 mb-4">Clock In</h2>
        <ClockInForm faceStatus={faceStatus} webcamRef={webcamRef} />
      </div>
    </div>
  )
}
