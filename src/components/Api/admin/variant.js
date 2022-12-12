import axios from "axios";
import helper from "../../Common/Helper";

function variant() {

    const addVariant = async (AuthToken, variant) => {
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/variant/add',
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken
            },
            data: { varient: variant }
        })
            .then(function (response) {
                res = response
            });
        return res;
    }
    const variantList = async (AuthToken) => {
        let res = {};
        await axios({
            method: 'get',
            url: helper.ApiUrl + '/variant',
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
    const deleteVariant = async (AuthToken, variantId) => {
        let res = {};
        await axios({
            method: 'delete',
            url: helper.ApiUrl + '/variant/' + variantId,
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
    const updateVariant = async (AuthToken, variantId, variantName,status) => {
        let res = {};
        await axios({
            method: 'put',
            url: helper.ApiUrl + '/variant/' + variantId,
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken
            },
            data: {
                name: variantName,
                status:status
            }

        })
            .then(function (response) {
                res = response
            });
        return res;
    }
    const variantValueList = async (AuthToken, variantId) => {
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/variant/value/list',
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken
            },
            data: {
                id: variantId
            }

        })
            .then(function (response) {
                res = response
            });
        return res;
    }
    const addVariantValue = async (AuthToken, variantId, value) => {
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/variant/value/add',
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken
            },
            data: {
                variant_id: variantId,
                value: value

            }
        })
            .then(function (response) {
                res = response
            });
        return res;
    }

    const deleteVariantValue = async (AuthToken, variantId) => {
        let res = {};
        await axios({
            method: 'delete',
            url: helper.ApiUrl + '/variant/value/' + variantId,
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

    const updateVariantValue = async (AuthToken, variantId, value) => {
        let res = {};
        await axios({
            method: 'put',
            url: helper.ApiUrl + '/variant/value/' + variantId,
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken
            },
            data: {
                value: value,
                // status:status
            }

        })
            .then(function (response) {
                res = response
            });
        return res;
    }

    return {
        addVariant,
        variantList,
        deleteVariant,
        updateVariant,
        variantValueList,
        addVariantValue,
        deleteVariantValue,
        updateVariantValue

    }
}
const variantApi = variant();
export default variantApi;
