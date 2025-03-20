import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";

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

const Quize: React.FC = () => {
  const [quizName, setQuizName] = useState<string>("");
  const [definition, setDefinition] = useState<string>("");
  const [category, setCategory] = useState<string>("Adjectives");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  // ✅ State for Questions
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctOption: "" },
  ]);

  const [data, setData] = useState<QuizData[]>(DUMMY_DATA);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // ✅ Handle Add Question
  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { question: "", options: ["", "", "", ""], correctOption: "" },
    ]);
  };

  // ✅ Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editId !== null) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editId
            ? {
                id: editId,
                quizName,
                definition,
                category,
                fromDate,
                toDate,
                duration,
              }
            : item
        )
      );
      setEditId(null);
    } else {
      const newData: QuizData = {
        id: data.length + 1,
        quizName,
        definition,
        category,
        fromDate,
        toDate,
        duration,
      };
      setData((prev) => [...prev, newData]);
    }

    // ✅ Reset Form
    setQuizName("");
    setDefinition("");
    setCategory("Adjectives");
    setFromDate("");
    setToDate("");
    setDuration("");
    setQuestions([
      { question: "", options: ["", "", "", ""], correctOption: "" },
    ]);
  };

  // ✅ Handle Edit
  const handleEdit = (record: QuizData) => {
    setQuizName(record.quizName);
    setDefinition(record.definition);
    setCategory(record.category);
    setFromDate(record.fromDate);
    setToDate(record.toDate);
    setDuration(record.duration);
    setEditId(record.id);
  };

  // ✅ Handle Delete
  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const handleDeleteConfirm = () => {
    if (deleteId !== null) {
      setData((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  // ✅ Table Columns
  const columns = [
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
          <button
            className="btn btn-warning me-2"
            onClick={() => handleEdit(record)}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            onClick={() => handleDelete(record.id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      {/* ✅ Delete Modal */}
      <div className="modal fade" id="deleteModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Confirm Delete</h4>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">Are you sure you want to delete?</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal" style={{marginRight:'1em'}}>
                Cancel
              </button>
              <button
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Form */}
      <div className="page-wrapper">
        <div className="content">
          <div className="heading mb-4">
            <h2>Create Quiz</h2>
          </div>
          <div className="card p-4">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                {/* ✅ Quiz Name */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">Quize Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Quiz Name"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    required
                  />
                </div>

                {/* ✅ Definition */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">Defination</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Definition"
                    value={definition}
                    onChange={(e) => setDefinition(e.target.value)}
                    required
                  />
                </div>

                {/* ✅ Category */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Adjectives">Adjectives</option>
                    <option value="Preposition Place">Preposition Place</option>
                    <option value="Preposition Time">Preposition Time</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">From Date</label>
                  <input type="date" className="form-control" name="date" />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">To Date</label>
                  <input type="date" className="form-control" name="date" />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Duration (in minutes)</label>
                  <input type="number" className="form-control" name="date" />
                </div>
              </div>

              <div className="question">
                <h3 className="mb-3">Questions</h3>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Question Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Quiz Name"
                      value={quizName}
                      onChange={(e) => setQuizName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Option 1</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Quiz Name"
                      value={quizName}
                      onChange={(e) => setQuizName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Option 2</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Quiz Name"
                      value={quizName}
                      onChange={(e) => setQuizName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Option 3</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Quiz Name"
                      value={quizName}
                      onChange={(e) => setQuizName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Option 4</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Quiz Name"
                      value={quizName}
                      onChange={(e) => setQuizName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Correct Option</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Quiz Name"
                      value={quizName}
                      onChange={(e) => setQuizName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>    

              {/* ✅ Buttons */}
              <button type="submit" className="btn btn-success me-2">
                Save Quiz
              </button>
              <button
                type="button"
                className="btn btn-info"
                onClick={handleAddQuestion}
              >
                Add Another Question
              </button>
            </form>

            {/* ✅ Table */}
            <div className="mt-4">
              <Table dataSource={data} columns={columns} Selection={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quize;
