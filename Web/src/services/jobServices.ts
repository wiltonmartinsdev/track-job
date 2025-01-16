import { api } from "@/services/api";
import { Job } from "@/components/JobForm";

export const jobService = {
	async create(job: Job) {
		const response = await api.post("", job);
		return response.data;
	},

	async update(id: string, job: Job) {
		const response = await api.put(`/${id}`, job);
		return response.data;
	},

	async fetch() {
		const response = await api.get("/");
		return response.data;
	},

	async delete(id: string) {
		return await api.delete(`/${id}`);
	},
};
