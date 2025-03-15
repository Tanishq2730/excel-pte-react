import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";

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
  const [topic, setTopic] = useState<string>("Practice");
  const [type, setType] = useState<string>("");
  const [buttonName, setButtonName] = useState<string>("");
  const [questionType, setQuestionType] = useState<string>("Real Question");
  const [testTime, setTestTime] = useState<string>("");
  const [questionName, setQuestionName] = useState<string>("");
  const [latest, setLatest] = useState<string>("Yes");
  const [newQuestion, setNewQuestion] = useState<string>("True");
  const [difficulty, setDifficulty] = useState<string>("Easy");
  const [question, setQuestion] = useState<string>("");

  const [recordings, setRecordings] = useState<QuestionData[]>([
    {
      id: 1,
      topic: "practice",
      type: "writing",
      name: "Write Essay",
      imageType: "N.A.",
      questionType: "realquestion",
      questionName:
        "Do you agree that genetically modified foods are safe for consumption?",
    },
    {
      id: 2,
      topic: "practice",
      type: "writing",
      name: "Write Essay",
      imageType: "N.A.",
      questionType: "realquestion",
      questionName:
        "Do you agree that social networks should regulate false news more strictly?",
    },
  ]);

  // ✅ Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      topic,
      type,
      buttonName,
      questionType,
      testTime,
      questionName,
      latest,
      newQuestion,
      difficulty,
      question,
    });
  };

  // ✅ Edit Function
  const handleEdit = (id: number) => {
    console.log(`Edit record with id: ${id}`);
  };

  // ✅ Delete Function
  const handleDelete = (id: number) => {
    setRecordings((prev) => prev.filter((rec) => rec.id !== id));
  };

  // ✅ Table Headers
  const columns = [
    {
      title: "S.No.",
      dataIndex: "id",
      key: "id",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image Type",
      dataIndex: "imageType",
      key: "imageType",
    },
    {
      title: "Question Type",
      dataIndex: "questionType",
      key: "questionType",
    },
    {
      title: "Question Name",
      dataIndex: "questionName",
      key: "questionName",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: QuestionData) => (
        <div>
          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => handleEdit(record.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>Add Question</h2>
        </div>
        <div className="card p-4">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Topic</label>
                <input
                  type="text"
                  className="form-control"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div className="col">
                <label className="form-label">Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Select Your Choice"
                />
              </div>
              <div className="col">
                <label className="form-label">Button Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={buttonName}
                  onChange={(e) => setButtonName(e.target.value)}
                />
              </div>
              <div className="col">
                <label className="form-label">Question Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                />
              </div>
              <div className="col">
                <label className="form-label">Test Time</label>
                <input
                  type="text"
                  className="form-control"
                  value={testTime}
                  onChange={(e) => setTestTime(e.target.value)}
                  placeholder="Enter Time in Minute"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Question Name</label>
              <input
                type="text"
                className="form-control"
                value={questionName}
                onChange={(e) => setQuestionName(e.target.value)}
                placeholder="Question Name"
              />
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Difficulty</label>
                <div>
                  {["Easy", "Medium", "Hard"].map((level) => (
                    <div className="form-check form-check-inline" key={level}>
                      <input
                        type="radio"
                        className="form-check-input"
                        id={level}
                        value={level}
                        checked={difficulty === level}
                        onChange={() => setDifficulty(level)}
                      />
                      <label className="form-check-label" htmlFor={level}>
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>

          {/* ✅ Table with Updated Headers */}
          <div className="mt-4">
            <Table
              key={recordings.length}
              dataSource={recordings}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
