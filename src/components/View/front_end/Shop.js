import Footer from "./layout/Footer"
import Header from "./layout/Header"
import Hero from "./layout/Hero"
import react, { useState } from "react"
import Breadcumb from "./layout/Breadcumb"
import HeroController from "../../Controllers/FrontEnd/HeroController"
import pro1 from "../../../asset/frontend/img/product/product-2.jpg"
import Slider from '@mui/material/Slider';
import helper from "../../Common/Helper"
import { ImageExist } from "../../Common/Helper"
import { Link } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { priceFormat } from "../../Common/Helper"



const Shop = (props) => {
    let productList = props.productsList;
    let allCategory = props.allCategory;
    let minPrice = props.maxAndMinPrice.minPrice;
    let maxPrice = props.maxAndMinPrice.maxPrice;
 
    // console.log("maxPrice "+maxPrice)
    // console.log("minPrice "+minPrice)
    // console.log("v1 "+props.value1)


    // const active = {
    //     cursor: "pointer",
    //     border: "1px solid #9fbcc1",
    //     borderRadius: "34px",
    //     paddingLeft: "10px"
    // }

    return (
        <>
            <Header />
            <HeroController />
            <Breadcumb pageName="Shop" />


            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-5">
                            <div className="sidebar">
                                <div className="sidebar__item">
                                    <h4>Categories</h4>
                                    <ul>
                                        {
                                            allCategory.length > 0 &&
                                            allCategory.map((category, i) => {
                                                return (
                                                    // category.status == 1 && <li key={i}><a style={{ cursor: 'pointer' }} className={props.slectedCat && category.id == props.slectedCat ?"activecat":""} onClick={() =>  props.filterProducts(category.id, props.min, props.max,1)}>{category?.name[0].toUpperCase() + category.name.slice(1)}  </a></li>

                                                    category.status == 1 && <li key={i}><a style={{ cursor: 'pointer', color: '#252525 !important' }} className={props.slectedCat && category.id == props.slectedCat ? "activecat2" : ""} onClick={() => props.filterProducts(category.id, props.min, props.max, 1)}>{category.name.toUpperCase()}   </a>
                                                    </li>

                                                    // category.status == 1 && <li key={i}><a style={{ cursor: 'pointer',color:'#252525' }} className={props.slectedCat && category.id == props.slectedCat ?"activecat2":""} onClick={() =>  props.filterProducts(category.id, props.min, props.max,1)}>{category?.name[0].toUpperCase() + category.name.slice(1)}   </a></li>
                                                )

                                            })
                                        }
                                    </ul>
                                </div>
                                <div className="sidebar__item">
                                    <h4>Price</h4>
                                    <div className="price-range-wrap">
                                        <Slider
                                            getAriaLabel={() => 'Minimum distance'}
                                            value={props.value1}
                                            onChange={props.handleChange1}
                                            // getAriaValueText={props.valuetext}
                                            // valueLabelDisplay="auto"
                                            disableSwap
                                            max={maxPrice}
                                            min={minPrice}
                                            color="secondary"
                                        />
                                    </div>
                                    ${minPrice}  &nbsp;To&nbsp;   ${maxPrice}

                                </div>
                                <a onClick={() => props.clearFilter()} style={{ cursor: "pointer" }} className="primary-btn cart-btn">clear filters</a>

                            </div>

                        </div>


                        <div className="col-lg-9 col-md-7">
                            <div className="section-title product__discount__title">
                                <h2>All Products</h2>
                            </div>
                            <div className="row" >
                                {productList.length > 0 &&
                                    productList.map((product, i) => {
                                        // console.log(nf.format(product.price));
                                        return (
                                            product.status == 1 &&
                                            <div className="col-lg-4 col-md-6 col-sm-6" key={i}>
                                                <Link to={`/product/${product.slug}`}>
                                                    <div className="product__item">
                                                        <div className="product__item__pic set-bg">
                                                            <img src={(helper.mainProductImgPath + product.image) ? helper.mainProductImgPath + product.image : helper.noImgPath} alt="Product Image" />
                                                            {/* <ul className="product__item__pic__hover">

                                                            <li><Link to={`/product/${product.slug}`}><i className="fa fa-info"></i></Link></li>
                                                            <li><a onClick={() => props.addToCart(product)}><i className="fa fa-shopping-cart"></i></a></li>
                                                        </ul> */}
                                                        </div>
                                                        <div className="product__item__text">
                                                            <h6><Link to={`/product/${product.slug}`}>{product.product_name.toUpperCase()}</Link></h6>
                                                            <h5>${priceFormat(product.price)}</h5>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}




                            </div>
                            {props.pageNumbers.length > 1 &&
                                <Stack spacing={2}>
                                    <Pagination count={props.pageNumbers.length} page={props.currentPage} onChange={props.handleClick} shape="rounded" />
                                </Stack>
                            }

                            {/* <div className="product__pagination">
                                {props.pageNumbers.length > 1 &&
                                    props.pageNumbers.map((page, i) => {
                                        return (
                                            <a className={props.currentPage == page ? "selectedpage" : ""}
                                                style={{ cursor: "pointer" }}
                                                key={page}
                                                id={page}
                                                onClick={(e) => props.handleClick(e)}>{page}</a>
                                        )
                                    })
                                }

                               
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )

}
export default Shop