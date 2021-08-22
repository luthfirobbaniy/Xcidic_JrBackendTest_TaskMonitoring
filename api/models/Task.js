const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Task = sequelize.define(
	"tasks",
	{
		user_id: DataTypes.INTEGER,
		detail: DataTypes.STRING,
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE,
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = Task;
