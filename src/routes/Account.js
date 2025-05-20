import express from 'express';
const router = express.Router();
import {
  getAccounts,
  addAccount,
  verifyEmail,
  deleteAccount,
  loginUser,
  requestRefreshToken,
  deleteAllAccounts
} from '../app/controllers/AccountController.js';
import middlewareController from '../middleware/middleware.js';
import { checkVerified } from '../middleware/checkVerified.js';
router.get('/accounts', middlewareController.verifyToken, getAccounts);
router.post('/accounts', addAccount);
router.post('/login', loginUser);
router.delete('/account/:id', deleteAccount);
router.post('/refresh-token', requestRefreshToken);
router.delete('/delete/accounts', deleteAllAccounts);
router.get('/verify-email/', checkVerified, verifyEmail);
export default router;
