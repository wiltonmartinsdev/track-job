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
import {
	useForm,
	SubmitHandler,
	FieldErrors,
	Controller,
} from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../ui/input";

const jobFormSchema = z.object({
	company_name: z.string().trim().min(4, {
		message: "Ops! O nome da empresa deve ter no mínimo 4 caracteres.",
	}),
	position: z.string().min(1, {
		message: "Ops! Por favor, selecione um cargo para continuar.",
	}),
	seniority_level: z.string().min(1, {
		message: "Ops! Por favor, selecione um nível para continuar.",
	}),
	vacancy_modality: z.string().min(1, {
		message: "Ops! Por favor, selecione uma modalidade para continuar.",
	}),
	work_regime: z.string().min(1, {
		message:
			"Ops! Por favor, selecione um regime de trabalho para continuar.",
	}),
	place: z.string().min(1, {
		message: "Ops! Por favor, selecione um estado para continuar.",
	}),
	status: z.string().trim().min(7),
});

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
	updated_at?: string;
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
	const { handleSubmit, reset, setValue, control } = useForm<Job>({
		resolver: zodResolver(jobFormSchema),
		defaultValues: editingJob || {
			company_name: "",
			position: "",
			seniority_level: "",
			status: "Enviada",
			vacancy_modality: "",
			work_regime: "",
			place: "",
		},
	});

	const [open, setOpen] = useState(false);

	function showErrorAlerts(errors: FieldErrors<Job>) {
		if (errors.company_name) {
			return toast.warn(errors.company_name.message);
		} else if (errors.position) {
			return toast.warn(errors.position.message);
		} else if (errors.seniority_level) {
			return toast.warn(errors.seniority_level.message);
		} else if (errors.vacancy_modality) {
			return toast.warn(errors.vacancy_modality.message);
		} else if (errors.work_regime) {
			return toast.warn(errors.work_regime.message);
		} else if (errors.place) {
			return toast.warn(errors.place.message);
		}
	}

	const onSubmit: SubmitHandler<Job> = async (data) => {
		await onAdd(data);
		reset();
		setOpen(false);
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
		<>
			<form
				onSubmit={handleSubmit(onSubmit, showErrorAlerts)}
				className="p-4 bg-gray-100 shadow-md rounded-md drop-shadow-xl">
				{/* Field for choosing the company name */}
				<div className="mb-4 flex flex-col gap-2">
					<Label
						className="font-roboto-flex font-black text-lg
                ">
						Nome da empresa
					</Label>
					<Controller
						control={control}
						name="company_name"
						render={({ field }) => (
							<Input
								{...field}
								type="text"
							/>
						)}
					/>
				</div>

				{/* Field for choosing the position */}
				<div className="mb-8 flex flex-col gap-2">
					<Label
						className="font-roboto-flex font-black text-lg
                ">
						Cargo
					</Label>

					<Controller
						control={control}
						name="position"
						render={({ field }) => (
							<RadioGroup
								className="flex"
								value={field.value}
								onValueChange={field.onChange}>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="Desenvolvedor Front-end"
										id="r1"
									/>
									<Label htmlFor="r1">
										Desenvolvedor Front-end
									</Label>
								</div>

								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="Desenvolvedor Back-end"
										id="r2"
									/>
									<Label htmlFor="r2">
										Desenvolvedor Back-end
									</Label>
								</div>

								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="Desenvolvedor FullStack"
										id="r3"
									/>
									<Label htmlFor="r3">
										Desenvolvedor FullStack
									</Label>
								</div>
							</RadioGroup>
						)}
					/>
				</div>

				{/* Field for choosing seniority level */}
				<div className="mb-8 flex flex-col gap-2">
					<label
						className="font-roboto-flex font-black text-lg
                ">
						Nível de senioridade
					</label>
					<Controller
						control={control}
						name="seniority_level"
						render={({ field }) => (
							<RadioGroup
								className="flex"
								value={field.value}
								onValueChange={field.onChange}>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="Júnior"
										id="r4"
									/>
									<Label htmlFor="r4">Júnior</Label>
								</div>

								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="Pleno"
										id="r5"
									/>
									<Label htmlFor="r5">Pleno</Label>
								</div>

								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="Sênior"
										id="r6"
									/>
									<Label htmlFor="r6">Sênior</Label>
								</div>
							</RadioGroup>
						)}
					/>
				</div>

				{/* Field for choosing the type of vacancy */}
				<div className="mb-8 flex flex-col gap-2">
					<label
						className="font-roboto-flex font-black text-lg
                ">
						Modalidade
					</label>
					<Controller
						control={control}
						name="vacancy_modality"
						render={({ field }) => (
							<RadioGroup
								className="flex"
								value={field.value}
								onValueChange={field.onChange}>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="Remota"
										id="r7"
									/>
									<Label htmlFor="r7">Remota</Label>
								</div>

								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="Híbrida"
										id="r8"
									/>
									<Label htmlFor="r8">Híbrida</Label>
								</div>

								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="Presencial"
										id="r9"
									/>
									<Label htmlFor="r9">Presencial</Label>
								</div>
							</RadioGroup>
						)}
					/>
				</div>

				{/* Field for choosing the work regime */}
				<div className="mb-8 flex flex-col gap-2">
					<label
						className="font-roboto-flex font-black text-lg
                ">
						Regime de trabalho
					</label>
					<Controller
						control={control}
						name="work_regime"
						render={({ field }) => (
							<RadioGroup
								className="flex"
								value={field.value}
								onValueChange={field.onChange}>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="CLT"
										id="r10"
									/>
									<Label htmlFor="r10">CLT</Label>
								</div>

								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="PJ"
										id="r11"
									/>
									<Label htmlFor="r11">PJ</Label>
								</div>
							</RadioGroup>
						)}
					/>
				</div>

				{/* Field for selection of Brazilian states */}
				<div className="mb-8 flex flex-col gap-2">
					<Label
						className="font-roboto-flex font-black text-lg
                ">
						Localidade
					</Label>

					<Controller
						control={control}
						name="place"
						render={({ field }) => (
							<Popover
								open={open}
								onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										role="combobox"
										aria-expanded={open}
										className="w-[200px] justify-between"
										tabIndex={0}>
										{field.value
											? field.value
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
												{brazilianStates.map(
													(stateBr) => (
														<CommandItem
															key={stateBr.value}
															value={
																stateBr.value
															}
															tabIndex={0}
															onSelect={(
																currentValue
															) => {
																field.onChange(
																	currentValue
																);
																setOpen(false);
															}}>
															{stateBr.label}
															<Check
																className={cn(
																	"ml-auto",
																	field.value ===
																		stateBr.value
																		? "opacity-100"
																		: "opacity-0"
																)}
															/>
														</CommandItem>
													)
												)}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						)}
					/>
				</div>

				<div className="flex justify-center">
					<Button
						type="submit"
						className="focus-visible:ring-blue-400 focus-visible:ring-4"
						tabIndex={0}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24">
							<path
								fill="#fff"
								d="M5.116 20q-.691 0-1.153-.462T3.5 18.384V5.616q0-.691.463-1.153T5.115 4h9.308v1H5.116q-.231 0-.424.192t-.192.424v12.769q0 .23.192.423t.423.192h12.77q.23 0 .423-.192t.192-.423V9.077h1v9.308q0 .69-.462 1.153T17.884 20zM8 16.5v-1h7v1zm0-3v-1h7v1zm0-3v-1h7v1zM17.5 8V6h-2V5h2V3h1v2h2v1h-2v2z"
							/>
						</svg>
						{editingJob
							? "Salvar alterações"
							: "Cadastrar candidatura"}
					</Button>
				</div>
			</form>
		</>
	);
}
