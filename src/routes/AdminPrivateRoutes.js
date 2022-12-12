import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from "../components/View/admin/layout/Dashboard";
import VariantManagementController from "../components/Controllers/Admin/VariantManagementController";
import ProductController from "../components/Controllers/Admin/ProductController";
import CategoryController from "../components/Controllers/Admin/CategoryController";
import VariantDetailsController from "../components/Controllers/Admin/VariantDetailsController";
import UserController from "../components/Controllers/Admin/UserController";
import SubCategoryController from "../components/Controllers/Admin/SubCategoryController";
import PageLoader from "../components/Common/PageLoader";
import { useLocation } from "react-router-dom";
import NotFound from "../components/View/front_end/NotFound";
import SettingController from "../components/Controllers/Admin/SettingController";
import OrderController from "../components/Controllers/Admin/OrderController";
import CouponController from "../components/Controllers/Admin/CouponController";
// import '../../src/asset/admin/css/modern.css'
//import '../../src/asset/admin/css/modern.css'
// console.log('hh')

const AdminPrivateRoutes = () => {


    // const addStyle = (url) => {
    //     const style = document.createElement("link");
    //     console.log(style)
    //     style.href = url;
    //     style.rel = "stylesheet";
    //     style.async = false;
    //     document.head.appendChild(style);
    // };
    // useEffect(() => {

    //     setLoading(true)
    //     const cssUrl = "http://localhost:3000/css/modern.css";
    //    if(addStyle(cssUrl)){
    //     setLoading(false)

    //    }
    //     setLoading(false)
    //     return () => {
    //         document.head.removeChild(cssUrl);
    //         setLoading(false)
    //     };
    //     setLoading(false)

    // }, [])



    // const [expand, setExpand] = useState(false)

    return (
        <>
            {/* <PageLoader loading={loading} /> */}
            <Routes>
                <Route exact path="/admin" element={<Dashboard />} />
                <Route exact path="/admin/dashboard" element={<Dashboard />} />
                <Route exact path="/admin/variant" element={<VariantManagementController />} />
                <Route exact path="/admin/variant/:variantid" element={<VariantDetailsController />} />
                <Route exact path="/admin/product/" element={<ProductController />} />
                <Route exact path="/admin/category" element={<CategoryController />} />
                <Route exact path="/admin/orders" element={<OrderController />} />
                <Route exact path="/admin/users" element={<UserController />} />
                <Route exact path="/admin/catagory/subcategory/:id" element={<SubCategoryController />} />
                <Route exact path="/admin/coupon" element={<CouponController />} />
                <Route exact path="/admin/settings" element={<SettingController />} />
            </Routes>
        </>
    )
}
export default AdminPrivateRoutes;