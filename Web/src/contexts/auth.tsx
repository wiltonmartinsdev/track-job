import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
	useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

interface User {
	id: string;
	name: string;
	email: string;
}

interface AuthContextData {
	user: User | null;
	signIn: (token: string, user: User) => void;
	signOut: () => void;
	isAuthenticated: boolean;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(() => {
		const storedUser = localStorage.getItem("@TrackJob:user");
		const storedToken = localStorage.getItem("@TrackJob:token");

		// Verifica se ambos token e user existem
		if (storedUser && storedToken) {
			try {
				const parsedUser = JSON.parse(storedUser);

				return parsedUser;
			} catch (error) {
				console.error("❌ Erro ao fazer parse do usuário:", error);
				// Se houver erro ao fazer parse, limpa os dados
				localStorage.removeItem("@TrackJob:token");
				localStorage.removeItem("@TrackJob:user");
				return null;
			}
		}

		return null;
	});

	const navigate = useNavigate();
	const isAuthenticated = !!user;

	// Efeito para navegar automaticamente quando o usuário for restaurado
	useEffect(() => {
		if (user && window.location.pathname === "/") {
			navigate("/home", { replace: true });
		}
	}, [user, navigate]);

	const signOut = useCallback(() => {
		localStorage.removeItem("@TrackJob:token");
		localStorage.removeItem("@TrackJob:user");
		setUser(null);
		navigate("/");
	}, [navigate]);

	// Verifica periodicamente se o token ainda existe
	useEffect(() => {
		const checkAuth = () => {
			const storedToken = localStorage.getItem("@TrackJob:token");

			// Se o usuário está logado mas não há token, faz logout
			if (user && !storedToken) {
				signOut();
			}

			// Se há token mas não há usuário, limpa o token
			if (!user && storedToken) {
				localStorage.removeItem("@TrackJob:token");
			}
		};

		// Verifica a cada 30 segundos
		const interval = setInterval(checkAuth, 30000);

		return () => clearInterval(interval);
	}, [user, signOut]);

	function signIn(token: string, user: User) {
		localStorage.setItem("@TrackJob:token", token);
		localStorage.setItem("@TrackJob:user", JSON.stringify(user));
		setUser(user);

		navigate("/home");
	}

	return (
		<AuthContext.Provider
			value={{ user, signIn, signOut, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
