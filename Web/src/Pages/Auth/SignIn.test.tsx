import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { signInRequest } from "@/api/signInRequest";
import userEvent from "@testing-library/user-event";

import { SignIn } from "./SignIn";

// Mock the dependencies
vi.mock("react-toastify", () => ({
	toast: {
		warn: vi.fn(),
		error: vi.fn(),
		success: vi.fn(),
	},
}));

vi.mock("@/api/signInRequest", () => ({
	signInRequest: vi.fn(),
}));

// Mock useAuth hook
const mockSignIn = vi.fn();
vi.mock("@/contexts/auth", () => ({
	useAuth: () => ({
		signIn: mockSignIn,
	}),
}));

// useNavigate Mock
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual("react-router-dom");
	return {
		...actual,
		useNavigate: () => mockNavigate,
	};
});

describe("SignIn Form Validation and Authentication Tests", () => {
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

	const renderSignIn = () => {
		return render(
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<SignIn />
				</QueryClientProvider>
			</BrowserRouter>
		);
	};

	it("Should render the component correctly", () => {
		renderSignIn();

		expect(
			screen.getByText("Faça login para acessar sua conta")
		).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Seu e-mail")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Sua senha")).toBeInTheDocument();
		expect(screen.getByText("Entrar")).toBeInTheDocument();
		expect(screen.getByText("Não possui uma conta?")).toBeInTheDocument();
		expect(screen.getByText("Cadastre-se")).toBeInTheDocument();
	});

	it("Should show error when email is too short", async () => {
		renderSignIn();

		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const submitButton = screen.getByText("Entrar");

		await userEvent.type(emailInput, "a@b.c");
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(toast.warn).toHaveBeenCalledWith(
				"Ops! Para prosseguir com o login, o campo \"e-mail\" deve conter no mínimo 6 caracteres."
			);
		});
	});

	it("Should show error when email is invalid", async () => {
		renderSignIn();

		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const submitButton = screen.getByText("Entrar");

		await userEvent.type(emailInput, "email-invalido");
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(toast.warn).toHaveBeenCalledWith(
				"Ops! Parece que você adicionou um endereço inválido! Por favor, insira um e-mail válido."
			);
		});
	});

	it("Should show error when password is too short", async () => {
		renderSignIn();

		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const submitButton = screen.getByText("Entrar");

		await userEvent.type(emailInput, "usuario@teste.com");
		await userEvent.type(passwordInput, "123");
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(toast.warn).toHaveBeenCalledWith(
				"Ops! Sua senha deve conter no mínimo 8 caracteres."
			);
		});
	});

	it("Should call the API, sign in and redirect when the form is valid", async () => {
		// Mock API success response
		const mockResponse = {
			token: "fake-token",
			user: {
				id: "user-id",
				name: "Usuário Teste",
				email: "usuario@teste.com",
			},
		};
		vi.mocked(signInRequest).mockResolvedValueOnce(mockResponse);

		renderSignIn();

		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const submitButton = screen.getByText("Entrar");

		await userEvent.type(emailInput, "usuario@teste.com");
		await userEvent.type(passwordInput, "senha12345");
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(signInRequest).toHaveBeenCalledWith({
				email: "usuario@teste.com",
				password: "senha12345",
			});
			
			// Checks if the useAuth.signIn hook was called with the correct parameters
			expect(mockSignIn).toHaveBeenCalledWith(
				mockResponse.token,
				mockResponse.user
			);
			
			// Checks if the user was redirected to the correct page
			expect(mockNavigate).toHaveBeenCalledWith("/job");
		});
	});

	it("Should show error when API returns error", async () => {
		// API Error Mock
		const errorMessage = "Credenciais inválidas";
		vi.mocked(signInRequest).mockRejectedValueOnce(new Error(errorMessage));

		renderSignIn();

		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const submitButton = screen.getByText("Entrar");

		await userEvent.type(emailInput, "usuario@teste.com");
		await userEvent.type(passwordInput, "senha12345");
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith(errorMessage);
		});
	});

	it("Should show generic error when API throws non-Error object", async () => {
		// Generic API Error Mock
		vi.mocked(signInRequest).mockRejectedValueOnce("Erro não específico");

		renderSignIn();

		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const submitButton = screen.getByText("Entrar");

		await userEvent.type(emailInput, "usuario@teste.com");
		await userEvent.type(passwordInput, "senha12345");
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith("Ocorreu um erro ao fazer login");
		});
	});
});