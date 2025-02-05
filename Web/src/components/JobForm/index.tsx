import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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
	useWatch,
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
import { jobService } from "@/services/jobServices";

import { getCurrencySymbol } from "../../utils/currencyUtils";
import { Input } from "../ui/input";

const jobFormSchema = z.object({
	id: z.string().optional(),
	company_name: z.string().trim().min(4, {
		message: "Ops! O nome da empresa deve ter no mínimo 4 caracteres.",
	}),
	position: z.string().min(8, {
		message: "Ops! Por favor, selecione um cargo para continuar.",
	}),
	seniority_level: z.string().min(5, {
		message: "Ops! Por favor, selecione um nível para continuar.",
	}),
	payment_currency: z.string().min(4, {
		message: "Ops! Por favor, selecione uma moeda para continuar.",
	}),
	initial_salary: z.number().nonnegative().optional(),
	current_salary: z.number().nonnegative().optional(),
	vacancy_modality: z.string().min(6, {
		message: "Ops! Por favor, selecione uma modalidade para continuar.",
	}),
	work_regime: z.string().min(2, {
		message:
			"Ops! Por favor, selecione um regime de trabalho para continuar.",
	}),
	place: z.string().min(4, {
		message: "Ops! Por favor, selecione um estado para continuar.",
	}),
	status: z.string().trim().min(7).optional(),
	process_phase: z.string().trim().min(5).optional(),
});

export type Job = {
	id: string;
	company_name: string;
	position: string;
	seniority_level: string;
	payment_currency: string;
	initial_salary: number;
	current_salary: number;
	vacancy_modality: string;
	work_regime: string;
	place: string;
	status: string;
	process_phase: string;
	created_at: string;
	updated_at: string;
};

