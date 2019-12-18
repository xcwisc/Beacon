const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

// configs
const dotenv = require('dotenv');
dotenv.config();
require("./config/firebase");

// db.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log('App is running at http://localhost:%d', process.env.PORT);
  console.log('  Press CTRL-C to stop\n');
});