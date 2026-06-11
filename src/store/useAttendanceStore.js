import { create } from 'zustand'
import { clockIn } from '../features/attendance/services/attendanceApi'

const useAttendanceStore = create((set) => ({
  logs: [],
  isLoading: false,
  errorMessage: null,
  successData: null,

  actionClockIn: async (payload) => {
    set({ isLoading: true, errorMessage: null, successData: null })
    try {
      const data = await clockIn(payload)
      set({ isLoading: false, successData: data })
      return { success: true, data }
    } catch (err) {
      const message = err.message || 'Clock-in failed'
      set({ isLoading: false, errorMessage: message })
      return { success: false, message }
    }
  },

  setLogs: (logs) => set({ logs }),
  clearMessages: () => set({ errorMessage: null, successData: null }),
}))

export default useAttendanceStore
