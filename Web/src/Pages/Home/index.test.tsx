import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ReactNode } from "react";
import Home from "./index";

// Mock the dependencies
vi.mock("@/contexts/auth", () => ({
  useAuth: () => ({
    signOut: mockSignOut,
    user: { id: "1", name: "Usuário Teste", email: "teste@example.com" },
    isAuthenticated: true,
  }),
}));

vi.mock("../../services/jobServices", () => ({
  jobService: {
    fetch: vi.fn().mockResolvedValue([]),
    update: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock("../../utils/notifications", () => ({
  notify: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// Mock UI Components
vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children, open, onOpenChange }: { children: ReactNode; open: boolean; onOpenChange: (open: boolean) => void }) => (
    <div data-testid="dialog" data-open={open} onClick={() => onOpenChange(!open)}>
      {children}
    </div>
  ),
  DialogContent: ({ children }: { children: ReactNode }) => <div data-testid="dialog-content">{children}</div>,
  DialogHeader: ({ children }: { children: ReactNode }) => <div data-testid="dialog-header">{children}</div>,
  DialogTitle: ({ children }: { children: ReactNode }) => <div data-testid="dialog-title">{children}</div>,
}));

vi.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: ReactNode }) => <div data-testid="dropdown-menu">{children}</div>,
  DropdownMenuContent: ({ children }: { children: ReactNode }) => <div data-testid="dropdown-content">{children}</div>,
  DropdownMenuItem: ({ children, onClick }: { children: ReactNode; onClick: () => void }) => (
    <button data-testid="dropdown-item" onClick={onClick}>
      {children}
    </button>
  ),
  DropdownMenuTrigger: ({ children }: { children: ReactNode }) => <button data-testid="dropdown-trigger">{children}</button>,
}));

vi.mock("@/components/HamburgerMenu", () => ({
  HamburgerMenu: () => <div data-testid="hamburger-menu">Menu</div>,
}));

vi.mock("@/components/Footer", () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock("@/assets/logo.svg?react", () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock("../../components/JobForm", () => ({
  default: () => <div data-testid="job-form">Job Form</div>,
}));

vi.mock("../../components/JobList", () => ({
  default: () => <div data-testid="job-list">Job List</div>,
}));

// Mock the signOut function
const mockSignOut = vi.fn();

describe("Home Component - Logout Functionality", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should call signOut function when logout button is clicked", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Find the logout button
    const logoutButton = screen.getByTestId("dropdown-item");
    
    // Click the logout button
    fireEvent.click(logoutButton);
    
    // Checks if the signOut function was called
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});