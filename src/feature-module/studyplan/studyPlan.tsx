import React, { useEffect, useState } from "react";
import { fetchAllTypes } from "../../api/commonAPI";
import { createStudyPlans } from "../../api/masterAPI";
import AlertComponent from "../../core/common/AlertComponent";

interface StudyData {
  id?: number;
  category: string;
  subCategory: string;
  questionNumbers: number;
  typeId: number;
}

const StudyPlan: React.FC = () => {
  const [data, setData] = useState<StudyData[]>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [alert, setAlert] = useState<{ type: "primary" | "secondary" | "warning" | "danger" | "success"; message: string } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchAllTypes();
        if (response.success) {
          const transformedData: StudyData[] = response.data.flatMap((category: any) =>
            category.Subtypes.map((sub: any) => ({
              id: sub.id,
              typeId: category.id, // Required for submission
              category: category.name,
              subCategory: sub.sub_name,
              questionNumbers: 10, // Default value
            }))
          );
          setData(transformedData);
        }
      } catch (error) {
        setAlert({ type: "danger", message: "Error fetching study data." });
        console.error("Error fetching study data:", error);
      }
    };

    loadData();
  }, []);

  const handleQuestionNumberChange = (id: number, value: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, questionNumbers: value } : item
      )
    );
  };

  const handleSubmit = async () => {
    if (!fromDate || !toDate) {
      setAlert({ type: "warning", message: "Please select a valid From Date and To Date before submitting." });
      return;
    }

    const studyPlans = data.map((item) => ({
      id: item.id || undefined,
      typeId: item.typeId,
      sub_type_id: item.id,
      question_numbers: item.questionNumbers,
    }));

    const payload = { global_date_from: fromDate, global_date_to: toDate, study_plans: studyPlans }
    try {
      const response = await createStudyPlans(payload);

      if (response.success) {
        setAlert({ type: "success", message: "Study plans saved successfully!" });
      } else {
        setAlert({ type: "danger", message: "Failed to save study plan." });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error submitting study plan." });
      console.error("Error submitting study plan:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>Study Plan</h2>
        </div>

        {/* Alert Component */}
        {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <div className="card p-4">
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label fw-bold">From Date:</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">To Date:</label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 text-start">
            <button className="btn btn-dark mt-3">FILTER</button>
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>

          <div className="mt-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>Question Numbers</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={item.category}
                        readOnly
                        style={{ backgroundColor: "#d3d3d3" }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={item.subCategory}
                        readOnly
                        style={{ backgroundColor: "#d3d3d3" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={item.questionNumbers}
                        onChange={(e) =>
                          handleQuestionNumberChange(item.id ?? 0, Number(e.target.value))
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>           
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;
