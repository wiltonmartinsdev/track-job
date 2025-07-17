import { Router } from "express";

import AuthController from "../controllers/auth-controller";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

export const authRoutes: Router = Router();
const authController = new AuthController();

// Rota para validar se o token ainda é válido
authRoutes.get("/validate", ensureAuthenticated, authController.validateToken);

// Rota para obter dados atualizados do usuário logado
authRoutes.get("/me", ensureAuthenticated, authController.me);
