const express = require("express");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const main = async () => {
	try {
		var app = express();
		var port = process.env.PORT || 5000;

		app.use(morgan("combined"));
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));

		app.use("/hello", async (req, res) => {
			res.json({ data: null, message: "Hello World!" });
		});
		app.use("/api", require("./routes/todo.router"));

		app.use("*", async (req, res) => {
			return res
				.status(404)
				.json({ data: null, message: "No such route found" });
		});

		mongoose
			.connect(process.env.MONGO_URI)
			.then(() => {
				console.log("Database connected");
			})
			.then(() => {
				app.listen(port, () => {
					console.log(`Server running at http://localhost:${port}`);
				});
			});
	} catch (err) {
		throw err;
	}
};

const runmain = async () => {
	try {
		await main();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

runmain();
