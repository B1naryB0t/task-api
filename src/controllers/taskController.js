import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
	try {
		const tasks = await taskService.getAllTasks();
		res.json(tasks);
	} catch (error) {
		next(error);
	}
}

export async function getTaskById(req, res, next) {
	try {
		const { id } = req.params;
		const task = await taskService.getTaskById(id);

		if (!task) {
			return res.status(404).json({
				error: 'Task not found',
			});
		}

		res.json(task);
	} catch (error) {
		next(error);
	}
}

export async function createTask(req, res, next) {
	try {
		const { title, completed } = req.body;
		const task = await taskService.createTask({ title, completed });
		res.status(201).json(task);
	} catch (error) {
		next(error);
	}
}
