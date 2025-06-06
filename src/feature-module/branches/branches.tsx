// Branches.tsx
import React, { useEffect, useState } from "react";
import Table from "../../core/common/dataTable/index";
import {
  createBranch,
  fetchAllBranchs,
  deleteBranchs,
  updateBranchs,
  fetcBranchById,
} from "../../api/masterAPI";
import AlertComponent from "../../core/common/AlertComponent";

interface BranchFormData {
  branch_name: string;
}

interface BranchRow {
  id: number;
  branch_name: string;
  createdAt: string;
}

const Branches: React.FC = () => {
  const [formData, setFormData] = useState<BranchFormData>({ branch_name: "" });
  const [branches, setBranches] = useState<BranchRow[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    getBranches();
  }, []);

  const getBranches = async () => {
    try {
      const res = await fetchAllBranchs();
      if (res.success) {
        console.log(res.data);
        
        setBranches(res.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (isEditMode && editId !== null) {
        response = await updateBranchs(editId, formData);
      } else {
        response = await createBranch(formData);
      }

      if (response.success) {
        setSuccess(response.message || (isEditMode ? "Branch updated successfully." : "Branch created successfully."));
        setError(null);
        resetForm();
        getBranches();
      } else {
        setError(response.message || response.error || "Failed to save branch.");
        setSuccess(null);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setSuccess(null);
    }
  };

  const handleEditBranch = async (id: number) => {
    try {
      const res = await fetcBranchById(id);
      if (res.success) {
        const data = res.data;
        setFormData({ branch_name: data.branch_name });
        setEditId(data.id);
        setIsEditMode(true);
      }
    } catch (err) {
      console.error("Edit fetch error:", err);
    }
  };

  const handleDeleteBranch = async (id: number) => {
    try {
      const res = await deleteBranchs(id);
      if (res.success) {
        setSuccess(res.message || "Branch deleted successfully.");
        setError(null);
        getBranches();
      } else {
        setError(res.message || res.error || "Failed to delete branch.");
        setSuccess(null);
      }
    } catch (err) {
      setError("An unexpected error occurred while deleting.");
      setSuccess(null);
    }
  };

  const resetForm = () => {
    setFormData({ branch_name: "" });
    setIsEditMode(false);
    setEditId(null);
  };

  const columns = [
    { title: "S.No", render: (_: any, __: BranchRow, index: number) => index + 1 },
    { title: "Branch Name", dataIndex: "branch_name" },
    {
      title: "Action",
      render: (_: any, record: BranchRow) => (
        <div>
          <button
            className="btn btn-info btn-sm me-2"
            onClick={() => handleEditBranch(record.id)}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDeleteBranch(record.id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      {error && <AlertComponent type="danger" message={error} onClose={() => setError(null)} />}
      {success && <AlertComponent type="success" message={success} onClose={() => setSuccess(null)} />}

      <div className="content">
        <h2 className="mb-4">{isEditMode ? "Edit Branch" : "Create Branch"}</h2>
        <form onSubmit={handleSubmit} className="card p-4">
          <div className="row">
            <div className="col-md-6">
              <label>Branch Name *</label>
              <input
                type="text"
                name="branch_name"
                value={formData.branch_name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <button className="btn btn-primary mt-4" type="submit">
            {isEditMode ? "Update" : "Create"}
          </button>
        </form>

        <div className="mt-4">
          <Table key={branches.length} dataSource={branches} columns={columns} Selection={false} />
        </div>
      </div>
    </div>
  );
};

export default Branches;