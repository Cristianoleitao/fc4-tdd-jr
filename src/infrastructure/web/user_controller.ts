import { UserService } from "../../application/services/user_service";
import { Request, Response } from "express";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;

      const user = await this.userService.createUser(name);

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        user: {
          id: user.getId(),
          name: user.getName(),
        },
      });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "An unexpected error occurred" });
    }
  }
}