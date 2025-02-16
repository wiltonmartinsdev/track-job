import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./contexts/auth";
import { queryClient } from "./lib/reactQuery";
import { Routes } from "./routes";

import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AuthProvider>
					<ToastContainer position="top-center" />
					<Routes />
				</AuthProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>
);
