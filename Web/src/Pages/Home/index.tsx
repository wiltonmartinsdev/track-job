import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

import { useAuth } from "@/contexts/auth";
import { HamburgerMenu } from "@/components/HamburgerMenu";
import { Footer } from "@/components/Footer";
import Logo from "@/assets/logo.svg?react";
import LogoutIcon from "@/assets/logout-icon.svg";
import UserIcon from "@/assets/user-icon.svg";

import JobForm, { Job } from "../../components/JobForm";
import JobList from "../../components/JobList";
import { jobService } from "../../services/jobServices";
import { notify } from "../../utils/notifications";

export default function Home() {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [jobEditionId, setJobEditionId] = useState<string | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const { signOut, user } = useAuth();

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
					`Alterações na empresa ${job.company_name} foram realizadas com sucesso!`
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
			setJobEditionId(null);
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

    console.log("editingJob =>", editingJob)

	useEffect(() => {
		loadJobs();
	}, []);

	return (
		<div className="min-h-screen flex flex-col pb-14">
			<header className="sm:flex sm:justify-around sm:items-center bg-blue-600 py-4 text-white">
				<div className="flex justify-around items-center">
					<Logo
						className="w-36 sm:w-32 lg:w-40 xl:w-52"
						style={
							{ "--job-color": "#FFFFFF" } as React.CSSProperties
						}
					/>

					<div className="sm:hidden">
						<HamburgerMenu />
					</div>
				</div>

				<p className="font-roboto-flex font-black text-center sm:hidden">
					Total de candidaturas: {jobs.length}
				</p>

				<div className="hidden sm:block">
					<p className="font-roboto-flex font-black text-xl">
						Acompanhamento de Candidaturas
					</p>
					<p className="font-roboto-flex font-black text-center">
						Total: {jobs.length}
					</p>
				</div>

				<div
					className=" hidden sm:flex sm:gap-2 sm:items-center"
					title="Minha Conta">
					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center gap-1">
							<img
								src={UserIcon}
								alt=""
							/>
							<div className="flex flex-col">
								<span className="text-left font-roboto-flex font-black italic">
									Olá,{" "}
									{user?.name?.split(" ")[0].toUpperCase()}
								</span>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								className="flex items-center justify-center"
								onClick={signOut}>
								<img
									src={LogoutIcon}
									alt="Ícone de logout"
								/>
								<div className="">Sair</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>

			<main className="min-w-80 flex justify-center items-center lg:mt-10 sm:px-24">
				{!isDialogOpen && <JobForm onAdd={handleJobSubmission} />}
			</main>

			<section className="sm:mx-auto sm:w-[85%] lg:w-[70%] xl:w-1/2">
				<JobList
					jobs={jobs}
					onEditJob={handleEditJob}
					onDeleteJob={handleDeleteJob}
				/>

				<Dialog
					open={isDialogOpen}
					onOpenChange={(open) => {
						setIsDialogOpen(open);
						if (!open) {
							setJobEditionId(null);
						}
					}}>
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
			</section>

			<Footer />
		</div>
	);
}
