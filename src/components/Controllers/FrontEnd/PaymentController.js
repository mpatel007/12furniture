import Payment from "../../View/front_end/Payment";
import React, { useState, useEffect } from "react";
import { validateAll } from "indicative/validator";
import ToastAlert from "../../Common/ToastAlert";
import cartApi from "../../Api/frontend/cart";
import ForntLoder from "../../Common/ForntLoder";
import { useNavigate } from "react-router-dom";
import { uniqueDeviceId } from "../../Common/Helper";



function PaymentController() {

    const [payAmount, setPayAmount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState([])
    const [productsData, setProductsData] = useState([])
    const [finalObj, setFinalObj] = useState([])
    const [uniqueID, setuniqueID] = useState(uniqueDeviceId());
    var UserAuthToken = localStorage.getItem("UserAuthToken");
    const userData = JSON.parse(localStorage.getItem("UserData"));
    // const [couponCode, setcouponCode] = useState()
    // const [tax, setTax] = useState(false)
    // const [discount, setDiscount] = useState(false)

    const navigate = useNavigate();
    const [state, setstate] = useState({
        name: "",
        cardNumber: "",
        month: "",
        year: "",
        cvv: "",
        error: []
    })
    const [billData, setBillData] = useState({
        subtotal: "",
        total: "",
        taxval: "",
        texPer: "",
        taxName: "",
        discount: "",
        couponCode: "",

    })
    const {
        subtotal, total, taxval, discount, couponCode, taxName, texPer
    } = billData;
    const {
        name, cardNumber, month, year, cvv, error
    } = state;
    const orderDetailsObj = {}

    useEffect(() => {
        let checkoutData = JSON.parse(sessionStorage.getItem("checkoutData"))
        let addressData = JSON.parse(sessionStorage.getItem("addressData"))
        if (addressData) {
            setAddress(addressData)
        }

        if (checkoutData) {
            // console.log(checkoutData);
            setBillData({
                ...billData,
                subtotal: checkoutData.SubTotal,
                total: checkoutData.total,
                taxval: checkoutData.taxval,
                taxName: checkoutData.taxName,
                discount: checkoutData.discountRate,
                texPer: checkoutData.taxper,
                couponCode: checkoutData.couponCode,

            })

            setProductsData(checkoutData.products)
            setPayAmount(checkoutData.total)
        }
    }, [])

    const changevalue = (e) => {
        let value = e.target.value;
        setstate({
            ...state,
            [e.target.name]: value
        })
    }
    const pay = () => {

        // console.log(address)
        let fullAddress = address.add1 + ',' + address.add2 + "_" + address.city + "," + address.c_state + "_" + address.country + " - " + address.zip
        // console.log(fullAddress)

        // return false

        const rules = {
            name: 'required',
            cardNumber: 'required|number',
            month: 'required',
            year: 'required',
            cvv: 'required|number',


        }
        const message = {
            'name.required': 'Card holder name is Required.',
            'cardNumber.required': 'Card number is Required.',
            // 'cardNumber.min': 'Card number Must be Atleast 16 digits.',
            // 'cardNumber.max': 'Card number can not be more then 16 digit long.',
            'cardNumber.number': 'Card number can not be string.',
            'month.required': 'Month is Required.',
            'year.required': 'Year number is Required.',
            'cvv.required': 'cvv is Required.',
            // 'cvv.min': 'cvv Must be Atleast 3 digits.',
            // 'cvv.max': 'cvv can not be more then 3 digit long.',
            'cvv.number': 'cvv can not be string.',

        }
        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setstate({
                ...state,
                error: formaerrror
            })

            let paymentObj = {};
            paymentObj.cardNumber = cardNumber
            paymentObj.cardExpMonth = month
            paymentObj.cardExpYear = year
            paymentObj.cardCVC = cvv
            paymentObj.country = address.country
            paymentObj.amount = total
            paymentObj.email = address.email
            paymentObj.name = name
            paymentObj.state = address.c_state
            paymentObj.city = address.city
            paymentObj.line1 = address.add1
            paymentObj.phone = address.phone
            paymentObj.postalCode = address.zip
            setLoading(true)

            const payment = await cartApi.payment(UserAuthToken, paymentObj)
            if (payment) {
                if (payment.data.status == 0) {
                    setLoading(false)
                    ToastAlert({ msg: payment.data.message, msgType: 'error' });
                } else {
                    orderDetailsObj.user_id = userData.id
                    orderDetailsObj.transaction_id = payment.data.data.id
                    orderDetailsObj.subtotal = subtotal
                    orderDetailsObj.tax = taxval
                    orderDetailsObj.discount = discount
                    orderDetailsObj.total = total
                    orderDetailsObj.transaction_status = payment.data.data.status
                    orderDetailsObj.address = fullAddress
                    orderDetailsObj.order_notes = address.notes
                    orderDetailsObj.uniqueSessionId = uniqueID
                    orderDetailsObj.products = productsData
                    orderDetailsObj.couponCode = couponCode
                    orderDetailsObj.appliedTaxName = taxName
                    orderDetailsObj.appliedTaxPer = texPer
                    orderDetailsObj.addressArray = JSON.stringify(address)




                    // console.log(orderDetailsObj);
                    // return false

                    if (payment.data.data.id) {
                        const saveOrderDetails = await cartApi.saveOrderDetails(UserAuthToken, orderDetailsObj)
                        if (saveOrderDetails) {
                            if (saveOrderDetails.data.status == 0) {
                                setLoading(false)
                                ToastAlert({ msg: saveOrderDetails.data.message, msgType: 'error' });
                            } else {
                                sessionStorage.clear()
                                setLoading(false)
                                navigate('/thankyou')
                                ToastAlert({ msg: saveOrderDetails.data.message, msgType: 'success' });
                            }

                        } else {
                            setLoading(false)
                            ToastAlert({ msg: payment.data.message, msgType: 'error' });
                        }
                    } else {
                        setLoading(false)
                        ToastAlert({ msg: "Payment Failed", msgType: 'error' });
                    }
                    setLoading(false)
                }

            } else {
                setLoading(false)
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            }



        }).catch(errors => {
            setLoading(false)
            const formaerrror = {};
            if (errors.length) {
                errors.forEach(element => {
                    formaerrror[element.field] = element.message
                });
            } else {
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            }

            setstate({
                ...state,
                error: formaerrror
            })

        });

    }

    return (
        <>
            {/* {console.log(productsData)} */}
            <ForntLoder loading={loading} />
            <Payment
                stateData={state}
                changevalue={changevalue}
                payAmount={payAmount}
                pay={pay}
                productsData={productsData}
                billData={billData}
            />
        </>
    )
}
export default PaymentController