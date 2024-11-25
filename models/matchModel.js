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
    required: null,
  },
  venue: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["coming soon", "upcoming", "completed"],
    default: "coming soon",
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
  const now = new Date();
  const nearRange = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

  if (!this.date) {
    // If the date is null or not provided
    this.status = "coming soon";
  } else if (this.date - now <= nearRange && this.date > now) {
    // If the date is within the next 7 days
    this.status = "coming soon";
  } else if (this.date > now) {
    // If the date is beyond the near range but still in the future
    this.status = "upcoming";
  } else {
    // If the date is in the past
    this.status = "completed";
  }

  next();
});

const footballmatch = mongoose.model('footballmatch', matchSchema);

module.exports = footballmatch;
