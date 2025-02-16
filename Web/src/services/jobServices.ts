import { api } from "@/lib/axios";
import { Job } from "@/components/JobForm";

export const jobService = {
	async create(job: Job) {
		const response = await api.post("/job", job);
		return response.data;
	},

	async update(id: string, job: Job) {
		const response = await api.put(`/job/${id}`, job);
		return response.data;
	},

	async fetch() {
		const response = await api.get("/job");
		return response.data;
	},

	async delete(id: string) {
		return await api.delete(`/job/${id}`);
	},
};
