export interface LoginResponse {
  user: User;
  token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: null | string; // nullable string
  created_at: string;
  updated_at: string;
  roles: {
    ads: boolean;
    dev: boolean;
  };
}
