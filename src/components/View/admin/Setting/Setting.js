import { Modal, Button, Row, Tab, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-data-table-component-extensions/dist/index.css";
// import '../../../asset/css/custom.css';
import helper, { ImageExist } from "../../../Common/Helper";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
//import "../../../../asset/admin/css/modern.css";

const Setting = (props) => {

    let setting = props.setting;
    // console.log(setting);

    return (
        <>
            <div className="wrapper">
                <Sidebar expand={props.expand} />
                <div className="main">
                    <Navbar setExpand={props.setExpand} expand={props.expand} />
                    <main className="content">
                        <div className="container-fluid mb-5">
                            <div className="header">
                                <h1 className="header-title">
                                    Settings
                                </h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Settings</li>
                                    </ol>
                                </nav>
                            </div>
                            <Tab.Container id="setting-tab" defaultActiveKey="first">
                                <Row>
                                    {/* <div className="card"> */}
                                    <Col md={3} xl={2} className="settingTab">
                                        <Nav variant="pills" className="flex-column setting-nav" style={{ backgroundColor: "white", border: "unset", cursor: 'pointer' }}>
                                            {/* <h5>Profile Settings</h5> */}
                                            <Nav.Item>
                                                <Nav.Link eventKey="first" className="settingNav">Logo</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="second" className="settingNav">Contact</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="third" className="settingNav">Social Media</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="fourth" className="settingNav">Payment</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="fifth" className="settingNav">General</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    {/* </div> */}

                                    <Col md={9} xl={10}>
                                        <Tab.Content>

                                            <Tab.Pane eventKey="first">
                                                <div className="card mb-3" style={{ border: "unset" }}>
                                                    <div className="card-body">
                                                        <h6>Logo</h6>
                                                        <form className="mt-4">
                                                            <label htmlFor="headerLogo">Header Logo :</label>
                                                            <div className="form-group row">
                                                                <div className="col-sm-11">
                                                                    <input type="file" className="custom-file-input file" id="headerLogo" name="headerLogo" accept="image/*" onChange={(e) => props.changeHeaderLogoValue(e)} />
                                                                    <label className="custom-file-label" htmlFor="customFile" style={{ margin: "0px 10px 0px 10px" }}>Choose file</label>
                                                                    <p className='error'>{setting.error ? setting.error.headerLogo ? setting.error.headerLogo : "" : ""}</p>
                                                                    <img src={props.tempHeaderLogo &&  props.tempHeaderLogo != ""  ? props.tempHeaderLogo: helper.settingHeaderLogoImg ? helper.settingHeaderLogoImg : helper.noImgPath} style={{ objectFit: "cover", width: "100px" }} />
                                                                </div>
                                                                <div className="col-sm-1">
                                                                    <button type="button" className="btn btn-primary float-right" onClick={(e) => props.submitHeaderLogo(e)}>Save</button>
                                                                </div>
                                                            </div>
                                                        </form>

                                                        <form className="mt-4">
                                                            <label htmlFor="footerLogo" className="mt-3">Footer Logo :</label>
                                                            <div className="form-group row">
                                                                <div className="col-sm-11">
                                                                    <input type="file" className="custom-file-input file" id="footerLogo" name="footerLogo" accept="image/*" onChange={(e) => props.changeFooterLogoValue(e)} />
                                                                    <label className="custom-file-label" htmlFor="customFile" style={{ margin: "0px 10px 0px 10px" }}>Choose file</label>
                                                                    <p className='error'>{setting.error ? setting.error.footerLogo ? setting.error.footerLogo : "" : ""}</p>
                                                                    <img src={props.tempFooterLogo && props.tempFooterLogo !="" ?props.tempFooterLogo:helper.settingFooterLogoImg ? helper.settingFooterLogoImg : helper.noImgPath} style={{ objectFit: "cover", width: "100px" }} />
                                                                </div>
                                                                <div className="col-sm-1">
                                                                    <button type="button" className="btn btn-primary float-right" onClick={(e) => props.submitFooterLogo(e)}>Save</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </Tab.Pane>

                                            <Tab.Pane eventKey="second">
                                                <div className="card mb-3" style={{ border: "unset" }}>
                                                    <div className="card-body">
                                                        <h6>Contact</h6>
                                                        <form className="mt-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-2">
                                                                    <label htmlFor="infoContactNumber">Phone : </label>
                                                                </div>
                                                                <div className="col-sm-10">
                                                                    <input type={"text"} id="infoContactNumber" name="infoContactNumber" className={setting.error.infoContactNumber ? "inputerror form-control" : " form-control"} value={setting.infoContactNumber ? setting.infoContactNumber : ""} onChange={(e) => props.changeSettingValue(e)} />
                                                                    <p className='error'>{setting.error ? setting.error.infoContactNumber ? setting.error.infoContactNumber : "" : ""}</p>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <div className="col-sm-2">
                                                                    <label htmlFor="infoAddress">Address : </label>
                                                                </div>
                                                                <div className="col-sm-10">
                                                                    <input type={"text"} id="infoAddress" name="infoAddress" className={setting.error.infoAddress ? "inputerror form-control" : " form-control"} value={setting.infoAddress} onChange={(e) => props.changeSettingValue(e)} />
                                                                    <p className='error'>{setting.error ? setting.error.infoAddress ? setting.error.infoAddress : "" : ""}</p>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <div className="col-sm-2">
                                                                    <label htmlFor="infoOpenTime">Open Time : </label>
                                                                </div>
                                                                <div className="col-sm-10">
                                                                    <input type={"text"} id="infoOpenTime" name="infoOpenTime" className={setting.error.infoOpenTime ? "inputerror form-control" : " form-control"} value={setting.infoOpenTime} onChange={(e) => props.changeSettingValue(e)} />
                                                                    <p className='error'>{setting.error ? setting.error.infoOpenTime ? setting.error.infoOpenTime : "" : ""}</p>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <div className="col-sm-2">
                                                                    <label htmlFor="infoEmail">Email : </label>
                                                                </div>
                                                                <div className="col-sm-10">
                                                                    <input type={"email"} id="infoEmail" name="infoEmail" className={setting.error.infoEmail ? "inputerror form-control" : " form-control"} value={setting.infoEmail} onChange={(e) => props.changeSettingValue(e)} />
                                                                    <p className='error'>{setting.error ? setting.error.infoEmail ? setting.error.infoEmail : "" : ""}</p>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <button type="button" className="btn btn-primary" onClick={(e) => props.submitContact(e)}>Save</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </Tab.Pane>

                                            <Tab.Pane eventKey="third">
                                                <div className="card mb-3" style={{ border: "unset" }}>
                                                    <div className="card-body">
                                                        <h6>Social Media</h6>
                                                        <form className="mt-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-2">
                                                                    <label htmlFor="Instagram">Instagram : </label>
                                                                </div>
                                                                <div className="col-sm-10">
                                                                    <input type={"text"} id="Instagram" name="Instagram" className={setting.error.Instagram ? "inputerror form-control" : " form-control"} value={setting.Instagram} onChange={(e) => props.changeSettingValue(e)} />
                                                                    <p className='error'>{setting.error ? setting.error.Instagram ? setting.error.Instagram : "" : ""}</p>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <div className="col-sm-2">
                                                                    <label htmlFor="Pinterest">Pinterest : </label>
                                                                </div>
                                                                <div className="col-sm-10">
                                                                    <input type={"text"} id="Pinterest" name="Pinterest" className={setting.error.Pinterest ? "inputerror form-control" : " form-control"} value={setting.Pinterest} onChange={(e) => props.changeSettingValue(e)} />
                                                                    <p className='error'>{setting.error ? setting.error.Pinterest ? setting.error.Pinterest : "" : ""}</p>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <div className="col-sm-2">
                                                                    <label htmlFor="LinkedIn">LinkedIn : </label>
                                                                </div>
                                                                <div className="col-sm-10">
                                                                    <input type={"text"} id="LinkedIn" name="LinkedIn" className={setting.error.LinkedIn ? "inputerror form-control" : " form-control"} value={setting.LinkedIn} onChange={(e) => props.changeSettingValue(e)} />
                                                                    <p className='error'>{setting.error ? setting.error.LinkedIn ? setting.error.LinkedIn : "" : ""}</p>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <div className="col-sm-2">
                                                                    <label htmlFor="Twitter">Twitter : </label>
                                                                </div>
                                                                <div className="col-sm-10">
                                                                    <input type={"text"} id="Twitter" name="Twitter" className={setting.error.Twitter ? "inputerror form-control" : " form-control"} value={setting.Twitter} onChange={(e) => props.changeSettingValue(e)} />
                                                                    <p className='error'>{setting.error ? setting.error.Twitter ? setting.error.Twitter : "" : ""}</p>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <div className="col-sm-2">
                                                                    <label htmlFor="Facebook">Facebook : </label>
                                                                </div>
                                                                <div className="col-sm-10">
                                                                    <input type={"text"} id="Facebook" name="Facebook" className={setting.error.Facebook ? "inputerror form-control" : " form-control"} value={setting.Facebook} onChange={(e) => props.changeSettingValue(e)} />
                                                                    <p className='error'>{setting.error ? setting.error.Facebook ? setting.error.Facebook : "" : ""}</p>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <button type="button" className="btn btn-primary" onClick={(e) => props.submitSocialMedia(e)}>Save</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </Tab.Pane>

                                            <Tab.Pane eventKey="fourth">
                                                <div className="card mb-3" style={{ border: "unset" }}>
                                                    <div className="card-body">
                                                        <h6>Payment</h6>
                                                        <form className="mt-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-2">
                                                                    <label htmlFor="publishableKey">Publishable Key : </label>
                                                                </div>
                                                                <div className="col-sm-10">
                                                                    <input type={"text"} id="publishableKey" name="publishableKey" className={setting.error.publishableKey ? "inputerror form-control" : " form-control"} value={setting.publishableKey} onChange={(e) => props.changeSettingValue(e)} />
                                                                    <p className='error'>{setting.error ? setting.error.publishableKey ? setting.error.publishableKey : "" : ""}</p>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <div className="col-sm-2">
                                                                    <label htmlFor="secretKey">Secret Key : </label>
                                                                </div>
                                                                <div className="col-sm-10">
                                                                    <input type={"text"} id="secretKey" name="secretKey" className={setting.error.secretKey ? "inputerror form-control" : " form-control"} value={setting.secretKey} onChange={(e) => props.changeSettingValue(e)} />
                                                                    <p className='error'>{setting.error ? setting.error.secretKey ? setting.error.secretKey : "" : ""}</p>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <button type="button" className="btn btn-primary" onClick={(e) => props.submitPayment(e)}>Save</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </Tab.Pane>

                                            <Tab.Pane eventKey="fifth">
                                                <div className="card mb-3" style={{ border: "unset" }}>
                                                    <div className="card-body">
                                                        <h6>General</h6>
                                                        <form className="mt-4">
                                                            <div className="form-group row">
                                                                <div className="col-sm-2">
                                                                    <label htmlFor="tax">Tax Name : </label>
                                                                </div>
                                                                <div className="col-sm-10">
                                                                    <input type={"text"} id="taxName" name="taxName" className={setting.error.taxName ? "inputerror form-control" : " form-control"} value={setting.taxName} onChange={(e) => props.changeSettingValue(e)} />
                                                                    <p className='error'>{setting.error ? setting.error.taxName ? setting.error.taxName : "" : ""}</p>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <div className="col-sm-2">
                                                                    <label htmlFor="tax">Tax (%) : </label>
                                                                </div>
                                                                <div className="col-sm-10">
                                                                    <input type={"text"} id="tax" name="tax" className={setting.error.tax ? "inputerror form-control" : " form-control"} value={setting.tax} onChange={(e) => props.changeSettingValue(e)} />
                                                                    <p className='error'>{setting.error ? setting.error.tax ? setting.error.tax : "" : ""}</p>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <div className="col-sm-2">
                                                                    <label htmlFor="currency">Currency : </label>
                                                                </div>
                                                                <div className="col-sm-10">
                                                                    <input type={"text"} id="currency" name="currency" className={setting.error.currency ? "inputerror form-control" : " form-control"} value={setting.currency} onChange={(e) => props.changeSettingValue(e)} />
                                                                    <p className='error'>{setting.error ? setting.error.currency ? setting.error.currency : "" : ""}</p>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <button type="button" className="btn btn-primary" onClick={(e) => props.submitGeneral(e)}>Save</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </Tab.Pane>

                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Setting;