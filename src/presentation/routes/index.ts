import { Router } from 'express';
import container from '@di/index';
import UserRouter from './UserRouter';

const router = Router();
const userRouter = container.resolve(UserRouter);
router.use('/customer', userRouter.router);
export default router;
