require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Cell = require('./models/Cell');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // In production, restrict this to your frontend URL
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shared-grid';

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    initializeGrid();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Initialize 20x20 Grid if empty
async function initializeGrid() {
  try {
    const count = await Cell.countDocuments();
    if (count === 0) {
      console.log('Initializing 20x20 grid...');
      const cells = [];
      for (let x = 0; x < 20; x++) {
        for (let y = 0; y < 20; y++) {
          cells.push({ x, y });
        }
      }
      await Cell.insertMany(cells);
      console.log('Grid initialized!');
    }
  } catch (err) {
    console.error('Error initializing grid:', err);
  }
}

// Socket.IO Logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('get_grid', async () => {
    try {
      const cells = await Cell.find().sort({ x: 1, y: 1 });
      socket.emit('grid_data', cells);
    } catch (err) {
      console.error('Error fetching grid:', err);
    }
  });

  socket.on('claim_cell', async ({ x, y, userId, color }) => {
    try {
      const currentCell = await Cell.findOne({ x, y });
      
      let update = {};
      if (currentCell && currentCell.owner === userId) {
        // Toggle off: if user already owns it, unclaim it
        update = { 
          $set: { 
            owner: null, 
            color: '#374151', // Reset to default slate-700
            updatedAt: new Date() 
          } 
        };
      } else {
        // Claim/Steal: Set new owner
        update = { 
          $set: { 
            owner: userId, 
            color, 
            updatedAt: new Date() 
          } 
        };
      }

      const updatedCell = await Cell.findOneAndUpdate({ x, y }, update, { returnDocument: 'after' });

      if (updatedCell) {
        io.emit('cell_updated', updatedCell);
      }
    } catch (err) {
      console.error('Error in claim_cell:', err);
      socket.emit('claim_failed', { x, y, reason: 'Server error' });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
