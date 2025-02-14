import { compare } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { sign, SignOptions } from "jsonwebtoken";
import z from "zod";

import { authConfig } from "../configs/auth";
import { prisma } from "../database/prisma";
import AppError from "../utils/AppError";

export default class SessionsController {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const bodySchema = z.object({
				email: z
					.string({
						required_error:
							"Ops! Parece que você esqueceu de inserir seu e-mail. Por favor, preencha esse campo para prosseguir com o login.",
					})
					.trim()
					.min(
						6,
						"Ops! Para prosseguir com o login, o campo “e-mail” deve conter no mínimo 6 caracteres."
					)
					.email(
						"Ops! Parece que você adicionou um endereço inválido! Por favor, insira um e-mail válido."
					),
				password: z
					.string({
						required_error:
							"Ops! Parece que você esqueceu de inserir sua senha. Por favor, preencha esse campo para prosseguir com o login.",
					})
					.trim()
					.min(
						8,
						"Ops! Sua senha deve conter no mínimo 8 caracteres."
					),
			});

			const { email, password } = bodySchema.parse(request.body);

			const user = await prisma.users.findFirst({
				where: {
					email,
				},
			});

			if (!user) {
				throw new AppError(
					"Credencias inválidas. Confira os dados inseridos!",
					401
				);
			}

			const passwordMatched = await compare(password, user.password);

			if (!passwordMatched) {
				throw new AppError(
					"Credencias inválidas. Confira os dados inseridos!",
					401
				);
			}

			const { secret, expiresIn } = authConfig.jwt;

			const token = sign({}, secret, {
				subject: String(user.id),
				expiresIn,
			});

			const { password: hashedPassword, ...userWithoutPassword } = user;

			return response.json({user: userWithoutPassword, token });
		} catch (error) {
			next(error);
		}
	}
}
