import react,{useContext} from "react";
import reactDom from "react-dom";
import { UserContext } from "../../../../App";
import { Link } from "react-router-dom";
//import '../../../../asset/admin/css/modern.css';


const Navbar = (props) => {
    const user = useContext(UserContext);
    return (
        <nav className="navbar navbar-expand navbar-theme" style={{padding:"17px 15px"}}>
            <a className="sidebar-toggle d-flex mr-2" onClick={()=>props.setExpand(!props.expand)}>
                <i className="hamburger align-self-center"></i>
            </a>

    
            <div className="navbar-collapse collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown active">
               
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right py-0" aria-labelledby="messagesDropdown">
                            <div className="dropdown-menu-header">
                                <div className="position-relative">
                                    4 New Messages
                                </div>
                            </div>
                            <div className="list-group">
                                <a href="#" className="list-group-item">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-2">
                                            <img src="img/avatars/avatar-5.jpg" className="avatar img-fluid rounded-circle" alt="Michelle Bilodeau"/>
                                        </div>
                                        <div className="col-10 pl-2">
                                            <div className="text-dark">Michelle Bilodeau</div>
                                            <div className="text-muted small mt-1">Nam pretium turpis et arcu. Duis arcu tortor.</div>
                                            <div className="text-muted small mt-1">5m ago</div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="list-group-item">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-2">
                                            <img src="img/avatars/avatar-3.jpg" className="avatar img-fluid rounded-circle" alt="Kathie Burton"/>
                                        </div>
                                        <div className="col-10 pl-2">
                                            <div className="text-dark">Kathie Burton</div>
                                            <div className="text-muted small mt-1">Pellentesque auctor neque nec urna.</div>
                                            <div className="text-muted small mt-1">30m ago</div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="list-group-item">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-2">
                                            <img src="img/avatars/avatar-2.jpg" className="avatar img-fluid rounded-circle" alt="Alexander Groves"/>
                                        </div>
                                        <div className="col-10 pl-2">
                                            <div className="text-dark">Alexander Groves</div>
                                            <div className="text-muted small mt-1">Curabitur ligula sapien euismod vitae.</div>
                                            <div className="text-muted small mt-1">2h ago</div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="list-group-item">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-2">
                                            <img src="img/avatars/avatar-4.jpg" className="avatar img-fluid rounded-circle" alt="Daisy Seger"/>
                                        </div>
                                        <div className="col-10 pl-2">
                                            <div className="text-dark">Daisy Seger</div>
                                            <div className="text-muted small mt-1">Aenean tellus metus, bibendum sed, posuere ac, mattis non.</div>
                                            <div className="text-muted small mt-1">5h ago</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="dropdown-menu-footer">
                                <a href="#" className="text-muted">Show all messages</a>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item dropdown ml-lg-2">
                        {/* <a className="nav-link dropdown-toggle position-relative" href="#" id="alertsDropdown" data-toggle="dropdown">
                            <i className="align-middle fas fa-bell"></i>
                            <span className="indicator"></span>
                        </a> */}
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right py-0" aria-labelledby="alertsDropdown">
                            <div className="dropdown-menu-header">
                                4 New Notifications
                            </div>
                            <div className="list-group">
                                <a href="#" className="list-group-item">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-2">
                                            <i className="ml-1 text-danger fas fa-fw fa-bell"></i>
                                        </div>
                                        <div className="col-10">
                                            <div className="text-dark">Update completed</div>
                                            <div className="text-muted small mt-1">Restart server 12 to complete the update.</div>
                                            <div className="text-muted small mt-1">2h ago</div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="list-group-item">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-2">
                                            <i className="ml-1 text-warning fas fa-fw fa-envelope-open"></i>
                                        </div>
                                        <div className="col-10">
                                            <div className="text-dark">Lorem ipsum</div>
                                            <div className="text-muted small mt-1">Aliquam ex eros, imperdiet vulputate hendrerit et.</div>
                                            <div className="text-muted small mt-1">6h ago</div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="list-group-item">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-2">
                                            <i className="ml-1 text-primary fas fa-fw fa-building"></i>
                                        </div>
                                        <div className="col-10">
                                            <div className="text-dark">Login from 192.186.1.1</div>
                                            <div className="text-muted small mt-1">8h ago</div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="list-group-item">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-2">
                                            <i className="ml-1 text-success fas fa-fw fa-bell-slash"></i>
                                        </div>
                                        <div className="col-10">
                                            <div className="text-dark">New connection</div>
                                            <div className="text-muted small mt-1">Anna accepted your request.</div>
                                            <div className="text-muted small mt-1">12h ago</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="dropdown-menu-footer">
                                <a href="#" className="text-muted">Show all notifications</a>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item dropdown ml-lg-2">
                        {/* <a className="nav-link dropdown-toggle position-relative" href="#" id="userDropdown" data-toggle="dropdown">
                            <i className="align-middle fas fa-cog"></i>
                        </a> */}
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            <Link className="dropdown-item" to="/profile"><i className="align-middle mr-1 fas fa-fw fa-user"></i> View Profile</Link>
                            {/* <a className="dropdown-item" href="#"><i className="align-middle mr-1 fas fa-fw fa-comments"></i> Contacts</a>
                            <a className="dropdown-item" href="#"><i className="align-middle mr-1 fas fa-fw fa-chart-pie"></i> Analytics</a>
                            <a className="dropdown-item" href="#"><i className="align-middle mr-1 fas fa-fw fa-cogs"></i> Settings</a> */}
                            {/* <div className="dropdown-divider"></div> */}
                            <a className="dropdown-item" style={{cursor: "pointer"}}  onClick={()=>{user.logout()}}><i className="align-middle mr-1 fas fa-fw fa-arrow-alt-circle-right"></i> Sign out</a>
                        </div>
                    </li>
                </ul>
            </div>

        </nav>
    )
}
export default Navbar;