import '../../asset/admin/css/custom.css'


const PageLoader = (props) => {
    return (
        // <div id={props.loading ? "pageLoader" :""} className=""></div>
        <div className={props.loading ? "preloader":""}>
            <div className="preloader-icon"></div>
            <span>{props.loading ? "Loading...":""}</span>
        </div>
    )
}
export default PageLoader;