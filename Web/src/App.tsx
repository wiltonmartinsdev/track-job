import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";

import JobForm, { Job } from "./components/JobForm";
import JobList from "./components/JobList";
import { jobService } from "./services/jobServices";
import { notify } from "./utils/notifications";

export default function App() {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [jobEditionId, setJobEditionId] = useState<string | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	async function loadJobs() {
		try {
			const data = await jobService.fetch();
			setJobs(data);
		} catch (error) {
			notify.error(error as Error);
		}
	}

	async function handleJobSubmission(job: Job) {
		try {
			if (jobEditionId) {
				const updatedJob = await jobService.update(jobEditionId, job);
				setJobs(
					jobs.map((j) => (j.id === jobEditionId ? updatedJob : j))
				);
				notify.success(
					`Alterações na empresa ${job.company_name} realizadas com sucesso!`
				);
			} else {
				const newJob = await jobService.create(job);
				setJobs([...jobs, newJob]);
				notify.success(
					`Candidatura na empresa ${job.company_name} cadastrada com sucesso!`
				);
			}

			await loadJobs();
			setIsDialogOpen(false);
		} catch (error) {
			notify.error(error as Error);
		}
	}

	async function handleDeleteJob(id: string, company_name: string) {
		try {
			await jobService.delete(id);
			setJobs(jobs.filter((job) => job.id !== id));
			notify.success(
				`A candidatura na empresa ${company_name} foi excluída com sucesso!`
			);
		} catch (error) {
			notify.error(error as Error);
		}
	}

	function handleEditJob(id: string) {
		const jobToEdit = jobs.find((job) => job.id === id);
		if (jobToEdit) {
			setJobEditionId(id);
			setIsDialogOpen(true);
		}
	}

	const editingJob = jobs.find((job) => job.id === jobEditionId) || null;

	useEffect(() => {
		loadJobs();
	}, []);

	return (
		<div className="min-h-screen flex flex-col">
			<header className="bg-blue-600 text-white text-center p-4 mb-10 sm:m-0">
				<h1 className="font-roboto-flex font-black text-2xl">
					Track Job
				</h1>
				<p className="font-roboto-flex font-black text-xl">
					Acompanhamento de Candidaturas
				</p>
				<p className="font-roboto-flex font-black">
					Total: {jobs.length}
				</p>
			</header>

			<main className="min-w-80 flex justify-center items-center lg:mt-10 sm:px-24">
				{!isDialogOpen && <JobForm onAdd={handleJobSubmission} />}
			</main>

			<footer className="sm:mx-auto sm:w-[85%] lg:w-[70%] xl:w-1/2">
				<JobList
					jobs={jobs}
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
						onAdd={handleJobSubmission}
						editingJob={editingJob}
						isInModal
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
