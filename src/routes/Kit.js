import express from 'express';
const router = express.Router();
import { getKits } from '../app/controllers/KitController.js';
router.get('/kits', getKits);
export default router;
