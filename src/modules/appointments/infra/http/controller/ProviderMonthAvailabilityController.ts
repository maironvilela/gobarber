import ListProviderMonthAvailabilityService from "@modules/appointments/services/ListProviderMonthAvailabilityService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ProviderMonthAvailabiltyController {


  public async index(request: Request, response: Response): Promise<Response> {

    const { provider_id } = request.params;
    const { month, year } = request.body

    const listProviderMonthAvailabilityService = container.resolve(ListProviderMonthAvailabilityService)

    const availability = listProviderMonthAvailabilityService.execute({
      provider_id,
      month,
      year
    })


    return response.json(availability)

  }
}
