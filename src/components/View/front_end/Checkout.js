import Breadcumb from './layout/Breadcumb';
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import HeroController from "../../Controllers/FrontEnd/HeroController"
import { Link } from 'react-router-dom';
import banana from '../../../asset/frontend/img/cart/cart-3.jpg'
import helper from '../../Common/Helper';
import { priceFormat } from '../../Common/Helper';

const Checkout = (props) => {
    let addressArray = props.address
   let  stateData = props.stateData
    // console.log(props)
    return (
        <>
            <Header />
            <HeroController />
            <Breadcumb pageName="Checkout" />
            <section className="checkout spad">
                <div className="container">
                    {/* <div className="row">
                        <div className="col-lg-12">
                            <h6><span className="icon_tag_alt"></span> Have a coupon? <a href="#">Click here</a> to enter your code
                            </h6>
                        </div>
                    </div> */}
                    <div className="checkout__form">
                        <h4>Billing Details</h4>
                        <form action="#">
                            <div className="row">
                                <div className="col-lg-8 col-md-6">
                                    <div className="shoping__cart__table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="shoping__product">Products</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.products.length ?
                                                    props.products.map((product, i) => {
                                                        return (
                                                            <tr>
                                                                <td className="shoping__cart__item">
                                                                    <img src={helper.mainProductImgPath + product.image} alt="" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                                                                    <h5>{product.name}</h5>
                                                                </td>
                                                                <td className="shoping__cart__price">
                                                                    ${priceFormat(product.price)}
                                                                </td>
                                                                <td className="shoping__cart__quantity">
                                                                    {product.cart_qty}
                                                                </td>
                                                                <td className="shoping__cart__total">
                                                                    ${priceFormat(product.price * product.cart_qty)}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    <></>}


                                            </tbody>
                                        </table>

                                    </div>
                                    <div className="">
                                        <h4>Shipping Address</h4>
                                        <p>{addressArray.name ? addressArray.name.toUpperCase():""}<br/>
                                        {addressArray.add1},{addressArray.add2 && addressArray.add2}<br/>
                                        {addressArray.city?.toUpperCase()},{addressArray.c_state?.toUpperCase()},<br/>
                                        {addressArray.country?.toUpperCase()} - {addressArray.zip}
                                        </p>
                                    </div>
                                    <hr/>
                                    {/* <Link to="/cart" className="site-btn">Back To cart</Link> */}
                                    <Link to="/cart" className="primary-btn cart-btn mt-2">Back to cart</Link>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="checkout__order">
                                        <h4 style={{borderBottom:"unset"}}>Your Order</h4>
                                        {/* <div className="checkout__order__products">Products <span>Total</span></div>
                                        <ul>
                                            <li>Vegetable’s Package <span>$75.99</span></li>
                                            <li>Fresh Vegetable <span>$151.99</span></li>
                                            <li>Organic Bananas <span>$53.99</span></li>
                                        </ul> */}
                                        <div className="checkout__order__subtotal" style={{borderTop:"unset"}}>Subtotal <span>${priceFormat(stateData.subtotal)}</span></div>
                                     {stateData.discount > 0 &&   <div className="checkout__order__subtotal"style={{borderTop:"unset"}}>Discount <span>- ${priceFormat(stateData.discount)}</span></div>}
                                        <div className="checkout__order__subtotal" style={{borderTop:"unset"}}>{stateData.taxName.toUpperCase()} ({stateData.texPer}%) <span>+ ${priceFormat(stateData.taxval)}</span></div>
                                        <div className="checkout__order__total">Total <span>${priceFormat(stateData.total)}</span></div>
                                        {/* <div className="checkout__input__checkbox">
                                            <label htmlFor="acc-or">
                                                Create an account?
                                                <input type="checkbox" id="acc-or" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adip elit, sed do eiusmod tempor incididunt
                                            ut labore et dolore magna aliqua.</p>
                                        <div className="checkout__input__checkbox">
                                            <label htmlFor="payment">
                                                Check Payment
                                                <input type="checkbox" id="payment" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div> */}
                                        {/* <div className="checkout__input__checkbox">
                                            <label htmlFor="paypal">
                                                Paypal
                                                <input type="checkbox" id="paypal" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div> */}
                                        <button type="button" onClick={()=>props.PlaceOrder()} className="site-btn">PLACE ORDER</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />

        </>
    )
}
export default Checkout