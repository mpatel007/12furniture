import axios from "axios";
import helper from "../../Common/Helper";

function common() {

    const getSettingValuebyName = async (name) => {

        let res = {};

        await axios({
            method: 'post',
            url: helper.ApiUrl + '/setting/value',
            ContentType: 'application/json',
            data: { 
                name: name,
            },
        }).then(function (response) {
                res = response
        });
           
        return res;

    }

    return {
        getSettingValuebyName

    }
}
const commonApi = common();
export default commonApi;