import * as express from 'express';
import { getAllCountries, getStatesByCountryId, getCitiesByStateId, getStatesByCountryIdValidators, getCitiesByStateIdValidators } from '../controllers/location';

const router = express.Router();
router.get('/countries', getAllCountries);
router.get('/states', getStatesByCountryIdValidators, getStatesByCountryId);
router.get('/cities', getCitiesByStateIdValidators, getCitiesByStateId)

export default router;