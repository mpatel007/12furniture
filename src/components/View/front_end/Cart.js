import Breadcumb from './layout/Breadcumb';
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import HeroController from "../../Controllers/FrontEnd/HeroController"
import banana from '../../../asset/frontend/img/cart/cart-3.jpg'
import { Link } from 'react-router-dom';
import helper from '../../Common/Helper';
import { priceFormat } from '../../Common/Helper';

const Cart = (props) => {
    let cartItems = props.cartItems
    let stateData = props.stateData
    let taxDetails = props.taxDetails
    // console.log(taxDetails);
    const variantStyle = {
        fontSize: "14px",
        color: "#666",
        textTransform: "uppercase",
        // cursor: "pointer",
        marginRight: "10px",
        display: "inline-block",
        marginBottom: 0,
        border: "1px solid #666",
        padding: "1px 7px 0px 7px",
        borderRadius: "7px",
        marginBottom: "5px"
    }




    return (
        <>
            <Header />
            <HeroController />
            <Breadcumb pageName="Cart" />
            <section className="shoping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="shoping__product">Products</th>
                                            <th style={{ width: "30%" }}>Variants</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!cartItems.length ?
                                            <tr >
                                                <td colSpan="4" >No Item in Cart <br /><br />
                                                    <Link to="/shop" className="primary-btn cart-btn">Add Item</Link>
                                                </td>
                                            </tr>
                                            :
                                            cartItems.map((item, i) => {
                                                return (
                                                    <>
                                                        <tr key={i}>

                                                            <td className="shoping__cart__item">
                                                                <img src={helper.mainProductImgPath + item.image} alt="" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                                                                <h5>{item.name}</h5>
                                                            </td>
                                                            <td className="shoping__cart__variants">
                                                                {
                                                                    item.variantData &&
                                                                    // <table className="table table-borderless" style={{ color: "black" }}>
                                                                    //     <tbody>

                                                                    JSON.parse(item.variantData).map((variant, i) => {
                                                                        // console.log(variant);
                                                                        return (
                                                                            <>
                                                                                <strong>{variant.varientName.toUpperCase()} </strong>: <span style={{color:"brown"}}> {variant.varientValue.toUpperCase()}</span><br />


                                                                            </>

                                                                        )
                                                                    })

                                                                }
                                                            </td>
                                                            <td className="shoping__cart__price">
                                                                ${priceFormat(item.price)}
                                                            </td>
                                                            <td className="shoping__cart__quantity">
                                                                <div className="quantity">
                                                                    <div className="pro-qty">
                                                                        {props.productsData.length &&
                                                                            props.productsData.map((data, key) => {

                                                                                return (
                                                                                    item.id == data.product_id ?
                                                                                        <input type="number" min="1" max="5" pattern="[0-9]*" inputMode="numeric" id={item.id} onKeyDown="return false" value={item.id == data.product_id ? data.qty : 1} onChange={(e) => props.updateCartItem(e, key)} />
                                                                                        : "")

                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="shoping__cart__total">
                                                                {props.productsData.length &&
                                                                    props.productsData.map((data, key) => {

                                                                        return (
                                                                            item.id == data.product_id ?
                                                                                "$" +priceFormat( item.price * data.qty)
                                                                                : "")

                                                                    })
                                                                }

                                                            </td>
                                                            <td className="shoping__cart__item__close">
                                                                <span className="icon_close" onClick={() => props.removeCartItem(item.cart_id)}></span>
                                                            </td>

                                                        </tr>
                                                    </>
                                                )

                                            })


                                        }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {cartItems.length ?
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="shoping__cart__btns">
                                    <Link to="/" className="primary-btn cart-btn">CONTINUE SHOPPING</Link>

                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="shoping__discount">
                                    <h5>Shipping Address</h5>
                                    <hr />
                                    <div className=" mt-5">
                                        <div className="checkout__input">
                                            <p>Name<span>*</span></p>
                                            <input type="text" name="name" value={stateData.name ? stateData.name : ""} disabled={stateData.name ? true : false} placeholder="Name" onChange={(e) => props.changevalue(e)} />

                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>Phone<span>*</span></p>
                                                <input type="text" name='phone' value={stateData.phone ? stateData.phone : ""} disabled={stateData.phone ? true : false} placeholder="Phone" onChange={(e) => props.changevalue(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>Email<span>*</span></p>
                                                <input type="text" name='email' value={stateData.email ? stateData.email : ""} disabled={stateData.email ? true : false} placeholder="Email" onChange={(e) => props.changevalue(e)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkout__input">
                                        <p>Country<span>*</span></p>
                                        <input type="text" name='country' value={stateData.country ? stateData.country : ""} className={stateData.error.country ? "inputerror form-control " : "form-control "} placeholder="Country" onChange={(e) => props.changevalue(e)} />
                                        <p className="error">{stateData.error ? stateData.error.country ? stateData.error.country : "" : ""}</p>
                                    </div>
                                    <div className="checkout__input">
                                        <p>Address 1<span>*</span></p>
                                        <input type="text" placeholder="Street Address" className="checkout__input__add" name='add1' value={stateData.add1 ? stateData.add1 : ""} className={stateData.error.add1 ? "inputerror form-control " : "form-control "} onChange={(e) => props.changevalue(e)} />
                                        <p className="error">{stateData.error ? stateData.error.add1 ? stateData.error.add1 : "" : ""}</p>

                                        <p>Address 2</p>
                                        <input type="text" className='form-control' placeholder="Apartment, suite, unite ect (optinal)" name='add2' value={stateData.add2 ? stateData.add2 : ""} onChange={(e) => props.changevalue(e)} />

                                    </div>
                                    <div className="checkout__input">
                                        <p>Town/City<span>*</span></p>
                                        <input type="text" name='city' value={stateData.city ? stateData.city : ""} className={stateData.error.city ? "inputerror form-control " : "form-control "} placeholder="City" onChange={(e) => props.changevalue(e)} />
                                        <p className="error">{stateData.error ? stateData.error.city ? stateData.error.city : "" : ""}</p>

                                    </div>
                                    <div className="checkout__input">
                                        <p>State<span>*</span></p>
                                        <input type="text" name='c_state' value={stateData.c_state ? stateData.c_state : ""} className={stateData.error.c_state ? "inputerror form-control " : "form-control "} placeholder="State" onChange={(e) => props.changevalue(e)} />
                                        <p className="error">{stateData.error ? stateData.error.c_state ? stateData.error.c_state : "" : ""}</p>

                                    </div>
                                    <div className="checkout__input">
                                        <p>Postcode / ZIP<span>*</span></p>
                                        <input type="text" name='zip' value={stateData.zip ? stateData.zip : ""} className={stateData.error.zip ? "inputerror form-control " : "form-control "} placeholder="ZipCode" onChange={(e) => props.changevalue(e)} />
                                        <p className="error">{stateData.error ? stateData.error.zip ? stateData.error.zip : "" : ""}</p>

                                    </div>


                                    <div className="checkout__input">
                                        <p>Order notes</p>
                                        <input type="text" name='notes' className='form-control' value={stateData.notes ? stateData.notes : ""} placeholder="Notes about your order, e.g. special notes for delivery." onChange={(e) => props.changevalue(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="shoping__continue">
                                    <div className="shoping__discount">
                                        <h5>Discount Codes</h5>
                                        <form action="#">
                                            <input type="text" value={props.couponCode ? props.couponCode : ""} onChange={(e) => props.setCouponCode(e.target.value.toUpperCase())} placeholder="Enter your coupon code" />
                                            <button type="button" className="site-btn" onClick={() => props.applyCoupon()}>APPLY COUPON</button>
                                        </form>
                                    </div>
                                </div>

                                <div className="shoping__checkout">
                                    <h5>Cart Total</h5>
                                    <ul>
                                        <li>Subtotal <span>${priceFormat(props.subTotal)}</span></li>

                                        {props.couponCodeDiscount > 0 && <li className=' pb-0 myDIV'>Discount <span>- ${priceFormat(props.couponCodeDiscount)}</span> <a style={{ display: 'flex', fontWeight: 'lighter', fontSize: '13px', color: '#dd2222', cursor: "pointer" }} id="remove_coupon" onClick={() => props.removeDiscountCoupon()} className="hide">Remove Coupon</a></li>}
                                        <li>{taxDetails.taxName.toUpperCase()} ({taxDetails.taxValue}%) <span>+ ${priceFormat(props.taxPay)}</span></li>
                                        <li>Total <span>${priceFormat(props.total)}</span></li>

                                    </ul>
                                    <a onClick={() => props.onClickCheckout()} className="primary-btn text-white" style={{ cursor: "pointer" }}>PROCEED TO CHECKOUT</a>
                                </div>
                            </div>
                        </div>
                        : <></>}

                </div>
            </section>
            <Footer />

        </>
    )

}
export default Cart;