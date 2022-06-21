let mongoose = require("mongoose");

const NewsSchema = mongoose.Schema({
  name: String,
  description: String,
  author: String,
  date: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("News", NewsSchema);
