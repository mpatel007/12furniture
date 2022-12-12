import Checkout from "../../View/front_end/Checkout";
import React, { useEffect, useState } from "react";
import ForntLoder from "../../Common/ForntLoder";
import { useNavigate } from "react-router-dom";

function CheckoutController() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([])
    // const [subtotal, setSubTotal] = useState("");
    const [address, setAddress] = useState([])
    const navigate = useNavigate();
    const [state, setstate] = useState({
        subtotal: "",
        total: "",
        taxval: "",
        texPer: "",
        taxName: "",
        discount: "",
        couponCode: "",

    })
    const {
        subtotal, total, taxval, discount, couponCode,taxName,texPer
    } = state;


    useEffect(() => {
        setLoading(true)
        let checkoutData = JSON.parse(sessionStorage.getItem("checkoutData"))
        let addressData = JSON.parse(sessionStorage.getItem("addressData"))
        if (addressData) {
            setAddress(addressData)
        }else{
            setAddress([])
        }
        if (checkoutData) {
            // console.log(checkoutData);
            setstate({
                ...state,
                subtotal:checkoutData.SubTotal,
                total:checkoutData.total,
                taxval:checkoutData.taxval,
                taxName:checkoutData.taxName,
                texPer:checkoutData.taxper,
                discount:checkoutData.discountRate,
            })
            // setSubTotal(checkoutData.SubTotal)
            setProducts(checkoutData.products)
        }else{
            setProducts([])
        }
        setLoading(false)
    }, [])

    const PlaceOrder = () => {
        navigate('/payment')
    }
    return (
        <>
            <ForntLoder loading={loading} />
            <Checkout
                products={products}
                stateData={state}
                address={address}
                PlaceOrder={PlaceOrder}
            />
        </>
    )
}
export default CheckoutController