import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";

interface MockDropOption {
  label: string;
  value: string;
}

interface RecordingData {
  id: number;
  name: string;
  image: string;
  pdf: string;
  status: string;
  addon: string;
}

const ScoreCard: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Active");

  const [recordings, setRecordings] = useState<RecordingData[]>([
    {
      id: 1,
      name: "Tabbu Kandangwa",
      image: "https://picsum.photos/200/300",
      pdf: "#",
      status: "Active",
      addon: "19/05/2023",
    },
  ]);

  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // ✅ Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ✅ Handle PDF change
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdf(file);
      setPdfPreview(URL.createObjectURL(file));
    } else {
      alert("Please select a valid PDF file");
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
                name,
                image: imagePreview || rec.image,
                pdf: pdfPreview || rec.pdf,
                status,
                addon: new Date().toLocaleDateString(),
              }
            : rec
        )
      );
      setEditId(null);
    } else {
      // ✅ Add new record
      const newRecord: RecordingData = {
        id: recordings.length + 1,
        name,
        image: imagePreview || "",
        pdf: pdfPreview || "#",
        status,
        addon: new Date().toLocaleDateString(),
      };
      setRecordings((prev) => [...prev, newRecord]);
    }

    // ✅ Reset fields
    setName("");
    setImage(null);
    setPdf(null);
    setImagePreview(null);
    setPdfPreview(null);
    setStatus("Active");
  };

  // ✅ Handle edit row
  const handleEdit = (id: number) => {
    const record = recordings.find((rec) => rec.id === id);
    if (record) {
      setName(record.name);
      setImagePreview(record.image);
      setPdfPreview(record.pdf !== "#" ? record.pdf : null);
      setStatus(record.status);
      setEditId(id);
    }
  };

  // ✅ Handle delete row
  const handleDelete = () => {
    if (deleteId !== null) {
      setRecordings((prev) => prev.filter((record) => record.id !== deleteId));
      setDeleteId(null);
    }
  };

  const mockdrop: MockDropOption[] = [
    { label: "Active", value: "Active" },
    { label: "Disabled", value: "Disabled" },
  ];

  // ✅ Table columns
  const columns = [
    {
      title: "S.No.",
      dataIndex: "id",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (img: string) =>
        img ? (
          <img
            src={img}
            alt="Preview"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "PDF",
      dataIndex: "pdf",
      render: (pdf: string) =>
        pdf !== "#" ? (
          <a
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue" }}
          >
            View PDF
          </a>
        ) : (
          "No PDF"
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Addon",
      dataIndex: "addon",
    },
    {
      title: "Action",
      render: (row: RecordingData) => (
        <div>
          <button
            className="btn btn-info btn-sm me-2"
            onClick={() => handleEdit(row.id)}
          >
            <i className="fa fa-pencil"></i>
          </button>
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
          <h2>Score Card</h2>
        </div>
        <div className="card p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* ✅ Name */}
              <div className="col-md-6 mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* ✅ Image */}
              <div className="col-md-6 mb-3">
                <label>Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </div>

              {/* ✅ PDF */}
              <div className="col-md-6 mb-3">
                <label>PDF</label>
                <input
                  type="file"
                  className="form-control"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                />
              </div>

              {/* ✅ Status */}
              <div className="col-md-6 mb-3">
                <label>Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {mockdrop.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-info">
              {editId !== null ? "UPDATE" : "SUBMIT"}
            </button>
          </form>

          {/* ✅ Table */}
          <div className="mt-4">
            <Table dataSource={recordings} columns={columns} />
          </div>
        </div>
      </div>
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
  );
};

export default ScoreCard;
