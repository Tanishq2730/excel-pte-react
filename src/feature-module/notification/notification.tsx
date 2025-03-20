import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";

// ✅ Define Types
interface NotificationData {
  id: number;
  title: string;
  description: string;
  link: string;
  expiryDate: string;
}

// ✅ Sample Data
const DUMMY_DATA: NotificationData[] = [
  {
    id: 1,
    title: "Weekly Prediction",
    description: "Listening Fill in the blanks Weekly prediction is Updated.",
    link: "https://example.com",
    expiryDate: "2024-12-19",
  },
  {
    id: 2,
    title: "Monthly Report",
    description: "Monthly report has been published successfully.",
    link: "https://example.com/report",
    expiryDate: "2025-01-10",
  },
  {
    id: 3,
    title: "Yearly Overview",
    description: "Yearly overview document is ready for download.",
    link: "",
    expiryDate: "2023-11-15",
  },
];

const Notification: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [notifications, setNotifications] =
    useState<NotificationData[]>(DUMMY_DATA);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // ✅ State for View Modal
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationData | null>(null);

  // ✅ Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editId !== null) {
      // ✅ Update Existing Data
      const updatedNotifications = notifications.map((item) =>
        item.id === editId
          ? { ...item, title, description, link, expiryDate }
          : item
      );
      setNotifications([...updatedNotifications]);
    } else {
      // ✅ Add New Data
      const newNotification: NotificationData = {
        id: notifications.length + 1,
        title,
        description,
        link,
        expiryDate,
      };
      setNotifications((prev) => [...prev, newNotification]);
    }

    resetForm();
  };

  // ✅ Reset Form Fields
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLink("");
    setExpiryDate("");
    setEditId(null);
  };

  // ✅ Handle Edit
  const handleEdit = (id: number) => {
    const record = notifications.find((item) => item.id === id);
    if (record) {
      setTitle(record.title);
      setDescription(record.description);
      setLink(record.link);
      setExpiryDate(record.expiryDate);
      setEditId(id);
    }
  };

  // ✅ Handle Delete
  const handleDelete = () => {
    if (deleteId !== null) {
      setNotifications((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  // ✅ Handle View
  const handleView = (notification: NotificationData) => {
    setSelectedNotification(notification);
  };

  // ✅ Define Table Columns
  const columns = [
    {
      title: "S.No.",
      dataIndex: "id",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Validity Date",
      dataIndex: "expiryDate",
      render: (date: string) => {
        const isExpired = new Date(date) < new Date();
        return (
          <>
            {date}{" "}
            {isExpired && <span className="text-danger ms-2">Expired</span>}
          </>
        );
      },
    },
    {
      title: "Action",
      render: (row: NotificationData) => (
        <div>
          {/* ✅ View Button */}
          <button
            className="btn btn-success btn-sm me-2"
            onClick={() => handleView(row)}
            data-bs-toggle="modal"
            data-bs-target="#viewModal"
          >
            <i className="fa fa-eye"></i>
          </button>

          {/* ✅ Edit Button */}
          <button
            className="btn btn-secondary btn-sm me-2"
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
          <h2>{editId !== null ? "Edit Notification" : "Add Notification"}</h2>
        </div>
        {/* ✅ Form */}
        <div className="card p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Link (Optional)</label>
              <input
                type="text"
                className="form-control"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Validity Date</label>
              <input
                type="date"
                className="form-control"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-info text-white">
              {editId !== null ? "Update" : "Submit"}
            </button>
          </form>
          {/* ✅ Table */}
          <div className="mt-4">
            <Table
              dataSource={notifications}
              columns={columns}
              Selection={true}
            />
          </div>
        </div>

        {/* ✅ View Modal */}
        <div
          id="viewModal"
          className="modal fade"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Notification Details</h5>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                {selectedNotification && (
                  <div>
                    <p>
                      <strong>Title:</strong> {selectedNotification.title}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedNotification.description}
                    </p>
                    <p>
                      <strong>Expiry Date:</strong>{" "}
                      {selectedNotification.expiryDate}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {new Date(selectedNotification.expiryDate) < new Date()
                        ? "Expired"
                        : "Active"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Delete Modal */}
        {/* (No changes in delete modal) */}
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
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  style={{ marginRight: "1em" }}
                >
                  Cancel
                </button>
                <button
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

export default Notification;
