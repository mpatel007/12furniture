import { Modal, Button, Dropdown, Option, Form } from "react-bootstrap";
import '../../../../asset/admin/css/custom.css'

const VariantForm = (props) => {
    let stateData = props.stateData
    let errorIds = stateData.errids
    return (
        <>
            <Modal
                size="lg"
                show={props.modal}
                onHide={() => props.setModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header >
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {stateData.id ? "Update Variant" : "Add Variant"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Variant Name</label>
                        <div className="col-sm-10">
                            <input type="text" id="variantname" name='variantname' value={stateData.variantname} className={stateData.error.variantname ? "inputerror form-control " : "form-control "} onChange={(e) => props.changevalue(e)} placeholder="Variant name" />
                            <p className='error'>{stateData.error ? stateData.error.variantname ? stateData.error.variantname : "" : ""}</p>
                        </div>
                    </div>

                    {!stateData.id &&
                        props.inputList.length > 0 ?
                        props.inputList.map((val, i) => {
                            return (
                                <div className="form-group row" key={i}>
                                    <label className="col-form-label col-sm-2 text-sm-right"></label>
                                    <div className="col-sm-8">
                                        <input type="text" id="variantvalue" name='variantvalue' className={errorIds.includes(i) ? "inputerror form-control" : "form-control"} value={val.variantvalue} onChange={(e) => props.handleInputChange(e, i)} placeholder="Variant value" />
                                        {errorIds.includes(i) &&<p className='error'>This field is required.</p>  }
                        
                                    </div>
                                    <div className="col-sm-2">
                                        {props.inputList.length !== 1 && <button className="btn btn-danger" onClick={() => props.handleRemoveClick(i)}><i className="fas fa-times"></i></button>}&nbsp;
                                        {props.inputList.length - 1 === i && <button className="btn btn-secondary" onClick={() => props.handleAddClick()}><i className="fas fa-plus"></i></button>}&nbsp;
                                    </div>
                                </div>

                            )


                        }) : <></>
                    }
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
                    {stateData.id ? <Button variant="primary" onClick={() => props.updateVariant()}>Update</Button> : <Button variant="primary" onClick={() => props.addVariant()}>Save</Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default VariantForm