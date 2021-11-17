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
