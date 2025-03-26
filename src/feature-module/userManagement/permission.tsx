import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PermissionDatatable from "../../core/common/dataTable/PermissionDatatable";
import { fetchPermissionRoles, assignPermissionsToRole } from "../../api/masterAPI";
import { all_routes } from "../router/all_routes";
import AlertComponent from "../../core/common/AlertComponent";

const Permissions = () => {
  const routes = all_routes;
  const [permissions, setPermissions] = useState<any[]>([]);
  const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]); // Store selected permission IDs

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roleId = queryParams.get("roleId"); // ✅ Extract roleId from query

  // ✅ Fetch permissions when roleId changes
  useEffect(() => {
    if (roleId) {
      loadPermissions(parseInt(roleId));
    }
  }, [roleId]);

  const loadPermissions = async (roleId: number) => {
    try {
      const response = await fetchPermissionRoles(roleId);
      if (response.success) {
        setPermissions(response.data);
        // ✅ Pre-select assigned permissions
        const assignedIds = response.data.flatMap((module: any) =>
          module.permissions.filter((perm: any) => perm.assigned).map((perm: any) => perm.id)
        );
        setSelectedPermissions(assignedIds);
      } else {
        setAlert({ type: "danger", message: "Failed to fetch permissions" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "An error occurred while fetching permissions." });
    }
  };

  // ✅ Handle checkbox selection
  const handleCheckboxChange = (permId: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(permId) ? prev.filter((id) => id !== permId) : [...prev, permId]
    );
  };

  // ✅ Handle Save Permissions
  const handleSavePermissions = async () => {
    if (!roleId) return;

    try {
      const response = await assignPermissionsToRole(parseInt(roleId), selectedPermissions);
      if (response.success) {
        setAlert({ type: "success", message: "Permissions assigned successfully!" });
      } else {
        setAlert({ type: "danger", message: "Failed to assign permissions" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "An error occurred while assigning permissions." });
    }
  };

  const columns = [
    {
      title: "Modules",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      render: (permissions: any[]) => (
        <div className="d-flex flex-wrap">
          {permissions.map((perm) => (
            <label className="checkboxs mx-4" key={perm.id}>
              <input
                type="checkbox"
                checked={selectedPermissions.includes(perm.id)}
                onChange={() => handleCheckboxChange(perm.id)}
              />
              <span className="checkmarks" /> {perm.show}
            </label>            
          ))}
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
          </div>
          {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

          <div className="card">
        
            <div className="card-body p-0 py-3">
              <PermissionDatatable key={permissions.length} columns={columns} dataSource={permissions} Selection={false} />
              {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
              <div className="text-end mt-2">
                <button type="submit" className="btn btn-info" onClick={handleSavePermissions}>
                  Save Permissions
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Permissions;
