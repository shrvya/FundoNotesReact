import {axiosfunction} from "../helper/axios"
export const users=(data)=>{
    axiosfunction('post','https://backendfundoapp.herokuapp.com/users',data)
}
export const loginusers=(data)=>{
    axiosfunction('post','https://backendfundoapp.herokuapp.com/users/login',data)
}
export const forgotusers=(data)=>{
    axiosfunction('post','https://backendfundoapp.herokuapp.com/users/forgot',data)
}
export const resetusers=(token,data)=>{
    axiosfunction('post',`https://backendfundoapp.herokuapp.com/users/reset/${token}`,data)
}

