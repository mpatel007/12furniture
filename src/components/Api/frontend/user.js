import axios from "axios";
import helper from "../../Common/Helper";

function user() {


    const addUser = async (userData) => {
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/auth/signup',
            ContentType: 'application/json',

            data: userData

        })
            .then(function (response) {
                res = response

            });

        return res;

    }
    const updateUser = async (authToken, userData, userId) => {
        let res = {};
        await axios({
            method: 'put',
            url: helper.ApiUrl + '/user/' + userId,
            ContentType: 'application/json',
            headers: {
                'x-access-token': authToken
            },

            data: userData

        })
            .then(function (response) {
                res = response

            });

        return res;

    }
    const userOrderList = async (authToken, userId) => {
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/orders/list',
            ContentType: 'application/json',
            headers: {
                'x-access-token': authToken
            },

            data: {
                userId: userId
            }

        })
            .then(function (response) {
                res = response
            });
        return res;
    }

    const updateUserPassword = async (UserAuthToken, oldPassword, newPassword, confirmPassword, userId) => {
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/user/changePassword',
            ContentType: 'application/json',
            headers: {
                'x-access-token': UserAuthToken
            },
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword,
                confirmPassword: confirmPassword,
                id: userId
            }
        })
            .then(function (response) {
                res = response
            });
        return res;
    }
    const userLastAddress = async (userId) => {
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/orders/userLastAddress',
            ContentType: 'application/json',

            data: {
                userId: userId
            }

        })
            .then(function (response) {
                res = response
            });
        return res;
    }


    return {
        addUser,
        updateUser,
        userOrderList,
        updateUserPassword,
        userLastAddress
    }
}


const registerApi = user();
export default registerApi;
