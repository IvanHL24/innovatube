export interface LoginRequest {
    identifier: string;
    password: string;
}

export interface JwtUser {
    id: number;
    username: string;
    email: string;
}

export interface ForgotPassword {
    email: string;
    username: string;
}

export interface ResetPassword {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}