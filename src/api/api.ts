import axios from "axios";

const instance = axios.create({
    baseURL:'https://api.escuelajs.co/api/v1/'
})

export const createUser = async (user) =>{
    const {data} = await instance.post('/users',user)
    return data
}

export const checkEmail = async (email) =>{
    const {data} = await instance.post('/users/is-available',{email})
    return data.isAvailable
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

export const updateProfile = async (id, changes) =>{
    const {data} = await instance.put(`users/${id}`, changes)
    return data
}

