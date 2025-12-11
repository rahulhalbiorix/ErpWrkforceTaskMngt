import db from "../../config/db.js";
import { v4 as UUID } from "uuid";

class TaskRepository {

    // GET all tasks
    static async getAllTasks() {
        const [rows] = await db.query("SELECT * FROM tasks");
        return rows;
    }

    // GET task by ID
    static async getTaskById(taskId) {
        const [rows] = await db.query(
            "SELECT * FROM tasks WHERE task_id = ?",
            [taskId]
        );
        return rows[0];
    }

    // GET tasks by project
    static async getTasksByProject(projectId) {
        const [rows] = await db.query(
            "SELECT * FROM tasks WHERE project_id = ?",
            [projectId]
        );
        return rows;
    }

    // CREATE task
    static async createTask(taskData) {
        const task_id = UUID();

        const {
            project_id,
            title,
            description,
            assigned_to,
            created_by,
            status,
            priority,
            due_date,
        } = taskData;

        const query = `
            INSERT INTO tasks 
            (task_id, project_id, title, description, assigned_to, created_by, status, priority, due_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(query, [
            task_id,
            project_id,
            title,
            description,
            assigned_to,
            created_by,
            status,
            priority,
            due_date
        ]);

        return { task_id, ...taskData };
    }

    // UPDATE task
    static async updateTask(taskId, taskData) {
        const {
            project_id,
            title,
            description,
            assigned_to,
            created_by,
            status,
            priority,
            due_date
        } = taskData;

        const query = `
            UPDATE tasks SET 
                project_id = ?,
                title = ?,
                description = ?,
                assigned_to = ?,
                created_by = ?,
                status = ?,
                priority = ?,
                due_date = ?
            WHERE task_id = ?
        `;

        const [result] = await db.query(query, [
            project_id,
            title,
            description,
            assigned_to,
            created_by,
            status,
            priority,
            due_date,
            taskId
        ]);

        return result;
    }

    // DELETE task
    static async deleteTask(taskId) {
        const [result] = await db.query(
            "DELETE FROM tasks WHERE task_id = ?",
            [taskId]
        );
        return result;
    }
}

export default TaskRepository;
