import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";

interface StudyData {
  id: number;
  category: string;
  subCategory: string;
  questionNumbers: number;
}

const DUMMY_DATA: StudyData[] = [
  { id: 895, category: "speaking", subCategory: "Read Aloud", questionNumbers: 10 },
  { id: 896, category: "speaking", subCategory: "Answer Short Question", questionNumbers: 10 },
  { id: 897, category: "speaking", subCategory: "Re-tell Lecture", questionNumbers: 5 },
  { id: 898, category: "speaking", subCategory: "Describe image", questionNumbers: 10 },
  { id: 899, category: "reading", subCategory: "Reading and writing-Fill in the blanks", questionNumbers: 15 },
];

const StudyPlan: React.FC = () => {
  const [data, setData] = useState<StudyData[]>(DUMMY_DATA);

  // ✅ Handle Change in Question Numbers
  const handleQuestionNumberChange = (id: number, value: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, questionNumbers: value } : item
      )
    );
  };

  // ✅ Table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (category: string) => (
        <input
          type="text"
          className="form-control"
          value={category}
          readOnly
          style={{ backgroundColor: "#d3d3d3" }}
        />
      ),
    },
    {
      title: "Sub Category",
      dataIndex: "subCategory",
      render: (subCategory: string) => (
        <input
          type="text"
          className="form-control"
          value={subCategory}
          readOnly
          style={{ backgroundColor: "#d3d3d3" }}
        />
      ),
    },
    {
      title: "Question Numbers",
      dataIndex: "questionNumbers",
      render: (value: number, row: StudyData) => (
        <input
          type="number"
          className="form-control"
          value={value}
          onChange={(e) =>
            handleQuestionNumberChange(row.id, Number(e.target.value))
          }
        />
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>Study Plan</h2>
        </div>
        <div className="card p-4">
          {/* ✅ Date Filters */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label fw-bold">Select Date:</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">From Date:</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">To Date:</label>
              <input type="date" className="form-control" />
            </div>
          </div>
          <div className="mb-3 text-start">
            <button className="btn btn-dark">FILTER</button>
          </div>

          {/* ✅ Table */}
          <div className="mt-4">
            <Table dataSource={data} columns={columns} Selection={true}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;
