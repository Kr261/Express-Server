const express = require("express");
const port = 8000;
const app = express();

app.use(express.json());

const taskList = [
  {
    id: 1,
    taskname: "Task1",
    description: "description 1",
    isCompleted: false,
  },
  {
    id: 2,
    taskname: "Task2",
    description: "description 2",
    isCompleted: true,
  },
  {
    id: 3,
    taskname: "Task3",
    description: "description 3",
    isCompleted: false,
  },
  {
    id: 4,
    taskname: "Task4",
    description: "description 4",
    isCompleted: true,
  },
];

app.use((req, res, next) => {
  const methodValidate = req.method.toUpperCase(); 

  const respuesta = ["POST", "PUT", "GET", "DELETE"]; 

  if (!respuesta.includes(methodValidate)) {
    return res.status(400).json({ message: "Invalid method" }); 
  }
  next(); 
});

const listViewRouter = require("./list-view-router")(taskList); 
const listEditRouter = require("./list-edit-router")(taskList); 

app.use("/list-view", listViewRouter); 
app.use("/list-edit", listEditRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`); 
});

app.get("/tasks", (req, res) => {
  res.json(taskList); 
});

module.exports = app; 