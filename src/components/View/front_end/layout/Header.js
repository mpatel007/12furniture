import { useEffect, useState, useContext } from "react";
import logo from '../../../../asset/frontend/img/logo.png'
//import '../../../../asset/frontend/css/bootstrap.min.css'
//import '../../../../asset/frontend/css/style.css'
import '../../../../asset/frontend/css/font-awesome.min.css'
import '../../../../asset/frontend/css/nice-select.css'
import '../../../../asset/frontend/css/elegant-icons.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../../App'
import cartApi from '../../../Api/frontend/cart'
import { uniqueDeviceId } from '../../../Common/Helper'
import settingApi from "../../../Api/admin/setting";
import ForntLoder from "../../../Common/ForntLoder";
import { getSettingValuebyName } from '../../../Common/Helper';


//import GlobalStyle from '../../../Common/globalStyles';



const Header = () => {
    const UserAuthToken = localStorage.getItem("UserAuthToken");
    const userData = JSON.parse(localStorage.getItem("UserData"));
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const user = useContext(UserContext);
    const navigate = useNavigate();
    var adminAuthToken = localStorage.getItem("adminAuthToken");



    useEffect(() => {
        (async () => {
            setLoading(true);
            const settingDataList = await settingApi.settingNameValueList(adminAuthToken);
            if (settingDataList.data.status == 1) {
                if (settingDataList?.data?.data) {
                    localStorage.setItem("settingNameValueData", "");
                    localStorage.setItem("settingNameValueData", JSON.stringify(settingDataList?.data?.data));
                }
            };
            setLoading(false);

        })()
    }, []);

    const logOut = () => {
        user.logout()
        navigate('/login')
    }

    return (
        <>
            <ForntLoder loading={loading} />
            <header className="header">


                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__left">
                                    <ul>
                                        <li><i className="fa fa-envelope"></i>{!UserAuthToken ? "hello User" : " Welcome " + userData.email}</li>
                                        {/* <li>Free Shipping for all Order of $99</li> */}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__right">
                                    <div className="header__top__right__social">
                                        <a href={getSettingValuebyName("Facebook") != '' ? getSettingValuebyName("Facebook") : '#'}><i className="fa fa-facebook"></i></a>
                                        <a href={getSettingValuebyName("Twitter") != '' ? getSettingValuebyName("Twitter") : '#'}><i className="fa fa-twitter"></i></a>
                                        <a href={getSettingValuebyName("LinkedIn") != '' ? getSettingValuebyName("LinkedIn") : '#'}><i className="fa fa-linkedin"></i></a>
                                        <a href={getSettingValuebyName("Pinterest") != '' ? getSettingValuebyName("Pinterest") : '#'}><i className="fa fa-pinterest-p"></i></a>
                                    </div>
                                    {UserAuthToken ?
                                        <div className="header__top__right__language">
                                            {/* <img src="img/language.png" alt=""/> */}
                                            <div><i className="fa fa-user"></i> Profile</div>
                                            <span className="arrow_carrot-down"></span>
                                            <ul>
                                                <li><Link to="/profile">Profile</Link></li>
                                                <li><a onClick={() => logOut()} style={{ color: "white" }}>Logout</a></li>
                                                {/* <li><a href="#">English</a></li> */}
                                            </ul>
                                        </div> :

                                        <div className="header__top__right__language">
                                            {/* <img src="img/language.png" alt=""/> */}
                                            <div><i className="fa fa-user"></i> Login</div>
                                            <span className="arrow_carrot-down"></span>
                                            <ul>
                                                <li><Link to="/login">Login</Link></li>
                                                <li><Link to="/register">Register</Link></li>
                                                {/* <li><a href="#">English</a></li> */}
                                            </ul>
                                        </div>}
                                    {/* 
                                <div className="header__top__right__auth">
                                    {UserAuthToken ?
                                        <>

                                            <a href="#"><i className="fa fa-user"></i> Profile</a>


                                        </>

                                        :
                                        <Link to="/login"><i className="fa fa-user"></i> Login</Link>
                                    }

                                </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="header__logo">
                                {/* <a onClick={() => { window.location.reload() }}><img src={logo} alt="Logo" /></a> */}
                                <Link to={'/'}><img src={logo} alt="Logo" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <nav className="header__menu">
                                <ul>
                                    <li className={location.pathname == '/' || location.pathname == '/home' ? 'active' : ''}><Link to={"/home"}>Home</Link></li>
                                    <li className={location.pathname == '/shop' ? 'active' : ''}><Link to="/shop">Shop</Link></li>
                                    {/* <li><a href="#">Pages</a>
                                    <ul className="header__menu__dropdown">
                                        <li><a href="./shop-details.html">Shop Details</a></li>
                                        <li><a href="./shoping-cart.html">Shoping Cart</a></li>
                                        <li><a href="./checkout.html">Check Out</a></li>
                                        <li><a href="./blog-details.html">Blog Details</a></li>
                                    </ul>
                                </li> */}
                                    {/* <li><a href="./blog.html">Blog</a></li> */}
                                    <li className={location.pathname == '/contact' ? 'active' : ''}><Link to={"/contact"}>Contact</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3">
                            <div className="header__cart">
                                <ul>
                                    {/* <li><a href="#"><i className="fa fa-heart"></i> <span>1</span></a></li> */}
                                    <li><Link to="/cart"><i className="fa fa-shopping-bag"></i> <span>{user.cartCount}</span></Link></li>
                                </ul>
                                {/* <div className="header__cart__price">item: <span>$150.00</span></div> */}
                            </div>
                        </div>
                    </div>
                    <div className="humberger__open">
                        <i className="fa fa-bars"></i>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Header;