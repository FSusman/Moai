const Exercise = require("../models/tasks/exercise");
const Hifz = require("../models/tasks/hifz");
const Hadees = require("../models/tasks/hadees");
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
  const { taskType } = request.body;

  switch (taskType) {
    case "exercise":
      response.json({ message: "try exercising" });
    case "coding":
      response.json({ message: "try coding" });
    case "piano":
      response.json({ message: "try pianonig" });
    case "hadees":
      response.json({ message: "try hadeesing" });
    case "hifz":
      response.json({ message: "try hifzing" });
  }
});

module.exports = tasksRouter;
