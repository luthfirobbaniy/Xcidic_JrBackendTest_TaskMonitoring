const { login, register } = require("./userControllers");
const {
	getAllTask,
	getOwnTask,
	createTask,
	editTask,
	deleteTask,
} = require("./taskControllers");

module.exports = {
	login,
	register,
	getAllTask,
	getOwnTask,
	createTask,
	editTask,
	deleteTask,
};
