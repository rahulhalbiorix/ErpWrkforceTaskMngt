import express from "express";
import CommentsController from "./comments.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API for managing task comments
 */

/**
 * ---------------------------------------------------------
 * COMPONENT SCHEMAS
 * ---------------------------------------------------------
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         comment_id:
 *           type: string
 *           example: com-001
 *         task_id:
 *           type: string
 *           example: task-001
 *         author_id:
 *           type: string
 *           example: user-003
 *         message:
 *           type: string
 *           example: Working on API structure
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: 2025-12-10T17:52:16Z
 *
 *     CreateCommentDTO:
 *       type: object
 *       required:
 *         - task_id
 *         - author_id
 *         - message
 *       properties:
 *         task_id:
 *           type: string
 *           example: task-002
 *         author_id:
 *           type: string
 *           example: user-002
 *         message:
 *           type: string
 *           example: Tables created successfully
 *
 *     UpdateCommentDTO:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           example: Updated comment message
 */

/**
 * ---------------------------------------------------------
 * ROUTES
 * ---------------------------------------------------------
 */

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of all comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get("/", CommentsController.getAll);


/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Get a single comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: com-001
 *     responses:
 *       200:
 *         description: Comment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 */
router.get("/:id", CommentsController.getById);


/**
 * @swagger
 * /api/comments/create:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCommentDTO'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */
router.post("/create", CommentsController.create);


/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update a comment message
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: com-001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCommentDTO'
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 */
router.put("/:id", CommentsController.update);


/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: com-002
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
router.delete("/:id", CommentsController.delete);


export default router;
