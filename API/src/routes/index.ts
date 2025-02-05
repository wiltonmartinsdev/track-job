import { Router } from "express";

import { jobRoutes } from "./job-routes";
import { sessionsRoutes } from "./sessions-routes";

export const routes = Router();

routes.use("/", jobRoutes);
routes.use("/sessions", sessionsRoutes);
