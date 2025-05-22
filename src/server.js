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
// Giả lập lại __dirname trong ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import connectDB from './config/database.js';
import kitRouter from './routes/Kit.js';
import categoryRouter from './routes/Category.js';
import newRouter from './routes/News.js';
import accountRouter from './routes/Account.js';
import cartRouter from './routes/Cart.js';
//connect to DB
dotenv.config();
connectDB(process.env.MONGODB_URI);
// Cấu hình template engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.use(cors());
app.use(cookieParser());
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined'));

// Route
app.use('/', kitRouter);
app.use('/', categoryRouter);
app.use('/', newRouter);
app.use('/', accountRouter);
app.use('/', cartRouter);
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}/kits`);
});
