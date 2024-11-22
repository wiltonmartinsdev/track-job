import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

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
			const response = await api.post("", job);

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
				const updatedJob = await updateJob(job);

				setJobs(
					jobs.map((j) => (j.id === jobEditionId ? updatedJob : j))
				);
				toast.success(
					`Suas alterações na empresa ${job.company_name} foram realizadas com sucesso!`
				);
			} else {
				await addJob(job);
				toast.success("Sua candidatura foi cadastrada com sucesso!");
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
			toast.success(
				`Suas alterações na empresa ${job.company_name} foram realizadas com sucesso!`
			);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const serverError = error as AxiosError<{ message: string }>;
				if (
					serverError.response &&
					serverError.response.status === 400
				) {
					const errorMessage = serverError.response.data.message;
					toast.warning(errorMessage);
				} else {
					console.error("Erro ao atualizar status do job:", error);
					toast.warning("Erro ao atualizar status do job");
				}
			} else {
				console.error("Erro inesperado:", error);
				toast.warning("Erro inesperado ao atualizar status do job");
			}
		}
	}

	function handleEditJob(id: number) {
		const jobToEdit = jobs.find((job) => job.id === id);
		if (jobToEdit) {
			setJobEditionId(id);
			setIsDialogOpen(true);
		}
	}

	async function handleDeleteJob(id: number, company_name: string) {
		try {
			await api.delete(`/${id}`);
			const updatedJobs = jobs.filter((job) => job.id !== id);
			setJobs(updatedJobs);
			toast.success(
				`A sua candidatura na empresa ${company_name} foi excluída com sucesso!`
			);
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

	const editingJob = jobs.find((job) => job.id === jobEditionId) || null;
	return (
		<div>
			<header className="bg-blue-600 text-white text-center p-4">
				<h1 className="font-roboto-flex font-black text-2xl">
					Track Job - Acompanhamento de Candidaturas
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
						<DialogTitle className="text-center">
							Editar Candidatura
						</DialogTitle>
					</DialogHeader>
					<JobForm
						onAdd={handleAddJob}
						editingJob={editingJob}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
