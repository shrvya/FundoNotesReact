import {getToken} from '../utils/common';
import { getNotes} from '../helper/axios'
const token = getToken("token");

const url = "http://localhost:4000/notes"
const notes = () => {
    console.log("noteretrieve"+token);
    return getNotes(url, `bearer ${token}`).then((response) => {
        
        return response.data;
    }).catch((err) => {
       console.log(err);
    });
};
export default {notes}