import { Modal, Button, Dropdown, Option, Form } from "react-bootstrap";
import '../../../../asset/admin/css/custom.css'

const VariantDetailsForm = (props) => {
    let stateData = props.stateData
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
                        {stateData.id ? "Update Variant Value" : "Add Variant Value "}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Variant Value</label>
                        <div className="col-sm-10">
                            <input type="text" id="variantvalue" name='variantvalue' value={stateData.variantvalue} className={stateData.error.variantvalue ? "inputerror form-control " : "form-control "} onChange={(e) => props.changevalue(e)} placeholder="Variant Value" />
                            <p className='error'>{stateData.error ? stateData.error.variantvalue ? stateData.error.variantvalue : "" : ""}</p>
                        </div>
                    </div>
                    {/* <div className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Status</label>
                        <div className="col-sm-10">
                            <select className="form-control" onChange={(e) => { props.changevalue(e) }} id="status" name="status">
                                <option selected={stateData ? stateData.status == 1 ? "selected" : "" : ""} value="1">Active</option>
                                <option selected={stateData ? stateData.status == 0 ? "selected" : "" : ""} value="0">InActive</option>
                            </select>
                        </div>
                    </div> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => props.setModal(false)}>Close</Button>
                    {stateData.id ? <Button variant="primary" onClick={() => props.updateVariantValue()}>Update</Button> : <Button variant="primary" onClick={() => props.addVariantValue()}>Save</Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default VariantDetailsForm