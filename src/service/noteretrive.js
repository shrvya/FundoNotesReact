import {getToken} from '../utils/common';
import { getNotes} from '../helper/axios'
import { createNotes } from '../helper/axios';
import { updateNotes } from '../helper/axios';
import { deleteNotes } from '../helper/axios';
const token = getToken("token");

let url;
const notes = () => {
   url = "https://backendfundoapp.herokuapp.com/notes"
   
    return getNotes(url, `bearer ${token}`).then((response) => {
        
        return response.data;
    }).catch((err) => {
       console.log(err);
    });
};
const create = (data) => {
   url = "https://backendfundoapp.herokuapp.com/notes"
    return createNotes(url, data, `bearer ${token}`).then((response) => {
        return response
    }).catch((err) => {
        throw err
    })
}
const update = (data,id) => {
    console.log(data);
    url=`https://backendfundoapp.herokuapp.com/notes/${id}`
    return updateNotes(url, data, `bearer ${token}`).then((response) => {
        return response;
    }).catch((err) => {
        throw err;
    })
}

const Delete=(id)=>{
    let url=`https://backendfundoapp.herokuapp.com/notes/${id}`
    return deleteNotes(url, `bearer ${token}`).then((response) => {
        return response;
    }).catch((err) => {
        throw err;
    })
}

export  {
    notes,
    create,
    update,
    Delete
}