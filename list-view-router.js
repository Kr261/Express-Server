const express = require("express");
const listViewRouter = express.Router();

module.exports = (taskList) => {
  listViewRouter.get("/completed", (req, res) => {
    const completedTasks = taskList.filter((task) => task.isCompleted === true);
    res.json(completedTasks);
  });

  listViewRouter.get("/incomplete", (req, res) => {
    console.log("Hola", taskList);
    const incompleteTasks = taskList.filter(
      (task) => task.isCompleted === false
    );
    res.json(incompleteTasks);
  });

  return listViewRouter;
};