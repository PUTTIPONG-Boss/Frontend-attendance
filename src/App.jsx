import { useState } from 'react'
import ClockInPage from './features/attendance/components/ClockInPage'
import DashboardPage from './features/dashboard/components/DashboardPage'
import SettingsPage from './features/settings/components/SettingsPage'

const TABS = [
  { key: 'clockin', label: 'Clock In' },
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'settings', label: 'Settings' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('clockin')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl"></span>
            <h1 className="text-base font-bold text-gray-800">Attendance Tracker</h1>
          </div>
          <nav className="flex gap-1 bg-gray-100 p-1 rounded-full">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === tab.key ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {activeTab === 'clockin' && <ClockInPage />}
        {activeTab === 'dashboard' && <DashboardPage />}
        {activeTab === 'settings' && <SettingsPage />}
      </main>
    </div>
  )
}
