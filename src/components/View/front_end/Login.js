import Footer from "./layout/Footer"
import Header from "./layout/Header"
import Hero from "./layout/Hero"
import react, { useState } from "react"
import Breadcumb from "./layout/Breadcumb"
import HeroController from "../../Controllers/FrontEnd/HeroController"



const Login = (props) => {
    let StateData = props.stateData;

    return (
        <>
            <Header />
            <HeroController />
            <Breadcumb pageName="Login" />

            <div className="contact-form spad">
                <div className="container">
                    {/* <div className="row">
                <div className="col-lg-12">
                    <div className="contact__form__title">
                        <h2>Leave Message</h2>
                    </div>
                </div>
            </div> */}

                    <form action="#">
                        
                        <div className="col-lg-12 text-center">
                            <input type="email" name="email" className={StateData.error.email ?"loginforminput f_inputerror":"loginforminput"} placeholder="Email" onChange={(e)=>props.changevalue(e)} />
                            <p className='f_error'>{StateData.error ? StateData.error.email ? StateData.error.email : "" : ""}</p>
                        </div>
                        <div className="col-lg-12 text-center">
                            <input type="password" name="password" className={StateData.error.password ?"loginforminput f_inputerror":"loginforminput"} placeholder="Password" onChange={(e)=>props.changevalue(e)} />
                            <p className='f_error'>{StateData.error ? StateData.error.password ? StateData.error.password : "" : ""}</p>

                        </div>
                        <div className="col-lg-12 text-center">
                            <button type="button" className="site-btn" onClick={()=>props.login()}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )

}
export default Login