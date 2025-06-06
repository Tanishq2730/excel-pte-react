// Blogs.tsx
import React, { useEffect, useState } from "react";
import Table from "../../core/common/dataTable/index";
import {
  createBlogs,
  fetchAllBlogs,
  deleteBlogs,
  updateBlogs,
  fetchBlogsById,
} from "../../api/masterAPI";
import AlertComponent from "../../core/common/AlertComponent";
import { image_url } from "../../environment";
import { Editor, EditorTextChangeEvent } from 'primereact/editor';

interface BlogFormData {
  title: string;
  content: string;
  image: File | string | null;
  author: string;
}

interface BlogRow {
  id: number;
  title: string;
  content: string;
  image: string;
  author: string;
  createdAt: string;
}

const Blogs: React.FC = () => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    content: "",
    image: null,
    author: "",
  });
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const res = await fetchAllBlogs();
      if (res.success) {
        setBlogs(res.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("content", formData.content);
    payload.append("author", formData.author);
    if (formData.image && typeof formData.image !== "string") {
      payload.append("image", formData.image);
    }

    try {
      let response;
      if (isEditMode && editId !== null) {
        response = await updateBlogs(editId, payload);
      } else {
        response = await createBlogs(payload);
      }

      if (response.success) {
        setSuccess(response.message || (isEditMode ? "Blog updated successfully." : "Blog created successfully."));
        setError(null);
        resetForm();
        getBlogs();
      } else {
        setError(response.message || response.error || "Failed to save blog.");
        setSuccess(null);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setSuccess(null);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const res = await fetchBlogsById(id);
      if (res.success) {
        setFormData({
          title: res.data.title,
          content: res.data.content,
          image: res.data.image, // Image as URL string
          author: res.data.author,
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
      const res = await deleteBlogs(id);
      if (res.success) {
        setSuccess(res.message || "Blog deleted successfully.");
        setError(null);
        getBlogs();
      } else {
        setError(res.message || res.error || "Failed to delete blog.");
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
      content: "",
      image: null,
      author: "",
    });
    setIsEditMode(false);
    setEditId(null);
  };

  const columns = [
    { title: "S.No", render: (_: any, __: BlogRow, index: number) => index + 1 },
    { title: "Title", dataIndex: "title" },
    { title: "Author", dataIndex: "author" },
    {
      title: "Image",
      render: (_: any, record: BlogRow) => (
        <img src={`${image_url}${record.image}`} alt="img" width="60" />
      ),
    },
    {
      title: "Action",
      render: (_: any, record: BlogRow) => (
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
        <h2 className="mb-4">{isEditMode ? "Edit Blog" : "Create Blog"}</h2>
        <form onSubmit={handleSubmit} className="card p-4" encType="multipart/form-data">
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
              <label>Author *</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Image {isEditMode ? "(Leave empty to keep current)" : "*"} </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="form-control"
                accept="image/*"
                required={!isEditMode}
              />
              {isEditMode && formData.image && typeof formData.image === "string" && (
                <img src={`${image_url}${formData.image}`} alt="Preview" className="mt-2" width="100" />
              )}
            </div>

            <div className="col-md-12 mb-3">
              <label>Content *</label>
              
              <div className="summernote" />
              <Editor
                value={formData.content}
                onTextChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    content: e.htmlValue ?? "",
                  }))
                }
                style={{ height: "130px" }}
              />
            </div>
          </div>

          <button className="btn btn-primary mt-3" type="submit">
            {isEditMode ? "Update" : "Create"}
          </button>
        </form>

        <div className="mt-4">
          <Table key={blogs.length} dataSource={blogs} columns={columns} Selection={false} />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
