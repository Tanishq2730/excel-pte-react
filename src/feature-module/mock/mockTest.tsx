import React, { useState, useEffect } from "react";
import Table from "../../core/common/dataTable/index";
import AlertComponent from "../../core/common/AlertComponent";
import { fetchAllTypes, fetchSubtypesByType, getQuestionsByTypeAndSubtype } from "../../api/commonAPI";
import { createMockTests } from "../../api/masterAPI";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
interface Question {
  id: number;
  question_name: string;
}

const MockTest: React.FC = () => {
  const routes = all_routes;
  const [type, setType] = useState<string>("");
  const [mainType, setMainType] = useState<string>("");
  const [subType, setSubType] = useState<string>("");
  const [mockName, setMockName] = useState<string>("");
  const [types, setTypes] = useState<{ id: number; name: string }[]>([]);
  const [subtypes, setSubtypes] = useState<{ id: number; sub_name: string }[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);

  // Fetch types
  useEffect(() => {
    const loadData = async () => {
      try {
        const typesRes = await fetchAllTypes();
        if (typesRes.success) setTypes(typesRes.data);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };
    loadData();
  }, []);

  // Fetch subtypes when type changes
  useEffect(() => {
    if (!type) return;
    const loadSubtypes = async () => {
      try {
        const res = await fetchSubtypesByType(Number(type));
        if (res.success) setSubtypes(res.data);
      } catch (error) {
        console.error("Error fetching subtypes:", error);
      }
    };
    loadSubtypes();
  }, [type]);

  // Fetch questions when both type and subType are selected
  useEffect(() => {
    if (!type || !subType) return;
    const loadQuestions = async () => {
      try {
        const res = await getQuestionsByTypeAndSubtype(Number(type), Number(subType));
        if (res.success) setQuestions(res.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    loadQuestions();
  }, [type, subType]);

  // Handle Question Selection
  const handleQuestionSelect = (questionId: number, checked: boolean) => {
    setSelectedQuestions((prev) =>
      checked ? [...prev, questionId] : prev.filter((id) => id !== questionId)
    );
  };

  // Handle Save Mock Test
  const handleSave = async () => {
    if (!mockName || !type || !selectedQuestions.length) {
      setAlert({ type: "danger", message: "Please fill all required fields and select at least one question." });
      return;
    }

    const formData = {
      name: mockName,
      typeId: type,
      questionIds: selectedQuestions,
    };

    try {
      const response = await createMockTests(formData);
      if (response.success) {
        setAlert({ type: "success", message: "Mock Test created successfully!" });

        // Reset form after success
        setMockName("");
        setType("");
        setSubType("");
        setSelectedQuestions([]);
        setQuestions([]);
      } else {
        setAlert({ type: "danger", message: "Error creating Mock Test." });
      }
    } catch (error) {
      console.error("Error creating Mock Test:", error);
      setAlert({ type: "danger", message: "Failed to create Mock Test." });
    }
  };

  // Table Columns
  const columns = [
    {
      title: "Question Name",
      dataIndex: "question_name",
      key: "question_name",
    },
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (_: any, record: Question) => (
        <input
          type="checkbox"
          value={record.id}
          checked={selectedQuestions.includes(record.id)}
          onChange={(e) => handleQuestionSelect(record.id, e.target.checked)}
        />
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
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
        {/* ✅ Show AlertComponent when alert is set */}
        {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <div className="container mt-4">
          <div className="card p-4">
            <div className="row">
              {/* Mock Test Type */}
              <div className="col-md-3">
                <label className="form-label">Mock Test Type</label>
                <select className="form-control" value={mainType} onChange={(e) => setMainType(e.target.value)}>
                  <option value="">Select Type</option>
                  {types.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mock Name */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Mock Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mock Name"
                  value={mockName}
                  onChange={(e) => setMockName(e.target.value)}
                />
              </div>
            </div>

            <div className="row mt-3">
              {/* Type Dropdown */}
              <div className="col-md-3">
                <label className="form-label">Type</label>
                <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">Select Type</option>
                  {types.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subtype Dropdown */}
              <div className="col-md-3">
                <label className="form-label">Sub Type</label>
                <select className="form-control" value={subType} onChange={(e) => setSubType(e.target.value)}>
                  <option value="">Select Subtype</option>
                  {subtypes.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.sub_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="mt-4">
              <Table key={questions.length} dataSource={questions} columns={columns} />
            </div>

            {/* Save Button */}
            <div className="mt-3">
              <button className="btn btn-light" onClick={handleSave}>
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockTest;
