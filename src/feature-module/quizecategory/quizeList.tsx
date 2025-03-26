import React, { useEffect, useState } from "react";
import Table from "../../core/common/dataTable/index";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import { fetchAllQuizes, deleteQuiz } from "../../api/masterAPI";
import AlertComponent from "../../core/common/AlertComponent";
import Swal from "sweetalert2";

// ✅ Define Types
interface QuizData {
  id: number;
  quiz_name: string;
  definition: string;
  category_name: string;
  start_date: string;
  end_date: string;
  duration: number;
}

const QuizeList: React.FC = () => {
  const routes = all_routes;
  const [data, setData] = useState<QuizData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
   const [alert, setAlert] = useState<{ type: "primary" | "secondary" | "warning" | "danger" | "success"; message: string } | null>(null);
  

  // ✅ Fetch Quiz List from API
  const loadQuizzes = async () => {
    setLoading(true);
    try {
      const response = await fetchAllQuizes();
      if (response.success) {
        // ✅ Extract & Transform Data
        const formattedData = response.data.map((quiz: any) => ({
          id: quiz.id,
          quiz_name: quiz.quiz_name,
          definition: quiz.definition,
          category_name: quiz.category?.category_name || "N/A",
          start_date: quiz.start_date.split("T")[0],
          end_date: quiz.end_date.split("T")[0],
          duration: quiz.duration,
        }));

        setData(formattedData);
      } else {
        setAlert({ type: "danger", message: "Failed to fetch quizzes." });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error fetching quizzes." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  // ✅ Handle Delete Quiz with SweetAlert2
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
          const response = await deleteQuiz(id);
          if (response.success) {
            setAlert({ type: "success", message: "Quiz deleted successfully!" });
            loadQuizzes(); // ✅ Reload table after deletion
          } else {
            setAlert({ type: "danger", message: "Failed to delete quiz." });
          }
        } catch (error) {
          setAlert({ type: "danger", message: "Error deleting quiz." });
        }
      }
    });
  };

  // ✅ Define Table Columns
  const columns = [
    { title: "S.No.", render: (_: any, __: any, index: number) => index + 1 },
    { title: "Quiz Name", dataIndex: "quiz_name" },
    { title: "Definition", dataIndex: "definition" },
    { title: "Category", dataIndex: "category_name" },
    { title: "Start Date", dataIndex: "start_date" },
    { title: "End Date", dataIndex: "end_date" },
    { title: "Duration (mins)", dataIndex: "duration" },
    {
      title: "Actions",
      render: (_: any, record: QuizData) => (
        <>
          <Link to={`${routes.editQuize}/${record.id}`}  className="btn btn-warning me-2">
            <i className="fa fa-pencil"></i>
          </Link>
         
          <button className="btn btn-danger" onClick={() => handleDelete(record.id)}>
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>Quiz List</h2>
        </div>

        {/* ✅ Alert Messages */}
        {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <div className="card p-4">
          <div className="mt-4">
            {loading ? <p>Loading quizzes...</p> : <Table key={data.length} dataSource={data} columns={columns} Selection={true} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizeList;
