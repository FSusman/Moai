const Exercise = require("../models/tasks/exercise");
const Hifz = require("../models/tasks/hifz");
const Writing = require("../models/tasks/writing");
const Coding = require("../models/tasks/coding");
const Piano = require("../models/tasks/piano");
const Task = require("../models/task");

const tasksRouter = require("express").Router();

tasksRouter.get("/", async (request, response) => {
  const tasks = await Task.find({});
  response.json(tasks);
});

tasksRouter.post("/", async (request, response) => {
  const body = request.body;

  switch (body.taskType) {
    case "exercise":
      const exerciseToSave = new Exercise({
        image: body.image,
        description: body.description,
        recorded: body.recorded,
      });

      const exerciseTask = await exerciseToSave.save();
      const exerciseTaskToSave = new Task({
        name: "exercise",
        taskType: "Exercise",
        proof: exerciseTask.id,
      });

      await exerciseTaskToSave.save();

      response
        .status(200)
        .json({ message: "Saved exercise task successfully" });

      break;
    case "coding":
      const codingToSave = new Coding({
        description: body.description,
        codingTime: body.codingTime,
      });

      const codingTask = await codingToSave.save();
      const codingTaskToSave = new Task({
        name: "coding",
        taskType: "Coding",
        proof: codingTask.id,
      });

      await codingTaskToSave.save();

      response.status(200).json({ message: "Saved coding task successfully" });

      break;
    case "piano":
      response.json({ message: "try pianonig" });
      break;
    case "hifz":
      response.json({ message: "try hifzing" });
      break;
    case "writing":
      const writingToSave = new Writing({
        description: body.description,
        pagesWritten: body.pagesWritten,
        imageOfWriting: body.imageOfWriting,
      });

      const writingTask = await writingToSave.save();
      const writingTaskToSave = new Task({
        name: "writing",
        taskType: "Writing",
        proof: writingTask.id,
      });

      await writingTaskToSave.save();

      response.status(200).json({ message: "Saved writing task successfully" });
      break;
    default:
      response.json({ message: "not recognized" });
  }
});

module.exports = tasksRouter;
