import { Link } from "react-router-dom";
import helper from "../../../Common/Helper";
import { priceFormat } from "../../../Common/Helper";

const Products = (props) => {
    const product = props.product;
    return (
        <section className="featured spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Latest Products</h2>
                        </div>
                    </div>
                </div>
                <div className="row featured__filter">
                    {/* {console.log(product)} */}
                    {product.length > 0 &&
                        product.reverse().slice(0, 4).map(product => (
                            product.status == 1 ?
                                <>
                                        <div className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat productCartClass">
                                            <Link to={`/product/${product.slug}`}>
                                            <div className="featured__item">
                                                <div className="featured__item__pic set-bg" >
                                                    <img src={product.image ? helper.mainProductImgPath + product.image : helper.noImgPath} alt="Product Image" />
                                                    {/* <li><a href="#"><i className="fa fa-heart"></i></a></li> */}
                                                    {/* <ul className="featured__item__pic__hover">    
                                                <li><Link to={`/product/${product.slug}`}><i className="fa fa-info"></i></Link></li>
                                                <li><a onClick={() => props.addToCart(product)}><i className="fa fa-shopping-cart"></i></a></li>
                                            </ul> */}
                                                </div>
                                                <div className="featured__item__text">
                                                    <h6><Link to={`/product/${product.slug}`}>{product.product_name}</Link></h6>
                                                    <h5>${priceFormat(product.price)}</h5>
                                                </div>
                                            </div>
                                            </Link>
                                        </div>
                                </>
                                : ''
                        ))}

                </div>
            </div>
        </section >
    )
}

export default Products;