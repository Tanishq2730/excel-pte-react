import React, { useState, useEffect } from "react";
import Table from "../../core/common/dataTable/index";
import AlertComponent from "../../core/common/AlertComponent";
import {
  fetchAllTypes,
  fetchSubtypesByType,
  getQuestionsByTypeAndSubtype,
} from "../../api/commonAPI";
import { createMockTests } from "../../api/masterAPI";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";

interface Question {
  id: number;
  question_name: string;
  type_id?: number;
  type_name?: string;
  subtype_id?: number;
  subtype_name?: string;
}

const MockTest: React.FC = () => {
  const routes = all_routes;
  const [mockName, setMockName] = useState<string>("");
  const [mainType, setMainType] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [subType, setSubType] = useState<string>("");
  const [types, setTypes] = useState<{ id: number; name: string }[]>([]);
  const [subtypes, setSubtypes] = useState<{ id: number; sub_name: string }[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
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

  // Fetch subtypes on type change
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

  // Fetch questions on type & subtype selection
  useEffect(() => {
    if (!type || !subType) return;
    const loadQuestions = async () => {
      try {
        const res = await getQuestionsByTypeAndSubtype(Number(type), Number(subType));
        if (res.success) {
          const typeName = types.find(t => t.id === Number(type))?.name || "";
          const subtypeName = subtypes.find(s => s.id === Number(subType))?.sub_name || "";

          const enrichedQuestions = res.data.map((q: Question) => ({
            ...q,
            type_id: Number(type),
            type_name: typeName,
            subtype_id: Number(subType),
            subtype_name: subtypeName,
          }));

          // Avoid duplicates
         setQuestions((prev) => {
          const existingIds = new Set(prev.map((q) => q.id));
          const newQs = enrichedQuestions.filter((q: Question) => !existingIds.has(q.id));
          return [...prev, ...newQs];
        });
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    loadQuestions();
  }, [type, subType]);

  // Select/deselect a question
  const handleQuestionSelect = (question: Question, checked: boolean) => {
    setSelectedQuestions((prev) =>
      checked ? [...prev, question] : prev.filter((q) => q.id !== question.id)
    );
  };

  // Save mock test
  const handleSave = async () => {
    if (!mockName || !mainType || selectedQuestions.length === 0) {
      setAlert({
        type: "danger",
        message: "Please fill all required fields and select at least one question.",
      });
      return;
    }

    const formData = {
      name: mockName,
      typeId: mainType,
      questionIds: selectedQuestions.map((q) => q.id),
    };

    try {
      const response = await createMockTests(formData);
      if (response.success) {
        setAlert({ type: "success", message: "Mock Test created successfully!" });

        // Reset
        setMockName("");
        setMainType("");
        setType("");
        setSubType("");
        setQuestions([]);
        setSelectedQuestions([]);
      } else {
        setAlert({ type: "danger", message: "Error creating Mock Test." });
      }
    } catch (error) {
      console.error("Error creating Mock Test:", error);
      setAlert({ type: "danger", message: "Failed to create Mock Test." });
    }
  };

  // Table columns
  const columns = [
    {
      title: "Question Name",
      dataIndex: "question_name",
      key: "question_name",
    },
    {
      title: "Type",
      dataIndex: "type_name",
      key: "type_name",
    },
    {
      title: "Subtype",
      dataIndex: "subtype_name",
      key: "subtype_name",
    },
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (_: any, record: Question) => (
        <input
          type="checkbox"
          checked={selectedQuestions.some((q) => q.id === record.id)}
          onChange={(e) => handleQuestionSelect(record, e.target.checked)}
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
            <Link to={routes.mockList} className="btn btn-primary">
              View Mocktest List
            </Link>
          </div>
        </div>

        {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <div className="container mt-4">
          <div className="card p-4">
            <div className="row">
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

            {/* Questions Table */}
            <div className="mt-4">
              <Table key={questions.length} dataSource={questions} columns={columns} />
            </div>

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
