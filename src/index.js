const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const app = express();
const port = 4000;

// Cấu hình template engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined'));

// Route
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Trang chủ',
    message: 'Chào mừng bạn đến với trang chủ!'
  });
});
app.get('/news', (req, res) => {
  res.render('news');
});
app.get('/search', (req, res) => {
  res.render('search');
});
app.post('/search', (req, res) => {
  console.log(req.body);
  res.render('search');
});
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
