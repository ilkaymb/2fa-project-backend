const express = require("express");
const { register, login, listUsers } = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registers a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Logs in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - token
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", login);

/**
 * @swagger
 /**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: List all users
 *     description: |
 *       Retrieves a list of all users registered in the system.
 *       Note: This endpoint should be protected and only accessible by authorized users.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   id:
 *                     type: integer
 *                     description: The user's unique identifier.
 *         examples:
 *           application/json: [
 *             {
 *               "username": "john_doe",
 *               "id": 1
 *             },
 *             {
 *               "username": "jane_doe",
 *               "id": 2
 *             }
 *           ]
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 */
router.get("/users", listUsers);

module.exports = router;
