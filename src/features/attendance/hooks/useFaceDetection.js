import { useEffect, useRef, useState, useCallback } from 'react'
import * as faceapi from 'face-api.js'

export function useFaceDetection(webcamRef, canvasRef) {
  const [faceStatus, setFaceStatus] = useState('loading')
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    faceapi.nets.tinyFaceDetector
      .loadFromUri('/models')
      .then(() => setModelsLoaded(true))
      .catch(() => setFaceStatus('error'))
  }, [])

  const drawBox = useCallback((ctx, box, color, label) => {
    ctx.strokeStyle = color
    ctx.lineWidth = 3
    ctx.strokeRect(box.x, box.y, box.width, box.height)
    ctx.fillStyle = color
    ctx.fillRect(box.x, box.y - 22, label.length * 8 + 8, 22)
    ctx.fillStyle = 'white'
    ctx.font = 'bold 13px sans-serif'
    ctx.fillText(label, box.x + 4, box.y - 6)
  }, [])

  useEffect(() => {
    if (!modelsLoaded) return

    intervalRef.current = setInterval(async () => {
      const video = webcamRef.current?.video
      if (!video || video.readyState !== 4) return

      const canvas = canvasRef.current
      if (!canvas) return

      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.3 }),
      )

      const dims = faceapi.matchDimensions(canvas, video, true)
      const resized = faceapi.resizeResults(detections, dims)
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (detections.length === 0) {
        setFaceStatus('no_face')
      } else if (detections.length > 1) {
        setFaceStatus('multiple')
        resized.forEach((d) => drawBox(ctx, d.box, '#ef4444', 'Multiple'))
      } else {
        const score = detections[0].score
        if (score < 0.6) {
          setFaceStatus('low_confidence')
          drawBox(ctx, resized[0].box, '#ef4444', 'Low quality')
        } else {
          setFaceStatus('ready')
          drawBox(ctx, resized[0].box, '#22c55e', 'Face Ready')
        }
      }
    }, 300)

    return () => clearInterval(intervalRef.current)
  }, [modelsLoaded, webcamRef, canvasRef, drawBox])

  return { faceStatus, modelsLoaded }
}
