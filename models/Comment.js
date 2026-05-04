const mongoose = require('mongoose');

module.exports = mongoose.model('Comment', new mongoose.Schema({
  postId: String,
  author: String,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}));