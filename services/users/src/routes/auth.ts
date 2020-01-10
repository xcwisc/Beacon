import * as express from 'express';
import { register, registerValidators } from '../controllers/auth';

const router = express.Router();

router.post('/register', registerValidators, register);

export default router;