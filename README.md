# Attendance Tracker — Frontend

Web application for employee clock-in/out with real-time face detection and GPS geofencing. Built with React + Vite.

## Tech Stack

- **Framework:** React 18 + Vite
- **CSS:** Tailwind CSS v3
- **State Management:** Zustand
- **Face Detection:** face-api.js (runs in browser, free, no API cost)
- **Camera:** react-webcam
- **Task Runner:** Task (taskfile.dev)

## Project Structure

```
frontend-dev/
├── public/
│   └── models/                        # face-api.js model weights (downloaded by task dev)
├── src/
│   ├── store/
│   │   └── useAttendanceStore.js      # Zustand global state
│   ├── components/
│   │   └── Modal.jsx                  # Shared success/error popup
│   ├── features/
│   │   ├── attendance/
│   │   │   ├── components/
│   │   │   │   ├── ClockInPage.jsx    # Main clock-in layout
│   │   │   │   ├── CameraContainer.jsx
│   │   │   │   ├── ClockInForm.jsx
│   │   │   │   └── SessionStatus.jsx  # Face detection status badge
│   │   │   ├── hooks/
│   │   │   │   ├── useFaceDetection.js
│   │   │   │   └── useGeolocation.js
│   │   │   └── services/
│   │   │       └── attendanceApi.js
│   │   ├── dashboard/
│   │   │   └── components/
│   │   │       ├── DashboardPage.jsx  # Admin log view
│   │   │       ├── LogTable.jsx
│   │   │       └── PhotoModal.jsx
│   │   └── settings/
│   │       ├── components/
│   │       │   └── SettingsPage.jsx   # Office location config
│   │       └── services/
│   │           └── settingsApi.js
│   ├── App.jsx
│   └── main.jsx
├── .env.example
└── Taskfile.yml
```

## Getting Started

### Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [Task](https://taskfile.dev/installation/) — `brew install go-task`
- Backend API running on `localhost:8080` (see `/backend-dev`)

### Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Run the development server:
   ```bash
   task dev
   ```
   This will automatically:
   - Install npm dependencies (skipped if `node_modules` already exists)
   - Download face-api.js model weights to `public/models/` (skipped if already present)
   - Start the Vite dev server at `http://localhost:5173`

## Available Tasks

| Command | Description |
|---|---|
| `task dev` | Install deps, download models, and start dev server |
| `task build` | Build for production |
| `task clean` | Remove `node_modules` and `dist` |

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8080` | Backend API base URL |

## Pages

### Clock In
- Real-time face detection via webcam — draws green box when face is ready, red when not
- Auto-requests GPS on load
- Select session: Morning / Lunch / Afternoon / Evening
- Clock In button only enables when face is detected (confidence ≥ 0.6) and GPS is acquired

### Dashboard
- View all attendance records
- Click **View** on any row to see the employee's clock-in photo

### Settings
- Set office name, coordinates (lat/lon), and allowed radius
- **"Use my current location"** button fills in GPS automatically
- Changes take effect immediately on next clock-in attempt
- Default location: `13.7563, 100.5018` (Bangkok) if no settings saved

## Notes

- face-api.js model weights (~2MB) are excluded from git (`.gitignore`) and downloaded automatically by `task dev`
- The app requires camera and location permissions from the browser
- Both frontend and backend must be running at the same time
