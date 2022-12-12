import React, { useState, useEffect } from "react"
import PageLoader from "../../Common/PageLoader"
import Index from "../../View/admin/Order/Index"
// import ProductsModel from "../../View/admin/Order/orderProductsModel"
import orderApi from "../../Api/admin/order"
import ToastAlert from "../../Common/ToastAlert";
import { confirmAlert } from "react-confirm-alert"

function OrderController() {
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false)
    const [modal, setModal] = useState(false);
    const [orderList, setOrderList] = useState([])
    // const [orderProducts, setOrderProducts] = useState([])

    var adminAuthToken = localStorage.getItem("adminAuthToken");

    useEffect(() => {
        (async () => {
            setLoading(true)
            const orderList = await orderApi.getOrderList(adminAuthToken);
            if (orderList.data.status == 1) { 
                setOrderList(orderList.data.data)
            } else {
                setLoading(false)
            }
            setLoading(false)

        })()
    }, [update])

    // const userOrderProducts = async (ordetId) => {
    //     setLoading(true)
    //     setModal(true);
    //     const userOrderProducts = await orderApi.getUserOrderProducts(adminAuthToken,ordetId);
    //     if (userOrderProducts.data.status == 1) { 
    //         setOrderProducts(userOrderProducts.data.data)
    //         setLoading(false)
    //     } else {
    //         setLoading(false)
    //     }
    // };


    return (
        <>
            <PageLoader loading={loading} />
            <Index 
            setUpdate={setUpdate}
            orderList={orderList}
            // userOrderProducts={userOrderProducts}
            />
            {/* <ProductsModel 
            setUpdate={setUpdate}
            orderList={orderList}
            userOrderProducts={userOrderProducts}
            orderProducts={orderProducts}
            setModal={setModal}
            modal={modal}
            /> */}

           
        </>
    )
}
export default OrderController