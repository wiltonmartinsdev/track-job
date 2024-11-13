import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export type Job = {
	id: number
	company_name: string;
	position: string;
	seniority_level: string;
	status: string;
	vacancy_modality: string;
	work_regime: string;
	place: string;
	created_at?: string;
};

type JobFormProps = {
	onAdd: (job: Job) => void;
	editingJob?: Job | null;
};

const brazilianStates = [
	"Acre",
	"Alagoas",
	"Amapá",
	"Amazonas",
	"Bahia",
	"Ceará",
	"Distrito Federal",
	"Espírito Santo",
	"Goiás",
	"Maranhão",
	"Mato Grosso",
	"Mato Grosso do Sul",
	"Minas Gerais",
	"Pará",
	"Paraíba",
	"Paraná",
	"Pernambuco",
	"Piauí",
	"Rio de Janeiro",
	"Rio Grande do Norte",
	"Rio Grande do Sul",
	"Rondônia",
	"Roraima",
	"Santa Catarina",
	"São Paulo",
	"Sergipe",
	"Tocantins",
];

export default function JobForm({ onAdd, editingJob }: JobFormProps) {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<Job>({
		defaultValues: {
			company_name: "",
			position: "Desenvolvedor Front-end",
			seniority_level: "Júnior",
			status: "Enviada",
			vacancy_modality: "Remota",
			work_regime: "CLT",
			place: "", // Valor padrão para a localidade
		},
	});

	useEffect(() => {
		if (editingJob) {
            console.log("editingJob =>", editingJob);
            

			setValue("company_name", editingJob.company_name);
			setValue("position", editingJob.position);
			setValue("seniority_level", editingJob.seniority_level);
			setValue("status", editingJob.status);
			setValue("vacancy_modality", editingJob.vacancy_modality);
			setValue("work_regime", editingJob.work_regime);
			setValue("place", editingJob.place); // Setando valor da localidade
		}
	}, [editingJob, setValue]);

	const onSubmit: SubmitHandler<Job> = (data) => {
		onAdd(data);
		reset();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="p-4 bg-gray-100 shadow-md rounded">
			<div className="mb-4">
				<label className="block text-gray-700">Nome da empresa</label>
				<input
					{...register("company_name", {
						required: "Este campo é obrigatório",
					})}
					type="text"
					className="border rounded w-full p-2"
				/>
				{errors.company_name && (
					<p className="text-red-500 text-sm">
						{errors.company_name.message}
					</p>
				)}
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">Cargo</label>
				<div className="flex space-x-4">
					<label className="flex items-center">
						<input
							{...register("position", {
								required: "Este campo é obrigatório",
							})}
							type="radio"
							value="Desenvolvedor Front-end"
							className="mr-2"
						/>
						Desenvolvedor Front-end
					</label>
					<label className="flex items-center">
						<input
							{...register("position", {
								required: "Este campo é obrigatório",
							})}
							type="radio"
							value="Desenvolvedor Back-end"
							className="mr-2"
						/>
						Desenvolvedor Back-end
					</label>
					<label className="flex items-center">
						<input
							{...register("position", {
								required: "Este campo é obrigatório",
							})}
							type="radio"
							value="Desenvolvedor FullStack"
							className="mr-2"
						/>
						Desenvolvedor FullStack
					</label>
				</div>
				{errors.position && (
					<p className="text-red-500 text-sm">
						{errors.position.message}
					</p>
				)}
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">
					Nível de senioridade
				</label>
				<div className="flex space-x-4">
					<label className="flex items-center">
						<input
							{...register("seniority_level", {
								required: "Este campo é obrigatório",
							})}
							type="radio"
							value="Júnior"
							className="mr-2"
						/>
						Júnior
					</label>
					<label className="flex items-center">
						<input
							{...register("seniority_level", {
								required: "Este campo é obrigatório",
							})}
							type="radio"
							value="Pleno"
							className="mr-2"
						/>
						Pleno
					</label>
					<label className="flex items-center">
						<input
							{...register("seniority_level", {
								required: "Este campo é obrigatório",
							})}
							type="radio"
							value="Sênior"
							className="mr-2"
						/>
						Sênior
					</label>
				</div>
				{errors.seniority_level && (
					<p className="text-red-500 text-sm">
						{errors.seniority_level.message}
					</p>
				)}
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">
					Modalidade da vaga
				</label>
				<div className="flex space-x-4">
					<label className="flex items-center">
						<input
							{...register("vacancy_modality", {
								required: "Este campo é obrigatório",
							})}
							type="radio"
							value="Remota"
							className="mr-2"
						/>
						Remota
					</label>
					<label className="flex items-center">
						<input
							{...register("vacancy_modality", {
								required: "Este campo é obrigatório",
							})}
							type="radio"
							value="Híbrida"
							className="mr-2"
						/>
						Híbrida
					</label>
					<label className="flex items-center">
						<input
							{...register("vacancy_modality", {
								required: "Este campo é obrigatório",
							})}
							type="radio"
							value="Presencial"
							className="mr-2"
						/>
						Presencial
					</label>
				</div>
				{errors.vacancy_modality && (
					<p className="text-red-500 text-sm">
						{errors.vacancy_modality.message}
					</p>
				)}
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">
					Regime de trabalho
				</label>
				<div className="flex space-x-4">
					<label className="flex items-center">
						<input
							{...register("work_regime", {
								required: "Este campo é obrigatório",
							})}
							type="radio"
							value="CLT"
							className="mr-2"
						/>
						CLT
					</label>
					<label className="flex items-center">
						<input
							{...register("work_regime", {
								required: "Este campo é obrigatório",
							})}
							type="radio"
							value="PJ"
							className="mr-2"
						/>
						PJ
					</label>
				</div>
				{errors.work_regime && (
					<p className="text-red-500 text-sm">
						{errors.work_regime.message}
					</p>
				)}
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">Localidade</label>
				<select
					{...register("place", {
						required: "Este campo é obrigatório",
					})}
					className="border rounded w-full p-2">
					<option value="">Selecione um estado</option>
					{brazilianStates.map((estado) => (
						<option
							key={estado}
							value={estado}>
							{estado}
						</option>
					))}
				</select>
				{errors.place && (
					<p className="text-red-500 text-sm">
						{errors.place.message}
					</p>
				)}
			</div>

			<button
				type="submit"
				className="bg-blue-500 text-white p-2 rounded">
				Adicionar Candidatura
			</button>
		</form>
	);
}
