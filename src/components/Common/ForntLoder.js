

const ForntLoder = (props) => {
    return (
        // <div id={props.loading ? "pageLoader" :""} className=""></div>
        <div id={props.loading ?"preloder":"myl"}>
        <div className={props.loading ?"loader":""}></div>
    </div>
    )
}

export default ForntLoder;
