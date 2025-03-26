// src/feature-module/question/Question.tsx
import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";

interface QuestionData {
  id: number;
  topic: string;
  type: string;
  name: string;
  imageType: string;
  questionType: string;
  questionName: string;
}

const Question: React.FC = () => {
  const routes = all_routes;
  const [questions, setQuestions] = useState<QuestionData[]>([
    {
      id: 1,
      topic: "Practice",
      type: "Writing",
      name: "Write Essay",
      imageType: "N.A.",
      questionType: "Real Question",
      questionName: "Do you agree that genetically modified foods are safe for consumption?",
    },
    {
      id: 2,
      topic: "Practice",
      type: "Writing",
      name: "Write Essay",
      imageType: "N.A.",
      questionType: "Real Question",
      questionName: "Do you agree that social networks should regulate false news more strictly?",
    },
  ]);

  // ✅ Add Question
  const handleAddQuestion = (newQuestion: QuestionData) => {
    setQuestions((prev) => [...prev, newQuestion]);
  };

  // ✅ Edit Function
  const handleEdit = (id: number) => {
    console.log(`Edit record with id: ${id}`);
  };

  // ✅ Delete Function
  const handleDelete = (id: number) => {
    setQuestions((prev) => prev.filter((rec) => rec.id !== id));
  };

  // ✅ Table Headers
  const columns = [
    { title: "S.No.", dataIndex: "id", key: "id", render: (_: any, __: any, index: number) => index + 1 },
    { title: "Topic", dataIndex: "topic", key: "topic" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Image Type", dataIndex: "imageType", key: "imageType" },
    { title: "Question Type", dataIndex: "questionType", key: "questionType" },
    { title: "Question Name", dataIndex: "questionName", key: "questionName" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: QuestionData) => (
        <div>
          <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(record.id)}>Edit</button>
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(record.id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
          <div className="my-auto mb-2">
            <h3 className="page-title mb-1">Questions</h3>
            <nav>
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link to={routes.adminDashboard}>Dashboard</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="#">Questions</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Questions List
                </li>
              </ol>
            </nav>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            {/* <TooltipOption /> */}
            <div className="mb-2">
              <Link
                to={routes.questionAdd}
                className="btn btn-primary d-flex align-items-center"
              >
                <i className="ti ti-square-rounded-plus me-2" />
                Add Question
              </Link>
            </div>
          </div>
        </div>

        {/* ✅ Question List */}
        <div className="card p-4 mt-4">
          <h2>Question List</h2>
          <Table key={questions.length} dataSource={questions} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Question;
