const mongoose = require('mongoose');

const cellSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  owner: { type: String, default: null },
  color: { type: String, default: '#374151' }, // Tailwind slate-700
  updatedAt: { type: Date, default: Date.now }
});

// Compound index for fast lookups by coordinates
cellSchema.index({ x: 1, y: 1 }, { unique: true });

module.exports = mongoose.model('Cell', cellSchema);
