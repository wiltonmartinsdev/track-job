import { Router } from "express";

import JobController from "../controllers/job-controller";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

export const jobRoutes = Router();
const jobController = new JobController();

jobRoutes.post("/", ensureAuthenticated, jobController.create);
jobRoutes.get("/", ensureAuthenticated, jobController.index);
jobRoutes.put("/:id", ensureAuthenticated, jobController.update);
// jobRoutes.delete("/:id", ensureAuthenticated, jobController.delete);
