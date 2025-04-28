import express from 'express';
const router = express.Router();
import { getCategories } from '../app/controllers/CategoryController.js';
router.get('/getcategories', getCategories);
export default router;
