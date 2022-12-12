// import React from "react";
// import { Modal, Button, Dropdown, Option, Form } from "react-bootstrap";

// function viewVariant(props) {
//     const productAllVariant = props.productAllVariant;
//     return (
//         <>
//             <Modal
//                 size="xl"
//                 show={props.variantModel}
//                 onHide={() => props.setVariantModel(false)}
//                 aria-labelledby="example-modal-sizes-title-lg"
//             >
//                 <Modal.Header>
//                     <Modal.Title id="example-modal-sizes-title-lg">
//                         {/* {updateModalTitle ? 'Update product' : 'Add product'} */}
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <form >
//                         {

//                             productAllVariant ?
//                             Object.keys(productAllVariant).map((val, i) => {
//                                 return (
//                                     <div className="p-2">
//                                         <div className="row">
//                                             {/* <div className="col-1 text-center border p-3">
//                                                 <label className="custom-control custom-checkbox m-0">
//                                                     <input type="checkbox" className="custom-control-input" />
//                                                     <span className="custom-control-label"></span>
//                                                 </label>
//                                             </div> */}
//                                             <div className="col-5 text-center border p-3">
//                                                 <strong>{val}</strong>
//                                             </div>
//                                             <div className="col-7 border p-3">
//                                                 <div>
//                                                     {
//                                                         Object.values(productAllVariant[val]).map((variantVal, variantI) => {
//                                                             return (
//                                                                 <label className="form-check form-check-inline" style={{ width: "80px" }}>
//                                                                     <input className="form-check-input" type="checkbox" name="varient" onClick={(e) => { props.changeVariantVal(e) }} value={variantVal.vid+'_'+variantVal.vvId} disabled={variantVal.vvStatus != 1 ? true : false }/>
//                                                                     <span className="form-check-label" >
//                                                                         {variantVal.vvValue}
//                                                                     </span>
//                                                                 </label>
//                                                             )
//                                                         })
//                                                     }
//                                                 </div>

//                                             </div>
//                                         </div>
//                                     </div>
//                                 )
//                             })
//                             : 
//                             <h1>No Variant Found</h1>
//                             // Object.keys((productAllval, ind) => {
//                             //     console.log(productAllval)
//                             // })


//                         }

//                     </form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="danger" onClick={() => props.setVariantModel(false)}>Close</Button>
//                     <Button variant="success" onClick={() => props.setVariantModel(false)}>Save</Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     )
// }
// export default viewVariant;