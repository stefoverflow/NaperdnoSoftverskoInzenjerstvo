const express = require('express');
const path = require('path'); 

const logger = require('./middleware/logger');

const app = express();
app.use(express.static(path.join(__dirname, 'static'))); 

app.use(logger);
app.engine('pug', require('pug').__express)
app.set('view engine', 'pug')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/recipes', require('./routes/recipes'))

app.get('/', function (req, res) {
    res.render('index', { title: 'BestRecipesWarld', heading: 'Welcome! Here you will find all the best recipes in the warld.' })
  });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at ${port}`));