type JobFormProps = {
	onAdd: (job: Job) => Promise<void>;
	editingJob?: Job | null;
	isInModal?: boolean;
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
export default function JobForm({
	onAdd,
	editingJob,
	isInModal = false,
}: JobFormProps) {
	const [open, setOpen] = useState(false);
	const [hasChanges, setHasChanges] = useState(false);
	const [originalValues, setOriginalValues] = useState<Job | null>(null);

	const { handleSubmit, reset, setValue, control, watch } = useForm<Job>({
		resolver: zodResolver(jobFormSchema),
		defaultValues: editingJob || {
			id: "",
			company_name: "",
			position: "",
			seniority_level: "",
			payment_currency: "",
			initial_salary: 0,
			current_salary: 0,
			status: "Enviada",
			process_phase: "Envio do Currículo",
			vacancy_modality: "",
			work_regime: "",
			place: "",
		},
	});

	const selectedCurrency = useWatch({
		control,
		name: "payment_currency",
	});

    function showErrorAlerts(errors: FieldErrors<Job>) {
        if (errors.company_name) {
            return toast.warn(errors.company_name.message);
        } else if (errors.position) {
            return toast.warn(errors.position.message);
        } else if (errors.seniority_level) {
            return toast.warn(errors.seniority_level.message);
        } else if (errors.payment_currency) {
            return toast.warn(errors.payment_currency.message);
        } else if (errors.vacancy_modality) {
            return toast.warn(errors.vacancy_modality.message);
        } else if (errors.work_regime) {
            return toast.warn(errors.work_regime.message);
        } else if (errors.place) {
            return toast.warn(errors.place.message);
        }
    }

	const onSubmit: SubmitHandler<Job> = async (data) => {
		try {
			const formattedData = {
				...data,
				initial_salary: Number(data.initial_salary),
				current_salary: Number(data.current_salary),
			};

			// Busca as vagas existentes na API
			const existingJobs = await jobService.fetch();

			// Exclui a vaga atual da validação
			const hasCurrentJob = existingJobs.filter(
				(job: Job) =>
					job.status === "Emprego atual" && job.id !== editingJob?.id
			);

			if (
				hasCurrentJob.length >= 2 &&
				formattedData.status === "Emprego atual"
			) {
				toast.error(
					"Ops! Você só pode ter no máximo duas vagas com o status 'Emprego atual'."
				);

				// Restaura o status original no formulário
				setValue("status", editingJob?.status || "Enviada");
				return;
			}

			// Prosseguir com a atualização
			await onAdd(formattedData);
			reset();
			setOpen(false);
		} catch (error) {
			console.error("Erro ao atualizar a vaga:", error);
			toast.error(
				"Ocorreu um erro ao atualizar a vaga. Tente novamente."
			);
		}
	};

	useEffect(() => {
		if (editingJob) {
			console.log("editingJob =>", editingJob);
			setOriginalValues(editingJob);
			setValue("id", editingJob.id);
			setValue("company_name", editingJob.company_name);
			setValue("position", editingJob.position);
			setValue("seniority_level", editingJob.seniority_level);
			setValue("initial_salary", Number(editingJob.initial_salary));
			setValue("current_salary", Number(editingJob.current_salary));
			setValue("status", editingJob.status);
			setValue("process_phase", editingJob.process_phase);
			setValue("vacancy_modality", editingJob.vacancy_modality);
			setValue("work_regime", editingJob.work_regime);
			setValue("place", editingJob.place);
		}
	}, [editingJob, setValue]);

	// Adicione um novo useEffect para verificar mudanças
	useEffect(() => {
        const subscription = watch((value) => {
            if (editingJob && originalValues) {
                const hasAnyChange = Object.keys(value).some((key) => {
                    if (!value[key as keyof Job]) return false;
                    return value[key as keyof Job] !== originalValues[key as keyof Job];
                });
                setHasChanges(hasAnyChange);
            }
        });

		return () => subscription.unsubscribe();
	}, [watch, editingJob, originalValues]);

	return (
		<div
			className={`min-w-80 p-4 sm:w-full ${
				isInModal ? "lg:w-full" : "lg:w-3/4 xl:w-1/2"
			} h-auto sm:h-full bg-gray-100 rounded-lg shadow-md drop-shadow-sm`}>
			<form onSubmit={handleSubmit(onSubmit, showErrorAlerts)}>
				{/* Field for choosing the company name */}
				<div className="mb-4 flex flex-col gap-2">
					<Label
						className="font-roboto-flex font-black text-lg
                ">
						Nome da Empresa
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
									<Label htmlFor="r1">Front-end</Label>
								</div>

								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="Desenvolvedor Back-end"
										id="r2"
									/>
									<Label htmlFor="r2">Back-end</Label>
								</div>

								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="Desenvolvedor FullStack"
										id="r3"
									/>
									<Label htmlFor="r3">FullStack</Label>
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
						Nível de Senioridade
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

				{/* Field to choose payment currency */}
				<div className="mb-8 flex flex-col gap-2">
					<Label className="font-roboto-flex font-black text-lg">
						Moeda de Pagamento
					</Label>
					<Controller
						control={control}
						name="payment_currency"
						render={({ field }) => (
							<RadioGroup
								className="flex"
								value={field.value}
								onValueChange={field.onChange}>
								<div className="flex items-center space-x-1 gap-1">
									<RadioGroupItem
										value="Real"
										id="r12"
									/>
									<Label
										htmlFor="r12"
										className="flex gap-1 items-center">
										R$ Real
									</Label>
								</div>

								<div className="flex items-center space-x-1 gap-1 ">
									<RadioGroupItem
										value="Dólar"
										id="r13"
									/>
									<Label
										htmlFor="r13"
										className="flex items-center">
										$ Dólar
									</Label>
								</div>

								<div className="flex items-center space-x-1 gap-1">
									<RadioGroupItem
										value="Euro"
										id="r14"
									/>
									<Label
										htmlFor="r14"
										className="flex gap-[2px] items-center">
										€ Euro
									</Label>
								</div>
							</RadioGroup>
						)}
					/>
				</div>

				{editingJob && (
					<>
						{/* Campo para Salário Inicial */}
						<div className="mb-4 flex flex-col gap-2">
							<Label className="font-roboto-flex font-black text-lg">
								Salário Inicial
							</Label>
							<Controller
								control={control}
								name="initial_salary"
								render={({ field }) => (
									<div className="flex items-center gap-2">
										<span>
											{getCurrencySymbol(
												selectedCurrency
											)}
										</span>
										<Input
											{...field}
											type="number"
											min="0"
											onChange={(e) =>
												field.onChange(
													Number(e.target.value)
												)
											}
											value={field.value || ""}
										/>
									</div>
								)}
							/>
						</div>

						{/* Campo para Salário Atual */}
						<div className="mb-4 flex flex-col gap-2">
							<Label className="font-roboto-flex font-black text-lg">
								Salário Atual
							</Label>
							<Controller
								control={control}
								name="current_salary"
								render={({ field }) => (
									<div className="flex items-center gap-2">
										<span>
											{getCurrencySymbol(
												selectedCurrency
											)}
										</span>
										<Input
											{...field}
											type="number"
											min="0"
											onChange={(e) =>
												field.onChange(
													Number(e.target.value)
												)
											}
											value={field.value || ""}
										/>
									</div>
								)}
							/>
						</div>
					</>
				)}

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
						Regime de Trabalho
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

				{/* Field for choosing the status */}
				{editingJob && (
					<>
						<div className="mb-8 flex flex-col gap-2">
							<Label className="font-roboto-flex font-black text-lg">
								Status
							</Label>
							<Controller
								control={control}
								name="status"
								render={({ field }) => (
									<Select
										value={field.value}
										onValueChange={field.onChange}>
										<SelectTrigger
											className="w-[180px]"
											tabIndex={0}>
											<SelectValue placeholder="Selecione o status" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="Enviada">
													Enviada
												</SelectItem>
												<SelectItem value="Em seleção">
													Em seleção
												</SelectItem>
												<SelectItem value="Não contratado">
													Não contratado
												</SelectItem>
												<SelectItem value="Emprego atual">
													Emprego atual
												</SelectItem>
												<SelectItem value="Desligado">
													Desligado
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								)}
							/>
						</div>
						{/*  */}
						<div className="mb-8 flex flex-col gap-2">
							<Label className="font-roboto-flex font-black text-lg">
								Fase do Processo
							</Label>
							<Controller
								control={control}
								name="process_phase"
								render={({ field }) => (
									<Select
										value={field.value}
										onValueChange={field.onChange}>
										<SelectTrigger
											className="w-[180px]"
											tabIndex={0}>
											<SelectValue placeholder="Fase do processo seletivo" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>
													Candidatura Inicial
												</SelectLabel>
												<SelectItem value="Envio do Currículo">
													Envio do Currículo
												</SelectItem>
												<SelectItem value="Triagem de Currículos">
													Triagem de Currículos
												</SelectItem>
											</SelectGroup>

											<SelectGroup>
												<SelectLabel>
													Avaliações Técnicas
												</SelectLabel>
												<SelectItem value="Teste Técnico Online">
													Teste Técnico Online
												</SelectItem>
												<SelectItem value="Desafio de Código">
													Desafio de Código
												</SelectItem>
												<SelectItem value="Prova de Lógica">
													Prova de Lógica
												</SelectItem>
											</SelectGroup>

											<SelectGroup>
												<SelectLabel>
													Entrevistas
												</SelectLabel>
												<SelectItem value="Entrevista com RH">
													Entrevista com RH
												</SelectItem>
												<SelectItem value="Entrevista Técnica">
													Entrevista Técnica
												</SelectItem>
												<SelectItem value="Entrevista com o Gestor">
													Entrevista com o Gestor
												</SelectItem>
												<SelectItem value="Painel Técnico">
													Painel Técnico
												</SelectItem>
											</SelectGroup>

											<SelectGroup>
												<SelectLabel>
													Etapas Finais
												</SelectLabel>
												<SelectItem value="Prova de Soft Skills">
													Prova de Soft Skills
												</SelectItem>

												<SelectItem value="Entrevista Final">
													Entrevista Final
												</SelectItem>
												<SelectItem value="Alinhamento de Proposta">
													Alinhamento de Proposta
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								)}
							/>
						</div>
					</>
				)}

				<div className="flex justify-center">
					<Button
						type="submit"
						className={`focus-visible:ring-blue-400 focus-visible:ring-4 ${
                            editingJob && !hasChanges ? "cursor-not-allowed" : ""
                          }`}
						tabIndex={0}
						disabled={editingJob ? !hasChanges : false}>
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
		</div>
	);
}
