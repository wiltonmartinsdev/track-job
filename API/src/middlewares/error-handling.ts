import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

import AppError from "../utils/AppError";

interface ErrorResponse {
	success: boolean;
	message: string;
	code?: string;
	issues?: any;
}

export default function errorHandling(
	error: any,
	request: Request,
	response: Response,
	_: NextFunction
) {
	if (error instanceof AppError) {
		const errorResponse: ErrorResponse = {
			success: false,
			message: error.message,
		};

		// Adiciona códigos específicos para erros de autenticação
		if (error.statusCode === 401) {
			if (error.message.includes("expirado")) {
				errorResponse.code = "TOKEN_EXPIRED";
			} else if (error.message.includes("inválido")) {
				errorResponse.code = "INVALID_TOKEN";
			} else if (
				error.message.includes("requerido") ||
				error.message.includes("fornecido")
			) {
				errorResponse.code = "TOKEN_MISSING";
			} else {
				errorResponse.code = "AUTHENTICATION_ERROR";
			}
		}

		response.status(error.statusCode).json(errorResponse);
	} else if (error instanceof ZodError) {
		response.status(400).json({
			success: false,
			message: "Dados de entrada inválidos",
			issues: error.format(),
		});
	} else {
		// Log do erro para debugging
		console.error("Erro interno:", error);

		response.status(500).json({
			success: false,
			message: "Erro interno do servidor",
		});
	}
}
