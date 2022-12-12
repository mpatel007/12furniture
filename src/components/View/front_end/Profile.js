import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Hero from "./layout/Hero";
import react, { useState } from "react";
import Breadcumb from "./layout/Breadcumb";
import HeroController from "../../Controllers/FrontEnd/HeroController";
import { Row, Tab, Nav, Item, Col } from "react-bootstrap";
import "../../../asset/frontend/css/style.css"
import { Link } from "react-router-dom";
import pro1 from "../../../asset/frontend/img/product/product-2.jpg"
import moment from 'moment';
import helper from "../../Common/Helper";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { priceFormat } from "../../Common/Helper";

const Profile = (props) => {
  let StateData = props.stateData;
  let orderDetails = props.orderDetails
  return (
    <>
      <Header />
      <HeroController />
      <Breadcumb pageName="Pofile" />
      <div className="contact-form spad" style={{ background: "#ffff" }}>
        <div className="container">
          {/* 
          <div className="row gutters-sm">
            <div className="col-md-2 mb-3"> */}
          {/* <div
                className="card"
                style={{
                  boxShadow: "0px 7px 11px -1px rgba(196,196,196,1)",
                  border: "unset",
                }}
              > */}
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <Nav
                  variant="pills"
                  className="flex-column profile-nav"
                  style={{
                    boxShadow: "0px 7px 11px -1px rgba(196,196,196,1)",
                    border: "unset",
                  }}
                >
                  <Nav.Item>
                    <Nav.Link className="profileNav" eventKey="first">Profile</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="profileNav" eventKey="second">Change password</Nav.Link>
                  </Nav.Item>
                  {/* <Nav.Item>
                    <Nav.Link className="profileNav" eventKey="third">Address</Nav.Link>
                  </Nav.Item> */}
                  <Nav.Item>
                    <Nav.Link className="profileNav" eventKey="four">Orders</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    {/* <div className="col-md-9"> */}
                    <div
                      className="card mb-3"
                      style={{
                        boxShadow: "0px 7px 11px -1px rgba(196,196,196,1)",
                        border: "unset",
                      }}
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Name</h6>
                          </div>

                          <div className="col-sm-9 text-secondary">
                            {props.edit ? (
                              <>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={StateData.name ? StateData.name : ""}
                                  name="name"
                                  onChange={(e) => props.changevalue(e)}
                                />
                                {StateData.error.name && (
                                  <p className="error">
                                    {StateData.error
                                      ? StateData.error.name
                                        ? StateData.error.name
                                        : ""
                                      : ""}
                                  </p>
                                )}
                              </>
                            ) : (
                              StateData.name
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {StateData.email}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Phone</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {props.edit ? (
                              <>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={StateData.phone ? StateData.phone : ""}
                                  name="phone"
                                  onChange={(e) => props.changevalue(e)}
                                />
                                {StateData.error.phone && (
                                  <p className="error">
                                    {StateData.error
                                      ? StateData.error.phone
                                        ? StateData.error.phone
                                        : ""
                                      : ""}
                                  </p>
                                )}
                              </>
                            ) : (
                              StateData.phone
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-12">
                            {props.edit ? (
                              <>
                                <button
                                  type="button"
                                  className="site-btn"
                                  onClick={() => props.updateUser()}
                                >
                                  Update
                                </button>
                                <button
                                  type="button"
                                  className="site-btn"
                                  style={{ float: "right" }}
                                  onClick={() => props.cancleUpdate()}
                                >
                                  Cancle
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                className="site-btn "
                                onClick={() => props.setEdit(true)}
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <div
                      className="card mb-3"
                      style={{
                        boxShadow: "0px 7px 11px -1px rgba(196,196,196,1)",
                        border: "unset",
                      }}
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Old Password</h6>
                          </div>

                          <div className="col-sm-9 text-secondary">
                            {props.edit ? (
                              <>
                                <input
                                  type="password"
                                  className="form-control"
                                  value={StateData.oldPassword ? StateData.oldPassword : ""}
                                  name="oldPassword"
                                  id="oldPassword"
                                  onChange={(e) => props.changevalue(e)}
                                />
                                {StateData.error.oldPassword && (
                                  <p className="error">
                                    {StateData.error
                                      ? StateData.error.oldPassword
                                        ? StateData.error.oldPassword
                                        : ""
                                      : ""}
                                  </p>
                                )}
                              </>
                            ) : (
                              StateData.oldPassword
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">New Password</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {props.edit ? (
                              <>
                                <input
                                  type="password"
                                  className="form-control"
                                  value={StateData.newPassword ? StateData.newPassword : ""}
                                  name="newPassword"
                                  id="newPassword"
                                  onChange={(e) => props.changevalue(e)}
                                />
                                {StateData.error.newPassword && (
                                  <p className="error">
                                    {StateData.error
                                      ? StateData.error.newPassword
                                        ? StateData.error.newPassword
                                        : ""
                                      : ""}
                                  </p>
                                )}
                              </>
                            ) : (
                              StateData.newPassword
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Confirm Password</h6>
                          </div>

                          <div className="col-sm-9 text-secondary">
                            {props.edit ? (
                              <>
                                <input
                                  type="password"
                                  className="form-control"
                                  value={StateData.confirmPassword ? StateData.confirmPassword : ""}
                                  name="confirmPassword"
                                  id="confirmPassword"
                                  onChange={(e) => props.changevalue(e)}
                                />
                                {StateData.error.confirmPassword && (
                                  <p className="error">
                                    {StateData.error
                                      ? StateData.error.confirmPassword
                                        ? StateData.error.confirmPassword
                                        : ""
                                      : ""}
                                  </p>
                                )}
                              </>
                            ) : (
                              StateData.confirmPassword
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-12">
                            {props.edit ? (
                              <>
                                <button
                                  type="button"
                                  className="site-btn"
                                  onClick={() => props.updateUserPassword()}
                                >
                                  Update
                                </button>
                                <button
                                  type="button"
                                  className="site-btn"
                                  style={{ float: "right" }}
                                  onClick={() => props.cancleUpdate()}
                                >
                                  Cancle
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                className="site-btn "
                                onClick={() => props.setEdit(true)}
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="four">
                    <div
                      className="card mb-3"
                      style={{
                        boxShadow: "0px 7px 11px -1px rgba(196,196,196,1)",
                        border: "unset",
                      }}
                    >
                      {orderDetails.length > 0 ?
                        orderDetails.map((order, i) => {
                          // console.log(order.oaddress)


                          return (
                            <div className="order" key={i}>
                              <div className="card-body">
                                <div class="card">
                                  <h5 class="card-header">
                                    <div className="order_date" style={{ display: "inline-grid" }}>
                                      <span className="" style={{ fontSize: "11px", fontWeight: "bold", padding: '3px', color: "#8b8989" }} >ORDER PLACED</span>
                                      <span className="ml-0" style={{ fontSize: "12px", fontWeight: "100" }}>{moment(order.ocreated_at).format('DD MMMM YYYY')} </span>
                                    </div>
                                    <div className="total ml-5" style={{ display: "inline-grid" }}>
                                      <span className="" style={{ fontSize: "11px", fontWeight: "bold", padding: '3px', color: "#8b8989" }} >TOTAL</span>
                                      <span className="ml-1" style={{ fontSize: "12px", fontWeight: "100" }}>${priceFormat(order.ototal)}</span>
                                    </div>
                                    <div className="shipped_to ml-5" style={{ display: "inline-grid" }}>
                                      <span className="" style={{ fontSize: "11px", fontWeight: "bold", padding: '3px', color: "#8b8989" }} >SHIPPED TO</span>
                                      <span className="ml-1" style={{ fontSize: "12px", fontWeight: "700", color: "#9fbcc1" }}>{order.name}</span>
                                    </div>
                                    <div className="order_id" style={{ display: "inline-grid", float: "right" }}>
                                      <span className="" style={{ fontSize: "11px", fontWeight: "bold", padding: '3px', color: "#8b8989" }} >ORDER ID : {order.oid}</span>
                                      {/* <Link className="ml-1" style={{ fontSize: "12px", fontWeight: "700", color: "#9fbcc1" }} to="/">View order details</Link> */}
                                    </div>
                                  </h5>
                                  <div class="card-body">
                                    <div className="row">
                                      <div className="col-sm-7">
                                        {order.orderItemList.length > 0 &&
                                          order.orderItemList.map((orderItem, i2) => {
                                            return (
                                              <div key={i2} className="order_item mt-2" style={{ borderBottom: '1px solid #ebebeb', paddingBottom: "15px" }}>
                                                <div className="row">
                                                  <div className="col-sm-2">
                                                    <td className="shoping__cart__item">
                                                      <img src={(helper.mainProductImgPath + orderItem.product_image) ? helper.mainProductImgPath + orderItem.product_image : helper.noImgPath} alt="" style={{ width: "100px", height: "70px", objectFit: "cover" }} />

                                                    </td>

                                                  </div>

                                                  <div className="col-sm-4">
                                                    <h5 style={{ fontSize: "20px", fontWeight: "700", color: "#9fbcc1" }}>{orderItem.product_name}</h5>
                                                    <span style={{ fontSize: "12px", fontWeight: "100" }}>Quantity:{orderItem.quantity}</span><br />
                                                    <span style={{ fontSize: "12px", fontWeight: "100" }}>Price: ${priceFormat(orderItem.product_price)}</span><br />
                                                    <span style={{ fontSize: "12px", fontWeight: "100" }}>Total: ${priceFormat(orderItem.total_price)}</span>
                                                    
                                                  </div>
                                                  <div className="col-sm-6">
                                                  {/* <td className="shoping__cart__variants"> */}
                                                  {
                                                    orderItem.variantData &&
                                                    // <table className="table table-borderless" style={{ color: "black" }}>
                                                    //     <tbody>

                                                    JSON.parse(orderItem.variantData).map((variant, i) => {
                                                      // console.log(variant);
                                                      return (
                                                        <>
                                                          <strong>{variant.varientName.toUpperCase()} </strong>: <span style={{ color: "brown" }}> {variant.varientValue.toUpperCase()}</span><br />


                                                        </>

                                                      )
                                                    })

                                                  }
                                                {/* </td>  */}
                                                    </div>
                                                  
                                                </div>
                                             
                                              </div>
                                            
                                              
                                            )

                                          })
                                        }
                                      </div>
                                      <div className="col-sm-5">
                                        <div className="shoping__checkout" style={{ marginTop: "-5px" }}>
                                          <h5>Order Summery</h5>
                                          <ul style={{ marginBottom: "unset" }}>
                                            <li>Subtotal <span>${priceFormat(order.osubtotal)}</span></li>
                                            {order.odiscount > 0 &&
                                              <li>Discount <b style={{ color: 'brown', fontWeight: "500" }}>({order.appliedCouponCode ? order.appliedCouponCode : ''})</b>  <span>- ${priceFormat(order.odiscount)}</span></li>
                                            }
                                            <li>{order.appliedTaxName.toUpperCase()} ({order.appliedTaxPercentage}%) <span>+ ${priceFormat(order.otax)}</span></li>
                                            <li>Total <span>${priceFormat(order.ototal)}</span></li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <br/>
                                  <span><span style={{color:"#8b8989"}}>Shipping Address</span> :   {(order.oaddress) ? order.oaddress.replaceAll("_", " ").replaceAll(",", ",") : '_'}</span>
                                
                                  </div>
                                  
                                </div>
                              </div>
                            </div>
                          )
                        })
                        : <>
                          <div className="card-body">
                            No Orders Found !
                          </div>
                        </>}

                      {props.pageNumbers.length > 1 &&
                        <Stack spacing={2} style={{ marginBottom: "20px" }}>
                          <Pagination count={props.pageNumbers.length} page={props.currentPage} onChange={props.handleClick} shape="rounded" />
                        </Stack>
                      }



                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
          {/* </div>
            </div> */}

          {/* <div className="col-md-9">
              <div
                className="card mb-3"
                style={{
                  boxShadow: "0px 7px 11px -1px rgba(196,196,196,1)",
                  border: "unset",
                }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Name</h6>
                    </div>

                    <div className="col-sm-9 text-secondary">
                      {props.edit ? (
                        <>
                          <input
                            type="text"
                            className="form-control"
                            value={StateData.name ? StateData.name : ""}
                            name="name"
                            onChange={(e) => props.changevalue(e)}
                          />
                          {StateData.error.name && (
                            <p className="error">
                              {StateData.error
                                ? StateData.error.name
                                  ? StateData.error.name
                                  : ""
                                : ""}
                            </p>
                          )}
                        </>
                      ) : (
                        StateData.name
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-10 text-secondary">
                      {StateData.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-11 text-secondary">
                      {props.edit ? (
                        <>
                          <input
                            type="text"
                            className="form-control"
                            value={StateData.phone ? StateData.phone : ""}
                            name="phone"
                            onChange={(e) => props.changevalue(e)}
                          />
                          {StateData.error.phone && (
                            <p className="error">
                              {StateData.error
                                ? StateData.error.phone
                                  ? StateData.error.phone
                                  : ""
                                : ""}
                            </p>
                          )}
                        </>
                      ) : (
                        StateData.phone
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      E-287,Smrutipark,odhav
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      {props.edit ? (
                        <>
                          <button
                            type="button"
                            className="site-btn"
                            onClick={() => props.updateUser()}
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            className="site-btn"
                            style={{ float: "right" }}
                            onClick={() => props.cancleUpdate()}
                          >
                            Cancle
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="site-btn "
                          onClick={() => props.setEdit(true)}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
      </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Profile;