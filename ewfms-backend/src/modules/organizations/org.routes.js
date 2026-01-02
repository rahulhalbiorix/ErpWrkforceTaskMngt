import express from "express";
import OrgController from "./org.controller.js";
import { verifyToken } from "../../middleware/auth.middleware.js";
import { allowOrg } from "../../middleware/org.permit.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/orgs:
 *   get:
 *     summary: Get all organizations
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Organizations
 *     description: Returns a list of all organizations
 *     responses:
 *       200:
 *         description: List of organizations
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Server error
 */


router.get("/", verifyToken ,allowOrg(), OrgController.getAllOrgs);

/**
 * @swagger
 * /api/orgs/create:
 *   post:
 *     summary: Create a new organization
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Organizations
 *     description: Creates a new organization entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - domain
 *             properties:
 *               name:
 *                 type: string
 *                 example: Google
 *               domain:
 *                 type: string
 *                 example: google.com
 *               logo_url:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Organization created successfully
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */


router.post("/create", verifyToken , OrgController.createOrg);

/**
 * @swagger
 * /api/orgs/{id}:
 *   get:
 *     summary: Get organization by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Organizations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Organization found
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       404:
 *         description: Organization not found
 *       500:
 *         description: Server error
 */


router.get("/:id",verifyToken, OrgController.findOrgById);

/**
 * @swagger
 * /api/orgs/update/{id}:
 *   put:
 *     summary: Update an organization
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Organizations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Amazon
 *               domain:
 *                 type: string
 *                 example: amazon.com
 *               logo_url:
 *                 type: string
 *               status:
 *                 type: string
 *                 example: active
 *     responses:
 *       200:
 *         description: Organization updated successfully
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       404:
 *         description: Organization not found
 *       500:
 *         description: Server error
 */


router.put("/update/:id",verifyToken , OrgController.updateOrg);

/**
 * @swagger
 * /api/orgs/status/{id}:
 *   patch:
 *     summary: Activate or Deactivate Organization
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Organization ID
 *         schema:
 *           type: string
 *           example: "0c12a6ae-7e62-4418-bf28-123456789abc"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: active
 *     responses:
 *       200:
 *         description: Organization status updated successfully
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
 *                   example: Organization active successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.patch("/status/:id",verifyToken , OrgController.activeInactiveOrg);

export default router;
