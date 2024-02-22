const express = require("express");
const {
  register,
  login,
  listUsers,
  verifyOTP,
} = require("../controllers/authController");

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
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/verifyOTP:
 *   post:
 *     summary: Verify OTP for user login
 *     description: Verifies the OTP sent to the user's email during the login process.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - token
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user trying to log in.
 *               token:
 *                 type: string
 *                 description: The OTP token sent to the user's email.
 *     responses:
 *       200:
 *         description: OTP verified successfully.
 *       400:
 *         description: Invalid OTP.
 *       404:
 *         description: User not found.
 */
router.post("/verifyOTP", verifyOTP);

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
