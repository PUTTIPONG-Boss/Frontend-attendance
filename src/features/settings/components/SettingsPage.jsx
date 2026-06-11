import { useState, useEffect } from 'react'
import { getOfficeSettings, saveOfficeSettings } from '../services/settingsApi'

export default function SettingsPage() {
  const [form, setForm] = useState({ name: '', latitude: '', longitude: '', radius_meters: '' })
  const [status, setStatus] = useState(null) // 'saving' | 'success' | 'error'
  const [geoLoading, setGeoLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    getOfficeSettings()
      .then((data) =>
        setForm({
          name: data.name,
          latitude: data.latitude,
          longitude: data.longitude,
          radius_meters: data.radius_meters,
        }),
      )
      .catch(() => setMessage('Failed to load current settings'))
  }, [])

  const useCurrentLocation = () => {
    if (!navigator.geolocation) return
    setGeoLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((f) => ({
          ...f,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }))
        setGeoLoading(false)
      },
      () => setGeoLoading(false),
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  const handleSave = async () => {
    setStatus('saving')
    setMessage('')
    try {
      await saveOfficeSettings({
        name: form.name,
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
        radius_meters: parseFloat(form.radius_meters),
      })
      setStatus('success')
      setMessage('Settings saved successfully')
    } catch (err) {
      setStatus('error')
      setMessage(err.message)
    }
  }

  const field = (label, key, placeholder, hint) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={key === 'name' ? 'text' : 'number'}
        step="any"
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Office Location Settings</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Employees can only clock in within the allowed radius from this location.
          </p>
        </div>

        {field('Office Name', 'name', 'e.g. Main Office')}

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Coordinates</span>
            <button
              onClick={useCurrentLocation}
              disabled={geoLoading}
              className="text-xs text-blue-600 hover:underline disabled:opacity-50"
            >
              {geoLoading ? 'Getting location...' : '📍 Use my current location'}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Latitude</label>
              <input
                type="number"
                step="any"
                value={form.latitude}
                onChange={(e) => setForm((f) => ({ ...f, latitude: e.target.value }))}
                placeholder="13.7563"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Longitude</label>
              <input
                type="number"
                step="any"
                value={form.longitude}
                onChange={(e) => setForm((f) => ({ ...f, longitude: e.target.value }))}
                placeholder="100.5018"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400">
            หาพิกัดได้จาก Google Maps → คลิกขวาที่ตำแหน่ง → Copy coordinates
          </p>
        </div>

        {field(
          'Allowed Radius (meters)',
          'radius_meters',
          '200',
          'Employees must be within this distance to clock in',
        )}

        {message && (
          <p className={`text-sm font-medium ${status === 'success' ? 'text-green-600' : 'text-red-500'}`}>
            {status === 'success' ? '✓ ' : '✕ '}{message}
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={status === 'saving'}
          className="w-full py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors active:scale-95"
        >
          {status === 'saving' ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}
