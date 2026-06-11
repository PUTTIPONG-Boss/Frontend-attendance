import { useState, useEffect } from 'react'
import { fetchLogs } from '../../attendance/services/attendanceApi'
import LogTable from './LogTable'
import PhotoModal from './PhotoModal'

export default function DashboardPage() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedLog, setSelectedLog] = useState(null)

  const loadLogs = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchLogs()
      setLogs(Array.isArray(data) ? data.slice().reverse() : [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadLogs() }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Attendance Logs</h2>
          <p className="text-sm text-gray-400">{logs.length} record{logs.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={loadLogs}
          disabled={loading}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <LogTable logs={logs} onViewPhoto={setSelectedLog} />

      <PhotoModal log={selectedLog} onClose={() => setSelectedLog(null)} />
    </div>
  )
}
