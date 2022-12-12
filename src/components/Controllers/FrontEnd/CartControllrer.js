import Cart from "../../View/front_end/Cart";
import { useEffect, useState, useContext } from "react";
import cartApi from "../../Api/frontend/cart";
import ForntLoder from "../../Common/ForntLoder";
import { uniqueDeviceId } from "../../Common/Helper";
import ToastAlert from "../../Common/ToastAlert";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../Common/PageLoader";
import { validateAll } from "indicative/validator";
import { UserContext } from "../../../App";
import commonApi from "../../Api/frontend/common";
import registerApi from "../../Api/frontend/user";


function CartController() {

    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);
    const [uniqueID, setuniqueID] = useState(uniqueDeviceId());
    const [productsData, setProductsData] = useState([])
    const [productsSubToatal, setProductsSubtTotal] = useState([])
    const [total, setTotal] = useState("");
    const [subTotal, setSubTotal] = useState("");
    const userData = JSON.parse(localStorage.getItem("UserData"));
    let AppliedCoupon = JSON.parse(sessionStorage.getItem("AppliedCoupon"))
    let sessonCouponCodeDiscount = AppliedCoupon ? AppliedCoupon.couponDis : 0
    const [couponCodeDiscount, setcouponCodeDiscount] = useState(sessonCouponCodeDiscount ? sessonCouponCodeDiscount : 0);
    const [taxPay, setTaxPay] = useState(0);
    const [taxDetails, setTaxDetails] = useState({
        taxName: "tax",
        taxValue: 0
    });
    const {
        taxName, taxValue
    } = taxDetails;


    const [couponCode, setCouponCode] = useState("");

    const user = useContext(UserContext)
    const navigate = useNavigate();
    const sessionData = {}
    const [state, setstate] = useState({
        name: "",
        email: "",
        phone: "",
        country: "",
        add1: "",
        add2: "",
        city: "",
        c_state: "",
        zip: "",
        notes: "",
        error: [],
    })

    const {
        name, error, email, city, c_state, country, add1, add2, phone, zip, notes
    } = state;



    const calculateTotalSubTotal = async () => {
        let taxval = await getTaxDetails();


        const array = productsSubToatal
        let sum = 0;

        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        let tax;
        let Total;

        let AppliedCoupon = JSON.parse(sessionStorage.getItem("AppliedCoupon"))
        if (AppliedCoupon) {
            if (sum < parseInt(AppliedCoupon.abovePrice)) {
                removeDiscountCoupon()
            }


        }
        setSubTotal(sum)
        if (couponCodeDiscount > 0) {

            let afterDiscountTotal = sum - parseInt(couponCodeDiscount);
            tax = Math.round(((parseInt(taxval) * afterDiscountTotal) / 100))
            Total = afterDiscountTotal + tax
            setTotal(Total)
            setTaxPay(tax)
        } else {
            tax = Math.round(((parseInt(taxval) * sum) / 100))
            Total = sum + tax
            setTotal(Total)
            setTaxPay(tax)
        }


        sessionData.SubTotal = sum
        sessionData.total = Total
        sessionData.taxval = tax

        sessionData.taxper = taxval
        sessionData.discountRate = couponCodeDiscount
        sessionData.couponCode = AppliedCoupon ? AppliedCoupon.CouponCode : ""
        // console.log(sessionData);

        sessionStorage.setItem('checkoutData', JSON.stringify(sessionData));
    }
    const removeDiscountCoupon = () => {
        sessionStorage.removeItem('AppliedCoupon');
        setcouponCodeDiscount(0)
        setUpdate(!update)
        // ToastAlert({ msg: 'Coupon Code is Removed', msgType: 'info' });


    }

    const getTaxDetails = async () => {


        const getTaxName = await commonApi.getSettingValuebyName('taxName');
        const getTaxValue = await commonApi.getSettingValuebyName('tax');

        if (getTaxValue && getTaxName) {


            setTaxDetails({
                ...taxDetails,
                taxName: getTaxName.data.data ? getTaxName.data.data[0] ? getTaxName.data.data[0].value : "Tax" : "Tax",
                taxValue: getTaxValue.data.data ? parseInt(getTaxValue.data.data[0].value) : 0
            })
        }
        sessionData.taxName = getTaxName.data.data[0] ? getTaxName.data.data[0].value : 0
        return parseInt(getTaxName.data.data[0] ? getTaxValue.data.data[0].value : 0);

    }


    useEffect(() => {

        (async () => {
            // sessionStorage.clear()
            let AppliedCoupon = JSON.parse(sessionStorage.getItem("AppliedCoupon"))
            if (AppliedCoupon) {
                setcouponCodeDiscount(AppliedCoupon.couponDis)
            }
            setLoading(true);
            productsData.length = 0
            productsSubToatal.length = 0
            sessionData.length = 0

            const cartItemList = await cartApi.listCartItems(uniqueID);

            if (cartItemList.data.status == 1) {

                setCartItems(cartItemList.data.data);
                sessionData.products = {}
                sessionData.products = cartItemList.data.data
                cartItemList.data.data.length &&
                    cartItemList.data.data.map((data, i) => {
                        const productsDataObj = {}
                        productsDataObj.product_id = data.id;
                        productsDataObj.qty = data.cart_qty;
                        productsDataObj.cart_id = data.cart_id;
                        productsDataObj.price = data.price;
                        productsData.push(productsDataObj)
                        productsSubToatal.push(data.cart_qty * data.price)
                    })


                await calculateTotalSubTotal()
                await CartItemCount()
            }


            setLoading(false);
            return true

        })();

    }, [update]);


    const CartItemCount = async () => {
        const cartItemList = await cartApi.listCartItems(uniqueID);
        if (cartItemList.data.status == 1) {
            user.setCartCount(cartItemList.data.data.length)

        }

    }


    useEffect(() => {
        (async () => {
            const userData = JSON.parse(localStorage.getItem("UserData"));
            if (userData) {
                setstate({
                    ...state,
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                })
            }

            const addressData = JSON.parse(sessionStorage.getItem("addressData"))
            if (addressData) {

                setstate({
                    ...state,
                    name: addressData.name,
                    email: addressData.email,
                    phone: addressData.phone,
                    country: addressData.country,
                    add1: addressData.add1,
                    add2: addressData.add2 ? addressData.add2 : "",
                    city: addressData.city,
                    c_state: addressData.c_state,
                    zip: addressData.zip,
                    notes: addressData.notes ? addressData.notes : "",
                })
            } else {
                if (userData.id) {
                    // console.log(userData.id);
                    const userLastAddress = await registerApi.userLastAddress(userData.id)
                    if (userLastAddress) {
                        if (userLastAddress.data.status == 1) {
                            if (userLastAddress.data.data) {
                                let lastAddress = JSON.parse(userLastAddress.data.data)
                                setstate({
                                    ...state,
                                    name: lastAddress.name,
                                    email: lastAddress.email,
                                    phone: lastAddress.phone,
                                    country: lastAddress.country,
                                    add1: lastAddress.add1,
                                    add2: lastAddress.add2 ? lastAddress.add2 : "",
                                    city: lastAddress.city,
                                    c_state: lastAddress.c_state,
                                    zip: lastAddress.zip,
                                    notes: lastAddress.notes ? lastAddress.notes : "",
                                })

                            }
                        }

                    }

                }

            }
        })();
    }, [])


    const removeCartItem = async (itemId) => {
        setLoading(true);
        const removeItem = await cartApi.removeCartItem(itemId);
        if (removeItem) {
            if (removeItem.data.status == 0) {
                setLoading(false);
                ToastAlert({ msg: "Item Not Removed", msgType: 'error' });
            } else {
                setUpdate(!update)
                setLoading(false);
                ToastAlert({ msg: "Item Removed Successfully", msgType: 'success' });
            }

        } else {
            setLoading(false);
            ToastAlert({ msg: "Something Went Wrong", msgType: 'error' });
        }

    }

    const updateCartItem = async (e, index) => {
        const list = [...productsData];
        list[index].qty = e.target.value;
        let cartId = list[index].cart_id;
        let cartObj = {}
        cartObj.session_id = uniqueID
        cartObj.product_id = list[index].product_id
        cartObj.qty = e.target.value
        setProductsData(list)
        setLoading(true)
        const UpdateCart = await cartApi.updateCart(cartId, cartObj)
        if (UpdateCart) {
            if (UpdateCart.data.status == 0) {
                setLoading(false);
                ToastAlert({ msg: UpdateCart.data.message, msgType: 'error' });
            } else {
                setUpdate(!update)
                setLoading(false);
                ToastAlert({ msg: UpdateCart.data.message, msgType: 'success' });
            }

        } else {
            setLoading(false);
            ToastAlert({ msg: "Something Went Wrong", msgType: 'error' });
        }
    }

    const onClickCheckout = () => {
        const UserAuthToken = localStorage.getItem("UserAuthToken");

        if (!UserAuthToken) {

            ToastAlert({ msg: "Please Login First.", msgType: 'error' });
            navigate('/login')

        } else {
            const rules = {
                name: "required",
                email: 'required|email',
                phone: "required|number",
                country: "required",
                add1: "required",
                city: "required",
                c_state: "required",
                zip: "required",

            }

            const message = {
                'email.required': 'Email is Requied.',
                'email.email': 'please enter valid email.',
                'phone.required': 'Phone is Requied.',
                'phone.number': 'Phone number must be number not string.',
                'name.required': 'name is Requied.',
                'country.required': 'country is Requied.',
                'add1.required': 'address is Requied.',
                'city.required': 'city is Requied.',
                'c_state.required': 'state is Requied.',
                'zip.required': 'zip code is Requied.',


            }
            validateAll(state, rules, message).then(async () => {
                const formaerrror = {};
                setstate({
                    ...state,
                    error: formaerrror
                })
                // console.log(state)

                // for checkout
                sessionStorage.setItem('addressData', JSON.stringify(state));
                // const addressData = JSON.parse(sessionStorage.getItem("addressData"))
                // if (!addressData) {

                // }
                navigate('/checkout')


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
            // 

        }

    }
    const changevalue = (e) => {
        let value = e.target.value;
        setstate({
            ...state,
            [e.target.name]: value
        })
    }

    const applyCoupon = async () => {
        const UserAuthToken = localStorage.getItem("UserAuthToken");

        if (!UserAuthToken) {

            ToastAlert({ msg: "Please Login First.", msgType: 'error' });
            navigate('/login')
        } else {
            let userId = userData ? userData.id : 0
            setLoading(true);
            const applycouponCode = await cartApi.applyCouponCode(UserAuthToken, couponCode, userId)
            if (applycouponCode) {
                if (applycouponCode.data.status == 0) {
                    setLoading(false);
                    ToastAlert({ msg: applycouponCode.data.message, msgType: 'error' });
                } else {
                    let AppliedCoupon = {}
                    AppliedCoupon.abovePrice = applycouponCode.data.abovePrice;
                    setLoading(false);
                    if (subTotal < applycouponCode.data.abovePrice) {
                        setLoading(false);
                        ToastAlert({ msg: "This Coupon is Vallid only Above Purchase of " + applycouponCode.data.abovePrice, msgType: 'error' });
                    } else {
                        ToastAlert({ msg: 'CouponCode Applied', msgType: 'success' });

                        if (applycouponCode.data.discountType == "Flat") {
                            setcouponCodeDiscount(applycouponCode.data.discountRate)
                            AppliedCoupon.DiscountType = applycouponCode.data.discountType
                            AppliedCoupon.CouponCode = applycouponCode.data.couponCode
                            AppliedCoupon.couponDis = applycouponCode.data.discountRate
                            // sessionStorage.setItem('couponCode', applycouponCode.data.couponCode)
                            // sessionStorage.setItem('couponDis', applycouponCode.data.discountRate);
                            setUpdate(!update)
                        } else {
                            setcouponCodeDiscount(((parseInt(applycouponCode.data.discountRate) * subTotal) / 100))
                            AppliedCoupon.DiscountType = applycouponCode.data.discountType
                            AppliedCoupon.CouponCode = applycouponCode.data.couponCode
                            AppliedCoupon.couponDis = ((parseInt(applycouponCode.data.discountRate) * subTotal) / 100)
                            AppliedCoupon.DiscountRate = parseInt(applycouponCode.data.discountRate)

                            // sessionStorage.setItem('couponCode', applycouponCode.data.couponCode)
                            // sessionStorage.setItem('couponDis', ((parseInt(applycouponCode.data.discountRate) * subTotal) / 100));
                            setUpdate(!update)

                        }


                    }
                    sessionStorage.setItem('AppliedCoupon', JSON.stringify(AppliedCoupon))


                }


            } else {
                setLoading(false);
                ToastAlert({ msg: "Something Went Wrong", msgType: 'error' });
            }

        }

    }


    return (
        <>
            {/* {console.log(cartItems)} */}
            <ForntLoder loading={loading} />
            <Cart
                cartItems={cartItems}
                removeCartItem={removeCartItem}
                updateCartItem={updateCartItem}
                total={total}
                subTotal={subTotal}
                productsData={productsData}
                onClickCheckout={onClickCheckout}
                stateData={state}
                changevalue={changevalue}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                applyCoupon={applyCoupon}
                couponCodeDiscount={couponCodeDiscount}
                taxDetails={taxDetails}
                taxPay={taxPay}
                removeDiscountCoupon={removeDiscountCoupon}

            />
        </>
    )
}
export default CartController