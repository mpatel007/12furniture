import axios from "axios";
import helper from "../../Common/Helper";

function product() {

    const getProductList = async () => {
        let res = {};
        await axios({
            method: 'get',
            url: helper.ApiUrl + '/products',
            ContentType: 'application/json',
        })
            .then(function (response) {
                res = response  
            //   console.log(res);
            });
           
        return res;
    }

    const getProductDetails = async (slug) => {

        let res = {};

        await axios({
            method: 'post',
            url: helper.ApiUrl + '/products/details',
            ContentType: 'application/json',
            data: {
                slug: slug,
            }
        }).then(function (response) {
            res = response
        });
        return res;
    }

    const viewCategoryList = async () => {

        let res = {};
        await axios({
            method: "get",
            url: helper.ApiUrl + "/category",
            ContentType: 'application/json',
        }).then(function (response) {
            res = response;
        });
        return res;
    }
    const filterProducts = async (data) => {

        let res = {};

        await axios({
            method: 'post',
            url: helper.ApiUrl + '/products/filter',
            ContentType: 'application/json',
            data:data
        }).then(function (response) {
            res = response
        });
        return res;
    }

    return {
        getProductList,
        getProductDetails,
        viewCategoryList,
        filterProducts

    }
}
const productApi = product();
export default productApi;
