const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codingSchema = new Schema({
  details: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Coding = mongoose.model("Coding", codingSchema);

module.exports = Coding;
