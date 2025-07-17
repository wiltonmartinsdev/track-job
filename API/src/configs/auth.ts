import { SignOptions, VerifyOptions } from "jsonwebtoken";

import { env } from "../../env";

interface AuthConfig {
	jwt: {
		secret: string;
		expiresIn: SignOptions["expiresIn"];
		signOptions: SignOptions;
		verifyOptions: VerifyOptions;
	};
}

export const authConfig: AuthConfig = {
	jwt: {
		secret: env.JWT_SECRET,
		expiresIn: "1d",

		// Opções para assinatura do token
		signOptions: {
			issuer: "track-job-api",
			audience: "track-job-web",
			algorithm: "HS256",
		},

		// Opções para verificação do token
		verifyOptions: {
			issuer: "track-job-api",
			audience: "track-job-web",
			algorithms: ["HS256"],
			clockTolerance: 60, // Tolerância de 60 segundos para diferenças de relógio
		},
	},
};
