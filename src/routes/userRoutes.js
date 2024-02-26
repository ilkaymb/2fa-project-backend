const express = require("express");

const { listUsers } = require("../controllers/user/listUsersController");

const router = express.Router();

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
 *               type: object
 *               additionalProperties:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *                   secret:
 *                     type: string
 *                   id:
 *                     type: integer
 *                     description: The user's unique identifier.
 *             examples:
 *               application/json:
 *                 value: {
 *                   "johnDoe": {
 *                     "email": "johndoe@example.com",
 *                     "password": "password123",
 *                     "secret": "ABCDE12345FGHIJ",
 *                     "id": 1
 *                   },
 *                   "janeDoe": {
 *                     "email": "janedoe@example.com",
 *                     "password": "password456",
 *                     "secret": "KLMNO67890PQRST",
 *                     "id": 2
 *                   }
 *                 }
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 */
router.get("/getAllUsers", listUsers);

module.exports = router;
