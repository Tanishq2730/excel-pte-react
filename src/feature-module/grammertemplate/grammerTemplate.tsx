import React, { useEffect, useState } from "react";
import Table from "../../core/common/dataTable/index";
import Swal from "sweetalert2";
import AlertComponent from "../../core/common/AlertComponent";
import {
  fetchAllGrammars,
  createGrammar,
  updateGrammar,
  deleteGrammar,
  fetchGrammarById,
} from "../../api/masterAPI";
import { image_url } from "../../environment";

interface GrammarData {
  id: number;
  type: string;
  title: string;
  content: string;
  image_pdf?: string | null;
}

const GrammerTemplate: React.FC = () => {
  const [type, setType] = useState<string>("Reading");
  const [templateTitle, setTemplateTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [grammars, setGrammars] = useState<GrammarData[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [alert, setAlert] = useState<{ type?: "success" | "danger"; message: string }>({
    type: undefined,
    message: "",
  });

  // ✅ Fetch grammar list
  const loadGrammars = async () => {
    try {
      const response = await fetchAllGrammars();
      if (response.success) {
        setGrammars(response.data);
      } else {
        setAlert({ type: "danger", message: "Failed to fetch grammar entries" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error fetching grammar entries" });
    }
  };

  useEffect(() => {
    loadGrammars();
  }, []);

  // ✅ Handle File Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateTitle || !content) {
      setAlert({ type: "danger", message: "Title and Content are required" });
      return;
    }

    const formData = new FormData();
    formData.append("type", type);
    formData.append("title", templateTitle);
    formData.append("content", content);
    if (file) formData.append("image_pdf", file);

    try {
      if (editId !== null) {
        await updateGrammar(editId, formData);
        setAlert({ type: "success", message: "Grammar updated successfully!" });
      } else {
        await createGrammar(formData);
        setAlert({ type: "success", message: "Grammar created successfully!" });
      }
      await loadGrammars();
      resetForm();
    } catch (error) {
      setAlert({ type: "danger", message: "Error submitting grammar" });
    }
  };

  // ✅ Handle Edit
  const handleEdit = async (id: number) => {
    try {
      const response = await fetchGrammarById(id);
      if (response.success) {
        const grammar = response.data;
        setType(grammar.type);
        setTemplateTitle(grammar.title);
        setContent(grammar.content);
        setEditId(id);
      } else {
        setAlert({ type: "danger", message: "Failed to fetch grammar details" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error fetching grammar details" });
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteGrammar(id);
          Swal.fire("Deleted!", "Grammar entry has been deleted.", "success");
          await loadGrammars();
        } catch (error) {
          Swal.fire("Error!", "Error deleting grammar entry.", "error");
        }
      }
    });
  };

  // ✅ Reset Form
  const resetForm = () => {
    setType("Reading");
    setTemplateTitle("");
    setContent("");
    setFile(null);
    setEditId(null);
  };

  // ✅ Table Columns
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Type", dataIndex: "type" },
    { title: "Title", dataIndex: "title" },
    { title: "Content", dataIndex: "content" },
    {
      title: "File",
      dataIndex: "image_pdf",
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
      title: "Action",
      render: (row: GrammarData) => (
        <>
          <button className="btn btn-info btn-sm me-2" onClick={() => handleEdit(row.id)}>
            <i className="fa fa-pencil"></i>
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row.id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        {alert.message && <AlertComponent type={alert.type ?? "primary"} message={alert.message} onClose={() => setAlert({ type: undefined, message: "" })} />}

        <div className="heading mb-4">
          <h2>{editId !== null ? "Edit Grammar Template" : "Add Grammar Template"}</h2>
        </div>

        <div className="card p-4">
          {/* ✅ Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Type</label>
              <input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" value={templateTitle} onChange={(e) => setTemplateTitle(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea className="form-control" rows={4} value={content} onChange={(e) => setContent(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Upload File (Image/PDF)</label>
              <input type="file" className="form-control" onChange={handleFileChange} accept="image/*,application/pdf" />
            </div>

            <button type="submit" className="btn btn-primary">
              {editId !== null ? "UPDATE" : "SAVE"}
            </button>
          </form>

          {/* ✅ Table */}
          <div className="mt-4">
            <Table  key={grammars.length} dataSource={grammars} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammerTemplate;
