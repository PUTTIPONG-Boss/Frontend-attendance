const STATUS_CONFIG = {
  loading:         { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', dot: 'bg-yellow-400', text: 'Loading face detection...' },
  no_face:         { color: 'bg-red-100 text-red-700 border-red-200',          dot: 'bg-red-500',    text: 'No face detected' },
  multiple:        { color: 'bg-red-100 text-red-700 border-red-200',          dot: 'bg-red-500',    text: 'Multiple faces detected' },
  low_confidence:  { color: 'bg-orange-100 text-orange-700 border-orange-200', dot: 'bg-orange-400', text: 'Face blurry or low light' },
  ready:           { color: 'bg-green-100 text-green-700 border-green-200',    dot: 'bg-green-500',  text: 'Face Ready ✓' },
  error:           { color: 'bg-gray-100 text-gray-600 border-gray-200',       dot: 'bg-gray-400',   text: 'Face detection unavailable' },
}

export default function SessionStatus({ faceStatus }) {
  const cfg = STATUS_CONFIG[faceStatus] || STATUS_CONFIG.loading

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium ${cfg.color}`}>
      <span className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot} ${faceStatus === 'loading' ? 'animate-pulse' : ''}`} />
      {cfg.text}
    </div>
  )
}
