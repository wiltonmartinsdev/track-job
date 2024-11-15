import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";
import { Job } from "../JobForm";

type JobListProps = {
	jobs: Job[];
	onUpdateStatus: (index: number, status: string) => void;
	onEditJob: (index: number) => void;
	onDeleteJob: (index: number) => void;
};

export default function JobList({
	jobs,
	onUpdateStatus,
	onEditJob,
	onDeleteJob,
}: JobListProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="text-center">Id</TableHead>
					<TableHead className="text-center">Empresa</TableHead>
					<TableHead className="text-center">Cargo</TableHead>
					<TableHead>Nível</TableHead>
					<TableHead>Modalidade</TableHead>
					<TableHead>Regime</TableHead>
					<TableHead className="text-center">Localidade</TableHead>
					<TableHead className="text-center">Data</TableHead>
					<TableHead className="text-center">Atualização</TableHead>
					<TableHead className="text-center">Status</TableHead>
					<TableHead className="text-center">Ações</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{jobs.map((job, index) => (
					<TableRow key={index}>
						<TableCell className="text-center">{job.id}</TableCell>
						<TableCell className="text-center">
							{job.company_name}
						</TableCell>
						<TableCell>{job.position}</TableCell>
						<TableCell className="text-center">
							{job.seniority_level}
						</TableCell>
						<TableCell className="text-center">
							{job.vacancy_modality}
						</TableCell>
						<TableCell className="text-center">
							{job.work_regime}
						</TableCell>
						<TableCell className="text-center">
							{job.place}
						</TableCell>
						<TableCell>{job.created_at}</TableCell>
						<TableCell>{job.updated_at}</TableCell>
						<TableCell>
							<Select
								
                                value={job.status}
								onValueChange={(value) =>
									onUpdateStatus(index, value)
								}
								>
								<SelectTrigger tabIndex={0}>{job.status}</SelectTrigger>
								<SelectContent >
									<SelectGroup>
										<SelectItem value="Enviada">
											Enviada
										</SelectItem>
										<SelectItem value="Em seleção">
											Em seleção
										</SelectItem>
										<SelectItem value="Não selecionado">
											Não selecionado
										</SelectItem>
										<SelectItem value="Contratado">
											Contratado
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</TableCell>
						<TableCell>
							<button
								onClick={() => onEditJob(index)}
								className="bg-yellow-500 text-white p-1 rounded mr-2">
								Editar
							</button>
							<button
								onClick={() => onDeleteJob(index)}
								className="bg-red-500 text-white p-1 rounded">
								Apagar
							</button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
