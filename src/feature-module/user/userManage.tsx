import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Table from "../../core/common/dataTable/index";
// import { TableData } from "../../core/data/interface";
import PredefinedDateRanges from "../../core/common/datePicker";
import CommonSelect from "../../core/common/commonSelect";
import { Reason } from "../../core/common/selectoption/selectoption";
import { all_routes } from "../router/all_routes";
import TooltipOption from "../../core/common/tooltipOption";

interface TableData {
  key: number;
  name: string;
  email: string;
  mobile: string;
//   countryName: string;
  status: string;
//   state: string;
  // lastLogin: string;
  imgSrc: string;
  subscription: string;
}

const dummyData: TableData[] = [
  {
    key: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "923583958923",
    // countryName: "India",
    status: "Active",
    // state: "Delhi",
    // lastLogin: "2005-06-10 , 4:40",
    imgSrc: "assets/img/students/student-01.jpg",
    subscription: "Free",
  },
  {
    key: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    mobile: "923583958923",
    // countryName: "India",
    status: "Inactive",
    // state: "Rajasthan",
    // lastLogin: "2005-06-10 , 4:40",
    imgSrc: "assets/img/students/student-02.jpg",
    subscription: "Free",
  },
  {
    key: 3,
    name: "Robert Brown",
    email: "robert.brown@example.com",
    mobile: "923583958923",
    // countryName: "India",
    status: "Active",
    // state: "Delhi",
    // lastLogin: "2005-06-10 , 4:40",
    imgSrc: "assets/img/students/student-03.jpg",
    subscription: "Free",
  },
];

const UserManage = () => {
  const routes = all_routes;
  const data = dummyData;

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      render: (text: number, record: TableData) => (
        <Link to="#" className="link-primary">
          {record.key}
        </Link>
      ),
      sorter: (a: TableData, b: TableData) => a.key - b.key,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a: TableData, b: TableData) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: TableData, b: TableData) => a.email.length - b.email.length,
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      sorter: (a: TableData, b: TableData) => a.mobile.length - b.mobile.length,
    },
    // {
    //   title: "Country",
    //   dataIndex: "countryName",
    //   sorter: (a: TableData, b: TableData) =>
    //     a.countryName.length - b.countryName.length,
    // },
    // {
    //   title: "State",
    //   dataIndex: "state",
    //   sorter: (a: TableData, b: TableData) => a.state.length - b.state.length,
    // },
    // {
    //   title: "Last Login",
    //   dataIndex: "lastLogin",
    //   sorter: (a: TableData, b: TableData) => a.lastLogin.length - b.lastLogin.length,
    // },
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
      sorter: (a: TableData, b: TableData) => a.status.length - b.status.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div className="d-flex align-items-center">
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
                <Link className="dropdown-item rounded-1" to="#">
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

  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
  const handleApplyClick = () => {
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.classList.remove("show");
    }
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="page-title mb-1">Users</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={routes.adminDashboard}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">User Management</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Users
                  </li>
                </ol>
              </nav>
            </div>
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
              <TooltipOption />
              <div className="mb-2">
                <Link
                  to={routes.addUser}
                  className="btn btn-primary d-flex align-items-center"
                >
                  <i className="ti ti-square-rounded-plus me-2" />
                  Add User
                </Link>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
              <h4 className="mb-3">Users List</h4>
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
                      <div className="p-3 border-bottom">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-0">
                              <label className="form-label">Users</label>
                              <CommonSelect
                                className="select"
                                options={Reason}
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
                          to="#"
                          className="btn btn-primary"
                          onClick={handleApplyClick}
                        >
                          Apply
                        </Link>
                      </div>
                    </form>
                  </div>
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
                  </ul>
                </div>
              </div>
            </div>

            <div className="card-body p-0 py-3">
              <Table columns={columns} dataSource={data} Selection={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManage;
