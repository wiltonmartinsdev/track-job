import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";

import JobForm, { Job } from "./components/JobForm";
import JobList from "./components/JobList";
import { ScrollIndicator } from "./components/ScrollIndicator";
import { api } from "./services/api";

export default function App() {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [jobEditionId, setJobEditionId] = useState<number | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	async function addJob(job: Job) {
		try {
			console.log("Enviando job:", job);
			const response = await api.post("", job);
            console.log("Resposta da API:", response.data);
			setJobs([...jobs, response.data]);
		} catch (error) {
			console.error("Erro ao adicionar job:", error);
		}
	}

	async function updateJob(job: Job) {
		if (jobEditionId !== null) {
			try {
				const response = await api.put(`/${jobEditionId}`, job);
				const updatedJobs = jobs.map((j) =>
					j.id === jobEditionId ? response.data : j
				);
				setJobs(updatedJobs);
				setJobEditionId(null);
				return response.data;
			} catch (error) {
				console.error("Erro ao atualizar job:", error);
				throw error;
			}
		}
	}

	async function handleAddJob(job: Job) {
		try {
			if (jobEditionId !== null) {
				await updateJob(job);
			} else {
				await addJob(job);
			}
			// Após adicionar/atualizar, busque os dados atualizados
			const response = await api.get("/");
			setJobs(response.data);
			setIsDialogOpen(false);
		} catch (error) {
			console.error("Erro ao processar job:", error);
		}
	}

	async function handleUpdateStatus(id: number, status: string) {
		try {
			const job = jobs.find((job) => job.id === id);
			if (!job) return;

			const now = new Date().toISOString();

			await api.put(`/${id}`, {
				...job,
				status,
				updated_at: now,
			});

			const updatedJobs = jobs.map((job) =>
				job.id === id
					? {
							...job,
							status,
							updated_at: now,
					  }
					: job
			);

			setJobs(updatedJobs);
		} catch (error) {
			console.error("Erro ao atualizar status do job:", error);
		}
	}

	function handleEditJob(id: number) {
		const jobToEdit = jobs.find((job) => job.id === id);
		if (jobToEdit) {
			setJobEditionId(id);
			setIsDialogOpen(true);
		}
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
	}, []);

	const editingJob = jobs.find((job) => job.id === jobEditionId) || null
	return (
		<div>
			<header className="bg-blue-600 text-white text-center p-4">
				<h1 className="font-roboto-flex font-black text-2xl">
					Acompanhamento de Candidaturas
				</h1>
				<p className="font-roboto-flex font-black">
					Total de candidaturas: {jobs.length}
				</p>
			</header>

			<main className="flex justify-center items-center h-[calc(100vh-88px)]">
				{!isDialogOpen && <JobForm onAdd={handleAddJob} />}
			</main>

			<ScrollIndicator
				targetSection="#jobList"
				arrowColor="#2563eb"
			/>

			<footer>
				<JobList
					jobs={jobs}
					onUpdateStatus={handleUpdateStatus}
					onEditJob={handleEditJob}
					onDeleteJob={handleDeleteJob}
				/>
			</footer>

			<Dialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Editar Trabalho</DialogTitle>
					</DialogHeader>
					<JobForm
						onAdd={handleAddJob}
						editingJob={
							editingJob
						}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
