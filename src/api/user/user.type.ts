export interface SecureUser {
    id: string;
    email: string;
    avatar: string | null;
    name: string;
    role: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface User extends SecureUser {
    password: string;
}

export interface RegistrationUser {
    user: SecureUser | null;
    jwt: string;
}
