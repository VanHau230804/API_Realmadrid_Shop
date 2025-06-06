import express from 'express';
const router = express.Router();
import {
  createOrder,
  confirmOrderByEmail,
  getAllOrder,
  getOrderById,
  getOrderByIdUser,
  deleteOrderById,
  updateOrder
} from '../app/controllers/OrderController.js';

router.get('/orders/confirm-email', confirmOrderByEmail);
router.get('/orders', getAllOrder);
router.get('/order/:id', getOrderById);
router.get('/orders/:id', getOrderByIdUser);
router.put('/order/:id', updateOrder);
router.post('/orders', createOrder);
router.delete('/orders/:id', deleteOrderById);
export default router;
