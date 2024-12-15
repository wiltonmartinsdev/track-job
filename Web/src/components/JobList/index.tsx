import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

import { getCurrencySymbol } from "../../utils/currencyUtils";
import { Button } from "../ui/button";
import { Job } from "../JobForm";

type JobListProps = {
	jobs: Job[];
	onEditJob: (id: string) => void;
	onDeleteJob: (id: string, company_name: string) => void;
};

export default function JobList({
	jobs,
	onEditJob,
	onDeleteJob,
}: JobListProps) {
	function formatDate(dateString: string | undefined): string {
		if (!dateString) {
			return "-";
		}
		return new Date(dateString).toLocaleDateString("pt-BR");
	}

	function formatRelativeDate(dateString: string | undefined): string {
		if (!dateString) {
			return "-";
		}
		const relativeDate = formatDistance(new Date(dateString), new Date(), {
			locale: ptBR,
		});
		return `Há ${relativeDate.replace(
			"menos de um minuto",
			"menos de 1 min"
		)}`;
	}

	return (
		<div className="flex flex-col gap-4">
			<Accordion
				type="single"
				collapsible
				className="w-full px-8">
				{jobs.map((job) => (
					<AccordionItem
						key={job.id}
						value={`item-${job.id}`}>
						<AccordionTrigger className="text-blue-600 text-xl">
							{job.company_name}
						</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-1">
								<p>
									<strong>Cargo:</strong> {job.position}
								</p>
								<p>
									<strong>Nível de senioridade:</strong>{" "}
									{job.seniority_level}
								</p>
								<p>
									<strong>Salário Inicial:</strong>{" "}
									{getCurrencySymbol(job.payment_currency)}{" "}
									{""}
									{job.initial_salary}
								</p>
								<p>
									<strong>Salário Atual:</strong>{" "}
									{getCurrencySymbol(job.payment_currency)}{" "}
									{""}
									{job.current_salary}
								</p>
								<p>
									<strong>Modalidade:</strong>{" "}
									{job.vacancy_modality}
								</p>
								<p>
									<strong>Regime de trabalho:</strong>{" "}
									{job.work_regime}
								</p>
								<p>
									<strong>Localidade:</strong> {job.place}
								</p>
								<p>
									<strong>Status:</strong> {job.status}
								</p>
								<p>
									<strong>Criada em:</strong>{" "}
									{formatDate(job.created_at)}
								</p>
								<p>
									<strong>Atualizada:</strong>{" "}
									{formatRelativeDate(job.updated_at)}
								</p>
							</div>
							{/* Botões de ação */}
							<div className="flex gap-2 mt-2 justify-center">
								<Button
									tabIndex={0}
									onClick={() => onEditJob(job.id)}
									className="hover:bg-yellow-500 focus-visible:ring-blue-400 focus-visible:ring-4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="26"
										height="26"
										viewBox="0 0 20 20">
										<path
											fill="#fff"
											d="M5.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm-.5 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5M4.5 4A2.5 2.5 0 0 0 2 6.5v7A2.5 2.5 0 0 0 4.5 16h4.975c.11-.361.283-.7.51-1H4.5A1.5 1.5 0 0 1 3 13.5v-7A1.5 1.5 0 0 1 4.5 5h11A1.5 1.5 0 0 1 17 6.5v2.503a2.9 2.9 0 0 1 1 .13V6.5A2.5 2.5 0 0 0 15.5 4zm6.48 11.377l4.83-4.83a1.87 1.87 0 1 1 2.644 2.646l-4.83 4.829a2.2 2.2 0 0 1-1.02.578l-1.498.374a.89.89 0 0 1-1.079-1.078l.375-1.498a2.2 2.2 0 0 1 .578-1.02"
										/>
									</svg>
									Editar
								</Button>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button
											tabIndex={0}
											className="hover:bg-red-600 focus-visible:ring-blue-400 focus-visible:ring-4">
											<svg
												className="hover-red"
												xmlns="http://www.w3.org/2000/svg"
												width="26"
												height="26"
												viewBox="0 0 24 24">
												<path
													fill="#fff"
													fill-rule="evenodd"
													d="m6.774 6.4l.812 13.648a.8.8 0 0 0 .798.752h7.232a.8.8 0 0 0 .798-.752L17.226 6.4h1.203l-.817 13.719A2 2 0 0 1 15.616 22H8.384a2 2 0 0 1-1.996-1.881L5.571 6.4zM9.5 9h1.2l.5 9H10zm3.8 0h1.2l-.5 9h-1.2zM4.459 2.353l15.757 2.778a.5.5 0 0 1 .406.58L20.5 6.4L3.758 3.448l.122-.69a.5.5 0 0 1 .579-.405m6.29-1.125l3.94.695a.5.5 0 0 1 .406.58l-.122.689l-4.924-.869l.122-.689a.5.5 0 0 1 .579-.406z"
												/>
											</svg>
											Excluir
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Você tem certeza que deseja
												excluir esta candidatura?
											</AlertDialogTitle>
											<AlertDialogDescription>
												Atenção! Esta ação é
												irreversível. Ao confirmar, sua
												candidatura será permanentemente
												excluída, e todos os dados
												associados a ela serão
												removidos.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>
												Cancelar
											</AlertDialogCancel>
											<AlertDialogAction
												onClick={() =>
													onDeleteJob(
														job.id,
														job.company_name
													)
												}
												className="hover:bg-red-600 focus-visible:ring-blue-400 focus-visible:ring-4">
												<svg
													className="hover-red"
													xmlns="http://www.w3.org/2000/svg"
													width="26"
													height="26"
													viewBox="0 0 24 24">
													<path
														fill="#fff"
														fill-rule="evenodd"
														d="m6.774 6.4l.812 13.648a.8.8 0 0 0 .798.752h7.232a.8.8 0 0 0 .798-.752L17.226 6.4h1.203l-.817 13.719A2 2 0 0 1 15.616 22H8.384a2 2 0 0 1-1.996-1.881L5.571 6.4zM9.5 9h1.2l.5 9H10zm3.8 0h1.2l-.5 9h-1.2zM4.459 2.353l15.757 2.778a.5.5 0 0 1 .406.58L20.5 6.4L3.758 3.448l.122-.69a.5.5 0 0 1 .579-.405m6.29-1.125l3.94.695a.5.5 0 0 1 .406.58l-.122.689l-4.924-.869l.122-.689a.5.5 0 0 1 .579-.406z"
													/>
												</svg>
												Excluir
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
