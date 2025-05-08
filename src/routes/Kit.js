import express from 'express';
const router = express.Router();
import {
  getKits,
  addKit,
  updateKit,
  deleteKit
} from '../app/controllers/KitController.js';
router.get('/kits', getKits);
router.post('/kits', addKit);
router.put('/kit/:id', updateKit);
router.delete('/kit/:id', deleteKit);
export default router;
