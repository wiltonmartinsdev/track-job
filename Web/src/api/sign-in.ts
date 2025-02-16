interface SignInRequestBody {
    email: string;
    password: string;
  }
  
  interface AuthResponse {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    }
  }
  
  export async function signInRequest({ email, password }: SignInRequestBody): Promise<AuthResponse> {
    const response = await fetch('http://localhost:3333/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao fazer login');
    }
  
    return data;
  }