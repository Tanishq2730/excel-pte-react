import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";

interface CourseData {
  id: number;
  planName: string;
  classType: string;
  totalStudent: string;
  duration: string;
  price: string;
  status: string;
}
const CourseMaster: React.FC = () => {
  const [extraDetails, setExtraDetails] = useState<string[]>([""]);
  // const [data, setData] = useState<CourseData[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [data, setData] = useState<CourseData[]>([
    {
      id: 1,
      planName: "1 Month",
      classType: "Subscription",
      totalStudent: "1",
      duration: "1 Month",
      price: "9.99",
      status: "Active",
    },
    {
      id: 2,
      planName: "1 Mock Test",
      classType: "Mock Test",
      totalStudent: "1",
      duration: "1 Week",
      price: "4.99",
      status: "Active",
    },
  ]);

  const addExtraDetail = () => {
    setExtraDetails([...extraDetails, ""]);
  };

  const removeExtraDetail = (index: number) => {
    setExtraDetails(extraDetails.filter((_, i) => i !== index));
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const handleDeleteConfirm = () => {
    if (deleteId !== null) {
      setData((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  const columns = [
    { title: "S.No", dataIndex: "id" },
    { title: "Plan Name", dataIndex: "planName" },
    { title: "Class Type", dataIndex: "classType" },
    { title: "Total Student", dataIndex: "totalStudent" },
    { title: "Duration", dataIndex: "duration" },
    { title: "Price", dataIndex: "price" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Action",
      render: (_: any, record: CourseData) => (
        <button className="btn btn-primary">Edit</button>
      ),
    },
  ];
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>Create Course</h2>
        </div>

        <div className="card p-4">
          <form>
            <div className="row">
              <div className="col-md-6">
                <label>Plan Name*</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label>Course Type*</label>
                <div className="d-flex">
                  <select className="form-control">
                    <option>Select Course Type</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success ms-2"
                    data-bs-toggle="modal"
                    data-bs-target="#standard-modal"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label>Duration Type*</label>
                <select className="form-control">
                  <option>Select Duration Type</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>Total Student</label>
                <input type="text" className="form-control" />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label>Total Mock</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label>Duration</label>
                <input type="text" className="form-control" />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label>Price</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label>Status</label>
                <select className="form-control">
                  <option>Select Duration Type</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label>Offer</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label>3 Days Free Trial</label>
                <select className="form-control">
                  <option>Select Duration Type</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <label>Image</label>
                <input type="file" className="form-control" />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <label>Extra Details</label>
                <button
                  type="button"
                  className="btn btn-success ms-2"
                  onClick={addExtraDetail}
                >
                  +
                </button>
                {extraDetails.map((_, index) => (
                  <div key={index} className="d-flex mt-2">
                    <input type="text" className="form-control" />
                    <button
                      type="button"
                      className="btn btn-danger ms-2"
                      onClick={() => removeExtraDetail(index)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              CREATE
            </button>
          </form>
          <div className="mt-4">
            <Table key={data.length} dataSource={data} columns={columns} />
          </div>
        </div>
        <div
          id="standard-modal"
          className="modal fade"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="standard-modalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="standard-modalLabel">
                Add Course Type
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body py-5">
                <label>Course Type Name</label>
                <input
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary mr-3"
                  data-bs-dismiss="modal"
                  style={{ marginRight: "1em" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseMaster;
