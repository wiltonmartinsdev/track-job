import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";


import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { SignIn } from "./Pages/Auth/SignIn";
// import { SignUp } from "./Pages/Auth/SignUp";
// import Home from "./Pages/Home";
// import AppRoutes from "./routes/AppRoutes.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<ToastContainer position="top-center" />
			<SignIn />
			{/* <SignUp /> */}
			{/* <Home /> */}
		</BrowserRouter>
	</StrictMode>
);
