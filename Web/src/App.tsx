import { useState, useEffect } from "react";

import JobForm, { Job } from "./components/JobForm";
import JobList from "./components/JobList";
import { api } from "./services/api";

export default function App() {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [jobEditionId, setJobEditionId] = useState<number | null>(null);

	async function addJob(job: Job) {
		try {
			const response = await api.post("", job);
			setJobs([...jobs, response.data]);
		} catch (error) {
			console.error("Erro ao adicionar job:", error);
		}
	}

	async function updateJob(job: Job) {
		if (jobEditionId !== null) {
			try {
				await api.put(`/${jobEditionId}`, job);
				const updatedJobs = jobs.map((j, index) =>
					index === jobEditionId ? job : j
				);
				setJobs(updatedJobs);
				setJobEditionId(null);
			} catch (error) {
				console.error("Erro ao atualizar job:", error);
			}
		}
	}

	function handleAddJob(job: Job) {
		if (jobEditionId !== null) {
			updateJob(job);
		} else {
			addJob(job);
		}
	}

	async function handleUpdateStatus(index: number, status: string) {
		const job = jobs[index];
		try {
			await api.put(`/${job.id}`, { ...job, status });
			const updatedJobs = jobs.map((j, i) =>
				i === index ? { ...j, status } : j
			);
			setJobs(updatedJobs);
		} catch (error) {
			console.error("Erro ao atualizar status do job:", error);
		}
	}

	function handleEditJob(id: number) {
		setJobEditionId(id);
	}

	async function handleDeleteJob(id: number) {
		try {
			await api.delete(`/${id}`);
			const updatedJobs = jobs.filter((job) => job.id !== id);
			setJobs(updatedJobs);
		} catch (error) {
			console.error("Erro ao deletar job:", error);
		}
	}

	// Carregar jobs do back-end ao montar o componente
	useEffect(() => {
		async function fetchJobs() {
			try {
				const response = await api.get("/");

				setJobs(response.data);
			} catch (error) {
				console.error("Erro ao carregar jobs:", error);
			}
		}
		fetchJobs();
	}, [jobs]);

	const editingJob = jobEditionId !== null ? jobs[jobEditionId] : null;
	return (
		<div>
			<header className="bg-blue-600 text-white text-center p-4">
				<h1 className="text-2xl">Acompanhamento de Candidaturas</h1>
				<p>Total de candidaturas: {jobs.length}</p>
			</header>

			<JobForm
				onAdd={handleAddJob}
				editingJob={editingJob}
			/>
			<JobList
				jobs={jobs}
				onUpdateStatus={handleUpdateStatus}
				onEditJob={handleEditJob}
				onDeleteJob={handleDeleteJob}
			/>
		</div>
	);
}
