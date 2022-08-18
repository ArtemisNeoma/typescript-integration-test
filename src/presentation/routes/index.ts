import { Router } from 'express';
import { container } from 'tsyringe';
import UserRouter from './UserRouter';

const router = Router();
const userRouter = container.resolve(UserRouter);
router.use('/customer', userRouter.router);
export default router;
