import react from "react";
import { useState } from "react";
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Footer from './Footer'


const Dashboard = (props) => {
    const [expand, setExpand] = useState(false)
    let userData = JSON.parse(localStorage.getItem('AdminData'));

    return (

        <div className="wrapper">
            <Sidebar expand={expand} />
            <div className="main">
                <Navbar setExpand={setExpand} expand={expand} />
                <main className="content">
                    <div className="container-fluid">

        {/* //-------------------------------------------------------------------- */}
                        <div className="header">
                            <h1 className="header-title">
                                Welcome back, {userData ? userData.name.toUpperCase() : "USER"}
                            </h1>
                            {/* <p className="header-subtitle">You have 24 new messages and 5 new notifications.</p> */}
                        </div>
        {/* --------------------------------------------------------------------------- */}
           
                    </div>
                </main>
                <Footer />
            </div>
        </div>


    )
}
export default Dashboard;