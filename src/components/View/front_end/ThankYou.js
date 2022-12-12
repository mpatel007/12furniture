import Breadcumb from './layout/Breadcumb';
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import HeroController from "../../Controllers/FrontEnd/HeroController";
import { Link } from 'react-router-dom';


const ThankYou = () => {

    const siteHeaderTitle = {
        margin: "0",
        fontFamily: "Montserrat, sans-serif",
        fontSize: "2.5rem",
        fontWeight: "700",
        lineHeight: '1.1',
        textTransform: "uppercase",
        "-webkit-hyphens": "auto",
        "-moz-hyphens": "auto",
        "-ms-hyphens": "auto",
        hyphens: "auto",
        fontSize: " 6.25rem",
        textAlign: "center"
    }
    const checkmark = {
        // textAlign: "center"
        fontSize: " 6.25rem",
        color: "#24b663"


    }

    return (
        <>
            {/* <Header />
            <HeroController />
            <Breadcumb pageName="Thank you" /> */}
            {/* <link href='https://fonts.googleapis.com/css?family=Lato:300,400|Montserrat:700' rel='stylesheet' type='text/css' /> */}
            {/* <link rel="stylesheet" href="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/default_thank_you.css" /> */}

            <header className="site-header" id="header" style={{ paddingTop: "70px" }}>
                <h1 className="site-header__title" style={siteHeaderTitle} data-lead-id="site-header-title">THANK YOU!</h1>
            </header>

            <div className="main-content" style={{ textAlign: "center", margin: " 0 auto", maxWidth: "820px", marginBottom: "100px" }}>
                <i className="fa fa-check main-content__checkmark" id="checkmark" style={checkmark}></i>
                <p className="main-content__body" data-lead-id="main-content-body" style={{ color: "#6f6f6f", fontSize: "1.25rem" }}>
                    Congratulations on your recent purchase! <br />
                    We hope your experience was excellent and we can’t wait to see you again soon.</p><br />
                <Link to="/home" className="primary-btn cart-btn">Back to home</Link>
            </div>
            <Footer />



        </>

    )
}
export default ThankYou