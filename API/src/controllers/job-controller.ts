import { formatInTimeZone } from "date-fns-tz";
import { NextFunction, Request, Response } from "express";
import z from "zod";

import { prisma } from "../database/prisma";
import AppError from "../utils/AppError";

export default class JobController {
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
			});

			if (!request.user?.id) {
				throw new AppError("Usuário não autenticado", 401);
			}

			await prisma.job.create({
				data: {
					...bodySchema.parse(request.body),
					status: "Enviada",
					process_phase: "Envio do Currículo",
					user_id: request.user.id,
				},
			});

			response.status(201).json({
				message: "Job created successfully",
				id: request.user?.id,
			});
		} catch (error) {
			next(error);
		}
	}

	async index(request: Request, response: Response, next: NextFunction) {
		try {
			const { company_name } = request.query;

			if (!request.user?.id) {
				throw new AppError("Usuário não autenticado", 401);
			}

			const jobs = await prisma.job.findMany({
				where: {
					user_id: request.user.id,
					company_name: {
						contains: (company_name as string) || "",
						mode: "insensitive",
					},
				},
				orderBy: {
					created_at: "desc",
				},
			});

			// Convertendo as datas para UTC-3
			const formattedJobs = jobs.map((job) => ({
				...job,
				created_at: formatInTimeZone(
					job.created_at,
					"America/Sao_Paulo",
					"yyyy-MM-dd HH:mm:ss"
				),
				updated_at: formatInTimeZone(
					job.updated_at,
					"America/Sao_Paulo",
					"yyyy-MM-dd HH:mm:ss"
				),
			}));

			response.json(formattedJobs);
		} catch (error) {
			next(error);
		}
	}

	async update(request: Request, response: Response, next: NextFunction) {
		try {
			const id = z.string().parse(request.params.id);

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
				process_phase,
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
					process_phase: z.string().trim().min(5),
				})
				.parse(request.body);

			const currentJob = await prisma.job.findUnique({
				where: { id },
			});

			if (!currentJob) {
				throw new AppError("Job not found", 404);
			}

			// Check the number of jobs with status 'Emprego Atual', excluding the current job
			if (status === "Emprego atual") {
				const count = await prisma.job.count({
					where: {
						status: "Emprego atual",
                        user_id: request.user?.id,
						NOT: { id },
					},
				});
				if (count >= 2) {
					throw new AppError(
						"Ops! Você só pode ter no máximo duas vagas com o status 'Emprego atual'.",
						400
					);
				}
			}

			await prisma.job.update({
				where: { id },
				data: {
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
					process_phase,
					updated_at: new Date(), // Atualiza a data para o momento atual
				},
			});

			response.json({ message: "Job updated successfully" });
		} catch (error) {
			next(error);
		}
	}

	async delete(request: Request, response: Response, next: NextFunction) {
		try {
			const id = z.string().parse(request.params.id);

			if (!request.user?.id) {
				throw new AppError("Usuário não autenticado", 401);
			}

			const job = await prisma.job.findUnique({
				where: { id },
			});

			if (!job) {
				throw new AppError("Vaga não encontrada", 404);
			}

			// Verifica se a vaga pertence ao usuário autenticado
			if (job.user_id !== request.user.id) {
				throw new AppError(
					"Você não tem permissão para excluir esta vaga",
					403
				);
			}

			await prisma.job.delete({
				where: { id },
			});

			response.json({ message: "Vaga excluída com sucesso" });
		} catch (error) {
			next(error);
		}
	}
}
