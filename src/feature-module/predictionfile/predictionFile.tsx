import React, { useState } from "react";
import Table from "../../core/common/dataTable/index"; // ✅ Using the referenced table

interface PredictionData {
  id: number;
  title: string;
  coverFile: File | null;
  predictionFile: File | null;
  status: string;
}

const PredictionFile: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [predictionFile, setPredictionFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("Active");
  const [recordings, setRecordings] = useState<PredictionData[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handlePredictionFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setPredictionFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && coverFile && predictionFile) {
      const newPrediction: PredictionData = {
        id: recordings.length + 1,
        title,
        coverFile,
        predictionFile,
        status,
      };
      setRecordings([...recordings, newPrediction]);
      setTitle("");
      setCoverFile(null);
      setPredictionFile(null);
      setStatus("Active");
    }
  };

  const handleDelete = (id: number) => {
    setRecordings(recordings.filter((record) => record.id !== id));
    setDeleteId(null); // Clear after delete
  };

  const columns = [
    {
      title: "Prediction Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Prediction Cover",
      dataIndex: "coverFile",
      key: "coverFile",
      render: (coverFile: File | null) =>
        coverFile ? (
          <img
            src={URL.createObjectURL(coverFile)}
            alt="Cover"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        ) : (
          "No File"
        ),
    },
    {
      title: "Prediction File",
      dataIndex: "predictionFile",
      key: "predictionFile",
      render: (predictionFile: File | null) =>
        predictionFile ? (
          <a
            href={URL.createObjectURL(predictionFile)} // ✅ Create a Blob URL
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#007bff",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {predictionFile.name}
          </a>
        ) : (
          "No File"
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, row: PredictionData) => (
        <button
          className="btn btn-danger btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
          onClick={() => setDeleteId(row.id)} // ✅ Set delete ID
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>Add Prediction File</h2>
        </div>
        <div className="card p-4">
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="mb-3">
                <label className="form-label">Prediction Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Prediction Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Cover File (image/*)</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleCoverFileChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Prediction File (pdf/doc/docx/xlsx)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept=".pdf,.doc,.docx,.xlsx"
                    onChange={handlePredictionFileChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="col-md-3">
                <button type="submit" className="btn btn-danger w-100">
                  SAVE
                </button>
              </div>
            </div>
          </form>

          {/* ✅ Table Component */}
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

      {/* ✅ Delete Modal */}
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
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{ marginRight: "1em" }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => deleteId && handleDelete(deleteId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionFile;
