import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Breadcumb from './layout/Breadcumb';
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Hero from "./layout/Hero";
import HeroController from "../../Controllers/FrontEnd/HeroController"

const Contact = (props) => {

    let stateData = props.stateData;

    return(
        <>
            <Header />
                <HeroController />
                <Breadcumb pageName="Contact" />
                <section className="contact spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                                <div className="contact__widget">
                                    <span className="icon_phone"></span>
                                    <h4>Phone</h4>
                                    <p>+01-3-8888-6868</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                                <div className="contact__widget">
                                    <span className="icon_pin_alt"></span>
                                    <h4>Address</h4>
                                    <p>60-49 Road 11378 New York</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                                <div className="contact__widget">
                                    <span className="icon_clock_alt"></span>
                                    <h4>Open time</h4>
                                    <p>10:00 am to 23:00 pm</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                                <div className="contact__widget">
                                    <span className="icon_mail_alt"></span>
                                    <h4>Email</h4>
                                    <p>hello@colorlib.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            
                {/* <div className="map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49116.39176087041!2d-86.41867791216099!3d39.69977417971648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886ca48c841038a1%3A0x70cfba96bf847f0!2sPlainfield%2C%20IN%2C%20USA!5e0!3m2!1sen!2sbd!4v1586106673811!5m2!1sen!2sbd"
                        height="500" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                    <div className="map-inside">
                        <i className="icon_pin"></i>
                        <div className="inside-widget">
                            <h4>New York</h4>
                            <ul>
                                <li>Phone: +12-345-6789</li>
                                <li>Add: 16 Creek Ave. Farmingdale, NY</li>
                            </ul>
                        </div>
                    </div>
                </div> */}

                <div className="contact-form spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="contact__form__title">
                                    <h2>Leave Message</h2>
                                </div>
                            </div>
                        </div>
                        <form>
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <input type="text" id="name" name="name" className={stateData.error.name ? "inputerror form-control" : "form-control "} value={stateData.name} onChange={(e) => props.changevalue(e)} placeholder="Your Name" />
                                    <p className='error'>{stateData.error ? stateData.error.name ? stateData.error.name : "" : ""}</p>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <input type="text" id="email" name="email" className={stateData.error.email ? "inputerror form-control" : "form-control "} value={stateData.email} onChange={(e) => props.changevalue(e)} placeholder="Your Email" />
                                    <p className='error' >{stateData.error ? stateData.error.email ? stateData.error.email : "" : ""}</p>
                                </div>
                                <div className="col-lg-12 text-center">
                                    <textarea id="contactMessage" name="contactMessage" className={stateData.error.contactMessage ? "inputerror form-control" : "form-control "} value={stateData.contactMessage} onChange={(e) => props.changevalue(e)} placeholder="Your Message"></textarea>
                                    <p className='error'>{stateData.error ? stateData.error.contactMessage ? stateData.error.contactMessage : "" : ""}</p>
                                    <button type="button" onClick={() => props.sendMessage()} className="site-btn">SEND MESSAGE</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            <Footer />
        </>
    );

};

export default Contact;