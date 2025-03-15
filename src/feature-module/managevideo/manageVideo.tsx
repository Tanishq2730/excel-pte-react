import React, { useState } from "react";
import Table from "../../core/common/dataTable/index"; // Custom Table component

interface VideoData {
  id: number;
  title: string;
  link: string;
  type: string;
  platform: string;
  image: string;
}

const ManageVideo: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [type, setType] = useState<string>("CN");
  const [platform, setPlatform] = useState<string>("YouTube");
  const [image, setImage] = useState<File | null>(null);
  const [recordings, setRecordings] = useState<VideoData[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null); // ✅ New state for deleteId

  // ✅ Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // ✅ Handle form submission (Save or Update)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !link) {
      alert("Please fill out all fields");
      return;
    }

    if (editId !== null) {
      // ✅ Update existing record
      setRecordings((prev) =>
        prev.map((record) =>
          record.id === editId
            ? {
                ...record,
                title,
                link,
                type,
                platform,
                image: image ? URL.createObjectURL(image) : record.image,
              }
            : record
        )
      );
      setEditId(null);
    } else {
      if (!image) {
        alert("Please upload an image");
        return;
      }

      // ✅ Create new record
      const newRecord: VideoData = {
        id: recordings.length + 1,
        title,
        link,
        type,
        platform,
        image: URL.createObjectURL(image),
      };
      setRecordings((prev) => [...prev, newRecord]);
    }

    // ✅ Reset state after submit
    setTitle("");
    setLink("");
    setType("CN");
    setPlatform("YouTube");
    setImage(null);
  };

  // ✅ Handle delete
  const handleDelete = () => {
    if (deleteId !== null) {
      setRecordings((prev) => prev.filter((rec) => rec.id !== deleteId));
      setDeleteId(null);
    }
  };

  // ✅ Handle edit
  const handleEdit = (id: number) => {
    const record = recordings.find((rec) => rec.id === id);
    if (record) {
      setTitle(record.title);
      setLink(record.link);
      setType(record.type);
      setPlatform(record.platform);
      setEditId(id);
    }
  };

  // ✅ Table columns
  const columns = [
    {
      title: "S.No.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Video Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Video Link",
      dataIndex: "link",
      key: "link",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Video Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={image}
          alt="thumbnail"
          style={{ width: "70px", height: "70px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Video Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Platform Type",
      dataIndex: "platform",
      key: "platform",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: VideoData) => (
        <div>
          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => handleEdit(record.id)}
          >
            EDIT
          </button>
          {/* ✅ Store deleteId when opening modal */}
          <button
            className="btn btn-danger btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            onClick={() => setDeleteId(record.id)}
          >
            DELETE
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>{editId !== null ? "Edit Video" : "Add Video"}</h2>
        </div>
        <div className="card p-4">
          <form onSubmit={handleSubmit}>
            {/* Video Title */}
            <div className="mb-3">
              <label className="form-label">Video Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Thumbnail Image */}
            <div className="mb-3">
              <label className="form-label">Thumbnail Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
                required={editId === null}
              />
            </div>

            {/* Video Link */}
            <div className="mb-3">
              <label className="form-label">Video Link</label>
              <input
                type="text"
                className="form-control"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>

            {/* Video Type */}
            <div className="mb-3">
              <label className="form-label">Video Type</label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="CN">CN</option>
                <option value="AN">AN</option>
                <option value="EN">EN</option>
              </select>
            </div>

            {/* Platform Type */}
            <div className="mb-3">
              <label className="form-label">Platform Type</label>
              <select
                className="form-select"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                required
              >
                <option value="YouTube">YouTube</option>
                <option value="Vimeo">Vimeo</option>
                <option value="Dailymotion">Dailymotion</option>
              </select>
            </div>

            {/* Save Button */}
            <button type="submit" className="btn btn-danger">
              {editId !== null ? "UPDATE" : "SAVE"}
            </button>
          </form>

          {/* ✅ Table update in real-time */}
          <div className="mt-4">
            <Table
              key={editId || recordings.length}
              dataSource={recordings}
              columns={columns}
            />
          </div>
        </div>
      </div>

      {/* ✅ Modal */}
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
                onClick={handleDelete}
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

export default ManageVideo;
