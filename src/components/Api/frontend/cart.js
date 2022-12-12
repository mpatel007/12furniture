import axios from "axios";
import helper from "../../Common/Helper";

function cart() {

    const addToCart = async (data) => {
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/cartitem',
            ContentType: 'application/json',
            data: data
        })
            .then(function (response) {
                res = response

            });

        return res;
    }
    const listCartItems = async (sessionId) => {
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/cartitem/list',
            ContentType: 'application/json',
            data: {
                "session_id": sessionId
            }
        })
            .then(function (response) {
                res = response

            });

        return res;
    }
    const updateCart = async (cartId, data) => {
        let res = {};
        await axios({
            method: 'put',
            url: helper.ApiUrl + '/cartitem/' + cartId,
            ContentType: 'application/json',
            data: data

        })
            .then(function (response) {
                res = response

            });

        return res;
    }
    const removeCartItem = async (cartId) => {
        let res = {};
        await axios({
            method: 'delete',
            url: helper.ApiUrl + '/cartitem/' + cartId,
            ContentType: 'application/json',

        })
            .then(function (response) {
                res = response

            });

        return res;
    }
    const payment = async (authToken, data) => {
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/orders/charge',
            ContentType: 'application/json',
            headers: {
                'x-access-token': authToken
            },

            data: data

        })
            .then(function (response) {
                res = response

            });

        return res;
    }
    const saveOrderDetails = async (authToken, data) => {
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/orders/detail/save',
            ContentType: 'application/json',
            headers: {
                'x-access-token': authToken
            },

            data: data

        })
            .then(function (response) {
                res = response

            });

        return res;

    }
    const applyCouponCode = async (authToken, couponCode,user_id) => {
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/orders/checkCoupon',
            ContentType: 'application/json',
            headers: {
                'x-access-token': authToken
            },

            data: {
                couponCode: couponCode,
                userId:user_id
            }

        })
            .then(function (response) {
                res = response

            });

        return res;

    }

    return {
        addToCart,
        listCartItems,
        updateCart,
        removeCartItem,
        payment,
        saveOrderDetails,
        applyCouponCode

    }

}
const cartApi = cart();
export default cartApi;
