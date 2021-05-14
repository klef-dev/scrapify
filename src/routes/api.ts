import { Router, Request, Response } from "express";

// Controller
import { AuthController, EconomistController } from "../controllers";

// Middleware
import { registerRequest, loginRequest, isLoggedIn } from "../middleware";

export class Routes {
	public router: Router = Router();

	private authController: AuthController = new AuthController();
	private economistController: EconomistController = new EconomistController();

	public routes(): Router {
		this.router.get("/", (req: Request, res: Response) => {
			res.json({ message: "Welcome to mistho api 😊" });
		});

		this.router.post("/auth/login", loginRequest(), this.authController.login);

		this.router.post(
			"/auth/register",
			registerRequest(),
			this.authController.register
		);

		this.router.get("/scrap", isLoggedIn, this.economistController.index);

		return this.router;
	}
}
