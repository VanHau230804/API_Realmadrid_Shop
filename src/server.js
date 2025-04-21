const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const app = express();
const port = 4000;
const route = require('./routes/index');

// Cấu hình template engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined'));

// Route
route(app);
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
