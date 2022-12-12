import axios from "axios";
import helper from "../../Common/Helper";

function category() {

    const addCategory = async (AuthToken, category, status) => {
        let res = {};

        await axios({
            method: "post",
            url: helper.ApiUrl + "/category/add",
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken,
            },
            data: { 
                category: category,
                status: status,
            },
        }).then(function (response) {
                res = response;
        });
        return res;
    };

    const categoryList = async (AuthToken) => {
        let res = {};

        await axios({
            method: "get",
            url: helper.ApiUrl + "/category",
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken,
            },
        }).then(function (response) {
            res = response;
        });
        return res;
    };

    const deleteCategory = async (AuthToken, categoryId) => {
        let res = {};

        await axios({
            method: "delete",
            url: helper.ApiUrl + "/category/" + categoryId,
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken
            },
        }).then(function (response) {
            res = response;
        });
        return res;
    };

    const updateCategory = async (AuthToken, categoryId, categoryName, status) => {
        let res = {};

        await axios({
            method: "put",
            url: helper.ApiUrl + "/category/" + categoryId,
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken
            },
            data: {
                name: categoryName,
                status: status,
            }
        }).then(function (response) {
            res = response;
        });
        return res;
    };
    
    const addSubcategory = async (adminAuthToken,category_id, subcategoryName,status) => {
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/subcategory/add',
            ContentType: 'application/json',
            headers: {
                'x-access-token': adminAuthToken
            },
            data: { subcategory: subcategoryName ,
                     category_id: category_id,
                     status: status,
                     }
        })
            .then(function (response) {
                res = response
            });
        return res;
    };
    
    const SubcategoryList = async (adminAuthToken,category_id) => {
        let res = {};
        await axios({
            method: 'post',
            url: helper.ApiUrl + '/subcategory',
            ContentType: 'application/json',
            headers: {
                'x-access-token': adminAuthToken
            },
            data:{
                category_id:category_id,
            }

        })
            .then(function (response) {
                res = response
            });
        return res;
    };
    const deleteSubcategory = async (adminAuthToken, subcategoryId) => {
        let res = {};
        await axios({
            method: 'delete',
            url: helper.ApiUrl + '/subcategory/' + subcategoryId,
            ContentType: 'application/json',
            headers: {
                'x-access-token': adminAuthToken
            },

        })
            .then(function (response) {
                res = response
            });
        return res;
    };
    const updateSubcategory = async (adminAuthToken, subcategoryId, subcategoryName, status) => {
        let res = {};
        await axios({
            method: 'put',
            url: helper.ApiUrl + '/subcategory/' + subcategoryId,
            ContentType: 'application/json',
            headers: {
                'x-access-token': adminAuthToken
            },
            data: {
                name: subcategoryName,
                status: status,

            }

        })
            .then(function (response) {
                res = response
            });
        return res;
    };

    return {
        addCategory,
        categoryList,
        deleteCategory,
        updateCategory,
        addSubcategory,
        SubcategoryList,
        deleteSubcategory,
        updateSubcategory
    };
};



const categoryApi = category();

export default categoryApi;