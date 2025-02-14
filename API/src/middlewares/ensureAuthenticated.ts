import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "../configs/auth";
import AppError from "../utils/AppError";

export default function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		const authHeader = request.headers.authorization;

		if (!authHeader) {
			throw new AppError("JWT token não informado!", 401);
		}

		const [, token] = authHeader.split(" ");

		const { sub: user_id } = verify(token, authConfig.jwt.secret);

		request.user = {
			id: String(user_id),
		};

		return next();
	} catch (error) {
		throw new AppError("JWT token inválido!", 401);
	}
}
