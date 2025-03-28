import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPlans, fetchAllPlans } from "../../api/masterAPI";
import { getCourseTypes } from "../../api/commonAPI";
import AlertComponent from "../../core/common/AlertComponent";

interface PlanData {
  id: number;
  name: string;
  coursetypeId: number;
  duration_type: string;
  students: number;
  days: number;
  class_duration_type: string;
  subscription_days: number;
  mockcount: number;
  price: number;
  status: boolean;
  image_url: string;
  offer: number;
  free_trial: boolean;
  PlanRows: { id: number; planId: number; details: string }[];
}

interface CourseType {
  id: number;
  name: string;
}

const MembershipPlan: React.FC = () => {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [courseTypes, setCourseTypes] = useState<CourseType[]>([]);
  const [planName, setPlanName] = useState("");
  const [courseType, setCourseType] = useState("");
  const [durationType, setDurationType] = useState("");
  const [students, setStudents] = useState("");
  const [mockCount, setMockCount] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Yes");
  const [offer, setOffer] = useState("");
  const [freeTrial, setFreeTrial] = useState("Yes");
  const [extraDetails, setExtraDetails] = useState<string[]>([""]);
  const [alert, setAlert] = useState<{ type: "primary" | "secondary" | "warning" | "danger" | "success"; message: string } | null>(null);


  // ✅ Fetch plans from API
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const response = await fetchAllPlans();
        if (response.success) {
          setPlans(response.data);
        } else {
          setAlert({ type: "danger", message: "Failed to fetch membership plans." });
        }
      } catch (error) {
        setAlert({ type: "danger", message: "Error fetching plans." });
      }
    };

    loadPlans();
  }, []);

  // ✅ Fetch course types from API
  useEffect(() => {
    const loadCourseTypes = async () => {
      try {
        const response = await getCourseTypes();
        if (response.success) {
          setCourseTypes(response.data);
        } else {
          setAlert({ type: "danger", message: "Failed to fetch course types." });
        }
      } catch (error) {
        setAlert({ type: "danger", message: "Error fetching course types." });
      }
    };

    loadCourseTypes();
  }, []);

  // ✅ Handle Adding a New Plan
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!planName || !courseType || !durationType || !students || !mockCount || !duration || !price) {
      setAlert({ type: "warning", message: "Please fill all required fields." });
      return;
    }
  
    const newPlan = {
      name: planName,
      coursetypeId: Number(courseType),
      duration_type: durationType,
      students: Number(students),
      mockcount: Number(mockCount),
      class_duration_type: duration,
      price: Number(price),
      status: status === "Yes",
      offer: Number(offer),
      free_trial: freeTrial === "Yes",
      planRows: extraDetails.map((detail) => ({ details: detail })),
    };
  
    try {
      const response = await createPlans(newPlan);
      if (response.success) {
        setAlert({ type: "success", message: "Plan created successfully!" });
  
        // ✅ Reset all form fields
        setPlanName("");
        setCourseType("");
        setDurationType("");
        setStudents("");
        setMockCount("");
        setDuration("");
        setPrice("");
        setStatus("Yes");
        setOffer("");
        setFreeTrial("Yes");
        setExtraDetails([""]);
  
        // ✅ Refresh the plans list
        setPlans([...plans, response.data]);
      } else {
        setAlert({ type: "danger", message: "Failed to create plan." });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error creating plan." });
    }
  };

  // ✅ Handle Extra Details
  const addExtraDetail = () => setExtraDetails([...extraDetails, ""]);
  const removeExtraDetail = (index: number) => setExtraDetails(extraDetails.filter((_, i) => i !== index));

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
          <h3 className="page-title mb-1">Membership Plans</h3>
          <div className="d-flex">
            <Link to="#" data-bs-toggle="modal" data-bs-target="#add_membership" className="btn btn-primary">
              <i className="ti ti-square-rounded-plus me-2" /> Add Membership
            </Link>
          </div>
        </div>

        {/* ✅ Alert Messages */}
        {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <div className="row">
          {plans.map((plan) => (
            <div key={plan.id} className="col-lg-4 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <div className="border-bottom mb-3">
                    <span className="badge bg-info mb-3">{plan.name}</span>
                    <h3 className="mb-3">Plan for {plan.students} students</h3>
                  </div>
                  <div>
                    <div className="bg-light-300 p-3 rounded-1 text-center mb-3">
                      <h2>
                        ${plan.price}
                        <span className="text-gray-7 fs-14 fw-normal"> /{plan.duration_type}</span>
                      </h2>
                    </div>
                    <ul className="list-unstyled gap-3">
                      {plan.PlanRows.map((row) => (
                        <li key={row.id} className="mb-3">
                          <div className="d-flex align-items-center">
                            <span className="text-success me-2">
                              <i className="ti ti-circle-check-filled fs-15 align-middle" />
                            </span>
                            <div>{row.details}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <Link to="#" className="btn btn-primary w-100">Choose Plan</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Plan Modal */}
        <div className="modal fade" id="add_membership">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Plan</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    {/* Plan Name */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Plan Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        value={planName}
                        onChange={(e) => setPlanName(e.target.value)}
                        required
                      />
                    </div>

                    {/* Course Type */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Course Type*</label>
                      <div className="d-flex">
                        <select
                          className="form-control"
                          value={courseType}
                          onChange={(e) => setCourseType(e.target.value)}
                          required
                        >
                          <option value="">Select Course Type</option>
                          {courseTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.name}
                            </option>
                          ))}
                        </select>
                        <button type="button" className="btn btn-success ms-2">
                          +
                        </button>
                      </div>
                    </div>

                    {/* Duration Type & Students */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Duration Type*</label>
                      <select
                        className="form-control"
                        value={durationType}
                        onChange={(e) => setDurationType(e.target.value)}
                        required
                      >
                        <option value="">Select Duration Type</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Total Students*</label>
                      <input
                        type="number"
                        className="form-control"
                        value={students}
                        onChange={(e) => setStudents(e.target.value)}
                        required
                      />
                    </div>

                    {/* Mock Count & Duration */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Total Mock</label>
                      <input
                        type="number"
                        className="form-control"
                        value={mockCount}
                        onChange={(e) => setMockCount(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Class Duration</label>
                      <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </div>

                    {/* Price & Status */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price*</label>
                      <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="Yes">Active</option>
                        <option value="No">Inactive</option>
                      </select>
                    </div>

                    {/* Offer & Free Trial */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Offer (%)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={offer}
                        onChange={(e) => setOffer(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">3 Days Free Trial</label>
                      <select
                        className="form-control"
                        value={freeTrial}
                        onChange={(e) => setFreeTrial(e.target.value)}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    {/* Image Upload */}
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Upload Image</label>
                      <input type="file" className="form-control" />
                    </div>

                    {/* Extra Details */}
                    <div className="col-md-12">
                      <label className="form-label">Extra Details</label>
                      <button type="button" className="btn btn-success ms-2" onClick={addExtraDetail}>
                        +
                      </button>
                      {extraDetails.map((_, index) => (
                        <div key={index} className="d-flex mt-2">
                          <input
                            type="text"
                            className="form-control"
                            value={extraDetails[index]}
                            onChange={(e) => {
                              const newDetails = [...extraDetails];
                              newDetails[index] = e.target.value;
                              setExtraDetails(newDetails);
                            }}
                          />
                          <button type="button" className="btn btn-danger ms-2" onClick={() => removeExtraDetail(index)}>
                            x
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="modal-footer">
                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Plan
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPlan;
