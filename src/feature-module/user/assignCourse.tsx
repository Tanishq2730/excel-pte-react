import React, { useEffect, useState } from "react";
import Table from "../../core/common/dataTable";
import AlertComponent from "../../core/common/AlertComponent";
import { useLocation } from "react-router-dom";
import { assignPlan, bookingHistory, fetchAllPlans } from "../../api/masterAPI";

interface TableData {
  id: number;
  packageName: string;
  packageType: string;
  duration: string;
  transactionDate: string;
  paymentStatus: string;
  packageStatus: string;
  startDate: string;
  endDate: string;
}

interface PlanData {
  id: number;
  name: string;
  price: string;
  days: number;
  CourseType?: {
    name: string;
  };
}

const AssignCourse: React.FC = () => {
  const location = useLocation();
  const { studentData } = location.state || {};
  const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);
  const [history, setHistory] = useState<TableData[]>([]);
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    if (studentData) {
      loadHistory(studentData);
      fetchPlans();
    }
    // Fetch plans when component mounts
  }, [studentData]);

  const fetchPlans = async () => {
    try {
      const response = await fetchAllPlans();
      console.log(response);

      if (response.success) {
        setPlans(response.data); // ✅ Set API data
      } else {
        setAlert({ type: "danger", message: "Failed to fetch students" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "An error occurred while fetching students" });
    }
  };


  const loadHistory = async (studentData: any) => {
    try {
      const response = await bookingHistory(studentData.id);
      console.log(response);
      
      if (response.success) {
        const transformedData = response.data.map((item: any, index: number) => ({
          key: index + 1,
          id: item.id,
          packageName: item.Plan?.name || "-",
          packageType: item.Plan?.CourseType?.name || "-",
          duration: item.Plan?.days ? `${item.Plan.days} days` : "-",
          transactionDate: new Date(item.createdAt).toLocaleDateString(),
          startDate: new Date(item.startDate).toLocaleDateString(),
          endDate: new Date(item.endDate).toLocaleDateString(),
          paymentStatus: "Paid", // Assuming paid, update if you have status
          packageStatus: item.status || "-",
        }));
        setHistory(transformedData);
      } else {
        setAlert({ type: "danger", message: "Failed to fetch booking history" });
      }
    } catch (error) {
      console.error(error);
      setAlert({ type: "danger", message: "An error occurred while fetching history" });
    }
  };

  const columns = [
    { title: "S. No.", dataIndex: "key", key: "key" },
    { title: "Package Name", dataIndex: "packageName", key: "packageName" },
    { title: "Package Type", dataIndex: "packageType", key: "packageType" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "Transaction Date", dataIndex: "transactionDate", key: "transactionDate" },
    { title: "Start Date", dataIndex: "startDate", key: "startDate" },
    { title: "End Date", dataIndex: "endDate", key: "endDate" },
    { title: "Payment Status", dataIndex: "paymentStatus", key: "paymentStatus" },
    { title: "PACKAGE Status", dataIndex: "packageStatus", key: "packageStatus" },
  ];


  const assignNow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan || !studentData?.id) {
      setAlert({ type: "danger", message: "Please select a plan." });
      return;
    }
  
    setLoading(true);
    if (!startDate || !endDate) {
      setAlert({ type: "danger", message: "Please select start and end dates." });
      return;
    }
  
    const payload = {
      userId: studentData.id,
      planId: selectedPlan.id,
      startDate,
      endDate,
    };
  
    try {
      const response = await assignPlan(payload);
      if (response.success) {
        setAlert({ type: "success", message: "Plan assigned successfully." });
        loadHistory(studentData); // Reload history
        setSelectedPlan(null); // Optionally reset selection
      } else {
        setAlert({ type: "danger", message: response.message || "Failed to assign plan." });
      }
    } catch (error) {
      console.error(error);
      setAlert({ type: "danger", message: "An error occurred while assigning the plan." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>Assign Course Plan</h2>
        </div>

        {/* Alert Component */}
        {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <div className="card p-4">
          <form onSubmit={assignNow}>
            <div className="mb-3">
              <label className="form-label">Change Plan*</label>
              <select
                className="form-control"
                name="plan"
                required
                onChange={(e) => {
                  const selected = plans.find(plan => plan.id === parseInt(e.target.value));
                  setSelectedPlan(selected || null);
                }}
              >
                <option value="">Select Plan</option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Name*</label>
                <input type="text" value={studentData.name} className="form-control" placeholder="Name" readOnly={true} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Email*</label>
                <input type="email" value={studentData.email} className="form-control" placeholder="Email" readOnly={true} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Country</label>
                <input type="text" value={studentData.Country?.name} className="form-control" placeholder="Country" readOnly={true} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">State</label>
                <input type="text" value={studentData.State?.name} className="form-control" placeholder="State" readOnly={true} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Phone*</label>
                <input type="text" value={studentData.mobileNo} className="form-control" placeholder="Phone" readOnly={true} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Start Date*</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => {
                    const start = e.target.value;
                    setStartDate(start);

                    // Auto-calculate end date if plan is selected
                    if (selectedPlan?.days) {
                      const startDt = new Date(start);
                      const endDt = new Date(startDt);
                      endDt.setDate(startDt.getDate() + selectedPlan.days);
                      setEndDate(endDt.toISOString().split("T")[0]);
                    }
                  }}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">End Date*</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Package Name*</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedPlan?.name || ""}
                  placeholder="Select Plan"
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Course Type*</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedPlan?.CourseType?.name || ""}
                  placeholder="Select Plan"
                  readOnly
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Price</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedPlan?.price ? `USD ${selectedPlan.price}` : ""}
                  placeholder="Select Plan"
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Duration*</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedPlan?.days ? `${selectedPlan.days} Days` : ""}
                  placeholder="Select Plan"
                  readOnly
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success">Assign Now</button>
          </form>
        </div>

        <div className="mt-4">
          <Table key={history.length} dataSource={history} columns={columns} Selection={true} />
        </div>
      </div>
    </div>
  );
};

export default AssignCourse;
