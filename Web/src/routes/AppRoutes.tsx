import { Routes, Route } from "react-router-dom";

import { SignIn } from "@/Pages/Auth/SignIn";
import { SignUp } from "@/Pages/Auth/SignUp";

import Home from "../Pages/Home";

export default function AppRoutes() {
	return (
		<Routes>
			<Route
				path="/"
				index
				element={<SignIn />}
			/>
			<Route
				path="/sign-up"
				element={<SignUp />}
			/>
			<Route
				path="/home"
				element={<Home />}
			/>
		</Routes>
	);
}
