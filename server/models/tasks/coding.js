const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codingSchema = new Schema({
  description: {
    type: String,
  },
  codingTime: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
codingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Coding = mongoose.model("Coding", codingSchema);

module.exports = Coding;
