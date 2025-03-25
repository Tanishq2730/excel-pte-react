import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";

// ✅ Define Types
interface QuizData {
  id: number;
  quizName: string;
  definition: string;
  category: string;
  fromDate: string;
  toDate: string;
  duration: string;
}

const DUMMY_DATA: QuizData[] = [
  {
    id: 1,
    quizName: "Practice 1",
    definition: "Basic English",
    category: "Adjectives",
    fromDate: "2024-12-28",
    toDate: "2025-12-31",
    duration: "2 minutes",
  },
  {
    id: 2,
    quizName: "Practice 2",
    definition: "Grammar Test",
    category: "Preposition Place",
    fromDate: "2025-01-22",
    toDate: "2027-01-22",
    duration: "1 minute",
  },
];

const QuizeList: React.FC = () => {
  const routes = all_routes;
  const [data, setData] = useState<QuizData[]>(DUMMY_DATA);
  const columns = [
    {
      title: "S.No.",
      dataIndex: "id",
      key: "id",
      render: (_: any, __: any, index: number) => index + 1,
    },
    { title: "Quiz Name", dataIndex: "quizName" },
    { title: "Definition", dataIndex: "definition" },
    { title: "Category", dataIndex: "category" },
    { title: "From", dataIndex: "fromDate" },
    { title: "To", dataIndex: "toDate" },
    { title: "Duration", dataIndex: "duration" },
    {
      title: "Actions",
      render: (_: any, record: QuizData) => (
        <>
          <Link to={routes.editQuize} className="btn btn-warning me-2">
            <i className="fa fa-pencil"></i>
          </Link>
          <button
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            // onClick={() => handleDelete(record.id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="heading mb-4">
            <h2>Create Quiz</h2>
          </div>
          <div className="card p-4">
            <div className="mt-4">
              <Table dataSource={data} columns={columns} Selection={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizeList;
