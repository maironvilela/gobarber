import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { Subject } from 'typeorm/persistence/Subject';

import ProfileController from '../controller/ProfileController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
profileRouter.use(ensureAuthenticated)


const profileController = new ProfileController();


profileRouter.put('/', celebrate({
  [Segments.BODY]: {
    id: Joi.string().uuid().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    old_password: Joi.when('password', {
      is: Joi.exist(),
      then: Joi.required(),
    })
  }

}), profileController.update);
profileRouter.get('/', profileController.show);



export default profileRouter;

