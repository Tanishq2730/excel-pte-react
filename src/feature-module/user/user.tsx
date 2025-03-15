import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";

interface UserData {
  id: number;
  name: string;
  email: string;
  mobile: string;
  country: string;
  state: string;
}

const User: React.FC = () => {
  const [data, setData] = useState<UserData[]>([
    {
      id: 1,
      name: "Shubham",
      email: "katochshubham7@gmail.com",
      mobile: "7982453317",
      country: "India",
      state: "Delhi",
    },
    {
      id: 2,
      name: "ajay",
      email: "ranaajay93507@gmail.com",
      mobile: "8059074021",
      country: "India",
      state: "Haryana",
    },
    {
      id: 3,
      name: "Praveen Gutta",
      email: "askpraveeng@gmail.com",
      mobile: "09177096805",
      country: "India",
      state: "Andhra Pradesh",
    },
  ]);

  // ✅ Handle Row Deletion
  const handleDelete = (id: number) => {
    setData(data.filter((user) => user.id !== id));
  };

  // ✅ Define Table Columns
  const columns = [
    {
      title: "S. No.",
      dataIndex: "id",
      render: (id: number) => <span>{id}</span>,
      width: "80px",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (name: string) => <span>{name}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email: string) => <span>{email}</span>,
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      render: (mobile: string) => <span>{mobile}</span>,
    },
    {
      title: "Country Name",
      dataIndex: "country",
      render: (country: string) => <span>{country}</span>,
    },
    {
      title: "State",
      dataIndex: "state",
      render: (state: string) => <span>{state}</span>,
    },
    {
      title: "Action",
      render: (record: UserData) => (
        <div className="d-flex gap-2">
          {/* Mock Activity Button */}
          <button className="btn btn-warning btn-sm text-white">
            <i className="fas fa-book me-1"></i>
            MOCK ACTIVITY
          </button>
          {/* Activity Button */}
          <button className="btn btn-info btn-sm text-white">ACTIVITY</button>
          {/* View Icon */}
          <button className="btn btn-light btn-sm">
            <i className="fas fa-eye text-info"></i>
          </button>
          {/* Edit Icon */}
          <button className="btn btn-light btn-sm">
            <i className="fas fa-edit text-success"></i>
          </button>
          {/* Settings Icon */}
          <button className="btn btn-light btn-sm">
            <i className="fas fa-cog text-warning"></i>
          </button>
          {/* Delete Icon */}
          <button
            className="btn btn-light btn-sm"
            onClick={() => handleDelete(record.id)}
          >
            <i className="fas fa-trash text-danger"></i>
          </button>
        </div>
      ),
      width: "350px",
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6">
              <div className="heading mb-4">
                <h2>Users</h2>
              </div>
            </div>
            <div className="col-md-6">
                <button className="btn btn-primary usrebtn">Add User</button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card p-4">
                <Table
                  key={data.length}
                  dataSource={data}
                  columns={columns}
                  Selection={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
