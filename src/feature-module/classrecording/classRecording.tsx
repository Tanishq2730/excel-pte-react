import React, { useState, useEffect } from "react";
import Table from "../../core/common/dataTable/index"; // Custom Table component
import { fetchAllRecordings, createRecording, updateRecording, deleteRecording } from "../../api/masterAPI";
import AlertComponent from "../../core/common/AlertComponent";

interface RecordingData {
  id: number;
  title: string;
  description: string;
  url: string;
}

const ClassRecording: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [recordings, setRecordings] = useState<RecordingData[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ✅ Fetch Recordings on Mount
  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    try {
      const response = await fetchAllRecordings();

      if (response.success && response.data.length > 0) {
        setRecordings(response.data);
      } else {
        setError("Failed to fetch recordings.");
      }
    } catch (error) {
      setError("Error fetching recordings.");
    }
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) {
      setError("Title and URL are required!");
      return;
    }

    try {
      const response = await createRecording({ title, description, url });
      if (response.success) {
        setSuccess("Recording added successfully!");
        loadRecordings(); // Refresh data
        setTitle("");
        setDescription("");
        setUrl("");
      } else {
        setError("Failed to add recording.");
      }
    } catch (error) {
      setError("Error adding recording.");
    }
  };

  // ✅ Handle Row Deletion
  const handleDeleteConfirm = async () => {
    if (deleteId !== null) {
      try {
        const response = await deleteRecording(deleteId);
        if (response.success) {
          setSuccess("Recording deleted successfully!");
          loadRecordings(); // Refresh data
        } else {
          setError("Failed to delete recording.");
        }
      } catch (error) {
        setError("Error deleting recording.");
      }
      setDeleteId(null);
    }
  };

  // ✅ Define Data Table Columns
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a: RecordingData, b: RecordingData) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a: RecordingData, b: RecordingData) => a.description.localeCompare(b.description),
    },
    {
      title: "URL",
      dataIndex: "url",
      sorter: (a: RecordingData, b: RecordingData) => a.url.localeCompare(b.url),
    },
    {
      title: "Actions",
      render: (row: RecordingData) => (
        <button
          className="btn btn-danger btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#standard-modal"
          onClick={() => setDeleteId(row.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <>


      {/* ✅ Modal */}
      <div id="standard-modal" className="modal fade" tabIndex={-1} aria-labelledby="standard-modalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="standard-modalLabel">Confirm Delete</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body py-5 text-center">
              <i className="fa fa-trash text-danger mb-3" />
              <p>Are you sure you want to delete this recording?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeleteConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Page Content */}
      <div className="page-wrapper">
        <div className="content">
          <div className="container mt-4">
            <div className="heading mb-4">
              <h2>Add Video Recording</h2>
            </div>

            {/* ✅ Form */}
            <div className="card p-4">
              {/* ✅ Alerts */}
              {error && <AlertComponent type="danger" message={error} onClose={() => setError(null)} />}
              {success && <AlertComponent type="success" message={success} onClose={() => setSuccess(null)} />}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>                 

                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">URL</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter URL"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Description</label>
                    <textarea
                      className="form-control"
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>

              {/* ✅ Data Table */}
              <div className="mt-4">
                <Table key={recordings.length} dataSource={[...recordings]} columns={columns} Selection={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassRecording;
