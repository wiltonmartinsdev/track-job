import { Request, Response, NextFunction } from "express";

import { prisma } from "../database/prisma";

export default class AuthController {
	/**
	 * Endpoint para validar se o token ainda é válido
	 * Útil para verificações do frontend
	 */
	async validateToken(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		try {
			// Se chegou até aqui, o token é válido (passou pelo middleware)
			if (!request.user) {
				response.status(401).json({
					success: false,
					message: "Usuário não autenticado",
				});
				return;
			}

			response.json({
				success: true,
				message: "Token válido",
				userId: request.user.id,
				timestamp: new Date().toISOString(),
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Endpoint para refresh de informações do usuário
	 * Retorna dados atualizados do usuário logado
	 */
	async me(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		try {
			if (!request.user) {
				response.status(401).json({
					success: false,
					message: "Usuário não autenticado",
				});
				return;
			}

			const user = await prisma.users.findUnique({
				where: {
					id: request.user.id,
				},
				select: {
					id: true,
					name: true,
					email: true,
					avatar: true,
					created_at: true,
					updated_at: true,
				},
			});

			if (!user) {
				response.status(404).json({
					success: false,
					message: "Usuário não encontrado",
				});
				return;
			}

			response.json({
				success: true,
				user,
			});
		} catch (error) {
			next(error);
		}
	}
}
