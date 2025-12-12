import TaskService from "./task.service.js";

class TaskController {

    // GET all tasks
    static async getAllTasks(req, res) {
        try {
            const tasks = await TaskService.getAllTasks();
            res.status(200).json({ success: true, data: tasks });
        } catch (err) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    // GET task by ID
    static async getTaskById(req, res) {
        try {
            const task = await TaskService.getTaskById(req.params.taskId);
            if (!task) return res.status(404).json({ success: false, message: "Task not found" });

            res.status(200).json({ success: true, data: task });
        } catch (err) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    // GET tasks by project
    static async getTasksByProject(req, res) {
        try {
            const tasks = await TaskService.getTasksByProject(req.params.projectId);
            res.status(200).json({ success: true, data: tasks });
        } catch (err) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    // CREATE task
    static async createTask(req, res) {
        try {
            const newTask = await TaskService.createTask(req.body);
            res.status(201).json({ success: true, message: "Task created successfully", data: newTask });
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    // UPDATE task
    static async updateTask(req, res) {
        try {
            const updated = await TaskService.updateTask(req.params.taskId, req.body);
            if (!updated.affectedRows) {
                return res.status(404).json({ success: false, message: "Task not found" });
            }

            res.status(200).json({ success: true, message: "Task updated successfully" });
        } catch (err) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    // DELETE task
    static async deleteTask(req, res) {
        try {
            const deleted = await TaskService.deleteTask(req.params.taskId);
            if (!deleted.affectedRows) {
                return res.status(404).json({ success: false, message: "Task not found" });
            }

            res.status(200).json({ success: true, message: "Task deleted successfully" });
        } catch (err) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}

export default TaskController;
