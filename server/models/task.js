const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  taskType: {
    type: String,
    enum: ["Exercise", "Hifz", "Coding", "Writing", "Hadees", "Piano"],
    required: true,
  },
  proof: {
    type: Schema.Types.ObjectId,
    refPath: "taskType",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
