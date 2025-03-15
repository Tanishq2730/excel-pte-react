import React, { useState } from "react";
import Table from "../../core/common/dataTable/index"; // Custom Table component

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

  const [recordings, setRecordings] = useState<ClassData[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editId !== null) {
      // Edit existing record
      setRecordings((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...formData, id: editId } : item
        )
      );
      setEditId(null);
    } else {
      // Add new record
      const newData = { ...formData, id: recordings.length + 1 };
      setRecordings([...recordings, newData]);
    }

    // Reset form
    setFormData({ id: 0, title: "", date: "", time: "", type: "", link: "" });
  };

  // Handle edit
  const handleEdit = (id: number) => {
    const record = recordings.find((item) => item.id === id);
    if (record) {
      setFormData(record);
      setEditId(id);
    }
  };

  // Handle delete
  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  // Confirm delete from modal
  const handleDeleteConfirm = () => {
    if (deleteId !== null) {
      setRecordings((prev) => prev.filter((item) => item.id !== deleteId));
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
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => handleEdit(row.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Modal */}
      <div
        id="deleteModal"
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="deleteModalLabel">
                Confirm Delete
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body py-5 text-center">
              <i
                className="fa fa-trash"
                style={{ color: "red", fontSize: "2rem", marginBottom: "1em" }}
              />
              <p>Are you sure you want to delete this recording?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary mr-5"
                data-bs-dismiss="modal"
                style={{marginRight:'1em'}}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form and Table */}
      <div className="page-wrapper">
        <div className="content">
          <div className="heading mb-4">
            <h2>Add Upcoming Classes</h2>
          </div>
          <div className="card p-4 mt-4">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                {/* Title */}
                <div className="col-md-6">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Date */}
                <div className="col-md-6">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                {/* Time */}
                <div className="col-md-6">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Type */}
                <div className="col-md-6">
                  <label className="form-label">Type</label>
                  <input
                    type="text"
                    className="form-control"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Link */}
              <div className="mb-3">
                <label className="form-label">Link</label>
                <input
                  type="url"
                  className="form-control"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-info text-white">
                {editId !== null ? "Update" : "Submit"}
              </button>
            </form>

            {/* Table */}
            <div className="mt-4">
              <Table
                key={recordings.length}
                dataSource={recordings}
                columns={columns}
                Selection={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpComingClass;
