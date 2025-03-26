import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../../core/common/dataTable/index";
import AlertComponent from "../../core/common/AlertComponent";
import { all_routes } from "../router/all_routes";
import { fetchAllRoles, createRoles, updateRoles, deleteRoles } from "../../api/masterAPI";
import TooltipOption from "../../core/common/tooltipOption";

const RolesPermissions = () => {
  const routes = all_routes;
  const [roles, setRoles] = useState<{ id: number; name: string; createdAt: string }[]>([]);
  const [roleName, setRoleName] = useState(""); // For adding/editing roles
  const [editRoleId, setEditRoleId] = useState<number | null>(null); // Role ID for editing
  const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);

  // ✅ Fetch roles on component mount
  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const response = await fetchAllRoles();
      if (response.success) {
        setRoles(response.data);
      } else {
        setAlert({ type: "danger", message: "Failed to fetch roles" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "An error occurred while fetching roles" });
    }
  };

  // ✅ Add a new role
  const handleAddRole = async () => {
    if (!roleName.trim()) {
      setAlert({ type: "danger", message: "Role name cannot be empty" });
      return;
    }

    const response = await createRoles({ name: roleName });

    if (!response.success) {
      if (response.errors) {
        setAlert({ type: "danger", message: response.errors.join(", ") }); // ✅ Show all validation errors
      } else {
        setAlert({ type: "danger", message: response.error || "Failed to add user" });
      }
      return;
    }
    setAlert({ type: "success", message: "Role added successfully!" });  
    setRoleName(""); // Clear input
    loadRoles();
  };

  // ✅ Edit an existing role
  const handleEditRole = async () => {
    if (!editRoleId || !roleName.trim()) {
      setAlert({ type: "danger", message: "Invalid role name or ID" });
      return;
    }

    const response = await updateRoles(editRoleId, { name: roleName });
    if (!response.success) {
      if (response.errors) {
        setAlert({ type: "danger", message: response.errors.join(", ") }); // ✅ Show all validation errors
      } else {
        setAlert({ type: "danger", message: response.error || "Failed to add user" });
      }
      return;
    }
    setAlert({ type: "success", message: "Role Update successfully!" });  
    setRoleName(""); // Clear input
    loadRoles();
    setEditRoleId(null);   
  };

  // ✅ Delete a role with confirmation
  const handleDeleteRole = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteRoles(id);
        if (response.success) {
          setAlert({ type: "success", message: "Role deleted successfully!" });
          loadRoles();
        } else {
          setAlert({ type: "danger", message: response.message || "Failed to delete role" });
        }
      }
    });
  };

  const columns = [
    {
      title: "Role Name",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      sorter: (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: any) => (
        <div className="d-flex align-items-center">
          <Link
            to="#"
            className="btn btn-outline-light bg-white btn-icon d-flex align-items-center justify-content-center rounded-circle p-0 me-2"
            data-bs-toggle="modal"
            data-bs-target="#edit_role"
            onClick={() => {
              setEditRoleId(record.id);
              setRoleName(record.name);
            }}
          >
            <i className="ti ti-edit-circle text-primary" />
          </Link>
          <Link
            to={`${routes.permissions}?roleId=${record.id}`} // Pass roleId in the URL
            className="btn btn-outline-light bg-white btn-icon d-flex align-items-center justify-content-center rounded-circle p-0 me-2"
          >
            <i className="ti ti-shield text-skyblue" />
          </Link>
          <Link
            to="#"
            className="btn btn-outline-light bg-white btn-icon d-flex align-items-center justify-content-center rounded-circle p-0 me-3"
            onClick={() => handleDeleteRole(record.id)}
          >
            <i className="ti ti-trash-x text-danger" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      
      <div className="page-wrapper">
        <div className="content">
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="page-title mb-1">Roles & Permissions</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><Link to={routes.adminDashboard}>Dashboard</Link></li>
                  <li className="breadcrumb-item"><Link to="#">User Management</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Roles & Permissions</li>
                </ol>
              </nav>
            </div>
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
              {/* <TooltipOption /> */}
              <div className="mb-2">
                <Link to="#" className="btn btn-primary d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#add_role">
                  <i className="ti ti-square-rounded-plus me-2" />
                  Add Role
                </Link>
              </div>
            </div>
          </div>
          {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

          <div className="card">
            <div className="card-body p-0 py-3">
              <Table key={roles.length} columns={columns} dataSource={roles} Selection={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Add Role Modal */}
      <div className="modal fade" id="add_role">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Role</h4>
              <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <input type="text" className="form-control" placeholder="Role Name" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleAddRole} data-bs-dismiss="modal">Add Role</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Role Modal */}
      <div className="modal fade" id="edit_role">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Role</h4>
              <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <input type="text" className="form-control" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleEditRole} data-bs-dismiss="modal">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesPermissions;
