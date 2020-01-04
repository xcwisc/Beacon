import * as express from 'express';
import { getProjectByUser, like, unlike } from '../controllers/post';

const router = express.Router();
router.get('/projects', getProjectByUser);
router.post('/like', like);
router.delete('/like', unlike);

export default router;