import { useAuth } from "@/contexts/auth";
import AppRoutes from "./AppRoutes";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import { SignIn } from "@/Pages/Auth/SignIn";
import { SignUp } from "@/Pages/Auth/SignUp";

export function Routes() {
	const { user } = useAuth();

	return (
		<RouterRoutes>
			{user ? (
				<Route
					path="/*"
					element={<AppRoutes />}
				/>
			) : (
				<>
					<Route
						path="/"
						element={<SignIn />}
					/>
					<Route
						path="/sign-up"
						element={<SignUp />}
					/>
				</>
			)}
		</RouterRoutes>
	);
}
