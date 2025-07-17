import jwt from "jsonwebtoken";

/**
 * Utilitários para trabalhar com tokens JWT
 */
export class TokenUtils {
	/**
	 * Verifica se um token está expirado
	 * @param token - Token JWT para verificar
	 * @returns true se o token estiver expirado, false caso contrário
	 */
	static isTokenExpired(token: string): boolean {
		try {
			const decoded = jwt.decode(token) as { exp?: number };

			if (!decoded || !decoded.exp) {
				return true; // Token inválido
			}

			// Verifica se o token expirou (exp está em segundos, Date.now() em ms)
			return decoded.exp * 1000 < Date.now();
		} catch {
			return true; // Erro ao decodificar = token inválido
		}
	}

	/**
	 * Extrai informações do payload do token sem verificar a assinatura
	 * @param token - Token JWT
	 * @returns Payload do token ou null se inválido
	 */
	static getTokenPayload(token: string): any | null {
		try {
			return jwt.decode(token);
		} catch {
			return null;
		}
	}

	/**
	 * Calcula quantos minutos restam até o token expirar
	 * @param token - Token JWT
	 * @returns Minutos até expiração ou 0 se já expirado
	 */
	static getMinutesUntilExpiration(token: string): number {
		try {
			const decoded = jwt.decode(token) as { exp?: number };

			if (!decoded || !decoded.exp) {
				return 0;
			}

			const expirationTime = decoded.exp * 1000; // Converter para ms
			const currentTime = Date.now();
			const timeDiff = expirationTime - currentTime;

			// Se já expirou, retorna 0
			if (timeDiff <= 0) {
				return 0;
			}

			// Converte de ms para minutos
			return Math.floor(timeDiff / (1000 * 60));
		} catch {
			return 0;
		}
	}
}
