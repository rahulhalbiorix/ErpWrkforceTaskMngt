import express from 'express';
import UsersController from './users.controller.js';
import { verifyToken } from '../../middleware/auth.middleware.js';
import { allowRoles } from '../../middleware/reg.permit.middleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of all registered users (requires authentication)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Rahul
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Server error
 */


router.get('/',verifyToken, UsersController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Returns a single user (requires authentication)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 5c8ad255-d2e8-11f0-ac61-b05cda5432e6
 *         description: User ID (UUID format)
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: 5c8ad255-d2e8-11f0-ac61-b05cda5432e6
 *                 name:
 *                   type: string
 *                   example: Rahul
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Server error
 */


router.get('/:id',verifyToken, UsersController.getUserById);


/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organization_id:
 *                 type: string
 *                 example: 3f29b1e0-d2e8-11f0-ac61-b05cda5432e6
 *               role_id:
 *                 type: string
 *                 format: uuid
 *                 example: 7a1c3f40-d2e8-11f0-ac61-b05cda5432e6
 *               name:
 *                 type: string
 *                 example: Rahul Sharma
 *               email:
 *                 type: string
 *                 example: rahul@example.com
 *               password_hash:
 *                 type: string
 *                 example: passwordhash123
 *               status:
 *                 type: string
 *                 example: active
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Server error
 */

router.post('/register',verifyToken,allowRoles('Super-Admin' , 'Admin') ,UsersController.registerUser);

/**
 * @swagger
 * /api/users/update/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user
 *     description: Update user details by user ID (Admin & Super-Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: 0c12a6ae-7e62-4418-bf28-123456789abc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateUserRequest"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SuccessResponse"
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Access denied
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */


router.put('/update/:id',verifyToken,allowRoles('Super-Admin' , 'Admin') ,UsersController.updateUser);

/**
 * @swagger
 * /api/users/toggle-status/{id}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Toggle user status
 *     description: Toggle user status between active and inactive
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User status updated successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */

router.patch('/toggle-status/:id',verifyToken,allowRoles('Super-Admin' , 'Admin') ,UsersController.toggleUserStatus);

export default router;