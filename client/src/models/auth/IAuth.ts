export interface IUser {
    login: string;
    id_user: number;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}