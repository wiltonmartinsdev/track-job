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

    console.log("jobs =>", jobs);
    

	return (
        
        
        

		<table className="w-full text-left mt-4">
			<thead>
				<tr className="bg-gray-200">
					<th className="p-2">Nome da Empresa</th>
					<th className="p-2">Cargo</th>
					<th className="p-2">Nível de Senioridade</th>
					<th className="p-2">Modalidade</th>
					<th className="p-2">Regime</th>
					<th className="p-2">Localidade</th>
					<th className="p-2">Data da candidatura</th>
					<th className="p-2">Status</th>
					<th className="p-2">Ações</th>
				</tr>
			</thead>
			<tbody>
				{jobs.map((job, index) => (
					<tr
						key={index}
						className="border-t">
						<td className="p-2">{job.company_name}</td>
						<td className="p-2">{job.position}</td>
						<td className="p-2">{job.seniority_level}</td>
						<td className="p-2">{job.vacancy_modality}</td>
						<td className="p-2">{job.work_regime}</td>
						<td className="p-2">{job.place}</td>
						<td className="p-2">{job.created_at}</td>
						<td className="p-2">
							<select
								value={job.status}
								onChange={(e) =>
									onUpdateStatus(index, e.target.value)
								}
								className="border rounded p-1">
								<option value="Enviada">Enviada</option>
								<option value="Em seleção">Em seleção</option>
								<option value="Não selecionado">
									Não selecionado
								</option>
								<option value="Contratado">Contratado</option>
							</select>
						</td>
						<td className="p-2">
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
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
