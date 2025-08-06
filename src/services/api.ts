import { axiosInstance } from "./axiosInstance";
import type { NewTask, Task } from "../types";

export const login = (credentials: {username: string, password: string}) => {
    return axiosInstance.post("auth/login", credentials);
}

export const register = (data: {name: string, email: string, password: string}) => {
    return axiosInstance.post("auth/register", data);
}

export const getTasks = () => {
    return axiosInstance.get("https://dummyjson.com/todos");
}

export const addTask = (task: NewTask) => {
    return axiosInstance.post("https://dummyjson.com/todos/add", task);
}

export const updateTask = (task: Task) => {
    return axiosInstance.put(`https://dummyjson.com/todos/${task.id}`, task);
}

export const deleteTask = (id: number) => {
    return axiosInstance.delete(`https://dummyjson.com/todos/${id}`);
}
