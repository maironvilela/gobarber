import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import ProviderDayAvailabiltyController from '../controller/ProviderDayAvailabilityController';
import ProviderMonthAvailabiltyController from '../controller/ProviderMonthAvailabilityController';
import ProvidersController from '../controller/ProvidersController';

const providerRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabiltyController();
const providerDayAvailabilityContoller = new ProviderDayAvailabiltyController();

providerRouter.use(ensureAuthenticated);

providerRouter.get('/', providersController.index)
providerRouter.get('/:provider_id/month-availability', providerMonthAvailabilityController.index)
providerRouter.get('/:provider_id/day-availability', providerDayAvailabilityContoller.index)


export default providerRouter
