import React from "react";
import { Modal, Button, Dropdown, Option, Form } from "react-bootstrap";
import "../../../../asset/admin/css/custom.css";

const CategoryForm = (props) => {

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
                                {stateData.id ? "Update Category" : "Add Category"}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="form-group row">
                            <label className="col-form-label col-sm-2 text-sm-right">Category Name</label>
                            <div className="col-sm-10">
                                <input type="text" id="categoryname" name="categoryname" className={stateData.error.categoryname ? "inputerror form-control" : "form-control "} value={stateData.categoryname} onChange={(e) => props.changevalue(e)} placeholder="Category Name" />
                                <p className='error'>{stateData.error ? stateData.error.categoryname ? stateData.error.categoryname : "" : ""}</p>
                            </div>
                        </div>  
                        
                        <div className="form-group row">
                            <label className="col-form-label col-sm-2 text-sm-right">Status</label>
                            <div className="col-sm-10">
                                <select className="form-control" onChange={(e) => { props.changevalue(e) }} id="status" name="status">
                                    <option selected={stateData ? stateData.status == 1 ? "selected" : "" : ""} value="1">Active</option>
                                    <option selected={stateData ? stateData.status == 0 ? "selected" : "" : ""} value="0">InActive</option>
                                </select>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => props.setModal(false)}>Close</Button>
                        {stateData.id ? <Button variant="primary" onClick={() => props.updateCategory()}>Update</Button> : <Button variant="primary" onClick={() => props.addCategory()}>Save</Button>}
                    </Modal.Footer>
                </Modal>
            </>
    );
};

export default CategoryForm;
