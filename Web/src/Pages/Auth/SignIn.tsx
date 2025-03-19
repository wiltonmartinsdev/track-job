import { Controller, FieldErrors, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInRequest } from "@/api/signInRequest";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth";
import EmailIcon from "@/assets/email-icon.svg";
import LoginIcon from "@/assets/login-icon.svg";
import Logo from "@/assets/logo.svg";
import OpenPasswordIcon from "@/assets/open-password-icon.svg";

const SignInValidationFormSchema = z.object({
	email: z
		.string({
			required_error:
				"Ops! Parece que você esqueceu de inserir seu e-mail. Por favor, preencha esse campo para prosseguir com o login.",
		})
		.trim()
		.min(
			6,
			"Ops! Para prosseguir com o login, o campo \"e-mail\" deve conter no mínimo 6 caracteres."
		)
		.email(
			"Ops! Parece que você adicionou um endereço inválido! Por favor, insira um e-mail válido."
		),
	password: z
		.string({
			required_error:
				"Ops! Parece que você esqueceu de inserir sua senha. Por favor, preencha esse campo para prosseguir com o login.",
		})
		.trim()
		.min(8, "Ops! Sua senha deve conter no mínimo 8 caracteres."),
});

type SignInFormValues = z.infer<typeof SignInValidationFormSchema>;

interface AuthResponse {
	token: string;
	user: {
		id: string;
		name: string;
		email: string;
	};
}

export function SignIn() {
	const { signIn } = useAuth();

	const navigate = useNavigate();

	const { handleSubmit, reset, control } = useForm<SignInFormValues>({
		resolver: zodResolver(SignInValidationFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { mutateAsync: authenticate } = useMutation<
		AuthResponse,
		Error,
		SignInFormValues
	>({
		mutationFn: signInRequest,
	});

	function showErrorAlerts(errors: FieldErrors<SignInFormValues>) {
		if (errors.email) {
			return toast.warn(errors.email.message);
		} else if (errors.password) {
			return toast.warn(errors.password.message);
		}
	}

	async function onSubmit(data: SignInFormValues) {
		try {
			const response = await authenticate({
				email: data.email,
				password: data.password,
			});
			signIn(response.token, response.user);

			navigate("/job");

			reset();
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("Ocorreu um erro ao fazer login");
			}
		}
	}

	return (
		<main className="bg-blue-600 min-h-screen flex items-center justify-center overflow-hidden">
			<form
				className="bg-white p-8 rounded-lg shadow-2xl w-10/12 sm:w-3/5 lg:w-[500px] animate__animated animate__backInRight"
				onSubmit={handleSubmit(onSubmit, showErrorAlerts)} // Desabilita a validação nativa do HTML5
				noValidate>
				<img
					src={Logo}
					alt="Logomarca da aplicação"
				/>
				<h1 className="text-gray-500 text-xl text-center font-medium mt-6">
					Faça login para acessar sua conta
				</h1>

				<div className="space-y-8">
					<div className="mt-8">
						<Label className="block text-gray-700">E-mail</Label>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<div className="relative">
									<img
										src={EmailIcon}
										alt="Ícone de E-mail"
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
										src={OpenPasswordIcon}
										alt="Ícone de Senha"
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
							className="w-full">
							<img
								src={LoginIcon}
								alt="Ícone de login"
							/>
							Entrar
						</Button>
					</div>

					<p className="text-center text-gray-500 font-bold">
						Não possui uma conta?{" "}
						<span className="text-blue-600 font-bold hover:scale-105 transition duration-300 inline-block">
							<Link to="/sign-up">Cadastre-se</Link>
						</span>
					</p>
				</div>
			</form>
		</main>
	);
}
