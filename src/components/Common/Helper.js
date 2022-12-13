
const mode = "dev";
//production 

let helper = {
    ApiUrl: 'http://localhost:8080/api',
    ProductImgPath: 'http://localhost:8080/product/resize/',
    mainProductImgPath: 'http://localhost:8080/product/',
    settingHeaderLogoImg: 'http://localhost:8080/setting/headerLogo.jpg',
    settingPath: 'http://localhost:8080/setting/',
    settingFooterLogoImg: 'http://localhost:8080/setting/footerLogo.jpg',
    noImgPath: 'http://localhost:8080/noImg.png',
    BASE_URL: "http://localhost:3000"
}

if (mode == "production") {

    helper = {
        ApiUrl: 'http://192.163.31.11:8080/api',
        ProductImgPath: 'http://192.163.31.11:8080/product/resize/',
        mainProductImgPath: 'http://192.163.31.11:8080/product/',
        settingPath: 'http://192.163.31.11:8080/setting/',
        settingHeaderLogoImg: 'http://192.163.31.11:8080/setting/headerLogo.jpg',
        settingFooterLogoImg: 'http://192.163.31.11:8080/setting/footerLogo.jpg',
        noImgPath: 'http://192.163.31.11:8080/noImg.png',
        BASE_URL: "http://192.163.31.11"
    }
}
export function ImageExist(url) {
    var img = new Image();
    img.src = url;
    return img.height != 0 ? true : false;
}
export function uniqueDeviceId() {

    const uniq = localStorage.getItem("uniqueID");
    if (uniq != '' && uniq != null) {
        return uniq;
    } else {
        var navigator_info = window.navigator;
        var screen_info = window.screen;
        var uid = navigator_info.mimeTypes.length;
        uid += navigator_info.userAgent.replace(/\D+/g, '');
        uid += navigator_info.plugins.length;
        uid += screen_info.height || '';
        uid += screen_info.width || '';
        uid += screen_info.pixelDepth || '';
        uid = uid.substr(uid.length - 10)
        localStorage.setItem("uniqueID", uid);
        return uid
    }


}
export function priceFormat(m) {
    let price = parseInt(m)
    let nf = new Intl.NumberFormat('en-US');
    return nf.format(price)
}

export function getSettingValuebyName(name) {
    let settingNameValueData = localStorage.getItem("settingNameValueData");
    settingNameValueData = JSON.parse(settingNameValueData);
    let valueOfName = '';
    if (settingNameValueData.length > 0) {
        let valObj = settingNameValueData.find(o => o.name == name)
        console.log('valObj:', valObj)
        if(valObj != undefined){
            valueOfName = valObj?.value
            console.log('valueOfName:', valueOfName)
        }
    }
    return valueOfName;
}


export default helper;
