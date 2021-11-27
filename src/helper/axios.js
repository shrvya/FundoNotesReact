import axios from 'axios'
import {setUserSession} from '../utils/common'
export const axiosfunction = (method, url, data) => {
    axios({
        method: method,
        url: url,
        data: data
    }).then(function (response) 
    {
        setUserSession(response.data.message);
        console.log("axios"+response.data);
        console.log("axios"+response);
    })
        .catch(function (error) {
            console.log("ERRRR:: ", error.response.data);
        });
}

export const getNotes = (url, token) => {
    console.log(token);
    return(axios({
        method: "get",
        url: url,
        headers: {
            Authorization: token
        }
    }))}
   export const createNotes = (url, data, token) => {
        return(axios({
            method: "post",
            url: url,
            data: data,
            headers: {
                Authorization: token
            }
        }))
    }
    export const updateNotes = (url, data, token) => {
        return(axios({
            method: "put",
            url: url,
            data: data,
            headers: {
                Authorization: token
            }
        }))
    }
   export const deleteNotes=(url,token)=>{
        return(axios({
            method:"delete",
            url:url,
            headers: {
                Authorization: token
            }
        }))
    }