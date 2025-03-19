import { toast } from "react-toastify";
import { vi, describe, it, expect, beforeEach } from "vitest";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import JobForm from "./index";

// Mock dependencies
vi.mock("react-toastify", () => ({
	toast: {
		warn: vi.fn(),
		error: vi.fn(),
		success: vi.fn(),
	},
}));

// Modify the global mock to expose a function we can control
const mockSignOut = vi.fn();
vi.mock("@/contexts/auth", () => ({
	useAuth: () => ({
		signOut: mockSignOut,
		user: null,
		isAuthenticated: false,
	}),
}));

describe("JobForm Component - Validation and Submission Tests", () => {
	const mockOnAdd = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("Should render the form correctly", () => {
		render(<JobForm onAdd={mockOnAdd} />);

		expect(screen.getByText("Nome da Empresa")).toBeInTheDocument();
		expect(screen.getByText("Cargo")).toBeInTheDocument();
		expect(screen.getByText("Nível de Senioridade")).toBeInTheDocument();
		expect(screen.getByText("Moeda de Pagamento")).toBeInTheDocument();
		expect(screen.getByText("Modalidade")).toBeInTheDocument();
		expect(screen.getByText("Regime de Trabalho")).toBeInTheDocument();
		expect(screen.getByText("Localidade")).toBeInTheDocument();
		expect(screen.getByText("Cadastrar candidatura")).toBeInTheDocument();
	});

	it("Should show validation error when company name is too short", async () => {
		render(<JobForm onAdd={mockOnAdd} />);

		const inputs = screen.getAllByRole("textbox");
		const companyNameInput = inputs[0];

		const submitButton = screen.getByText("Cadastrar candidatura");

		await userEvent.type(companyNameInput, "ABC");
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(toast.warn).toHaveBeenCalledWith(
				"Ops! O nome da empresa deve ter no mínimo 4 caracteres."
			);
		});
		expect(mockOnAdd).not.toHaveBeenCalled();
	});

	it("Should show validation error when position is not selected", async () => {
		render(<JobForm onAdd={mockOnAdd} />);

		const inputs = screen.getAllByRole("textbox");
		const companyNameInput = inputs[0];

		const submitButton = screen.getByText("Cadastrar candidatura");

		await userEvent.type(companyNameInput, "Empresa Teste");
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(toast.warn).toHaveBeenCalledWith(
				"Ops! Por favor, selecione um cargo para continuar."
			);
		});
		expect(mockOnAdd).not.toHaveBeenCalled();
	});

	it("Should successfully submit the form with valid data", async () => {
		render(<JobForm onAdd={mockOnAdd} />);

		const inputs = screen.getAllByRole("textbox");
		const companyNameInput = inputs[0];
		await userEvent.type(companyNameInput, "Empresa Teste");

		// Select position
		const frontendRadio = screen.getByLabelText("Front-end");
		fireEvent.click(frontendRadio);

		// Select seniority level
		const juniorRadio = screen.getByLabelText("Júnior");
		fireEvent.click(juniorRadio);

		// Select payment currency
		const realRadio = screen.getByLabelText("R$ Real");
		fireEvent.click(realRadio);

		// Select vacancy modality
		const remoteRadio = screen.getByLabelText("Remota");
		fireEvent.click(remoteRadio);

		// Select work regime
		const cltRadio = screen.getByLabelText("CLT");
		fireEvent.click(cltRadio);

		// Select location - modifying to directly select São Paulo without checking the popover
		const locationButton = screen.getByRole("combobox", { name: "" });
		fireEvent.click(locationButton);

		// Try finding São Paulo directly without checking the popover text
		const spOption = await screen.findByText("São Paulo");
		fireEvent.click(spOption);

		// Submit form
		const submitButton = screen.getByText("Cadastrar candidatura");
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(mockOnAdd).toHaveBeenCalledWith({
				id: "",
				company_name: "Empresa Teste",
				position: "Desenvolvedor Front-end",
				seniority_level: "Júnior",
				payment_currency: "Real",
				initial_salary: 0,
				current_salary: 0,
				status: "Enviada",
				process_phase: "Envio do Currículo",
				vacancy_modality: "Remota",
				work_regime: "CLT",
				place: "São Paulo",
			});
		});
	});

	it("Should handle API errors correctly", async () => {
		mockOnAdd.mockRejectedValueOnce({
			response: {
				status: 500,
			},
		});

		render(<JobForm onAdd={mockOnAdd} />);

		const inputs = screen.getAllByRole("textbox");
		const companyNameInput = inputs[0];
		await userEvent.type(companyNameInput, "Empresa Teste");

		// Select position
		const frontendRadio = screen.getByLabelText("Front-end");
		fireEvent.click(frontendRadio);

		// Select seniority level
		const juniorRadio = screen.getByLabelText("Júnior");
		fireEvent.click(juniorRadio);

		// Select payment currency
		const realRadio = screen.getByLabelText("R$ Real");
		fireEvent.click(realRadio);

		// Select vacancy modality
		const remoteRadio = screen.getByLabelText("Remota");
		fireEvent.click(remoteRadio);

		// Select work regime
		const cltRadio = screen.getByLabelText("CLT");
		fireEvent.click(cltRadio);

		// Select location - modifying to directly select São Paulo without checking the popover
		const locationButton = screen.getByRole("combobox", { name: "" });
		fireEvent.click(locationButton);

		// Try finding Sao Paulo directly without checking the popover text
		const spOption = await screen.findByText("São Paulo");
		fireEvent.click(spOption);

		// Submit form
		const submitButton = screen.getByText("Cadastrar candidatura");
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith(
				"Ocorreu um erro ao atualizar a vaga. Tente novamente."
			);
		});
	});

	it("Should handle authentication errors correctly", async () => {
		// We don't need to redefine the mock here, just use the mockSignOut we already defined

		mockOnAdd.mockRejectedValueOnce({
			response: {
				status: 401,
				data: {
					message: "JWT token não informado!",
				},
			},
		});

		render(<JobForm onAdd={mockOnAdd} />);

		const inputs = screen.getAllByRole("textbox");
		const companyNameInput = inputs[0];
		await userEvent.type(companyNameInput, "Empresa Teste");

		// Select position
		const frontendRadio = screen.getByLabelText("Front-end");
		fireEvent.click(frontendRadio);

		// Select seniority level
		const juniorRadio = screen.getByLabelText("Júnior");
		fireEvent.click(juniorRadio);

		// Select payment currency
		const realRadio = screen.getByLabelText("R$ Real");
		fireEvent.click(realRadio);

		// Select vacancy modality
		const remoteRadio = screen.getByLabelText("Remota");
		fireEvent.click(remoteRadio);

		// Select work regime
		const cltRadio = screen.getByLabelText("CLT");
		fireEvent.click(cltRadio);

		// Select location - modifying to directly select São Paulo without checking the popover
		const locationButton = screen.getByRole("combobox", { name: "" });
		fireEvent.click(locationButton);

		// Try finding São Paulo directly without checking the popover text
		const spOption = await screen.findByText("São Paulo");
		fireEvent.click(spOption);

		// Submit form
		const submitButton = screen.getByText("Cadastrar candidatura");
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith(
				"🔐 Você precisa fazer login para proteger seus dados, você será redirecionado ao login em 5 segundos...⏳"
			);
		});
	});
});
