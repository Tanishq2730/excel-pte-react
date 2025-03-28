import React, { useEffect, useState } from "react";
import Table from "../../core/common/dataTable/index";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import { fetchAllQuestions, deleteQuestions } from "../../api/masterAPI";
import Swal from "sweetalert2";

interface QuestionData {
  id: number;
  question_name: string;
  type: string;
  sub_name: string;
  weekly: string;
  newQuestion: string;
  difficulty: string;
}

const Question: React.FC = () => {
  const routes = all_routes;
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Fetch Questions from API
  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetchAllQuestions();
        if (response.success && response.data) {
         
          const formattedQuestions = response.data.map((q: any) => ({
            id: q.id,
            question_name: q.question_name || "N/A",
            type: q.Type?.name || "N/A",
            sub_name: q.Subtype?.sub_name || "N/A",
            weekly: q.weekly ? "Yes" : "No",
            newQuestion: q.new_question ? "Yes" : "No",
            difficulty: q.difficulties || "N/A",
          }));
          setQuestions(formattedQuestions);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  // ✅ Delete Question with SweetAlert
  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteQuestions(id);
          if (response.success) {
            setQuestions((prev) => prev.filter((q) => q.id !== id));
            Swal.fire("Deleted!", "Your question has been deleted.", "success");
          } else {
            Swal.fire("Error!", "Failed to delete the question.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "An error occurred while deleting.", "error");
        }
      }
    });
  };

  // ✅ Table Headers
  const columns = [
    { title: "S.No.", dataIndex: "id", key: "id", render: (_: any, __: any, index: number) => index + 1 },
    { title: "Question Name", dataIndex: "question_name", key: "question_name" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Sub Type", dataIndex: "sub_name", key: "sub_name" },
    { title: "Weekly", dataIndex: "weekly", key: "weekly" },
    { title: "New Question", dataIndex: "newQuestion", key: "newQuestion" },
    { title: "Difficulty", dataIndex: "difficulty", key: "difficulty" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: QuestionData) => (
        <div>
          <Link to={`/question-edit/${record.id}`} className="btn btn-primary btn-sm me-2">
            Edit
          </Link>
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(record.id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
          <div className="my-auto mb-2">
            <h3 className="page-title mb-1">Questions</h3>
            <nav>
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><Link to={routes.adminDashboard}>Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="#">Questions</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Questions List</li>
              </ol>
            </nav>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            <div className="mb-2">
              <Link to={routes.questionAdd} className="btn btn-primary d-flex align-items-center">
                <i className="ti ti-square-rounded-plus me-2" /> Add Question
              </Link>
            </div>
          </div>
        </div>

        {/* ✅ Question List */}
        <div className="card p-4 mt-4">
          <h2>Question List</h2>
          {loading ? <p>Loading...</p> : <Table key={questions.length} dataSource={questions} columns={columns} />}
        </div>
      </div>
    </div>
  );
};

export default Question;
