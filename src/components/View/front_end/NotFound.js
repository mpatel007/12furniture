import React from "react-router-dom";
// import "../../../asset/frontend/css/notfound.css";
import { useNavigate } from "react-router-dom";

const myContainer = {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    alignItems: "center",
}

const myH1 = {
    fontSize: "150px",
    fontWeight: "900",
    marginBottom: "20px",
    color: "#9fbcc1",
    userSelect: "none",
}

const myH3 = {
    fontSize: "30px",
    fontFamily: "Arial, Helvetica, sans-serif",
    marginBottom: "10px",
    color: "#252525",
    userSelect: "none",
}

const myP = {
    fontSize: "18px",
    fontFamily: "Arial, Helvetica, sans-serif",
    marginBottom: "50px",
    color: "#252525",
    userSelect: "none",
    textAlign: "center",
}

const myButton = {
    padding: "15px 30px",
    backgroundColor: "#ff0000a1",
    fontFamily: "Arial, Helvetica, sans-serif",
    backgroundColor: "#9fbcc1",
    color: "white",
    fontSize: "20px",
    border: "0",
    borderRadius: "25px",
    cursor: "pointer",
}


const NotFound = () => {

    const navigate = useNavigate();

    const gotoHome = () => {
        navigate("/home")
    }

    return (
        <div className="container mt-5" style={myContainer}>
            <h1 className="mt-3" style={myH1}>Oops!</h1>
            <h3 className="mt-3" style={myH3}>404 - PAGE NOT FOUND</h3>
            <p className="mt-3" style={myP}>The page you are looking for might be removed or temporarily unavailable</p>
            <button style={myButton} onClick={() => gotoHome()}>GOTO HOMEPAGE</button>
        </div>
    );
};

export default NotFound;