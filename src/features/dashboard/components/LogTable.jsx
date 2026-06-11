const SESSION_COLORS = {
  morning:   'bg-yellow-100 text-yellow-700',
  lunch:     'bg-orange-100 text-orange-700',
  afternoon: 'bg-blue-100 text-blue-700',
  evening:   'bg-purple-100 text-purple-700',
}

export default function LogTable({ logs, onViewPhoto }) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-2">📋</p>
        <p className="text-sm">No attendance records yet</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
          <tr>
            <th className="px-4 py-3 text-left">Employee</th>
            <th className="px-4 py-3 text-left">Session</th>
            <th className="px-4 py-3 text-left">Timestamp</th>
            <th className="px-4 py-3 text-left">Distance</th>
            <th className="px-4 py-3 text-left">Photo</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-800">{log.employee_id}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${SESSION_COLORS[log.session] || 'bg-gray-100 text-gray-600'}`}>
                  {log.session}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td className="px-4 py-3 text-gray-500">{log.distance_meters} m</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onViewPhoto(log)}
                  className="text-blue-600 hover:underline text-xs"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
