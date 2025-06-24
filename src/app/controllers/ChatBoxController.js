import Message from '../../models/Chatbox.js';
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getMessagesByIdUser = async (req, res) => {
  try {
    const messages = await Message.find({ _idUser: req.params.id }).sort({
      timestamp: 1
    });
    if (!messages) {
      return res
        .status(404)
        .json({ message: 'No messages found for this user' });
    }
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching messages'
    });
  }
};
const adminSockets = new Set();
const userSockets = new Set();
/**
 * Hàm xử lý kết nối socket.io
 * @param {Server} io - socket.io instance
 */
export const handleSocketConnection = io => {
  io.on('connection', socket => {
    console.log('New connection:', socket.id);
    socket.on('identify', userType => {
      if (userType === 'admin') {
        adminSockets.add(socket.id);
        console.log('Admin connected:', socket.id);
      } else if (userType === 'user') {
        userSockets.add(socket.id);
        console.log('user connected:', socket.id);
      }
      if (userType === 'user' && adminSockets.size > 0) {
        socket.emit('adminAvailable', true);
      }
    });
    socket.on('sendMessage', async messageData => {
      try {
        const newMessage = new Message({
          _idUser: messageData._idUser,
          sender: messageData.sender,
          content: messageData.content,
          senderType: messageData.senderType,
          recipientType: messageData.recipientType
        });
        await newMessage.save();
        if (messageData.senderType === 'admin') {
          userSockets.forEach(userId => {
            io.to(userId).emit('receiveMessage', newMessage);
          });
        } else {
          adminSockets.forEach(adminId => {
            io.to(adminId).emit('receiveMessage', newMessage);
          });
        }
      } catch (error) {
        console.error('Error saving message:', error);
        socket.emit('messageError', error.message);
      }
    });

    socket.on('disconnect', () => {
      adminSockets.delete(socket.id);
      userSockets.delete(socket.id);
      console.log('User disconnected:', socket.id);
    });
  });
};

// export const handleMessageSend = async ({ io, socket, messageData, adminSockets, userSockets }) => {
//   try {
//     const newMessage = new Message({
//       _idUser: messageData._idUser,
//       sender: messageData.sender,
//       content: messageData.content,
//       senderType: messageData.senderType,
//       recipientType: messageData.recipientType
//     });

//     await newMessage.save();

//     const targetSockets = messageData.senderType === 'admin' ? userSockets : adminSockets;

//     targetSockets.forEach(socketId => {
//       io.to(socketId).emit('receiveMessage', newMessage);
//     });
//   } catch (error) {
//     console.error('Error saving message:', error);
//     socket.emit('messageError', error.message);
//   }
// };
