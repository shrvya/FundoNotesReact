import {axiosfunction} from "../helper/axios"
export const users=(data)=>{
    axiosfunction('post','http://localhost:4000/users',data)
}
export const loginusers=(data)=>{
    axiosfunction('post','http://localhost:4000/users/login',data)
}
export const forgotusers=(data)=>{
    axiosfunction('post','http://localhost:4000/users/forgot',data)
}
export const resetusers=(token,data)=>{
    axiosfunction('post',`http://localhost:4000/users/reset/${token}`,data)
}

