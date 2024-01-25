import axios, { AxiosError } from "axios"
import AuthService from "../../src/services/AuthService"
import $api, { API_URL } from "../../src/http"
import { AuthResponse } from "../../src/models/auth/IAuth"

export const showLoader = (type: string) => {
    return {
        type
    }
}

export async function login(type: string, login: string, password: string) {
        
    try {
        const response = await AuthService.login(login, password)
        localStorage.setItem('accessToken', response.data.accessToken)
        return({
            type,
            payload: {
                user: response.data.user
            }
        })
    } catch (e: any) {
        throw e
    }
}

export async function registration(type: string, login: string, password: string) {
    try {
        // console.log('asdasdsad1')
        const response = await AuthService.registration(login, password)
        localStorage.setItem('accessToken', response.data.accessToken)
        console.log(response)
        return({
            type,
            payload: {
                user: response.data.user
            }
        })
    } catch (e: any) {
        throw e
        // console.log(e.response?.data?.message)
    }
}

export async function logout(type: string) {
    try {
        const response = await AuthService.logout()
        console.log(response)
        localStorage.removeItem('accessToken')
        return ({
            type
        })
    } catch (error) {
        console.log(error)
    }
}

export async function checkAuth(type: string) {
    try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
        localStorage.setItem('accessToken', response.data.accessToken)
        console.log(response.data)
        return ({
            type,
            payload: {
                user: response.data.user
            }
        })
    } catch (error) {
        
    }
}
