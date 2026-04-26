# Real-Time Shared Grid App

A collaborative 20x20 grid where users can claim cells in real-time. Built with the MERN stack and Socket.IO.

## Features
- **Real-Time Collaboration**: See cell claims instantly as they happen.
- **Atomic Claiming**: Backend prevents race conditions using MongoDB atomic updates.
- **Dynamic Leaderboard**: Track which users own the most cells.
- **Click Cooldown**: Prevents spamming and ensures fair play.
- **Premium UI**: Smooth animations, glassmorphism, and responsive design.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Socket.IO Client.
- **Backend**: Node.js, Express, Socket.IO, Mongoose.
- **Database**: MongoDB (Atlas or Local).

## Setup Instructions

### 1. Backend Setup
1. Open a terminal in the `backend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Rename `.env.example` to `.env` or create a new `.env` file.
   - Set your `MONGODB_URI` (defaults to local MongoDB).
4. Start the server:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. Open a terminal in the `frontend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Usage
- Open the frontend URL (usually `http://localhost:5173`).
- Click any grey cell to claim it with your unique color.
- Open multiple browser tabs to see the real-time synchronization in action!

## Project Structure
```
root/
├── backend/
│   ├── models/Cell.js     # Mongoose schema
│   ├── server.js          # Express & Socket.IO logic
│   └── .env               # Environment config
└── frontend/
    ├── src/
    │   ├── components/    # UI Components
    │   ├── hooks/         # useSocket custom hook
    │   ├── utils/         # User identity logic
    │   └── App.jsx        # Main layout
    └── tailwind.config.js # CSS configuration
```
