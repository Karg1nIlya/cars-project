import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/auth/IAuth";

export default class AuthService {
    static async login(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        // console.log({login, password})
        return $api.post<AuthResponse>('/login', {login, password})
    }

    static async registration(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        // console.log({login, password})
        return $api.post<AuthResponse>('/registration', {login, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }
}