import { useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signUpRequest } from "@/api/signUpRequest";
import AddUserIcon from "@/assets/add-user-icon.svg";
import ClosedPasswordIcon from "@/assets/closed-password-icon.svg";
import EmailIcon from "@/assets/email-icon.svg";
import Loading from "@/assets/loading.svg";
import Logo from "@/assets/logo.svg";
import UserNameIcon from "@/assets/user-name-icon.svg";

export const SignUpValidationFormSchema = z.object({
	name: z
		.string({
			required_error:
				"Ops! Parece que você esqueceu de inserir seu nome. Por favor, preencha esse campo para prosseguir com o cadastro.",
		})
		.trim()
		.min(
			3,
			"Ops! Para prosseguir com o cadastro o campo 'nome' deve conter no mínimo 3 caracteres."
		)
		.refine(
			(char) => char.includes(" "),
			"Por favor, insira seu nome completo (nome e sobrenome) para prosseguir com o cadastro."
		),
	email: z
		.string({
			required_error:
				"Ops! Parece que você esqueceu de inserir seu e-mail. Por favor, preencha esse campo para prosseguir com o cadastro.",
		})
		.trim()
		.min(
			6,
			"Ops! Para prosseguir com o cadastro, o campo 'e-mail' deve conter no mínimo 6 caracteres."
		)
		.email(
			"Ops! Parece que você adicionou um endereço inválido! Por favor, insira um e-mail válido."
		),
	password: z
		.string({
			required_error:
				"Ops! Parece que você esqueceu de criar sua senha. Por favor, preencha esse campo para prosseguir com o cadastro.",
		})
		.trim()
		.min(
			8,
			"Ops! Sua senha deve conter no mínimo 8 caracteres. Escolha uma senha mais segura."
		),
});

export type SignUpFormValues = z.infer<typeof SignUpValidationFormSchema>;

export function SignUp() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const { handleSubmit, reset, control } = useForm<SignUpFormValues>({
		resolver: zodResolver(SignUpValidationFormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const { mutateAsync: authenticate } = useMutation({
		mutationFn: signUpRequest,
	});

	function showErrorAlerts(errors: FieldErrors<SignUpFormValues>) {
		if (errors.name) {
			return toast.warn(errors.name.message);
		} else if (errors.email) {
			return toast.warn(errors.email.message);
		} else if (errors.password) {
			return toast.warn(errors.password.message);
		}
	}

	async function onSubmit(data: SignUpFormValues) {
		try {
			setIsLoading(true);

			await authenticate({
				name: data.name,
				email: data.email,
				password: data.password,
			});
			reset();

			navigate("/");
		} catch (error) {
			reset();
			if (error instanceof Error) {
				toast.error(error.message);
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<main className="bg-blue-600 min-h-screen flex items-center justify-center">
			<form
				className="bg-white p-8 rounded-lg shadow-2xl w-10/12 sm:w-3/5 lg:w-[500px] animate__animated animate__backInLeft"
				onSubmit={handleSubmit(onSubmit, showErrorAlerts)}
				// Desabilita a validação nativa do HTML5
				noValidate>
				<img
					src={Logo}
					alt="Logomarca da aplicação"
				/>

				<h1 className="text-gray-500 text-xl text-center font-medium mt-6">
					Cadastre-se para acessar sua conta
				</h1>

				<div className="space-y-8">
					<div className="mt-8">
						<Label className="block text-gray-700">Nome</Label>
						<Controller
							name="name"
							control={control}
							render={({ field }) => (
								<div className="relative">
									<img
										src={UserNameIcon}
										alt="Ícone de nome do usuário"
										className="absolute left-[9px] top-3"
									/>

									<Input
										{...field}
										type="text"
										className="mt-1 px-8 block w-full rounded-md border-gray-300"
										placeholder="Seu nome completo"
									/>
								</div>
							)}
						/>
					</div>

					<div className="mt-4">
						<Label className="block text-gray-700">E-mail</Label>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<div className="relative">
									<img
										src={EmailIcon}
										alt="Ícone de Email"
										className="absolute left-2 top-2"
									/>

									<Input
										{...field}
										type="email"
										className="mt-1 px-9 block w-full rounded-md border-gray-300"
										placeholder="Seu e-mail"
										// Previne o comportamento padrão do navegador
										onInvalid={(e) => e.preventDefault()}
									/>
								</div>
							)}
						/>
					</div>

					<div className="mt-4">
						<Label className="block text-gray-700">Senha</Label>
						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<div className="relative">
									<img
										src={ClosedPasswordIcon}
										alt="Ícone de senha"
										className="absolute left-2 top-2"
									/>
									<Input
										{...field}
										type="password"
										className="mt-1 px-9 block w-full rounded-md border-gray-300"
										placeholder="Sua senha"
									/>
								</div>
							)}
						/>
					</div>

					<div className="mt-4">
						<Button
							type="submit"
							className={`w-full ${
								isLoading ? "cursor-not-allowed" : ""
							}`}
							disabled={isLoading}>
							{isLoading ? (
								<>
									<img
										src={AddUserIcon}
										alt="Ícone de cadastro"
									/>
									<span>Criando sua conta</span>
									<img
										src={Loading}
										alt="loading de carregamento"
									/>
								</>
							) : (
								<>
									<img
										src={AddUserIcon}
										alt="Ícone de cadastro"
									/>
									<span>Criar sua conta</span>
								</>
							)}
						</Button>
					</div>

					<p className="text-center text-gray-500 font-bold">
						Já possui uma conta?{" "}
						<span className="text-blue-600 font-bold hover:scale-105 transition duration-300 inline-block">
							<Link to="/">Faça login</Link>
						</span>
					</p>
				</div>
			</form>
		</main>
	);
}
