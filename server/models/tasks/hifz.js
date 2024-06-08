const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hifzSchema = new Schema({
  surahReference: {
    type: String,
  },
  hadeesReference: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
hifzSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const Hifz = mongoose.model("Hifz", hifzSchema);

module.exports = Hifz;
