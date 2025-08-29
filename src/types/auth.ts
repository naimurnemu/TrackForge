import { UserProfile } from "./user";

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error?: string;
}

