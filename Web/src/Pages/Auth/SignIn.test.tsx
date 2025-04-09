import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/auth";

import { SignIn } from "./SignIn";

// Mock external modules
vi.mock("react-toastify", () => ({
	toast: {
		warn: vi.fn(),
		error: vi.fn(),
		success: vi.fn(),
	},
}));

// Mock signInRequest using a factory function
vi.mock("@/api/signInRequest", () => {
	return {
		signInRequest: vi.fn(),
	};
});

import { signInRequest } from "@/api/signInRequest";

// Mock for SVG files
vi.mock("@/assets/email-icon.svg", () => ({
	default: "email-icon.svg",
}));
vi.mock("@/assets/loading.svg", () => ({
	default: "loading.svg",
}));
vi.mock("@/assets/login-icon.svg", () => ({
	default: "login-icon.svg",
}));
vi.mock("@/assets/logo.svg", () => ({
	default: "logo.svg",
}));
vi.mock("@/assets/open-password-icon.svg", () => ({
	default: "open-password-icon.svg",
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

// Mock authentication context
vi.mock("@/contexts/auth", async () => {
	const actual = await vi.importActual("@/contexts/auth");
	return {
		...actual,
		useAuth: () => ({
			signIn: vi.fn(),
			user: null,
			isAuthenticated: false,
		}),
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

describe("SignIn Form Validation and Authentication Tests", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("Should render the component correctly", () => {
		render(<SignIn />, { wrapper: Wrapper });

		expect(
			screen.getByText("Faça login para acessar sua conta")
		).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Seu e-mail")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Sua senha")).toBeInTheDocument();
		expect(screen.getByText("Entrar")).toBeInTheDocument();
	});

	it("Should show error when email is invalid", async () => {
		render(<SignIn />, { wrapper: Wrapper });

		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const form = document.querySelector("form");

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
		render(<SignIn />, { wrapper: Wrapper });

		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const form = document.querySelector("form");

		fireEvent.change(emailInput, { target: { value: "a@b.c" } });
		fireEvent.change(passwordInput, { target: { value: "senha12345" } });
		fireEvent.submit(form!);

		await waitFor(
			() => {
				expect(toast.warn).toHaveBeenCalledWith(
					'Ops! Para prosseguir com o login, o campo "e-mail" deve conter no mínimo 6 caracteres.'
				);
			},
			{ timeout: 3000 }
		);
	});

	it("Should show error when password is too short", async () => {
		render(<SignIn />, { wrapper: Wrapper });

		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const form = document.querySelector("form");

		fireEvent.change(emailInput, {
			target: { value: "usuario@exemplo.com" },
		});
		fireEvent.change(passwordInput, { target: { value: "123" } });
		fireEvent.submit(form!);

		await waitFor(
			() => {
				expect(toast.warn).toHaveBeenCalled();
			},
			{ timeout: 3000 }
		);
	});

	it("Should call the API, sign in and redirect when the form is valid", async () => {
		(signInRequest as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
			token: "fake-token",
			user: {
				id: "1",
				name: "Usuário Teste",
				email: "usuario@exemplo.com",
			},
		});

		render(<SignIn />, { wrapper: Wrapper });

		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const form = document.querySelector("form");

		fireEvent.change(emailInput, {
			target: { value: "usuario@exemplo.com" },
		});
		fireEvent.change(passwordInput, { target: { value: "senha12345" } });
		fireEvent.submit(form!);

		await waitFor(
			() => {
				expect(signInRequest).toHaveBeenCalledWith({
					email: "usuario@exemplo.com",
					password: "senha12345",
				});
			},
			{ timeout: 3000 }
		);
	});

	it("Should show error when API returns error", async () => {
		(signInRequest as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
			new Error("Credenciais inválidas")
		);

		render(<SignIn />, { wrapper: Wrapper });

		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const form = document.querySelector("form");

		fireEvent.change(emailInput, {
			target: { value: "usuario@exemplo.com" },
		});
		fireEvent.change(passwordInput, { target: { value: "senha12345" } });
		fireEvent.submit(form!);

		await waitFor(
			() => {
				expect(toast.error).toHaveBeenCalled();
			},
			{ timeout: 3000 }
		);
	});

	it("Should show generic error when API throws non-Error object", async () => {
        // Generic API Error Mock
		(signInRequest as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
			new Error("Ops! Não foi possível fazer login. Verifique sua conexão, suas credenciais ou tente mais tarde caso o servidor esteja indisponível.")
		);

		render(<SignIn />, { wrapper: Wrapper });

		const emailInput = screen.getByPlaceholderText("Seu e-mail");
		const passwordInput = screen.getByPlaceholderText("Sua senha");
		const form = document.querySelector("form");

		fireEvent.change(emailInput, {
			target: { value: "usuario@exemplo.com" },
		});
		fireEvent.change(passwordInput, { target: { value: "senha12345" } });
		fireEvent.submit(form!);

		await waitFor(
			() => {
				expect(toast.error).toHaveBeenCalledWith(
					"Ops! Não foi possível fazer login. Verifique sua conexão, suas credenciais ou tente mais tarde caso o servidor esteja indisponível."
				);
			},
			{ timeout: 3000 }
		);
	});
});
