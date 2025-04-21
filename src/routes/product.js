const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductsController');
router.use('/', productController.main);
module.exports = router;
