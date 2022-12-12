import axios from "axios";
import helper from "../../Common/Helper";

function user() {

    const getUserList = async (AuthToken) => {
        let res = {};
        await axios({
            method: 'get',
            url: helper.ApiUrl + '/user',
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken
            },

        })
            .then(function (response) {
                res = response
            });
        return res;
    }
    const addUser = async (AuthToken, userData) => {
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/user/add',
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken
            },
            data: userData

        })
            .then(function (response) {
                res = response
            });
        return res;

    }
    const deleteUser = async (AuthToken, userId) => {
        let res = {};
        await axios({
            method: 'delete',
            url: helper.ApiUrl + '/user/' + userId,
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken
            },

        })
            .then(function (response) {
                res = response
            });
        return res;

    }
    const updateUser = async (AuthToken, userData, userId) => {
        let res = {};
        await axios({
            method: 'put',
            url: helper.ApiUrl + '/user/' + userId,
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken
            },
            data: userData

        })
            .then(function (response) {
                res = response
            });
        return res;
    }

    return {
        getUserList,
        addUser,
        deleteUser,
        updateUser

    }
}
const userApi = user();
export default userApi;
