import React, { useState, useEffect } from "react"
import Setting from "../../View/admin/Setting/Setting"
import ToastAlert from "../../Common/ToastAlert";
import PageLoader from "../../Common/PageLoader";
import { validateAll } from "indicative/validator";
import settingApi from "../../Api/admin/setting";
import helper from "../../Common/Helper";

function SettingController() {

    const [loading, setLoading] = useState(false);

    const [update, setUpdate] = useState(false);

    const [expand, setExpand] = useState(false);

    const [tempHeaderLogo, setTempHeaderLogo] = useState('');
    const [tempFooterLogo, setTempFooterLogo] = useState('');


    var adminAuthToken = localStorage.getItem("adminAuthToken");

    const [setting, setSetting] = useState({
        headerLogo: "",
        footerLogo: "",
        infoContactNumber: "",
        infoAddress: "",
        infoOpenTime: "",
        infoEmail: "",
        Instagram: "",
        Pinterest: "",
        LinkedIn: "",
        Twitter: "",
        Facebook: "",
        publishableKey: "",
        secretKey: "",
        taxName: "",
        tax: "",
        currency: "",
        error: [],
    });

    const {
        headerLogo, footerLogo, taxName,infoContactNumber, infoAddress, infoOpenTime, infoEmail, Instagram, Pinterest, LinkedIn, Twitter, Facebook, publishableKey, secretKey, tax, currency, error,
    } = setting;

    useEffect(() => {
        (async () => {

            setLoading(true);
            const updatedState = {};
            updatedState.length = 0

            // Api Call for setting list
            const settingDataList = await settingApi.contactList(adminAuthToken);

            if (settingDataList.data.status == 1) {
                settingDataList.data.data.map((data, i) => {
                    updatedState[data.name] = data.value
                })
                setSetting({
                    ...setting,
                    ...updatedState
                })
            };
            setLoading(false);

        })()
    }, [update]);

    const submitHeaderLogo = (e) => {

        const rules = {
            headerLogo: "required",
        };

        const message = {
            "headerLogo.required": "Header Logo is Requied.",
        };

        validateAll(setting, rules, message).then(async () => {

            const formaerrror = {};

            setSetting({
                ...setting,
                error: formaerrror
            });

            // Api Call for Upload Header Logo
            setLoading(true);

            const uploadHeaderLogo = await settingApi.uploadHeaderLogo(adminAuthToken, headerLogo);
            if (uploadHeaderLogo) {
                if (uploadHeaderLogo.data.status == 0) {
                    setLoading(false);
                    ToastAlert({ msg: uploadHeaderLogo.data.message, msgType: 'error' });
                } else {
                    setLoading(false);
                    ToastAlert({ msg: uploadHeaderLogo.data.message, msgType: 'success' });
                    setUpdate(!update);
                    // setTempHeaderLogo(helper.settingHeaderLogoImg)

                };
            } else {
                setLoading(false);
                ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
            };
        }).catch(errors => {

            setLoading(false);
            const formaerrror = {};

            if (errors.length) {
                errors.forEach(element => {
                    formaerrror[element.field] = element.message;
                });
            } else {
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            };

            setSetting({
                ...setting,
                error: formaerrror,
            });
        });
    };

    const submitFooterLogo = (e) => {
        const rules = {
            footerLogo: "required",
        };

        const message = {
            "footerLogo.required": "Footer Logo is Requied.",
        };

        validateAll(setting, rules, message).then(async () => {

            const formaerrror = {};

            setSetting({
                ...setting,
                error: formaerrror
            });

            // Api Call for Upload Footer Logo
            setLoading(true);

            const uploadFooterLogo = await settingApi.uploadFooterLogo(adminAuthToken, footerLogo);

            if (uploadFooterLogo) {
                if (uploadFooterLogo.data.status == 0) {
                    setLoading(false);
                    ToastAlert({ msg: uploadFooterLogo.data.message, msgType: 'error' });
                } else {
                    // setTempFooterLogo(helper.settingFooterLogoImg)
                    setLoading(false);
                    ToastAlert({ msg: uploadFooterLogo.data.message, msgType: 'success' });
                    setUpdate(!update);
                };
            } else {
                setLoading(false);
                ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
            };
        }).catch(errors => {

            setLoading(false);
            const formaerrror = {};

            if (errors.length) {
                errors.forEach(element => {
                    formaerrror[element.field] = element.message;
                });
            } else {
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            };

            setSetting({
                ...setting,
                error: formaerrror
            });
        });
    };

    const submitContact = (e) => {

        const rules = {
            infoContactNumber: "required|number",
            infoAddress: "required",
            infoOpenTime: "required",
            infoEmail: "required|email",
        };

        const message = {
            "infoContactNumber.required": "Contact Number Logo is Requied.",
            "infoContactNumber.number": 'Contact Number must be Number not String.',
            "infoAddress.required": "Address is Required.",
            "infoOpenTime.required": "Time is Required.",
            "infoEmail.required": "Email is Requied.",
            "infoEmail.email": "please enter valid email.",
        };

        validateAll(setting, rules, message).then(async () => {

            const formaerrror = {};

            setSetting({
                ...setting,
                error: formaerrror
            });

            // Api Call for Contact
            setLoading(true);

            const addContactData = await settingApi.addContactData(adminAuthToken, infoContactNumber, infoAddress, infoOpenTime, infoEmail);

            if (addContactData) {
                if (addContactData.data.status == 0) {
                    setLoading(false);
                    ToastAlert({ msg: addContactData.data.message, msgType: 'error' });
                } else {
                    setLoading(false);
                    ToastAlert({ msg: addContactData.data.message, msgType: 'success' });
                    setUpdate(!update);
                };
            } else {
                setLoading(false);
                ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
            };
        }).catch(errors => {

            setLoading(false);
            const formaerrror = {};

            if (errors.length) {
                errors.forEach(element => {
                    formaerrror[element.field] = element.message;
                });
            } else {
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            };

            setSetting({
                ...setting,
                error: formaerrror
            });
        });
    };

    const submitSocialMedia = (e) => {

        const rules = {
            Instagram: "required",
            Pinterest: "required",
            LinkedIn: "required",
            Twitter: "required",
            Facebook: "required",
        };

        const message = {
            "Instagram.required": "Instagram is Requied.",
            "Pinterest.required": "Pinterest is Required.",
            "LinkedIn.required": "LinkedIn is Required.",
            "Twitter.required": "Twitter is Requied.",
            "Facebook.required": "Facebook is Required.",
        };

        validateAll(setting, rules, message).then(async () => {

            const formaerrror = {};

            setSetting({
                ...setting,
                error: formaerrror
            });

            // Api Call for Social Media
            setLoading(true);

            const addSocialMediaData = await settingApi.addSocialMediaData(adminAuthToken, Instagram, Pinterest, LinkedIn, Twitter, Facebook);

            if (addSocialMediaData) {
                if (addSocialMediaData.data.status == 0) {
                    setLoading(false);
                    ToastAlert({ msg: addSocialMediaData.data.message, msgType: 'error' });
                } else {
                    setLoading(false);
                    ToastAlert({ msg: addSocialMediaData.data.message, msgType: 'success' });
                    setUpdate(!update);
                };
            } else {
                setLoading(false);
                ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
            };
        }).catch(errors => {

            setLoading(false);
            const formaerrror = {};

            if (errors.length) {
                errors.forEach(element => {
                    formaerrror[element.field] = element.message;
                });
            } else {
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            };

            setSetting({
                ...setting,
                error: formaerrror
            });
        });
    }

    const submitPayment = (e) => {

        const rules = {
            publishableKey: "required",
            secretKey: "required",
        };

        const message = {
            "publishableKey.required": "Publishable Key is Requied.",
            "secretKey.required": "Secret Key is Required.",
        };

        validateAll(setting, rules, message).then(async () => {

            const formaerrror = {};

            setSetting({
                ...setting,
                error: formaerrror
            });

            // Api Call for Payment
            setLoading(true);

            const addPaymentData = await settingApi.addPaymentData(adminAuthToken, publishableKey, secretKey);

            if (addPaymentData) {
                if (addPaymentData.data.status == 0) {
                    setLoading(false);
                    ToastAlert({ msg: addPaymentData.data.message, msgType: 'error' });
                } else {
                    setLoading(false);
                    ToastAlert({ msg: addPaymentData.data.message, msgType: 'success' });
                    setUpdate(!update);
                };
            } else {
                setLoading(false);
                ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
            };
        }).catch(errors => {

            setLoading(false);
            const formaerrror = {};

            if (errors.length) {
                errors.forEach(element => {
                    formaerrror[element.field] = element.message;
                });
            } else {
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            };

            setSetting({
                ...setting,
                error: formaerrror
            });
        });
    }

    const submitGeneral = (e) => {

        const rules = {
            taxName:"required",
            tax: "required",
            currency: "required",
        };

        const message = {
            "tax.required": "Tax is Requied.",
            "currency.required": "Currency is Required.",
            "taxName.required": "tax Name is Required.",

        };

        validateAll(setting, rules, message).then(async () => {

            const formaerrror = {};

            setSetting({
                ...setting,
                error: formaerrror
            });

            // Api Call for General
            setLoading(true);

            const addGeneralData = await settingApi.addGeneralData(adminAuthToken, tax,currency,taxName);

            if (addGeneralData) {
                if (addGeneralData.data.status == 0) {
                    setLoading(false);
                    ToastAlert({ msg: addGeneralData.data.message, msgType: 'error' });
                } else {
                    setLoading(false);
                    ToastAlert({ msg: addGeneralData.data.message, msgType: 'success' });
                    setUpdate(!update);
                };
            } else {
                setLoading(false);
                ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
            };
        }).catch(errors => {

            setLoading(false);
            const formaerrror = {};

            if (errors.length) {
                errors.forEach(element => {
                    formaerrror[element.field] = element.message;
                });
            } else {
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            };

            setSetting({
                ...setting,
                error: formaerrror
            });
        });
    }

    const changeHeaderLogoValue = (e) => {
        let file = e.target.files[0] ? e.target.files[0] : '';
        setTempHeaderLogo(URL.createObjectURL(file))
    

        setSetting({
            ...setting,
            headerLogo:file,
        });
    };

    const changeFooterLogoValue = (e) => {
        let file = e.target.files[0] ? e.target.files[0] : '';
        setTempFooterLogo(URL.createObjectURL(file))

        setSetting({
            ...setting,
            footerLogo: file,
        });
    };

    const changeSettingValue = (e) => {
        let value = e.target.value;

        setSetting({
            ...setting,
            [e.target.name]: value,
        });
    };

    return (
        <>
            {/* {console.log(setting) } */}
            <PageLoader loading={loading} />
            <Setting
                loading={loading}
                setting={setting}
                expand={expand}
                tempHeaderLogo={tempHeaderLogo}
                tempFooterLogo={tempFooterLogo}
                setExpand={setExpand}
                submitHeaderLogo={submitHeaderLogo}
                submitFooterLogo={submitFooterLogo}
                submitContact={submitContact}
                submitSocialMedia={submitSocialMedia}
                submitPayment={submitPayment}
                submitGeneral={submitGeneral}
                changeHeaderLogoValue={changeHeaderLogoValue}
                changeFooterLogoValue={changeFooterLogoValue}
                changeSettingValue={changeSettingValue}
            />
        </>
    )
}
export default SettingController