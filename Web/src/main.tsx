import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";


import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { SignIn } from "./Pages/Auth/SignIn";
// import AppRoutes from "./routes/AppRoutes.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<ToastContainer position="top-center" />
			<SignIn />
		</BrowserRouter>
	</StrictMode>
);
