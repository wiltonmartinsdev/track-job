import { api } from "@/lib/axios"
import { AxiosError } from 'axios';

export interface SignUpInBody {
    name: string;
    email: string;
    password: string;
}

export async function signUpRequest({ name, email, password }: SignUpInBody) {
    try {
        const response = await api.post("/user", {
            name,
            email,
            password
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Ops! Não foi possível criar sua conta no momento. Por favor, verifique sua conexão com a internet e tente novamente em instantes.");
    }
}