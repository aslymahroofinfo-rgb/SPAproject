export interface LoginRequest {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  image?: string;
  accessToken?: string;
  token?: string;
  refreshToken?: string;
}

export interface PersistedAuthState {
  user: AuthResponse | null;
  token: string | null;
}

