import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPlans, fetchAllPlans,deletePlans,updatePlans,fetcPlansById } from "../../api/masterAPI";
import { getCourseTypes,saveAIclicks,getAIclicks } from "../../api/commonAPI";
import AlertComponent from "../../core/common/AlertComponent";
import Table from "../../core/common/dataTable/index";
import Swal from "sweetalert2";

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
  CourseType: { id: number; name: string }; 
}

interface CourseType {
  id: number;
  name: string;
}

const MembershipPlan: React.FC = () => {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [courseTypes, setCourseTypes] = useState<CourseType[]>([]);
  const [planName, setPlanName] = useState("");
  const [AIclicks, setAIclicks] = useState("");
  const [courseType, setCourseType] = useState("");
  const [durationType, setDurationType] = useState("");
  const [days, setDays] = useState("");
  const [subscription_days, setSubscriptionDays] = useState("");
  const [students, setStudents] = useState("");
  const [mockCount, setMockCount] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Yes");
  const [offer, setOffer] = useState("");
  const [freeTrial, setFreeTrial] = useState("Yes");
  const [extraDetails, setExtraDetails] = useState<string[]>([""]);
  const [image, setImage] = useState<File | null>(null);
  const [alert, setAlert] = useState<{ type: "primary" | "secondary" | "warning" | "danger" | "success"; message: string } | null>(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

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

  const fetchClicks = async () => {
    try {
      const response = await getAIclicks();
      if (response.success) {
        setAIclicks(response.data.clicks);
      } else {
        setAlert({ type: "danger", message: "Failed to fetch membership plans." });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error fetching plans." });
    }
  };
  // ✅ Fetch plans from API
  useEffect(() => {
    
    fetchClicks();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!planName || !courseType || !durationType || !students || !mockCount || !duration || !price) {
      setAlert({ type: "warning", message: "Please fill all required fields." });
      return;
    }
  
    const formData = new FormData();
    formData.append("name", planName);
    formData.append("coursetypeId", courseType);
    formData.append("duration_type", durationType);
    formData.append("students", students);
    formData.append("mockcount", mockCount);
    formData.append("days", days);
    formData.append("subscription_days", subscription_days);
    formData.append("class_duration_type", duration);
    formData.append("price", price);
    formData.append("status", status === "Yes" ? "true" : "false");
    formData.append("offer", offer);
    formData.append("free_trial", freeTrial === "Yes" ? "true" : "false");
  
    if (image) {
      formData.append("image", image);
    }
  
    extraDetails.forEach((detail, index) => {
      formData.append(`planRows[${index}][details]`, detail);
    });
  
    try {
      let response;
      if (editingId) {
        response = await updatePlans(editingId, formData);
      } else {
        response = await createPlans(formData);
      }
  
      if (response.success) {
        setAlert({ type: "success", message: editingId ? "Plan updated successfully!" : "Plan created successfully!" });
        resetForm();
        loadPlans();
      } else {
        setAlert({ type: "danger", message: "Failed to save plan." });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error saving plan." });
    }
  };

  const resetForm = () => {
    setSelectedPlan(null);
    setPlanName("");
    setCourseType("");
    setDurationType("");
    setStudents("");
    setMockCount("");
    setDuration("");
    setDays("");
    setSubscriptionDays("");
    setPrice("");
    setStatus("Yes");
    setOffer("");
    setFreeTrial("Yes");
    setExtraDetails([""]);
    setImage(null);
    setEditingId(null);
  };

  // ✅ Handle Extra Details
  const addExtraDetail = () => setExtraDetails([...extraDetails, ""]);
  const removeExtraDetail = (index: number) => setExtraDetails(extraDetails.filter((_, i) => i !== index));
  const [editingId, setEditingId] = useState<number | null>(null);


  // ✅ Handle Edit
  const handleEdit = async (id: number) => {
    try {
      const response = await fetcPlansById(id);
      if (response.success) {
        const plan = response.data;
        setSelectedPlan(plan);
        setPlanName(plan.name);
        setCourseType(plan.coursetypeId.toString());
        setDurationType(plan.duration_type);
        setStudents(plan.students.toString());
        setMockCount(plan.mockcount.toString());
        setDuration(plan.class_duration_type);
        setDays(plan.days?.toString() || "");
        setSubscriptionDays(plan.subscription_days?.toString() || "");
        setPrice(plan.price.toString());
        setStatus(plan.status ? "Yes" : "No");
        setOffer(plan.offer?.toString() || "");
        setFreeTrial(plan.free_trial ? "Yes" : "No");
        setExtraDetails(plan.PlanRows?.map((row: any) => row.details) || []);
        setImage(null); // Optional: clear image; editing image upload separately is safer
        setEditingId(id); // Store the ID you're editing
      } else {
        setAlert({ type: "danger", message: "Failed to load plan details." });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error loading plan details." });
    }
  };

  // ✅ Handle Delete
  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Call delete API here
        deleteMembershipPlan(id);
      }
    });
  };
  
  const deleteMembershipPlan = async (id: number) => {
    try {
      const response = await deletePlans(id); 
      setAlert({ type: "success", message: "Plan deleted successfully" });
      loadPlans(); // Reload data
    } catch (err) {
      setAlert({ type: "danger", message: "Error Delete plan." });
    }
  };

console.log("Plans:", plans);

   const columns = [
      { title: "Name", dataIndex: "name" }, 
      {
        title: "Course Type",
        render: (row: PlanData) => row.CourseType?.name || "-"
      },
      { title: "Duration Type", dataIndex: "duration_type" }, 
      { title: "Price(Amount in $)", dataIndex: "price" }, 
      {
        title: "Actions",
        render: (row: PlanData) => (
          <div>
            <button className="btn btn-warning btn-sm me-2" data-bs-toggle="modal" data-bs-target="#add_membership" onClick={() => handleEdit(row.id)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ),
      },
    ];

     const handleAISubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
          if (!AIclicks) throw new Error("AI Click are required.");    
          const payload = { clicks: AIclicks}
          const response = await saveAIclicks(payload);         
    
          if (response.success) {
            setAlert({ type: "success", message: "AI Click deleted successfully" });
            setAIclicks("");
            loadPlans(); // Reload data
            fetchClicks(); // Reload AI clicks
          } else {
            throw new Error(response.error);
          }
        } catch (err) {
          setAlert({ type: "danger", message: "Error Delete plan." });
        }
      };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
          <h3 className="page-title mb-1">Membership Plans</h3>
          <div className="d-flex">
            <Link to="#" data-bs-toggle="modal" data-bs-target="#add_membership" className="btn btn-primary mt-2 me-2">
              <i className="ti ti-square-rounded-plus me-2" /> Add Membership
            </Link>
            <Link to="#" data-bs-toggle="modal" data-bs-target="#add_ai_clicks" className="btn btn-primary mt-2 me-2">
              <i className="ti ti-square-rounded-plus me-2" /> Add AI Clicks
            </Link>
          </div>
        </div>

        {/* ✅ Alert Messages */}
        {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <div className="row">
          <Table key={plans.length} dataSource={plans} columns={columns} Selection={true} />
        </div>

        <div className="modal fade" id="add_ai_clicks">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
              <h4 className="modal-title">AI Clicks</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <form onSubmit={handleAISubmit}>
                <div className="modal-body">
                  <div className="row">
                    {/* Plan Name */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">AI Clicks*</label>
                      <input
                        type="number"
                        className="form-control"
                        value={AIclicks}
                        onChange={(e) => setAIclicks(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
              </form>
            </div>
          </div>
        </div>      
        {/* Add Plan Modal */}
        <div className="modal fade" id="add_membership">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
              <h4 className="modal-title">{selectedPlan ? "Edit Plan" : "Add Plan"}</h4>
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
                        <option value="Weekly">Weekly</option>
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

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Days*</label>
                      <input
                        type="number"
                        className="form-control"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Subscription Days*</label>
                      <input
                        type="number"
                        className="form-control"
                        value={subscription_days}
                        onChange={(e) => setSubscriptionDays(e.target.value)}
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
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setImage(e.target.files[0]);
                          }
                        }}
                      />
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
                      {selectedPlan ? "Update Plan" : "Add Plan"}
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
