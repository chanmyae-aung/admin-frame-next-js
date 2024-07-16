import useSWRMutation from 'swr/mutation';
import appAxios from '@/lib/axios';
import { LoginForm } from '@/types/login';
import { LoginResponse } from '@/types/auth';

interface LoginInput {
  arg: {
    email: string;
    password: string;
  };
}

export const useLogin = () =>
  useSWRMutation(`/api/v1/login`, (url, { arg }: LoginInput) => {
    return appAxios.post<LoginResponse>(url, arg);
  });
