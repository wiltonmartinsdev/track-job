import { Router } from "express";

import { authRoutes } from "./auth-routes";
import { jobRoutes } from "./job-routes";
import { sessionsRoutes } from "./sessions-routes";
import { userRoutes } from "./user-routes";

export const routes = Router();

routes.use("/sessions", sessionsRoutes);
routes.use("/auth", authRoutes);
routes.use("/user", userRoutes);
routes.use("/job", jobRoutes);
