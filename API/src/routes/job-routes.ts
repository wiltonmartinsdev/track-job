import { Router } from "express";

import JobController from "../controllers/job-controller";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

export const jobRoutes = Router();
const jobController = new JobController();

jobRoutes.post("/", ensureAuthenticated, jobController.create);
jobRoutes.get("/", jobController.index);
jobRoutes.put("/:id", jobController.update);
// jobRoutes.delete("/:id", jobController.delete);
