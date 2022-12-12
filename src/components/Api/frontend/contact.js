import axios from "axios";
import helper from "../../Common/Helper";

function contact() {

    const sendMessage = async (name, email, message) => {

        let res = {};

        await axios({
            method: 'post',
            url: helper.ApiUrl + '/contact/add',
            ContentType: 'application/json',
            data: { 
                name: name,
                email: email,
                message: message,
            },
        }).then(function (response) {
                res = response
        });
           
        return res;

    }

    return {
        sendMessage

    }
}
const contactApi = contact();
export default contactApi;