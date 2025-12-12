import express from "express";
import TaskController from "./task.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Task"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", TaskController.getAllTasks);

//////////////////////////////////////////////////////////////////////////////////////////
// GET TASK BY ID
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *           example: task-001
 *     responses:
 *       200:
 *         description: Task details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Task"
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.get("/:taskId", TaskController.getTaskById);

//////////////////////////////////////////////////////////////////////////////////////////
// GET TASKS BY PROJECT ID
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 * /api/tasks/project/{projectId}:
 *   get:
 *     summary: Get all tasks under a project
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *           example: proj-001
 *     responses:
 *       200:
 *         description: List of tasks for the project
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Task"
 *       404:
 *         description: No tasks found
 *       500:
 *         description: Server error
 */
router.get("/project/:projectId", TaskController.getTasksByProject);

//////////////////////////////////////////////////////////////////////////////////////////
// CREATE TASK
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateTask"
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", TaskController.createTask);

//////////////////////////////////////////////////////////////////////////////////////////
// UPDATE TASK
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   put:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: task-001
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateTask"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.put("/:taskId", TaskController.updateTask);

//////////////////////////////////////////////////////////////////////////////////////////
// DELETE TASK
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: task-001
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.delete("/:taskId", TaskController.deleteTask);

//////////////////////////////////////////////////////////////////////////////////////////
// SCHEMAS
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     Task:
 *       type: object
 *       properties:
 *         task_id:
 *           type: string
 *         project_id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         assigned_to:
 *           type: string
 *         created_by:
 *           type: string
 *         status:
 *           type: string
 *         priority:
 *           type: string
 *         due_date:
 *           type: string
 *           format: date
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *
 *     CreateTask:
 *       type: object
 *       required:
 *         - project_id
 *         - title
 *         - description
 *         - assigned_to
 *         - created_by
 *         - status
 *         - priority
 *       properties:
 *         project_id:
 *           type: string
 *           example: proj-001
 *         title:
 *           type: string
 *           example: Frontend UI
 *         description:
 *           type: string
 *           example: Create dashboard UI
 *         assigned_to:
 *           type: string
 *           example: user-003
 *         created_by:
 *           type: string
 *           example: user-002
 *         status:
 *           type: string
 *           example: in_progress
 *         priority:
 *           type: string
 *           example: high
 *         due_date:
 *           type: string
 *           example: 2025-02-05
 *
 *
 *     UpdateTask:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         assigned_to:
 *           type: string
 *         status:
 *           type: string
 *         priority:
 *           type: string
 *         due_date:
 *           type: string
 */


export default router;