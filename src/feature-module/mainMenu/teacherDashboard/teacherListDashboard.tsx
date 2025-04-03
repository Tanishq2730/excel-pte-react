import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import Table from "../../../core/common/dataTable/index";

const dummyData = [
    {
        key: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        mobile: "923583958923",
        lastLogin: "2005-06-10 , 4:40",
        imgSrc: "assets/img/students/student-01.jpg",
    },
    {
        key: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        mobile: "923583958923",
        lastLogin: "2005-06-10 , 4:40",
        imgSrc: "assets/img/students/student-02.jpg",
    },
    {
        key: 3,
        name: "Robert Brown",
        email: "robert.brown@example.com",
        mobile: "923583958923",
        lastLogin: "2005-06-10 , 4:40",
        imgSrc: "assets/img/students/student-03.jpg",
    },
];

const TeacherListDashboard = () => {
    const routes = all_routes;
    const data = dummyData;

    const columns: {
        title: string;
        dataIndex: keyof typeof dummyData[0];
        render?: (text: string, record: (typeof dummyData)[0]) => JSX.Element;
    }[] = [
            {
                title: "Name",
                dataIndex: "name",
                render: (text: string, record: (typeof dummyData)[0]) => (
                    <div className="d-flex align-items-center">
                        <Link to={routes.teacherDashboard} className="avatar avatar-md">
                            <ImageWithBasePath src={record.imgSrc} className="img-fluid rounded-circle" alt="img" />
                        </Link>
                        <div className="ms-2">
                            <p className="text-dark mb-0">
                                <Link to={routes.teacherDashboard}>{text}</Link>
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                title: "Email",
                dataIndex: "email",
            },
            {
                title: "Mobile",
                dataIndex: "mobile",
            },
            {
                title: "Last Login",
                dataIndex: "lastLogin",
            },
        ];


    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
                    <div className="my-auto mb-2">
                        <h3 className="page-title mb-1">Teacher List</h3>
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

export default TeacherListDashboard;
