import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";

interface InstituteData {
  id: number;
  username: string;
  instituteCode: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
}

const Institute: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [instituteCode, setInstituteCode] = useState<string>("");
  const [logo, setLogo] = useState<File | null>(null);
  const [favicon, setFavicon] = useState<File | null>(null);
  const [landingPageImage, setLandingPageImage] = useState<File | null>(null);
  const [contactPerson, setContactPerson] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [institutes, setInstitutes] = useState<InstituteData[]>([
    {
      id: 1,
      username: "wefofuj",
      instituteCode: "Commodo doloribus vo",
      contactPerson: "Quia illo deserunt d",
      email: "wiri@mailinator.com",
      phoneNumber: "8568745782",
    },
  ]);
  const [editId, setEditId] = useState<number | null>(null);

  // ✅ Handle File Changes
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFavicon(e.target.files[0]);
    }
  };

  const handleLandingPageImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setLandingPageImage(e.target.files[0]);
    }
  };

  // ✅ Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editId !== null) {
      // ✅ Update existing row
      setInstitutes((prev) =>
        prev.map((item) =>
          item.id === editId
            ? {
                id: editId,
                username,
                instituteCode,
                contactPerson,
                email,
                phoneNumber,
              }
            : item
        )
      );
      setEditId(null);
    } else {
      // ✅ Add new row
      const newInstitute: InstituteData = {
        id: institutes.length + 1,
        username,
        instituteCode,
        contactPerson,
        email,
        phoneNumber,
      };
      setInstitutes((prev) => [...prev, newInstitute]);
    }

    // ✅ Reset form fields
    setUsername("");
    setInstituteCode("");
    setContactPerson("");
    setEmail("");
    setPhoneNumber("");
  };

  const handleDeleteConfirm = () => {
    if (deleteId !== null) {
      setInstitutes((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  // ✅ Handle Edit
  const handleEdit = (record: InstituteData) => {
    setUsername(record.username);
    setInstituteCode(record.instituteCode);
    setContactPerson(record.contactPerson);
    setEmail(record.email);
    setPhoneNumber(record.phoneNumber);
    setEditId(record.id);
  };

  

  // ✅ Table Columns
  const columns = [
    { title: "Username", dataIndex: "username" },
    { title: "Institute Code", dataIndex: "instituteCode" },
    { title: "Contact Person", dataIndex: "contactPerson" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone Number", dataIndex: "phoneNumber" },
    {
      title: "Actions",
      render: (_: any, record: InstituteData) => (
        <>
          <button
            className="btn btn-warning me-2"
            onClick={() => handleEdit(record)}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            onClick={() => handleDelete(record.id)}
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
        <div className="heading mb-4">
          <h2>Create Institute</h2>
        </div>

        {/* ✅ Form Section */}
        <div className="card p-4">
          {/* ✅ Form Section */}
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              {/* ✅ Username */}
              <div className="col-md-4">
                <label className="form-label fw-bold">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* ✅ Institute Code */}
              <div className="col-md-4">
                <label className="form-label fw-bold">Institute Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={instituteCode}
                  onChange={(e) => setInstituteCode(e.target.value)}
                  required
                />
              </div>

              {/* ✅ Logo */}
              <div className="col-md-4">
                <label className="form-label fw-bold">Logo</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleLogoChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              {/* ✅ Favicon */}
              <div className="col-md-4">
                <label className="form-label fw-bold">Favicon</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFaviconChange}
                />
              </div>

              {/* ✅ Landing Page Image */}
              <div className="col-md-4">
                <label className="form-label fw-bold">Landing Page Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleLandingPageImageChange}
                />
              </div>

              {/* ✅ Contact Person */}
              <div className="col-md-4">
                <label className="form-label fw-bold">Contact Person</label>
                <input
                  type="text"
                  className="form-control"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              {/* ✅ Email */}
              <div className="col-md-4">
                <label className="form-label fw-bold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* ✅ Phone Number */}
              <div className="col-md-4">
                <label className="form-label fw-bold">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* ✅ Buttons */}
            <div className="row mb-3">
              <div className="col-md-2">
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </div>
            </div>
          </form>
          <div className="mt-4">
            <Table dataSource={institutes} columns={columns} />
          </div>
        </div>
      </div>
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
                className="btn btn-secondary"
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
    </div>
  );
};

export default Institute;
