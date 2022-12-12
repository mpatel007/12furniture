// import React, { useState } from 'react';
import Footer from "./layout/Footer"
import Header from "./layout/Header"
import Hero from "./layout/Hero"
import react, { useState,useEffect } from "react"
import Breadcumb from "./layout/Breadcumb"
import HeroController from "../../Controllers/FrontEnd/HeroController"
import ToastAlert from "../../Common/ToastAlert";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';



const Login = (props) => {
    let StateData = props.stateData;

    const clientId = '816501128694-t5a7jtrr7n3lt217doce5llfl1i049ag.apps.googleusercontent.com';

        useEffect(() => {
        const initClient = () => {
                gapi.client.init({
                    // apiKey: "AIzaSyBv3z-eu096_eFkpqCih7asOfC8OIBEAJw",
                clientId: clientId,
                scope: ''
            });
            };
            gapi.load('client:auth2', initClient);
        });

        const onSuccess = (res) => {
            props.loginGoogle(res)
            
            // setProfile(res.profileObj);
        };
        const onFailure = (err) => {
            ToastAlert({ msg: err || 'User not Found', msgType: 'error' });
            console.log('failed:', err);
        };
    
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
                    <div style={{justifyContent: "center",display: "flex",marginTop:"15px"}}>
                        <GoogleLogin
                                clientId={clientId}
                                buttonText="Sign in with Google"
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                            />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )

}
export default Login