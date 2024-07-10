import { LoginResponse } from "@/types/auth";
import { SessionOptions } from "iron-session";

const cookieName = process.env.SESSION_COOKIE_NAME as string;
const password = process.env.SESSION_COOKIE_PASSWORD as string;
const isProduction = process.env.NODE_ENV === "production";

export interface SessionData {
  isLoggedIn?: boolean;
  token?: string;
  user?: LoginResponse;
  tokenExpired?: number;
}

export const defaultSession = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password,
  cookieName,
  cookieOptions: {
    secure: isProduction,
  },
};
