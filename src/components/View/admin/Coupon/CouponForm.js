import React from 'react';
import { Modal, Button, Dropdown, Option, Form } from "react-bootstrap";
import "../../../../asset/admin/css/custom.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const CouponForm = (props) => {
    // console.log(props.expiryDate);
    let stateData = props.stateData;

    return (
        <>
            <Modal
                size="lg"
                show={props.modal}
                onHide={() => props.setModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                    <Modal.Title>
                            {stateData.id ? "Update Coupon" : "Add Coupon"}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Coupon Code</label>
                        <div className="col-sm-10">
                            <input type="text" id="couponCode" name="couponCode" className={stateData.error.couponCode ? "inputerror form-control" : "form-control "} value={stateData.couponCode} onChange={(e) => props.changeValue(e)} placeholder="Coupon Code" autoComplete="off" />
                            <p className='error'>{stateData.error ? stateData.error.couponCode ? stateData.error.couponCode : "" : ""}</p>
                        </div>
                    </div>  
                    <div className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Expiry Date</label>
                        <div className="col-sm-10">
                            <DatePicker id="expiryDate" name="expiryDate" className="form-control" minDate={new Date()} selected={props.expiryDate} value={props.expiryDate} onChange={(date) => props.setExpiryDate(date)} /> 
                            {/* onChange={(date) => props.setExpiryDate(date)} */}
                            {/* <input type="date" id="expiryDate" name="expiryDate" className={stateData.error.couponCode ? "inputerror form-control" : "form-control "} sx={{ width: 220 }} InputLabelProps={{ shrink: true, }} /> */}
                            {/* <input type="text" id="expiryDate" name="expiryDate" className={stateData.error.expiryDate ? "inputerror form-control" : "form-control "} value={stateData.expiryDate} onChange={(e) => props.changeValue(e)} placeholder="Expiry Date" /> */}
                            <p className='error'>{stateData.error ? stateData.error.expiryDate ? stateData.error.expiryDate : "" : ""}</p>
                        </div>
                    </div> 
                    <div className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Number Of Coupon</label>
                        <div className="col-sm-10">
                            <input type="text" id="numberOfCoupon" name="numberOfCoupon" className={stateData.error.numberOfCoupon ? "inputerror form-control" : "form-control "} value={stateData.numberOfCoupon} onChange={(e) => props.changeValue(e)} placeholder="Number Of Coupon" />
                            <p className='error'>{stateData.error ? stateData.error.numberOfCoupon ? stateData.error.numberOfCoupon : "" : ""}</p>
                        </div>
                    </div> 
                    <div className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Discount Type</label>
                        <div className="col-sm-10">
                            <select id="discountType" name="discountType" className={stateData.error.discountType ? "inputerror form-control" : " form-control"} onChange={(e) => { props.changeValue(e) }}>
                                <option value="">---- Select Discount Type ----</option>
                                <option selected={stateData ? stateData.discountType == "Percentage" ? "selected" : "" : ""} value="Percentage">Percentage</option>
                                <option selected={stateData ? stateData.discountType == "Flat" ? "selected" : "" : ""} value="Flat">Flat</option>
                            </select>
                            <p className='error'>{stateData.error ? stateData.error.discountType ? stateData.error.discountType : "" : ""}</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Discount Rate</label>
                        <div className="col-sm-10">
                            <input type="text" id="discountRate" name="discountRate" className={stateData.error.discountRate ? "inputerror form-control" : "form-control "} value={stateData.discountRate} onChange={(e) => props.changeValue(e)} placeholder="Discount Rate" />
                            <p className='error'>{stateData.error ? stateData.error.discountRate ? stateData.error.discountRate : "" : ""}</p>
                        </div>
                    </div> 
                    <div className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Above Price</label>
                        <div className="col-sm-10">
                            <input type="text" id="abovePrice" name="abovePrice" className={stateData.error.abovePrice ? "inputerror form-control" : "form-control "} value={stateData.abovePrice} onChange={(e) => props.changeValue(e)} placeholder="Above Price" />
                            <p className='error'>{stateData.error ? stateData.error.abovePrice ? stateData.error.abovePrice : "" : ""}</p>
                        </div>
                    </div> 
                    
                    
                    <div className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Status</label>
                        <div className="col-sm-10">
                            <select className="form-control" onChange={(e) => { props.changeValue(e) }} id="status" name="status">
                                <option selected={stateData ? stateData.status == 1 ? "selected" : "" : ""} value="1">Active</option>
                                <option selected={stateData ? stateData.status == 0 ? "selected" : "" : ""} value="0">InActive</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => props.setModal(false)}>Close</Button>
                    {stateData.id ? <Button variant="primary" onClick={() => props.updateCoupon()}>Update</Button> : <Button variant="primary" onClick={() => props.addCoupon()}>Save</Button>}
                </Modal.Footer>
            </Modal>
        </>
    );

};

export default CouponForm;
