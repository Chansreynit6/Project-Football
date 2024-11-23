const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
 
  homeTeam: {
    name: { type: String, required: true }, // Team name
    score: { type: Number, default: null }, // Will be updated after the match
  },
  awayTeam: {
    name: { type: String, required: true }, // Team name
    score: { type: Number, default: null }, // Will be updated after the match
  },
  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
    default: "upcoming",
  },
  referee: {
    type: String,
    default: null,
  },
  events: [
    {
      time: { type: String }, // Example: "45+2'"
      type: { type: String, enum: ["goal", "yellow card", "red card", "substitution"] },
      player: { type: String },
      team: { type: String }, // Either "home" or "away"
      description: { type: String },
    },
  ],
  league: {
    type: String, // e.g., "Premier League", "La Liga"
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` on save
matchSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const footballmatch = mongoose.model('footballmatch', matchSchema);

module.exports = footballmatch;
