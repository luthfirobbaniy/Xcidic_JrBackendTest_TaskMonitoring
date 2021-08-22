const express = require("express");
const {
	getAllTask,
	getOwnTask,
	createTask,
	editTask,
	deleteTask,
} = require("../controllers/taskControllers");
const router = express.Router();

// Get all task (Manager)
router.get("/user/all", getAllTask);

// Get own task (Employee)
router.get("/user/:userId", getOwnTask);

// Create task (Employee)
router.post("/", createTask);

// Edit task (Employee)
router.patch("/:taskId", editTask);

// Delete task (Employee)
router.delete("/:taskId", deleteTask);

module.exports = router;
