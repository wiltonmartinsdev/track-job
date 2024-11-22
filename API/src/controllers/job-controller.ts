import { NextFunction, Request, Response } from "express";
import z from "zod";
import { jobRepository } from "../database/types/job-repository";

import { knex } from "../database/knex";
import AppError from "../utils/AppError";

export default class JobController {
	async index(request: Request, response: Response, next: NextFunction) {
		try {
			const { company_name } = request.query;
			const jobs = await knex<jobRepository>("jobs")
				.select()
				.whereLike("company_name", `%${company_name ?? ""}%`)
				.orderBy("created_at", "desc");

			response.json(jobs);
		} catch (error) {
			next(error);
		}
	}

	async create(request: Request, response: Response, next: NextFunction) {
		try {
            const bodySchema = z.object({
                company_name: z.string().trim().min(4),
                position: z.string().trim().min(8),
                seniority_level: z.string().trim().min(5),
                payment_currency: z.string().trim().min(4),
                initial_salary: z.number().nonnegative(),
                current_salary: z.number().nonnegative(),
                vacancy_modality: z.string().trim().min(6),
                work_regime: z.string().trim().min(2),
                place: z.string().trim().min(4),
                status: z.string().trim().min(7),
              });

			const {
				company_name,
				position,
				seniority_level,
                payment_currency,
                initial_salary,
                current_salary,
				vacancy_modality,
				work_regime,
				place,
				status,
			} = bodySchema.parse(request.body);

			// Check the number of jobs with status 'Emprego Atual'
			if (status === "Emprego Atual") {
				const countResult = await knex<jobRepository>("jobs")
					.where({ status: "Emprego Atual" })
					.count({ count: "*" });
				const count = Number(countResult[0].count);
				if (count >= 2) {
					throw new AppError(
						"Você só pode ter no máximo duas vagas com o status 'Emprego Atual'",
						400
					);
				}
			}

			await knex<jobRepository>("jobs").insert({
				company_name,
				position,
				seniority_level,
                payment_currency,
                initial_salary,
                current_salary,
				vacancy_modality,
				work_regime,
				place,
				status,
			});

			response.status(201).json({
				message: "Job created successfully",
			});
		} catch (error) {
			next(error);
		}
	}

	async update(request: Request, response: Response, next: NextFunction) {
		try {
			const id = z
				.string()
				.transform((value) => Number(value))
				.refine((value) => !isNaN(value), {
					message: "Id must be a number",
				})
				.parse(request.params.id);

			const {
				company_name,
				position,
				seniority_level,
                payment_currency,
                initial_salary,
                current_salary,
				vacancy_modality,
				work_regime,
				place,
				status,
			} = z
				.object({
                    company_name: z.string().trim().min(4),
                    position: z.string().trim().min(8),
                    seniority_level: z.string().trim().min(5),
                    payment_currency: z.string().trim().min(4),
                    initial_salary: z.number().nonnegative(),
                    current_salary: z.number().nonnegative(),
                    vacancy_modality: z.string().trim().min(6),
                    work_regime: z.string().trim().min(2),
                    place: z.string().trim().min(4),
                    status: z.string().trim().min(7),
				})
				.parse(request.body);

			const job = await knex<jobRepository>("jobs")
				.select()
				.where({ id })
				.first();

			if (!job) {
				throw new AppError("Job not found", 404);
			}

			// Check the number of jobs with status 'Emprego Atual', excluding the current job
			if (status === "Emprego Atual") {
				const countResult = await knex<jobRepository>("jobs")
					.where({ status: "Emprego Atual" })
					.andWhereNot({ id })
					.count({ count: "*" });
				const count = Number(countResult[0].count);
				if (count >= 2) {
					throw new AppError(
						"Ops! Você só pode ter no máximo duas vagas com o status 'Emprego Atual'.",
						400
					);
				}
			}

			await knex<jobRepository>("jobs")
				.update({
					company_name,
					position,
					seniority_level,
                    payment_currency,
                    initial_salary,
                    current_salary,
					vacancy_modality,
					work_regime,
					place,
					status,
					updated_at: knex.raw("datetime('now', '-3 hours')"),
				})
				.where({ id });

			response.json({ message: "Job updated successfully" });
		} catch (error) {
			next(error);
		}
	}

	async delete(request: Request, response: Response, next: NextFunction) {
		try {
			const id = z
				.string()
				.transform((value) => Number(value))
				.refine((value) => !isNaN(value), {
					message: "Id must be a number",
				})
				.parse(request.params.id);

			const job = await knex<jobRepository>("jobs")
				.select()
				.where({ id })
				.first();

			if (!job) {
				throw new AppError("Job not found", 404);
			}

			await knex<jobRepository>("jobs").delete().where({ id });

			response.json({ message: "Job deleted successfully" });
		} catch (error) {
			next(error);
		}
	}
}
