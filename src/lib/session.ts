'use client';

import axios from 'axios';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { SessionData, defaultSession } from './session-options';
import { User } from '@/types/auth';

export const useLoginUser = () => {
  const { ...rest } = useSWR<SessionData>(
    '/api/session',
    (url: string) => axios.get(url).then(res => res.data),
    {
      fallbackData: defaultSession,
    }
  );
  return {
    user: rest?.data?.user,
    isLoggedIn: rest?.data?.isLoggedIn,
    tokenExpired: rest?.data?.tokenExpired,
    token: rest?.data?.token,
    ...rest,
  };
};

type PartialAuth = Partial<User>;
type SessionLoginArgType = {
  arg: PartialAuth & { token?: string; tokenExpired: number };
};

export const useSessionLogin = () =>
  useSWRMutation('/api/session', (url: string, { arg }: SessionLoginArgType) =>
    axios.post(url, arg)
  );

export const useSessionLogout = () =>
  useSWRMutation('/api/session', (url: string) => axios.delete(url));
