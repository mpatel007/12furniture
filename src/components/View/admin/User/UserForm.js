import { Modal, Button, Dropdown, Option, Form } from "react-bootstrap";
import '../../../../asset/admin/css/custom.css'

const UserForm = (props) => {
    let stateData = props.stateData
    return (
        <>
            <Modal
                size="lg"
                show={props.modal}
                onHide={() => props.setModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {stateData.id ? "Update User" : "Add User "}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Name</label>
                        <div className="col-sm-10">
                            <input type="text" id="name" name='name' value={stateData.name} className={stateData.error.name ? "inputerror form-control " : "form-control "} onChange={(e) => props.changevalue(e)} placeholder="Name" />
                            <p className='error'>{stateData.error ? stateData.error.name ? stateData.error.name : "" : ""}</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Email</label>
                        <div className="col-sm-10">
                            <input type="email" id="email" name='email' readOnly={stateData.id ? true:false} value={stateData.email} className={stateData.error.email ? "inputerror form-control " : "form-control "} onChange={(e) => props.changevalue(e)} placeholder="Email" />
                            <p className='error'>{stateData.error ? stateData.error.email ? stateData.error.email : "" : ""}</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Password</label>
                        <div className="col-sm-10">
                            <input type="password" id="password" name='password' value={stateData.password} className={stateData.error.password ? "inputerror form-control " : "form-control "} onChange={(e) => props.changevalue(e)} placeholder="Password" />
                            <p className='error'>{stateData.error ? stateData.error.password ? stateData.error.password : "" : ""}</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-form-label col-sm-2 text-sm-right">Phone</label>
                        <div className="col-sm-10">
                            <input type="text" id="phone" name='phone' value={stateData.phone} className={stateData.error.phone ? "inputerror form-control " : "form-control "} onChange={(e) => props.changevalue(e)} placeholder="Phone" />
                            <p className='error'>{stateData.error ? stateData.error.phone ? stateData.error.phone : "" : ""}</p>
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
                    {stateData.id ? <Button variant="primary" onClick={() => props.updateUser()}>Update</Button> : <Button variant="primary" onClick={() => props.addUser()}>Save</Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default UserForm