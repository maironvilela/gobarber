import { Response, Request } from "express";
import { container, inject, injectable } from "tsyringe";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";
import ShowProfileService from "@modules/users/services/ShowProfileService";

class ProfileController {

  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({ id: userId })

    return response.status(200).json(user);
  }



  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { id, name, email, password, old_password } = request.body

    const updateProfileService = container.resolve(UpdateProfileService);

    const user = await updateProfileService.execute({ id, name, email, password, old_password })


    return response.status(200).json(user);
  }
}


export default ProfileController
