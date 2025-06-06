import React, { useEffect, useState } from "react";
import Table from "../../core/common/dataTable/index";
import {
  createCoupon,
  fetchAllCoupons,
  deleteCoupons,
  updateCoupons,
  fetcCouponsById,
  fetchAllPlans
} from "../../api/masterAPI"; // Update path
import { getCourseTypes } from "../../api/commonAPI";
import AlertComponent from "../../core/common/AlertComponent";

interface CouponFormData {
  coupon_code: string;
  course_type_id: number | "";
  plan_id: number | "";
  start_date: string;
  end_date: string;
  usage_limit: number | "";
  value: number | "";
  discount_type: string;
  status: string;
}

interface CouponRow {
  id: number;
  coupon_code: string;
  course_type_id: number;
  plan_id: number;
  start_date: string;
  end_date: string;
  usage_limit: number;
  value: number;
  discount_type: string;
  status: string;
  createdAt: string;
  CourseType: {
    id: number;
    name: string;
  };
  Plan: {
    id: number;
    name: string;
  };
}

const DiscountCoupon: React.FC = () => {
  const [formData, setFormData] = useState<CouponFormData>({
    coupon_code: "",
    course_type_id: "",
    plan_id: "",
    start_date: "",
    end_date: "",
    usage_limit: "",
    value: "",
    discount_type: "",
    status: "active",
  });

  const [coupons, setCoupons] = useState<CouponRow[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [courseTypes, setCourseTypes] = useState<{ id: number; name: string }[]>([]);
  const [plans, setPlans] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


 useEffect(() => {
  getCoupons();
  getCourseTypeList();
  getPlanList();
}, []);

const getCourseTypeList = async () => {
  try {
    const res = await getCourseTypes();
    if (res.success) {
      setCourseTypes(res.data);
    }
  } catch (error) {
    console.error("Course Type fetch error", error);
  }
};

const getPlanList = async () => {
  try {
    const res = await fetchAllPlans();
    if (res.success) {
      setPlans(res.data);
    }
  } catch (error) {
    console.error("Plan fetch error", error);
  }
};

  const getCoupons = async () => {
    try {
      const res = await fetchAllCoupons();
      if (res.success) {        
        setCoupons(res.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("_id") || name === "usage_limit" || name === "value"
        ? (value === "" ? "" : parseInt(value))
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    let response;
    if (isEditMode && editId !== null) {
      response = await updateCoupons(editId, formData);
    } else {
      response = await createCoupon(formData);
    }

    if (response.success) {
      setSuccess(response.message || (isEditMode ? "Coupon updated successfully." : "Coupon created successfully."));
      setError(null);
      resetForm();
      getCoupons();
    } else {
      const errorMsg = response.message || response.error || "Failed to save coupon.";
      setError(errorMsg);
      setSuccess(null);
    }
  } catch (err: any) {
    setError("An unexpected error occurred.");
    setSuccess(null);
  }
};

  const handleEditCoupon = async (id: number) => {
    try {
      const res = await fetcCouponsById(id);
      if (res.success) {
        const data = res.data;
        setFormData({
          coupon_code: data.coupon_code,
          course_type_id: data.course_type_id,
          plan_id: data.plan_id,
          start_date: data.start_date?.split("T")[0],
          end_date: data.end_date?.split("T")[0],
          usage_limit: data.usage_limit,
          value: data.value,
          discount_type: data.discount_type,
          status: data.status,
        });
        setEditId(data.id);
        setIsEditMode(true);
      }
    } catch (err) {
      console.error("Edit fetch error:", err);
    }
  };

  const handleDeleteCoupon = async (id: number) => {
  try {
    const res = await deleteCoupons(id);
    if (res.success) {
      setSuccess(res.message || "Coupon deleted successfully.");
      setError(null);
      getCoupons();
    } else {
      setError(res.message || res.error || "Failed to delete coupon.");
      setSuccess(null);
    }
  } catch (err) {
    setError("An unexpected error occurred while deleting.");
    setSuccess(null);
  }
};

  const resetForm = () => {
    setFormData({
      coupon_code: "",
      course_type_id: "",
      plan_id: "",
      start_date: "",
      end_date: "",
      usage_limit: "",
      value: "",
      discount_type: "",
      status: "active",
    });
    setIsEditMode(false);
    setEditId(null);
  };

  const columns = [
    { title: "S.No", dataIndex: "id" },
    { title: "Coupon Code", dataIndex: "coupon_code" },
    { title: "Course Type", render: (_: any, row: CouponRow) => row.CourseType?.name || "-" },
    { title: "Plan", render: (_: any, row: CouponRow) => row.Plan?.name || "-" },
    { title: "Start Date", render: (_: any, row: CouponRow) => row.start_date?.split("T")[0] },
    { title: "End Date", render: (_: any, row: CouponRow) => row.end_date?.split("T")[0] },
    { title: "Usage Limit", dataIndex: "usage_limit" },
    { title: "Value", dataIndex: "value" },
    { title: "Discount Type", dataIndex: "discount_type" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Action",
      render: (_: any, record: CouponRow) => (
        <div>
          <button
            className="btn btn-info btn-sm me-2"
            onClick={() => handleEditCoupon(record.id)}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDeleteCoupon(record.id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
       {error && <AlertComponent type="danger" message={error} onClose={() => setError(null)} />}
        {success && <AlertComponent type="success" message={success} onClose={() => setSuccess(null)} />}
      <div className="content">
        <h2 className="mb-4">{isEditMode ? "Edit Coupon" : "Create Coupon"}</h2>
        <form onSubmit={handleSubmit} className="card p-4">
          <div className="row">
            <div className="col-md-6">
              <label>Coupon Code *</label>
              <input
                type="text"
                name="coupon_code"
                value={formData.coupon_code}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label>Course Type *</label>
             <select
                name="course_type_id"
                value={formData.course_type_id}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select Course</option>
                {courseTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mt-3">
              <label>Plan *</label>
              <select
                name="plan_id"
                value={formData.plan_id}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select Plan</option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mt-3">
              <label>Start Date *</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mt-3">
              <label>End Date *</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mt-3">
              <label>Usage Limit</label>
              <input
                type="number"
                name="usage_limit"
                value={formData.usage_limit}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6 mt-3">
              <label>Value *</label>
              <input
                type="number"
                name="value"
                value={formData.value}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mt-3">
              <label>Discount Type *</label>
              <select
                name="discount_type"
                value={formData.discount_type}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select Type</option>
                <option value="percentage">Percentage</option>
                <option value="flat">Flat</option>
              </select>
            </div>
            <div className="col-md-6 mt-3">
              <label>Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <button className="btn btn-primary mt-4" type="submit">
            {isEditMode ? "Update" : "Create"}
          </button>
        </form>

        <div className="mt-4">
          <Table key={coupons.length} dataSource={coupons} columns={columns} Selection={false} />
        </div>
      </div>
    </div>
  );
};

export default DiscountCoupon;
