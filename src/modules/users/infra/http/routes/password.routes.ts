import { Router } from 'express';
import ForgotPasswordController from '../controller/ForgotPasswordController';
import SessionsController from '../controller/SessionsController';
import ResetPasswordController from '../controller/ResetPasswordController';


const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();


const passwordController = new SessionsController();
passwordRouter.post('/forgot', forgotPasswordController.create)
passwordRouter.post('/reset', resetPasswordController.create)


export default passwordRouter;
