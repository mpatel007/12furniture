import Footer from "./layout/Footer"
import Header from "./layout/Header"
import Hero from "./layout/Hero"
import react, { useState } from "react"
import Breadcumb from "./layout/Breadcumb"
import HeroController from "../../Controllers/FrontEnd/HeroController"


const Register = (props) => {
    let stateData = props.stateData

    return (
        <>
            <Header />
            <HeroController />
            <Breadcumb pageName="Register" />

            <section className="checkout spad">
                <div className="container">

                    <div className="checkout__form">
                        <h4>User Details</h4>
                        <form action="#">

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="checkout__input">
                                        <p>Name<span>*</span></p>
                                        <input type="text" name='name' value={stateData.name} className={stateData.error.name ? "inputerror form-control " : "form-control "} onChange={(e) => props.changevalue(e)} placeholder="Name" />
                                        <p className="error">{stateData.error ? stateData.error.name ? stateData.error.name : "" : ""}</p>
                                    </div>
                                </div>
                                {/* <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Last Name<span>*</span></p>
                                        <input type="text" />
                                    </div>
                                </div> */}
                            </div>
                            {/* <div className="checkout__input">
                                <p>Country<span>*</span></p>
                                <input type="text" />
                            </div> */}
                            {/* <div className="checkout__input">
                                <p>Address<span>*</span></p>
                                <input type="text" placeholder="Street Address" className="checkout__input__add" />
                                <input type="text" placeholder="Apartment, suite, unite ect (optinal)" />
                            </div> */}
                            {/* <div className="checkout__input">
                                <p>Town/City<span>*</span></p>
                                <input type="text" />
                            </div> */}
                            {/* <div className="checkout__input">
                                <p>Country/State<span>*</span></p>
                                <input type="text" />
                            </div>
                            <div className="checkout__input">
                                <p>Postcode / ZIP<span>*</span></p>
                                <input type="text" />
                            </div> */}
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Phone<span>*</span></p>
                                        <input type="text"  name='phone' value={stateData.phone} className={stateData.error.phone ? "inputerror form-control " : "form-control "} onChange={(e) => props.changevalue(e)} placeholder="Phone" />
                                        <p className="error">{stateData.error ? stateData.error.phone ? stateData.error.phone : "" : ""}</p>                                    
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Email<span>*</span></p>
                                        <input type="text" name='email' value={stateData.email} className={stateData.error.email ? "inputerror form-control " : "form-control "} onChange={(e) => props.changevalue(e)} placeholder="Email" />
                                        <p className="error">{stateData.error ? stateData.error.email ? stateData.error.email : "" : ""}</p>
                                     </div>
                                </div>
                            </div>
                            {/* <div className="checkout__input__checkbox">
                                <label htmlFor="acc">
                                    Create an account?
                                    <input type="checkbox" id="acc" />
                                    <span className="checkmark"></span>
                                </label>
                            </div> */}
                            {/* <p>Create an account by entering the information below. If you are a returning customer
                                please login at the top of the page</p> */}
                            <div className="checkout__input">
                                <p>Enter Password<span>*</span></p>
                                <input type="password" name='password' value={stateData.password} className={stateData.error.password ? "inputerror form-control " : "form-control "} onChange={(e) => props.changevalue(e)} placeholder="Password" />
                                <p className="error">{stateData.error ? stateData.error.password ? stateData.error.password : "" : ""}</p>
                            </div>
                            <div className="checkout__input">
                                <p>Confirm Password<span>*</span></p>
                                <input type="password" name='password_confirmation' value={stateData.password_confirmation} className={stateData.error.password_confirmation ? "inputerror form-control " : "form-control "} onChange={(e) => props.changevalue(e)}  placeholder="Confirm Password" />
                                <p className="error">{stateData.error ? stateData.error.password_confirmation ? stateData.error.password_confirmation : "" : ""}</p>

                            </div>
                            {/* <div className="checkout__input__checkbox">
                                <label htmlFor="diff-acc">
                                    Ship to a different address?
                                    <input type="checkbox" id="diff-acc" />
                                    <span className="checkmark"></span>
                                </label>
                            </div> */}
                            {/* <div className="checkout__input">
                                <p>Order notes<span>*</span></p>
                                <input type="text"
                                    placeholder="Notes about your order, e.g. special notes for delivery." />
                            </div> */}
                            <div className="col-lg-12 text-center">
                                <button type="button" className="site-btn" onClick={() => props.addUser()}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )

}
export default Register