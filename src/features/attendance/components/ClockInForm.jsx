import { useState, useEffect } from 'react'
import useAttendanceStore from '../../../store/useAttendanceStore'
import { useGeolocation } from '../hooks/useGeolocation'
import Modal from '../../../components/Modal'

const SESSIONS = ['morning', 'lunch', 'afternoon', 'evening']

export default function ClockInForm({ faceStatus, webcamRef }) {
  const [employeeId, setEmployeeId] = useState('')
  const [session, setSession] = useState('morning')
  const [modal, setModal] = useState(null)
  const { coords, geoError, geoLoading, getLocation } = useGeolocation()
  const { actionClockIn, isLoading } = useAttendanceStore()

  useEffect(() => { getLocation() }, [getLocation])

  const faceReady = faceStatus === 'ready'
  const canSubmit = faceReady && coords && employeeId.trim() && !isLoading && !geoLoading

  const handleSubmit = async () => {
    if (!canSubmit || !webcamRef.current) return

    const imageSrc = webcamRef.current.getScreenshot()
    if (!imageSrc) return
    const base64 = imageSrc.replace(/^data:image\/\w+;base64,/, '')

    const result = await actionClockIn({
      employee_id: employeeId.trim(),
      session,
      latitude: coords.latitude,
      longitude: coords.longitude,
      image_base64: base64,
    })

    if (result.success) {
      setModal({
        type: 'success',
        title: 'Clock-in Successful',
        message: `Recorded for ${session} session`,
        extra: (
          <>
            <p>Distance from office: <strong>{result.data.distance_meters} m</strong></p>
            <p>Time: <strong>{new Date(result.data.timestamp).toLocaleString()}</strong></p>
          </>
        ),
      })
    } else {
      setModal({
        type: 'error',
        title: 'Clock-in Failed',
        message: result.message,
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Employee ID */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="e.g. EMP001"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Session */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
        <div className="grid grid-cols-2 gap-2">
          {SESSIONS.map((s) => (
            <button
              key={s}
              onClick={() => setSession(s)}
              className={`py-2 rounded-xl text-sm font-medium border capitalize transition-colors ${
                session === s
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* GPS Status */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${coords ? 'bg-green-500' : geoError ? 'bg-red-500' : 'bg-yellow-400 animate-pulse'}`} />
          <span className="text-gray-600">
            {geoLoading && 'Getting location...'}
            {coords && `GPS acquired`}
            {geoError && <span className="text-red-500">{geoError}</span>}
          </span>
        </div>
        {geoError && (
          <button onClick={getLocation} className="text-blue-600 text-xs underline">
            Retry
          </button>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
          canSubmit
            ? 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        {isLoading ? 'Processing...' : 'Clock In'}
      </button>

      {!faceReady && faceStatus !== 'loading' && (
        <p className="text-xs text-center text-gray-400">
          Face must be detected clearly to enable Clock In
        </p>
      )}

      {modal && (
        <Modal
          type={modal.type}
          title={modal.title}
          message={modal.message}
          extra={modal.extra}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
