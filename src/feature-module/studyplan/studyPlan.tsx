import React, { useState } from "react";

interface StudyData {
  id: number;
  category: string;
  subCategory: string;
  questionNumbers: number;
}

const dummyData: StudyData[] = [
  { id: 1, category: "Speaking", subCategory: "Read Aloud", questionNumbers: 10 },
  { id: 2, category: "Speaking", subCategory: "Respond to Situation", questionNumbers: 10 },
  { id: 3, category: "Speaking", subCategory: "Answer Short Question", questionNumbers: 10 },
  { id: 4, category: "Speaking", subCategory: "Re-tell Lecture", questionNumbers: 10 },
  { id: 5, category: "Speaking", subCategory: "Describe Image", questionNumbers: 10 },
  { id: 6, category: "Speaking", subCategory: "Repeat Sentence", questionNumbers: 10 },
  { id: 7, category: "Writing", subCategory: "Write Essay", questionNumbers: 10 },
  { id: 8, category: "Writing", subCategory: "Write Email", questionNumbers: 10 },
  { id: 9, category: "Writing", subCategory: "Summarize Written Text", questionNumbers: 10 },
  { id: 10, category: "Reading", subCategory: "MC, Choose Single Answer", questionNumbers: 10 },
  { id: 11, category: "Reading", subCategory: "Reading and Writing Fill in the Blanks", questionNumbers: 10 },
  { id: 12, category: "Reading", subCategory: "Reading Fill in the Blanks", questionNumbers: 10 },
  { id: 13, category: "Reading", subCategory: "Re-order Paragraphs", questionNumbers: 10 },
  { id: 14, category: "Reading", subCategory: "MC, Choose Multiple Answer", questionNumbers: 10 },
  { id: 15, category: "Listening", subCategory: "Highlight Correct Summary", questionNumbers: 10 },
  { id: 16, category: "Listening", subCategory: "MC, Choose Single Answer", questionNumbers: 10 },
  { id: 17, category: "Listening", subCategory: "Fill in the Blanks", questionNumbers: 10 },
  { id: 18, category: "Listening", subCategory: "Select Missing Word", questionNumbers: 10 },
  { id: 19, category: "Listening", subCategory: "Highlight Incorrect Words", questionNumbers: 10 },
  { id: 20, category: "Listening", subCategory: "Write from Dictation", questionNumbers: 10 },
  { id: 21, category: "Listening", subCategory: "MC, Choose Multiple Answer", questionNumbers: 10 },
  { id: 22, category: "Listening", subCategory: "Summarize Spoken Text", questionNumbers: 10 },
];

const StudyPlan: React.FC = () => {
  const [data, setData] = useState<StudyData[]>(dummyData);

  // Handle Change in Question Numbers
  const handleQuestionNumberChange = (id: number, value: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, questionNumbers: value } : item
      )
    );
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>Study Plan</h2>
        </div>
        <div className="card p-4">
          {/* Date Filters */}
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

          {/* Table */}
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
                          handleQuestionNumberChange(item.id, Number(e.target.value))
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <button type="button" className="btn btn-primary mt-3">Save Changes</button>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;
