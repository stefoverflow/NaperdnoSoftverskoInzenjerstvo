const express = require('express');

const logger = require('./middleware/logger');

const app = express();

// app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/prisoners', require('./routes/prisoners'))

app.get('/', function (req, res) {
    res.send('hello world');
  });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at ${port}`));