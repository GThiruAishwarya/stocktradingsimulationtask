const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

/**
 * @swagger
 * tags:
 *   name: Stock
 *   description: Stock management and reporting APIs
 */

/**
 * @swagger
 * /stocks/register:
 *   post:
 *     summary: Register a new stock
 *     tags: [Stock]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, availableQuantity]
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               availableQuantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Stock registered successfully
 */
router.post('/register', stockController.registerStock);

/**
 * @swagger
 * /stocks/history:
 *   get:
 *     summary: Retrieve stock price history
 *     tags: [Stock]
 *     responses:
 *       200:
 *         description: Price history fetched
 */
router.get('/history', stockController.getStockHistory);

/**
 * @swagger
 * /stocks/report:
 *   get:
 *     summary: Get stock-wise performance report
 *     tags: [Stock]
 *     responses:
 *       200:
 *         description: Stock performance report returned
 */
router.get('/report', stockController.getStockReport);

/**
 * @swagger
 * /stocks/top:
 *   get:
 *     summary: List top-performing stocks by trade volume
 *     tags: [Stock]
 *     responses:
 *       200:
 *         description: Top performing stocks returned
 */
router.get('/top', stockController.getTopStocks);

module.exports = router;
