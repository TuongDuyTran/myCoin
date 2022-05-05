import axios from "axios";

export default (url, endpoint, method, data) => {
    return axios({
        method: method,
        url: url + "/" + endpoint,
        data: data
    }).then((res) => {
        return res.data;
    }).catch((error) => {
        const { response } = error;
        const { request, ...errorObject } = response;
        return errorObject.data;
    });
};
