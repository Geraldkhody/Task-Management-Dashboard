import { axiosInstance } from "./axiosInstance";

export const login = (credentials: {email: string, password: string}) => {
    axiosInstance.post("auth/login", credentials )
}

export const register = (data: {name: string, email: string, password: string}) => {
    axiosInstance.post ("auth/register", data)
}