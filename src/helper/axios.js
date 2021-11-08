import axios from 'axios'

const axiosfunction = (method, url, data) => {
    axios({
        method: method,
        url: url,
        data: data
    }).then(function (response) {
        console.log(response.data);
    })
        .catch(function (error) {
            console.log("ERRRR:: ", error.response.data);
        });
}
export default axiosfunction