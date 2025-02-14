import { hash } from "bcrypt";
import { formatInTimeZone } from "date-fns-tz";
import { NextFunction, Request, Response } from "express";
import z from "zod";

import { prisma } from "../database/prisma";
import AppError from "../utils/AppError";

export default class UserController {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const bodySchema = z.object({
				name: z
					.string({
						required_error:
							"Ops! Parece que você esqueceu de inserir seu nome. Por favor, preencha esse campo para prosseguir com o cadastro.",
					})
					.trim()
					.min(
						4,
						"Ops! Para prosseguir com o cadastro o campo 'nome' deve conter no mínimo 4 caracteres."
					),
				email: z
					.string({
						required_error:
							"Ops! Parece que você esqueceu de inserir seu e-mail. Por favor, preencha esse campo para prosseguir com o cadastro.",
					})
					.trim()
					.min(
						6,
						"Ops! Para prosseguir com o cadastro, o campo “e-mail” deve conter no mínimo 6 caracteres."
					)
					.email(
						"Ops! Parece que você adicionou um endereço inválido! Por favor, insira um e-mail válido."
					),
				password: z
					.string({
						required_error:
							"Ops! Parece que você esqueceu de criar sua senha. Por favor, preencha esse campo para prosseguir com o cadastro.",
					})
					.trim()
					.min(
						8,
						"Ops! Sua senha deve conter no mínimo 8 caracteres. Escolha uma senha mais segura."
					),
			});

			const { name, email, password } = bodySchema.parse(request.body);

			const userWithSameEmail = await prisma.users.findFirst({
				where: {
					email,
				},
			});

			if (userWithSameEmail) {
				throw new AppError(
					"Ops! Este e-mail já está em uso. Por favor, escolha outro e-mail."
				);
			}

			const hashedPassword = await hash(password, 10);

			const user = await prisma.users.create({
				data: {
					name,
					email,
					password: hashedPassword,
				},
			});

            const {password:_, ...userWithoutPassword} = user;

			response.status(201).json(userWithoutPassword);
		} catch (error) {
			next(error);
		}
	}

	// async index(request: Request, response: Response, next: NextFunction) {

	// }
}
