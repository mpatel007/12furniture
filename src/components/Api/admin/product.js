import axios from "axios";
import helper from "../../Common/Helper";

function product() {

    const getProductList = async () => {
        let res = {};
        await axios({
            method: 'get',
            url: helper.ApiUrl + '/products',
            ContentType: 'application/json',
            // headers: {
            //     'x-access-token': AuthToken
            // },
            // data: { varient: varient }
        })
            .then(function (response) {
                res = response
            });
        return res;
    }

    const deleteProduct = async (adminAuthToken, id) => {
        let res = {};
        await axios({
            method: 'delete',
            url: helper.ApiUrl + '/products/' + id,
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

    const addProduct = async (adminAuthToken, productName, description, price, stock, productImage,status,variants,productSlug,category_id) => {
        const data = new FormData();
              data.append('productImage', productImage);
              data.append('name', productName);
              data.append('description', description);
              data.append('price', price);
              data.append('stock', stock);
              data.append('status', status);
              data.append('variants', variants);
              data.append('productSlug', productSlug);
              data.append('category_id', category_id);
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/products/add',
            ContentType: 'application/json',
            headers: {
                'x-access-token': adminAuthToken
            },
            data: data
        })
            .then(function (response) {
                res = response
            });
        return res;
    }


    const updateProduct = async (adminAuthToken, productHdnID, productName, description, price, stock,productImage,status,variants,productSlug,category_id) => {
        const data = new FormData();
              data.append('productImage', productImage);
              data.append('name', productName);
              data.append('description', description);
              data.append('price', price);
              data.append('stock', stock);
              data.append('status', status);
              data.append('variants', variants);
              data.append('productSlug', productSlug);
              data.append('category_id', category_id);
        let res = {};
        await axios({
            method: 'put',
            url: helper.ApiUrl + '/products/' + productHdnID,
            ContentType: 'application/json',
            headers: {
                'x-access-token': adminAuthToken
            },
            data: data
        })
            .then(function (response) {
                res = response
            });
        return res;
    }


    const getProductVariant = async (adminAuthToken) => {
     
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/variant/all',
            ContentType: 'application/json',
            headers: {
                'x-access-token': adminAuthToken
            },
            // data: data
        })
            .then(function (response) {
                res = response
            });
        return res;
    }


    const getVariantList = async (adminAuthToken) => {
        let res = {};
        await axios({
            method: 'get',
            url: helper.ApiUrl + '/variant',
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

    const getVariantListForProdctForm = async (adminAuthToken) => {
        let res = {};
        await axios({
            method: 'get',
            url: helper.ApiUrl + '/variant/list/forProdctForm',
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

    return {
        getProductList, deleteProduct, addProduct, updateProduct,getProductVariant,getVariantList,getVariantListForProdctForm
    }
}
const productApi = product();
export default productApi;
