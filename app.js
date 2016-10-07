const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'development';
const bookRouter = express.Router();

app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env === 'development';

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    nav: [
      {link: '/books', text: 'Books'},
      {link: '/authors', text: 'Authors'}]
  });
});

const books = [
  {title: 'Reactive Microservices Architecture', author: 'Jonas Boneir'},
  {title: 'F# for Fun and Profit', author: 'Scott Wlaschin'}
];
bookRouter.route('/')
          .get((req, res) => {
            res.render('books', {
              nav: [
                {link: '/books', text: 'Books'},
                {link: '/authors', text: 'Authors'}]
            });
          });
bookRouter.route('/single')
          .get((req, res) => {
            res.send('hello single book');
          });
app.use('/books', bookRouter);
app.listen(port, err => console.log('running server on port ' + port));
