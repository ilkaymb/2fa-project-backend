const express = require("express");

const { register } = require("../controllers/auth/registerController");
const { login } = require("../controllers/auth/loginController");
const { verifyOTP } = require("../controllers/auth/verifyOTPController");

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
 *               - jwtToken
 *             properties:
 *               otp:
 *                 type: string
 *                 description: The otp sent to the user's email .
 *               jwtToken:
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
router.post("/verifyOTP", verifyOTP);

module.exports = router;
