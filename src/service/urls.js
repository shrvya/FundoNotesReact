import axiosfunction from "../helper/axios"
export const users=(data)=>{
    axiosfunction('post','http://localhost:4000/users',data)
}
export const loginusers=(data)=>{
    axiosfunction('post','http://localhost:4000/users/login',data)
}
