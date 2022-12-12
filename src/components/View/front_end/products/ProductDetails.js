import React, { useState } from 'react';
import Breadcumb from '../layout/Breadcumb';
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Hero from "../layout/Hero";
import HeroController from "../../../Controllers/FrontEnd/HeroController";
import helper from "../../../Common/Helper";
import ProductController from '../../../Controllers/FrontEnd/ProductsController';
import { priceFormat } from '../../../Common/Helper';

const ProductDetails = (props) => {
    let checkedValues = props.checkedV


    const getcheckedVal = (v) =>{
     return checkedValues.find(x =>x.varientName == v)?.vVid
    }
 
    // console.log(checkedValues);
    // console.log(checkedValues.find(x =>x.variant == 'color').selected);
    let productDetails = props.productDetails[0];
    let variantStyle = {
        fontSize: "14px",
        color: "#666",
        textTransform: "uppercase",
        // cursor: "pointer",
        marginRight: "10px",
        display: "inline-block",
        marginBottom: 0,
        border: "1px solid #9fbcc1",
        padding: "1px 7px 0px 7px",
        borderRadius: "7px",
        marginBottom: "5px"
    }
    let shareIcon = {
        display: "inline-block",
        fontSize: "15px",
        color: "#1c1c1c",
        marginRight: "25px",
    }
    const product_v = {
        cursor: 'pointer',
        display: 'block',
        position: 'absolute',
        top:"0px",
        left:"0px",
        opacity:"0",
        height:"100%",
        width:"100%"
        // top: 0,
        // bottom: 0,
        // left: 0,
        // height: '100%',
        // appearance: 'none',
        // width: '100%',
        // 'WebkitAppearance': 'none',
        // '-moz-appearance': 'none',
    }
    // console.log(props.productDetails);

    return (
        <>
            <Header />
            <HeroController />
            <Breadcumb pageName={productDetails && productDetails.name} />
            <section className="product-details spad" style={{ paddingBottom: "0px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__pic">
                                <div className="product__details__pic__item">
                                    <img className="product__details__pic__item--large"
                                        src={productDetails && productDetails.image ? helper.mainProductImgPath + productDetails.image : helper.noImgPath} alt="product Image" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__text">
                                {/* <div > */}
                                <h3>{productDetails && productDetails.name.toUpperCase()}</h3>
                                <div className="product__details__price">${productDetails &&  priceFormat(productDetails.price)}</div>
                                {/* </div> */}
                                {/* <div className="checkout__order__total" style="border-bottom: 0px; margin-bottom: 0px;">Sub Total <span style="color: black;">$242</span></div> */}
                                <div className="product__details__rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half-o"></i>
                                    <span>(18 reviews)</span>
                                </div>
                                <p>{productDetails && productDetails.description}.</p>
                                <a onClick={() => props.addToCart(productDetails)} className="primary-btn" style={{ cursor: "pointer" }}>ADD TO CART</a>
                                {/* <a href="#" className="heart-icon"><span className="icon_heart_alt"></span></a> */}
                                <ul>
                                    <table className="table table-borderless" style={{ color: "black" }}>
                                        <tbody>
                                            <tr>
                                                <th style={{ width: "25%" }}><strong>Availability </strong></th>
                                                <td><span>{productDetails && productDetails.stock > 0 ? "In Stock" : "Out Of Stock"}</span></td>
                                            </tr>
                                            {
                                                productDetails && productDetails.variantValList ?
                                                    // console.log(productDetails.variantValList)
                                                    Object.keys(productDetails.variantValList).map((variantsKey) => {
                                                        return (
                                                            <tr>
                                                                <th style={{ width: "25%" }}><strong>{variantsKey}</strong></th>
                                                                <td>
                                                                    {
                                                                        productDetails.variantValList[variantsKey].map((variantVal, i) => {
                                                                            // console.log(variantVal.vvId);

                                                                            return (
                                                                                <>
                                                                                    {/* {console.log(checkedValues.find(x => x.variant = variantsKey)?.selected)} */}

                                                                                    <p style={{...variantStyle,position:"relative",backgroundColor:getcheckedVal(variantsKey) === variantVal.vvId?"#9fbcc1":"white",color:getcheckedVal(variantsKey) === variantVal.vvId?"white":"#9fbcc1"}} key={i}>
                                                                                        <input type={'radio'} id={i} style={product_v} name={variantsKey+i} checked={getcheckedVal(variantsKey) === variantVal.vvId} onClick={()=>props.onVariantChange(variantsKey,variantVal.vvId,variantVal.vvValue)} />
                                                                                        {variantVal.vvValue}
                                                                                    </p>

                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    ""
                                            }
                                            <tr>
                                                <th style={{ width: "25%" }}><strong>Shipping</strong></th>
                                                <td><span>01 day shipping. <samp style={{ color: "red" }}>Free pickup today</samp></span></td>
                                            </tr>
                                            <tr>
                                                {/* <li> */}
                                                <th style={{ width: "25%" }}><strong>Share on</strong></th>
                                                <td>
                                                    <div style={{ display: "inline-block" }}>
                                                        <a href="#" style={shareIcon}><i className="fa fa-facebook"></i></a>
                                                        <a href="#" style={shareIcon}><i className="fa fa-twitter"></i></a>
                                                        <a href="#" style={shareIcon}><i className="fa fa-instagram"></i></a>
                                                        <a href="#" style={shareIcon}><i className="fa fa-pinterest"></i></a>
                                                    </div>
                                                </td>
                                                {/* </li> */}
                                            </tr>
                                        </tbody>
                                    </table>
                                    {/* <li>
                                        <b>Availability</b><span>{productDetails && productDetails.stock > 0 ? "In Stock" : "Out Of Stock"}</span></li> */}
                                    {/* {
                                        productDetails && productDetails.variantValList ?
                                            productDetails.variantValList.map((variants) => {
                                                return (
                                                    <li><b>{Object.keys(variants)}</b>
                                                        <span>
                                                            {
                                                                Object.values(variants).map((variantVal) => {
                                                                    return (
                                                                        Object.values(variantVal).map((val) => {
                                                                            return (
                                                                                <p style={variantStyle}>{val.vvValue}</p>
                                                                            )

                                                                        })
                                                                    )

                                                                })
                                                            }
                                                        </span>
                                                    </li>
                                                )
                                            })

                                            :
                                            ""
                                    } */}
                                    {/* <li><b>Shipping</b> <span>01 day shipping. <samp>Free pickup today</samp></span></li>
                                    <li><b>Weight</b> <span>0.5 kg</span></li> */}
                                    {/* <li><b>Share on</b>
                                        <div className="share">
                                            <a href="#"><i className="fa fa-facebook"></i></a>
                                            <a href="#"><i className="fa fa-twitter"></i></a>
                                            <a href="#"><i className="fa fa-instagram"></i></a>
                                            <a href="#"><i className="fa fa-pinterest"></i></a>
                                        </div>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="related-product">
                <div className="container">
                    <div className="row">
                        <ProductController />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ProductDetails;