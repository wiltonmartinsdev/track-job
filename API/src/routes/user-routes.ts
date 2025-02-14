import { Router } from "express";

import UserController from "../controllers/user-controller";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

export const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", ensureAuthenticated,userController.create);
// userRoutes.get("/", userController.index);
// userRouter.put("/:id", userController.update);
// userRouter.delete("/:id", userController.delete);