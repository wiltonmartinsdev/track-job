import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/auth";

import { SignUp } from "./SignUp";

// Mock external modules
vi.mock("react-toastify", () => ({
	toast: {
		warn: vi.fn(),
		error: vi.fn(),
		success: vi.fn(),
	},
}));

// Mock signUpRequest using a factory function
vi.mock("@/api/signUpRequest", () => {
	return {
		signUpRequest: vi.fn(),
	};
});

import { signUpRequest } from "@/api/signUpRequest";

// Mock for SVG files
vi.mock("@/assets/add-user-icon.svg", () => ({
	default: "add-user-icon.svg",
}));
vi.mock("@/assets/closed-password-icon.svg", () => ({
	default: "closed-password-icon.svg",
}));
vi.mock("@/assets/email-icon.svg", () => ({
	default: "email-icon.svg",
}));
vi.mock("@/assets/loading.svg", () => ({
	default: "loading.svg",
}));
vi.mock("@/assets/logo.svg", () => ({
	default: "logo.svg",
}));
vi.mock("@/assets/user-name-icon.svg", () => ({
	default: "user-name-icon.svg",
}));

// Navigation hook mock
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual("react-router-dom");
	return {
		...actual,
		useNavigate: () => mockNavigate,
	};
});

// Wrapper component to provide the necessary contexts
const Wrapper = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>{children}</AuthProvider>
			</QueryClientProvider>
		</BrowserRouter>
	);
};

describe("SignUp Form Validation and Submission Tests", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("Should render the component correctly", () => {
		render(<SignUp />, { wrapper: Wrapper });

		expect(
			screen.getByText("Cadastre-se para acessar sua conta")
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("Seu nome completo")
		).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Seu e-mail")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Sua senha")).toBeInTheDocument();
		expect(screen.getByText("Criar sua conta")).toBeInTheDocument();
	});

	it("Should show error when name is too short", async () => {
		render(<SignUp />, { wrapper: Wrapper });

		const nameInput = screen.getByPlaceholderText("Seu nome completo");
		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const form = document.querySelector("form");

		fireEvent.change(nameInput, { target: { value: "Ana" } });
		fireEvent.change(emailInput, {
			target: { value: "usuario@exemplo.com" },
		});
		fireEvent.change(passwordInput, { target: { value: "senha12345" } });
		fireEvent.submit(form!);

		await waitFor(
			() => {
				expect(toast.warn).toHaveBeenCalledWith(
					"Ops! Para prosseguir com o cadastro o campo 'nome' deve conter no mínimo 4 caracteres."
				);
			},
			{ timeout: 3000 }
		);
	});

	it("Should show error when email is invalid", async () => {
		render(<SignUp />, { wrapper: Wrapper });

		const nameInput = screen.getByPlaceholderText("Seu nome completo");
		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const form = document.querySelector("form");

		fireEvent.change(nameInput, { target: { value: "Usuário Teste" } });
		fireEvent.change(emailInput, { target: { value: "email-invalido" } });
		fireEvent.change(passwordInput, { target: { value: "senha12345" } });
		fireEvent.submit(form!);

		await waitFor(
			() => {
				expect(toast.warn).toHaveBeenCalled();
			},
			{ timeout: 3000 }
		);
	});

	it("Should show error when email is too short", async () => {
		render(<SignUp />, { wrapper: Wrapper });

		const nameInput = screen.getByPlaceholderText("Seu nome completo");
		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const form = document.querySelector("form");

		fireEvent.change(nameInput, { target: { value: "Usuário Teste" } });
		fireEvent.change(emailInput, { target: { value: "a@b.c" } });
		fireEvent.change(passwordInput, { target: { value: "senha12345" } });
		fireEvent.submit(form!);

		await waitFor(
			() => {
				expect(toast.warn).toHaveBeenCalledWith(
					"Ops! Para prosseguir com o cadastro, o campo 'e-mail' deve conter no mínimo 6 caracteres."
				);
			},
			{ timeout: 3000 }
		);
	});

	it("Should show error when password is too short", async () => {
		render(<SignUp />, { wrapper: Wrapper });

		const nameInput = screen.getByPlaceholderText("Seu nome completo");
		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const form = document.querySelector("form");

		fireEvent.change(nameInput, { target: { value: "Usuário Teste" } });
		fireEvent.change(emailInput, {
			target: { value: "usuario@exemplo.com" },
		});
		fireEvent.change(passwordInput, { target: { value: "123" } });
		fireEvent.submit(form!);

		await waitFor(
			() => {
				expect(toast.warn).toHaveBeenCalledWith(
					"Ops! Sua senha deve conter no mínimo 8 caracteres. Escolha uma senha mais segura."
				);
			},
			{ timeout: 3000 }
		);
	});

	it("Should call the API, register and redirect when the form is valid", async () => {
		(signUpRequest as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
			id: "1",
			name: "Usuário Teste",
			email: "usuario@exemplo.com",
		});

		render(<SignUp />, { wrapper: Wrapper });

		const nameInput = screen.getByPlaceholderText("Seu nome completo");
		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const form = document.querySelector("form");

		fireEvent.change(nameInput, { target: { value: "Usuário Teste" } });
		fireEvent.change(emailInput, {
			target: { value: "usuario@exemplo.com" },
		});
		fireEvent.change(passwordInput, { target: { value: "senha12345" } });
		fireEvent.submit(form!);

		await waitFor(
			() => {
				expect(signUpRequest).toHaveBeenCalledWith({
					name: "Usuário Teste",
					email: "usuario@exemplo.com",
					password: "senha12345",
				});
				expect(mockNavigate).toHaveBeenCalledWith("/");
			},
			{ timeout: 3000 }
		);
	});

	it("Should show error when API returns error", async () => {
		(signUpRequest as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
			new Error("E-mail já cadastrado")
		);

		render(<SignUp />, { wrapper: Wrapper });

		const nameInput = screen.getByPlaceholderText("Seu nome completo");
		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const form = document.querySelector("form");

		fireEvent.change(nameInput, { target: { value: "Usuário Teste" } });
		fireEvent.change(emailInput, {
			target: { value: "usuario@exemplo.com" },
		});
		fireEvent.change(passwordInput, { target: { value: "senha12345" } });
		fireEvent.submit(form!);

		await waitFor(
			() => {
				expect(toast.error).toHaveBeenCalledWith(
					"E-mail já cadastrado"
				);
			},
			{ timeout: 3000 }
		);
	});

	it("Should show generic error when API throws non-Error object", async () => {
		// Generic API Error Mock
		(signUpRequest as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
			new Error(
				"Ops! Não foi possível criar sua conta no momento. Verifique sua conexão ou tente mais tarde caso o servidor esteja indisponível."
			)
		);

		render(<SignUp />, { wrapper: Wrapper });

		const nameInput = screen.getByPlaceholderText("Seu nome completo");
		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const form = document.querySelector("form");

		fireEvent.change(nameInput, { target: { value: "Usuário Teste" } });
		fireEvent.change(emailInput, {
			target: { value: "usuario@exemplo.com" },
		});
		fireEvent.change(passwordInput, { target: { value: "senha12345" } });
		fireEvent.submit(form!);

		await waitFor(
			() => {
				expect(toast.error).toHaveBeenCalledWith(
					"Ops! Não foi possível criar sua conta no momento. Verifique sua conexão ou tente mais tarde caso o servidor esteja indisponível."
				);
			},
			{ timeout: 3000 }
		);
	});
});
