const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hifzSchema = new Schema({
  recordedLine: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Hifz = mongoose.model('Hifz', hifzSchema);

module.exports = Hifz;
