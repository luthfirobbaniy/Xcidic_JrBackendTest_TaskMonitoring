const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const User = require("./User");

const Role = sequelize.define(
	"roles",
	{
		name: DataTypes.STRING,
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

Role.hasMany(User, {
	foreignKey: "role_id",
});

User.belongsTo(Role, {
	foreignKey: "role_id",
});

module.exports = Role;
