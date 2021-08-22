const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Task = require("./Task");

const User = sequelize.define(
	"users",
	{
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		role_id: DataTypes.SMALLINT,
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

User.hasMany(Task, {
	foreignKey: "user_id",
});

Task.belongsTo(User, {
	foreignKey: "user_id",
});

module.exports = User;
