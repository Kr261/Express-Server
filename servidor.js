const express = require("express");
const app = express();
const port = 3000;

const taskList = [
  {
    id: 1,
    taskName: "TASK 1",
    taskDescription: "Task 1 Description",
    taskCompleted: false,
  },
  {
    id: 2,
    taskName: "TASK 2",
    taskDescription: "Task 2 Description",
    taskCompleted: true,
  },
  {
    id: 3,
    taskName: "TASK 4",
    taskDescription: "Task 3 Description",
    taskCompleted: false,
  },
];

app.get("/tasks", (req, res) => {
  res.json(taskList);
});

app.listen(port, () => {
  console.log("Servidor funcionando en el puerto:", port);
});