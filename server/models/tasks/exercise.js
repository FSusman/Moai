const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  recorded: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
