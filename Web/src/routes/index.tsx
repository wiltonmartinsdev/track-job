import { useAuth } from "@/contexts/auth";
import AppRoutes from "./AppRoutes";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import { SignIn } from "@/Pages/Auth/SignIn";
import { SignUp } from "@/Pages/Auth/SignUp";

export function Routes() {
	const { user, isAuthenticated } = useAuth();

	console.log("🛣️ Renderização das rotas:", {
		hasUser: !!user,
		isAuthenticated,
		userDetails: user
			? { id: user.id, name: user.name, email: user.email }
			: null,
		timestamp: new Date().toISOString(),
	});

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
