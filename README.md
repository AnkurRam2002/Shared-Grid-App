# 🟦 Real-Time Shared Grid App

A collaborative 20x20 canvas where users can claim territory in real-time. Built with the MERN stack and Socket.IO for seamless interactivity and state persistence.

![Version](https://img.shields.io/badge/version-1.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🏗️ Backend Architecture

The backend is designed for high concurrency and real-time state management.

- **Express & Node.js**: Provides the foundation for the server-side logic and HTTP management.
- **MongoDB Atlas**: Serves as the source of truth for the 400-cell grid. Every claim is persisted to ensure territory isn't lost on refresh or server restart.
- **Atomic Operations**: Utilizes MongoDB's `findOneAndUpdate` to perform atomic updates. This prevents race conditions where multiple users try to claim the same cell at the exact same millisecond.
- **Automated Initialization**: On the first boot, the backend automatically seeds the database with a 20x20 coordinate system (400 documents).

## 📡 Event-Driven Architecture (EDA)

The application follows a strict event-driven pattern using **Socket.IO** to minimize latency and maximize responsiveness.

1. **User Action**: A user clicks a cell, triggering a `claim_cell` event via the custom `useSocket` hook.
2. **Server Processing**: The server receives the event, validates the request, and performs an atomic database update.
3. **Global Broadcast**: Instead of a simple request-response, the server emits a `cell_updated` event to *all* connected clients.
4. **UI Reactivity**: Every client's frontend listens for `cell_updated` and reactively updates only the specific cell in its local state, avoiding a full grid re-render.

## 🌟 Key Features

- **Friendly Identities**: Every user is assigned a fun, random name (e.g., *Swift Panda*) and a unique color upon joining.
- **Real-Time Collaboration**: Powered by **Socket.IO** for instant, low-latency updates.
- **Dynamic Gameplay**:
  - **Claiming**: Occupy any empty (grey) cell.
  - **Stealing**: Capture cells owned by others.
  - **Toggling**: Relinquish your own territory by clicking it again.
- **Cooldown Mechanic**: Prevents spamming and encourages strategic play (configurable via environment variables).
- **Live Leaderboard**: Real-time calculation of top territory owners based on active grid state.
- **Visual Excellence**:
  - **Glassmorphism**: Sleek, transparent UI elements.
  - **Framer Motion**: Smooth entry animations and state transitions.
  - **Responsive Grid**: Custom 20-column CSS layout that adapts to screen sizes.

## 🛠 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS v4, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express, Socket.IO.
- **Database**: MongoDB Atlas (Mongoose).

## 🚀 Getting Started

### 1. Backend Setup
1. Navigate to `/backend`.
2. Run `npm install`.
3. Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   ```
4. Start the server: `npm start`.

### 2. Frontend Setup
1. Navigate to `/frontend`.
2. Run `npm install`.
3. Create a `.env` file:
   ```env
   VITE_SOCKET_URL=http://localhost:5000
   VITE_COOLDOWN=3
   ```
4. Start the app: `npm run dev`.

## 🌐 Deployment Notes

- **Backend (Render)**: Set the root directory to `backend`, build command to `npm install`, and start command to `node server.js`. 
  - *Note: Connection may take up to 1 minute on first load due to Render's free tier server limitations.*
- **Frontend (Netlify)**: Set the root directory to `frontend`, build command to `npm run build`, and publish directory to `dist`.

## 📂 Project Structure
```text
root/
├── backend/
│   ├── models/Cell.js     # Data schema with atomic index
│   └── server.js          # Socket.IO logic & MongoDB integration
├── frontend/
│   ├── src/
│   │   ├── components/    # Grid, Cell, and Leaderboard
│   │   ├── hooks/         # useSocket (EDA logic)
│   │   └── utils/         # Random identity generator
│   └── tailwind.config.js # Custom 20x20 grid system
└── .gitignore             # Optimized for MERN monorepos
```
