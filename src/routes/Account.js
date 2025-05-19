import express from 'express';
const router = express.Router();
import {
  getAccounts,
  addAccount,
  deleteAccount,
  loginUser,
  requestRefreshToken,
  deleteAllAccounts
} from '../app/controllers/AccountController.js';
import middlewareController from '../middleware/middleware.js';
router.get('/accounts', middlewareController.verifyToken, getAccounts);
router.post('/accounts', addAccount);
router.post('/login', loginUser);
router.delete('/account/:id', deleteAccount);
router.post('/refresh-token', requestRefreshToken);
router.delete('/delete/accounts', deleteAllAccounts);
export default router;
