import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export type Job = {
	empresa: string;
	cargo: string;
	nivel: string;
	status: string;
	modalidade: string;
	regime: string;
	localidade: string;
	dataAplicacao?: string;
};

type JobFormProps = {
	onAdd: (job: Job) => void;
	editingJob?: Job | null;
};

const estadosBrasileiros = [
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
			empresa: "",
			cargo: "Desenvolvedor Front-end",
			nivel: "Júnior",
			status: "Enviada",
			modalidade: "Remota",
			regime: "CLT",
			localidade: "", // Valor padrão para a localidade
		},
	});

	useEffect(() => {
		if (editingJob) {
			setValue("empresa", editingJob.empresa);
			setValue("cargo", editingJob.cargo);
			setValue("nivel", editingJob.nivel);
			setValue("status", editingJob.status);
			setValue("modalidade", editingJob.modalidade);
			setValue("regime", editingJob.regime);
			setValue("localidade", editingJob.localidade); // Setando valor da localidade
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
					{...register("empresa", {
						required: "Este campo é obrigatório",
					})}
					type="text"
					className="border rounded w-full p-2"
				/>
				{errors.empresa && (
					<p className="text-red-500 text-sm">
						{errors.empresa.message}
					</p>
				)}
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">Cargo</label>
				<div className="flex space-x-4">
					<label className="flex items-center">
						<input
							{...register("cargo", {
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
							{...register("cargo", {
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
							{...register("cargo", {
								required: "Este campo é obrigatório",
							})}
							type="radio"
							value="Desenvolvedor FullStack"
							className="mr-2"
						/>
						Desenvolvedor FullStack
					</label>
				</div>
				{errors.cargo && (
					<p className="text-red-500 text-sm">
						{errors.cargo.message}
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
							{...register("nivel", {
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
							{...register("nivel", {
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
							{...register("nivel", {
								required: "Este campo é obrigatório",
							})}
							type="radio"
							value="Sênior"
							className="mr-2"
						/>
						Sênior
					</label>
				</div>
				{errors.nivel && (
					<p className="text-red-500 text-sm">
						{errors.nivel.message}
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
							{...register("modalidade", {
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
							{...register("modalidade", {
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
							{...register("modalidade", {
								required: "Este campo é obrigatório",
							})}
							type="radio"
							value="Presencial"
							className="mr-2"
						/>
						Presencial
					</label>
				</div>
				{errors.modalidade && (
					<p className="text-red-500 text-sm">
						{errors.modalidade.message}
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
							{...register("regime", {
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
							{...register("regime", {
								required: "Este campo é obrigatório",
							})}
							type="radio"
							value="PJ"
							className="mr-2"
						/>
						PJ
					</label>
				</div>
				{errors.regime && (
					<p className="text-red-500 text-sm">
						{errors.regime.message}
					</p>
				)}
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">Localidade</label>
				<select
					{...register("localidade", {
						required: "Este campo é obrigatório",
					})}
					className="border rounded w-full p-2">
					<option value="">Selecione um estado</option>
					{estadosBrasileiros.map((estado) => (
						<option
							key={estado}
							value={estado}>
							{estado}
						</option>
					))}
				</select>
				{errors.localidade && (
					<p className="text-red-500 text-sm">
						{errors.localidade.message}
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
