const express = require("express");

const { listUsers } = require("../controllers/user/listUsersController");

const router = express.Router();

/**
 * @swagger
 /**
 * @swagger
 * /api/user/getAllUsers:
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
router.get("/getAllUsers", listUsers);

module.exports = router;
