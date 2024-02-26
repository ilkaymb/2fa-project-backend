const express = require("express");

const verifyToken = require("../middlewares/verifyToken"); // verifyToken middleware'inin yolu

const { register } = require("../controllers/auth/registerController");
const { login } = require("../controllers/auth/loginController");
const { verifyOTP } = require("../controllers/auth/verifyOTPController");
const { verifyUser } = require("../controllers/auth/verifyUserController");

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
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
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
 *               - otp
 *               - token
 *             properties:
 *               otp:
 *                 type: string
 *                 description: The otp sent to the user's email.
 *               token:
 *                 type: string
 *                 description: The jwtToken trying to log in.
 *     responses:
 *       200:
 *         description: OTP verified successfully.
 *       400:
 *         description: Invalid OTP.
 *       404:
 *         description: User not found.
 */
router.post("/verifyOTP", verifyToken, verifyOTP);

/**
 * @swagger
 * /api/verifyUser:
 *   post:
 *     summary: Verify user's JWT token
 *     description: Verifies the JWT token provided by the user to ensure they are authenticated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: The JWT token provided by the user for verification.
 *     responses:
 *       200:
 *         description: User verified successfully. Returns user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Token validation failed or token is expired.
 *       403:
 *         description: Token not provided.
 */
router.post("/verifyUser", verifyToken, verifyUser);

module.exports = router;
