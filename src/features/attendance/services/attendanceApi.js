const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export async function clockIn(payload) {
  const res = await fetch(`${BASE_URL}/api/attendance/clock-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Request failed')
  return data
}

export async function fetchLogs() {
  const res = await fetch(`${BASE_URL}/api/attendance/logs`)
  if (!res.ok) throw new Error('Failed to fetch logs')
  return res.json()
}
