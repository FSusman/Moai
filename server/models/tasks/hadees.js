const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hadeesSchema = new Schema({
  recordedLine: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Hadees = mongoose.model("Hadees", hadeesSchema);

module.exports = Hadees;
