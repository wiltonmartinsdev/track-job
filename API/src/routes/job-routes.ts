import { Router } from "express";

import JobController from "../controllers/job-controller";

export const jobRoutes = Router();
const jobController = new JobController();

jobRoutes.get("/", jobController.index);
jobRoutes.post("/", jobController.create);
jobRoutes.put("/:id", jobController.update);
jobRoutes.delete("/:id", jobController.delete);
