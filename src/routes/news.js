import express from 'express';
const router = express.Router();
import upload from '../middleware/middlewareMulter.js';
import {
  getNews,
  getNewById,
  addNew,
  updateNew,
  deleteNew
} from '../app/controllers/NewsController.js';
router.get('/news', getNews);
router.get('/news/:id', getNewById);
router.post('/news', upload.array('images', 5), addNew);
router.put('/news/:id', upload.array('images', 5), updateNew);
router.delete('/news/:id', deleteNew);
export default router;
