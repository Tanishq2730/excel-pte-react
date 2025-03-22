import React, { useState, useEffect } from "react";
import Table from "../../core/common/dataTable/index";
import AlertComponent from "../../core/common/AlertComponent"; // ✅ Import Alert Component
import DefaultEditor from "react-simple-wysiwyg";
import {
  fetchAllTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  fetchAllTypes
} from "../../api/masterAPI";
import { image_url } from "../../environment";

// ✅ Template Data Interface
interface TemplateData {
  id: number;
  typeId: string;
  title: string;
  content: string;
  image_pdf: string | null;
}

const Template: React.FC = () => {
  const [type, setType] = useState<string>("Reading");
  const [templateTitle, setTemplateTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);
  const [types, setTypes] = useState([]);
  // ✅ Fetch All Templates on Component Mount
  useEffect(() => {
    loadTemplates();
    getTypes();
  }, []);

  const getTypes = async () => {
    setLoading(true);
    try {
      const response = await fetchAllTypes();
      if (response.success) {
        setTypes(response.data);
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      showAlert("danger", "Failed to load templates");
    }
    setLoading(false);
  };

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetchAllTemplates();
      if (response.success) {
        setTemplates(response.data);
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      showAlert("danger", "Failed to load templates");
    }
    setLoading(false);
  };

  // ✅ Handle File Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // ✅ Handle Form Submission (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!templateTitle || !content) throw new Error("All fields are required.");

      const formData = new FormData();
      formData.append("typeId", type);
      formData.append("title", templateTitle);
      formData.append("content", content);
      if (file) formData.append("image_pdf", file);

      let response;
      if (editId) {
        response = await updateTemplate(editId, formData);
      } else {
        response = await createTemplate(formData);
      }

      if (response.success) {
        showAlert("success", editId ? "Template updated successfully!" : "Template added successfully!");
        loadTemplates();
        handleReset();
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      showAlert("danger", "Error saving template.");
    }

    setLoading(false);
  };

  // ✅ Handle Edit Template
  const handleEdit = (template: TemplateData) => {
    setType(template.typeId);
    setTemplateTitle(template.title);
    setContent(template.content);
    setEditId(template.id);
  };

  // ✅ Handle Reset Form
  const handleReset = () => {
    setType("Reading");
    setTemplateTitle("");
    setContent("");
    setFile(null);
    setEditId(null);
  };

  // ✅ Handle Delete
  const handleDeleteConfirm = async () => {
    if (deleteId === null) return;
    setLoading(true);
    try {
      const response = await deleteTemplate(deleteId);
      if (response.success) {
        showAlert("success", "Template deleted successfully!");
        setTemplates((prev) => prev.filter((t) => t.id !== deleteId));
        setDeleteId(null);
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      showAlert("danger", "Failed to delete template");
    }
    setLoading(false);
  };

  // ✅ Function to Show Alert
  const showAlert = (type: "success" | "danger", message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  // ✅ Table Columns
  const columns = [
    {
      title: "Type",
      dataIndex: "typeId",
      key: "typeId",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "File",
      dataIndex: "image_pdf",
      key: "image_pdf",
      render: (file: string | null) =>
        file ? (
          <a href={`${image_url}${file}`} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        ) : (
          "No File"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, row: TemplateData) => (
        <div>
          <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(row)}>
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            onClick={() => setDeleteId(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">

        <div className="heading mb-4">
          <h2>{editId ? "Edit Template" : "Add Template"}</h2>
        </div>
        <div className="card p-4">
          {/* Form */}
          {alert && <AlertComponent type={alert.type} message={alert.message} />}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Type</label>
              <select
                className="form-control"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">Select Type</option>
                {types.map((t: any) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Template Title</label>
              <input type="text" className="form-control" value={templateTitle} onChange={(e) => setTemplateTitle(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Content</label>
              {/* <textarea className="form-control" rows={4} value={content} onChange={(e) => setContent(e.target.value)} required /> */}
              <DefaultEditor value={content}  onChange={(e) => setContent(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">Image / PDF</label>
              <input type="file" className="form-control" accept="image/*,.pdf" onChange={handleFileChange} />
            </div>

            <button type="submit" className="btn btn-danger" disabled={loading}>
              {loading ? "Saving..." : editId ? "UPDATE" : "SAVE"}
            </button>
          </form>

          {/* Table Component */}
          <div className="mt-4">
            <Table key={templates.length} dataSource={templates} columns={columns} Selection={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
