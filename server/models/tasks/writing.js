const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const writingSchema = new Schema({
  imageOfWriting: {
    type: [String],
  },
  pagesWritten: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
writingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Writing = mongoose.model("Writing", writingSchema);

module.exports = Writing;
