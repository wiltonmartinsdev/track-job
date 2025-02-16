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
