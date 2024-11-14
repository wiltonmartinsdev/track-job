import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Input } from "../ui/input";

export type Job = {
	id: number;
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
	{
		value: "Acre",
		label: "Acre",
	},
	{
		value: "Alagoas",
		label: "Alagoas",
	},
	{
		value: "Amapá",
		label: "Amapá",
	},
	{
		value: "Amazonas",
		label: "Amazonas",
	},
	{
		value: "Bahia",
		label: "Bahia",
	},
	{
		value: "Ceará",
		label: "Ceará",
	},
	{
		value: "Distrito Federal",
		label: "Distrito Federal",
	},
	{
		value: "Espírito Santo",
		label: "Espírito Santo",
	},
	{
		value: "Goiás",
		label: "Goiás",
	},
	{
		value: "Maranhão",
		label: "Maranhão",
	},
	{
		value: "Mato Grosso",
		label: "Mato Grosso",
	},
	{
		value: "Mato Grosso do Sul",
		label: "Mato Grosso do Sul",
	},
	{
		value: "Minas Gerais",
		label: "Minas Gerais",
	},
	{
		value: "Pará",
		label: "Pará",
	},
	{
		value: "Paraíba",
		label: "Paraíba",
	},
	{
		value: "Pernambuco",
		label: "Pernambuco",
	},
	{
		value: "Piauí",
		label: "Piauí",
	},
	{
		value: "Rio de Janeiro",
		label: "Rio de Janeiro",
	},
	{
		value: "Rio Grande do Norte",
		label: "Rio Grande do Norte",
	},
	{
		value: "Rio Grande do Sul",
		label: "Rio Grande do Sul",
	},
	{
		value: "Rondônia",
		label: "Rondônia",
	},
	{
		value: "Roraima",
		label: "Roraima",
	},
	{
		value: "Santa Catarina",
		label: "Santa Catarina",
	},
	{
		value: "São Paulo",
		label: "São Paulo",
	},
	{
		value: "Sergipe",
		label: "Sergipe",
	},
	{
		value: "Tocantins",
		label: "Tocantins",
	},
];
export default function JobForm({ onAdd, editingJob }: JobFormProps) {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { errors },
	} = useForm<Job>({
		defaultValues: {
			company_name: "",
			position: "Desenvolvedor Front-end",
			seniority_level: "Júnior",
			status: "Enviada",
			vacancy_modality: "Remota",
			work_regime: "CLT",
			place: "",
		},
	});

	const [open, setOpen] = useState(false);

	const selectedPosition = watch("position");
	const selectedSeniorityLevel = watch("seniority_level");
	const selectedVacancyModality = watch("vacancy_modality");
	const selectedWorkRegime = watch("work_regime");
	const selectedPlace = watch("place");

	const onSubmit: SubmitHandler<Job> = (data) => {
		onAdd(data);
		reset();

		console.log("data =>", data);
	};

	useEffect(() => {
		if (editingJob) {
			console.log("editingJob =>", editingJob);

			setValue("company_name", editingJob.company_name);
			setValue("position", editingJob.position);
			setValue("seniority_level", editingJob.seniority_level);
			setValue("status", editingJob.status);
			setValue("vacancy_modality", editingJob.vacancy_modality);
			setValue("work_regime", editingJob.work_regime);
			setValue("place", editingJob.place);
		}
	}, [editingJob, setValue]);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="p-4 bg-gray-100 shadow-md rounded">
			{/* Field for choosing the company name */}
			<div className="mb-4">
				<Label>Nome da empresa</Label>
				<Input
					{...register("company_name", {
						required: "Este campo é obrigatório",
					})}
					type="text"
				/>
				{errors.company_name && (
					<p className="text-red-500 text-sm">
						{errors.company_name.message}
					</p>
				)}
			</div>

			{/* Field for choosing the position */}
			<div className="mb-4 flex flex-col gap-2">
				<Label className="">Cargo</Label>
				<RadioGroup
					className="flex"
					value={selectedPosition}
					onValueChange={(value) => setValue("position", value)}>
					<div className="flex items-center space-x-2">
						<RadioGroupItem
							value="Desenvolvedor Front-end"
							id="r1"
							{...register("position", {
								required: "Este campo é obrigatório",
							})}
						/>
						<Label htmlFor="r1">Desenvolvedor Front-end</Label>
					</div>

					<div className="flex items-center space-x-2">
						<RadioGroupItem
							value="Desenvolvedor Back-end"
							id="r2"
							{...register("position", {
								required: "Este campo é obrigatório",
							})}
						/>
						<Label htmlFor="r2">Desenvolvedor Back-end</Label>
					</div>

					<div className="flex items-center space-x-2">
						<RadioGroupItem
							value="Desenvolvedor FullStack"
							id="r3"
							{...register("position", {
								required: "Este campo é obrigatório",
							})}
						/>
						<Label htmlFor="r3">Desenvolvedor FullStack</Label>
					</div>
				</RadioGroup>
			</div>

			{/* Field for choosing seniority level */}
			<div className="mb-4 flex flex-col gap-2">
				<label>Nível de senioridade</label>
				<RadioGroup
					className="flex"
					value={selectedSeniorityLevel}
					onValueChange={(value) =>
						setValue("seniority_level", value)
					}>
					<div className="flex items-center space-x-2">
						<RadioGroupItem
							value="Júnior"
							id="r4"
							{...register("seniority_level", {
								required: "Este campo é obrigatório",
							})}
						/>
						<Label htmlFor="r4">Júnior</Label>
					</div>

					<div className="flex items-center space-x-2">
						<RadioGroupItem
							value="Pleno"
							id="r5"
							{...register("seniority_level", {
								required: "Este campo é obrigatório",
							})}
						/>
						<Label htmlFor="r5">Pleno</Label>
					</div>

					<div className="flex items-center space-x-2">
						<RadioGroupItem
							value="Sênior"
							id="r6"
							{...register("seniority_level", {
								required: "Este campo é obrigatório",
							})}
						/>
						<Label htmlFor="r6">Sênior</Label>
					</div>
				</RadioGroup>
			</div>

			{/* Field for choosing the type of vacancy */}
			<div className="mb-4 flex flex-col gap-2">
				<label>Modalidade da vaga</label>
				<RadioGroup
					className="flex"
					value={selectedVacancyModality}
					onValueChange={(value) =>
						setValue("vacancy_modality", value)
					}>
					<div className="flex items-center space-x-2">
						<RadioGroupItem
							value="Remota"
							id="r7"
							{...register("vacancy_modality", {
								required: "Este campo é obrigatório",
							})}
						/>
						<Label htmlFor="r7">Remota</Label>
					</div>

					<div className="flex items-center space-x-2">
						<RadioGroupItem
							value="Híbrida"
							id="r8"
							{...register("vacancy_modality", {
								required: "Este campo é obrigatório",
							})}
						/>
						<Label htmlFor="r8">Híbrida</Label>
					</div>

					<div className="flex items-center space-x-2">
						<RadioGroupItem
							value="Presencial"
							id="r9"
							{...register("vacancy_modality", {
								required: "Este campo é obrigatório",
							})}
						/>
						<Label htmlFor="r9">Presencial</Label>
					</div>
				</RadioGroup>
			</div>

			{/* Field for choosing the work regime */}
			<div className="mb-4 flex flex-col gap-2">
				<label>Regime de trabalho</label>
				<RadioGroup
					className="flex"
					value={selectedWorkRegime}
					onValueChange={(value) => setValue("work_regime", value)}>
					<div className="flex items-center space-x-2">
						<RadioGroupItem
							value="CLT"
							id="r10"
							{...register("work_regime", {
								required: "Este campo é obrigatório",
							})}
						/>
						<Label htmlFor="r10">CLT</Label>
					</div>

					<div className="flex items-center space-x-2">
						<RadioGroupItem
							value="PJ"
							id="r11"
							{...register("work_regime", {
								required: "Este campo é obrigatório",
							})}
						/>
						<Label htmlFor="r11">PJ</Label>
					</div>
				</RadioGroup>
			</div>

			{/* Field for selection of Brazilian states */}
			<div className="mb-4 flex flex-col gap-2">
				<Label>Localidade</Label>

				<Popover
					open={open}
					onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={open}
							className="w-[200px] justify-between"
							{...register("place", {
								required: "Este campo é obrigatório",
							})}>
							{selectedPlace
								? brazilianStates.find(
										(stateBr) =>
											stateBr.value === selectedPlace
								  )?.label
								: "Selecione um estado"}
							<ChevronsUpDown className="opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0">
						<Command>
							<CommandInput placeholder="Procure pelo estado" />
							<CommandList>
								<CommandEmpty>
									Nenhum estado encontrado!
								</CommandEmpty>
								<CommandGroup>
									{brazilianStates.map((stateBr) => (
										<CommandItem
											key={stateBr.value}
											value={stateBr.value}
											onSelect={(currentValue) => {
												setValue("place", currentValue);
												setOpen(false);
											}}>
											{stateBr.label}
											<Check
												className={cn(
													"ml-auto",
													selectedPlace ===
														stateBr.value
														? "opacity-100"
														: "opacity-0"
												)}
											/>
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
				{errors.place && (
					<p className="text-red-500 text-sm">
						{errors.place.message}
					</p>
				)}
			</div>

			<Button
				type="submit"
				className="">
				Adicionar Candidatura
			</Button>
		</form>
	);
}
