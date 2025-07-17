import axios from "axios";

import { env } from "@/env";

export const api = axios.create({
	baseURL: env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("@TrackJob:token");

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

// Interceptor de resposta para tratar tokens expirados
api.interceptors.response.use(
	(response) => response,
	(error) => {
		// Verifica se o erro é de autenticação (401, 403 ou 404 com token presente)
		const isAuthError =
			error.response?.status === 401 ||
			error.response?.status === 403 ||
			(error.response?.status === 404 &&
				localStorage.getItem("@TrackJob:token"));

		if (isAuthError) {
			// Remove dados de autenticação
			localStorage.removeItem("@TrackJob:token");
			localStorage.removeItem("@TrackJob:user");

			// Redireciona para a página de login
			window.location.href = "/";
		}

		return Promise.reject(error);
	}
);
