import * as express from 'express';
import { getAllCountries } from '../controllers/location';

const router = express.Router();
router.get('/countries', getAllCountries);

export default router;