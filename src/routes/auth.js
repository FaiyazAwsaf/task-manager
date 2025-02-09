const express = require('express');
const router = express.Router();
const {authenticateToken, adminOnly} = require('../middleware/auth.js');
const { registerUser, userLogin } = require('../controllers/auth');
const {loadDashboard} = require('../controllers/dashboard.js');

router.route('/register-user').post(registerUser);
router.route('/login').post(userLogin);
router.route('/dashboard').get(authenticateToken, adminOnly, loadDashboard);


/**
 * @swagger
 * /auth/register-user:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user with a hashed password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing required fields
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Access the admin dashboard
 *     description: Only admin users with a valid JWT token can access this route.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully accessed the admin dashboard.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You are an Admin. Welcome to the dashboard, john_doe!"
 *       401:
 *         description: Unauthorized - No token provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized: No token provided"
 *       403:
 *         description: Access Denied - User is not an admin.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Access Denied"
 */

module.exports = router;