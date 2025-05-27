import express from 'express';
const router = express.Router();
import { createOrder } from '../app/controllers/OrderController.js';
router.post('/orders', createOrder);
export default router;
