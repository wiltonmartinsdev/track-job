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
	onUpdateStatus: (id: number, status: string) => void;
	onEditJob: (id: number) => void;
	onDeleteJob: (id: number, company_name: string) => void;
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
						<AccordionTrigger>{job.company_name}</AccordionTrigger>
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
									Editar
								</Button>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button
											tabIndex={0}
											className="hover:bg-red-600 focus-visible:ring-blue-400 focus-visible:ring-4">
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
