const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export async function getOfficeSettings() {
  const res = await fetch(`${BASE_URL}/api/settings/office`)
  if (!res.ok) throw new Error('Failed to fetch settings')
  return res.json()
}

export async function saveOfficeSettings(payload) {
  const res = await fetch(`${BASE_URL}/api/settings/office`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to save settings')
  return data
}
