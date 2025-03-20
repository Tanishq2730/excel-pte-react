import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";

interface WordData {
  id: number;
  word: string;
  type: number;
  language: string;
}

const DUMMY_DATA: WordData[] = [
  { id: 1, word: "Magdalenian", type: 2, language: "en-GB" },
  { id: 2, word: "San", type: 2, language: "en-GB" },
  { id: 3, word: "Strife", type: 2, language: "en-GB" },
];

const ExceptionalWords: React.FC = () => {
  const [data, setData] = useState<WordData[]>(DUMMY_DATA);
  const [word, setWord] = useState<string>("");

  // ✅ Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (word.trim()) {
      // ✅ Add new word to the table
      const newWord: WordData = {
        id: data.length + 1,
        word,
        type: 2, // ✅ Default type value
        language: "en-GB", // ✅ Default language value
      };

      setData((prev) => [...prev, newWord]);

      // ✅ Reset form
      setWord("");
    }
  };

  // ✅ Table Columns
  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Word",
      dataIndex: "word",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>Exceptional Words</h2>
        </div>
        <div className="card p-4">
          {/* ✅ Form */}
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Word */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Word</label>
                <input
                  type="text"
                  className="form-control"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* ✅ Submit Button */}
            <div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>

          {/* ✅ Data Table */}
          <div className="mt-4">
            {/* ✅ `key` ke saath table ko forcefully refresh kar rahe hain */}
            <Table key={data.length} dataSource={data} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExceptionalWords;
