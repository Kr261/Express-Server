const express = require("express");
const listEditRouter = express.Router();

//Middleware para validar los valores de la solicitud POST y PUT
const createValidation = (req, res, next) => {
  const { id, taskname, description, isCompleted } = req.body;

  if (!id || !taskname || !description || !isCompleted) {
    return res.status(400).json({ message: "Invalid info" }); 
  }
  
  req.body.isCompleted = JSON.parse(isCompleted); 

  next(); 
};

module.exports = (taskList) => {
  // Ruta POST para crear una nueva tarea
  listEditRouter.post("/create", createValidation, (req, res) => {
    const newTask = req.body; 
    taskList.push(newTask); 
    res.json(newTask); 
  });

  // Ruta DELETE para eliminar una tarea por su ID
  listEditRouter.delete("/delete/:id", (req, res) => {
    const taskId = parseInt(req.params.id); 
    const index = taskList.findIndex((task) => task.id === taskId); 
    if (index !== -1) {
      // Si se encuentra la tarea
      const deletedTask = taskList.splice(index, 1); 
      res.json(deletedTask); 
    } else {
      // Si no se encuentra la tarea
      res.status(404).json({ message: "Task not found" }); 
    }
  });

  // Ruta PUT para actualizar una tarea por su ID
  listEditRouter.put("/update/:id", createValidation, (req, res) => {
    const taskId = parseInt(req.params.id); 
    const updatedTask = req.body;
    const index = taskList.findIndex((task) => task.id === taskId); 
    if (index !== -1) {
    
      taskList[index] = { ...taskList[index], ...updatedTask }; 
      res.json(taskList[index]); 
    } else {
     
      res.status(404).json({ message: "Task not found" });
    }
  });

  return listEditRouter;
};