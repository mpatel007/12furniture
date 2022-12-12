import axios from "axios";
import helper from "../../Common/Helper";

function coupon() {

    const addCoupon = async (AuthToken, couponCode, expiryDate, numberOfCoupon, discountType, discountRate, abovePrice, status) => {
        let res = {};

        await axios({
            method: "post",
            url: helper.ApiUrl + "/coupon/add",
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken,
            },
            data: { 
                couponCode: couponCode,
                expiryDate: expiryDate,
                numberOfCoupon: numberOfCoupon,
                discountType: discountType,
                discountRate: discountRate,
                abovePrice: abovePrice,
                status: status,
            },
        }).then(function (response) {
                res = response;
        });
        return res;
    };

    const couponList = async (AuthToken) => {
        let res = {};

        await axios({
            method: "get",
            url: helper.ApiUrl + "/coupon",
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken,
            },
        }).then(function (response) {
            res = response;
        });
        return res;
    };

    const deleteCoupon = async (AuthToken, couponId) => {
        let res = {};

        await axios({
            method: "delete",
            url: helper.ApiUrl + "/coupon/" + couponId,
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken
            },
        }).then(function (response) {
            res = response;
        });
        return res;
    };

    const updateCoupon = async (AuthToken, couponId, couponCode, expiryDate, numberOfCoupon, discountType, discountRate, abovePrice, status) => {
        let res = {};

        await axios({
            method: "put",
            url: helper.ApiUrl + "/coupon/" + couponId,
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken
            },
            data: {
                couponCode: couponCode,
                expiryDate: expiryDate,
                numberOfCoupon: numberOfCoupon,
                discountType: discountType,
                discountRate: discountRate,
                abovePrice: abovePrice,
                status: status,
            }
        }).then(function (response) {
            res = response;
        });
        return res;
    };

    return {
        addCoupon,
        couponList,
        deleteCoupon,
        updateCoupon
    };

};


const couponApi = coupon();

export default couponApi;