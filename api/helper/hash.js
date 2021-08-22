const crypto = require("crypto");

const hash = (password) => {
	return crypto.createHmac("sha256", "hashKey").update(password).digest("hex");
};

module.exports = hash;
