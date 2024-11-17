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
import { Button } from "../ui/button";
import { Job } from "../JobForm";

type JobListProps = {
	jobs: Job[];
	onUpdateStatus: (id: number, status: string) => void;
	onEditJob: (id: number) => void;
	onDeleteJob: (id: number) => void;
};

export default function JobList({
	jobs,
	onUpdateStatus,
	onEditJob,
	onDeleteJob,
}: JobListProps) {
    function formatDate(dateString: string | undefined): string {
        if (!dateString) {
          return '-';
        }
        return new Date(dateString).toLocaleDateString('pt-BR');
      }

	return (
		<Table
			id="jobList"
			className="scroll-mt-[35px]">
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
						<TableCell>{formatDate(job.created_at)}</TableCell>
						<TableCell>{formatDate(job.updated_at)}</TableCell>
						<TableCell>
							<Select
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
										<SelectItem value="Contratado">
											Contratado
										</SelectItem>
										<SelectItem value="Não Contratado">
											Não Contratado
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</TableCell>
						<TableCell className="flex flex-col gap-2 cursor-pointer">
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

							<Button
								tabIndex={0}
								onClick={() => onDeleteJob(index)}
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
								</svg>{" "}
								Apagar
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
