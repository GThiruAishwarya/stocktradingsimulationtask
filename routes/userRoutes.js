const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * /users/loan:
 *   post:
 *     summary: Apply for a loan
 *     tags: [User]
 */
router.post('/loan', userController.takeLoan);

/**
 * @swagger
 * /users/buy:
 *   post:
 *     summary: Buy stock
 *     tags: [User]
 */
router.post('/buy', userController.buyStock);

/**
 * @swagger
 * /users/sell:
 *   post:
 *     summary: Sell stock
 *     tags: [User]
 */
router.post('/sell', userController.sellStock);

/**
 * @swagger
 * /users/report:
 *   get:
 *     summary: Get user profit/loss report
 *     tags: [User]
 */
router.get('/report', userController.getUserReport);

/**
 * @swagger
 * /users/top:
 *   get:
 *     summary: Get top performing users
 *     tags: [User]
 */
router.get('/top', userController.getTopUsers);

module.exports = router;
