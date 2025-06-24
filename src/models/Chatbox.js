import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
  _idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  sender: { type: String, required: true },
  content: { type: String, required: true },
  senderType: { type: String, enum: ['admin', 'customer'], required: true },
  recipientType: { type: String, enum: ['admin', 'customer'], required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Message', messageSchema);
