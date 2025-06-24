import express from 'express';
const router = express.Router();
import {
  getMessages,
  getMessagesByIdUser,
  handleSocketConnection
} from '../app/controllers/ChatBoxController.js';
// Định nghĩa route cho chatbox

router.get('/messages', getMessages);
router.get('/messages/:id', getMessagesByIdUser);
router.post('/messages', handleSocketConnection);
// Xuất router
export default router;
