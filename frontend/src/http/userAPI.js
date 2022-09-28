import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, name) => {
    const {data} = await $host.post('api/user/registration', {email, password, name, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchUserData = async (id) => {
    const {data} = await $authHost.get('/api/user/data/'  + id)
    return data
}

export const fetchAllUsers = async () => {
    const { data } = await $authHost.get(`api/user/data/`)
    return data;
}