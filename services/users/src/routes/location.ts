import * as express from 'express';
import { getAllCountries, getStatesByCountryId, getCitiesByStateId } from '../controllers/location';

const router = express.Router();
router.get('/countries', getAllCountries);
router.get('/states', getStatesByCountryId);
router.get('/cities', getCitiesByStateId)

export default router;