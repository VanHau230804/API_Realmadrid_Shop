import express from 'express';
import multer from 'multer';
const upload = multer();
const router = express.Router();
import {
  getAccounts,
  addAccount,
  verifyEmail,
  deleteAccount,
  loginUser,
  updateUser,
  getUserByID,
  requestRefreshToken,
  deleteAllAccounts
} from '../app/controllers/AccountController.js';
import middlewareController from '../middleware/middleware.js';
import { checkVerified } from '../middleware/checkVerified.js';
router.get('/accounts', getAccounts);
router.get('/user/:id', getUserByID);
router.post('/accounts', addAccount);
router.post('/login', loginUser);
router.delete('/account/:id', deleteAccount);
router.post('/refresh-token', requestRefreshToken);
router.put('/user/:id', upload.none(), updateUser);
router.delete('/delete/accounts', deleteAllAccounts);
router.get('/verify-email/', checkVerified, verifyEmail);
export default router;
