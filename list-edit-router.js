const express = require("express");
const listEditRouter = express.Router();

module.exports = (taskList) => {
  listEditRouter.post("/create", (req, res) => {
    const newTask = req.body; 
    taskList.push(newTask); 
    res.json(newTask); 
  });


  listEditRouter.delete("/delete/:id", (req, res) => {
    const taskId = parseInt(req.params.id); 
    const index = taskList.findIndex((task) => task.id === taskId); 
    if (index !== -1) {
      
      const deletedTask = taskList.splice(index, 1); 
      res.json(deletedTask); 
    } else {
      
      res.status(404).json({ message: "Task not found" }); 
    }
  });


  listEditRouter.put("/update/:id", (req, res) => {
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