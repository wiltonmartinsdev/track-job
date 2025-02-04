import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddUserIcon from "@/assets/add-user-icon.svg";
import EmailIcon from "@/assets/email-icon.svg";
import ClosedPasswordIcon from "@/assets/closed-password-icon.svg";
import UserNameIcon from "@/assets/user-name-icon.svg";

export function SignUp() {
	return (
		<main className="bg-blue-600 min-h-screen flex items-center justify-center">
			<form className="bg-white p-8 rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold text-center">Track Job</h1>
				<h3 className="text-gray-500">
					Cadastre-se para acessar sua conta
				</h3>

				<div className="space-y-8">
					<div className="mt-8">
						<Label className="block text-gray-700">Nome</Label>
						<div className="relative">
							<img
								src={UserNameIcon}
								alt="Ícone de nome do usuário"
								className="absolute left-2 top-3"
							/>

							<Input
								type="text"
								className="mt-1 px-8 block w-full rounded-md border-gray-300"
								placeholder="Seu nome"
							/>
						</div>
					</div>

					<div className="mt-4">
						<Label className="block text-gray-700">E-mail</Label>
						<div className="relative">
							<img
								src={EmailIcon}
								alt="Ícone de e-mail"
								className="absolute left-2 top-2"
							/>

							<Input
								type="password"
								className="mt-1 px-9 block w-full rounded-md border-gray-300"
								placeholder="Seu e-mail"
							/>
						</div>
					</div>

					<div className="mt-4">
						<Label className="block text-gray-700">Senha</Label>
						<div className="relative">
							<img
								src={ClosedPasswordIcon}
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
						<button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-1">
							Criar sua conta
							<img
								src={AddUserIcon}
								alt="Ícone de login"
							/>
						</button>
					</div>

					<p className="text-center text-gray-500">
						Já tem uma conta?{" "}
						<span className="text-blue-600 font-bold">
							Faça login
						</span>
					</p>
				</div>
			</form>
		</main>
	);
}
