import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";

interface CouponData {
  id: number;
  couponCode: string;
  courseType: string;
  plan: string;
  startDate: string;
  endDate: string;
  usageLimit: string;
  amount: string;
  discountType: string;
  createdAt: string;
  status: string;
}

const DiscountCoupon: React.FC = () => {
  const [formData, setFormData] = useState({
    couponCode: "",
    courseType: "",
    plan: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
    amount: "",
    discountType: "",
    status: "Active",
  });

  const [coupons, setCoupons] = useState<CouponData[]>([
    {
      id: 1,
      couponCode: "DISC10",
      courseType: "Subscription",
      plan: "Plan A",
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      usageLimit: "100",
      amount: "10",
      discountType: "Percentage",
      createdAt: "2024-03-21 10:00:00",
      status: "Active",
    },
    {
      id: 2,
      couponCode: "FLAT50",
      courseType: "Mock Test",
      plan: "Plan B",
      startDate: "2024-03-05",
      endDate: "2024-04-01",
      usageLimit: "50",
      amount: "50",
      discountType: "Flat Amount",
      createdAt: "2024-03-21 11:00:00",
      status: "Inactive",
    },
  ]);

  const [idCounter, setIdCounter] = useState(3);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    setCoupons([...coupons, { id: idCounter, ...formData, createdAt }]);
    setIdCounter(idCounter + 1);
    setFormData({
      couponCode: "",
      courseType: "",
      plan: "",
      startDate: "",
      endDate: "",
      usageLimit: "",
      amount: "",
      discountType: "",
      status: "Active",
    });
  };

  const columns = [
    { title: "S.No", dataIndex: "id" },
    { title: "Coupon Code", dataIndex: "couponCode" },
    { title: "Course Type", dataIndex: "courseType" },
    { title: "Plan", dataIndex: "plan" },
    { title: "Start Date", dataIndex: "startDate" },
    { title: "End Date", dataIndex: "endDate" },
    { title: "Usage Limit", dataIndex: "usageLimit" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Discount Type", dataIndex: "discountType" },
    { title: "CreatedAt", dataIndex: "createdAt" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: CouponData) => (
        <div>
          <button
            className="btn btn-info btn-sm me-2"
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            className="btn btn-danger btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
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
          <h2>Add Discount Coupon</h2>
        </div>

        <div className="card p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <label>Coupon Code *</label>
                <input
                  type="text"
                  className="form-control"
                  name="couponCode"
                  value={formData.couponCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label>Course Type *</label>
                <select
                  className="form-control"
                  name="courseType"
                  value={formData.courseType}
                  onChange={handleChange}
                  required
                >
                  <option>Select Course Type</option>
                  <option>Subscription</option>
                  <option>Mock Test</option>
                </select>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label>Plans *</label>
                <select
                  className="form-control"
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  required
                >
                  <option>Select Plan</option>
                  <option>Plan A</option>
                  <option>Plan B</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>Start Date *</label>
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label>End Date *</label>
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label>
                  Usage Limit{" "}
                  <span className="text-muted">
                    (Leave Empty if{" "}
                    <span className="text-primary">unlimited</span>)
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="usageLimit"
                  value={formData.usageLimit}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label>Amount *</label>
                <input
                  type="text"
                  className="form-control"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label>Discount Type *</label>
                <select
                  className="form-control"
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleChange}
                  required
                >
                  <option>Select Discount Type</option>
                  <option>Percentage</option>
                  <option>Flat Amount</option>
                </select>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label>Status *</label>
                <select
                  className="form-control"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              CREATE
            </button>
          </form>

          {/* DataTable */}
          <div className="mt-4">
            <Table key={coupons.length} dataSource={coupons} columns={columns} Selection={true}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountCoupon;
