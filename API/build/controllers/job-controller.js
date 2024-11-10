"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/job-controller.ts
var job_controller_exports = {};
__export(job_controller_exports, {
  default: () => JobController
});
module.exports = __toCommonJS(job_controller_exports);
var import_zod = __toESM(require("zod"));

// src/database/knex.ts
var import_knex = require("knex");

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
var knex = (0, import_knex.knex)(knexfile_default);

// src/utils/AppError.ts
var AppError = class {
  message;
  statusCode;
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

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
      const bodySchema = import_zod.default.object({
        company_name: import_zod.default.string().trim().min(4),
        position: import_zod.default.string().trim().min(13),
        seniority_level: import_zod.default.string().trim().min(5),
        vacancy_modality: import_zod.default.string().trim().min(6),
        work_regime: import_zod.default.string().trim().min(2),
        place: import_zod.default.string().trim().min(4),
        status: import_zod.default.string().trim().min(7)
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
      const id = import_zod.default.string().transform((value) => Number(value)).refine((value) => !isNaN(value), {
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
      } = import_zod.default.object({
        company_name: import_zod.default.string().trim().min(4),
        position: import_zod.default.string().trim().min(13),
        seniority_level: import_zod.default.string().trim().min(5),
        vacancy_modality: import_zod.default.string().trim().min(6),
        work_regime: import_zod.default.string().trim().min(2),
        place: import_zod.default.string().trim().min(4),
        status: import_zod.default.string().trim().min(7)
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
      const id = import_zod.default.string().transform((value) => Number(value)).refine((value) => !isNaN(value), {
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
//# sourceMappingURL=job-controller.js.map