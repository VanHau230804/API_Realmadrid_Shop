import express from 'express';
const router = express.Router();
import { getNews } from '../app/controllers/NewsController.js';
router.get('/news', getNews);
export default router;
