import { api } from "@/lib/axios"
import { AxiosError } from 'axios';
import { SignUpRequestBody, SignUpResponse } from "@/types/auth";

export async function signUpRequest({ name, email, password }: SignUpRequestBody): Promise<SignUpResponse> {
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
        throw new Error("Ops! Não foi possível criar sua conta no momento. Verifique sua conexão ou tente mais tarde caso o servidor esteja indisponível.");
    }
}