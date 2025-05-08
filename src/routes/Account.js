import express from 'express';
const router = express.Router();
import {
  getAccounts,
  addAccount,
  deleteAccount
} from '../app/controllers/AccountController.js';
router.get('/accounts', getAccounts);
router.post('/accounts', addAccount);
router.delete('/account/:id', deleteAccount);
export default router;
