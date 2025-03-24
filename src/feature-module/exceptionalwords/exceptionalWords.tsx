import React, { useEffect, useState } from "react";
import Table from "../../core/common/dataTable/index";
import AlertComponent from "../../core/common/AlertComponent";
import {
  fetchExceptionalWords,
  addExceptionalWord,
} from "../../api/textGearAPI"; // Import API functions

interface WordData {
  id: number;
  word: string;
  type: number;
  language: string;
}

const ExceptionalWords: React.FC = () => {
  const [data, setData] = useState<WordData[]>([]);
  const [word, setWord] = useState<string>("");
  const [alert, setAlert] = useState<{ type?: "success" | "danger"; message: string }>({
    type: undefined,
    message: "",
  });

  // ✅ Fetch exceptional words from API
  const loadWords = async () => {
    try {
      const response = await fetchExceptionalWords();
     
      if (response.success && response.data) {
        setData(
          response.data.map((wordData: { id: number; text: string; type: number; lang: string }) => ({
            id: wordData.id,
            word: wordData.text, // ✅ Use `text` correctly
            type: wordData.type, // ✅ Use `type`
            language: wordData.lang, // ✅ Use `lang`
          }))
        );
      } else {
        setAlert({ type: "danger", message: "Failed to fetch words from API" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error fetching words" });
    }
  };

  useEffect(() => {
    loadWords();
  }, []);
console.log(data,'data');

  // ✅ Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!word.trim()) {
      setAlert({ type: "danger", message: "Please enter a word!" });
      return;
    }

    try {
      const response = await addExceptionalWord({ text: word, type: 2, lang: "en-GB" });
      if (response.success) {
        setAlert({ type: "success", message: "Word added successfully!" });
        loadWords(); // Refresh list
        setWord(""); // Reset form
      } else {
        setAlert({ type: "danger", message: "Failed to add word!" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error adding word" });
    }
  };

  // ✅ Table Columns
  const columns = [
    { title: "#", dataIndex: "id" },
    { title: "Word", dataIndex: "word" },
    { title: "Type", dataIndex: "type" },
    { title: "Language", dataIndex: "language" },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* ✅ Alert Component */}
        {alert.message && (
          <AlertComponent
            type={alert.type ?? "primary"}
            message={alert.message}
            onClose={() => setAlert({ type: undefined, message: "" })}
          />
        )}

        <div className="heading mb-4">
          <h2>Exceptional Words</h2>
        </div>
        <div className="card p-4">
          {/* ✅ Form */}
          <form onSubmit={handleSubmit}>
            <div className="row">
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
            <button type="submit" className="btn btn-primary">
              Add Word
            </button>
          </form>

          {/* ✅ Data Table */}
          <div className="mt-4">
            <Table key={data.length} dataSource={data} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExceptionalWords;
