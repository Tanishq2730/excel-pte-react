import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuizById, updateQuiz, fetchAllQuizCategories } from "../../api/masterAPI";
import AlertComponent from "../../core/common/AlertComponent";

interface QuizCategory {
  id: number;
  category_name: string;
}

interface QuestionData {
  id?: number;
  question_name: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  correct_option: string;
}

const EditQuize: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ✅ Get Quiz ID from URL
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState<string>("");
  const [definition, setDefinition] = useState<string>("");
  const [category, setCategory] = useState<number | "">("");
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [questions, setQuestions] = useState<QuestionData[]>([]);
 const [alert, setAlert] = useState<{ type: "primary" | "secondary" | "warning" | "danger" | "success"; message: string } | null>(null);

  // ✅ Fetch quiz categories
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

  // ✅ Fetch quiz details when component loads
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const response = await fetchQuizById(Number(id));
        if (response.success) {
          const quiz = response.data;
          setQuizName(quiz.quiz_name);
          setDefinition(quiz.definition);
          setCategory(quiz.category_id);
          setFromDate(quiz.start_date.split("T")[0]);
          setToDate(quiz.end_date.split("T")[0]);
          setDuration(String(quiz.duration));

          // ✅ Map Questions
          setQuestions(
            quiz.questions.map((q: any) => ({
              id: q.id,
              question_name: q.question_name,
              option_1: q.option_1,
              option_2: q.option_2,
              option_3: q.option_3,
              option_4: q.option_4,
              correct_option: q.correct_option,
            }))
          );
        } else {
          setAlert({ type: "danger", message: "Failed to load quiz details." });
        }
      } catch (error) {
        setAlert({ type: "danger", message: "Error fetching quiz details." });
      }
    };

    loadQuiz();
  }, [id]);

  // ✅ Handle Input Changes for Questions
  const handleQuestionChange = (index: number, field: keyof QuestionData, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
    );
  };

  // ✅ Add New Question Row
  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { question_name: "", option_1: "", option_2: "", option_3: "", option_4: "", correct_option: "" },
    ]);
  };

  // ✅ Remove a Question
  const handleRemoveQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Handle Form Submit (Update Quiz)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validate Required Fields
    if (!quizName || !definition || !category || !fromDate || !toDate || !duration) {
      setAlert({ type: "warning", message: "Please fill all required fields." });
      return;
    }

    // ✅ Prepare Updated Data
    const updatedQuiz = {
      quiz_name: quizName,
      definition,
      category_id: category,
      start_date: fromDate,
      end_date: toDate,
      duration: Number(duration),
      questions,
    };

    try {
      const response = await updateQuiz(Number(id), updatedQuiz);
      if (response.success) {
        setAlert({ type: "success", message: "Quiz updated successfully!" });
        setTimeout(() => navigate("/quize-list"), 1500);
      } else {
        setAlert({ type: "danger", message: "Failed to update quiz." });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error updating quiz." });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>Edit Quiz</h2>
        </div>

        {/* ✅ Alert Messages */}
        {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <div className="card p-4">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-4 mb-3">
                <label className="form-label">Quiz Name</label>
                <input type="text" className="form-control" value={quizName} onChange={(e) => setQuizName(e.target.value)} required />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Definition</label>
                <input type="text" className="form-control" value={definition} onChange={(e) => setDefinition(e.target.value)} required />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Category</label>
                <select className="form-select" value={category} onChange={(e) => setCategory(Number(e.target.value))} required>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <h3 className="mb-3">Questions</h3>
            {questions.map((q, index) => (
              <div key={index} className="row mb-3 p-3 border rounded">
                <div className="col-md-12">
                  <label className="form-label">Question {index + 1}</label>
                  <input type="text" className="form-control mb-2" value={q.question_name} onChange={(e) => handleQuestionChange(index, "question_name", e.target.value)} required />
                </div>

                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="col-md-3 mb-3">
                    <label className="form-label">Option {num}</label>
                    <input type="text" className="form-control" value={q[`option_${num}` as keyof QuestionData]} onChange={(e) => handleQuestionChange(index, `option_${num}` as keyof QuestionData, e.target.value)} required />
                  </div>
                ))}

                <div className="col-md-3">
                  <label className="form-label">Correct Option</label>
                  <input type="text" className="form-control" value={q.correct_option} onChange={(e) => handleQuestionChange(index, "correct_option", e.target.value)} required />
                </div>

                {/* Remove Question Button */}
                <div className="col-md-3 d-flex align-items-end">
                  <button type="button" className="btn btn-danger" onClick={() => handleRemoveQuestion(index)}>Remove</button>
                </div>
              </div>
            ))}

            <button type="button" className="btn btn-info me-2" onClick={handleAddQuestion}>Add Question</button>
            <button type="submit" className="btn btn-success">Update Quiz</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditQuize;
