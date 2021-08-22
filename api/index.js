const express = require("express");
const { taskRouter, userRouters } = require("./routers");
const app = express();

require("dotenv").config();

const bodyParser = express.json();

const PORT = process.env.APIPORT || 2000;

app.use(bodyParser);

app.use("/task", taskRouter);
app.use("/user", userRouters);

app.get("/", (req, res) => {
	res.status(200).send("API ACTIVE");
});

app.listen(PORT, () => {
	console.log(`API ACTIVE, PORT: ${PORT}`);
});
