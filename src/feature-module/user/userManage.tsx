import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // ✅ Import SweetAlert
import AlertComponent from "../../core/common/AlertComponent"; // ✅ Import AlertComponent
import Table from "../../core/common/dataTable/index";
import PredefinedDateRanges from "../../core/common/datePicker";
import CommonSelect from "../../core/common/commonSelect";
import { Reason } from "../../core/common/selectoption/selectoption";
import { all_routes } from "../router/all_routes";
import TooltipOption from "../../core/common/tooltipOption";
import { fetchAllUsers, deleteUsers } from "../../api/masterAPI"; // ✅ Import API functions

interface TableData {
  id: number;
  name: string;
  email: string;
  mobileNo: string;
  status: string;
  profile_image?: string;
}

const UserManage = () => {
  const routes = all_routes;
  const [users, setUsers] = useState<TableData[]>([]);
  const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  // ✅ Fetch users from API
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetchAllUsers();
      if (response.success) {
        setUsers(response.data); // ✅ Set API data
      } else {
        setAlert({ type: "danger", message: "Failed to fetch users" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "An error occurred while fetching users" });
    }
  };

  // ✅ SweetAlert Delete Confirmation
  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUsers(id);
          loadUsers(); // Refresh the user list
          setAlert({ type: "success", message: "User deleted successfully" });
        } catch (error) {
          setAlert({ type: "danger", message: "Failed to delete user" });
        }
      }
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text: number, record: TableData) => (
        <Link to="#" className="link-primary">{record.id}</Link>
      ),
      sorter: (a: TableData, b: TableData) => a.id - b.id,
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
      dataIndex: "mobileNo",
      sorter: (a: TableData, b: TableData) => a.mobileNo.length - b.mobileNo.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <span
          className={`badge ${
            text === "active" ? "badge-soft-success" : "badge-soft-danger"
          } d-inline-flex align-items-center`}
        >
          <i className="ti ti-circle-filled fs-5 me-1"></i>
          {text.charAt(0).toUpperCase() + text.slice(1)}
        </span>
      ),
      sorter: (a: TableData, b: TableData) => a.status.length - b.status.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: TableData) => (
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
                <button className="dropdown-item rounded-1" onClick={() => handleDelete(record.id)}>
                  <i className="ti ti-trash-x me-2" />
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

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
              {/* <TooltipOption /> */}
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
          {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
              <h4 className="mb-3">Users List</h4>
              <div className="d-flex align-items-center flex-wrap">
                {/* <div className="input-icon-start mb-3 me-2 position-relative">
                  <PredefinedDateRanges />
                </div> */}
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
                  <div className="dropdown-menu drop-width" ref={dropdownMenuRef}>
                    <form>
                      <div className="p-3 d-flex align-items-center justify-content-end">
                        <Link to="#" className="btn btn-light me-3">Reset</Link>
                        <Link to="#" className="btn btn-primary" onClick={handleApplyClick}>Apply</Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body p-0 py-3">
              <Table key={users.length} columns={columns} dataSource={users} Selection={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManage;
