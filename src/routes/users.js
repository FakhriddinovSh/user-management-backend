import controller from '../controllers/users.js';
import { Router } from 'express';
const router = Router();

router.get('/users', controller.GET);
router.get('/users/:userId', controller.GET);
router.post('/register', controller.REGISTER);
router.post('/login', controller.LOGIN);
// router.post('/user/delete', controller.DELETE);
// router.post('/user/edit', controller.PUT);

export default router;
