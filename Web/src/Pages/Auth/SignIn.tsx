import { Link } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import EmailIcon from "@/assets/email-icon.svg";
import LoginIcon from "@/assets/login-icon.svg";
import Logo from "@/assets/logo.svg";
import OpenPasswordIcon from "@/assets/open-password-icon.svg";

export function SignIn() {
	return (
		<main className="bg-blue-600 min-h-screen flex items-center justify-center overflow-hidden">
			<form className="bg-white p-8 rounded-lg shadow-2xl sm:w-3/5 lg:w-[500px]">
				<img
					src={Logo}
					alt="Logomarca da aplicação"
				/>
				<h3 className="text-gray-500 text-center font-medium">
					Faça login para acessar sua conta
				</h3>

				<div className="space-y-8">
					<div className="mt-8">
						<Label className="block text-gray-700">E-mail</Label>
						<div className="relative">
							<img
								src={EmailIcon}
								alt="Ícone de Email"
								className="absolute left-2 top-2"
							/>

							<Input
								type="email"
								className="mt-1 px-9 block w-full rounded-md border-gray-300"
								placeholder="Seu e-mail"
							/>
						</div>
					</div>
					<div className="mt-4">
						<Label className="block text-gray-700">Senha</Label>
						<div className="relative">
							<img
								src={OpenPasswordIcon}
								alt="Ícone de Senha"
								className="absolute left-2 top-2"
							/>

							<Input
								type="password"
								className="mt-1 px-9 block w-full rounded-md border-gray-300"
								placeholder="Sua senha"
							/>
						</div>
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
