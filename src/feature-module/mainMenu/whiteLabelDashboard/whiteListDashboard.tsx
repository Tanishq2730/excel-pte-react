import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import Table from "../../../core/common/dataTable/index";

const dummyData = [
    {
        key: 1,
        username: "JohnDoe",
        instituteCode: "INST1234",
        contactPerson: "John Doe",
        email: "john.doe@example.com",
        phoneNumber: "923583958923",
    },
    {
        key: 2,
        username: "JaneSmith",
        instituteCode: "INST5678",
        contactPerson: "Jane Smith",
        email: "jane.smith@example.com",
        phoneNumber: "923583958923",
    },
    {
        key: 3,
        username: "RobertBrown",
        instituteCode: "INST9101",
        contactPerson: "Robert Brown",
        email: "robert.brown@example.com",
        phoneNumber: "923583958923",
    },
];

const WhiteListDashboard = () => {
    const routes = all_routes;
    const data = dummyData;

    const columns = [
        {
            title: "Username",
            dataIndex: "username",
            render: (text: string) => (
                <Link to={routes.whiteLabelDashboard}>{text}</Link>
            ),
        },
        {
            title: "Institute Code",
            dataIndex: "instituteCode",
        },
        {
            title: "Contact Person",
            dataIndex: "contactPerson",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
        },
    ];

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
                    <div className="my-auto mb-2">
                        <h3 className="page-title mb-1">Institute List</h3>
                        <nav>
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item">
                                    <Link to={routes.adminDashboard}>Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item">Students</li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    All Students
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body p-0 py-3">
                        <Table dataSource={data} columns={columns} Selection={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhiteListDashboard;
