import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import { container } from 'tsyringe';


const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = container.resolve(AuthenticateUserService);

  const user = await authenticateUserService.execute({ email, password });
  return response.json(user);
});

export default sessionRouter;
