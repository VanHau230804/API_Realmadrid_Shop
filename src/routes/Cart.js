import express from 'express';
const router = express.Router();
import {
  getCarts,
  getCartByUserId
} from '../app/controllers/CartController.js';
router.get('/carts', getCarts);
router.get('/cart/:id', getCartByUserId);
export default router;
