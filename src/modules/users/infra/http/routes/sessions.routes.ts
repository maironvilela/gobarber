import { Router } from 'express';
import SessionsController from '../controller/SessionsController';

const sessionRouter = Router();

import SessionController from '../controller/SessionsController';

const sessionsController = new SessionsController();
sessionRouter.post('/', sessionsController.create)

export default sessionRouter;
