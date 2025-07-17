import { Request, Response, NextFunction } from "express";

interface AuthLogRequest extends Request {
	user?: {
		id: string;
	};
}

/**
 * Middleware para log de atividades de autenticação
 * Útil para monitoramento e debug em produção
 */
export default function authLogger(
	request: AuthLogRequest,
	response: Response,
	next: NextFunction
) {
	const originalSend = response.send;
	const startTime = Date.now();

	// Override do método send para capturar a resposta
	response.send = function (data: any) {
		const endTime = Date.now();
		const duration = endTime - startTime;
		const statusCode = response.statusCode;

		// Log apenas para erros de autenticação ou sucesso
		if (statusCode === 401 || statusCode === 403 || statusCode === 200) {
			const logData = {
				timestamp: new Date().toISOString(),
				method: request.method,
				url: request.url,
				ip: request.ip || request.connection.remoteAddress,
				userAgent: request.headers["user-agent"],
				userId: request.user?.id || "anonymous",
				statusCode,
				duration: `${duration}ms`,
				action: statusCode === 200 ? "auth_success" : "auth_failure",
			};

			// Em produção, você poderia enviar isso para um serviço de log
			if (process.env.NODE_ENV === "development") {
				console.log("🔐 Auth Log:", JSON.stringify(logData, null, 2));
			}
		}

		return originalSend.call(this, data);
	};

	next();
}
