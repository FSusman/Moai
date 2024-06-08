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

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
