import Footer from "./layout/Footer"
import Header from "./layout/Header"
import Hero from "./layout/Hero"
import react, { useState } from "react"
import Breadcumb from "./layout/Breadcumb"
import HeroController from "../../Controllers/FrontEnd/HeroController"
import { Link } from "react-router-dom"
import { priceFormat } from "../../Common/Helper"



const Payment = (props) => {
    let stateData = props.stateData;
    let productsData = props.productsData;
    let billData = props.billData

    // console.log(productsData)
    return (
        <>
            <Header />
            <HeroController />
            <Breadcumb pageName="Payment" />

            <div className="contact-form spad">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="sleeve">
                                <div className="credit-card selected" style={{ background: "#555" }}>
                                    <div className="card-company"></div>
                                    <div className="card-number" style={{ marginTop: "74px" }}>

                                        <div className="digit-group">{stateData.cardNumber ? stateData.cardNumber : "XXXX XXXX XXXX XXXX"}</div>
                                    </div>
                                    <div className="card-expire"><span className="card-text" style={{color: "darkgrey"}}>CVV &nbsp;</span> <p className="card-p-text">{stateData.cvv ? stateData.cvv : "000"}</p> <span className="card-text"  style={{color: "darkgrey"}}>Expires &nbsp;</span> {stateData.month ? stateData.month : "MM"}/{stateData.year ? stateData.year : "YY"}</div>
                                    <div className="card-holder">{stateData.name ? stateData.name : "e.g. John Doe"}</div>
                                    {/* <div className="card-type">Debit card</div> */}
                                </div>
                            </div>

                            <Link to="/checkout" className="primary-btn cart-btn mt-2 ml-5"> <i className="fa fa-arrow-left" aria-hidden="true"></i>  Back to Checkout</Link>

                            {/* <button type="button" onClick={()=>props.PlaceOrder()} className="site-btn">Pay</button> */}
                        </div>
                        <div className="col-sm-4">
                            <div className="checkout__input">
                                <p>Name on card<span>*</span></p>
                                <input type="text" name='name' value={stateData.name ? stateData.name : ""} className={stateData.error.name ? "inputerror form-control " : "form-control "} placeholder="Card holder name" onChange={(e) => props.changevalue(e)} />
                                <p className="error">{stateData.error ? stateData.error.name ? stateData.error.name : "" : ""}</p>

                            </div>
                            <div className="checkout__input">
                                <p>Card number<span>*</span></p>
                                <input type="text" name='cardNumber' value={stateData.cardNumber ? stateData.cardNumber : ""} className={stateData.error.cardNumber ? "inputerror form-control " : "form-control "} placeholder="Card Number" onChange={(e) => props.changevalue(e)} maxLength={16} />
                                <p className="error">{stateData.error ? stateData.error.cardNumber ? stateData.error.cardNumber : "" : ""}</p>

                            </div>
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="checkout__input">
                                        <p>Month<span>*</span></p>
                                        <input type="text" name='month' value={stateData.month ? stateData.month : ""} className={stateData.error.month ? "inputerror form-control " : "form-control "} placeholder="MM" onChange={(e) => props.changevalue(e)} />
                                        <p className="error">{stateData.error ? stateData.error.month ? stateData.error.month : "" : ""}</p>

                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="checkout__input">
                                        <p>Year<span>*</span></p>
                                        <input type="text" name='year' value={stateData.year ? stateData.year : ""} className={stateData.error.year ? "inputerror form-control " : "form-control "} placeholder="YY" onChange={(e) => props.changevalue(e)} />
                                        <p className="error">{stateData.error ? stateData.error.year ? stateData.error.year : "" : ""}</p>

                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>CVV<span>*</span></p>
                                        <input type="password" name='cvv' value={stateData.cvv ? stateData.cvv : ""} className={stateData.error.cvv ? "inputerror form-control " : "form-control "} placeholder="CVV" onChange={(e) => props.changevalue(e)} maxLength={3} />
                                        <p className="error">{stateData.error ? stateData.error.cvv ? stateData.error.cvv : "" : ""}</p>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-sm-4">
                            <div className="checkout__order">
                                <h4>Order Summery</h4>
                                <div className="checkout__order__products">Products <span>Total</span></div>
                                <ul>
                                    {
                                        productsData.length > 0 &&
                                        productsData.map((product, i) => {
                                            return (
                                                <li key={i}>{product.name} <span>${priceFormat(product.cart_qty * product.price)}</span></li>

                                            )
                                        })
                                    }
                                    {/* <li>Vegetable’s Package <span>$75.99</span></li>
                                    <li>Fresh Vegetable <span>$151.99</span></li>
                                    <li>Organic Bananas <span>$53.99</span></li> */}
                                </ul>
                                {/* <div className="checkout__order__subtotal">Subtotal <span>${props.payAmount}</span></div>
                                <div className="checkout__order__total">Total <span>${props.payAmount}</span></div> */}
                                <div className="checkout__order__subtotal" style={{ borderTop: "unset" }}>Subtotal <span>${priceFormat(billData.subtotal)}</span></div>
                                {billData.discount > 0 && <div className="checkout__order__subtotal" style={{ borderTop: "unset" }}>Discount <span>- ${priceFormat(billData.discount)}</span></div>}
                                <div className="checkout__order__subtotal" style={{ borderTop: "unset" }}>{billData.taxName.toUpperCase()} ({billData.texPer}%) <span>+ ${priceFormat(billData.taxval)}</span></div>
                                <div className="checkout__order__total">Total <span>${priceFormat(billData.total)}</span></div>
                                <button type="button" onClick={() => props.pay()} className="site-btn">{"pay $" + priceFormat(billData.total)}</button>

                            </div>

                        </div>


                    </div>




                </div>

            </div>
            <Footer />
        </>
    )

}
export default Payment