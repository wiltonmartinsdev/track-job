import { Request, Response, NextFunction } from "express";
import { verify, TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

import { authConfig } from "../configs/auth";
import AppError from "../utils/AppError";

interface DecodedToken {
	sub: string;
	iat: number;
	exp: number;
}

export default function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		const authHeader = request.headers.authorization;

		if (!authHeader) {
			throw new AppError("Token de acesso requerido", 401);
		}

		// Verifica se o header está no formato correto
		if (!authHeader.startsWith("Bearer ")) {
			throw new AppError(
				"Formato de token inválido. Use: Bearer <token>",
				401
			);
		}

		const token = authHeader.replace("Bearer ", "");

		if (!token || token.trim() === "") {
			throw new AppError("Token não fornecido", 401);
		}

		// Verifica e decodifica o token com opções adicionais de segurança
		const decoded = verify(
			token,
			authConfig.jwt.secret,
			authConfig.jwt.verifyOptions
		) as DecodedToken;

		// Adiciona o usuário ao request
		request.user = {
			id: String(decoded.sub),
		};

		return next();
	} catch (error) {
		// Tratamento específico para diferentes tipos de erro JWT
		if (error instanceof TokenExpiredError) {
			throw new AppError("Token expirado. Faça login novamente", 401);
		}

		if (error instanceof JsonWebTokenError) {
			throw new AppError("Token inválido. Faça login novamente", 401);
		}

		// Se for um AppError, re-lança
		if (error instanceof AppError) {
			throw error;
		}

		// Erro genérico
		throw new AppError("Erro na validação do token", 401);
	}
}
