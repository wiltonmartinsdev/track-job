import { api } from "@/lib/axios"
import { AxiosError } from 'axios';
import { SignInRequestBody, AuthResponse } from "@/types/auth";

export async function signInRequest({ email, password }: SignInRequestBody): Promise<AuthResponse> {
    try {
        const response = await api.post("/sessions", {
            email,
            password
        });
        
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Ops! Não foi possível fazer login. Verifique sua conexão, suas credenciais ou tente mais tarde caso o servidor esteja indisponível.");
    }
}