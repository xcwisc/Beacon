import * as express from 'express';
import { getProjectByUser, like, unlike } from '../controllers/post';
import { checkIfAuthenticated } from '../middlewares/auth';

const router = express.Router();
router.get('/projects', checkIfAuthenticated, getProjectByUser);
router.post('/like', checkIfAuthenticated, like);
router.delete('/like', checkIfAuthenticated, unlike);

export default router;