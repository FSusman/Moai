const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pianoSchema = new Schema({
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Piano = mongoose.model("Piano", pianoSchema);

module.exports = Piano;
