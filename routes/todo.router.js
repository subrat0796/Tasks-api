const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todo.controller");

// @Get all tasks
router.get("/getAllTasks", todoController.getAllTasks);

// @Get single task
router.get("/getSingleTask/:id", todoController.getTaskById);

// @Post a new task
router.post("/createTask", todoController.createTask);

// @Update a single task using id
router.put("/updateSingleTask/:id", todoController.updateTaskById);

// @Delete a single task using id
router.delete("/deleteSingleTask/:id", todoController.deleteTaskById);

module.exports = router;
