const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pianoSchema = new Schema({
  description: {
    type: String,
  },
  courseProgress: {
    type: String, // number, how many videos
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

pianoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Piano = mongoose.model("Piano", pianoSchema);

module.exports = Piano;
