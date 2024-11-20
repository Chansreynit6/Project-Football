const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
// const itemRoutes = require('./routes/itemRoutes');
// const productRoutes = require('./routes/productRoutes')


// app.use('/api/items', itemRoutes);
// app.use('/api/products',productRoutes);

module.exports = app;