import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

import AppError from "../utils/AppError";

export default function errorHandling(
	error: any,
	request: Request,
	response: Response,
	_: NextFunction
) {
	if (error instanceof AppError) {
		response.status(error.statusCode).json({ message: error.message });
	} else if (error instanceof ZodError) {
		response
			.status(400)
			.json({ message: "Validation error", issues: error.format() });
	} else {
		response.status(500).json({ message: error.message });
	}
}
