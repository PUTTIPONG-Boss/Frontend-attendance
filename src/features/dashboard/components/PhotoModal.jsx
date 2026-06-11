export default function PhotoModal({ log, onClose }) {
  if (!log) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">{log.employee_id}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
        </div>
        {log.image_base64 ? (
          <img
            src={`data:image/jpeg;base64,${log.image_base64}`}
            alt="Clock-in snapshot"
            className="w-full rounded-xl object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
            No image available
          </div>
        )}
        <div className="mt-3 text-xs text-gray-500 space-y-1">
          <p>Session: <span className="capitalize font-medium text-gray-700">{log.session}</span></p>
          <p>Time: <span className="font-medium text-gray-700">{new Date(log.timestamp).toLocaleString()}</span></p>
          <p>Distance: <span className="font-medium text-gray-700">{log.distance_meters} m</span></p>
        </div>
      </div>
    </div>
  )
}
