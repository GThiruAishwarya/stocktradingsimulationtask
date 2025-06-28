const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User trading, loans and reporting APIs
 */

/**
 * @swagger
 * /users/loan:
 *   post:
 *     summary: Allow user to take a loan (max ₹100000)
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, amount]
 *             properties:
 *               userId:
 *                 type: integer
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Loan granted
 *       400:
 *         description: Loan limit exceeded
 */
router.post('/loan', userController.takeLoan);

/**
 * @swagger
 * /users/buy:
 *   post:
 *     summary: Buy stocks
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, stockId, quantity]
 *             properties:
 *               userId:
 *                 type: integer
 *               stockId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Stock bought successfully
 */
router.post('/buy', userController.buyStock);

/**
 * @swagger
 * /users/sell:
 *   post:
 *     summary: Sell owned stocks
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, stockId, quantity]
 *             properties:
 *               userId:
 *                 type: integer
 *               stockId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Stock sold successfully
 *       400:
 *         description: Not enough stock to sell
 */
router.post('/sell', userController.sellStock);

/**
 * @swagger
 * /users/report:
 *   get:
 *     summary: Fetch user profit/loss report
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Profit/loss report returned
 */
router.get('/report', userController.getUserReport);

/**
 * @swagger
 * /users/top:
 *   get:
 *     summary: List top-performing users by profit
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Top performing users returned
 */
router.get('/top', userController.getTopUsers);

module.exports = router;
