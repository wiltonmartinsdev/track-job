import { api } from "@/lib/axios";
import { Job } from "@/components/JobForm";

interface ApiError {
	response?: {
		data?: {
			message?: string;
		};
	};
}

export const jobService = {
	async create(job: Job): Promise<Job> {
		try {
			const response = await api.post("/job", job);
			return response.data;
		} catch (error) {
			const apiError = error as ApiError;
			// Se o erro for de autenticação, o interceptor já cuidará do logout
			throw new Error(
				apiError.response?.data?.message || "Erro ao criar candidatura"
			);
		}
	},

	async update(id: string, job: Job): Promise<Job> {
		try {
			const response = await api.put(`/job/${id}`, job);
			return response.data;
		} catch (error) {
			const apiError = error as ApiError;
			throw new Error(
				apiError.response?.data?.message ||
					"Erro ao atualizar candidatura"
			);
		}
	},

	async fetch(): Promise<Job[]> {
		try {
			const response = await api.get("/job");
			return response.data;
		} catch (error) {
			const apiError = error as ApiError;
			throw new Error(
				apiError.response?.data?.message ||
					"Erro ao carregar candidaturas"
			);
		}
	},

	async delete(id: string): Promise<void> {
		try {
			await api.delete(`/job/${id}`);
		} catch (error) {
			const apiError = error as ApiError;
			throw new Error(
				apiError.response?.data?.message ||
					"Erro ao excluir candidatura"
			);
		}
	},
};
