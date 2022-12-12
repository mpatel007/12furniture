import banner from "../../../../asset/frontend/img/brd4.jpg"
const Breadcumb = (props) => {
    const mystyle = {
        backgroundImage: `url(${banner})`
    }
    return (
        <section className="breadcrumb-section set-bg" data-setbg="img/breadcrumb.jpg" style={mystyle}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="breadcrumb__text">
                            <h2>{props.pageName}</h2>
                            {/* <div className="breadcrumb__option">
                                <a href="./index.html">Home</a>
                                <span>Blog</span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Breadcumb;