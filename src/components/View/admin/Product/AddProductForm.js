import React from "react";
import { Modal, Button } from "react-bootstrap";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
// import { colourOptions } from '../data';
// import helper from "../../../Common/Helper";
import helper, { ImageExist } from "../../../Common/Helper";

const animatedComponents = makeAnimated();
// import Option fr
// import 'bootstrap/dist/css/bootstrap.min.css';

function AddProductForm(props) {
    let stateData = props.stateData;
    let updateModalTitle = props.updateModalTitle;
    let variants = props.variantsList;
    let categories = props.categoryList;
    let variantArray = stateData.variants;
    let variantArray2 = [];
    if (stateData && variantArray && variantArray.length > 0) {
        variantArray.map((variantId) => {
            variants.map((variant) => {
                if (variantId == variant.value) {
                    variantArray2.push(variant)
                }
            })
        })
    }
    // CHECK IF IMAGE EXISTS

    return (
        <>
            <Modal
                size="xl"
                show={props.modal}
                onHide={() => props.setModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {updateModalTitle ? 'Update product' : 'Add product'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group row">
                            <label className="col-form-label col-sm-2 text-sm-right" htmlFor="inputProductName">Product Name</label>
                            <div className="col-sm-10">
                                <input type="text" id="productName" name='productName' placeholder="name" value={stateData ? (stateData.productName) ? stateData.productName : "" : ""} onChange={(e) => { props.changevalue(e) }} className={stateData.error.productName ? "inputerror form-control" : " form-control"} />
                                <p className='error'>{stateData.error ? stateData.error.productName ? stateData.error.productName : "" : ""}</p>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-sm-2 text-sm-right" htmlFor="inputProductSlug">Product Slug</label>
                            <div className="col-sm-10">
                                <input type="text" id="productSlug" name='productSlug' placeholder="Slug" readOnly={props.productHdnID ? true : false} value={stateData.productSlug} onChange={(e) => { props.changevalue(e) }} className={stateData.error.productSlug ? "inputerror form-control" : " form-control"} />
                                <p className='error'>{stateData.error ? stateData.error.productSlug ? stateData.error.productSlug : "" : ""}</p>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-sm-2 text-sm-right" htmlFor="inputDescription">Description</label>
                            <div className="col-sm-10">
                                <textarea className={stateData.error.productName ? "inputerror form-control" : " form-control"} id="description" name="description" rows="5" value={stateData ? (stateData.description) ? stateData.description : "" : ""} onChange={(e) => { props.changevalue(e) }}></textarea>
                                <p className='error'>{stateData.error ? stateData.error.description ? stateData.error.description : "" : ""}</p>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-form-label col-sm-2 text-sm-right" htmlFor="inputprice">Price</label>
                            <div className="col-sm-4">
                                <input type="text" id="price" name='price' placeholder="Price" value={stateData ? (stateData.price) ? stateData.price : "" : ""} onChange={(e) => { props.changevalue(e) }} className={stateData.error.price ? "inputerror form-control" : " form-control"} />
                                <p className='error'>{stateData.error ? stateData.error.price ? stateData.error.price : "" : ""}</p>
                            </div>
                            <label className="col-form-label col-sm-1 text-sm-right" htmlFor="inputstock">Stock</label>
                            <div className="col-sm-5">
                                <input type="text" id="stock" name='stock' placeholder="Stock" value={stateData ? (stateData.stock) ? stateData.stock : "" : ""} onChange={(e) => { props.changevalue(e) }} className={stateData.error.stock ? "inputerror form-control" : " form-control"} />
                                <p className='error'>{stateData.error ? stateData.error.stock ? stateData.error.stock : "" : ""}</p>
                            </div>
                        </div>

                        {/* <div className="form-group row">
                            <label className="col-form-label col-sm-2 text-sm-right" htmlFor="inputstock">Stock</label>
                            <div className="col-sm-10">
                                <input type="text" id="stock" name='stock' placeholder="Stock" value={stateData ? (stateData.stock) ? stateData.stock : "" : ""} onChange={(e) => { props.changevalue(e) }} className={stateData.error.stock ? "inputerror form-control" : " form-control"} />
                                <p className='error'>{stateData.error ? stateData.error.stock ? stateData.error.stock : "" : ""}</p>
                            </div>
                        </div> */}

                        {/* <div className="custom-file"> */}
                        <div className="form-group row">
                            <label className="col-form-label col-sm-2 text-sm-right" htmlFor="inputstock">Image</label>
                            <div className="col-sm-10">
                                <input type="file" className={stateData.error.productImage ? "inputerror custom-file-input" : " custom-file-input"} id="productImage" accept="image/*" onChange={(e) => { props.changefile(e) }} />
                                {/* <label className="custom-file-label" htmlFor="customFile" style={{ margin: "0px 10px 0px 10px" }}>{stateData ? (stateData.productImage) ? stateData.productImage : "Choose file" : "Choose file"}</label> */}
                                <label className="custom-file-label" htmlFor="customFile" style={{ margin: "0px 10px 0px 10px" }}> Choose file </label>
                                <p className='error'>{stateData.error ? stateData.error.productImage ? stateData.error.productImage : "" : ""}</p>
                            </div>
                        </div>
                        {
                            stateData.productImage ?
                                ImageExist(helper.ProductImgPath + stateData.productImage) ?
                                    <div className="form-group row">
                                        <label className="col-form-label col-sm-2 text-sm-right" htmlFor="inputstock"></label>
                                        <div className="col-sm-10">
                                            <img src={stateData.productImage ? helper.ProductImgPath + stateData.productImage : helper.noImgPath} alt="Product Image" style={{ width: "100px !important", objectFit: "none", height: "80px", marginLeft: "10px" }} />
                                        </div>
                                    </div>
                                    : <></>
                                : <></>
                        }
                        {/* </div> */}
                        <div className="form-group row">
                            <label className="col-form-label col-sm-2 text-sm-right" label="category_id">Category</label>
                            <div className="col-sm-10">
                                <select className={stateData.error.category_id ? "inputerror form-control" : " form-control"} onChange={(e) => { props.changevalue(e) }} id="category_id" name="category_id">
                                    <option value="">---- Select Category ----</option>
                                    {
                                        categories.map((category, ind) => {
                                            return (
                                                category.status == 1 ?
                                                    <option selected={stateData ? stateData.category_id == category.id ? "selected" : "" : ""} value={category.id}>{category.name}</option>
                                                    : ''
                                            )
                                        })
                                    }
                                </select>
                                <p className='error'>{stateData.error ? stateData.error.category_id ? stateData.error.category_id : "" : ""}</p>
                            </div>
                        </div>

                        {/* <div className="form-group row">
                            <label className="col-form-label col-sm-2 text-sm-right" htmlFor="inputstock">Variant</label>
                            <div className="col-sm-10">
                                <select className="form-control" id="variants" name="variants" multiple aria-label="multiple select" onChange={props.handleChange}>
                                    {
                                        variants.map((variant, ind) => {
                                            return (
                                                variant.status == 1 ?
                                                    <option selected={variantArray && variantArray.includes(variant.id) ? 'selected' : ''} value={variant.id}>{variant.name}</option>
                                                    // <option value={variant.id} >{variant.name}</option>
                                                    : ''
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div> */}
                        <div className="form-group row">
                            <label className="col-form-label col-sm-2 text-sm-right" htmlFor="inputstock">Variant</label>
                            <div className="col-sm-10">
                                {/* {console.log(variants)} */}
                                <Select
                                    isMulti
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    defaultValue={variantArray2}
                                    options={variants}
                                    onChange={props.handleChange}
                                />
                            </div>
                        </div>



                        <div className="form-group row">
                            <label className="col-form-label col-sm-2 text-sm-right" label="status">Status</label>
                            <div className="col-sm-10">
                                <select className={"form-control"} onChange={(e) => { props.changevalue(e) }} id="status" name="status">
                                    <option selected={stateData ? stateData.status == 1 ? "selected" : "" : ""} value="1">Active</option>
                                    <option selected={stateData ? stateData.status == 0 ? "selected" : "" : ""} value="0">InActive</option>
                                </select>
                            </div>
                        </div>
                        <p className='error'>{stateData.error ? stateData.error.status ? stateData.error.status : "" : ""}</p>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => props.setModal(false)}>Close</Button>
                    <Button variant="primary" onClick={(e) => props.submitProductForm(e)}>{updateModalTitle ? 'Update' : 'Add'}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default AddProductForm;