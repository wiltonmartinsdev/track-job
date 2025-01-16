import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const notify = {
  success(message: string) {
    toast.success(message);
  },

  error(error: Error | AxiosError) {
    console.error(error);
    
    if (error instanceof AxiosError && error.response?.data?.message) {
      toast.error(error.response.data.message);
      return;
    }

    toast.error("Ocorreu um erro ao processar sua solicitação");
  }
};