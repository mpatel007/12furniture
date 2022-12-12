import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import '../../../../asset/admin/css/custom.css'
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const Index = (props) => {

    const columns = [
        // { name: "Id", selector: "id", sortable: true },
        { name: "Name", selector: "name", sortable: true },
        { name: "Email", selector: "email", sortable: true },
        { name: "Phone", selector: "phone", sortable: true },
        {
            name: "Status",
            // selector: "status", sortable: true 
            cell: (row) => <>
                <span className={row.status == 1 ? "badge badge-success" : "badge badge-danger"}>{row.status == 1 ? 'Active' : 'InActive'}</span>
            </>,
            ignoreRowClick: true,
            allowOverflow: true,
        },

        {
            name: "Actions",
            cell: (row) => <> <button className="btn table-action" onClick={(e) => props.deleteUser(row.id)}><i className="align-middle fas fa-fw fa-trash"></i></button>
                <button className="btn table-action" onClick={() => props.editUser(row)} ><i className="align-middle fas fa-fw fa-pen"></i></button></>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    const data = [];
    if (props.userlist && props.userlist.length > 0) {
        props.userlist.map((user) => {
            data.push(user);
        }
        )
    }
    const tableData = {
        columns,
        data,
        export: false,
        print: false
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

        const filename = 'user_export.csv';

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
                                User Management
                            </h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">User Management</li>
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
                                    <button className="btn btn-primary" onClick={() => props.onOpenModal()}><i className="fas fa-fw fa-user-plus"></i> Add User</button>
                                </div>
                                <h5 className="card-title">Users</h5>

                            </div>
                            {/* </div> */}
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

        // </>
    )
}
export default Index