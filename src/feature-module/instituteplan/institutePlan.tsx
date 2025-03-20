import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";

interface RangeData {
  id: number;
  start: string;
  end: string;
}

const InstitutePlan: React.FC = () => {
  const [planName, setPlanName] = useState<string>("");
  const [planType, setPlanType] = useState<string>("");
  const [ranges, setRanges] = useState<RangeData[]>([]);

  // ✅ Add Row
  const handleAddRow = () => {
    const newRow: RangeData = {
      id: Date.now(),
      start: "",
      end: "",
    };
    setRanges((prev) => [...prev, newRow]);
  };

  // ✅ Remove Row
  const handleRemoveRow = (id: number) => {
    setRanges((prev) => prev.filter((row) => row.id !== id));
  };

  // ✅ Handle Input Change in Table
  const handleChange = (id: number, field: keyof RangeData, value: string) => {
    setRanges((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  // ✅ Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ planName, planType, ranges });
  };
  const data = [
    {
      id: 1,
      planName: "Basic Plan",
      planType: "Monthly",
      ranges: "1-10",
    },
    {
      id: 2,
      planName: "Premium Plan",
      planType: "Yearly",
      ranges: "11-20",
    },
  ];

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Plan Name",
      dataIndex: "planName",
    },
    {
      title: "Plan Type",
      dataIndex: "planType",
    },
    {
      title: "Ranges",
      dataIndex: "ranges",
    },
    {
      title: "Actions",
      render: () => <button className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>,
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>Add Institutes List</h2>
        </div>
        <div className="card p-4">
          <form onSubmit={handleSubmit}>
            {/* ✅ Plan Name */}
            <div className="mb-3">
              <label className="form-label">Plan Name</label>
              <input
                type="text"
                className="form-control"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                required
              />
            </div>

            {/* ✅ Plan Type */}
            <div className="mb-3">
              <label className="form-label">Plan Type</label>
              <select
                className="form-control"
                value={planType}
                onChange={(e) => setPlanType(e.target.value)}
                required
              >
                <option value="">Select Plan Type</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            {/* ✅ Ranges Section */}
            <div className="mb-3">
              <h5>
                Ranges{" "}
                <button
                  type="button"
                  className="btn btn-dark btn-sm ms-2"
                  onClick={handleAddRow}
                >
                  + ADD
                </button>
              </h5>
              <table className="table table-bordered mt-3">
                <thead className="table-info">
                  <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ranges.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={row.start}
                          onChange={(e) =>
                            handleChange(row.id, "start", e.target.value)
                          }
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={row.end}
                          onChange={(e) =>
                            handleChange(row.id, "end", e.target.value)
                          }
                          required
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleRemoveRow(row.id)}
                        >
                          REMOVE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ Submit Button */}
            <button type="submit" className="btn btn-primary">
              SUBMIT
            </button>
          </form>
          <div className="mt-3">
            <Table dataSource={data} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutePlan;
