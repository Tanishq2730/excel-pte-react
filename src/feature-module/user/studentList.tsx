import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
// import { TableData } from "../../../../core/data/interface";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import StudentModals from "./studentModel";
import Table from "../../core/common/dataTable/index";
import PredefinedDateRanges from "../../core/common/datePicker";
import {
  allClass,
  allSection,
  gender,
  names,
  status,
} from "../../core/common/selectoption/selectoption";
import CommonSelect from "../../core/common/commonSelect";
import TooltipOption from "../../core/common/tooltipOption";

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
    subscription:"free "
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
    subscription:"free "
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
    subscription:"free "
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
    subscription:"free "
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
    subscription:"free "
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
    subscription:"free "
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
    subscription:"free "
  },
];

const StudentList: React.FC = () => {
  const routes = all_routes;
  const data = dummyData;
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
          <Link to="#" className="avatar avatar-md">
            <ImageWithBasePath
              src={record.imgSrc}
              className="img-fluid rounded-circle"
              alt="img"
            />
          </Link>
          <div className="ms-2">
            <p className="text-dark mb-0">
              <Link to="#">{text}</Link>
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
          className={`badge ${
            text === "Active" ? "badge-soft-success" : "badge-soft-danger"
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
                    to="student-details"
                  >
                    <i className="ti ti-menu me-2" />
                    Assign Course
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item rounded-1"
                    to="student-details"
                  >
                    <i className="ti ti-menu me-2" />
                    View Student
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item rounded-1"
                    to="student-details"
                  >
                    <i className="ti ti-menu me-2" />
                    Mock Activity
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item rounded-1"
                    to="student-details"
                  >
                    <i className="ti ti-menu me-2" />
                    Activity
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item rounded-1"
                    to={routes.editStudent}
                  >
                    <i className="ti ti-edit-circle me-2" />
                    Edit
                  </Link>
                </li>
                {/* <li>
                  <Link
                    className="dropdown-item rounded-1"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#login_detail"
                  >
                    <i className="ti ti-lock me-2" />
                    Login Details
                  </Link>
                </li> */}
                {/* <li>
                  <Link className="dropdown-item rounded-1" to="#">
                    <i className="ti ti-toggle-right me-2" />
                    Disable
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    className="dropdown-item rounded-1"
                    to="student-promotion"
                  >
                    <i className="ti ti-arrow-ramp-right-2 me-2" />
                    Promote Student
                  </Link>
                </li> */}
                <li>
                  <Link
                    className="dropdown-item rounded-1"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete-modal"
                  >
                    <i className="ti ti-trash-x me-2" />
                    Delete
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
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
              <TooltipOption />

              <div className="mb-2">
                <Link
                  to={routes.addStudents}
                  className="btn btn-primary d-flex align-items-center"
                >
                  <i className="ti ti-square-rounded-plus me-2" />
                  Add Student
                </Link>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Students List */}
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
              <h4 className="mb-3">Students List</h4>
              <div className="d-flex align-items-center flex-wrap">
                <div className="input-icon-start mb-3 me-2 position-relative">
                  <PredefinedDateRanges />
                </div>
                <div className="dropdown mb-3 me-2">
                  <Link
                    to="#"
                    className="btn btn-outline-light bg-white dropdown-toggle"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    <i className="ti ti-filter me-2" />
                    Filter
                  </Link>
                  <div
                    className="dropdown-menu drop-width"
                    ref={dropdownMenuRef}
                  >
                    <form>
                      <div className="d-flex align-items-center border-bottom p-3">
                        <h4>Filter</h4>
                      </div>
                      <div className="p-3 pb-0 border-bottom">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Subscription</label>
                              <CommonSelect
                                className="select"
                                options={allClass}
                                defaultValue={allClass[0]}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Status</label>
                              <CommonSelect
                                className="select"
                                options={status}
                                defaultValue={status[0]}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 d-flex align-items-center justify-content-end">
                        <Link to="#" className="btn btn-light me-3">
                          Reset
                        </Link>
                        <Link
                          to={routes.studentGrid}
                          className="btn btn-primary"
                          onClick={handleApplyClick}
                        >
                          Apply
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="d-flex align-items-center bg-white border rounded-2 p-1 mb-3 me-2">
                  <Link
                    to={routes.studentList}
                    className="active btn btn-icon btn-sm me-1 primary-hover"
                  >
                    <i className="ti ti-list-tree" />
                  </Link>
                  <Link
                    to={routes.studentGrid}
                    className="btn btn-icon btn-sm bg-light primary-hover"
                  >
                    <i className="ti ti-grid-dots" />
                  </Link>
                </div>
                <div className="dropdown mb-3">
                  <Link
                    to="#"
                    className="btn btn-outline-light bg-white dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="ti ti-sort-ascending-2 me-2" />
                    Sort by A-Z
                  </Link>
                  <ul className="dropdown-menu p-3">
                    <li>
                      <Link to="#" className="dropdown-item rounded-1 active">
                        Ascending
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Descending
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Recently Viewed
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Recently Added
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body p-0 py-3">
              <Table dataSource={data} columns={columns} Selection={true} />
            </div>
          </div>
        </div>
      </div>
      <StudentModals />
    </>
  );
};

export default StudentList;
