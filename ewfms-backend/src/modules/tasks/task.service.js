import TaskRepository from "./task.repository.js";

class TaskService {

    static async getAllTasks() {
        return TaskRepository.getAllTasks();
    }

    static async getTaskById(taskId) {
        return TaskRepository.getTaskById(taskId);
    }

    static async getTasksByProject(projectId) {
        return TaskRepository.getTasksByProject(projectId);
    }

    static async createTask(taskData) {
        return TaskRepository.createTask(taskData);
    }

    static async updateTask(taskId, taskData) {
        return TaskRepository.updateTask(taskId, taskData);
    }

    static async deleteTask(taskId) {
        return TaskRepository.deleteTask(taskId);
    }
}

export default TaskService;
