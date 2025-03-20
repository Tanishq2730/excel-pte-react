import React, { useState } from "react";
import Table from "../../core/common/dataTable/index"; // ✅ Importing Table component

interface AgentData {
  id: number;
  name: string;
  agentCode: string;
  email: string;
  commission: string;
}

const Agent: React.FC = () => {
  // ✅ Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    postalCode: "",
    commission: "",
    password: "",
  });

  // ✅ Handle Input Change in Form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  // ✅ Sample Agent Data
  const [agents, setAgents] = useState<AgentData[]>([
    {
      id: 1,
      name: "Test Agent",
      agentCode: "EPTEE0001",
      email: "agent@excelpte.com",
      commission: "10%",
    },
  ]);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  // ✅ Handle Delete Row
  const handleDelete = () => {
    if (deleteId !== null) {
      setAgents((prev) => prev.filter((agent) => agent.id !== deleteId));
      setDeleteId(null);
    }
  };

  // ✅ Handle Edit Row
  const handleEdit = (id: number) => {
    console.log(`Editing row with id: ${id}`);
  };

  // ✅ Handle Report Row
  const handleReport = (id: number) => {
    console.log(`Generating report for id: ${id}`);
  };

  // ✅ Handle Students Row
  const handleStudents = (id: number) => {
    console.log(`Viewing students for id: ${id}`);
  };

  // ✅ Table Columns for Agent Table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Agent Code",
      dataIndex: "agentCode",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Commission %",
      dataIndex: "commission",
    },
    {
      title: "Action",
      render: (row: AgentData) => (
        <div className="d-flex gap-2">
          {/* ✅ Edit Button */}
          <button
            className="btn btn-light btn-sm"
            onClick={() => handleEdit(row.id)}
          >
            <strong>Edit</strong>
          </button>

          {/* ✅ Report Button */}
          <button
            className="btn btn-warning btn-sm"
            onClick={() => handleReport(row.id)}
          >
            <strong>Report</strong>
          </button>

          {/* ✅ Students Button */}
          <button
            className="btn btn-success btn-sm"
            onClick={() => handleStudents(row.id)}
          >
            <strong>Students</strong>
          </button>

          {/* ✅ Delete Button */}
          <button
            className="btn btn-danger btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            onClick={() => setDeleteId(row.id)}
          >
            <strong>Delete</strong>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>Add Agent</h2>
        </div>

        {/* ✅ Form Code (As it is) */}
        <div className="card p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {Object.keys(formData).map((key) => (
                <div key={key} className="col-md-3 mb-3">
                  <label className="form-label fw-bold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type={key === "password" ? "password" : "text"}
                    className="form-control"
                    name={key}
                    value={formData[key as keyof typeof formData]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </form>
          <div className="mt-5">
            <h3 className="mb-3">Agent Table</h3>
            <Table dataSource={agents} columns={columns} />
          </div>
        </div>

        {/* ✅ Agent Table */}

        {/* ✅ Delete Confirmation Modal */}
        <div
          className="modal fade"
          id="deleteModal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                Are you sure you want to delete this agent?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
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
    </div>
  );
};

export default Agent;
