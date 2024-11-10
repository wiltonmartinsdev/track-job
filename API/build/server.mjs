// src/server.ts
import dotenv from "dotenv";
import express from "express";

// src/middlewares/error-handling.ts
import { ZodError } from "zod";

// src/utils/AppError.ts
var AppError = class {
  message;
  statusCode;
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/middlewares/error-handling.ts
function errorHandling(error, request, response, _) {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({ message: error.message });
  } else if (error instanceof ZodError) {
    response.status(400).json({ message: "Validation error", issues: error.format() });
  } else {
    response.status(500).json({ message: error.message });
  }
}

// src/routes/index.ts
import { Router as Router2 } from "express";

// src/routes/job-routes.ts
import { Router } from "express";

// src/controllers/job-controller.ts
import z from "zod";

// src/database/knex.ts
import { knex as knexConfig } from "knex";

// knexfile.ts
var knexfile_default = {
  client: "sqlite3",
  connection: {
    filename: "./src/database/database.db"
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./src/database/migrations"
  }
};

// src/database/knex.ts
var knex = knexConfig(knexfile_default);

// src/controllers/job-controller.ts
var JobController = class {
  async index(request, response, next) {
    try {
      const { company_name } = request.query;
      const jobs = await knex("jobs").select().whereLike("company_name", `%${company_name ?? ""}%`).orderBy("created_at", "desc");
      response.json(jobs);
    } catch (error) {
      next(error);
    }
  }
  async create(request, response, next) {
    try {
      const bodySchema = z.object({
        company_name: z.string().trim().min(4),
        position: z.string().trim().min(13),
        seniority_level: z.string().trim().min(5),
        vacancy_modality: z.string().trim().min(6),
        work_regime: z.string().trim().min(2),
        place: z.string().trim().min(4),
        status: z.string().trim().min(7)
      });
      const {
        company_name,
        position,
        seniority_level,
        vacancy_modality,
        work_regime,
        place,
        status
      } = bodySchema.parse(request.body);
      await knex("jobs").insert({
        company_name,
        position,
        seniority_level,
        vacancy_modality,
        work_regime,
        place,
        status
      });
      response.status(201).json({
        message: "Job created successfully"
      });
    } catch (error) {
      next(error);
    }
  }
  async update(request, response, next) {
    try {
      const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value), {
        message: "Id must be a number"
      }).parse(request.params.id);
      const {
        company_name,
        position,
        seniority_level,
        vacancy_modality,
        work_regime,
        place,
        status
      } = z.object({
        company_name: z.string().trim().min(4),
        position: z.string().trim().min(13),
        seniority_level: z.string().trim().min(5),
        vacancy_modality: z.string().trim().min(6),
        work_regime: z.string().trim().min(2),
        place: z.string().trim().min(4),
        status: z.string().trim().min(7)
      }).parse(request.body);
      const job = await knex("jobs").select().where({ id }).first();
      if (!job) {
        throw new AppError("Job not found", 404);
      }
      await knex("jobs").update({
        company_name,
        position,
        seniority_level,
        vacancy_modality,
        work_regime,
        place,
        status,
        updated_at: knex.fn.now()
      }).where({ id });
      response.json({ message: "Job updated successfully" });
    } catch (error) {
      next(error);
    }
  }
  async delete(request, response, next) {
    try {
      const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value), {
        message: "Id must be a number"
      }).parse(request.params.id);
      const job = await knex("jobs").select().where({ id }).first();
      if (!job) {
        throw new AppError("Job not found", 404);
      }
      await knex("jobs").delete().where({ id });
      response.json({ message: "Job deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
};

// src/routes/job-routes.ts
var jobRoutes = Router();
var jobController = new JobController();
jobRoutes.get("/", jobController.index);
jobRoutes.post("/", jobController.create);
jobRoutes.put("/:id", jobController.update);
jobRoutes.delete("/:id", jobController.delete);

// src/routes/index.ts
var routes = Router2();
routes.use("/", jobRoutes);

// src/server.ts
dotenv.config();
var app = express();
var PORT = process.env.PORT || 3e3;
app.use(express.json());
app.use(routes);
app.use(errorHandling);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
//# sourceMappingURL=server.mjs.map