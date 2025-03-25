import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import JobList from "./index";

// Mock for delete function
const mockOnDeleteJob = vi.fn();
const mockOnEditJob = vi.fn();

// Test Data
const mockJobs = [
  {
    id: "1",
    company_name: "Empresa Teste",
    position: "Desenvolvedor Front-end",
    seniority_level: "Pleno",
    payment_currency: "Real",
    initial_salary: 5000,
    current_salary: 5000,
    vacancy_modality: "Remota",
    work_regime: "CLT",
    place: "São Paulo",
    status: "Em andamento",
    process_phase: "Entrevista técnica",
    created_at: "2023-06-15T10:00:00Z",
    updated_at: "2023-06-20T14:30:00Z"
  }
];

// Mock for utility functions
vi.mock("../../utils/currencyUtils", () => ({
  getCurrencySymbol: () => "R$"
}));

describe("JobList Component - Job Delete", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should call onDeleteJob function when delete button is confirmed", async () => {
    render(
      <JobList 
        jobs={mockJobs} 
        onEditJob={mockOnEditJob} 
        onDeleteJob={mockOnDeleteJob} 
      />
    );

    // Expand the accordion to show the job details
    const accordionTrigger = screen.getByText("Empresa Teste");
    fireEvent.click(accordionTrigger);

    // Find and click the delete button to open the confirmation dialog
    const deleteButton = screen.getByText("Excluir");
    fireEvent.click(deleteButton);

    // Checks if confirmation dialog has been opened
    const confirmationTitle = screen.getByText("Você tem certeza que deseja excluir esta candidatura?");
    expect(confirmationTitle).toBeInTheDocument();

    // Find and click the delete confirmation button
    const confirmDeleteButton = screen.getAllByText("Excluir")[1]; // O segundo botão "Excluir" é o de confirmação
    fireEvent.click(confirmDeleteButton);

    // Checks if the onDeleteJob function was called with the correct parameters
    expect(mockOnDeleteJob).toHaveBeenCalledTimes(1);
    expect(mockOnDeleteJob).toHaveBeenCalledWith("1", "Empresa Teste");
  });

  it("Should not call onDeleteJob function when deletion is canceled", async () => {
    render(
      <JobList 
        jobs={mockJobs} 
        onEditJob={mockOnEditJob} 
        onDeleteJob={mockOnDeleteJob} 
      />
    );

    // Expand the accordion to show the job details
    const accordionTrigger = screen.getByText("Empresa Teste");
    fireEvent.click(accordionTrigger);

    // Find and click the delete button to open the confirmation dialog
    const deleteButton = screen.getByText("Excluir");
    fireEvent.click(deleteButton);

    // Checks if confirmation dialog has been opened
    const confirmationTitle = screen.getByText("Você tem certeza que deseja excluir esta candidatura?");
    expect(confirmationTitle).toBeInTheDocument();

    // Find and click the cancel button
    const cancelButton = screen.getByText("Cancelar");
    fireEvent.click(cancelButton);

    // Checks if the onDeleteJob function has not been called
    expect(mockOnDeleteJob).not.toHaveBeenCalled();
  });

  it("Should display warning message about irreversible delete action", async () => {
    render(
      <JobList 
        jobs={mockJobs} 
        onEditJob={mockOnEditJob} 
        onDeleteJob={mockOnDeleteJob} 
      />
    );

    // Expand the accordion to show the job details
    const accordionTrigger = screen.getByText("Empresa Teste");
    fireEvent.click(accordionTrigger);

    // Find and click the delete button to open the confirmation dialog
    const deleteButton = screen.getByText("Excluir");
    fireEvent.click(deleteButton);

    // Check if the alert message is present
    const alertMessage = screen.getByText(/Atenção! Esta ação é irreversível/i);
    expect(alertMessage).toBeInTheDocument();
  });
});