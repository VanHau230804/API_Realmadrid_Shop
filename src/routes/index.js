const newsRouter = require('./news');
const productRouter = require('./product');
const route = app => {
  app.use('/news', newsRouter);
  app.use('/products', productRouter);
  app.get('/search', (req, res) => {
    res.render('search');
  });
  app.post('/search', (req, res) => {
    console.log(req.body);
    res.render('search');
  });
};
module.exports = route;
