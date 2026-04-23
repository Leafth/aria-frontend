export interface AuthData {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  reset_password_token: string;
  password: string;
  password_confirmation: string;
}
