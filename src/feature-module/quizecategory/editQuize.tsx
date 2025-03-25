import React, { useState } from "react";

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

const EditQuize: React.FC = () => {
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

  

  

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="heading mb-4">
            <h2>Edit Quiz</h2>
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

            
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuize;
