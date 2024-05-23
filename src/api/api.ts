import axios from "axios";

const instance = axios.create({
    baseURL:'https://api.escuelajs.co/api/v1/'
})

export const createUser = async (user) =>{
    const {data} = await instance.post('/users',user)
    return data
}

export const loginUser = async (user) =>{
    const {data} = await instance.post('/auth/login',user)
    return data
}

export const getProfile = async (token) =>{
    const {data} = await instance.get('auth/profile', {
        headers:{
            "Authorization": `Bearer ${token} `
        }
    })
    return data
}