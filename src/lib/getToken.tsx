'use server';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from './session-options';
import { cookies } from 'next/headers';

export const getToken = async () => {
  return getIronSession<SessionData>(cookies(), sessionOptions).then(data => data?.token);
};

export const getUserData = async () => {
  return getIronSession<SessionData>(cookies(), sessionOptions).then(data => data?.user);
};
