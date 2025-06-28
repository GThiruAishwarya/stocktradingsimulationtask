const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

/**
 * @swagger
 * /stocks/register:
 *   post:
 *     summary: Register a new stock
 *     tags: [Stock]
 */
router.post('/register', stockController.registerStock);

/**
 * @swagger
 * /stocks/history:
 *   get:
 *     summary: Get stock price history
 *     tags: [Stock]
 */
router.get('/history', stockController.getStockHistory);

/**
 * @swagger
 * /stocks/report:
 *   get:
 *     summary: Get stock performance report
 *     tags: [Stock]
 */
router.get('/report', stockController.getStockReport);

/**
 * @swagger
 * /stocks/top:
 *   get:
 *     summary: Get top performing stocks
 *     tags: [Stock]
 */
router.get('/top', stockController.getTopStocks);

module.exports = router;
