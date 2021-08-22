const { Task, User } = require("../models");

// Get all task (Manager)
const getAllTask = async (req, res) => {
	const { userId } = req.body;

	try {
		// isManager?
		const isManager = await User.count({
			where: {
				id: userId,
				role_id: 1,
			},
		});

		if (!isManager) {
			return res.status(401).send({
				message: "Only registered managers can see all employee tasks",
			});
		}

		// Get all employee task data
		let taskData = await Task.findAll({
			attributes: {
				exclude: ["user_id"],
			},
			order: [["updated_at", "DESC"]],
			include: {
				model: User,
				attributes: {
					exclude: ["password"],
				},
			},
		});

		taskData = taskData.map((val) => {
			return {
				taskId: val.id,
				username: val.user.username,
				detail: val.detail,
				createdAt: val.created_at,
				updatedAt: val.updated_at,
			};
		});

		// Response
		res.status(200).send(taskData);
	} catch (err) {
		res.status(500).send({
			message: err.message,
			detail: err,
		});
	}
};

// Get own task (Employee)
const getOwnTask = async (req, res) => {
	const { userId } = req.params;

	try {
		// isEmployee?
		const isEmployee = await User.count({
			where: {
				id: userId,
				role_id: 0,
			},
		});

		if (!isEmployee) {
			return res.status(404).send({ message: "Employee not found" });
		}

		// Get unique Employee task data
		let taskData = await Task.findAll({
			where: {
				user_id: userId,
			},
			attributes: {
				exclude: ["user_id"],
			},
			order: [["updated_at", "DESC"]],
			include: {
				model: User,
				attributes: {
					exclude: ["password"],
				},
			},
		});

		taskData = taskData.map((val) => {
			return {
				taskId: val.id,
				username: val.user.username,
				detail: val.detail,
				createdAt: val.created_at,
				updatedAt: val.updated_at,
			};
		});

		// Response
		res.status(200).send(taskData);
	} catch (err) {
		res.status(500).send({
			message: err.message,
			detail: err,
		});
	}
};

// Create task (Employee)
const createTask = async (req, res) => {
	const { userId, detail } = req.body;

	try {
		// detail value check
		if (!detail) {
			return res.status(500).send({
				message: "Please check the input value you entered",
			});
		}

		// isEmployee?
		const isEmployee = await User.count({
			where: {
				id: userId,
				role_id: 0,
			},
		});

		if (!isEmployee) {
			return res.status(404).send({ message: "Employee not found" });
		}

		// Write date
		const createdAt = Date.now();

		// Create task
		await Task.create({
			user_id: userId,
			detail,
			created_at: createdAt,
			updated_at: createdAt,
		});

		// Response
		res.status(200).send({ message: "Task added" });
	} catch (err) {
		res.status(500).send({
			message: err.message,
			detail: err,
		});
	}
};

// Edit task (Employee)
const editTask = async (req, res) => {
	const { taskId } = req.params;
	const { userId, detail } = req.body;

	try {
		// detail value check
		if (!detail) {
			return res.status(500).send({
				message: "Please check the input value you entered",
			});
		}

		// isAvailable? (Task)
		const isAvailable = await Task.count({
			where: {
				id: taskId,
				user_id: userId,
			},
		});

		if (!isAvailable) {
			return res.status(404).send({ message: "Task not found" });
		}

		// Update task
		await Task.update(
			{
				detail,
				updated_at: Date.now(),
			},
			{
				where: {
					id: taskId,
				},
			}
		);

		// Response
		res.status(200).send({ message: "Task edited" });
	} catch (err) {
		res.status(500).send({
			message: err.message,
			detail: err,
		});
	}
};

// Delete task (Employee)
const deleteTask = async (req, res) => {
	const { taskId } = req.params;
	const { userId } = req.body;

	try {
		// isAvailable? (Task)
		const isAvailable = await Task.count({
			where: {
				id: taskId,
				user_id: userId,
			},
		});

		if (!isAvailable) {
			return res.status(404).send({ message: "Task not found" });
		}

		// Delete task
		await Task.destroy({
			where: {
				id: taskId,
			},
		});

		// Response
		res.status(200).send({ message: "Task deleted" });
	} catch (err) {
		res.status(500).send({
			message: err.message,
			detail: err,
		});
	}
};

module.exports = {
	getAllTask,
	getOwnTask,
	createTask,
	editTask,
	deleteTask,
};
