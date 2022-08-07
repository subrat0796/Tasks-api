const TodoQueries = require("../models/todo.model");

const getAllTasks = async (req, res, next) => {
	try {
		const tasks = await TodoQueries.find({});

		return res
			.status(200)
			.json({ data: tasks, message: "Succesfully fetched all the tasks" });
	} catch (err) {
		return res.status(500).json({ data: null, message: err.message });
	}
};

const getTaskById = async (req, res, next) => {
	try {
		const { id } = req.params;

		const task = await TodoQueries.findById(id);

		if (!task) {
			return res.status(404).json({ data: null, message: "Task not found" });
		}

		return res
			.status(200)
			.json({ data: task, message: "Task successfully fetched" });
	} catch (err) {
		return res.status(500).json({ data: null, message: err.message });
	}
};

const createTask = async (req, res, next) => {
	try {
		const data = req.body;

		const task = await TodoQueries.create(data);

		if (!task) {
			return res
				.status(404)
				.json({ data: null, message: "Task could not be created" });
		}

		return res
			.status(200)
			.json({ data: task, message: "Task successfully created" });
	} catch (err) {
		return res.status(500).json({ data: null, message: err.message });
	}
};

const updateTaskById = async (req, res, next) => {
	try {
		const { id } = req.params;

		const task = await TodoQueries.findById(id);

		if (!task) {
			return res.status(404).json({ data: null, message: "Task not found" });
		}

		const updateTask = await TodoQueries.findByIdAndUpdate(id, {
			...task,
			...req.body,
		});

		return res
			.status(200)
			.json({ data: null, message: "Task updated successfully" });
	} catch (err) {
		return res.status(500).json({ data: null, message: err.message });
	}
};

const deleteTaskById = async (req, res, next) => {
	try {
		const { id } = req.params;

		const task = await TodoQueries.findById(id);

		if (!task) {
			return res.status(404).json({ data: null, message: "Task not found" });
		}

		await TodoQueries.findByIdAndDelete(id);

		return res
			.status(200)
			.json({ data: null, message: "Task deleted successfully" });
	} catch (err) {
		return res.status(500).json({ data: null, message: err.message });
	}
};

module.exports = {
	getAllTasks,
	getTaskById,
	createTask,
	updateTaskById,
	deleteTaskById,
};
