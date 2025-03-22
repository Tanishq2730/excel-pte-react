import React, { useState, useEffect } from "react";
import Table from "../../core/common/dataTable/index"; // Custom Table component
import {
  fetchAllClasses,
  createClass,
  updateClass,
  deleteClass,
} from "../../api/masterAPI";
import AlertComponent from "../../core/common/AlertComponent";

interface ClassData {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
  link: string;
}

const UpComingClass: React.FC = () => {
  const [formData, setFormData] = useState<ClassData>({
    id: 0,
    title: "",
    date: "",
    time: "",
    type: "",
    link: "",
  });

  const [classes, setClasses] = useState<ClassData[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ✅ Fetch Classes on Mount
  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const response = await fetchAllClasses();
      if (response.success) {
        setClasses(response.data);
      } else {
        setError("Failed to fetch classes.");
      }
    } catch (error) {
      setError("Error fetching classes.");
    }
  };

  // ✅ Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time || !formData.type || !formData.link) {
      setError("All fields are required!");
      return;
    }

    try {
      let response;
      if (editId !== null) {
        response = await updateClass(editId, formData);
      } else {
        response = await createClass(formData);
      }

      if (response.success) {
        setSuccess(editId !== null ? "Class updated successfully!" : "Class added successfully!");
        loadClasses(); // Refresh data
        setFormData({ id: 0, title: "", date: "", time: "", type: "", link: "" });
        setEditId(null);
      } else {
        setError("Failed to save class.");
      }
    } catch (error) {
      setError("Error saving class.");
    }
  };

  // ✅ Handle Edit
  const handleEdit = (id: number) => {
    const classItem = classes.find((item) => item.id === id);
    if (classItem) {
      setFormData(classItem);
      setEditId(id);
    }
  };

  // ✅ Handle Delete
  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  // ✅ Confirm Delete
  const handleDeleteConfirm = async () => {
    if (deleteId !== null) {
      try {
        const response = await deleteClass(deleteId);
        if (response.success) {
          setSuccess("Class deleted successfully!");
          loadClasses(); // Refresh data
        } else {
          setError("Failed to delete class.");
        }
      } catch (error) {
        setError("Error deleting class.");
      }
      setDeleteId(null);
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Date", dataIndex: "date" },
    { title: "Time", dataIndex: "time" },
    { title: "Type", dataIndex: "type" },
    { title: "Link", dataIndex: "link" },
    {
      title: "Actions",
      render: (row: ClassData) => (
        <div>
          <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(row.id)}>
            <i className="fa fa-pencil"></i>
          </button>
          <button className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => handleDelete(row.id)}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>

      {/* ✅ Delete Modal */}
      <div id="deleteModal" className="modal fade" tabIndex={-1} aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="deleteModalLabel">Confirm Delete</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body py-5 text-center">
              <i className="fa fa-trash text-danger" style={{ fontSize: "2rem", marginBottom: "1em" }} />
              <p>Are you sure you want to delete this class?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeleteConfirm}>Delete</button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Form and Table */}
      <div className="page-wrapper">
        <div className="content">
          <div className="heading mb-4">
            <h2>Add Upcoming Classes</h2>
          </div>
          <div className="card p-4 mt-4">
            {/* ✅ Alerts */}
            {error && <AlertComponent type="danger" message={error} onClose={() => setError(null)} />}
            {success && <AlertComponent type="success" message={success} onClose={() => setSuccess(null)} />}
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Date</label>
                  <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Time</label>
                  <input type="time" className="form-control" name="time" value={formData.time} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Type</label>
                  <input type="text" className="form-control" name="type" value={formData.type} onChange={handleChange} required />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Link</label>
                <input type="url" className="form-control" name="link" value={formData.link} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-info text-white">{editId !== null ? "Update" : "Submit"}</button>
            </form>

            {/* ✅ Table */}
            <div className="mt-4">
              <Table key={classes.length} dataSource={classes} columns={columns} Selection={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpComingClass;
