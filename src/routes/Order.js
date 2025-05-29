import express from 'express';
const router = express.Router();
import {
  createOrder,
  getAllOrder,
  getOrderByIdUser,
  deleteOrderById
} from '../app/controllers/OrderController.js';
router.get('/orders', getAllOrder);
router.get('/orders/:id', getOrderByIdUser);
router.post('/orders', createOrder);
router.delete('/orders/:id', deleteOrderById);
export default router;
