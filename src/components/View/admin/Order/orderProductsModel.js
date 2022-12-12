import { Modal, Button } from "react-bootstrap";
import '../../../../asset/admin/css/custom.css'
import helper from "../../../Common/Helper";

const orderProductsModel = (props) => {
    const orderProductsList = props.orderProducts;
    return (
        <>
            <Modal
                size="lg"
                show={props.modal}
                onHide={() => props.setModal(false)}
                aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header >
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Order Product's
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="col-12">
                        <div class="checkout__order">
                            <h4>Order Summery</h4>
                            <div className="checkout__order__products">Products <span className="ml-5">Total</span> <span> Quantity</span></div>
                            <ul>
                                {orderProductsList.length > 0 ?
                                    orderProductsList.map((orderProduct) => {
                                        return (
                                            <>
                                                <li className="m-2"><img src={orderProduct.image ? helper.ProductImgPath + orderProduct.image : helper.noImgPath} alt="Product Image" style={{ width: "100px !important", marginRight: "7px", objectFit: "cover", height: "70px" }} />{orderProduct.name} <span className="ml-5">${orderProduct.total_price}</span><span className="mr-3">{orderProduct.quantity}</span></li>
                                                <hr />
                                            </>
                                        )
                                    })
                                    :
                                    <h2 style={{ textAlign: "center" }}> NO Product Found</h2>
                                }
                            </ul>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => props.setModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default orderProductsModel