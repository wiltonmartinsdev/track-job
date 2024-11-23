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
			{jobs.map((job) => (
				<div
					key={job.id}
					className="p-4 bg-white shadow-md rounded-md">
					<div className="flex justify-between items-center">
						<h2 className="text-lg font-bold">
							{job.company_name}
						</h2>
						{/* <Select
							value={job.status}
							onValueChange={(value) =>
								onUpdateStatus(job.id, value)
							}>
							<SelectTrigger tabIndex={0}>
								{job.status}
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="Enviada">
										Enviada
									</SelectItem>
									<SelectItem value="Em seleção">
										Em seleção
									</SelectItem>
									<SelectItem value="Não Contratado">
										Não Contratado
									</SelectItem>
									<SelectItem value="Emprego Atual">
										Emprego Atual
									</SelectItem>
									<SelectItem value="Desligado">
										Desligado
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select> */}
					</div>
					<p className="text-sm text-gray-600">
						<span className="text-black font-black">Cargo:</span>{" "}
						{job.position}
					</p>
					<p className="text-sm text-gray-600">
						<span className="text-black font-black">
							Nível de senioridade:
						</span>{" "}
						{job.seniority_level}
					</p>
					<p className="text-sm text-gray-600">
						<span className="text-black font-black">
							Salário Inicial:
						</span>{" "}
						{getCurrencySymbol(job.payment_currency)} {""}
						{job.initial_salary} <br />
						<span className="text-black font-black">
							Salário Atual:
						</span>{" "}
						{""}
						{getCurrencySymbol(job.payment_currency)} {""}
						{job.current_salary}
					</p>
					<p className="text-sm text-gray-600">
						<span className="text-black font-black">
							Modalidade:
						</span>{" "}
						{job.vacancy_modality}
					</p>
					<p className="text-sm text-gray-600">
						<span className="text-black font-black">
							Regime de trabalho:
						</span>{" "}
						{job.work_regime}
					</p>
					<p className="text-sm text-gray-600">
						<span className="text-black font-black">
							Localidade:
						</span>{" "}
						{job.place}
					</p>
                    <p className="text-sm text-gray-600">
                        <span className="text-black font-black">Status:</span> {job.status}
                    </p>
					<p className="text-sm text-gray-600">
						<span className="text-black font-black">
							Criada em:
						</span>{" "}
						{formatDate(job.created_at)}
					</p>
					<p className="text-sm text-gray-600">
						<span className="text-black font-black">
							Atualizada:
						</span>{" "}
						{formatRelativeDate(job.updated_at)}
					</p>
					<div className="flex gap-2 mt-2">
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
										Você tem certeza que deseja excluir esta
										candidatura?
									</AlertDialogTitle>
									<AlertDialogDescription>
										Atenção! Esta ação é irreversível. Ao
										confirmar, sua candidatura será
										permanentemente excluída, e todos os
										dados associados a ela serão removidos.
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
				</div>
			))}
		</div>
	);
}
