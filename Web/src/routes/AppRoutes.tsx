import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home";

export default function AppRoutes() {
	console.log("🏠 AppRoutes renderizado - usuário está autenticado");

	return (
		<Routes>
			<Route
				path="/home"
				element={<Home />}
			/>
			<Route
				path="/job"
				element={<Home />}
			/>
			{/* Redireciona qualquer rota para /home se estiver autenticado */}
			<Route
				path="*"
				element={
					<Navigate
						to="/home"
						replace
					/>
				}
			/>
		</Routes>
	);
}
