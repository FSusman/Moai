const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const writingSchema = new Schema({
  imageOfWriting: {
    type: [String], 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Writing = mongoose.model("Writing", writingSchema);

module.exports = Writing;
