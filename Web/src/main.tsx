import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./routes/AppRoutes";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<ToastContainer position="top-center" />
			<AppRoutes />
		</BrowserRouter>
	</StrictMode>
);
