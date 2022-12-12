import React from 'react';
import { Link } from "react-router-dom"
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import '../../../../asset/admin/css/custom.css';
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import moment from 'moment';

const Coupon = (props) => {

    const columns = [
        // { name: "Id", selector: "id", sortable: true },
        { name: "Coupon Code", selector: "couponCode", sortable: true },
        {
            name: "Expiry Date",
            cell: (row) => <>
                <span>{moment(row.expiryDate).format('DD MMMM YYYY')}</span>
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
            sortable: true
        },
        { name: "Number Of Coupon", selector: "numberOfCoupon", sortable: true },
        { name: "Discount Type", selector: "discountType", sortable: true },
        { name: "Discount Rate", selector: "discountRate", sortable: true },
        { name: "Above Price", selector: "abovePrice", sortable: true },
        {
            name: "Status",
            cell: (row) => <>
                <span className={row.status == 1 ? "badge badge-success" : "badge badge-danger"}>{row.status == 1 ? 'Active' : 'InActive'}</span>
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: "Actions",
            cell: (row) => <>
                <button className="btn table-action" onClick={(e) => props.deleteCoupon(row.id)}><i className="align-middle fas fa-fw fa-trash"></i></button>
                <button className="btn table-action" onClick={() => props.editCoupon(row)}><i className="align-middle fas fa-fw fa-pen"></i></button>
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    const data = [];

    if (props.coupon && props.coupon.length > 0) {
        props.coupon.map((couponval) => {
            data.push(couponval);
        },
        );
    };

    const tableData = {
        columns,
        data,
        export: false,
        print: false,
    };

    function convertArrayOfObjectsToCSV(ary) {
        let result;

        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(ary[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        ary.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;

                if (key == "status") {
                    result += item[key] == 1 ? "Active" : "InActive";
                } else {
                    result += item[key];
                }

                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
    function downloadCSV(ary) {
        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(ary);
        if (csv == null) return;

        const filename = 'coupon_export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;

        }

        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();

    }

    // const Export = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export</Button>;
    const Export = ({ onExport }) => <button className="btn table-action btn-secondary" onClick={e => onExport(e.target.value)}><i class="fas fa-file-export"></i> Export</button>;

    const actionsMemo = React.useMemo(() => <Export onExport={async () => downloadCSV(data)} />, [data]);

    return (
        <>
            <div className="wrapper">
                <Sidebar expand={props.expand} />
                <div className="main">
                    <Navbar setExpand={props.setExpand} expand={props.expand} />
                    <main className="content">
                        <div className="container-fluid">

                            {/* // */}

                            <div className="header">
                                <h1 className="header-title">
                                    Coupon
                                </h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Coupon</li>
                                    </ol>
                                </nav>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex justify-content-between">
                                        <h5 className="card-title">Coupons</h5>
                                        <button className="btn btn-primary" onClick={() => props.onOpenModal()}><i className="fas fa-fw fa-plus"></i> Add Coupon</button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="card-body main">
                                        <DataTableExtensions {...tableData}>
                                            <DataTable
                                                columns={columns}
                                                data={data}
                                                // noHeader
                                                defaultSortField="id"
                                                defaultSortAsc={false}
                                                pagination
                                                highlightOnHover
                                                actions={actionsMemo}
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
        </>
    );

};

export default Coupon;

