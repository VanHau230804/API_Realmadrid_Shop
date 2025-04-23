import express from 'express';
import path from 'path';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
const app = express();
const port = 4000;
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Giả lập lại __dirname trong ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import connectDB from './config/database.js';
import kitRouter from './routes/Kit.js';
//connect to DB
connectDB();
// Cấu hình template engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined'));

// Route
app.use('/', kitRouter);
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
