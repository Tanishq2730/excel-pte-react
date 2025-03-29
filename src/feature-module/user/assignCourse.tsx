import React from "react";
import Table from "../../core/common/dataTable/index";
import AlertComponent from "../../core/common/AlertComponent";

const AssignCourse: React.FC = () => {
  const columns = [
    { title: "S. No.", dataIndex: "sno", key: "sno" },
    { title: "Package Name", dataIndex: "packageName", key: "packageName" },
    { title: "Package Type", dataIndex: "packageType", key: "packageType" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "Transaction Date", dataIndex: "transactionDate", key: "transactionDate" },
    { title: "Payment Status", dataIndex: "paymentStatus", key: "paymentStatus" },
    { title: "PACKAGE Status", dataIndex: "packageStatus", key: "packageStatus" },
  ];

  const data = [
    {
      key: "1",
      sno: "1",
      packageName: "3 Day Free Trial",
      packageType: "Subscription",
      duration: <><strong>VIP 3 Day</strong><br/><small>(27 Mar 2025 To 2025-03-29)</small></>,
      transactionDate: "27-03-2025",
      paymentStatus: "Successful",
      packageStatus: <span className="badge bg-success">ACTIVE</span>,
    },
    // Add more dummy data if needed
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>Assign Course Plan</h2>
        </div>

        {/* Alert Component */}
        <AlertComponent type="success" message="Sample message" onClose={() => {}} />

        <div className="card p-4">
          <form>
            <div className="mb-3">
              <label className="form-label">Change Plan*</label>
              <select className="form-control">
                <option>1 Month (Subscription)</option>
              </select>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Name*</label>
                <input type="text" className="form-control" placeholder="Name" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Email*</label>
                <input type="email" className="form-control" placeholder="Email" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Country</label>
                <input type="text" className="form-control" placeholder="Country" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">State</label>
                <input type="text" className="form-control" placeholder="State" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Phone*</label>
                <input type="text" className="form-control" placeholder="Phone" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Postal Code</label>
                <input type="text" className="form-control" placeholder="Postal Code" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Package Name*</label>
                <input type="text" className="form-control" placeholder="1 Month" disabled />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Course Type*</label>
                <input type="text" className="form-control" placeholder="Subscription" disabled />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Price</label>
                <input type="text" className="form-control" placeholder="USD 9.99" disabled />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">VIP Duration*</label>
                <input type="text" className="form-control" placeholder="1 Month" disabled />
              </div>
            </div>

            <button type="submit" className="btn btn-success">Assign Now</button>
          </form>
        </div>

        <div className="mt-4">
          <Table dataSource={data} columns={columns} Selection={true} />
        </div>
      </div>
    </div>
  );
};

export default AssignCourse;
