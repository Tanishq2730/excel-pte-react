import React, { useState } from "react";
import Table from "../../core/common/dataTable/index"; // Custom Table component

interface RecordingData {
  id: number;
  title: string;
  description: string;
  url: string;
  videoFile: string;
}

const ClassRecording: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [recordings, setRecordings] = useState<RecordingData[]>([
    {
      id: 1,
      title: "React Basics",
      description: "Introduction to React",
      url: "https://example.com/react-basics",
      videoFile: "react-basics.mp4",
    },
    {
      id: 2,
      title: "TypeScript with React",
      description: "Understanding TypeScript in React",
      url: "https://example.com/ts-react",
      videoFile: "ts-react.mp4",
    },
  ]);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  // ✅ Handle Video File Change
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideoFile(e.target.files[0]);
    }
  };

  // ✅ Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !url) {
      alert("Title and URL are required!");
      return;
    }

    const newRecording: RecordingData = {
      id: recordings.length + 1,
      title,
      description,
      url,
      videoFile: videoFile ? videoFile.name : "No File",
    };

    setRecordings((prev) => [...prev, newRecording]);

    // ✅ Reset form
    setTitle("");
    setDescription("");
    setUrl("");
    setVideoFile(null);
  };

  // ✅ Handle Row Deletion
  const handleDeleteConfirm = () => {
    if (deleteId !== null) {
      setRecordings((prev) =>
        prev.filter((recording) => recording.id !== deleteId)
      );
      setDeleteId(null);
    }
  };

  // ✅ Define Data Table Columns
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a: RecordingData, b: RecordingData) =>
        a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a: RecordingData, b: RecordingData) =>
        a.description.localeCompare(b.description),
    },
    {
      title: "URL",
      dataIndex: "url",
      sorter: (a: RecordingData, b: RecordingData) =>
        a.url.localeCompare(b.url),
    },
    {
      title: "Video File",
      dataIndex: "videoFile",
      sorter: (a: RecordingData, b: RecordingData) =>
        a.videoFile.localeCompare(b.videoFile),
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
      <div
        id="standard-modal"
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="standard-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="standard-modalLabel">
                Confirm Delete
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body" style={{textAlign:'center'}}>
              <i
                className="fa fa-trash"
                data-bs-toggle="tooltip"
                title="Delete"
                style={{color:'red'}}
              />
              <p>Are you sure you want to delete this recording?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary mr-3"
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

      {/* ✅ Page Content */}
      <div className="page-wrapper">
        <div className="content">
          <div className="container mt-4">
            <div className="heading mb-4">
              <h2>Add Video Recording</h2>
            </div>

            {/* ✅ Form */}
            <div className="card p-4">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Description</label>
                    <textarea
                      className="form-control"
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">URL</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter URL"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Video File</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleVideoChange}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>

              {/* ✅ Data Table */}
              <div className="mt-4">
                <Table
                  key={recordings.length}
                  dataSource={[...recordings]}
                  columns={columns}
                  Selection={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassRecording;
