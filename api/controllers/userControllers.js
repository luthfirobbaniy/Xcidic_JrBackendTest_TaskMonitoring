const { User, Role } = require("../models");
const hash = require("../helper/hash");

// Login
const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		// Get user data
		let userData = await User.findOne({
			where: {
				username,
				password: hash(password),
			},
			attributes: {
				exclude: ["password"],
			},
			include: {
				model: Role,
			},
		});

		if (!userData) {
			return res.status(200).send({
				message: "User not found",
			});
		}

		userData = {
			userId: userData.id,
			username: userData.username,
			roleId: userData.role_id,
			role: userData.role.name,
		};

		// Response
		res.status(200).send(userData);
	} catch (err) {
		res.status(500).send({
			message: err.message,
			detail: err,
		});
	}
};

// Register
const register = async (req, res) => {
	const { username, password, roleId } = req.body;

	try {
		// Username and password value check
		if (!username || !password) {
			return res.status(500).send({
				message: "Please check the input you entered",
			});
		}

		// Create user
		await User.create({
			username,
			password: hash(password),
			role_id: roleId,
		});

		// Response
		res.status(200).send({ message: "Registered" });
	} catch (err) {
		if (err.parent.code === "23505") {
			err.message = "Username already taken";
		}
		res.status(500).send({
			message: err.message,
			detail: err,
		});
	}
};

module.exports = {
	login,
	register,
};
