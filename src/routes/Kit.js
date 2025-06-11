import express from 'express';
const router = express.Router();
import multer from 'multer';
const upload = multer();
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
router.post('/kits', addKit);
router.put('/kit/:id', upload.none(), updateKit);
router.delete('/kit/:id', deleteKit);
export default router;
