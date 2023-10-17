import controller from '../controllers/users.js';
import { Router } from 'express';
const router = Router();

router.get('/users', controller.GET);
router.get('/users/:userId', controller.GET);
router.post('/register', controller.REGISTER);
router.post('/login', controller.LOGIN);
router.delete('/user/delete', controller.DELETE);
router.post('/user/block', controller.PUT);

export default router;
