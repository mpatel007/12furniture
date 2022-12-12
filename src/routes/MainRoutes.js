import React from "react";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { UserContext } from "../App";
import AdminPrivateRoutes from "./AdminPrivateRoutes";
import UserPrivateRoutes from "./UserPrivateRoutes";
import Home from "../components/View/front_end/layout/Home";
import LoginController from "../components/Controllers/Admin/LoginController";
import PageLoader from "../components/Common/PageLoader";
import UserLoginConroller from "../components/Controllers/FrontEnd/UserLoginConroller";
// import Contact from "../components/View/front_end/Contact";
import UserRegisterController from "../components/Controllers/FrontEnd/UserRegisterController";
import ContactController from "../components/Controllers/FrontEnd/ContactController";
import ProductDetailsController from "../components/Controllers/FrontEnd/ProductDetailsController";
import NotFound from "../components/View/front_end/NotFound";
import helper from "../components/Common/Helper";
import ForntLoder from "../components/Common/ForntLoder";
import CartController from "../components/Controllers/FrontEnd/CartControllrer";
import CheckoutController from "../components/Controllers/FrontEnd/CheckoutController";
import ThankYou from "../components/View/front_end/ThankYou";
import ShopController from "../components/Controllers/FrontEnd/ShopController";



export default function MainRoutes() {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false)
  const adminAuthToken = localStorage.getItem("adminAuthToken");
  const UserAuthToken = localStorage.getItem("UserAuthToken");
  const location = useLocation();

  const addStyle = (url) => {
    const style = document.createElement("link");
    style.href = url;
    style.rel = "stylesheet";
    style.async = false;
    document.head.appendChild(style);
  };

  useLayoutEffect(() => {
    //return () => {
    //setLoading(false)
    //};
  }, [])

  useEffect(() => {
    let cssUrl;
    setLoading(true)
    if (location.pathname.startsWith('/admin')) {
      cssUrl = helper.BASE_URL + "/css/modern.css";
    } else {
      cssUrl = ""
    }
    addStyle(cssUrl)
    setLoading(false)

    if (adminAuthToken || UserAuthToken) {
      user.setLogin(true);

    }
// window.atob()
// window.btoa()
  }, [])

  return (
    <>
      <ForntLoder loading={loading} />
      {/* Common Routes start */}

      {
        (!location.pathname.startsWith('/admin')) ?
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<UserRegisterController />} />
            <Route exact path="/login" element={<UserLoginConroller />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/contact" element={<ContactController />} />
            <Route exact path="/product/:product_slug" element={<ProductDetailsController />} />
            <Route exact path="/cart" element={<CartController />} />
            <Route exact path="/shop/:id" element={<ShopController />} />
            <Route exact path="/shop" element={<ShopController />} />
          </Routes>
          :
          <Routes>
            {!adminAuthToken && <Route exact path="/admin" element={<LoginController />} />}
          </Routes>
      }

      {
        (location.pathname.startsWith('/admin')) ?
            adminAuthToken ? <AdminPrivateRoutes /> : ''
        :
            UserAuthToken ?<UserPrivateRoutes /> : ''
      }

      


      

      

    </>
  )
}