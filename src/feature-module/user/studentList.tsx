import React, { useState, useRef,useEffect } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
// import { TableData } from "../../../../core/data/interface";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import StudentModals from "./studentModel";
import Table from "../../core/common/dataTable/index";
import PredefinedDateRanges from "../../core/common/datePicker";
import { fetchAllStudents,assignPlan } from "../../api/masterAPI";
import AlertComponent from "../../core/common/AlertComponent";
import { image_url } from "../../environment";
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
  id: number;
  name: string;
  email: string;
  mobileNo: string;
  profile_image: string;
  status: string;
  State: { id: number; name: string }; 
  Country: { id: number; name: string };
  first_login:boolean
}

const StudentList: React.FC = () => {
  const routes = all_routes;
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState<TableData[]>([]);
  const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null); 
  
    const loadStudents = async () => {
      try {
        const response = await fetchAllStudents();
        if (response.success) {
          setStudents(response.data); // ✅ Set API data
        } else {
          setAlert({ type: "danger", message: "Failed to fetch students" });
        }
      } catch (error) {
        setAlert({ type: "danger", message: "An error occurred while fetching students" });
      }
    };

    useEffect(() => {
      loadStudents();
    }, []);

  const handleApplyClick = () => {
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.classList.remove("show");
    }
  };

  console.log(students, "students");
  
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string, record: TableData) => (
        <div className="d-flex align-items-center">
          <Link to="#" className="avatar avatar-md">
            <ImageWithBasePath
              src={`${image_url}${record.profile_image}`}
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
      )
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Mobile",
      dataIndex: "mobileNo"
    },
    {
      title: "Country Name",
      render: (row: TableData) => row.Country?.name || "-"
    },    
    {
      title: "State",
      render: (row: TableData) => row.State?.name || "-"
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <span
          className={`badge ${text === "active" ? "badge-soft-success" : "badge-soft-danger"
            } d-inline-flex align-items-center`}
        >
          <i className="ti ti-circle-filled fs-5 me-1"></i>
          {text}
        </span>
      )
    },
    {
      title: "Last Login",
      dataIndex: "first_login"
    },
    {
      title: "Action",
      render: (row: TableData) => (
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
                <Link
                  className="dropdown-item rounded-1"
                  to={routes.assignCourse}
                  state={{ studentData: row }}
                >
                  <i className="ti ti-menu me-2" />
                  Assign Course
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item rounded-1"
                  to={routes.studentDashboard}
                >
                  <i className="ti ti-menu me-2" />
                  View Student
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item rounded-1"
                  to={routes.mockActivity}
                >
                  <i className="ti ti-menu me-2" />
                  Mock Activity
                </Link>
              </li>
              <li>
                <button
                  className="dropdown-item rounded-1"
                  onClick={() => setShowModal(true)}
                >
                  <i className="ti ti-menu me-2" />
                  Activity
                </button>
              </li>
              <li>
                <Link
                  className="dropdown-item rounded-1"
                  to={routes.studentEdit}
                >
                  <i className="ti ti-edit-circle me-2" />
                  Edit
                </Link>
              </li>
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
      {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
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
              <Table  key={students.length} dataSource={students} columns={columns} Selection={true} />
            </div>
          </div>
        </div>
      </div>
      <StudentModals />
      <div
      className={`modal fade ${showModal ? "show d-block" : ""}`}
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Activity</h5>
            <button
              type="button"
              className="close"
              onClick={() => setShowModal(false)}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-around text-center p-3">
              <div className="border rounded p-3">
                <h4>0</h4>
                <p>Today Practiced</p>
              </div>
              <div className="border rounded p-3">
                <h4>38</h4>
                <p>Total Practiced</p>
              </div>
              <div className="border rounded p-3">
                <h4>3</h4>
                <p>Practiced Days</p>
              </div>
            </div>
            <div className="mt-4">
              {[{
                date: "2025-02-21",
                activity: "Re-order paragraphs",
                practiced: "1 Qs"
              }, {
                date: "2025-02-20",
                activity: "Re-order paragraphs",
                practiced: "2 Qs"
              }, {
                date: "2025-02-13",
                activity: "Highlight incorrect words",
                practiced: "1 Qs"
              }, {
                date: "2025-02-12",
                activity: "Reading and writing–Fill in the blanks",
                practiced: "1 Qs"
              }].map((item, index) => (
                <div key={index} className="border rounded mb-2 p-2 bg-light">
                  <div className="d-flex justify-content-between p-2 bg-secondary text-white rounded">
                    <strong>{item.date}</strong>
                    <span>Total Practiced: {item.practiced}</span>
                  </div>
                  <div className="p-2 d-flex justify-content-between text-dark rounded">
                    <p className="mb-0">{item.activity}</p>
                    <span>Practiced: {item.practiced}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default StudentList;
