import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";

interface RecordingData {
  id: number;
  type: string;
  title: string;
  content: string;
}

const GrammerTemplate: React.FC = () => {
  const [type, setType] = useState<string>("Reading");
  const [templateTitle, setTemplateTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null); // ✅ State for Delete ID

  // Sample data
  const [recordings, setRecordings] = useState<RecordingData[]>([
    {
      id: 1,
      type: "Speaking",
      title: "6. Answer Short Question",
      content: 'Use the sentence "The answer is..." along with your response.',
    },
  ]);

  // ✅ Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // ✅ Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editId !== null) {
      // ✅ Update existing row
      setRecordings((prev) =>
        prev.map((rec) =>
          rec.id === editId
            ? {
                ...rec,
                type,
                title: templateTitle,
                content,
              }
            : rec
        )
      );
      setEditId(null);
    } else {
      // ✅ Add new row
      const newRecord: RecordingData = {
        id: recordings.length + 1,
        type,
        title: templateTitle,
        content,
      };
      setRecordings((prev) => [...prev, newRecord]);
    }

    // ✅ Reset form
    setType("Reading");
    setTemplateTitle("");
    setContent("");
    setFile(null);
  };

  // ✅ Handle delete row
  const handleDelete = () => {
    if (deleteId !== null) {
      setRecordings((prev) => prev.filter((record) => record.id !== deleteId));
      setDeleteId(null); // ✅ Reset deleteId after delete
    }
  };

  // ✅ Handle edit row
  const handleEdit = (id: number) => {
    const record = recordings.find((rec) => rec.id === id);
    if (record) {
      setType(record.type);
      setTemplateTitle(record.title);
      setContent(record.content);
      setEditId(id);
    }
  };

  // ✅ Table columns
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: (a: RecordingData, b: RecordingData) =>
        a.type.localeCompare(b.type),
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a: RecordingData, b: RecordingData) =>
        a.title.localeCompare(b.title),
    },
    {
      title: "Content",
      dataIndex: "content",
      sorter: (a: RecordingData, b: RecordingData) =>
        a.content.localeCompare(b.content),
    },
    {
      title: "Action",
      render: (row: RecordingData) => (
        <div>
          {/* ✅ Edit Button */}
          <button
            className="btn btn-info btn-sm me-2"
            onClick={() => handleEdit(row.id)}
          >
            <i className="fa fa-pencil"></i>
          </button>

          {/* ✅ Delete Button */}
          <button
            className="btn btn-danger btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            onClick={() => setDeleteId(row.id)} 
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>
            {editId !== null ? "Edit Grammer Template" : "Add Grammer Template"}
          </h2>
        </div>
        <div className="card p-4">
          {/* ✅ Form */}
          <form onSubmit={handleSubmit}>
            {/* Type */}
            <div className="mb-3">
              <label className="form-label">Type</label>
              <input
                type="text"
                className="form-control"
                value={templateTitle}
                onChange={(e) => setTemplateTitle(e.target.value)}
                required
              />
            </div>

            {/* Template Title */}
            <div className="mb-3">
              <label className="form-label">Template Title</label>
              <input
                type="text"
                className="form-control"
                value={templateTitle}
                onChange={(e) => setTemplateTitle(e.target.value)}
                required
              />
            </div>

            {/* Content */}
            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                className="form-control"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image / PDF</label>
              <input
                type="file"
                className="form-control"
                // onChange={handleFileChange}
                accept="image/*"
              />
              {/* {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              )} */}
            </div>

            {/* ✅ Save Button */}
            <div>
              <button type="submit" className="btn btn-primary">
                {editId !== null ? "UPDATE" : "SAVE"}
              </button>
            </div>
          </form>

          {/* ✅ Table */}
          <div className="mt-4">
            <Table
              key={recordings.map((r) => r.id).join(",")}
              dataSource={recordings}
              columns={columns}
              Selection={true}
            />
          </div>
        </div>

        {/* ✅ Delete Modal */}
        <div
          id="deleteModal"
          className="modal fade"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body py-5 text-center">
                <i
                  className="fa fa-trash"
                  style={{
                    color: "red",
                    fontSize: "2rem",
                    marginBottom: "1em",
                  }}
                />
                <p>Are you sure you want to delete this recording?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary mr-3"
                  data-bs-dismiss="modal"
                  style={{ marginRight: "1em" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  data-bs-dismiss="modal"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammerTemplate;
