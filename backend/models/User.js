// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  lastSubmitted: {
    type: Date,
    default: Date.now,
  },
  questionsSolved:[{
    type: String,
    ref: 'Question',
  }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
