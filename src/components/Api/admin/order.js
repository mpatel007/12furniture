import axios from "axios";
import helper from "../../Common/Helper";

function order() {
    const getOrderList = async (adminAuthToken) => {
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/orders/list',
            ContentType: 'application/json',
            headers: {
                'x-access-token': adminAuthToken
            },
        })
            .then(function (response) {
                res = response
            });
        return res;
    }

    // const getUserOrderProducts = async (adminAuthToken,ordetId) => {
    //     let res = {};
    //     await axios({
    //         method: 'post',
    //         url: helper.ApiUrl + '/orders/products',
    //         ContentType: 'application/json',
    //         headers: {
    //             'x-access-token': adminAuthToken
    //         },
    //         data:{
    //             'ordetId' : ordetId
    //         }
    //     })
    //         .then(function (response) {
    //             res = response
    //         });
    //     return res;
    // }

    return {
        getOrderList
    }
}
const orderApi = order();
export default orderApi;
