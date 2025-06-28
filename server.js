// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const db = require('./models');
const stockRoutes = require('./routes/stockRoutes');
const userRoutes = require('./routes/userRoutes');
require('./jobs/updateStockPrices');

app.use(express.json());
// Swagger setup
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'Stock Trading API', version: '1.0.0' },
  },
  apis: ['./routes/*.js'],
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/stocks', stockRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
