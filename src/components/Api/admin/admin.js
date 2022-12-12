import axios from "axios";
import helper from "../../Common/Helper";

function admin() {

    const login = async (email, password) => {
        let res = {};
        await axios({
            method: 'Post',
            url: helper.ApiUrl + '/auth/signin',
            responseType: 'json',
            data: {
                'email': email,
                'password': password,
            }
        })
            .then(function (response) {
                res = response
            });
        return res;
    }

    return {
        login,

    }
}
const adminApi = admin();
export default adminApi;
