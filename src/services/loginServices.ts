import axios, { AxiosError } from "axios";

export class NetworkError extends Error {
  description: string;

  constructor(message: string, description: string) {
    super(message);
    this.description = description;
    this.name = 'NetworkError';
  }
}

export const loginService = async (username: string, password: string): Promise<{ status: number, message: string }> => {
  try {
    const res = await axios.post('/login', { username, password, app: 'web-test' });

    if (res.status === 200) {
      return { status: res.status, message: res.data?.message || 'Login successful' };
    } else {
      return { status: res.status, message: 'Unexpected response status' };
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.code === "ERR_NETWORK") {
        throw new NetworkError('Error de conexión', 'Verífica la conexión a internet y/o Servidor no responde');
      }

      if (err.response && err.response.status === 400) {
        const error = err.response.data as { message: string, description: string };
        throw new NetworkError(error.message, error.description || 'Error al iniciar sesión');
      }
    }

    throw new Error('ha ocurrido un error inesperado');
  }
}