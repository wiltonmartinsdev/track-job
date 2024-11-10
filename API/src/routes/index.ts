import { Router } from "express";

import { jobRoutes } from "./job-routes";

export const routes = Router();

routes.use("/", jobRoutes);
