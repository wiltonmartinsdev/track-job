export interface SignInRequestBody {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  }
}

export interface SignUpRequestBody {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  // Adicione aqui os campos retornados pela API no cadastro
  id: string;
  name: string;
  email: string;
}