export interface CreateUser {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    ceated_at: Date;
}