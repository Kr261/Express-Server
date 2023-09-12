const express = require("express");
const listViewRouter = express.Router();
const taskList = require("./taskList.json");

//Middleware para validar los valores de la solicitud GET
const correctParams = (req, res, next) => {
  const { status } = req.query;
  if (status !== "true" && status !== "false") {
    return res.status(400).json({ message: "Invalid params" });
  }
  next();
};

listViewRouter.get("/", (req, res) => {
  res.status(200).json(taskList);
});


listViewRouter.get("/filter", correctParams, (req, res) => {
  const { status } = req.query;
  const isCompleted = status === "true";

  try {
    
    const filteredTasks = taskList.filter(
      (task) => task.isCompleted === isCompleted
    );

    res.status(200).json(filteredTasks);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = listViewRouter;