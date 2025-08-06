import { axiosInstance } from "./axiosInstance";

export const login = (credentials: {username: string, password: string}) => {
    return axiosInstance.post("auth/login", credentials);
}

export const register = (data: {name: string, email: string, password: string}) => {
    return axiosInstance.post("auth/register", data);
}
