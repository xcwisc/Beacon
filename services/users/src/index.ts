import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();

import authRoute from './routes/auth';
import locationRoute from './routes/location';

// configs
import './config/firebase';

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use('/auth', authRoute);
app.use('/location', locationRoute);

app.listen(process.env.PORT, () => {
  console.log('App is running at http://localhost:%d', process.env.PORT);
  console.log('  Press CTRL-C to stop\n');
});
