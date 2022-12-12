import { Modal, Button, Dropdown, Option, Form } from "react-bootstrap";
import '../../../../../asset/admin/css/custom.css'

const SubcategoryForm = (props) => {
    let stateData = props.stateData;
    // console.log(stateData)

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
                        {stateData.id ? "Update SubCategory" : "Add SubCategory"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                    <div className="form-group row">
                        <label className="col-form-label col-sm-3 text-sm-right">SubCategory Name</label>
                        <div className="col-sm-9">
                            <input type="text" id="subcategoryName" name='subcategoryName' value={stateData.subcategoryName} className={stateData.error.subcategoryName ? "inputerror form-control " : "form-control "} onChange={(e) => props.changevalue(e)} placeholder="Subcategory name" />
                            <p className='error'>{stateData.error ? stateData.error.subcategoryName ? stateData.error.subcategoryName : "" : ""}</p>
                        </div>
                    </div>

                        <div className="form-group row">
                        <label className="col-form-label col-sm-3 text-sm-right">Status</label>
                        <div className="col-sm-9">
                            <select className="form-control" onChange={(e) => { props.changevalue(e) }} id="status" name="status">
                                <option selected={stateData ? stateData.status == 1 ? "selected" : "" : ""} value="1">Active</option>
                                <option selected={stateData ? stateData.status == 0 ? "selected" : "" : ""} value="0">InActive</option>
                            </select>
                        </div>
                    </div>
                    </form>

              
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => props.setModal(false)}>Close</Button>
                    {stateData.id ? <Button variant="primary" onClick={() => props.updateSubcategory()}>Update</Button> : <Button variant="primary" onClick={() => props.addSubcategory()}>Save</Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default SubcategoryForm