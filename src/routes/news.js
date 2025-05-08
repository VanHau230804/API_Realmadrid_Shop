import express from 'express';
const router = express.Router();
import {
  getNews,
  addNew,
  updateNew,
  deleteNew
} from '../app/controllers/NewsController.js';
router.get('/news', getNews);
router.post('/news', addNew);
router.put('/new/:id', updateNew);
router.delete('/new/:id', deleteNew);
export default router;
