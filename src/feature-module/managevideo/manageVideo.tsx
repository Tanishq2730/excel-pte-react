import React, { useState, useEffect } from "react";
import Table from "../../core/common/dataTable/index";
import {
  fetchAllVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} from "../../api/masterAPI";
import { image_url } from "../../environment";
import AlertComponent from "../../core/common/AlertComponent";

interface VideoData {
  id: number;
  title: string;
  link: string;
  thumbnail: string | null;
}

const ManageVideo: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    thumbnail: null as File | null,
  });

  const [videos, setVideos] = useState<VideoData[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // ✅ Fetch Videos on Mount
  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const response = await fetchAllVideos();
      if (response.success) {
        setVideos(response.data);
      } else {
        setError("Failed to fetch videos.");
      }
    } catch (error) {
      setError("Error fetching videos.");
    }
  };

  // ✅ Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // ✅ Handle Thumbnail Change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];

      if (!validTypes.includes(file.type)) {
        setError("Only JPG, JPEG, and PNG files are allowed.");
        return;
      }

      setError(null);
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // ✅ Handle Form Submission (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.link) {
      setError("Title and link are required!");
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("link", formData.link);
      if (formData.thumbnail) {
        formDataToSend.append("image", formData.thumbnail);
      }

      let response;
      if (editId !== null) {
        response = await updateVideo(editId, formDataToSend);
      } else {
        response = await createVideo(formDataToSend);
      }

      if (response.success) {
        setSuccess(editId !== null ? "Video updated successfully!" : "Video added successfully!");
        loadVideos();
        setFormData({ title: "", link: "", thumbnail: null });
        setEditId(null);
        setPreviewImage(null);
      } else {
        setError("Failed to save video.");
      }
    } catch (error) {
      setError("Error saving video.");
    }
  };

  // ✅ Handle Edit
  const handleEdit = (id: number) => {
    const video = videos.find((item) => item.id === id);
    if (video) {
      setFormData({
        title: video.title,
        link: video.link,
        thumbnail: null,
      });
      setPreviewImage(video.thumbnail ? `${image_url}${video.thumbnail}` : null);
      setEditId(id);
    }
  };

  // ✅ Handle Delete
  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  // ✅ Confirm Delete
  const handleDeleteConfirm = async () => {
    if (deleteId !== null) {
      try {
        const response = await deleteVideo(deleteId);
        if (response.success) {
          setSuccess("Video deleted successfully!");
          loadVideos();
        } else {
          setError("Failed to delete video.");
        }
      } catch (error) {
        setError("Error deleting video.");
      }
      setDeleteId(null);
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title" },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      render: (thumbnail: string) =>
        thumbnail ? (
          <img src={`${image_url}${thumbnail}`} alt="Thumbnail" style={{ width: "70px", height: "70px", objectFit: "cover" }} />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Video Link",
      dataIndex: "link",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Actions",
      render: (row: VideoData) => (
        <div>
          <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(row.id)}>
            <i className="fa fa-pencil"></i>
          </button>
          <button className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => handleDelete(row.id)}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>

      {/* ✅ Delete Modal */}
      <div id="deleteModal" className="modal fade" tabIndex={-1} aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="deleteModalLabel">Confirm Delete</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body py-5 text-center">
              <i className="fa fa-trash text-danger" style={{ fontSize: "2rem", marginBottom: "1em" }} />
              <p>Are you sure you want to delete this video?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeleteConfirm}>Delete</button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Form and Table */}
      <div className="page-wrapper">
        <div className="content">
          <div className="heading mb-4">
            <h2>{editId !== null ? "Edit Video" : "Add Video"}</h2>
          </div>
          <div className="card p-4">
            {/* ✅ Alerts */}
            {error && <AlertComponent type="danger" message={error} onClose={() => setError(null)} />}
            {success && <AlertComponent type="success" message={success} onClose={() => setSuccess(null)} />}

            <form onSubmit={handleSubmit}>
              <input type="text" className="form-control mb-3" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
              <input type="text" className="form-control mb-3" name="link" placeholder="Video Link" value={formData.link} onChange={handleChange} required />
              <input type="file" className="form-control mb-3" onChange={handleImageChange} />
              {previewImage && <img src={previewImage} alt="Preview" style={{ width: "100px", height: "auto" }} />}
              <button type="submit" className="btn btn-info">{editId !== null ? "Update" : "Submit"}</button>
            </form>

            {/* ✅ Table */}
            <Table key={videos.length} dataSource={videos} columns={columns} Selection={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageVideo;
