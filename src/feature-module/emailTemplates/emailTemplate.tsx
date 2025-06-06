import React, { useEffect, useState } from "react";
import Table from "../../core/common/dataTable/index";
import {
  createEmailTemplates,
  fetchAllEmailTemplates,
  deleteEmailTemplates,
  updateEmailTemplates,
  fetchEmailTemplatesById,
} from "../../api/masterAPI"; // ✅ Adjust if needed
import AlertComponent from "../../core/common/AlertComponent";
import { Editor } from "primereact/editor";

interface EmailTemplateFormData {
  title: string;
  subject: string;
  body: string;
}

interface EmailTemplateRow {
  id: number;
  title: string;
  subject: string;
  body: string;
  createdAt: string;
}

const EmailTemplate: React.FC = () => {
  const [formData, setFormData] = useState<EmailTemplateFormData>({
    title: "",
    subject: "",
    body: "",
  });
  const [templates, setTemplates] = useState<EmailTemplateRow[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    getTemplates();
  }, []);

  const getTemplates = async () => {
    try {
      const res = await fetchAllEmailTemplates();
      if (res.success) {
        setTemplates(res.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (isEditMode && editId !== null) {
        response = await updateEmailTemplates(editId, formData);
      } else {
        response = await createEmailTemplates(formData);
      }

      if (response.success) {
        setSuccess(response.message || "Template saved successfully.");
        setError(null);
        resetForm();
        getTemplates();
      } else {
        setError(response.message || response.error || "Failed to save template.");
        setSuccess(null);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setSuccess(null);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const res = await fetchEmailTemplatesById(id);
      if (res.success) {
        setFormData({
          title: res.data.title,
          subject: res.data.subject,
          body: res.data.body,
        });
        setEditId(res.data.id);
        setIsEditMode(true);
      }
    } catch (err) {
      console.error("Edit fetch error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteEmailTemplates(id);
      if (res.success) {
        setSuccess(res.message || "Template deleted successfully.");
        setError(null);
        getTemplates();
      } else {
        setError(res.message || res.error || "Failed to delete template.");
        setSuccess(null);
      }
    } catch (err) {
      setError("An unexpected error occurred while deleting.");
      setSuccess(null);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subject: "",
      body: "",
    });
    setIsEditMode(false);
    setEditId(null);
  };

  const columns = [
    { title: "S.No", render: (_: any, __: EmailTemplateRow, index: number) => index + 1 },
    { title: "Title", dataIndex: "title" },
    { title: "Subject", dataIndex: "subject" },
    {
      title: "Action",
      render: (_: any, record: EmailTemplateRow) => (
        <div>
          <button
            className="btn btn-info btn-sm me-2"
            onClick={() => handleEdit(record.id)}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(record.id)}
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
        <h2 className="mb-4">{isEditMode ? "Edit Email Template" : "Create Email Template"}</h2>
        <form onSubmit={handleSubmit} className="card p-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-12 mb-3">
              <label>Body *</label>
              <Editor
                value={formData.body}
                onTextChange={(e) =>
                  setFormData((prev) => ({ ...prev, body: e.htmlValue ?? "" }))
                }
                style={{ height: "150px" }}
              />
            </div>
          </div>

          <button className="btn btn-primary mt-3" type="submit">
            {isEditMode ? "Update Template" : "Create Template"}
          </button>
        </form>

        <div className="mt-4">
          <Table key={templates.length} dataSource={templates} columns={columns} Selection={false} />
        </div>
      </div>
    </div>
  );
};

export default EmailTemplate;
