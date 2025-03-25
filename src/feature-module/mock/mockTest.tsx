import React, { useState } from "react";
import CommonSelect from "../../core/common/commonSelect";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";

// Define Types
interface MockDropOption {
  label: string;
  value: string;
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
  const routes = all_routes;
  const [type, setType] = useState<string>("All");
  const [mockName, setMockName] = useState<string>("");

  // Handle Save
  const handleSave = () => {
    console.log({ type, mockName });
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
              <Link to={routes.mockList} className="btn btn-primary">View Mocktest List</Link>
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
