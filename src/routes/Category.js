import express from 'express';
const router = express.Router();
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
} from '../app/controllers/CategoryController.js';
router.get('/categories', getCategories);
router.post('/categories', addCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);
export default router;
