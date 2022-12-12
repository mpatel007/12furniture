import React, { useState, useEffect } from 'react';
import PageLoader from "../../Common/PageLoader";
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../Common/ToastAlert';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from "react-router-dom";
import Coupon from '../../View/admin/Coupon/Coupon';
import CouponForm from '../../View/admin/Coupon/CouponForm';
import couponApi from '../../Api/admin/coupon';
import { format, getDate, getMonth, getYear } from 'date-fns';

function CouponController() {

    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [coupon, setCoupon] = useState([]);
    const [expand, setExpand] = useState(false);
    const [update, setUpdate] = useState(false);
    var adminAuthToken = localStorage.getItem("adminAuthToken");
    const [state, setState] = useState({
        id: "",
        couponCode: "",
        // expiryDate: "",
        numberOfCoupon: "",
        discountType: "",
        discountRate: "",
        abovePrice: "",
        status: "",
        error: [],
    });

    // let today = new Date();  // get the date
    // let day = ("0" + today.getDate()).slice(-2);  //get day with slice to have double digit day
    // let month = ("0" + (today.getMonth() + 1)).slice(-2); //get your zero in front of single month digits so you have 2 digit months
    // let date = month + '/' + day + '/' + today.getFullYear(); 

    const [expiryDate, setExpiryDate] = useState(new Date());
    // console.log(expiryDate);

    const {
        id, couponCode, numberOfCoupon, discountType, discountRate, abovePrice, status, error,
    } = state;

    useEffect(() => {
        (async () => {
            setLoading(true);
            // Api Call for category list
            const couponList = await couponApi.couponList(adminAuthToken);
            if (couponList.data.status == 1) {
                // console.log(couponList.data.data);
                setCoupon(couponList.data.data);
            }
            setLoading(false);
        })()
    }, [update]);

    const addCoupon = () => {

        const rules = {
            couponCode: "required",
            // expiryDate: `required|date|after:${new Date()}`,
            // expiryDate: "required",
            numberOfCoupon: "required",
            discountType: "required",
            discountRate: "required",
            abovePrice: "required",
        };

        const message = {
            "couponCode.required": "Coupon Code is Required.",
            // "expiryDate.required": "Expiry Date is Required.",
            // "expiryDate.date": "Date is Required.",
            // "expiryDate.after": "Before Date is Not Valid.",
            "numberOfCoupon.required": "Number Of Coupon is Required.",
            "discountType.required": "Discount Type is Required.",
            "discountRate.required": "Discount Rate is Required.",
            "abovePrice.required": "Above Price is Required.",
        };

        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            
            setState({
                ...state,
                error: formaerrror,
            });

            setLoading(true);
            // Api Call for add coupon
            const addCoupon = await couponApi.addCoupon(adminAuthToken, couponCode, expiryDate, numberOfCoupon, discountType, discountRate, abovePrice, status);

            if (addCoupon) {
                if (addCoupon.data.status == 0) {
                    setLoading(false);
                    ToastAlert({ msg: addCoupon.data.message, msgType: 'error' });
                } else {
                    setLoading(false);
                    setUpdate(!update);
                    ToastAlert({ msg: addCoupon.data.message, msgType: 'success' });
                    setModal(false);
                    setState({
                        ...state,
                        couponCode: "",
                        // expiryDate: "",
                        numberOfCoupon: "",
                        discountType: "",
                        discountRate: "",
                        abovePrice: "",
                        status: "",
                    });
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

            setState({
                ...state,
                error: formaerrror,
            });
        });
    };


    const changeValue = (e) => {
        let value = e.target.value;

        if (e.target.name == "couponCode") {
            let couponVal = value.split(" ").join("").toUpperCase();
            // console.log(value);
            setState({
                ...state,
                couponCode: couponVal,
            });
        } else {
            setState({
                ...state,
                [e.target.name]: value,
            });
        }   
    };

    const onOpenModal = () => {
        setState({
            ...state,
            id: "",
            couponCode: "",
            // expiryDate: "",
            numberOfCoupon: "",
            discountType: "",
            discountRate: "",
            abovePrice: "",
            status: 1,
            error: [],
        });
        setModal(true);
    };

    const editCoupon = (data) => {
        setModal(true);
        setState({
            ...state,
            id: data.id,
            couponCode: data.couponCode,
            numberOfCoupon: data.numberOfCoupon,
            discountType: data.discountType,
            discountRate: data.discountRate,
            abovePrice: data.abovePrice,
            status: data.status,
        });
        setExpiryDate(new Date(data.expiryDate));
    };

    const updateCoupon = async () => {

        const rules = {
            couponCode: "required",
            // expiryDate: `required|date|after:${new Date()}`,
            // expiryDate: "required",
            numberOfCoupon: "required",
            discountType: "required",
            discountRate: "required",
            abovePrice: "required",
        };

        const message = {
            "couponCode.required": "Coupon Code is Required.",
            // "expiryDate.required": "Expiry Date is Required.",
            // "expiryDate.date": "Date is Required.",
            // "expiryDate.after": "Before Date is Not Valid.",
            "numberOfCoupon.required": "Number Of Coupon is Required.",
            "discountType.required": "Discount Type is Required.",
            "discountRate.required": "Discount Rate is Required.",
            "abovePrice.required": "Above Price is Required.",
        };

        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            
            setState({
                ...state,
                error: formaerrror,
            });
        
            // Api Call for category update
            const updateCoupon = await couponApi.updateCoupon(adminAuthToken, id, couponCode, expiryDate, numberOfCoupon, discountType, discountRate, abovePrice, status);

            if (updateCoupon) {
                if (updateCoupon.data.status == 0) {
                    setLoading(false);
                    ToastAlert({ msg: updateCoupon.data.message, msgType: 'error' });
                } else {
                    setLoading(false);
                    setUpdate(!update);
                    setModal(false);
                    setState({
                        ...state,
                        couponCode: "",
                        // expiryDate: "",
                        numberOfCoupon: "",
                        discountType: "",
                        discountRate: "",
                        abovePrice: "",
                        status: "",
                    });
                    ToastAlert({ msg: updateCoupon.data.message, msgType: 'success' });
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

            setState({
                ...state,
                error: formaerrror,
            });
        });
    };

    const deleteCoupon = (id) => {
        
        confirmAlert({
            title: 'Delete Coupon',
            message: 'Are you sure to do this ?',
            buttons: [
                {
                    label: "Yes",

                    onClick: async () => {
                        setLoading(true);
                        // Api Call for category delete
                        const deleteCoupon = await couponApi.deleteCoupon(adminAuthToken, id);

                        if (deleteCoupon) {
                            if (deleteCoupon.data.status == 0) {
                                setLoading(false);
                                ToastAlert({ msg: deleteCoupon.data.message, msgType: 'error' });
                            } else {
                                setLoading(false);
                                setUpdate(!update);
                                ToastAlert({ msg: deleteCoupon.data.message, msgType: 'success' });
                            };
                        } else {
                            setLoading(false);
                            ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
                        };
                    },
                },
                {
                    label: "No",
                },
            ],
        });
    };

    return (
        <>
        <PageLoader loading={loading} />
        <CouponForm
        modal={modal}
        setModal={setModal}
        stateData={state}
        changeValue={changeValue}
        addCoupon={addCoupon}
        expiryDate={expiryDate}
        setExpiryDate={setExpiryDate}
        updateCoupon={updateCoupon}
        />
        <Coupon 
        setModal={setModal}
        coupon={coupon}
        onOpenModal={onOpenModal}
        expand={expand}
        setExpand={setExpand}
        editCoupon={editCoupon}
        deleteCoupon={deleteCoupon}
        />
        </>
    );

};

export default CouponController;
