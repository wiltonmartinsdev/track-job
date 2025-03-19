import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { signUpRequest } from "@/api/signUpRequest";
import userEvent from "@testing-library/user-event";

import { SignUp } from "./SignUp";

// Mock the dependencies
vi.mock("react-toastify", () => ({
	toast: {
		warn: vi.fn(),
		error: vi.fn(),
		success: vi.fn(),
	},
}));

vi.mock("@/api/signUpRequest", () => ({
	signUpRequest: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual("react-router-dom");
	return {
		...actual,
		useNavigate: () => mockNavigate,
	};
});

describe("SignUp Component", () => {
	let queryClient: QueryClient;

	beforeEach(() => {
		queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					retry: false,
				},
			},
		});
		vi.clearAllMocks();
	});

	const renderSignUp = () => {
		return render(
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<SignUp />
				</QueryClientProvider>
			</BrowserRouter>
		);
	};

	it("Should render the component correctly", () => {
		renderSignUp();

		expect(
			screen.getByText("Cadastre-se para acessar sua conta")
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("Seu nome completo")
		).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Seu e-mail")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Sua senha")).toBeInTheDocument();
		expect(screen.getByText("Criar sua conta")).toBeInTheDocument();
		expect(screen.getByText("Já possui uma conta?")).toBeInTheDocument();
	});

	it("Should show error when name is too short", async () => {
		renderSignUp();

		const nameInput = screen.getByPlaceholderText("Seu nome completo");
		const submitButton = screen.getByText("Criar sua conta");

		await userEvent.type(nameInput, "Ana");
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(toast.warn).toHaveBeenCalledWith(
				"Ops! Para prosseguir com o cadastro o campo 'nome' deve conter no mínimo 4 caracteres."
			);
		});
	});

	it("Should show error when email is invalid", async () => {
		renderSignUp();

		const nameInput = screen.getByPlaceholderText("Seu nome completo");
		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const submitButton = screen.getByText("Criar sua conta");

		await userEvent.type(nameInput, "Usuário Teste");
		await userEvent.type(emailInput, "email-invalido");
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(toast.warn).toHaveBeenCalledWith(
				"Ops! Parece que você adicionou um endereço inválido! Por favor, insira um e-mail válido."
			);
		});
	});

	it("Should show error when password is too short", async () => {
		renderSignUp();

		const nameInput = screen.getByPlaceholderText("Seu nome completo");
		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const submitButton = screen.getByText("Criar sua conta");

		await userEvent.type(nameInput, "Usuário Teste");
		await userEvent.type(emailInput, "usuario@teste.com");
		await userEvent.type(passwordInput, "123");
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(toast.warn).toHaveBeenCalledWith(
				"Ops! Sua senha deve conter no mínimo 8 caracteres. Escolha uma senha mais segura."
			);
		});
	});

	it("Should call the API and redirect when the form is valid", async () => {
		// Mock API Success Response
		vi.mocked(signUpRequest).mockResolvedValueOnce({ success: true });

		renderSignUp();

		const nameInput = screen.getByPlaceholderText("Seu nome completo");
		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const submitButton = screen.getByText("Criar sua conta");

		await userEvent.type(nameInput, "Usuário Teste");
		await userEvent.type(emailInput, "usuario@teste.com");
		await userEvent.type(passwordInput, "senha12345");
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(signUpRequest).toHaveBeenCalledWith({
				name: "Usuário Teste",
				email: "usuario@teste.com",
				password: "senha12345",
			});
			expect(mockNavigate).toHaveBeenCalledWith("/");
		});
	});

	it("should show error when API returns error", async () => {
		// API Error Mock
		const errorMessage = "E-mail já cadastrado";
		vi.mocked(signUpRequest).mockRejectedValueOnce(new Error(errorMessage));

		renderSignUp();

		const nameInput = screen.getByPlaceholderText("Seu nome completo");
		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const submitButton = screen.getByText("Criar sua conta");

		await userEvent.type(nameInput, "Usuário Teste");
		await userEvent.type(emailInput, "usuario@teste.com");
		await userEvent.type(passwordInput, "senha12345");
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith(errorMessage);
		});
	});
});
