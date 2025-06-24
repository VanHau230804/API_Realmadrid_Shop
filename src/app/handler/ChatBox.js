// import { handleSendMessage } from '../controllers/ChatBoxController';
// const adminSockets = new Set();
// const userSockets = new Set();
// /**
//  * Hàm xử lý kết nối socket.io
//  * @param {Server} io - socket.io instance
//  */
// export const handleSocketConnection = io => {
//   io.on('connection', socket => {
//     console.log('New connection:', socket.id);
//     socket.on('identify', userType => {
//       if (userType === 'admin') {
//         adminSockets.add(socket.id);
//         console.log('Admin connected:', socket.id);
//       } else if (userType === 'user') {
//         userSockets.add(socket.id);
//         console.log('user connected:', socket.id);
//       }
//       if (userType === 'user' && adminSockets.size > 0) {
//         socket.emit('adminAvailable', true);
//       }
//     });
//     // Handle incoming message
//     socket.on('sendMessage', async messageData => {
//       await handleMessageSend({
//         io,
//         socket,
//         messageData,
//         adminSockets,
//         userSockets
//       });
//     });

//     socket.on('disconnect', () => {
//       adminSockets.delete(socket.id);
//       userSockets.delete(socket.id);
//       console.log('User disconnected:', socket.id);
//     });
//   });
// };
