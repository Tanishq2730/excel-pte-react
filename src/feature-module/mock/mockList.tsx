import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";

// ✅ Define Types
interface QuizData {
  id: number;
  mockName: string;
  type: string;
  mockTestType: string;
}

const DUMMY_DATA: QuizData[] = [
  {
    id: 1,
    mockName: "Writing Mock Test 34",
    type: "Writing",
    mockTestType: "PTE Academic",
  },
  {
    id: 2,
    mockName: "Writing Mock Test 45",
    type: "Writing",
    mockTestType: "PTE Core",
  },
];

const MockList: React.FC = () => {
  const routes = all_routes;
  const [data, setData] = useState<QuizData[]>(DUMMY_DATA);
  const columns = [
    {
      title: "S.No.",
      dataIndex: "id",
      key: "id",
      render: (_: any, __: any, index: number) => index + 1,
    },
    { title: "Mock Name", dataIndex: "mockName" },
    { title: "Type", dataIndex: "type" },
    { title: "Mock Test Type", dataIndex: "mockTestType" },
    {
      title: "Actions",
      render: (_: any, record: QuizData) => (
        <>
          <Link to="" className="btn btn-warning me-2">
            <i className="fa fa-pencil"></i>
          </Link>
          <Link to="" className="btn btn-info me-2">
            <i className="fa fa-eye"></i>
          </Link>
          <Link to="" className="btn btn-primary me-2">
            <i className="fa fa-plus"></i>
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
            <h2>Mock Test List</h2>
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

export default MockList;
