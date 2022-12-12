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

    const signinGoogle = async (data) => {
        let res = {};
        await axios({
            method: 'Post',
            url: helper.ApiUrl + '/auth/loginGoogle',
            responseType: 'json',
            data: data
        })
            .then(function (response) {
                res = response
            });
        return res;
    }



    return {
        login,
        signinGoogle
    }
}
const adminApi = admin();
export default adminApi;
