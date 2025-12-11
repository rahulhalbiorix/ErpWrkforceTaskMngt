import projectController from "./prj.controller.js";
import express from "express";
import { verifyToken } from "../../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all Projects
 *     description: Returns a list of all projects (requires authentication)
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   project_id:
 *                     type: string
 *                   organization_id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   created_by:
 *                     type: string
 *                   status:
 *                     type: string
 *                   start_date:
 *                     type: string
 *                     format: date
 *                   end_date:
 *                     type: string
 *                     format: date
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Server error
 */


// GET all projects
router.get("/", verifyToken ,  projectController.getAllProjects);


/**
 * @swagger
 * /api/projects/organization/{orgId}:
 *   get:
 *     summary: Get all projects under a specific organization
 *     description: Returns all projects that belong to the given organization ID.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: orgId
 *         in: path
 *         required: true
 *         description: ID of the organization
 *         schema:
 *           type: string
 *           example: org-001
 *     responses:
 *       200:
 *         description: List of all projects under the organization
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       project_id:
 *                         type: string
 *                         example: proj-001
 *                       organization_id:
 *                         type: string
 *                         example: org-001
 *                       name:
 *                         type: string
 *                         example: CRM System
 *                       description:
 *                         type: string
 *                         example: Customer management tool
 *                       created_by:
 *                         type: string
 *                         example: user-001
 *                       status:
 *                         type: string
 *                         example: active
 *                       start_date:
 *                         type: string
 *                         format: date
 *                         example: 2025-01-01
 *                       end_date:
 *                         type: string
 *                         format: date
 *                         example: 2025-06-01
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-12-10 17:50:27
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-12-10 17:50:27
 *       404:
 *         description: No projects found for this organization
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */


// GET projects by organization
router.get("/organization/:orgId",verifyToken , projectController.findProjectsByOrg);

/**
 * @swagger
 * /api/projects/user/{userId}:
 *   get:
 *     summary: Get all projects assigned to a specific user
 *     description: Returns all projects where tasks are assigned to the given user ID.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user whose assigned projects are requested
 *         schema:
 *           type: string
 *           example: user-001
 *     responses:
 *       200:
 *         description: List of projects assigned to the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       project_id:
 *                         type: string
 *                         example: proj-001
 *                       organization_id:
 *                         type: string
 *                         example: org-001
 *                       name:
 *                         type: string
 *                         example: CRM System
 *                       description:
 *                         type: string
 *                         example: Customer management tool
 *                       created_by:
 *                         type: string
 *                         example: user-001
 *                       status:
 *                         type: string
 *                         example: active
 *                       start_date:
 *                         type: string
 *                         format: date
 *                         example: 2025-01-01
 *                       end_date:
 *                         type: string
 *                         format: date
 *                         example: 2025-06-01
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-12-10 17:50:27
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-12-10 17:50:27
 *                       task_id:
 *                         type: string
 *                         example: task-101
 *                       task_name:
 *                         type: string
 *                         example: Lead follow-up automation
 *                       assigned_to:
 *                         type: string
 *                         example: user-001
 *                       task_status:
 *                         type: string
 *                         example: pending
 *       404:
 *         description: No projects found for this user
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */

// GET projects assigned to a user
router.get("/user/:userId", verifyToken , projectController.findProjectsAssignedToUser);

/**
 * @swagger
 * /api/projects/{projectId}:
 *   get:
 *     summary: Get a project by its ID
 *     description: Returns project details for the specified project ID.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         description: The ID of the project to retrieve
 *         schema:
 *           type: string
 *           example: proj-001
 *     responses:
 *       200:
 *         description: Project fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     project_id:
 *                       type: string
 *                       example: proj-001
 *                     organization_id:
 *                       type: string
 *                       example: org-001
 *                     name:
 *                       type: string
 *                       example: CRM System
 *                     description:
 *                       type: string
 *                       example: Customer management tool for businesses
 *                     created_by:
 *                       type: string
 *                       example: user-001
 *                     status:
 *                       type: string
 *                       example: active
 *                     start_date:
 *                       type: string
 *                       format: date
 *                       example: 2025-01-01
 *                     end_date:
 *                       type: string
 *                       format: date
 *                       example: 2025-06-01
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-12-10 17:50:27
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-12-10 17:50:27
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Server error
 */

// GET project by ID
router.get("/:projectId",  verifyToken , projectController.getProjectById);

/**
 * @swagger
 * /api/projects/create:
 *   post:
 *     summary: Create a new project
 *     description: Creates a new project and stores it in the database.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - organization_id
 *               - name
 *               - description
 *               - createdBy
 *               - status
 *             properties:
 *               organization_id:
 *                 type: string
 *                 example: org-001
 *               name:
 *                 type: string
 *                 example: CRM System
 *               description:
 *                 type: string
 *                 example: Customer management tool for internal business operations
 *               createdBy:
 *                 type: string
 *                 example: user-001
 *               status:
 *                 type: string
 *                 example: active
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-01-01
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-06-01
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Project created successfully
 *                 data:
 *                   type: object
 *                   example:
 *                     affectedRows: 1
 *                     insertId: 12
 *       400:
 *         description: Bad request — Missing or invalid fields
 *       401:
 *         description: Unauthorized — Token missing or invalid
 *       500:
 *         description: Server error
 */


// CREATE project
router.post("/create", verifyToken , projectController.createProject);

/**
 * @swagger
 * /api/projects/{projectId}:
 *   put:
 *     summary: Update an existing project
 *     description: Updates the project details for the specified project ID.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         description: ID of the project to update
 *         schema:
 *           type: string
 *           example: proj-001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organization_id:
 *                 type: string
 *                 example: org-001
 *               name:
 *                 type: string
 *                 example: CRM System
 *               description:
 *                 type: string
 *                 example: Updated CRM system with new lead tracking module
 *               createdBy:
 *                 type: string
 *                 example: user-001
 *               status:
 *                 type: string
 *                 example: active
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-01-01
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-08-01
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Project updated successfully
 *                 data:
 *                   type: object
 *                   example:
 *                     affectedRows: 1
 *       404:
 *         description: Project not found
 *       400:
 *         description: Bad request - Invalid or missing fields
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Server error
 */


// UPDATE project
router.put("/:projectId", verifyToken , projectController.updateProject);

/**
 * @swagger
 * /api/projects/{projectId}:
 *   delete:
 *     summary: Delete a project
 *     description: Deletes a project from the database using its ID.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         description: The ID of the project to delete
 *         schema:
 *           type: string
 *           example: proj-001
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Project deleted successfully
 *                 data:
 *                   type: object
 *                   example:
 *                     affectedRows: 1
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Server error
 */


// DELETE project
router.delete("/:projectId", verifyToken , projectController.deleteProject);

export default router;
