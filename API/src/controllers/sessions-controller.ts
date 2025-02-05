import { NextFunction, Request, Response } from "express";
import { sign, SignOptions } from "jsonwebtoken";

import { authConfig } from "../configs/auth";
import AppError from "../utils/AppError";

export default class SessionsController {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const { email, password } = request.body;

			const fakeUser = {
				id: 1,
				email: "email@email.com",
				password: "12345678",
			};

			if (email !== fakeUser.email || password !== fakeUser.password) {
				throw new AppError("Email e/ou senha incorretos!", 401);
			}

			const { secret, expiresIn } = authConfig.jwt;

            const option: SignOptions ={
                expiresIn,
                subject: String(fakeUser.id),
            }

			const token = sign({}, secret, option);

			response.json({ token });
		} catch (error) {
			next(error);
		}
	}
}
