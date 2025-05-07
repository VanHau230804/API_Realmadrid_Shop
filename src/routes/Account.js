import express from 'express';
const router = express.Router();
import { getAccounts } from '../app/controllers/AccountController.js';
import { addAccount } from '../app/controllers/AccountController.js';
router.get('/accounts', getAccounts);
export default router;
