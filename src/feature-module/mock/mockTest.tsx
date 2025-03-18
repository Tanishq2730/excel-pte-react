import React, { useState } from "react";
import CommonSelect from "../../core/common/commonSelect";
import Table from "../../core/common/dataTable/index";

// Define Types
interface MockDropOption {
  label: string;
  value: string;
}

interface QuestionData {
  id: number;
  category: string;
  subCategory: string;
  question: string;
}

// Dummy Data
const mockdrop: MockDropOption[] = [
  { label: "All", value: "All" },
  { label: "Speaking", value: "Speaking" },
  { label: "Writing", value: "Writing" },
  { label: "Reading", value: "Reading" },
  { label: "Listening", value: "Listening" },
];

const MockTest: React.FC = () => {
  const [type, setType] = useState<string>("All");
  const [mockName, setMockName] = useState<string>("");

  // Dummy Table Data
  const [data, setData] = useState<QuestionData[]>([
    {
      id: 1,
      category: "Speaking",
      subCategory: "Part 1",
      question: "Introduce yourself.",
    },
    {
      id: 2,
      category: "Writing",
      subCategory: "Task 1",
      question: "Describe the chart.",
    },
    {
      id: 3,
      category: "Listening",
      subCategory: "Section 1",
      question: "Fill in the blanks.",
    },
  ]);

  // Define Table Columns
  const columns = [
    {
      name: "Category",
      selector: (row: QuestionData) => row.category,
      sortable: true,
    },
    {
      name: "Sub Category",
      selector: (row: QuestionData) => row.subCategory,
      sortable: true,
    },
    {
      name: "Question",
      selector: (row: QuestionData) => row.question,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: QuestionData) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  // Handle Save
  const handleSave = () => {
    console.log({ type, mockName });
  };

  // Handle Delete
  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container mt-4">
          {/* Header */}
          <div className="row">
            <div className="col-md-6">
              <div className="heading mb-4">
                <h2>Mock Test</h2>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-end align-items-center">
              <button className="btn btn-primary">View Mocktest List</button>
            </div>
          </div>

          {/* Form Card */}
          <div className="card p-4">
            <div className="row">
              {/* Type Dropdown */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-bold">Type</label>
                  <CommonSelect
                    className="select"
                    options={mockdrop}
                    defaultValue={mockdrop[0]}
                  />
                </div>
              </div>

              {/* Mock Name */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-bold">Mock Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mock Name"
                    value={mockName}
                  />
                </div>
              </div>

              {/* Add Question Button */}
              <div className="col-md-3">
                <button
                  className="btn btn-outline-secondary mb-3"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalLg"
                >
                  ADD QUESTION
                </button>
              </div>

              {/* Save Button */}
              <div className="col-md-3">
                <button className="btn btn-light" onClick={handleSave}>
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <div
          id="exampleModalLg"
          className="modal fade"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="deleteModalLabel">
                  Add Question
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>

              <div className="modal-body py-2">
                <div className="row mb-3">
                  {/* Category */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Category</label>
                    <CommonSelect
                      className="select"
                      options={mockdrop}
                      defaultValue={mockdrop[0]}
                    />
                  </div>

                  {/* Sub Category */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Sub Category</label>
                    <CommonSelect
                      className="select"
                      options={mockdrop}
                      defaultValue={mockdrop[0]}
                    />
                  </div>

                  {/* Table */}
                  <div className="mt-4">
                    <Table
                      dataSource={data}
                      columns={columns}
                      // rowKey="id"
                      Selection={true}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockTest;
