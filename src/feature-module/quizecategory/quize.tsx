import React, { useEffect, useState } from "react";
import { createQuiz, fetchAllQuizCategories } from "../../api/masterAPI";
import AlertComponent from "../../core/common/AlertComponent";

interface QuizCategory {
  id: number;
  category_name: string;
}

interface QuestionData {
  id: number;
  question_name: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  correct_option: string;
}

const Quize: React.FC = () => {
  const [quizName, setQuizName] = useState<string>("");
  const [definition, setDefinition] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [alert, setAlert] = useState<{
    type: "primary" | "secondary" | "warning" | "danger" | "success";
    message: string;
  } | null>(null);
  // ✅ State for Questions
  const [questions, setQuestions] = useState<QuestionData[]>([
    {
      id: 1,
      question_name: "",
      option_1: "",
      option_2: "",
      option_3: "",
      option_4: "",
      correct_option: "",
    },
  ]);

  // ✅ Fetch Quiz Categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchAllQuizCategories();

        if (response.success) {
          setCategories(response.data);
        } else {
          setAlert({ type: "danger", message: "Failed to load categories." });
        }
      } catch (error) {
        setAlert({ type: "danger", message: "Error fetching categories." });
      }
    };
    loadCategories();
  }, []);

  // ✅ Handle Add Question
  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        question_name: "",
        option_1: "",
        option_2: "",
        option_3: "",
        option_4: "",
        correct_option: "",
      },
    ]);
  };

  // ✅ Handle Remove Question
  const handleRemoveQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  // ✅ Handle Question Input Change
  const handleQuestionChange = (
    id: number,
    field: keyof QuestionData,
    value: string
  ) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  // ✅ Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validation
    if (
      !quizName ||
      !definition ||
      !categoryId ||
      !startDate ||
      !endDate ||
      !duration
    ) {
      setAlert({
        type: "warning",
        message: "Please fill all required fields.",
      });
      return;
    }

    // ✅ Prepare Data
    const quizData = {
      quiz_name: quizName,
      definition,
      category_id: categoryId,
      start_date: startDate,
      end_date: endDate,
      duration: Number(duration),
      questions: questions.map(({ id, ...q }) => q), // Remove `id` from submission
    };

    try {
      const response = await createQuiz(quizData);
      if (response.success) {
        setAlert({ type: "success", message: "Quiz created successfully!" });

        // ✅ Reset Form
        setQuizName("");
        setDefinition("");
        setCategoryId("");
        setStartDate("");
        setEndDate("");
        setDuration("");
        setQuestions([
          {
            id: 1,
            question_name: "",
            option_1: "",
            option_2: "",
            option_3: "",
            option_4: "",
            correct_option: "",
          },
        ]);
      } else {
        setAlert({ type: "danger", message: "Failed to create quiz." });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error submitting quiz." });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>Create Quiz</h2>
        </div>

        {/* ✅ Alert Messages */}
        {alert && (
          <AlertComponent
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className="card p-4">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-4 mb-3">
                <label className="form-label">Quiz Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={quizName}
                  onChange={(e) => setQuizName(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Definition</label>
                <input
                  type="text"
                  className="form-control"
                  value={definition}
                  onChange={(e) => setDefinition(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Duration (minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* ✅ Questions Section */}
            <h3 className="mb-3">Questions</h3>
            {questions.map((q, index) => (
              <div key={q.id} className="question mb-3 p-3 border rounded">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Question {index + 1}</label>
                    <input
                      type="text"
                      className="form-control"
                      value={q.question_name}
                      onChange={(e) =>
                        handleQuestionChange(
                          q.id,
                          "question_name",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>

                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="col-md-3 mb-3">
                      <label className="form-label">Option {num}</label>
                      <input
                        type="text"
                        className="form-control"
                        value={q[`option_${num}` as keyof QuestionData]} // ✅ Fix here
                        onChange={(e) =>
                          handleQuestionChange(
                            q.id,
                            `option_${num}` as keyof QuestionData,
                            e.target.value
                          )
                        } // ✅ Fix here
                        required
                      />
                    </div>
                  ))}

                  <div className="col-md-3 mb-3">
                    <label className="form-label">Correct Option</label>
                    <input
                      type="text"
                      className="form-control"
                      value={q.correct_option}
                      onChange={(e) =>
                        handleQuestionChange(
                          q.id,
                          "correct_option",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Explanation</label>
                    <textarea name="hello" className="form-control" id=""></textarea>
                  </div>

                  {questions.length > 1 && (
                    <div className="col-md-3 d-flex align-items-center">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleRemoveQuestion(q.id)}
                      >
                        Remove Question
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

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
  );
};

export default Quize;
