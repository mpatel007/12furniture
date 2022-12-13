import banner from '../../../../asset/frontend/img/hero/banner5.jpg'
import { useLocation, Link } from 'react-router-dom'
import { getSettingValuebyName } from '../../../Common/Helper';



const Hero = (props) => {

    const allCategory = props.allCategory;

    const location = useLocation();

    const myst = {
        backgroundImage: `url(${banner})`
    }
    const toogleStyle = {
        display: props.toggle ? "none" : "block",
        zIndex: "9",
        position: location.pathname == "/" || location.pathname == "/home" ? "unset" : "absolute",
        width: "100%",
        left: 0,
        top: "46px",
        background: "#ffffff"
    }

    const categoriesAllList = allCategory.filter(allCategory => allCategory.status == 1)

    return (

        <section className={location.pathname == "/" || location.pathname == "/home" ? "hero" : " hero hero-normal"}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className={categoriesAllList.length == 12 ? "hero__categories hero_scroll" : "hero__categories"}>
                            <div className="hero__categories__all" onClick={() => props.setToggle(!props.toggle)}>
                                <i className="fa fa-bars"></i>
                                <span>All Categories</span>
                            </div>
                            {/* <ul style={toogleStyle}>
                                {
                                    allCategory.length && 
                                    allCategory.map((allCategory, i) => {
                                       
                                        return(
                                            allCategory.status == 1 &&
                                            <li key={i}><a href="#">{allCategory.name}</a></li>

                                        )
                                    })  
                                }
                            </ul> */}

                            {
                                // console.log(allCategory),
                                allCategory.length &&
                                <ul style={toogleStyle}>{
                                    allCategory.map((allCategory, i) => {
                                        return (
                                            allCategory.status == 1 &&
                                            <li key={i}>
                                                <Link to={`/shop/${allCategory.id}`}>{allCategory.name}</Link>
                                                {/* <a href="#">{allCategory.name}</a> */}
                                            </li>
                                        )
                                    })}
                                </ul>
                            }

                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="hero__search">
                            <div className="hero__search__form">
                                <form action="#">
                                    {/* <div className="hero__search__categories">
                                        All Categories
                                        <span className="arrow_carrot-down"></span>
                                    </div> */}
                                    <input type="text" placeholder="What do yo u need?" />
                                    <button type="submit" className="site-btn">SEARCH</button>
                                </form>
                            </div>
                            <div className="hero__search__phone">
                                <div className="hero__search__phone__icon">
                                    <i className="fa fa-phone"></i>
                                </div>
                                <div className="hero__search__phone__text">
                                    <h5>{getSettingValuebyName("infoContactNumber") != '' ? getSettingValuebyName("infoContactNumber") : '+65 11.188.888'}</h5>
                                    <span>support 24/7 time</span>
                                </div>
                            </div>
                        </div>
                        {
                            location.pathname == "/" || location.pathname == "/home" ?
                                <div className="hero__item set-bg" style={myst}>
                                    <div className="hero__text">
                                        <span className='text-white'>Flower FRESH</span>
                                        <h2>Flowers <br />100% Fresh</h2>
                                        <p className='text-white'>Free Pickup and Delivery Available</p>
                                        <Link to="/shop" className="primary-btn">SHOP NOW</Link>
                                    </div>
                                </div>
                                : <></>
                        }

                    </div>
                </div>
            </div>
        </section>

    )
}
export default Hero;