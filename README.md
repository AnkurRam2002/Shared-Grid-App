# 🟦 Real-Time Shared Grid App

A premium, collaborative 20x20 canvas where users can claim territory in real-time. Built with the MERN stack and Socket.IO for seamless interactivity.

![Version](https://img.shields.io/badge/version-1.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Key Features

- **Friendly Identities**: Every user is assigned a fun, random name (e.g., *Swift Panda*) using `unique-names-generator`.
- **Real-Time Collaboration**: Powered by **Socket.IO** for instant, low-latency updates across all connected clients.
- **Dynamic Gameplay**:
  - **Claiming**: Click any grey cell to make it yours.
  - **Stealing**: Capture a cell owned by another user simply by clicking it.
  - **Toggling**: Click your own cell to release it back to the public.
- **Atomic Concurrency**: Backend uses MongoDB's atomic operations to ensure state integrity during simultaneous clicks.
- **Live Leaderboard**: Real-time ranking of top cell owners.
- **Visual Excellence**: Modern UI with glassmorphism, smooth Framer Motion transitions, and responsive CSS grid.

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
│   ├── models/Cell.js     # Data schema with ownerName support
│   └── server.js          # Socket.IO & Atomic Update logic
├── frontend/
│   ├── src/
│   │   ├── components/    # Grid, Cell, and Leaderboard components
│   │   ├── hooks/         # useSocket custom hook
│   │   └── utils/         # unique-names-generator integration
│   └── tailwind.config.js # Custom 20-column grid config
└── .gitignore             # Optimized for MERN monorepos
```

---
*Created with ❤️ by Antigravity*
