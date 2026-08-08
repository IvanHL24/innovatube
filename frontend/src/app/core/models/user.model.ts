export class User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;

    constructor() {
        this.id = 0;
        this.first_name = '';
        this.last_name = '';
        this.username = '';
        this.email = '';
        this.password = '';
    }
}

export class LoginRequest {
    identifier: string;
    password: string;

    constructor() {
        this.identifier = '';
        this.password = '';
    }
}

export class ForgotPassword {
    username: string;
    email: string;

    constructor() {
        this.username = '';
        this.email = '';
    }
}

export class ResetPassword {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;

    constructor() {
        this.username = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
    }
}