import { Link } from "react-router-dom"
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import '../../../../asset/admin/css/custom.css'
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import helper from "../../../Common/Helper";

const Index = (props) => {
    type DataRow = {
        title: string;
        director: string;
        year: string;
    };

    const columns: TableColumn<DataRow>[] = [
        // { name: "Id", selector: "id", sortable: true },
        { name: "User Name", selector: "name", sortable: true },
        // { name: "User Email", selector: "email", sortable: true },
        { name: "Transaction Id", selector: "otransaction_id", sortable: true },
        {
            name: "Total",
            // selector: "status", sortable: true 
            cell: (row) => <>
                <strong>${row.ototal}</strong>
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: "Placed At",
            // selector: "status", sortable: true 
            cell: (row) => <>
                <span>{new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                }).format(new Date(row.ocreated_at))}
                </span>
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: "Transaction status",
            // selector: "status", sortable: true 
            cell: (row) => <>
                <span className={row.otransaction_status == 'succeeded' ? "badge badge-success" : "badge badge-danger"}>{row.otransaction_status}</span>
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
        },
    ];
    // data provides access to your row data
    const ExpandedComponent: React.FC<ExpanderComponentProps<DataRow>> = ({ data }) => {
        let orderProductsList = '';
        return <>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-xl-6">
                    <h3 style={{ margin: "10px 0px 10px 0px" }}><strong>{data.name} Order Details :</strong></h3>
                    <table className="table table-borderless" style={{ color: "black" }}>
                        <tbody>
                            <tr>
                                <th style={{ width: "25%" }}><strong>Order Id :-</strong></th>
                                <td>{(data.oid) ? data.oid : '_'}</td>
                            </tr>
                            <tr>
                                <th style={{ width: "25%" }}><strong>User Name :-</strong></th>
                                <td>{(data.name) ? data.name : '_'}</td>
                            </tr>
                            <tr>
                                <th style={{ width: "25%" }}><strong>User Email :-</strong></th>
                                <td>{(data.email) ? data.email : '_'}</td>
                            </tr>
                            <tr>
                                <th style={{ width: "25%" }}><strong>User phone Number :-</strong></th>
                                <td>{(data.phone) ? data.phone : '_'}</td>
                            </tr>
                            <tr>
                                <th style={{ width: "25%" }}><strong>Transaction id :-</strong></th>
                                <td>{(data.otransaction_id) ? data.otransaction_id : '_'}</td>
                            </tr>
                            <tr>
                                <th style={{ width: "25%" }}><strong>Transaction status :-</strong></th>
                                <td className={data.otransaction_status == 'succeeded' ? "text-success font-weight-bold" : "text-danger font-weight-bold"}>{(data.otransaction_status) ? data.otransaction_status : '_'}</td>
                            </tr>
                            <tr>
                                <th style={{ width: "25%" }}><strong>Billing address :-</strong></th>
                                <td> {(data.oaddress) ? data.oaddress.replaceAll("_", " ").replaceAll(",", " , ") : '_'}</td>
                            </tr>
                            <tr>
                                <th style={{ width: "25%" }}><strong>Order notes :-</strong></th>
                                <td>{(data.order_notes) ? data.order_notes : '_'}</td>
                            </tr>
                            <tr>
                                <th style={{ width: "25%" }}><strong>Order Placed At :-</strong></th>
                                <td>{new Intl.DateTimeFormat("en-GB", {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit"
                                }).format(new Date(data.ocreated_at))}
                                </td>
                            </tr>
                            <tr>
                                <th style={{ width: "25%" }}><strong>Order Total :-</strong></th>
                                <td className="text-primary font-weight-bold">${(data.ototal) ? data.ototal : '_'}</td>
                            </tr>

                        </tbody>
                    </table>
                    <span style={{ fontSize: "15px" }} className="m-3">
                        {/* <strong style={orderDetailsTitle}>Order Id :-</strong> {(data.oid) ? data.oid : '_'} <br /> */}
                        {/* <strong style={orderDetailsTitle}>User Name :-</strong> {(data.name) ? data.name : '_'} <br /> */}
                        {/* <strong style={orderDetailsTitle}>User Email :-</strong> {(data.email) ? data.email : '_'} <br /> */}
                        {/* <strong style={orderDetailsTitle}>User phone Number :-</strong> {(data.phone) ? data.phone : '_'} <br /> */}
                        {/* <strong style={orderDetailsTitle}>Transaction id :-</strong> {(data.otransaction_id) ? data.otransaction_id : '_'} <br /> */}
                        {/* <strong style={orderDetailsTitle}>Transaction status :-</strong> {(data.otransaction_status) ? data.otransaction_status : '_'} <br /> */}
                        {/* <strong style={orderDetailsTitle}>Billing address :-</strong><address style={{ display: "inline-flex" }}> {(data.oaddress) ?
                            data.oaddress.replaceAll("_", "\n")
                            : '_'}</address> <br /> */}
                        {/* <strong style={orderDetailsTitle}>Order notes :-</strong> {(data.order_notes) ? data.order_notes : '_'} <br />
                        <strong style={orderDetailsTitle}>Order Placed At :-</strong> {new Intl.DateTimeFormat("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit"
                        }).format(new Date(data.ocreated_at))}<br /> */}
                        {/* <strong style={orderDetailsTitle}>Order Total :-</strong> ${(data.ototal) ? data.ototal : '_'} <br /> */}
                    </span>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-6">
                    <div className="checkout__order m-3">
                        {/* <h4>Order Summery</h4> */}
                        {/* <div className="checkout__order__products">Products <span className="ml-5">Total</span> <span className="ml-5"> Quantity</span> <span> Variants</span></div>
                        <ul>
                            {orderProductsList = data.orderItemList,
                                orderProductsList.length > 0 ?
                                    orderProductsList.map((orderProduct) => {
                                        return (
                                            <>
                                                <li className="m-2"><img src={orderProduct.product_image ? helper.ProductImgPath + orderProduct.product_image : helper.noImgPath} alt="Product Image" style={{ width: "100px !important", marginRight: "7px", objectFit: "cover", height: "70px" }} />{orderProduct.product_name} <span className="ml-5">${orderProduct.total_price}</span><span className="mr-3 ml-5">{orderProduct.quantity}</span><span>
                                                    {
                                                        orderProduct.variantData &&
                                                        JSON.parse(orderProduct.variantData).map((variant, i) => {
                                                            return (
                                                                <>
                                                                    <strong>{variant.varientName.toUpperCase()} </strong>: <span style={{ color: "brown" }}> {variant.varientValue.toUpperCase()}</span><br />
                                                                </>
                                                            )
                                                        })
                                                    }

                                                </span>
                                                </li>
                                                <hr />
                                            </>
                                        )
                                    })
                                    :
                                    <h2 style={{ textAlign: "center" }}> NO Product Found</h2>
                            }
                        </ul> */}
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col" colspan="2" style={{textAlign:"center",color:"black"}}>Products</th>
                                    <th scope="col" style={{color:"black"}}>Variants</th>
                                    <th scope="col" style={{color:"black"}}>Quantity</th>
                                    <th scope="col" style={{color:"black"}}>Total</th>
                                </tr>
                            </thead>
                            <tbody>

                                {orderProductsList = data.orderItemList,
                                    orderProductsList.length > 0 ?
                                        orderProductsList.map((orderProduct) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <th><img src={orderProduct.product_image ? helper.ProductImgPath + orderProduct.product_image : helper.noImgPath} alt="Product Image" style={{ width: "100px !important", marginRight: "7px", objectFit: "cover", height: "50px" }} /></th>
                                                        <td scope="row" style={{verticalAlign:"unset !important"}}>
                                                           <strong>{orderProduct.product_name}</strong>
                                                        </td>
                                                        <td>  {
                                                            orderProduct.variantData &&
                                                            JSON.parse(orderProduct.variantData).map((variant, i) => {
                                                                return (
                                                                    <>
                                                                        <strong style={{color:"black"}}>{variant.varientName.toUpperCase()} </strong>: <span style={{ color: "brown" }}> {variant.varientValue}</span><br />
                                                                    </>
                                                                )
                                                            })
                                                        }</td>
                                                        <td>{orderProduct.quantity}</td>
                                                        <td>${orderProduct.total_price}</td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                        :
                                        <h2 style={{ textAlign: "center" }}> NO Product Found</h2>
                                }
                            </tbody>
                        </table>
                        <hr/>
                        <div className="checkout__order__total" style={{ borderBottom: "0px", marginBottom: "0px" }}>Sub Total <span style={{ color: "black" }}>${data.osubtotal}</span></div>
                        <div className="checkout__order__total" style={{ borderBottom: "0px", marginBottom: "0px" }}>Discount
                            {/* <b style={{color:"brown"}}> */}
                            {
                                data.appliedCouponCode &&
                                <b style={{ color: "brown" }}> ( {data.appliedCouponCode.toUpperCase()} ) </b>
                            }

                            <span style={{ color: "black" }}>{data.orderDetailsTitle ? (data.orderDetailsTitle) : ''} - ${data.odiscount}</span></div>
                        <div className="checkout__order__total">Tax <span style={{ color: "black" }}>+ ${data.otax}</span></div>
                        <div className="checkout__order__total" style={{ borderBottom: "0px", marginBottom: "0px" }}>Total <span>${data.ototal}</span></div>
                    </div>
                </div>
            </div>


        </>;
    };
    const data = [];
    if (props.orderList && props.orderList.length > 0) {
        props.orderList.map((order) => {
            data.push(order);
        }
        )
    }
    const tableData = {
        columns,
        data,
        export: false,
        print: false
    };
    return (
        // <>
        <div className="wrapper">
            <Sidebar expand={props.expand} />
            <div className="main">
                <Navbar setExpand={props.setExpand} expand={props.expand} />
                <main className="content">
                    <div className="container-fluid">

                        {/* // */}

                        <div className="header">
                            <h1 className="header-title">
                                Users Order
                            </h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/home">Dashboard</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Orders</li>
                                </ol>
                            </nav>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <div className="card-actions float-right">
                                    <span href="#" className="mr-1 mx-2" onClick={() => props.setUpdate(!props.update)} style={{ cursor: "pointer" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw align-middle"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                    </span>
                                    <div className="d-inline-block dropdown show"></div>
                                    {/* <button className="btn btn-primary" onClick={() => props.onOpenModal()}><i className="fas fa-fw fa-user-plus"></i> Add User</button> */}
                                </div>
                                <h5 className="card-title">Order List</h5>

                            </div>
                            {/* </div> */}
                            <div className="card-body">
                                <div className="card-body main">

                                    <DataTableExtensions {...tableData}>
                                        <DataTable

                                            columns={columns}
                                            data={data}
                                            noHeader
                                            defaultSortField="id"
                                            defaultSortAsc={false}
                                            pagination
                                            highlightOnHover
                                            expandableRows
                                            expandableRowsComponent={ExpandedComponent}
                                        />
                                    </DataTableExtensions>
                                </div>

                            </div>
                        </div>
                        {/* // */}
                    </div>
                </main>
                <Footer />
            </div>
        </div>

        // </>
    )
}
export default Index