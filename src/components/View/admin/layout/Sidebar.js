import { Link, useLocation } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../../../App";
import { confirmAlert } from 'react-confirm-alert';
// import '../../../../asset/css/custom.css'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useNavigate } from 'react-router-dom';



const Sidebar = (props) => {
    let userData = JSON.parse(localStorage.getItem('AdminData'));
    const user = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    const logOut = () => {
        confirmAlert({
            title: 'Logout',
            message: 'Are you sure to do Logout ?',
            buttons: [
                {
                    label: 'Yes',

                    onClick: () => {
                        user.logout()
                        navigate('/')
                        window.location.reload()
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    return (

        <nav id="sidebar" className={props.expand ? "sidebar toggled" : "sidebar"}>
            <Link className="sidebar-brand" to="/admin/dashboard">
                <svg>
                    <use xlinkHref="#ion-ios-pulse-strong"></use>
                </svg>
                ECOMMERCE
            </Link>
            <div className="sidebar-content">
                <div className="sidebar-user">
                    <div className="font-weight-bold">{userData ? userData.name.toUpperCase() : "Admin"}</div>
                </div>

                <ul className="sidebar-nav">
                    {/* <li className="sidebar-header">
                        Main
                    </li> */}
                    <li className={location.pathname == '/admin' || location.pathname == '/admin/dashboard' || location.pathname == '/admin/' ? "sidebar-item active" : "sidebar-item"}>
                        <Link className="sidebar-link" to='/admin/dashboard'>
                            <i className="align-middle mr-2 fas fa-fw fa-home"></i> <span className="align-middle">Dashboards</span>
                        </Link>
                    </li>
                    <li className={location.pathname == '/admin/users' ? "sidebar-item active" : "sidebar-item"}>
                        <Link className="sidebar-link" to='/admin/users'>
                            <i className="align-middle mr-2  fas fa-fw fa-user"></i> <span className="align-middle">User Management</span>
                        </Link>
                    </li>
                    <li className={location.pathname == '/admin/variant' || location.pathname.startsWith('/admin/variant') ? "sidebar-item active" : "sidebar-item"}>
                        <Link className="sidebar-link" to='/admin/variant'>
                            <i className="align-middle mr-2 fas fa-fw fa-th-large"></i> <span className="align-middle">Variant Management</span>
                        </Link>
                    </li>
                    <li className={location.pathname == '/admin/product' ? "sidebar-item active" : "sidebar-item"}>
                        <Link className="sidebar-link" to='/admin/product'>
                            <i className="fas fa-fw fa-parking" aria-hidden="true"></i> <span className="align-middle">Products</span>
                        </Link>
                    </li>
                    <li className={location.pathname == '/admin/category' || location.pathname.startsWith('/admin/catagory/subcategory/') ? "sidebar-item active" : "sidebar-item"}>
                        <Link className="sidebar-link" to='/admin/category'>
                            <i className="align-middle mr-2 fas fa-fw fa-list"></i> <span className="align-middle">Category</span>
                        </Link>
                    </li>
                    <li className={location.pathname == '/admin/orders' ? "sidebar-item active" : "sidebar-item"}>
                        <Link className="sidebar-link" to='/admin/orders'>
                            <i className="fas fa-fw fa-clipboard-list" aria-hidden="true"></i> <span className="align-middle">Order List</span>
                        </Link>
                    </li>
                    <li className={location.pathname == '/admin/coupon' ? "sidebar-item active" : "sidebar-item"}>
                        <Link className="sidebar-link" to='/admin/coupon'>
                            <i className="fas fa-tags" aria-hidden="true"></i> <span className="align-middle">Coupon</span>
                        </Link>
                    </li>
                    <li className={location.pathname == '/admin/settings' ? "sidebar-item active" : "sidebar-item"}>
                        <Link className="sidebar-link" to='/admin/settings'>
                            <i className="fas fa-fw fa-cogs" aria-hidden="true"></i> <span className="align-middle">Settings</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <a className="sidebar-link" style={{ cursor: "pointer" }} onClick={() => { logOut() }}>
                            <i className="align-middle mr-2   fas fa-fw fa-arrow-alt-circle-right"></i> <span className="align-middle">Logout</span>
                        </a>
                    </li>


                    {/* <li className="sidebar-item active">
                        <a href="#dashboards" data-toggle="collapse" className="sidebar-link">
                            <i className="align-middle mr-2 fas fa-fw fa-home"></i> <span className="align-middle">Dashboards</span>
                        </a>
                        <ul id="dashboards" className="sidebar-dropdown list-unstyled collapse show" data-parent="#sidebar">
                            <li className="sidebar-item active"><a className="sidebar-link" href="dashboard-default.html">Default</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="dashboard-analytics.html">Analytics</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="dashboard-e-commerce.html">E-commerce</a></li>
                        </ul>
                    </li> */}

                    {/* <li className="sidebar-item">
                        <a href="#pages" data-toggle="collapse" className="sidebar-link collapsed">
                            <i className="align-middle mr-2 fas fa-fw fa-file"></i> <span className="align-middle">Pages</span>
                        </a>
                        <ul id="pages" className="sidebar-dropdown list-unstyled collapse " data-parent="#sidebar">
                            <li className="sidebar-item"><a className="sidebar-link" href="pages-settings.html">Settings</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="pages-clients.html">Clients <span
                                className="sidebar-badge badge badge-pill badge-primary">New</span></a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="pages-invoice.html">Invoice</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="pages-pricing.html">Pricing</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="pages-tasks.html">Tasks</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="pages-chat.html">Chat <span
                                className="sidebar-badge badge badge-pill badge-primary">New</span></a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="pages-blank.html">Blank Page</a></li>
                        </ul>
                    </li> */}
                    {/* <li className="sidebar-item">
                        <a href="#auth" data-toggle="collapse" className="sidebar-link collapsed">
                            <i className="align-middle mr-2 fas fa-fw fa-sign-in-alt"></i> <span className="align-middle">Auth</span>
                        </a>
                        <ul id="auth" className="sidebar-dropdown list-unstyled collapse " data-parent="#sidebar">
                            <li className="sidebar-item"><a className="sidebar-link" href="pages-sign-in.html">Sign
                                In</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="pages-sign-up.html">Sign
                                Up</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="pages-reset-password.html">Reset Password</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="pages-404.html">404
                                Page</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="pages-500.html">500
                                Page</a></li>
                        </ul>
                    </li> */}

                    {/* <li className="sidebar-header">
                        Elements
                    </li> */}
                    {/* <li className="sidebar-item">
                        <a href="#ui" data-toggle="collapse" className="sidebar-link collapsed">
                            <i className="align-middle mr-2 fas fa-fw fa-flask"></i> <span className="align-middle">User Interface</span>
                        </a>
                        <ul id="ui" className="sidebar-dropdown list-unstyled collapse " data-parent="#sidebar">
                            <li className="sidebar-item"><a className="sidebar-link" href="ui-alerts.html">Alerts</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="ui-buttons.html">Buttons</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="ui-cards.html">Cards</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="ui-general.html">General</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="ui-grid.html">Grid</a>
                            </li>
                            <li className="sidebar-item"><a className="sidebar-link" href="ui-modals.html">Modals</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="ui-notifications.html">Notifications</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="ui-tabs.html">Tabs</a>
                            </li>
                            <li className="sidebar-item"><a className="sidebar-link" href="ui-typography.html">Typography</a></li>
                        </ul>
                    </li> */}
                    {/* <li className="sidebar-item">
                        <a href="#charts" data-toggle="collapse" className="sidebar-link collapsed">
                            <i className="align-middle mr-2 fas fa-fw fa-chart-pie"></i> <span className="align-middle">Charts</span>
                            <span className="sidebar-badge badge badge-pill badge-primary">New</span>
                        </a>
                        <ul id="charts" className="sidebar-dropdown list-unstyled collapse " data-parent="#sidebar">
                            <li className="sidebar-item"><a className="sidebar-link" href="charts-chartjs.html">Chart.js</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="charts-apexcharts.html">ApexCharts</a></li>
                        </ul>
                    </li> */}

                    {/* <li className="sidebar-item">
                        <a href="#forms" data-toggle="collapse" className="sidebar-link collapsed">
                            <i className="align-middle mr-2 fas fa-fw fa-check-square"></i> <span className="align-middle">Forms</span>
                        </a>
                        <ul id="forms" className="sidebar-dropdown list-unstyled collapse " data-parent="#sidebar">
                            <li className="sidebar-item"><a className="sidebar-link" href="forms-layouts.html">Layouts</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="forms-basic-elements.html">Basic Elements</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="forms-advanced-elements.html">Advanced Elements</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="forms-input-groups.html">Input Groups</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="forms-editors.html">Editors</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="forms-validation.html">Validation</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="forms-wizard.html">Wizard</a></li>
                        </ul>
                    </li> */}
                    {/* <li className="sidebar-item">
                        <a href="#tables" data-toggle="collapse" className="sidebar-link collapsed">
                            <i className="align-middle mr-2 fas fa-fw fa-table"></i> <span className="align-middle">Tables</span>
                        </a>
                        <ul id="tables" className="sidebar-dropdown list-unstyled collapse " data-parent="#sidebar">
                            <li className="sidebar-item"><a className="sidebar-link" href="tables-bootstrap.html">Bootstrap</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="tables-datatables.html">DataTables</a></li>
                        </ul>
                    </li> */}
                    {/* <li className="sidebar-item">
                        <a href="#icons" data-toggle="collapse" className="sidebar-link collapsed">
                            <i className="align-middle mr-2 fas fa-fw fa-heart"></i> <span className="align-middle">Icons</span>
                        </a>
                        <ul id="icons" className="sidebar-dropdown list-unstyled collapse " data-parent="#sidebar">
                            <li className="sidebar-item"><a className="sidebar-link" href="icons-feather.html">Feather</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="icons-ion.html">Ion
                                Icons</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="icons-font-awesome.html">Font Awesome</a></li>
                        </ul>
                    </li> */}
                    {/* <li className="sidebar-item">
                        <a className="sidebar-link" href="calendar.html">
                            <i className="align-middle mr-2 far fa-fw fa-calendar-alt"></i> <span className="align-middle">Calendar</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#maps" data-toggle="collapse" className="sidebar-link collapsed">
                            <i className="align-middle mr-2 fas fa-fw fa-map-marker-alt"></i> <span className="align-middle">Maps</span>
                        </a>
                        <ul id="maps" className="sidebar-dropdown list-unstyled collapse " data-parent="#sidebar">
                            <li className="sidebar-item"><a className="sidebar-link" href="maps-google.html">Google Maps</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="maps-vector.html">Vector Maps</a></li>
                        </ul>
                    </li> */}

                    {/* <li className="sidebar-header">
                        Extras
                    </li>
                    <li className="sidebar-item">
                        <a href="#documentation" data-toggle="collapse" className="sidebar-link collapsed">
                            <i className="align-middle mr-2 fas fa-fw fa-book"></i> <span className="align-middle">Documentation</span>
                        </a>
                        <ul id="documentation" className="sidebar-dropdown list-unstyled collapse " data-parent="#sidebar">
                            <li className="sidebar-item"><a className="sidebar-link" href="docs-getting-started.html">Getting Started</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="docs-plugins.html">Plugins</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="docs-changelog.html">Changelog</a></li>
                        </ul>
                    </li>
                    <li className="sidebar-item">
                        <a href="#layouts" data-toggle="collapse" className="sidebar-link collapsed">
                            <i className="align-middle mr-2 fas fa-fw fa-desktop"></i> <span className="align-middle">Layouts</span>
                        </a>
                        <ul id="layouts" className="sidebar-dropdown list-unstyled collapse " data-parent="#sidebar">
                            <li className="sidebar-item"><a className="sidebar-link" href="layouts-sidebar-left.html">Left Sidebar</a></li>
                            <li className="sidebar-item"><a className="sidebar-link" href="layouts-sidebar-right.html">Right Sidebar</a></li>
                        </ul>
                    </li> */}
                </ul>
            </div>
        </nav>
    )
}
export default Sidebar;