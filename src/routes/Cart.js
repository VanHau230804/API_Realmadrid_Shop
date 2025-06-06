import express from 'express';
const router = express.Router();
import {
  getCarts,
  getCartByUserId,
  addCart,
  updateCart,
  deleteCartByIdUser,
  deleteCartById
} from '../app/controllers/CartController.js';
router.get('/carts', getCarts);
router.get('/cart/:id', getCartByUserId);
router.post('/carts', addCart);
router.put('/cart/:cartId/items/:itemId', updateCart);
router.delete('/cart/:id', deleteCartByIdUser);
router.delete('/cart/:id', deleteCartById);
export default router;
