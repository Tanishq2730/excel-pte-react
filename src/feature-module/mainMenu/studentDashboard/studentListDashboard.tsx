import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
// import { TableData } from "../../../../core/data/interface";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
// import StudentModals from "./studentModel";
import Table from "../../../core/common/dataTable/index";
import PredefinedDateRanges from "../../../core/common/datePicker";

import {
  allClass,
  allSection,
  gender,
  names,
  status,
} from "../../../core/common/selectoption/selectoption";
import CommonSelect from "../../../core/common/commonSelect";
import TooltipOption from "../../../core/common/tooltipOption";

interface TableData {
  key: number;
  name: string;
  email: string;
  mobile: string;
  countryName: string;
  status: string;
  state: string;
  lastLogin: string;
  imgSrc: string;
  subscription: string;
}

const dummyData: TableData[] = [
  {
    key: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "923583958923",
    countryName: "India",
    status: "Active",
    state: "delhi",
    lastLogin: "2005-06-10 , 4:40",
    imgSrc: "assets/img/students/student-01.jpg",
    subscription: "free "
  },
  {
    key: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    mobile: "923583958923",
    countryName: "India",
    status: "Inactive",
    state: "Rajasthan",
    lastLogin: "2005-06-10 , 4:40",
    imgSrc: "assets/img/students/student-02.jpg",
    subscription: "free "
  },
  {
    key: 3,
    name: "Robert Brown",
    email: "robert.brown@example.com",
    mobile: "923583958923",
    countryName: "India",
    status: "Active",
    state: "Delhi",
    lastLogin: "2005-06-10 , 4:40",
    imgSrc: "assets/img/students/student-03.jpg",
    subscription: "free "
  },
  {
    key: 4,
    name: "Robert Brown",
    email: "robert.brown@example.com",
    mobile: "923583958923",
    countryName: "India",
    status: "Active",
    state: "Delhi",
    lastLogin: "2005-06-10 , 4:40",
    imgSrc: "assets/img/students/student-03.jpg",
    subscription: "free "
  },
  {
    key: 5,
    name: "Robert Brown",
    email: "robert.brown@example.com",
    mobile: "923583958923",
    countryName: "India",
    status: "Active",
    state: "Delhi",
    lastLogin: "2005-06-10 , 4:40",
    imgSrc: "assets/img/students/student-03.jpg",
    subscription: "free "
  },
  {
    key: 6,
    name: "Robert Brown",
    email: "robert.brown@example.com",
    mobile: "923583958923",
    countryName: "India",
    status: "Active",
    state: "Delhi",
    lastLogin: "2005-06-10 , 4:40",
    imgSrc: "assets/img/students/student-03.jpg",
    subscription: "free "
  },
  {
    key: 7,
    name: "Robert Brown",
    email: "robert.brown@example.com",
    mobile: "923583958923",
    countryName: "India",
    status: "Active",
    state: "Delhi",
    lastLogin: "2005-06-10 , 4:40",
    imgSrc: "assets/img/students/student-03.jpg",
    subscription: "free "
  },
];

const StudentListDashboard: React.FC = () => {
  const routes = all_routes;
  const data = dummyData;
  const [showModal, setShowModal] = useState(false);
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  const handleApplyClick = () => {
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.classList.remove("show");
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string, record: TableData) => (
        <div className="d-flex align-items-center">
          <Link to={routes.studentDashboard} className="avatar avatar-md">
            <ImageWithBasePath
              src={record.imgSrc}
              className="img-fluid rounded-circle"
              alt="img"
            />
          </Link>
          <div className="ms-2">
            <p className="text-dark mb-0">
              <Link to={routes.studentDashboard}>{text}</Link>
            </p>
          </div>
        </div>
      ),
      sorter: (a: TableData, b: TableData) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: TableData, b: TableData) => a.email.localeCompare(b.email),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      sorter: (a: TableData, b: TableData) =>
        a.mobile.localeCompare(b.mobile),
    },
    {
      title: "Country Name",
      dataIndex: "countryName",
      sorter: (a: TableData, b: TableData) => a.countryName.localeCompare(b.countryName),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <span
          className={`badge ${text === "Active" ? "badge-soft-success" : "badge-soft-danger"
            } d-inline-flex align-items-center`}
        >
          <i className="ti ti-circle-filled fs-5 me-1"></i>
          {text}
        </span>
      ),
      sorter: (a: TableData, b: TableData) => a.status.localeCompare(b.status),
    },
    {
      title: "State",
      dataIndex: "state",
      sorter: (a: TableData, b: TableData) =>
        a.state.localeCompare(b.state),
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      sorter: (a: TableData, b: TableData) =>
        a.subscription.localeCompare(b.subscription),
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      sorter: (a: TableData, b: TableData) => a.lastLogin.localeCompare(b.lastLogin),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div className="d-flex align-items-center">
          {/* <Link
            to="#"
            className="btn btn-outline-light bg-white btn-icon d-flex align-items-center justify-content-center rounded-circle  p-0 me-2"
          >
            <i className="ti ti-brand-hipchat" />
          </Link>
          <Link
            to="#"
            className="btn btn-outline-light bg-white btn-icon d-flex align-items-center justify-content-center rounded-circle  p-0 me-2"
          >
            <i className="ti ti-phone" />
          </Link>
          <Link
            to="#"
            className="btn btn-outline-light bg-white btn-icon d-flex align-items-center justify-content-center rounded-circle p-0 me-3"
          >
            <i className="ti ti-mail" />
          </Link> */}
          <div className="dropdown">
            <Link
              to="#"
              className="btn btn-white btn-icon btn-sm d-flex align-items-center justify-content-center rounded-circle p-0"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="ti ti-dots-vertical fs-14" />
            </Link>
            <ul className="dropdown-menu dropdown-menu-right p-3">
              <li>
                <Link
                  className="dropdown-item rounded-1"
                  to={routes.studentDashboard}
                >
                  <i className="ti ti-menu me-2" />
                  Show Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="page-title mb-1">Students List</h3>
            </div>
          </div>
          <div className="card">
            <div className="card-body p-0 py-3">
              <Table dataSource={data} columns={columns} Selection={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentListDashboard;
