import { SignOptions } from "jsonwebtoken";

interface AuthConfig {
	jwt: {
		secret: string;

		// Tipo alinhado com a biblioteca jsonwebtoken
		expiresIn: SignOptions["expiresIn"];
	};
}

export const authConfig: AuthConfig = {
	jwt: {
		secret: process.env.AUTH_SECRET || "default",

		// Valor válido (string no formato esperado pelo JWT)
		expiresIn: "1d",
	},
};
