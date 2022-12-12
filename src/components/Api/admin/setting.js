import axios from "axios";
import helper from "../../Common/Helper";

function setting() {
    
    const uploadHeaderLogo = async (AuthToken, headerLogo) => {
        const data = new FormData();
        data.append("headerLogo", headerLogo);

        let res = {};
        await axios({
            method: "post",
            url: helper.ApiUrl + "/setting/headerlogo/save",
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken,
            },
            data: data,
        }).then(function (response) {
                res = response;
        });
        return res;
    };

    const uploadFooterLogo = async (AuthToken, footerLogo) => {
        const data = new FormData();
        data.append("footerLogo", footerLogo);

        let res = {};

        await axios({
            method: "post",
            url: helper.ApiUrl + "/setting/footerlogo/save",
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken,
            },
            data: data,
        }).then(function (response) {
                res = response;
        });
        return res;
    };

    const addContactData = async (AuthToken, infoContactNumber, infoAddress, infoOpenTime, infoEmail) => {
        let res = {};

        await axios({
            method: "post",
            url: helper.ApiUrl + "/setting/contactinformation/save",
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken,
            },
            data: {
                infoContactNumber: infoContactNumber,
                infoAddress: infoAddress,
                infoOpenTime: infoOpenTime,
                infoEmail: infoEmail,
            },
        }).then(function (response) {
                res = response;
        });
        return res;
    };

    const addSocialMediaData = async (AuthToken, Instagram, Pinterest, LinkedIn, Twitter, Facebook) => {
        let res = {};

        await axios({
            method: "post",
            url: helper.ApiUrl + "/setting/socialmedia/save",
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken,
            },
            data: {
                Instagram: Instagram,
                Pinterest: Pinterest,
                LinkedIn: LinkedIn,
                Twitter: Twitter,
                Facebook: Facebook,
            },
        }).then(function (response) {
                res = response;
        });
        return res;
    };

    const addPaymentData = async (AuthToken, publishableKey, secretKey) => {
        let res = {};

        await axios({
            method: "post",
            url: helper.ApiUrl + "/setting/payment/save",
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken,
            },
            data: {
                publishableKey: publishableKey,
                secretKey: secretKey,
            },
        }).then(function (response) {
                res = response;
        });
        return res;
    };

    const addGeneralData = async (AuthToken, tax, currency,taxName) => {
        let res = {};

        await axios({
            method: "post",
            url: helper.ApiUrl + "/setting/general/save",
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken,
            },
            data: {
                tax: tax,
                currency: currency,
                taxName: taxName,

            },
        }).then(function (response) {
                res = response;
        });
        return res;
    };

    const contactList = async (AuthToken) => {
        let res = {};

        await axios({
            method: "get",
            url: helper.ApiUrl + "/setting/list",
            ContentType: 'application/json',
            headers: {
                'x-access-token': AuthToken,
            },
        }).then(function (response) {
            res = response;
        });
        return res;
    };

    return {
        uploadHeaderLogo,
        uploadFooterLogo,
        addContactData,
        addSocialMediaData,
        addPaymentData,
        addGeneralData,
        contactList,
    };

};

const settingApi = setting();
export default settingApi;