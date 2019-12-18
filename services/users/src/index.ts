import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';

import authRoute from './routes/auth';
import locationRoute from './routes/location';

// configs
dotenv.config();
require('./config/firebase');

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
app.use('/auth', authRoute);
app.use('/location', locationRoute);

app.listen(process.env.PORT, () => {
  console.log('App is running at http://localhost:%d', process.env.PORT);
  console.log('  Press CTRL-C to stop\n');
});
