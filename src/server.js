import express from 'express';
import path from 'path';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Server } from 'socket.io';
import { createServer } from 'http';
// Giả lập lại __dirname trong ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import connectDB from './config/database.js';
import kitRouter from './routes/Kit.js';
import categoryRouter from './routes/Category.js';
import newRouter from './routes/News.js';
import accountRouter from './routes/Account.js';
import cartRouter from './routes/Cart.js';
import orderRouter from './routes/Order.js';
import uploadRouter from './routes/Upload.js';
import chatboxRouter from './routes/Chatbox.js';
import { handleSocketConnection } from './app/controllers/ChatBoxController.js';
//connect to DB
dotenv.config();
connectDB(process.env.MONGODB_URI);
// Cấu hình template engine
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});
// Socket.io
handleSocketConnection(io);

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.use(cors());
app.use(cookieParser());
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined'));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Route
app.use('/', kitRouter);
app.use('/', categoryRouter);
app.use('/', newRouter);
app.use('/', accountRouter);
app.use('/', cartRouter);
app.use('/', orderRouter);
app.use('/', uploadRouter);
app.use('/', chatboxRouter);
const port = process.env.PORT || 8081;
server.listen(port, () => {
  console.log(
    `Server (with Socket.IO) listening at http://localhost:${port}/kits`
  );
});
