import express from 'express';
const router = express.Router();
import upload from '../middleware/middlewareMulter.js';
import {
  getKits,
  addKit,
  updateKit,
  deleteKit,
  getKitsByCategoryID,
  getKitByID
} from '../app/controllers/KitController.js';
router.get('/kits', getKits);
router.get('/kitcategory/:id', getKitsByCategoryID);
router.get('/kit/:id', getKitByID);
router.post('/kits', upload.array('images', 5), addKit);
router.put('/kit/:id', upload.array('images', 5), updateKit);
router.delete('/kit/:id', deleteKit);
export default router;
